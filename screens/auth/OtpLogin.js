import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  TouchableNativeFeedback,
  Text,
  RefreshControl,
  TouchableOpacity,
  Keyboard,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {
  apiUserVerifyOtpPin,
  apiUserRequestOtpPin,
} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_error} from '../../helpers/Helpers';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import IconLogoWhite from '../../assets/svg/logowhite.svg';
import IconRight from '../../assets/svg/right-arrow-white.svg';
import IconDelete from '../../assets/svg/delete-white.svg';
import styles from '../../assets/styles/Style';
import {LogoMark} from '../../assets'

const OtpLogin = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [pin, setPin] = useState('');
  const [phone, setPhone] = useState(params.phone ? params.phone : '');
  const [timeLeft, setTimeLeft] = useState(60);
  const [hash, setHash] = useState('');
  const [pinCheck, setPinCheck] = useState(true);
  let isMounted = true;

  // getHash = () =>
  //   RNOtpVerify.getHash()
  //     .then((hash) => {
  //       if (isMounted) {
  //         setHash(hash);
  //       }
  //     })
  //     .catch((error) => {
  //       // console.log(error)
  //     });

  // startListeningForOtp = () =>
  //   RNOtpVerify.getOtp()
  //     .then((p) => RNOtpVerify.addListener(this.otpHandler))
  //     .catch((p) => console.log(p));

  otpHandler = (message) => {
    let msg = message ? message : '';
    if (msg) {
      let pins = msg.replace(/[^0-9]/g, '');
      setPin(pins.substring(0, 4));
    } else {
      setPin('');
    }
  };

  const submitAuto = () => {
    if (pin) {
      if (pin.length > 3) {
        if (pinCheck) {
          setPinCheck(false);
          setIsLoading(true);
          setTimeout(async () => {
            submitVerifyPin();
          }, 300);
        } else {
          setPinCheck(false);
        }
      } else {
        setPinCheck(false);
      }
    }
  };

  // ========================
  // === Verify OTP PIN ===
  // ========================
  const submitVerifyPin = async () => {
    // RNOtpVerify.removeListener();
    if (pin === '') {
      getSnackBar_error({
        title: 'Masukkan Kode Verifikasi',
        duration: 'LENGTH_INDEFINITE',
      });
    } else {
      if (pin.length > 3) {
        setIsLoading(true);
        await useApiPost(apiUserVerifyOtpPin(), {
          otp: pin.substring(0, 4),
          via: 'SMS',
        })
          .then((res) => {
            setPinCheck(false);
            setIsLoading(false);
            if (res.statusCode === 200) {
              return navigation.navigate('ChangePinLogin');
            } else {
              getSnackBar_error({
                title: res.values.message,
                duration: 'LENGTH_INDEFINITE',
              });
            }
          })
          .catch((error) => {
            setPinCheck(false);
            setIsLoading(false);
          });
      }
    }
  };

  const resendOtp = async (type) => {
    Keyboard.dismiss();
    if (phone === '') {
      getSnackBar_error({
        title: 'Masukkan Nomor Telepon Anda',
        duration: 'LENGTH_INDEFINITE',
      });
    } else {
      setIsLoading(true);
      useApiPost(apiUserRequestOtpPin(), {
        phone: phone,
        via: 'SMS',
      })
        .then((res) => {
          setIsLoading(false);
          setTimeLeft(59);
          if (res.statusCode === 200) {
            navigation.push('OtpLogin', {
              phone: phone,
            });
            getSnackBar_success({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          } else {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  const _onRefresh = () => {
    setIsLoading(false);
  };

  const addPin = (value) => {
    const codeNew = pin + value;
    if (codeNew.length < 7) {
      setPin(codeNew);
      if (codeNew.length > 3) {
        setPinCheck(true);
      } else {
        setPinCheck(false);
      }
    }
  };

  const minPin = () => {
    let code = pin;
    if (code.length > 0) {
      const str = code.substring(0, code.length - 1);
      setPin(str);
      if (str.length < 3) {
        setPinCheck(true);
      } else {
        setPinCheck(false);
      }
    }
  };

  useEffect(() => {
    submitAuto();
    const unsubscribe = navigation.addListener('focus', () => {
      // refresh back screen
      // startListeningForOtp();
      // getHash();
      if (isMounted) {
        setIsLoading(false);
      }
      // end refresh back screen
    });
    const backAction = () => {
      navigation.navigate('PinLogin');
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
          <Text style={[styles.fs35, styles.textCenter, styles.white]}>
            {value}
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <KeyboardAvoidingView enabled={false} style={[styles.flex1, styles.bgBlue]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.bgBlue]}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }>
        <View style={[styles.center, styles.mt30]}>
          <Image style={{width:80, height:70, marginBottom:10}} source={LogoMark}/>
          <Text style={[styles.fontWSR, styles.white, styles.fs20]}>
            Verifikasi OTP
          </Text>
          <Text
            style={[styles.fontWSR, styles.white, styles.fs12, styles.mb40]}>
            Kami telah kirim kode via sms ke{' '}
            <Text style={[styles.fontWSB, styles.white, styles.fs12]}>
              {phone}
            </Text>
          </Text>
        </View>
        <View style={[styles.centerOtpLogin]}>
          {/* <OTPInputView
            editable={false}
            autoFocusOnLoad={false}
            style={{
              height: 60,
              color: '#000',
              marginTop: 5,
            }}
            code={pin}
            pinCount={4}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
          /> */}
        </View>
        <TouchableOpacity
          style={[styles.center]}
          onPress={() => {
            timeLeft < 2 ? (!isLoading ? resendOtp() : null) : null;
          }}
          activeOpacity={0.8}>
          <Text
            style={[
              styles.centerText,
              styles.fontWSR,
              styles.white,
              styles.fs14,
              styles.mt10,
              styles.mb20,
            ]}>
            Masih belum ada kode OTP ?{' '}
            <Text style={[styles.fontWSB, styles.orange, styles.fs14]}>
              Kirim Ulang{'\n'}
            </Text>
            {timeLeft > 2 ? `dalam ${timeLeft} detik` : null}
          </Text>
        </TouchableOpacity>
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
          <TouchableNativeFeedback
            onPress={() => {
              !isLoading ? submitVerifyPin() : null;
            }}>
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
    </KeyboardAvoidingView>
  );
};

export default OtpLogin;
