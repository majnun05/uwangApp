import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  TextInput,
  Text,
  RefreshControl,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {apiUserChangePin} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_success, getSnackBar_error} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';

const ChangePinLogin = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);

  const newPinChange = (value, index) => {
    setNewPin(value.replace(/[^0-9]/g, ''));
    setForm2(false);
  };

  const confirmPinChange = (value, index) => {
    setConfirmPin(value.replace(/[^0-9]/g, ''));
    setForm3(false);
  };

  const submitChange = async () => {
    if (newPin === '' || confirmPin === '') {
      newPin ? setForm2(false) : setForm2(true);
      confirmPin ? setForm3(false) : setForm3(true);
    } else if (newPin !== confirmPin) {
      getSnackBar_error({
        title: 'PIN baru dan Konfirmasi tidak sesuai',
        duration: 'LENGTH_LONG',
      });
    } else {
      setIsLoading(true);
      await useApiPost(apiUserChangePin(), {
        newPin: newPin,
        confirmPin: confirmPin,
      })
        .then((res) => {
          setIsLoading(false);
          if (res.statusCode === 200) {
            setNewPin('');
            setConfirmPin('');
            return navigation.navigate('PinLogin');
          } else {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_LONG',
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
        <View style={[styles.boxBottomBorder]}>
          <View style={styles.PulsaLabelPhone}>
            <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>
              PIN Baru
            </Text>
          </View>
          <View
            style={[
              styles.sectionForm,
              {
                borderBottomColor: form2 ? 'red' : '#ddd',
                marginBottom: form2 ? 10 : 5,
              },
            ]}>
            <TextInput
              autoCorrect={false}
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              placeholder="Masukkan PIN Baru"
              placeholderTextColor="#d2d2d2"
              value={newPin}
              onChangeText={newPinChange}
              maxLength={6}
              secureTextEntry={true}
              keyboardType="numeric"
            />
            {form2 ? (
              <View style={{position: 'absolute', left: 2, bottom: -18}}>
                <Text style={{color: 'red', fontSize: 10}}>
                  Masukkan PIN Baru
                </Text>
              </View>
            ) : null}
          </View>
          <View style={styles.PulsaLabelPhone}>
            <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>
              Konfirmasi PIN Baru
            </Text>
          </View>
          <View
            style={[
              styles.sectionForm,
              {
                borderBottomColor: form3 ? 'red' : '#ddd',
                marginBottom: form3 ? 10 : 5,
              },
            ]}>
            <TextInput
              autoCorrect={false}
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              placeholder="Masukkan Konfirmasi PIN Baru"
              placeholderTextColor="#d2d2d2"
              value={confirmPin}
              onChangeText={confirmPinChange}
              maxLength={6}
              secureTextEntry={true}
              keyboardType="numeric"
            />
            {form3 ? (
              <View style={{position: 'absolute', left: 2, bottom: -18}}>
                <Text style={{color: 'red', fontSize: 10}}>
                  Masukkan Konfirmasi PIN Baru
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <Ripple
          onPress={() => {
            !isLoading ? submitChange() : null;
          }}
          style={[styles.btnBuyNowFormGreen, styles.mt10]}>
          <Text
            style={[styles.fs13, styles.white, styles.fontWSM]}
            uppercase={false}>
            Set PIN
          </Text>
        </Ripple>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePinLogin;
