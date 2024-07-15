import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  ViewPropTypes,
  Platform,
  Linking,
  InteractionManager,
  Dimensions,
  ImageBackground
} from 'react-native';
import PropTypes from 'prop-types';
import AppIntroSlider from 'react-native-app-intro-slider';
import SplashScreen from 'react-native-splash-screen';
import StatusBars from '../../content/more/StatusBar';
import {Fonts} from '../../assets/fonts/Fonts';
import {useApiGetError} from '../../helpers/useFetch';
import {apiGetErrorMessage} from '../../helpers/endPoint';
import {useNavigation} from '@react-navigation/native';
import styles_g from '../../assets/styles/Style';
import IconLogo from '../../assets/svg/logoTextGreen.svg';
import {SvgXml} from 'react-native-svg';
import {
  getSession,
  getSnackBar_success,
  setSession,
} from '../../helpers/Helpers';
// import FingerprintScanner from 'react-native-fingerprint-scanner';
import Database from '../../helpers/Database';
const db = new Database();

const styles = StyleSheet.create({
  image_: {
    width: '60%',
    height: '50%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bxLoadingIntro: {
    flex: 1,
    height: '100%',
    width: '100%',
    zIndex: 10000,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  iconIntro: {
    borderRadius: 10,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    top: '10%',
  },
  title: {
    color: '#ffffff',
    fontFamily: Fonts.WSB,
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    marginTop: 10,
    color: '#000000',
    fontFamily: Fonts.WSB,
    fontSize: 15,
    textAlign: 'center',
  },
  next: {
    color: '#ffffff',
    fontFamily: Fonts.WSB,
    fontSize: 16,
    paddingHorizontal:15,
    paddingVertical:10
  },
});

const slides = [
  {
    key: 'somethun',
    title: 'Selamat Datang',
    text:
      'Thank you for your Interest In Uwang .\nI appreclate you taking the time to\ntest out out tools',
    image: require('../../assets/img/intro1.png'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
  {
    key: 'somethun-dos',
    title: 'Beli dan Bayar apapun',
    text:
      'Thank you for your Interest In Uwang .\nI appreclate you taking the time to\ntest out out tools',
    image: require('../../assets/img/intro2.png'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
  {
    key: 'somethun1',
    title: 'Program Cashback',
    text:
      'Thank you for your Interest In Uwang .\nI appreclate you taking the time to\ntest out out tools',
    image: require('../../assets/img/intro3.png'),
    imageStyle: styles.image,
    backgroundColor: '#ffffff',
  },
];

const Intro = () => {
  const navigation = useNavigation();
  const [isLoadingError, setIsLoadingError] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(
    'Mohon Tunggu Sebentar ...',
  );
  let isMounted = true;

  const profileLogin = async (pn) => {
    let isLogged = await getSession('isLoggedV2').then((isLogged) => {
      return isLogged;
    });
    setIsLoading(false);
    if (isLogged === 'yes') {
      if (pn === 'no') {
        navigation.replace('Home');
      } else {
        navigation.navigate('PinLogin');
      }
    } else {
      navigation.navigate('Login');
    }
  };

  // const showAuthenticationDialog = () => {
  //   FingerprintScanner.authenticate({
  //     description: 'Masuk Aplikasi Uwang  Dengan Finger Print',
  //   })
  //     .then((res) => {
  //       getSnackBar_success({
  //         title: 'Login Berhasil',
  //         duration: 'LENGTH_INDEFINITE',
  //       });
  //       navigation.replace('Home');
  //     })
  //     .catch((error) => {
  //       navigation.navigate('PinLogin');
  //     });
  // };

  requiresLegacyAuthentication = () => {
    return Platform.Version < 23;
  };

  const isLogged = async () => {
    let isLogged = await getSession('isLoggedV2').then((isLogged) => {
      return isLogged;
    });
    let pinAplikasi = await getSession('pinAplikasi').then((pinAplikasi) => {
      return pinAplikasi;
    });
    let fingerPrint = await getSession('fingerPrint').then((fingerPrint) => {
      return fingerPrint;
    });

    if (isLogged === 'yes') {
      if (fingerPrint === 'yes') {
        // showAuthenticationDialog();
        // FingerprintScanner.release();
      } else {
        profileLogin(pinAplikasi);
      }
    } else {
      setSession({name: 'countBadge', value: '0'});
      setIsLoading(false);
    }
  };

  const getErrorMessage = async () => {
    let isLogged = await getSession('isLoggedV2').then((isLogged) => {
      return isLogged;
    });
    if (isLogged === 'yes') {
      setIsLoadingError(false);
    } else {
      useApiGetError(apiGetErrorMessage(), {})
        .then((res) => {
          if (isMounted) {
            setIsLoadingError(false);
            if (res.statusCode === 200) {
              let val = res.values;

              setSession({
                name: 'errorMessage',
                value: JSON.stringify(val.data),
              });
            } else {
              setSession({name: 'errorMessage', value: '{}'});
            }
          }
        })
        .catch((error) => {
          setIsLoadingError(false);
        });
    }
  };

  const createDB = async () => {
    db.createDatabase()
      .then((data) => {
        insertNotification();
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const insertNotification = async () => {
    let dataas = {
      idReseller: '1234',
      total: 0,
    };
    db.addNotification(dataas)
      .then((data) => {
        //log
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const onLink = ({url}) => {
    let referal;
    if (url) {
      referal = url.split('/kodereferal/')[1];
    } else {
      referal = '-';
    }
    setSession({name: 'kodereferal', value: referal});
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // refresh back screen
      isLogged();
      // end refresh back screen
    });

    InteractionManager.runAfterInteractions(() => {
      getErrorMessage();
    });

    SplashScreen.hide();
    createDB();

    Linking.getInitialURL()
      .then((url) => onLink({url}))
      .catch((err) =>
        console.error('An error occurred getting the initial page', err),
      );

    return () => {
      unsubscribe();
      isMounted = false;
    };
  }, [navigation]);

  const _onDone = () => {
    if (!isLoadingError) {
      setLoadingMessage('Mohon Tunggu Sebentar ...');
      setIsLoading(false);
      navigation.navigate('Login');
    }
  };

  const _renderItem = ({item}) => {
    return (
      <Image
        resizeMethod="resize"
        source={item.image}
        style={{
          flex: 1,
          width: Dimensions.get('window').width,
          height: '100%',
        }}
        resizeMode="cover"
      />
    );
  };

  const _donebtn = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'#4F6CFF',
          borderRadius:8
        }}>
        <Text style={styles.next}>
          {isLoadingError ? 'Loading ...' : 'Selesai'}
        </Text>
      </View>
    );
  };

  const _nextbtn = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'#4F6CFF',
          borderRadius:8
        }}>
        <Text style={styles.next}>
          {isLoadingError ? 'Loading ...' : 'Lanjut'}
        </Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
        }}>
        {/* <View style={(styles_g.mt20, {marginLeft: 20, marginTop: 20})}>
          <SvgXml width="120" height="50" xml={IconLogo} />
        </View> */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#4F6CFF" />
          <Text
            style={[
              styles_g.fontWSM,
              styles_g.fs15,
              styles_g.grey75,
              styles_g.mt10,
            ]}>
            {loadingMessage}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1,}}>
      <StatusBars />

      <AppIntroSlider
        activeDotStyle={{backgroundColor: '#4F6CFF', width:20}}
        buttonStyle={{backgroundColor: '#ffffff'}}
        data={slides}
        onDone={_onDone}
        renderItem={_renderItem}
        bottomButton
        renderDoneButton={_donebtn}
        renderNextButton={_nextbtn}
      />

    </View>
  );
};

Intro.propTypes = {
  // onAuthenticate: PropTypes.func.isRequired,
  handlePopupDismissedLegacy: PropTypes.func,
  style: ViewPropTypes.style,
};
export default Intro;
