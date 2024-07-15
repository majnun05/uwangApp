import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  TouchableNativeFeedback,
  Text,
  RefreshControl,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiUserValidPin} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_error} from '../../helpers/Helpers';
import IconRight from '../../assets/svg/right-black.svg';
import IconDelete from '../../assets/svg/delete.svg';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';

const PinForm = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [pin, setPin] = useState('');

  // ========================
  // === Check PIN ===
  // ========================
  const submitCheckPin = async () => {
    if (pin === '') {
      getSnackBar_error({
        title: 'Masukkan PIN Anda',
        duration: 'LENGTH_INDEFINITE',
      });
    } else {
      setIsLoading(true);
      await useApiPost(apiUserValidPin(), {
        pin: pin,
      })
        .then((res) => {
          setIsLoading(false);
          if (res.statusCode === 200) {
            return navigation.navigate('ChangePin');
          } else {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  const _onRefresh = () => {
    setIsLoading(false);
  };

  const addPin = (value) => {
    const codeNew = pin + value;
    if (codeNew.length < 7) {
      setPin(codeNew);
    }
  };

  const minPin = () => {
    let code = pin;
    if (code.length > 0) {
      const str = code.substring(0, code.length - 1);
      setPin(str);
    }
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

    return () => backHandler.remove();
  }, []);

  const Number = (value, disable) => {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#DDD')}
        onPress={() => {
          addPin(value);
        }}>
        <View
          style={{
            width: '33%',
            paddingTop: 20,
            paddingBottom: value === 0 ? 12.5 : 10,
          }}>
          <Text style={[styles.fs25, styles.textCenter, styles.black]}>
            {value}
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Ubah PIN'}
        shadow={true}
        right={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.bgWhite]}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }>
        <View style={[styles.center, styles.mt50]}>
          <Text style={[styles.fontWSR, styles.black, styles.fs13]}>
            Masukkan PIN Anda Saat Ini
          </Text>
        </View>
        <View style={[styles.ml20, styles.mr20, styles.mt20]}>
          <View
            style={[
              styles.CheckoutSectionStyleCheck,
              styles.ml20,
              styles.mr20,
              {borderColor: '#ddd', borderWidth: 1, borderRadius: 5},
            ]}>
            <TextInput
              keyboardType="numeric"
              textAlign={'center'}
              secureTextEntry={true}
              editable={false}
              placeholder={''}
              style={[
                {letterSpacing: 4},
                styles.fs30,
                styles.black,
                styles.fontWSB,
                styles.col100,
              ]}
              placeholderTextColor="#d2d2d2"
              value={pin}
              onChangeText={(pin) => setPin(pin)}
            />
          </View>
        </View>
        <View style={[styles.row, styles.rowWrap, styles.center, styles.mt20]}>
          {Number(1, false)}
          {Number(2, false)}
          {Number(3, false)}
          {Number(4, false)}
          {Number(5, false)}
          {Number(6, false)}
          {Number(7, false)}
          {Number(8, false)}
          {Number(9, false)}
          <TouchableNativeFeedback
            onPress={() => {
              !isLoading ? minPin() : null;
            }}
            background={TouchableNativeFeedback.Ripple('#DDD')}>
            <View
              style={[
                {
                  width: '33%',
                  paddingTop: 18,
                  paddingBottom: 10,
                },
                styles.center,
              ]}>
              <SvgXml
                width="30"
                height="30"
                style={[
                  {
                    alignSelf: 'center',
                  },
                  styles.mb10,
                ]}
                xml={IconDelete}
              />
            </View>
          </TouchableNativeFeedback>
          {Number(0, false)}
          <TouchableNativeFeedback
            onPress={() => {
              !isLoading ? submitCheckPin() : null;
            }}>
            <View
              style={[
                {
                  width: '33%',
                  paddingTop: 25,
                  paddingBottom: 10,
                },
                styles.center,
              ]}>
              <SvgXml
                width="30"
                height="30"
                style={[
                  {
                    alignSelf: 'center',
                  },
                  styles.mb10,
                ]}
                xml={IconRight}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PinForm;
