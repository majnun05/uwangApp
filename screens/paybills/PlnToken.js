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
import {SvgXml} from 'react-native-svg';
import {apiUtilityReference, apiTransactionCheck} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_error, replacePhone} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import InputPhone from '../../content/form/InputPhone';
import IconRightArrow from '../../assets/svg/right-arrow.svg';
import Keterangan from '../../content/fitur/Keterangan';
import { IcArrR } from '../../assets';

const PlnToken = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckTagihan, setCheckTagihan] = useState(false);
  const [form, setForm] = useState(false);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);
  const [productName, setProductName] = useState('');
  const [totalBayar, setTotalBayar] = useState(0);
  const [detail, setDetail] = useState({});
  const [phone, setPhone] = useState('');
  const [operator, setOperator] = useState('');
  const [produk, setProduk] = useState('Token PLN');
  const [operatorId, setOperatorId] = useState('');
  const [detailTagihan, setDetailTagihan] = useState({
    info: '',
    status: '1',
    keterangan: '',
  });
  const [ktr, setKtr] = useState({title: '', message: '', active: false});
  const [message2, setMessage2] = useState('Masukkan Nomor Telepon');
  const [activeGame, setActiveGame] = useState(true);
  const [activeOther, setActiveOther] = useState(false);
  let isMounted = true;

  const isLogged = async () => {
    await useApiPost(apiUtilityReference(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            let op = val.values.productCheck_pln;
            let op2 = val.values.productPln;
            setOperator(op);
            setOperatorId(op2);

            let kets = val.values.ketPlnToken;
            let ketTag = val.values.tagihanTokenPln;
            setKtr(kets ? kets : ktr);
            setDetailTagihan(ketTag ? ketTag : detailTagihan);
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
    if (phone === '' || productName === '') {
      phone ? setForm(false) : setForm(true);
      productName ? setForm3(false) : setForm3(true);
    } else {
      setIsLoading(true);
      if (isCheckTagihan) {
        await useApiPost(apiTransactionCheck(), {
          productCode: operator,
          sendTo: '',
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
                page: 'elektrik',
                admin: '0',
                tagihan: '0',
                totalTagihan: '0',
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
      } else {
        setIsLoading(false);
        return navigation.push('Confirm', {
          detail: detail,
          sendTo: '',
          phone: phone,
          produk: produk,
          page: 'elektrik',
          admin: '0',
          tagihan: '0',
          totalTagihan: '0',
          detailTrx: [],
          allDetailTrx: '',
        });
      }
    }
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
  };

  const phoneChange = async (value, index) => {
    setForm(false);
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

  checkSave = () => {
    if (!isCheckTagihan) {
      setCheckTagihan(true);
    } else {
      setCheckTagihan(false);
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

    InteractionManager.runAfterInteractions(() => {
      isLogged();
    });

    if (params.detail) {
      setDetail(params.detail ? params.detail : {});
      setProductName(
        params.detail.productName ? params.detail.productName : '',
      );
      setForm3(false);

      setTotalBayar(params.detail.price ? params.detail.price : 0);
    }

    if(params.token){
      setPhone(params.token ? params.token : '')
    }

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, [params.detail, params.token]);

  const onChangeWidget = (val) => {
    if (val === 'game') {
      setActiveGame(true);
      setActiveOther(false);
    } else {
      setActiveGame(false);
      setActiveOther(true);
      navigation.navigate('Pln');
    }
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'PLN TOKEN'}
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
                  backgroundColor: 'blue',
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
                onPress={() => navigation.navigate('Pln')}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20 / 2,
                  backgroundColor: 'white',
                  borderWidth: 0.4,
                }}></TouchableOpacity>
              <Text style={{marginHorizontal: 20}}>Pascabayar</Text>
            </View>
          </View>

          {/* <View style={[styles.row, styles.tabBox]}>
            <TouchableOpacity
              style={[styles.col50, styles.center, styles.tabBodyActive]}
              onPress={() => navigation.navigate('PlnToken')}>
              <Text style={[styles.fs13, styles.white, styles.fontWSB]}>
                Token
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.col50, styles.center]}
              onPress={() => navigation.navigate('Pln')}>
              <Text style={[styles.fs13, styles.grey92, styles.fontWSB]}>
                Pascabayar
              </Text>
            </TouchableOpacity>
          </View> */}
          <View style={[{marginTop: -5, marginLeft: -5}]}>
            <InputPhone
              disable={false}
              value={phone}
              onChangeText={phoneChange}
              placeholder="Contoh : 123456xxx"
              title="Nomor Meter / ID Pelanggan"
              contact={true}
              copas={true}
              minus={false}
              image={''}
              form={form}
              scan={true}
              titleForm="Masukkan Nomor Meter / ID Pelanggan"
            />
          </View>
          <View style={[{marginTop: -10}, styles.ml10, styles.mr10]}>
            <View style={styles.PulsaLabelPhone}>
              <Text style={styles.PulsaTextPhone}>Produk</Text>
            </View>
            <Ripple
              onPress={() => {
                if (!isLoading) {
                  navigation.push('PlnTokenProduk', {
                    operatorId: operatorId,
                  });
                }
              }}
              style={[
                styles.row,
                styles.arePage,
                {borderBottomColor: form3 ? 'red' : '#ddd'},
              ]}>
              <View style={[styles.col90]}>
                <Text
                  style={[
                    styles.fs13,
                    productName ? styles.black : styles.greyCF,
                    productName ? styles.fontWSB : styles.fontWSR,
                  ]}>
                  {productName ? productName : 'Pilih Produk'}
                </Text>
              </View>
              <View style={[styles.col10, styles.center]}>
                <SvgXml width={20} height={18} xml={IcArrR} />
              </View>
            </Ripple>
            {form3 ? (
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
                  Pilih Produk
                </Text>
              </View>
            ) : null}
          </View>
          <Ripple
            onPress={
              detailTagihan.status === '1'
                ? this.checkSave.bind(this)
                : () => {
                    getSnackBar_error({
                      title: detailTagihan.info,
                      duration: 'LENGTH_LONG',
                    });
                  }
            }
            style={[
              styles.checkStyleBikin,
              styles.ml13,
              styles.mr15,
              form3 ? styles.mt30 : styles.mt10,
              styles.mb10,
              styles.leftText,
              styles.row,
            ]}>
            {isCheckTagihan ? (
              <View style={[styles.radio, styles.center]}>
                <View style={styles.radioActive} />
              </View>
            ) : (
              <View style={styles.radio} />
            )}
            <Text
              style={[
                styles.pl10,
                styles.white,
                styles.fontWSB,
                styles.fs12,
                styles.mt5,
              ]}>
              Lihat Detail Tagihan
            </Text>
          </Ripple>
        </View>
        {ktr.active ? (
            <>
              {detailTagihan.status === '0' ? (
                <Keterangan
                  menu="normal"
                  title={'Keterangan'}
                  msg={detailTagihan.keterangan}
                />
              ) : (
                <Keterangan menu="normal" title={ktr.title} msg={ktr.message} />
              )}
            </>
          ) : null}
      </ScrollView>

      <View style={styles.footerBtn}>
        <View
          style={[
            styles.row,
            styles.pl15,
            styles.pr15,
            styles.pb10,
            styles.pt10,
          ]}>
          <View style={styles.col70}>
            <Text style={styles.labelFooterBtn}>Total Pembayaran</Text>
            <Text
              style={[
                styles.fs15,
                phone === '' || productName === '' ? styles.grey : styles.green,
                styles.fontWSB,
              ]}>
              Rp  {totalBayar}
            </Text>
          </View>
          <View style={[styles.col30]}>
            <Ripple
              style={[
                phone === '' || productName === ''
                  ? styles.buttonBeliGrey
                  : styles.buttonBeli,
                styles.rightText,
              ]}
              onPress={() => {
                !isLoading ? payment() : null;
              }}>
              <Text
                style={[styles.bold, styles.fs13, styles.white, styles.fontWSB]}
                uppercase={false}>
                Lanjut
              </Text>
            </Ripple>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlnToken;
