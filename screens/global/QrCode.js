import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {LogoMark, LogoVertical} from '../../assets';
import styles from '../../assets/styles/Style';
import {getSession} from '../../helpers/Helpers';

const QrCode = () => {
  const navigation = useNavigation();
  const [idUser, setIdUser] = useState('TPD3');
  const [nameUser, setNameUser] = useState('Username');

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

  useEffect(() => {
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

  return (
    <SafeAreaView style={[styles.flex1, styles.bgBlue]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.flex1]}>
          <View style={[styles.boxQrcode, styles.containerQr, styles.bgBlue]}>
            <View
              style={[styles.center, styles.mb20, styles.ml20, styles.mr20]}>
              <Image
                style={{width: 130, height: 90}}
                resizeMode="stretch"
                source={LogoVertical}
              />
              <Text
                style={[
                  styles.mt30,
                  styles.fs14,
                  styles.white,
                  styles.fontWSM,
                  styles.centerText,
                ]}>
                Scan dengan Aplikasi Uwang {'\n'} Arahkan kamera ke area QR Code
              </Text>
            </View>
            <View
              style={[
                styles.bgWhite,
                styles.pt20,
                styles.pb20,
                styles.pl20,
                styles.pr20,
                {borderRadius: 10},
              ]}>
              <QRCode
                value={idUser}
                size={225}
                bgColor="#4F6CFF"
                fgColor="white"
              />
              <View style={{width:60, height:60, position:'absolute', alignSelf:'center', top:100, backgroundColor:'white', borderRadius: 60/2, alignItems:'center', justifyContent:'center'}}>
                <Image source={LogoMark} style={{width:45, height:45}}/>
              </View>
            </View>
            <View
              style={[
                styles.col100,
                styles.borderBottom1,
                styles.mt30,
                styles.pb10,
                styles.pl20,
                styles.pr20,
              ]}>
              <Text
                style={[
                  styles.fs20,
                  styles.white,
                  styles.fontWSM,
                  styles.centerText,
                ]}>
                {nameUser}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#DDD')}
        onPress={() => {
          navigation.goBack(null);
        }}>
        <View
          style={[
            styles.btnWhiteOutlineFull,
            styles.mb20,
            styles.ml20,
            styles.mr20,
          ]}>
          <Text style={[styles.green, styles.fontWSB, styles.fs13]}>
            Selesai
          </Text>
        </View>
      </TouchableNativeFeedback>
    </SafeAreaView>
  );
};

export default QrCode;
