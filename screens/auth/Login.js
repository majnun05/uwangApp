import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useRef} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Image,
  ImageBackground,
  InteractionManager,
  Keyboard,
  KeyboardAvoidingView,
  PermissionsAndroid,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  Linking,
  Dimensions,
  Animated
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {selectContactPhone} from 'react-native-select-contact';
import {SvgXml} from 'react-native-svg';
import {BgAuth} from '../../assets/img';
import styles from '../../assets/styles/Style';
import IconContact from '../../assets/svg/contact.svg';
import IconLogo from '../../assets/svg/logos.svg';
import { IcKontak, LogoHorizontal } from '../../assets';
import ModalNotifs from '../../content/modal/ModalNotif';
import {apiRequestOtp, apiUtilityConfig} from '../../helpers/endPoint';
import {
  getSession,
  getSnackBar_error,
  replacePhone,
  setSession,
} from '../../helpers/Helpers';
import {useApiPost} from '../../helpers/useFetch';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

const WIDTH = Dimensions.get('window').width
const HEIGH = Dimensions.get('window').height

async function requestFineLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Izin Lokasi',
        message: 'Aplikasi Uwang membutuhkan izin lokasi Anda',
      },
    );
  } catch (err) {
    return false;
  }
}

async function requestCoarseLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Izin Lokasi',
        message: 'Aplikasi Uwang membutuhkan izin lokasi Anda',
      },
    );
  } catch (err) {
    return false;
  }
}

