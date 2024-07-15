import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  InteractionManager,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {apiUtilityReference, apiTransactionCheck} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {
  getSnackBar_error,
  getRupiah,
  replacePhone,
} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import InputPhone from '../../content/form/InputPhone';
import Keterangan from '../../content/fitur/Keterangan';

const Pln = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [phone, setPhone] = useState('');
  const [operator, setOperator] = useState('');
  const [produk, setProduk] = useState('PLN Pascabayar');
  const [ktr, setKtr] = useState({title: '', message: '', active: false});
  const [activeGame, setActiveGame] = useState(false);
  const [activeOther, setActiveOther] = useState(true);
  let isMounted = true;

  const isLogged = async () => {
    await useApiPost(apiUtilityReference(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            let op = val.values.productPpob_pln;
            setOperator(op);

            let kets = val.values.ketPln;
            setKtr(kets ? kets : ktr);
          } else {
            setOperator('');
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
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

    InteractionManager.runAfterInteractions(() => {
      isLogged();
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, []);

  const payment = async () => {
    if (phone === '') {
      getSnackBar_error({
        title: 'Isi Nomor Meter / ID Pelanggan',
        duration: 'LENGTH_LONG',
      });
    } else {
      setIsLoading(true);
      await useApiPost(apiTransactionCheck(), {
        productCode: operator,
        phone: phone,
      })
        .then((res) => {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            let detail = {
              productName: produk,
              productCode: operator,
              description: '',
              price: val.data.price,
            };

            return navigation.push('Confirm', {
              detail: detail,
              sendTo: '',
              phone: phone,
              produk: produk,
              page: 'ppob',
              admin: getRupiah(val.data.adminFee),
              tagihan: getRupiah(val.data.price),
              totalTagihan: getRupiah(val.data.billPayment),
              detailTrx: val.data.message,
              allDetailTrx: val.data.allMessage,
            });
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

  const phoneChange = async (value, index) => {
    if (value.indexOf('62') != -1) {
      var phones = replacePhone(value, '+62', '0');
      number = phones.replace(/ /g, '');
      number = phones.replace(/-/g, '');
    } else {
      var number = value;
    }
    let num = number.replace(/[^0-9]/g, '');
    setPhone(num);
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
  };



  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'PLN PASCABAYAR'}
        shadow={false}
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
        <View style={{height: 60, backgroundColor: '#4F6CFF'}} />
        <View style={[styles.widgedPulsa]}>

        <View
        style={[
          styles.row,
          styles.tabBox,
          styles.ml20,
          styles.mr20,
          {justifyContent: 'space-around'},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PlnToken')}
            style={{
              width: 20,
              height: 20,
              borderRadius: 20 / 2,
              backgroundColor: 'white',
              marginHorizontal: 20,
              borderWidth: 0.4,
            }}></TouchableOpacity>
          <Text>Token</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PlnPascabayar')}
            style={{
              width: 20,
              height: 20,
              borderRadius: 20 / 2,
              backgroundColor: 'blue',
              borderWidth: 0.4,
            }}></TouchableOpacity>
          <Text style={{marginHorizontal: 20}}>Pascabayar</Text>
        </View>
      </View>


          {/* <View style={[styles.row, styles.tabBox]}>
            <TouchableOpacity
              style={[styles.col50, styles.center]}
              onPress={() => navigation.navigate('PlnToken')}>
              <Text style={[styles.fs13, styles.grey92, styles.fontWSB]}>
                Token
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.col50, styles.center, styles.tabBodyActive]}
              onPress={() => navigation.navigate('PlnPascabayar')}>
              <Text style={[styles.fs13, styles.white, styles.fontWSB]}>
                Pascabayar
              </Text>
            </TouchableOpacity>
          </View> */}
          <View style={{marginTop: -5}}>
            <InputPhone
              disable={isLoading ? true : false}
              value={phone}
              onChangeText={phoneChange}
              placeholder="Contoh : 123456xxx"
              title="Nomor Meter / ID Pelanggan"
              contact={true}
              copas={true}
              minus={false}
              image={''}
            />
          </View>

          <Ripple
            onPress={() => {
              if (phone) {
                !isLoading ? payment() : null;
              }
            }}
            style={[
              phone ? styles.btnBuyNowForm : styles.btnBuyNowFormEmpty,
              styles.mt15,
              styles.ml15,
              styles.mr15,
              styles.mb10
            ]}>
            <Text
              style={[styles.fs13, styles.white, styles.fontWSM]}
              uppercase={false}>
              {isLoading ? 'Loading ...' : 'Cek Tagihan'}
            </Text>
          </Ripple>
        </View>
        {ktr.active ? (
            <Keterangan menu="normal" title={ktr.title} msg={ktr.message} />
          ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Pln;
