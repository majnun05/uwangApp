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
import {getRupiah} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import IconIntersectSuccess from '../../assets/svg/Intersect-success.svg';
import { IcLogoUw } from '../../assets';

const CatatSuccess = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [total, setTotal] = useState(params.total);
  const [message, setMessage] = useState(params.message);
  const [type, setType] = useState(params.type);

  useEffect(() => {
    const backAction = () => {
      navigation.push('Cashier');
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
          style={{top: '15%', width: '100%'}}>
          <View
            style={{
              flex: 1,
              justifyCenter: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <SvgXml xml={IcLogoUw} width={200} height={200}/>
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
              {message}
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
              Silahkan membuat tagihan baru
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
                Total {type === 'catat' ? 'Hutang' : 'Bayar'}
              </Text>
              <Text style={[{fontSize: 20, color: 'white'}, styles.fontWSB]}>
                Rp  {getRupiah(total)}
              </Text>
            </View>
          </View>
        </ScrollView>

        <Ripple
          onPress={() => {
            navigation.push('Cashier');
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
        
      </View>
    </SafeAreaView>
  );
};

export default CatatSuccess;