const Login = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [modalNotif, setModalNotif] = useState(false);
  const [form, setForm] = useState(false);
  const [check, setCheck] = useState('Login');
  const [phone, setPhone] = useState('');
  const [hash, setHash] = useState('');
  const [loginSms, setLoginSms] = useState('1');
  const [loginWa, setLoginWa] = useState('1');
  const [informasi, setInformasi] = useState('#');
  const [syarat, setSyarat] = useState('#');
  const [kebijakan, setKebijakan] = useState('#');
  let isMounted = true;

  const getPermisionCamera = async () => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Izin Kamera',
        message: 'Aplikasi Uwang membutuhkan izin Kamera Anda',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
    } catch (err) {
      getSnackBar_error({
        title: 'Aplikasi Uwang membutuhkan izin Kamera Anda',
        duration: 'LENGTH_LONG',
      });
    }
  };

  const loginCheck = async () => {
    let isLogged = await getSession('isLoggedV2').then((isLogged) => {
      return isLogged;
    });
    if (isLogged === 'yes') {
      navigation.replace('Home');
      if (isMounted) {
        setIsLoadingLogin(false);
      }
    } else {
      if (isMounted) {
        setIsLoadingLogin(false);
      }
    }
  };

  const getRef = async () => {
    await useApiPost(apiUtilityConfig(), {})
      .then((res) => {
        // console.log({res})
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values;
            setInformasi(val.values.informasi);
            setSyarat(val.values.syarat);
            setKebijakan(val.values.kebijakan);
            setSession({name: 'informasi', value: val.values.informasi.link});
            setSession({name: 'syarat', value: val.values.syarat.link});
            setSession({name: 'kebijakan', value: val.values.kebijakan.link});
          } else {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
            setSession({name: 'informasi', value: '#'});
            setSession({name: 'syarat', value: '#'});
            setSession({name: 'kebijakan', value: '#'});
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const isLogged = () => {
    useApiPost(apiUtilityConfig(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values.values;
            setLoginSms(val.login_sms);
            setLoginWa(val.login_wa);
          } else {
            setLoginSms('1');
            setLoginWa('1');
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  // const getHash = () =>
    // RNOtpVerify.getHash()
    //   .then((hash) => {
    //     if (isMounted) {
    //       setHash(hash);
    //     }
    //   })
      // .catch((error) => {
      //   // console.log(error)
      // });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // refresh back screen
      if (isMounted) {
        setIsLoadingLogin(true);
      }
      loginCheck();
      // getHash();
      // end refresh back screen
    });

    requestFineLocationPermission();
    requestCoarseLocationPermission();

    InteractionManager.runAfterInteractions(() => {
      getPermisionCamera();
      isLogged();
      getRef()
    });

    return () => {
      unsubscribe();
      isMounted = false;
    };
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setModalNotif(true);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

 

  const changeCheck = (cek) => {
    setCheck(cek);
  };

  const phoneChange = (value, index) => {
    setForm(false);
    if (value.indexOf('62') != -1) {
      var phones = replacePhone(value, '+62', '0');
      number = phones.replace(/ /g, '');
      number = phones.replace(/-/g, '');
    } else {
      var number = value;
    }
    setPhone(number);
  };

  const getPhoneNumber = () => {
    return selectContactPhone()
      .then((selection) => {
        let {selectedPhone} = selection;
        if (selectedPhone.number.indexOf('62') != -1) {
          var phone = ReplaceAll(selectedPhone.number, '+62', '0');
          phone = phone.replace(/ /g, '');
          phone = phone.replace(/-/g, '');
        } else {
          var phone = selectedPhone.number.replace(/-/g, '');
        }
        phoneChange(phone);
      })
      .catch((error) => {
        getSnackBar_error({
          title: 'Aplikasi Uwang membutuhkan izin kontak Anda',
          duration: 'LENGTH_LONG',
        });
      });
  };

  const openContact = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Izin Kontak',
          message: 'Aplikasi Uwang membutuhkan izin kontak Anda',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getPhoneNumber();
      }
    } catch (err) {
      getSnackBar_error({
        title: 'Aplikasi Uwang membutuhkan izin kontak Anda',
        duration: 'LENGTH_LONG',
      });
    }
  };

  const ReplaceAll = (Source, stringToFind, stringToReplace) => {
    if (stringToFind.indexOf('+62') != -1) {
      var temp = Source;
      var index = temp.indexOf(stringToFind);

      while (index != -1) {
        temp = temp.replace(stringToFind, stringToReplace);
        index = temp.indexOf(stringToFind);
      }

      return temp;
    } else {
      return stringToFind;
    }
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
  };

  const navigateOtp = () => {
    if(phone.length < 10){
      ToastAndroid.show('Nomor minimal 10 karakter', ToastAndroid.SHORT)
    }else{
      navigation.push('ChooseOtp', {
        sms: loginSms,
        wa: loginWa,
        phone: phone,
      }) 
    }
  }

  const openLink = async (link) => {
    try {
      const url = link;
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#4F6CFF',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#4F6CFF',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
      } else Linking.openURL(url);
    } catch (error) {
      // console.log(error.message);
    }
  };

  const openWebView = (val) => {
    if(val === '1'){
      if(syarat.link === '#'){
        return
      }else{
        openLink(syarat.link)
      }
    }else{
      if(kebijakan.link === '#'){
        return
      }else{
        openLink(kebijakan.link)
      }
    }
  }

  if (isLoadingLogin) {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View style={styles.mt20}>
          <SvgXml width="80" height="60" xml={IconLogo} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#4F6CFF" />
          <Text
            style={[styles.fontWSM, styles.fs15, styles.grey75, styles.mt10]}>
            Mohon Tunggu Sebentar ...
          </Text>
        </View>
      </View>
    );
  }



  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={['#4F6CFF', '#4F6CFF']}
              refreshing={isLoading}
              onRefresh={_onRefresh}
            />
          }>
          <ImageBackground
            source={BgAuth}
            style={[
              styles.pb10,
              styles.pt15,
              styles.pl20,
              styles.pr20,
              {
                overflow: 'hidden',
                width: '100%',
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
              },
            ]}>
            <View style={[styles.row, styles.mt10]}>
              <View style={[styles.col70, styles.justifyContent]}>
                <Image source={LogoHorizontal} style={{width:110, height:35}} resizeMode="stretch" />
              </View>
              <View style={[styles.col30, styles.RightText]}>
                <TouchableOpacity
                  style={[styles.btnBantuan]}
                  onPress={() => {
                    navigation.navigate('Bantuan');
                  }}
                  activeOpacity={0.8}>
                  <Text style={[styles.blue, styles.bold, styles.fs12]}>
                    Bantuan
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.justifyContent, styles.mt30, styles.mb60]}>
              <Text 
                style={[styles.white, styles.fontMSB, styles.fs30, styles.ls2, ]}>
                Selamat Datang{'\n'}di Uwang
              </Text>
              <Text
                style={[
                  styles.white,
                  styles.fs14,
                  styles.mt10,
                  styles.fontWSR,
                  
                ]}>
                Aplikasi Dompet Digital untuk{'\n'}
                mempermudah pembayaran
              </Text>
            </View>
          </ImageBackground>
          <View style={[styles.p15, styles.centerOtpWabaru]}>
            <Text
              style={[
                styles.black,
                styles.fontWSB,
                styles.fs18,
                styles.textCenter,
              ]}>
              {check}
            </Text>
            <Text style={[styles.black, styles.fs15, styles.mt10, styles.pl2]}>
              Masukkan Nomor Telepon
            </Text>
            <View style={[styles.col100]}>
              <View
                style={[
                  styles.boxFormOtp,
                  form ? styles.borderBottomRed : null,
                  form ? styles.mb20 : null,
                ]}>
                <TextInput
                  editable={isLoading ? false : true}
                  autoCorrect={false}
                  style={[styles.formInputOtp, {width:WIDTH/1.4}]}
                  keyboardType={'numeric'}
                  placeholder="Contoh : 082215xxxxx"
                  placeholderTextColor="#d2d2d2"
                  underlineColorAndroid="transparent"
                  value={phone}
                  onChangeText={phoneChange}
                  maxLength={14}
                />
                <TouchableOpacity
                  style={styles.hrefContact}
                  onPress={() => {
                    !isLoading ? openContact() : null;
                  }}>
                  <SvgXml
                    width="25"
                    height="25"
                    style={styles.iconContactStyle}
                    xml={IcKontak}
                  />
                </TouchableOpacity>
                {form ? (
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 10,
                      position: 'absolute',
                      left: 2,
                      bottom: -18,
                    }}>
                    Masukkan Nomor Telepon Anda
                  </Text>
                ) : null}
              </View>

              <View style={[styles.pr4, styles.pl4]}>
                {phone.length > 8 ? (
                  <View style={[styles.col100]}>
                    <Ripple
                      onPress={() => navigateOtp()}
                      style={[
                        styles.btnOtpActive,
                        {alignItems: 'center', justifyContent: 'center'},
                      ]}>
                      <Text style={[styles.white, styles.bold, styles.fs18]}>
                        Lanjutkan
                      </Text>
                    </Ripple>
                  </View>
                ) : (
                  <View style={[styles.col100]}>
                    <View
                      style={[
                        styles.btnOtpNew,
                        {alignItems: 'center', justifyContent: 'center'},
                      ]}>
                      <Text style={[styles.white, styles.bold, styles.fs18]}>
                        Lanjutkan
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
            
            <Text
              style={[
                styles.grey92,
                styles.fs13,
                styles.pl3,
                {marginTop: 8, textAlign: 'center'},
              ]}>
              Dengan masuk atau daftar, kamu sudah setuju dengan{' '}
              <Text onPress={() => openWebView('1')} style={[styles.blue, styles.fs13, styles.fontWSB]}>
                  Ketentuan Layanan
                  </Text>{' '}
                  dan{' '}
                  <Text onPress={() => openWebView('2')} style={[styles.blue, styles.fs13, styles.fontWSB]}>
                    Kebijakan Privasi{' '}
                  </Text>
              Uwang.
            </Text>
      
        
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ModalNotifs
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalNotif}
        onSwipeComplete={() => setModalNotif(false)}
        title={'Notifikasi'}
        message={'Apa Anda yakin akan Keluar ?'}
        titleClose={'Tidak'}
        titleButton={'Ya'}
        onPressClose={() => {
          setModalNotif(false);
        }}
        onPress={() => {
          BackHandler.exitApp();
        }}
      />
    </SafeAreaView>
  );
};

export default Login;
