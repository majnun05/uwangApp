import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, createRef} from 'react';
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
  Image,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import IconBack from '../../assets/svg/back.svg';
import IconDelete from '../../assets/svg/keyboardDelete.svg';
import IconRight from '../../assets/svg/right-arrow.svg';
import {apiCekPin, apiUserResetPin} from '../../helpers/endPoint';
import {setSession} from '../../helpers/Helpers';
import {useApiPost, useApiPostLogin} from '../../helpers/useFetch';
import ActionSheet from 'react-native-actions-sheet';
import {ImgForgotPin} from '../../assets';

const actionSheetRef = createRef();

const AddPin = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  // const [dataUser, setDataUser] = useState(params.dataUser ? params.dataUser : '')
  const [pin, setPin] = useState('');
  const [phone, setPhone] = useState(params.phone ? params.phone : '');
  const [regis, setRegis] = useState(params.reg ? params.reg : '');
  const [timeLeft, setTimeLeft] = useState(60);
  const [hash, setHash] = useState('');
  const [pinCheck, setPinCheck] = useState(true);
  const [check, setCheck] = useState(params.cek ? params.cek : '');
  const [data, setData] = useState([]);
  const [auto, setAuto] = useState(true);
  const [triger, setTriger] = useState(false)
  const [loop, setLoop] = useState(true)
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
    setTriger(false)
    if (data.length >= 6) {
      ToastAndroid.show('Max PIN 6', ToastAndroid.SHORT);
    }else if(data.length === 6){
      setData([...data, ...value])
    } else if (data.length <= 6) {
      setData([...data, value]);
    }
  };

  const minPin = () => {
    setIsLoading(false)
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
              navigateConfirm()
            }, 500);
          }
        }
    }
  };

  useEffect(() => {
   if(loop){
    submitAuto()
   }
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
      navigation.navigate('Login');
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

  const dataPin = () => {
    let pind = '';
    data.map((v, i) => {
      pind += v;
    });
    return pind;
  };

  const clearData = () => {
    setData([]);
  };

  const navigateConfirm = () => {
    setIsLoading(true);
    setTriger(false)
    if (data.length === 6) {
      if (check === 'login') {
        useApiPostLogin(apiCekPin(), regis.tokens.accessToken, {
          pin: dataPin(),
        })
          .then((res) => {
            setIsLoading(false);
            // console.log({res});
            if (res.statusCode === 200) {
              let valid = res.values.data.isValid;
              if (valid) {
                navigation.replace('Home');
                setSession({name: 'token', value: regis.tokens.accessToken});
                setSession({
                  name: 'tokenDemo',
                  value: regis.tokens.refreshToken,
                });
                setSession({name: 'isLoggedV2', value: 'yes'});
                setSession({name: 'qrCode', value: 'false'});
                setSession({name: 'tanpaPin', value: 'no'});
                setSession({name: 'pinAplikasi', value: 'no'});
                setSession({name: 'fingerPrint', value: 'no'});
                setSession({name: 'pinTrx', value: 'no'});
                setSession({name: 'virtualAccount', value: 'no'});
                setSession({name: 'namaLoket', value: 'Topindo'});
                setSession({
                  name: 'guideApp',
                  value: guideApp ? 'false' : 'true',
                });
                setSession({
                  name: 'guideAppKasir',
                  value: guideAppKasir ? 'false' : 'true',
                });
                setSession({
                  name: 'alamatLoket',
                  value:
                    'Jln.P.Diponegoro No.48 Singkawang, Kalimantan Barat (Kode pos 79123)',
                });
                setSession({
                  name: 'footLoket',
                  value:
                    'Tersedia Pulsa, kuota multi operator, Token PLN, bayar Listrik , pdam, telkom dan Multi pembayaran lainnya.',
                });
                setLoop(false)
              } else {
                setTriger(true)
                setIsLoading(false);
                ToastAndroid.show('PIN tidak sesuai', ToastAndroid.SHORT);
              }
            } else if (res.statusCode === 400) {
              setIsLoading(false);
              navigation.replace('UserBlok', {
                msg: res.values.message,
              });
            }
          })
          .catch((error) => {
            setAuto(false);
            setIsLoading(false);
          });
      } else {
        setData([]);
        setLoop(false)
        navigation.push('ConfirmPin', {
          data: regis,
          pin: dataPin(),
        });
      }
    } else {
      setIsLoading(false);
      ToastAndroid.show('PIN harus 6 digit', ToastAndroid.SHORT);
    }
  };

  const submitReset = async () => {
    actionSheetRef.current?.setModalVisible(false);
    setIsLoading(true);
    setTimeout(async () => {
      await useApiPostLogin(apiUserResetPin(), regis.tokens.accessToken, {})
        .then((res) => {
          // console.log({res});
          setIsLoading(false);
          if (res.statusCode === 200) {
            navigation.replace('Login');
          } else {
            ToastAndroid.show(res.values.message, ToastAndroid.SHORT);
          }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, 500);
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
              <Text style={[styles.white, styles.bold, styles.fs17]}>PIN</Text>
            </View>
          </View>
        </View>

        <View style={[styles.center, styles.mt30]}>
          <Text
            style={[styles.fontWSB, styles.black, styles.fs14, styles.mb30]}>
            Masukan PIN anda
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

        {triger ? (<Text style={{textAlign:'center', color:'#DC323A'}}>Pin yang anda masukan tidak sesuai</Text>) : null}

        {check === 'login' ? (
          <TouchableOpacity
          style={[styles.center]}
          onPress={() => actionSheetRef.current?.setModalVisible()}
          activeOpacity={0.8}>
          <Text
            style={[
              styles.centerText,
              styles.fontWSR,
              styles.black,
              styles.fs14,
              styles.mt10,
              styles.mb20,
            ]}>
            Lupa dengan PIN anda ?{' '}
            <Text style={[styles.blue, styles.fs13, styles.fontWSB]}>
              Atur Ulang{'\n'}
            </Text>
            {/* {timeLeft > 2 ? `dalam ${timeLeft} detik` : null} */}
          </Text>
        </TouchableOpacity>
        ) : null}

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
          <TouchableNativeFeedback onPress={() => navigateConfirm()}>
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

      <ActionSheet
        // onClose={onClose}
        containerStyle={{
          height: 400,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          backgroundColor: '#ffffff',
        }}
        statusBarTranslucent={false}
        ref={actionSheetRef}>
        <View
          style={{
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
          }}>
          <Image
            style={{
              width: '100%',
              height: 200,
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            }}
            resizeMode="stretch"
            source={ImgForgotPin}
          />

          <View style={{alignSelf: 'center', marginVertical: 20}}>
            <Text
              style={[
                styles.fontWSB,
                styles.black,
                styles.fs14,
                ,
                {textAlign: 'center'},
              ]}>
              Kode Verifikasi Telah Dikirim
            </Text>
            <Text
              style={[
                styles.fontWSR,
                styles.grey75,
                styles.fs13,
                {textAlign: 'center'},
              ]}>
              Cek kode verifikasi yang dikirim via SMS
            </Text>
            <Text
              style={[
                styles.fontWSR,
                styles.grey75,
                styles.fs13,
                {textAlign: 'center'},
              ]}>
              {`ke nomor ${phone}`}
            </Text>
          </View>

          <Ripple
            onPress={() => submitReset()}
            style={[
              styles.btnPrimary,
              styles.mt15,
              styles.mb15,
              {marginHorizontal: 25},
            ]}>
            <Text style={[styles.white, styles.fs15, styles.fontWSM]}>
              Lanjutkan
            </Text>
          </Ripple>
        </View>
      </ActionSheet>
    </SafeAreaView>
  );
};

export default AddPin;
