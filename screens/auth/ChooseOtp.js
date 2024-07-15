import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import styles from '../../assets/styles/Style';
import Ripple from 'react-native-material-ripple';
import {SvgXml} from 'react-native-svg';
import {IcArrR, IcSms, IcWhatsApp} from '../../assets';
import {apiRequestOtp} from '../../helpers/endPoint';
import {useApiPost} from '../../helpers/useFetch';
import {getSnackBar_error, setSession} from '../../helpers/Helpers';
import StatusBars from '../../content/more/StatusBar';
import IconBack from '../../assets/svg/back.svg';
import {useNavigation} from '@react-navigation/native';

const ChooseOtp = (props) => {
  const navigation = useNavigation();
  let {params} = props.route;
  const [isLoading, setIsLoading] = useState(false);
  const [loginSms, setLoginSms] = useState(params.sms);
  const [loginWa, setLoginWa] = useState(params.wa);
  const [form, setForm] = useState(false);
  const [phone, setPhone] = useState(params.phone);
  const [hash, setHash] = useState('');
  let isMounted = true;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // refresh back screen
      if (isMounted) {
        getHash();
      }
      // end refresh back screen
    });

    return () => {
      unsubscribe();
      isMounted = false;
    };
  }, [navigation]);

  const submitReq = async (type) => {
    Keyboard.dismiss();
    if (phone === '') {
      setForm(true);
    } else {
      setIsLoading(true);
      useApiPost(apiRequestOtp(), {
        phone: phone,
        via: type,
        hash: hash ? hash.toString() : '',
      })
        .then((res) => {
           console.log('data res otp', res);
          setIsLoading(false);
          if (res.statusCode === 200) {
            navigation.push('LoginVerify', {
              type: type,
              check: res.values.data.page,
              phone: phone,
            });
            setSession({name: 'phoneNumber', value: phone.toString()});
          } else {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
          // setIsLoading(false);
          // console.log('data res otp', res);
          //   let scr = res.values.data.page
          //   if (res.statusCode === 200) {
          //     navigation.push('LoginVerify', {
          //       type: type,
          //       check: scr,
          //       phone: phone,
          //     });
          //     setSession({name: 'phoneNumber', value: phone.toString()});
          //   }else{
          //     getSnackBar_error({
          //       title: res.values.message,
          //       duration: 'LENGTH_INDEFINITE',
          //     });
          //   }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

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

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <StatusBars />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.bgWhite]}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            // onRefresh={_onRefresh}
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
                Pilih metode verifikasi
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.center, styles.ph15]}>
          {loginSms === '1' ? (
            <View
              style={
                loginWa === '0' ? [styles.col100] : [styles.col100, styles.pr5]
              }>
              <Ripple
                onPress={() => {
                  !isLoading ? submitReq('SMS') : null;
                }}
                style={[styles.choseOtp]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: '#E0E0E0',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 40 / 2,
                      marginHorizontal: 10,
                    }}>
                    <SvgXml xml={IcSms} />
                  </View>
                  <View>
                    <Text style={[styles.black, styles.bold, styles.fs13]}>
                      login SMS
                    </Text>
                    <Text style={[styles.black, styles.fontWSR, styles.fs12]}>
                      Kirim Kode OTP melalui SMS
                    </Text>
                  </View>
                </View>
                <SvgXml xml={IcArrR} style={{marginRight: 10}} />
              </Ripple>
            </View>
          ) : null}

          {loginWa === '1' ? (
            <View
              style={
                loginSms === '0' ? [styles.col100] : [styles.col100, styles.pr5]
              }>
              <Ripple
                onPress={() => {
                  !isLoading ? submitReq('WA') : null;
                }}
                style={[styles.choseOtp]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: '#E0E0E0',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 40 / 2,
                      marginHorizontal: 10,
                    }}>
                    <SvgXml xml={IcWhatsApp} />
                  </View>
                  <View>
                    <Text style={[styles.black, styles.bold, styles.fs13]}>
                      Login WA
                    </Text>
                    <Text style={[styles.black, styles.fontWSR, styles.fs12]}>
                      Kirim Kode OTP melalui Whatsapp
                    </Text>
                  </View>
                </View>
                <SvgXml xml={IcArrR} style={{marginRight: 10}} />
              </Ripple>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChooseOtp;
