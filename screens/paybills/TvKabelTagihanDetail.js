import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  Text,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {apiTransactionCheck} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {
  getSnackBar_error,
  getRupiah,
  replacePhone,
} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import InputPhone from '../../content/form/InputPhone';
import IconBack from '../../assets/svg/back.svg';

const TvKabelTagihanDetail = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [form2, setForm2] = useState(false);
  const [detail, setDetail] = useState(params.detail);
  const [phone, setPhone] = useState('');
  const [produk, setProduk] = useState('TV Kabel & Internet');

  const payment = async () => {
    if (phone === '') {
      phone ? setForm2(false) : setForm2(true);
    } else {
      setIsLoading(true);
      await useApiPost(apiTransactionCheck(), {
        productCode: detail.productCode ? detail.productCode : '',
        phone: phone,
      })
        .then((res) => {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
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

  const _onRefresh = () => {
    setIsLoading(false);
  };

  const phoneChange = async (value, index) => {
    setForm2(false);
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

  useEffect(() => {
    const backAction = () => {
      navigation.goBack(null);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={detail.productName}
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
          <InputPhone
            disable={false}
            value={phone}
            onChangeText={phoneChange}
            placeholder="Contoh : 08123456xxx"
            title="Nomor ID Pelanggan"
            contact={true}
            copas={true}
            minus={false}
            image={detail.imgUrl}
            form={form2}
            titleForm="Masukkan Nomor ID Pelanggan"
          />

          <Ripple
            onPress={() => {
              if (phone) {
                !isLoading ? payment() : null;
              }
            }}
            style={[
              phone ? styles.btnBuyNowForm : styles.btnBuyNowFormEmpty,
              styles.ml15,
              styles.mr15,
            ]}>
            <Text
              style={[styles.fs13, styles.white, styles.fontWSM]}
              uppercase={false}>
              Cek Tagihan
            </Text>
          </Ripple>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TvKabelTagihanDetail;
