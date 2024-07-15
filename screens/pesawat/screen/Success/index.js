import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import styles from '../../../../assets/styles/Style';
import IconIntersectSuccess from '../../../../assets/svg/Intersect-success.svg';

const Success = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [totalBayar, settotalBayar] = useState('params.totalBayar');
  const [message, setmessage] = useState('params.message');

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
          backgroundColor: '#00A79D',
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
              source={require('../../../../assets/img/sukses-transaksi.png')}
              resizeMode="contain"
              style={{width: 220, height: 220}}
            />
            <Text
              style={[
                {
                  fontSize: 20,
                  color: 'white',
                  textAlign: 'center',
                },
                styles.fontWSB,
              ]}>
              Pembayaran Sukses
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
              {message ? message : 'Transaksi Anda Sedang Dalam Proses'}
            </Text>

            <View
              style={{
                width: '100%',
                marginTop: 40,
                paddingTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#00A79D',
                borderTopColor: '#ddd',
                borderTopWidth: 0.7,
              }}>
              <Text style={[{fontSize: 15, color: 'white'}, styles.fontWSR]}>
                Total Pembayaran
              </Text>
              <Text style={[{fontSize: 20, color: 'white'}, styles.fontWSB]}>
                Rp  {totalBayar}
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
          <Text style={[styles.green, styles.fontWSB, styles.fs13]}>
            Selesai
          </Text>
        </Ripple>

        <View
          style={{
            position: 'absolute',
            zIndex: -1,
            bottom: '-3%',
            right: '0%',
            borderTopRightRadius: 100,
            borderTopLeftRadius: 100,
          }}>
          <SvgXml width={190} height={190} xml={IconIntersectSuccess} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Success;
