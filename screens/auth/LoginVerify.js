import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  TouchableNativeFeedback,
  View,
  TouchableOpacity,
  Text,
  Keyboard,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import styles from '../../assets/styles/Style';
import IconLengkungOrange from '../../assets/svg/lengkung-orange.svg';
import IconTitik from '../../assets/svg/titik.svg';
import IconLengkung from '../../assets/svg/lengkung.svg';
import IconQuestion from '../../assets/svg/question.svg';
import IconDelete from '../../assets/svg/delete.svg';
import IconBack from '../../assets/svg/back.svg';
import IconRight from '../../assets/svg/right-black.svg';
import {useApiPost, useError} from '../../helpers/useFetch';
import {apiRequestOtp, apiVerifyOtp} from '../../helpers/endPoint';
import {Fonts} from '../../assets/fonts/Fonts';
import {
  getSnackBar_error,
  getSnackBar_success,
  setSession,
  getSession,
} from '../../helpers/Helpers';

const LoginVerify = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [otpCheck, setOtpCheck] = useState(true);
  const [type, setType] = useState(params.type ? params.type : 'SMS');
  const [check, setCheck] = useState(params.check ? params.check : 'login');
  const [phone, setPhone] = useState(params.phone ? params.phone : '');
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(params.type === 'SMS' ? 60 : 120);
  const [hash, setHash] = useState('');
  let isMounted = true;

  const loginCheck = async () => {
    let isLogged = await getSession('isLoggedV2').then((isLogged) => {
      return isLogged;
    });
    if (isLogged === 'yes') {
      navigation.replace('Home');
    }
  };

  // getHash = () =>
    // RNOtpVerify.getHash()
    // .then((hash) => {
    //   if (isMounted) {
    //     setHash(hash);
    //   }
    // })
    // .catch((error) => {
    //   // console.log(error)
    // });

  // startListeningForOtp = () =>
  //  RNOtpVerify.getOtp()
    // .then((p) => RNOtpVerify.addListener(this.otpHandler))
    // .catch((p) => console.log(p));

    otpHandler = (message) => {
      console.log({message})
      let msg = message ? message : '';
      if (isMounted) {
        if (msg) {
          let otps = msg.replace(/[^0-9]/g, '');
          setOtp(otps.substring(0, 4));
        } else {
          setOtp('');
        }
      }
    };

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

  // const startListeningForOtp = () =>
  //   RNOtpVerify.getOtp().then((p) => {
  //     RNOtpVerify.addListener((message) => {
  //       // console.log({message})
  //       let msg = message ? message : '';
  //       if (isMounted) {
  //         if (msg) {
  //           let otps = msg.replace(/[^0-9]/g, '');
  //           setOtp(otps.substring(0, 4));
  //         } else {
  //           setOtp('');
  //         }
  //       }
  //     })
  //   }).catch((p) => console.log(p));


  const submitAuto = () => {
    if (otp) {
      if (otp.length > 3) {
        if (otpCheck) {
          if (isMounted) {
            setOtpCheck(false);
            setIsLoading(true);
            setTimeout(async () => {
              submitVerify();
            }, 300);
          }
        } else {
          setOtpCheck(false);
        }
      } else {
        setOtpCheck(false);
      }
    }
  };

  useEffect(() => {
    submitAuto();
    const unsubscribe = navigation.addListener('focus', () => {
      // refresh back screen
      loginCheck();
      // startListeningForOtp();
      // getHash();
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
      if (isMounted) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => {
      unsubscribe();
      backHandler.remove();
      clearInterval(intervalId);
      isMounted = false;
    };
  }, [timeLeft, navigation, otp]);

  const submitVerify = async () => {
    // RNOtpVerify.removeListener();
    Keyboard.dismiss();
    let guideApp = await getSession('guideApp').then((guideApp) => {
      return guideApp;
    });
    let guideAppKasir = await getSession('guideAppKasir').then(
      (guideAppKasir) => {
        return guideAppKasir;
      },
    );
    if (otp === '') {
      getSnackBar_error({
        title: 'Masukkan Kode OTP Anda',
        duration: 'LENGTH_INDEFINITE',
      });
    } else {
      if (otp.length > 3) {
        setIsLoading(true);
        // console.log(JSON.stringify({
        //   phone: phone,
        //   otp: otp.substring(0, 4),
        //   via: type,
        // }))
        useApiPost(apiVerifyOtp(check), {
          phone: phone,
          otp: otp.substring(0, 4),
          via: type,
        })
          .then((res) => {
            console.log({type: check, respon:res})
            setOtpCheck(false);
            setIsLoading(false);
            if (res.statusCode === 200) {
              if (check === 'login') {
                let val = res.values.data;
                navigation.replace('AddPin', {
                  reg: val,
                  cek: check,
                  phone: phone,
                });
              } else {
                let val = res.values.data;
                navigation.replace('Register', {
                  phone: phone,
                  registerToken: val.registerToken,
                });
              }
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
      useApiPost(apiRequestOtp(check), {
        phone: phone,
        via: type,
      })
        .then((res) => {
          setIsLoading(false);
          setTimeLeft(59);
          if (res.statusCode === 200) {
            navigation.push('LoginVerify', {
              type: type,
              check: check,
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

  const Number = (value, disable) => {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#DDD')}
        onPress={() => {
          !isLoading ? addOtp(value) : null;
        }}>
        <View
          style={{
            width: '33%',
            paddingTop: 10,
            paddingBottom: 10,
          }}>
          <Text
            style={[styles.fs30, styles.textCenter, styles.pb10, styles.black]}>
            {value}
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  const addOtp = (value) => {
    const codeNew = otp + value;
    if (codeNew.length < 7) {
      setOtp(codeNew);
      if (codeNew.length > 3) {
        setOtpCheck(true);
      } else {
        setOtpCheck(false);
      }
    }
  };

  const removeCode = () => {
    let code = otp;
    if (code.length > 0) {
      const str = code.substring(0, code.length - 1);
      setOtp(str);
      if (str.length < 3) {
        setOtpCheck(true);
      } else {
        setOtpCheck(false);
      }
    }
  };

  const _onRefresh = () => {
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }>
        <View
          style={[
            styles.bgBlue,
            styles.pb20,
            styles.pt20,
            styles.pl20,
            styles.pr20,
          ]}>
          <View
            style={[
              styles.row,
              styles.mt10,
              styles.mb50,
              {alignItems: 'center'},
            ]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <SvgXml width="30" height="20" xml={IconBack} />
            </TouchableOpacity>
            <View style={{marginLeft: 20}}>
              <Text
                style={{fontSize: 16, color: '#ffffff', fontFamily: Fonts.MSB}}>
                Verifikasi
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.boxAllOtp}>
          <View style={[styles.centerOtpNormal]}>
            <View style={[styles.row]}>
              <View style={styles.col90}>
                <Text style={[styles.black, styles.bold, styles.fs18]}>
                  Verifikasi Kode
                  {/* {check} */}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.col10}
                onPress={() => {
                  alert('Masukkan Kode Verifikasi');
                }}>
                <SvgXml width="30" height="30" xml={IconQuestion} />
              </TouchableOpacity>
            </View>
            <Text
              style={[
                styles.grey75,
                styles.fs13,
                styles.pl3,
                styles.mb20,
                styles.mt20,
              ]}>
              Kami telah kirim kode via {type === 'WA' ? 'WhatsApp' : type} ke{' '}
              <Text style={[styles.black, styles.fs13, styles.pl3]}>
                {phone}
              </Text>
            </Text>
            {/* <OTPInputView
              editable={false}
              autoFocusOnLoad={false}
              style={{
                height: 60,
                color: '#000',
                marginTop: 5,
              }}
              code={otp}
              pinCount={4}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
            /> */}

            <TouchableOpacity
              style={[styles.btnOtpUlang, styles.mt10, styles.center]}
              onPress={() => {
                timeLeft < 2 ? (!isLoading ? resendOtp(type) : null) : null;
              }}
              activeOpacity={0.8}>
              <Text style={[styles.greyB7, styles.fs13, styles.centerText]}>
                Masih belum ada kode OTP ?{' '}
                <Text
                  style={[
                    styles.blue,
                    styles.bold,
                    styles.fs13,
                    styles.centerText,
                  ]}>
                  Kirim Ulang{'\n'}
                </Text>
                {timeLeft > 2 ? `dalam ${timeLeft} detik` : null}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[styles.row, styles.rowWrap, styles.center, styles.mb30]}>
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
              background={TouchableNativeFeedback.Ripple('#DDD')}
              onPress={() => {
                !isLoading ? removeCode() : null;
              }}>
              <View
                style={[
                  {
                    width: '33%',
                    paddingTop: 20,
                    paddingBottom: 10,
                  },
                  styles.center,
                ]}>
                <SvgXml
                  width="30"
                  height="30"
                  style={[
                    {
                      alignSeld: 'center',
                    },
                    styles.mb10,
                  ]}
                  xml={IconDelete}
                />
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#DDD')}
              onPress={() => {
                !isLoading ? addOtp(0) : null;
              }}>
              <View
                style={[
                  {
                    width: '33%',
                    paddingTop: 10,
                    paddingBottom: 10,
                  },
                  styles.center,
                ]}>
                <Text
                  style={[
                    styles.fs30,
                    styles.textCenter,
                    styles.pb10,
                    styles.black,
                  ]}>
                  0
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#DDD')}
              onPress={() => {
                !isLoading ? submitVerify(type) : null;
              }}>
              <View
                style={[
                  {
                    width: '33%',
                    paddingTop: 20,
                    paddingBottom: 10,
                  },
                  styles.center,
                ]}>
                <SvgXml
                  width="30"
                  height="30"
                  style={[
                    {
                      alignSeld: 'center',
                    },
                    styles.mb10,
                  ]}
                  xml={IconRight}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginVerify;
