import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LogoMark, LogoVertical} from '../../assets';
import styles from '../../assets/styles/Style';

const Maintenance = (props) => {
  const navigation = useNavigation();
  const [message, setMessage] = useState(
    'Fitur ini sedang dalam pengembangan\nkami untuk memberikan layanan yang\nlebih baik untuk Anda',
  );

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
    <SafeAreaView
      style={[
        styles.flex1,
        {
          backgroundColor: '#4F6CFF',
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <Image
        style={{width: 200, height: 200}}
        resizeMode="stretch"
        source={LogoMark}
      />
      <View style={{alignItems: 'center'}}>
        <Text style={[styles.fs16, styles.white, styles.fontWSB]}>
          Fitur ini sedang dalam pengembangan
        </Text>
        <Text style={[styles.fs16, styles.white, styles.fontWSB]}>
          kami untuk memberikan layanan yang
        </Text>
        <Text style={[styles.fs16, styles.white, styles.fontWSB]}>
          lebih baik untuk Anda
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack(null)}
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          width: '90%',
          height: 40,
          borderRadius: 6,
          marginTop: 40,
        }}>
        <Text style={[styles.fs13, styles.fontWSB, {color: '#4F6CFF'}]}>
          Kembali
        </Text>
      </TouchableOpacity>
      {/* <Image
        resizeMethod="resize"
        source={require('../../assets/img/maintenance.png')}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
        }}
        resizeMode="stretch"
      /> */}
    </SafeAreaView>
  );
};

export default Maintenance;
