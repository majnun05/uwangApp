import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View, BackHandler} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {blokAkun, ImgBlok} from '../../assets';
import s from '../../assets/styles/Style';
import {useNavigation} from '@react-navigation/native';

const UserBlok = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [msg, setMsg] = useState(params.msg ? params.msg : '');

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Login');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, [])

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#ffffff',
        flexGrow: 1,
      }}>
      <View style={{marginBottom: 100}}>
        <Image
          source={blokAkun}
          style={{width: 350, height: 250}}
          resizeMode="stretch"
        />

        <Text
          style={[s.fs18, s.fontWSB, {textAlign: 'center', color: 'black'}]}>
          Akun anda telah terblokir!
        </Text>
        <Text style={[s.fs13, s.fontWSR, {textAlign: 'center'}]}>
          Silahkan hubungi customer service
        </Text>
      </View>
      <View
        style={{
          width: '90%',
          position: 'absolute',
          bottom: 0,
          marginBottom: 20,
        }}>
        <Ripple
          style={[s.btnPrimary, {marginTop: 100}]}
          onPress={() => navigation.push('Bantuan')}>
          <Text style={[s.fs15, s.fontWSR, {color: '#ffffff'}]}>
            Hubungi Costumer Service
          </Text>
        </Ripple>
      </View>
    </ScrollView>
  );
};

export default UserBlok;
