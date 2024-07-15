import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/id';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {SvgXml} from 'react-native-svg';
import {IcSucces} from '../../assets';
import styles from '../../assets/styles/Style';
moment.locale('id');

const RateSuccess = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [message, setMessage] = useState(params.message);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack(null);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          backgroundColor: '#4F6CFF',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{top: '23%', width: '100%'}}>
          <View
            style={{
              flex: 1,
              justifyCenter: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <SvgXml xml={IcSucces} width={200} height={200} />
            <Text
              style={[
                {
                  fontSize: 18,
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                },
                styles.fontWSB,
              ]}>
              Penilaian berhasil dikirim
            </Text>
            <Text
              style={[
                {
                  fontSize: 12,
                  color: 'white',
                  textAlign: 'center',
                  marginTop: 5,
                },
                styles.fontWSR,
              ]}>
              {message === 'success'
                ? 'Terimakasih atas penilaian & saran anda'
                : message}
            </Text>
          </View>
        </ScrollView>

        <Ripple
          onPress={() => {
            Linking.openURL(
              'https://play.google.com/store/apps/details?id=com.uwang.android',
            );
          }}
          style={[
            styles.btnPrimaryOutlineFull,
            styles.mb10,
            styles.ml20,
            styles.mr20,
          ]}>
          <Text style={[styles.green, styles.fontWSB, styles.fs13]}>
            Rating kami di Google Play
          </Text>
        </Ripple>

        <Ripple
          onPress={() => {
            navigation.goBack(null);
          }}
          style={[
            styles.btnPrimaryOutlineFull,
            styles.mb20,
            styles.ml20,
            styles.mr20,
          ]}>
          <Text style={[styles.green, styles.fontWSB, styles.fs13]}>
            Kembali
          </Text>
        </Ripple>
      </View>
    </SafeAreaView>
  );
};

export default RateSuccess;
