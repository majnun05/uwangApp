import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  TouchableNativeFeedback,
  Text,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {
  apiUserRequestOtpPin,
  apiUserValidPin,
  apiUserLogout,
} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_error, getSession, setSession} from '../../helpers/Helpers';
import ModalNotif from '../../content/modal/ModalNotif';
import IconLogoWhite from '../../assets/svg/logowhite.svg';
import IconRight from '../../assets/svg/right-arrow-white.svg';
import IconDelete from '../../assets/svg/delete-white.svg';
import styles from '../../assets/styles/Style';
import { LogoMark } from '../../assets';

const PinLogin = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);
  const [modalLupa, setModalLupa] = useState(false);
  const [pin, setPin] = useState('');
  const [hash, setHash] = useState('');
  let isMounted = true;

  // ========================
  // === Check Login ===
  // ========================
  const submitCheckLogin = async () => {
    if (pin === '') {
      getSnackBar_error({
        title: 'Masukkan PIN Anda',
        duration: 'LENGTH_INDEFINITE',
      });
    } else {
      setIsLoading(true);
      await useApiPost(apiUserValidPin(), {
        pin: pin,
      })
        .then((res) => {
          setIsLoading(false);
          if (res.statusCode === 200) {
            return navigation.replace('Home');
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

  // ========================
  // === Request OTP PIN ===
  // ========================
  const submitReqPin = async () => {
    let phoneNumber_ = await getSession('phoneNumber').then((phoneNumber) => {
      return phoneNumber;
    });
    setModalLupa(false);
    setTimeout(async () => {
      setIsLoading(true);
      await useApiPost(apiUserRequestOtpPin(), {
        phone: phoneNumber_,
        hash: hash ? hash.toString() : '',
        via: 'SMS',
      })
        .then((res) => {
          setIsLoading(false);
          if (res.statusCode === 200) {
            return navigation.navigate('OtpLogin', {
              phone: phoneNumber_,
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
    }, 500);
  };

  // ========================
  // === Logout ===
  // ========================
  const submitLogout = async () => {
    setModalLogout(false);
    setIsLoading(true);
    await useApiPost(apiUserLogout(), {})
      .then((res) => {
        setIsLoading(false);
        if (res.statusCode === 200) {
          setSession({name: 'token', value: ''});
          setSession({name: 'isLoggedV2', value: 'no'});
          setSession({name: 'guideApp', value: 'false'});
          setSession({name: 'guideAppKasir', value: 'false'});
          setSession({name: 'tanpaPin', value: 'no'});
          setSession({
            name: 'pinTrx',
            value: '',
          });
          setSession({name: 'pinAplikasi', value: 'no'});
          navigation.push('Login');
        } else if (res.statusCode === 500) {
          getSnackBar_error({
            title: res.values.message,
            duration: 'LENGTH_INDEFINITE',
          });
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const _onRefresh = () => {
    setIsLoading(false);
  };

  const addPin = (value) => {
    const codeNew = pin + value;
    if (codeNew.length < 7) {
      setPin(codeNew);
    }
  };

  const minPin = () => {
    let code = pin;
    if (code.length > 0) {
      const str = code.substring(0, code.length - 1);
      setPin(str);
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

  const submitAuto = () => {
    if (pin) {
      if (pin.length > 5) {
        setIsLoading(true);
        setTimeout(async () => {
          submitCheckLogin();
        }, 300);
      }
    }
  };

  useEffect(() => {
    submitAuto();
    const unsubscribe = navigation.addListener('focus', () => {
      // refresh back screen
      // getHash();
      // end refresh back screen
    });
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      unsubscribe();
      isMounted = false;
    };
  }, [navigation, pin]);

  const Number = (value, disable) => {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#DDD')}
        onPress={() => {
          addPin(value);
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
    <SafeAreaView style={[styles.flex1, styles.bgBlue]}>
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
          <Image source={LogoMark} style={{width:150, height:150}} resizeMode="stretch"/>
          {/* <SvgXml width="50" height="50" xml={IconLogoWhite} /> */}
          <Text
            style={[
              styles.fontWSR,
              styles.white,
              styles.fs20,
              styles.mb40,
              styles.mt10,
            ]}>
            Masukkan PIN Anda
          </Text>
        </View>
        <View style={[styles.formPinLogin, styles.ml30, styles.mr30]}>
          <TextInput
            keyboardType="numeric"
            textAlign={'center'}
            secureTextEntry={true}
            editable={false}
            placeholder={''}
            style={[
              {letterSpacing: 4, borderRadius: 10},
              styles.fs30,
              styles.black,
              styles.fontWSB,
              styles.col100,
            ]}
            placeholderTextColor="#d2d2d2"
            value={pin}
            onChangeText={(pin) => setPin(pin)}
          />
        </View>
        <TouchableOpacity
          style={[styles.center]}
          onPress={() => {
            setModalLupa(true);
          }}>
          <Text
            style={[
              styles.fontWSB,
              styles.white,
              styles.fs14,
              styles.mt10,
              styles.mb20,
            ]}>
            Lupa PIN Anda ?
          </Text>
        </TouchableOpacity>
        <View style={[styles.row, styles.rowWrap, styles.center, styles.mt10]}>
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
              !isLoading ? submitCheckLogin() : null;
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

      <View style={[styles.mr20, styles.ml20, styles.mb20, styles.mt10]}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#DDD')}
          onPress={() => {
            !isLoading ? setModalLogout(true) : null;
          }}>
          <View style={styles.btnPrimaryOutlineFull}>
            <Text style={[styles.green, styles.fontWSB, styles.fs13]}>
              Ganti Akun
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>

      <ModalNotif
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalLogout}
        onSwipeComplete={() => setModalLogout(false)}
        title={'Notifikasi'}
        message={'Apa Anda yakin akan Keluar ?'}
        titleClose={'Tidak'}
        titleButton={'Ya'}
        onPressClose={() => {
          setModalLogout(false);
        }}
        onPress={() => {
          submitLogout();
        }}
      />

      <ModalNotif
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalLupa}
        onSwipeComplete={() => setModalLupa(false)}
        title={'Notifikasi'}
        message={'Kode pemulihan PIN akan dikirim. Ingin melanjutkan ?'}
        titleClose={'Tidak'}
        titleButton={'Ya'}
        onPressClose={() => {
          setModalLupa(false);
        }}
        onPress={() => {
          submitReqPin();
        }}
      />
    </SafeAreaView>
  );
};

export default PinLogin;
