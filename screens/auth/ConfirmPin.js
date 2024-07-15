import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import IconBack from '../../assets/svg/back.svg';
import IconDelete from '../../assets/svg/keyboardDelete.svg';
import IconRight from '../../assets/svg/right-arrow.svg';

const ConfirmPin = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [pin, setPin] = useState(params.pin ? params.pin : '');
  const [passData, setPassData] = useState(params.data ? params.data : '');
  const [cekParam, setCekParam] = useState(
    params.cekParam ? params.cekParam : '',
  );
  const [timeLeft, setTimeLeft] = useState(60);
  const [hash, setHash] = useState('');
  const [pinCheck, setPinCheck] = useState(true);
  const [accessTokenRegister, setAccessTokenRegister] = useState('');
  const [data, setData] = useState([]);
  const [dataKyc, setDataKyc] = useState(params.dataKyc ? params.dataKyc : '');
  const [kyc, setKyc] = useState(params.kyc ? params.kyc : false);
  const [loop, setLoop] = useState(true)
  const [triger, setTriger] = useState(false)
  let arr = [0, 1, 2, 3, 4, 5];

  let isMounted = true;

  getHash = () =>
    RNOtpVerify.getHash()
      .then((hash) => {
        if (isMounted) {
          setHash(hash);
        }
      })
      .catch((error) => {
        // console.log(error)
      });

  const _onRefresh = () => {
    setIsLoading(false);
  };

  const addPin = (value) => {
    if (data.length >= 6) {
      ToastAndroid.show('Max PIN 6', ToastAndroid.SHORT);
    } else {
      setData([...data, value]);
    }
  };

  const minPin = () => {
    setTriger(false)
    let dataNew = data.slice(0, -1)
    setData(dataNew);
  };

  const submitAuto = () => {
    if (data) {
        if (data.length > 5) {
          if(triger === true){
            // console.log('triger true', triger)
            return false
          }else{
            setIsLoading(true);
            setTimeout(async () => {
              // console.log('triger false', triger)
              onNavigation()
            }, 500);
          }
        }
    }
  };

  useEffect(() => {
    if(loop){
      submitAuto()
    }
    // console.log(triger)
    const unsubscribe = navigation.addListener('focus', () => {
      // refresh back screen
      // startListeningForOtp();
      getHash();
      if (isMounted) {
        setIsLoading(false);
      }
      // end refresh back screen
    });
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => {
      unsubscribe();
      backHandler.remove();
      clearInterval(intervalId);
      isMounted = false;
    };
  }, [timeLeft, navigation, pin]);

  const Number = (value, disable) => {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#DDD')}
        onPress={() => {
          !isLoading ? addPin(value) : null;
        }}>
        <View
          style={{
            width: '33%',
            paddingTop: 10,
            paddingBottom: value === 0 ? 12.5 : 10,
          }}>
          <Text style={[styles.fs35, styles.textCenter, styles.black]}>
            {value}
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  const clearData = () => {
    setData([]);
  };

  const dataPin = () => {
    let pind = '';
    data.map((v, i) => {
      pind += v;
    });
    return pind;
  };

  const onNavigation = () => {
    // console.log(pin)
    let value = {
      pin: pin,
      confirm: pin,
      name: passData.name,
      phone: passData.phone,
      referal: passData.referal,
      registerToken: passData.registerToken,
    };
    if (dataPin() === pin) {
      navigation.push('RegisterKyc', {
        dataReg: value,
      });
      setLoop(false)
    }else{
      setTriger(true)
      setIsLoading(false)
      ToastAndroid.show('PIN tidak sesuai', ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.bgWhite]}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }>
        <View style={[styles.bgBlue, styles.pl20, styles.pr20, {height: 70}]}>
          <View style={[styles.row, styles.mt25]}>
            <TouchableOpacity
              style={[styles.col10, styles.centerContent]}
              onPress={() => navigation.goBack()}>
              <SvgXml width="25" height="20" xml={IconBack} />
            </TouchableOpacity>
            <View style={[styles.col70, styles.pl10, styles.centerContent]}>
              <Text style={[styles.white, styles.bold, styles.fs17]}>
                Konfirmasi PIN
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.center, styles.mt30]}>
          <Text
            style={[styles.fontWSB, styles.black, styles.fs14, styles.mb30]}>
            Konfirmasi PIN anda
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          {arr.map((v, i) => (
            <View
              key={i}
              style={{
                width: 40,
                height: 40,
                borderWidth: 0,
                borderBottomWidth: 0,
                backgroundColor: triger ? '#FFACB8' : '#DDE3FF',
                borderRadius: 40 / 2,
                marginHorizontal: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {data[i] ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderWidth: 0,
                    borderBottomWidth: 0,
                    backgroundColor: triger ? '#DC323A' : '#4F6CFF',
                    borderRadius: 30 / 2,
                    marginHorizontal: 5,
                  }}></View>
              ) : data[i] === 0 ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderWidth: 0,
                    borderBottomWidth: 0,
                    backgroundColor: triger ? '#DC323A' : '#4F6CFF',
                    borderRadius: 30 / 2,
                    marginHorizontal: 5,
                  }}></View>
              ) : null}
            </View>
          ))}
        </View>

        {triger ? (<Text style={{textAlign:'center', color:'#DC323A'}}>Konfirmasi PIN tidak sesuai dengan sebelumnya</Text>) : null}
        
        <View style={[styles.row, styles.rowWrap, styles.center, styles.mt20]}>
          {Number(1, false)}
          {Number(2, false)}
          {Number(3, false)}
          {Number(4, false)}
          {Number(5, false)}
          {Number(6, false)}
          {Number(7, false)}
          {Number(8, false)}
          {Number(9, false)}
          <TouchableNativeFeedback
            onPress={() => {
              !isLoading ? minPin() : null;
            }}
            background={TouchableNativeFeedback.Ripple('#DDD')}>
            <View
              style={[
                {
                  width: '33%',
                  paddingTop: 18,
                  paddingBottom: 10,
                },
                styles.center,
              ]}>
              <SvgXml
                width="30"
                height="30"
                style={[
                  {
                    alignSelf: 'center',
                  },
                  styles.mb10,
                ]}
                xml={IconDelete}
              />
            </View>
          </TouchableNativeFeedback>
          {Number(0, false)}
          <TouchableNativeFeedback onPress={() => onNavigation()}>
            <View
              style={[
                {
                  width: '33%',
                  paddingTop: 25,
                  paddingBottom: 10,
                },
                styles.center,
              ]}>
              <SvgXml
                width="30"
                height="30"
                style={[
                  {
                    alignSelf: 'center',
                  },
                  styles.mb10,
                ]}
                xml={IconRight}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmPin;
