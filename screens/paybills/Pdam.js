import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  Text,
  RefreshControl,
  InteractionManager,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiTransactionCheck, apiUtilityReference} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {
  getSnackBar_error,
  getRupiah,
  replacePhone,
} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import InputPhone from '../../content/form/InputPhone';
import IconRightArrow from '../../assets/svg/right-arrow.svg';
import Keterangan from '../../content/fitur/Keterangan';
import { IcArrR } from '../../assets';

const Pdam = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState(false);
  const [form2, setForm2] = useState(false);
  const [productName, setProductName] = useState('');
  const [phone, setPhone] = useState('');
  const [produk, setProduk] = useState('PDAM');
  const [ktr, setKtr] = useState({title: '', message: '', active: false});
  let isMounted = true;

  const isLogged = async () => {
    await useApiPost(apiUtilityReference(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            let kets = val.values.ketPdam;
            setKtr(kets ? kets : ktr);
          } else {
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

  const payment = async () => {
    if (phone === '' || productName === '') {
      phone ? setForm2(false) : setForm2(true);
      productName ? setForm(false) : setForm(true);
    } else {
      setIsLoading(true);
      await useApiPost(apiTransactionCheck(), {
        productCode: params.detail.productCode ? params.detail.productCode : '',
        phone: phone,
      })
        .then((res) => {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            return navigation.push('Confirm', {
              detail: params.detail,
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
    setPhone(number);
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

    if (params.detail.productName) {
      setProductName(
        params.detail.productName ? params.detail.productName : '',
      );
      setForm(false);
    }

    InteractionManager.runAfterInteractions(() => {
      isLogged();
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, [params.detail]);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'PDAM'}
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
          <View style={[styles.ml15, styles.mr15]}>
            <View style={styles.PulsaLabelPhone}>
              <Text style={styles.PulsaTextPhone}>Wilayah</Text>
            </View>
            <Ripple
              onPress={() => {
                navigation.push('PdamProduk');
              }}
              style={[
                styles.row,
                styles.arePage,
                {borderBottomColor: form ? 'red' : '#ddd'},
              ]}>
              <View style={[styles.col90]}>
                <Text
                  style={
                    productName
                      ? [styles.fs13, styles.black, styles.fontWSB]
                      : [styles.fs13, styles.greyCF, styles.fontWSB]
                  }>
                  {productName ? productName : 'Pilih Wilayah'}
                </Text>
              </View>
              <View style={[styles.col10, styles.center]}>
                <SvgXml width={20} height={18} xml={IcArrR} />
              </View>
            </Ripple>
            {form ? (
              <View
                style={{
                  position: 'absolute',
                  left: 5,
                  bottom: -18,
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: 10,
                  }}>
                  Pilih Wilayah
                </Text>
              </View>
            ) : null}
          </View>
          <View style={{marginTop: form ? 10 : -5}}>
            <InputPhone
              disable={false}
              value={phone}
              onChangeText={phoneChange}
              keyboardType={'default'}
              placeholder="Contoh : 123456xxxx"
              title="Masukkan ID Pelanggan"
              contact={true}
              copas={true}
              minus={false}
              image={''}
              form={form2}
              titleForm="Masukkan ID Pelanggan"
            />
          </View>

          <Ripple
            onPress={() => {
              if (phone && productName) {
                !isLoading ? payment() : null;
              }
            }}
            style={[
              phone && productName
                ? styles.btnBuyNowForm
                : styles.btnBuyNowFormEmpty,
              styles.mt10,
              styles.ml17,
              styles.mr17,
              {marginBottom:10}
            ]}>
            <Text
              style={[styles.fs13, styles.white, styles.fontWSM]}
              uppercase={false}>
              Cek Tagihan
            </Text>
          </Ripple>
        </View>
        {ktr.active ? (
            <View style={[styles.mt10, styles.ml2, styles.mr2]}>
              <Keterangan menu="normal" title={ktr.title} msg={ktr.message} />
            </View>
          ) : null}
      </ScrollView>
      
    </SafeAreaView>
  );
};

export default Pdam;
