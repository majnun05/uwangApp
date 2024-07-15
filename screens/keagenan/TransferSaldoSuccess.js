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
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import styles from '../../assets/styles/Style';
import IconIntersectSuccess from '../../assets/svg/Intersect-success.svg';
import moment from 'moment';
import 'moment/locale/id';
import { LogoMark, TrxSukses } from '../../assets';
moment.locale('id');

const TransferSaldoSuccess = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [total, setTotal] = useState(params.total);
  const [message, setMessage] = useState(params.message);
  const [title, setTitle] = useState(params.title);

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
          backgroundColor: '#FFFFFF',
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
            <SvgXml width={400} height={180} xml={TrxSukses} />
            <Text
              style={[
                {
                  fontSize: 18,
                  color: 'black',
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
                  color: 'black',
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
                paddingTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
              }}>
              <Text style={[{fontSize: 15, color: 'black'}, styles.fontWSR]}>
                Total {title}
              </Text>
              <Text style={[{fontSize: 20, color: 'black'}, styles.fontWSB]}>
                Rp {total}
              </Text>
            </View>
          </View>
        </ScrollView>

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#DDD')}
          onPress={() => {
            navigation.push('Home');
          }}>
          <View
            style={[
              styles.mb20,
              styles.ml20,
              styles.mr20,
              {
                width: '100%',
                backgroundColor: '#4F6CFF',
                padding: 12,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Text style={[styles.white, styles.fontWSB, styles.fs13]}>
              Selesai
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </SafeAreaView>
  );
};

export default TransferSaldoSuccess;
