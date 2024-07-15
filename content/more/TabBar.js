import React, {useState, useEffect, createRef} from 'react';
import {
  ImageBackground,
  Text,
  TouchableNativeFeedback,
  View,
  Alert,
  Dimensions,
  ScrollView,
  BackHandler,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid,
  Animated
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  BgQrcode,
  CsActive,
  CsNonActive,
  IcFlashOff,
  IcGaleryCam,
  IcHistoryOff,
  IcHistoryOn,
  IcHomeOff,
  IcHomeOn,
  IcProfileOff,
  IcProfileOn,
  ImgScan,
  IcFlashOn,
  LogoHorizontal,
  logoQr,
  LogoMark,
  IcArrR,
  IcQrisScan,
  IcScanWhite,
  ICQrisBlack,
  IcCloseXblack
} from '../../assets';
import {Fonts} from '../../assets/fonts/Fonts';
import styles from '../../assets/styles/Style';
import IconScan from '../../assets/svg/scan.svg';
import IconQr from '../../assets/svg/qr-code.svg';
import IcQris from '../../assets/svg/logoQrisUwang.svg';
import Modal from 'react-native-modal';
import { getSession } from '../../helpers/Helpers';
import QRCode from 'react-native-qrcode-svg';
// import { RNCamera } from 'react-native-camera';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import { apiTransactionCheckUser } from '../../helpers/endPoint';
import { useApiPost } from '../../helpers/useFetch';
import IconClose from '../../assets/svg/close.svg';

const WIDTH = Dimensions.get('window').width
const HEIGH = Dimensions.get('window').height


const actionSheetRef = createRef();

// end icon bottom tab
const PendingView = () => (
  <ActivityIndicator size="large" color="#4F6CFF" />
);

const TabBar = ({state, descriptors, navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [flash, setFlash] = useState(false)
  const [idUser, setIdUser] = useState('TPD3');
  const [nameUser, setNameUser] = useState('Username');
  const [isLoading, setIsLoading] = useState(false)
  const [delay, setDelay] = useState(false)

  const isLogged = async () => {
    let idUser_ = await getSession('idUser').then((idUser) => {
      return idUser;
    });
    let nameUser_ = await getSession('nameUser').then((nameUser) => {
      return nameUser;
    });
    setIdUser(idUser_);
    setNameUser(nameUser_);
  };

  

  const onSuccess = async (e) => {
    setIsLoading(true);
    setDelay(true)
    await useApiPost(apiTransactionCheckUser(), {
      transferTo: e.data,
    })
      .then((res) => {
        setIsLoading(false);
        setDelay(false)
        if (res.statusCode === 200) {
          actionSheetRef.current?.setModalVisible(false);
          navigation.push('TransferSaldo', {
            idReseller: e.data,
          });
        } else {
          ToastAndroid.show(res.values.message, ToastAndroid.SHORT)
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const loadingScan = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }

  const delayIcon = () => {
    setDelay(true)
    setTimeout(() => {
      setDelay(false)
    }, 2500);
  }

  useEffect(() => {
    // Return the function to unsubscribe from the event so it gets removed on unmount
    const backAction = () => {
      navigation.goBack(null);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    isLogged();

    return () => backHandler.remove();
    
  }, []);

  const navigateQris = () => {
    actionSheetRef.current?.setModalVisible(false);
    navigation.navigate('Maintenance')
  }

  const renderIcon = (menu, isFocused) => {
    if (menu === 'Home') {
      if (isFocused) {
        return <SvgXml width={26} height={26} xml={IcHomeOn} />;
      } else {
        return <SvgXml width={26} height={26} xml={IcHomeOff} />;
      }
    } else if (menu === 'Profile') {
      if (isFocused) {
        return <SvgXml width={26} height={26} xml={IcProfileOn} />;
      } else {
        return <SvgXml width={26} height={26} xml={IcProfileOff} />;
      }
    } else if (menu === 'Hubungi Kami') {
      if (isFocused) {
        return <SvgXml width={35} height={35} xml={CsActive} />;
      } else {
        return <SvgXml width={35} height={35} xml={CsNonActive} />;
      }
    } else if (menu === 'RiwayatAllTrx') {
      if (isFocused) {
        return <SvgXml width={26} height={26} xml={IcHistoryOn} />;
      } else {
        return <SvgXml width={26} height={26} xml={IcHistoryOff} />;
      }
    } else {
      if (isFocused) {
        return (
          <ImageBackground
            source={ImgScan}
            style={{
              width: 75,
              height: 75,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              bottom: 8,
            }}>
            <View style={{marginBottom: 15}}>
              <SvgXml width={30} height={30} xml={IcScanWhite} />
            </View>
            <Text
              style={{
                position: 'absolute',
                bottom: 15,
                fontSize: 12,
                color: '#FFFFFF',
                fontFamily: Fonts.WSB,
              }}>
              Scan
            </Text>
          </ImageBackground>
        );
      } else {
        return (
          <ImageBackground
            source={ImgScan}
            style={{
              width: 75,
              height: 75,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              bottom: 8,
            }}>
            <View style={{marginBottom: 15}}>
              <SvgXml width={30} height={30} xml={IcScanWhite} />
            </View>
            <Text
              style={{
                position: 'absolute',
                bottom: 15,
                fontSize: 12,
                color: '#FFFFFF',
                fontFamily: Fonts.WSB,
              }}>
              Scan
            </Text>
          </ImageBackground>
        );
      }
    }
  };

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.footerTab}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name === 'ScanQr') {
              loadingScan()
              delayIcon()
              actionSheetRef.current?.setModalVisible();
            } else {
              navigation.navigate(route.name);
            }
            // navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableNativeFeedback
            key={index}
            // background={TouchableNativeFeedback.Ripple('#DDD')}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View
              style={
                label === 'Hubungi Kami'
                  ? [styles.col30, styles.center, styles.flex1]
                  : [styles.col175, styles.center, styles.flex1]
              }>
              {renderIcon(label, isFocused)}
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={
                  isFocused
                    ? [
                        styles.blue,
                        styles.fs11,
                        styles.fontWSB,
                        label === 'Hubungi Kami' ? styles.mb5 : styles.mt2,
                      ]
                    : [
                        styles.grey75,
                        styles.fs11,
                        styles.fontWSR,
                        label === 'Hubungi Kami' ? styles.mb5 : styles.mt2,
                      ]
                }
                uppercase={false}>
                {label === 'Hubungi Kami' ? 'Cust Service' : label === 'RiwayatAllTrx' ? 'History' : label}
              </Text>
            </View>
          </TouchableNativeFeedback>
        );
      })}

  
    </View>
  );
};

export default TabBar;
