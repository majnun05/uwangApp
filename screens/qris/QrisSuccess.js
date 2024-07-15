import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/id';
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
import {LogoVertical} from '../../assets';
import styles from '../../assets/styles/Style';
moment.locale('id');

const QrisSuccess = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [total, setTotal] = useState(params.total);
  const [message, setMessage] = useState(params.message);

  useEffect(() => {
    const backAction = () => {
      navigation.push('Qris');
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
            <Image
              style={{width: 280, height: 200}}
              resizeMode="stretch"
              source={LogoVertical}
            />
            <Text
              style={[
                {
                  fontSize: 18,
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: 20,
                },
                styles.fontWSB,
              ]}>
              Transaksi Sukses
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
              {message}
            </Text>

            <View
              style={{
                width: '100%',
                marginTop: 40,
                paddingTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#4F6CFF',
                borderTopColor: '#ddd',
                borderTopWidth: 0.7,
              }}>
              <Text style={[{fontSize: 15, color: 'white'}, styles.fontWSR]}>
                Total Penarikan
              </Text>
              <Text style={[{fontSize: 20, color: 'white'}, styles.fontWSB]}>
                Rp  {total}
              </Text>
            </View>
          </View>
        </ScrollView>

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#DDD')}
          onPress={() => {
            navigation.push('Qris');
          }}>
          <View
            style={[
              styles.btnPrimaryOutlineFull,
              styles.mb20,
              styles.ml20,
              styles.mr20,
            ]}>
            <Text style={[styles.green, styles.fontWSB, styles.fs13]}>
              Selesai
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </SafeAreaView>
  );
};

export default QrisSuccess;
