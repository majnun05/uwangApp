import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import styles from '../../assets/styles/Style';
import IconIntersectSuccess from '../../assets/svg/Intersect-success.svg';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const Success = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [totalBayar, settotalBayar] = useState(params.totalBayar);
  const [message, setmessage] = useState(params.message);

  useEffect(() => {
    const backAction = () => {
      navigation.push('Home');
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
          backgroundColor: '#ffffff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{top: '15%', width: '100%'}}>
          <View
            style={{
              flex: 1,
              justifyCenter: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Image
              resizeMethod="resize"
              source={require('../../assets/img/BgSuccess.png')}
              resizeMode="contain"
              style={{width: 220, height: 220}}
            />
            <Text
              style={[
                {
                  fontSize: 20,
                  color: '#4F4F4F',
                  textAlign: 'center',
                  marginTop:10
                },
                styles.fontWSB,
              ]}>
              Pembayaran Sukses
            </Text>
            <Text
              style={[
                {
                  fontSize: 12,
                  color: '#4F4F4F',
                  textAlign: 'center',
                  marginTop: 10,
                },
                styles.fontWSR,
              ]}>
              {message ? message : 'Transaksi Anda Sedang Dalam Proses'}
            </Text>

            <View
              style={{
                width: '100%',
                marginTop: 40,
                paddingTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderTopColor: '#ddd',
                borderTopWidth: 0.7,
              }}>
              <Text style={[{fontSize: 15, color: '#4F4F4F'}, styles.fontWSR]}>
                Total Pembayaran
              </Text>
              <Text style={[{fontSize: 20, color: '#4F4F4F'}, styles.fontWSB]}>
                Rp {totalBayar}
              </Text>
            </View>
          </View>
        </ScrollView>

        <Ripple
          onPress={() => {
            navigation.push('Home');
          }}
          style={[
            styles.btnPrimaryOutlineFull,
            styles.mb20,
            styles.ml20,
            styles.mr20,
          ]}>
          <Text style={[styles.fontWSB, styles.fs13, {color:'blue'}]}>
            Selesai
          </Text>
        </Ripple>

      </View>
    </SafeAreaView>
  );
};

export default Success;
