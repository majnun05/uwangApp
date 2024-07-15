import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  RefreshControl,
  InteractionManager,
} from 'react-native';
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
import Svg, { SvgXml } from 'react-native-svg';
import { IcArrR, IcBpjs } from '../../assets';

const Bpjs = ({route}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState(false);
  const [phone, setPhone] = useState('');
  const [operator, setOperator] = useState('');
  const [produk, setProduk] = useState('BPJS Kesehatan');
  const [activeGame, setActiveGame] = useState(true);
  const [activeOther, setActiveOther] = useState(false);
  const [valProduk, setValProduk] = useState('')
  const [ktr, setKtr] = useState({title: '', message: '', active: false});
  let isMounted = true;

  const isLogged = async () => {
    await useApiPost(apiUtilityReference(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            let op = val.values.productPpob_bpjsks;
            setOperator(op);

            let kets = val.values.ketBpjs;
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

  const payment = async () => {
    if (phone === '') {
      phone ? setForm(false) : setForm(true);
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
    setForm(false);
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
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

    if (route.params?.value) {
      setValProduk(route.params.value)
    }

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, [route.params?.value]);

  const onChangeWidget = (val) => {
    if (val === 'game') {
      setActiveGame(true);
      setActiveOther(false);
    } else {
      setActiveGame(false);
      setActiveOther(true);
      navigation.navigate('BpjsKerja')
    }
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'BPJS'}
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

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('BpjsScreen')}
          style={[
          styles.ml20,
          styles.mr20,
          {
            backgroundColor: '#ffffff',
            paddingHorizontal:5,
            marginTop: 10,
            marginBottom: 5,
            marginLeft: 15,
            marginRight: 15,
            borderBottomWidth: 0.4,
            borderBottomColor: '#E0E0E0',
          }
        ]}>
          <Text style={[styles.fontWSR, styles.black, styles.fs14 ]}>Produk Layanan BPJS</Text>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginVertical:12}}>
            <Text style={valProduk ? [styles.fontWSB, styles.black ] : [styles.fontWSR, styles.greyB4 ]}>{valProduk === '0' ? 'Bpjs Kesehatan' : valProduk === '1' ? 'Bpjs Ketenagakerjaan' : 'Pilih Produk'}</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <SvgXml width={20} height={20} xml={IcBpjs} style={{marginRight:5}}/>
              <SvgXml width={20} height={20} xml={IcArrR} />
            </View>
          </View>
      </TouchableOpacity>

          {/* <View style={[styles.row, styles.tabBox]}>
            <TouchableOpacity
              style={[styles.col50, styles.center, styles.tabBodyActive]}
              onPress={() => navigation.navigate('Bpjs')}>
              <Text style={[styles.fs13, styles.white, styles.fontWSB]}>
                Kesehatan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.col50, styles.center]}
              onPress={() => navigation.navigate('BpjsKerja')}>
              <Text style={[styles.fs13, styles.grey92, styles.fontWSB]}>
                Ketenagakerjaan
              </Text>
            </TouchableOpacity>
          </View> */}
          <View style={{marginTop: -5}}>
            <InputPhone
              disable={isLoading ? true : false}
              value={phone}
              onChangeText={phoneChange}
              placeholder="Contoh : 123456xxxx"
              title="Masukkan Nomor Peserta BPJS"
              contact={true}
              copas={true}
              minus={false}
              image={''}
              form={form}
              titleForm="Masukkan Nomor Peserta BPJS"
            />
          </View>

          <TouchableNativeFeedback
            onPress={() => {
              if (phone && valProduk) {
                !isLoading ? payment() : null;
              }
            }}>
            <View
              style={[
                phone && valProduk ? styles.btnBuyNowForm : styles.btnBuyNowFormEmpty,
                styles.mt10,
                styles.ml15,
                styles.mr15,
                styles.mb10
              ]}>
              <Text
                style={[styles.fs13, styles.white, styles.fontWSM]}
                uppercase={false}>
                {isLoading ? 'Loading ...' : 'Cek Tagihan'}
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
          {ktr.active ? (
            <View style={[styles.ml2, styles.mr2]}>
              <Keterangan menu="normal" title={ktr.title} msg={ktr.message} />
            </View>
          ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bpjs;
