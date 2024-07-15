import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  Dimensions,
  AnimationEffect,
  View,
  ActivityIndicator,
  ReadableStreamReader,
  TouchableOpacity,
  Text,
  Animated,
  ToastAndroid
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiTransactionCheckUser} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_error} from '../../helpers/Helpers';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/HeaderRight';
import IconScan from '../../assets/svg/scan.svg';
import IcQr from '../../assets/svg/QrCode.svg';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Notifikasi = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const animated = new Animated.Value(1);
  const duration = 2000;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animated, {
          toValue: Dimensions.get('window').height - 210,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(animated, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  makeSlideOutTranslation = async (translationType, fromValue) => {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18,
      },
      to: {
        [translationType]: fromValue,
      },
    };
  };

  const onSuccess = async (e) => {
    setIsLoading(true);
    await useApiPost(apiTransactionCheckUser(), {
      transferTo: e.data,
    })
      .then((res) => {
        setIsLoading(false);
        if (res.statusCode === 200) {
          navigation.push('TransferSaldo', {
            idReseller: e.data,
          });
        } else {
          refreshQr()
          ToastAndroid.show(res.values.message, ToastAndroid.SHORT)
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const refreshQr = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack()}
        title={'Scan QR'}
        shadow={true}
        right={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('QrCode', {
                reseller_id: '',
              });
            }}
            style={[styles.rightText, {backgroundColor:'white', padding:1.5, borderRadius:2}]}>
            <SvgXml width={20} height={20} xml={IcQr} />
          </TouchableOpacity>
        }
      />

      {isLoading ? (
        <View style={[styles.center, styles.mt50]}>
          <ActivityIndicator size="large" color="#4F6CFF" />
        </View>
      ) : (
        //   <QRCodeScanner
        //   showMarker
        //   onRead={onSuccess.bind(this)}
        //   style={ReadableStreamReader}
        //   cameraType={AnimationEffect}
        //   cameraStyle={{height: SCREEN_HEIGHT}}
        //   customMarker={
        //     <View style={{flex: 1}}>
        //       <View style={{flex: 1, alignSelf: 'center', }}>
        //         <Animated.View style={[{
        //               backgroundColor: '#23ba00',
        //               height: 5,
        //               width: SCREEN_WIDTH,
        //             },{transform: [{translateY: animated}]}]}>
                 
        //         </Animated.View>
        //       </View>

        //       <View style={[styles.bottomOverlay]}>
        //         <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        //           Arahkan ke Barcode PLN
        //         </Text>
        //       </View>
        //     </View>
        //   }
        // />
        <QRCodeScanner
          showMarker
          onRead={onSuccess.bind(this)}
          style={ReadableStreamReader}
          cameraType={AnimationEffect}
          cameraStyle={{height: SCREEN_HEIGHT}}
          customMarker={
            <View style={[styles.rectangleContainer, styles.zIndex10rb]}>
              <View style={styles.topOverlay}>
                <Text style={styles.titleKet}>
                  Arahkan kode QR ke area yang sudah di tentukan
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={styles.leftAndRightOverlay} />

                <View style={styles.rectangle}>
                  <SvgXml width="22" height="22" xml={IconScan} />
                </View>

                <View style={styles.leftAndRightOverlay} />
              </View>

              <View style={[styles.bottomOverlay, styles.center]}>
                <TouchableOpacity
                  onPress={() => refreshQr()}
                  style={styles.btnOutlineWhite}>
                  <Text style={[styles.white, styles.fontWSM]}>Refresh</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Notifikasi;
