import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/id';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {LogoMark, LogoVertical} from '../../assets';
import styles from '../../assets/styles/Style';
import {apiUserCheckKyc} from '../../helpers/endPoint';
import {useApiPost} from '../../helpers/useFetch';
moment.locale('id');

const Maintenance = (props) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [checkKyc, setCheckKyc] = useState('0');

  // ========================
  // === Get Reference ===
  // ========================
  const getCheckKyc = async () => {
    await useApiPost(apiUserCheckKyc(), {})
      .then((res) => {
        setIsLoading(false);
        if (res.statusCode === 200) {
          let val = res.values;
          setCheckKyc(val.data.registered);
        } else {
          setCheckKyc('0');
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const _onRefresh = () => {
    setIsLoading(true);
    getCheckKyc();
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

    getCheckKyc();

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgBlue]}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }>
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <Image
            style={{width: 200, height: 200}}
            resizeMode="stretch"
            source={LogoMark}
          />
          <Text
            style={[
              styles.mb30,
              styles.fontWSR,
              styles.fs18,
              styles.white,
              styles.mt30,
              styles.centerText,
            ]}>
            Lengkapi{' '}
            <Text
              style={[
                styles.fontWSB,
                styles.fs18,
                styles.white,
                styles.centerText,
              ]}>
              Data Diri Akun Anda
            </Text>
            {'\n'}
            Untuk Dapat Menggunakan{'\n'}Fitur Ini
          </Text>
          <Ripple
            onPress={() => {
              if (checkKyc === '0') {
                navigation.navigate('ProfileKycRegister');
              } else {
                navigation.navigate('ProfileChange', {
                  checkKyc: checkKyc,
                });
              }
            }}
            style={[styles.btnWhiteOutlineFull, styles.mb10]}>
            <Text style={[styles.green, styles.fontWSB, styles.fs13]}>
              Lengkapi Sekarang
            </Text>
          </Ripple>
          <Ripple
            onPress={() => {
              navigation.goBack(null);
            }}
            style={[styles.btnTranparent, styles.mb20]}>
            <Text style={[styles.white, styles.fontWSB, styles.fs13]}>
              Kembali
            </Text>
          </Ripple>
        </View>
      </ScrollView>

      {/* <View
          style={{
            position: 'absolute',
            zIndex: -1,
            bottom: '-3%',
            right: '0%',
            borderTopRightRadius: 100,
            borderTopLeftRadius: 100,
          }}>
          <SvgXml width={190} height={190} xml={IconIntersectSuccess} />
        </View> */}
    </SafeAreaView>
  );
};

export default Maintenance;
