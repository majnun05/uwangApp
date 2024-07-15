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
import styles from '../../assets/styles/Style';
import IconIntersectSuccess from '../../assets/svg/Intersect-success.svg';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const RewardsSuccess = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [message, setMessage] = useState(params.message);

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
              source={require('../../assets/img/success.png')}
              resizeMode="contain"
              style={{width: 250, height: 250}}
            />
            <Text
              style={[
                {
                  fontSize: 18,
                  color: 'white',
                  textAlign: 'center',
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

export default RewardsSuccess;
