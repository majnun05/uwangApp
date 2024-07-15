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
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {
  apiUserBalance,
  apiTransactionPay,
  apiTransactionAdditional,
  apiUtilityReference,
} from '../../helpers/endPoint';
import {useApiPost} from '../../helpers/useFetch';
import {getSnackBar_error, getSession} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import TopupPage from '../../content/fitur/TopupPage';
import ModalPin from '../../content/modal/ModalPin';
import ModalNotif from '../../content/modal/ModalNotif';
import IconPayMethod from '../../assets/svg/pay-method.svg';
import IconWarning from '../../assets/svg/warning.svg';
import IconIntersect from '../../assets/svg/intersect2.svg';
import Keterangan from '../../content/fitur/Keterangan';
import moment from 'moment';
import 'moment/locale/id';
import { IcPay } from '../../assets';
moment.locale('id');

const Confirm = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalPin, setModalPin] = useState(false);
  const [modalNotif, setModalNotif] = useState(false);
  const [operatorName, setOperatorName] = useState(
    params.operatorName ? params.operatorName : '',
  );
  const [detail, setDetail] = useState(params.detail);
  const [sendTo, setSendTo] = useState(params.sendTo);
  const [tagihan, setTagihan] = useState(params.tagihan);
  const [totalBayar, setTotalBayar] = useState(
    params.totalTagihan !== '0' ? params.totalTagihan : params.detail.price,
  );
  const [phone, setPhone] = useState(params.phone);
  const [admin, setAdmin] = useState(params.admin);
  const [produk, setProduk] = useState(params.produk);
  const [detailTrx, setDetailTrx] = useState(params.detailTrx);
  const [allDetailTrx, setAllDetailTrx] = useState(params.allDetailTrx);
  const [amount, setAmount] = useState(params.amount ? params.amount : 0);
  const [nominal, setNominal] = useState(params.nominal ? params.nominal : 0);
  const [page, setPage] = useState(params.page);
  const [pin, setPin] = useState('');
  const [counterTrxNotif, setCounterTrxNotif] = useState(1);
  const [counterMsgNotif, setCounterMsgNotif] = useState('');
  const [balance, setBalance] = useState(0);
  const [balanceReal, setBalanceReal] = useState(0);
  const [ket, setKet] = useState({});
  const [ketNiatZakat, setKetNiatZakat] = useState({
    image: '',
    title: 'Niat Zakat',
    message:
      '“Nawaytu an ukhrija zakaata maali fardhoonLillaahi Ta’aala.”\n“Aku niat mengeluarkan zakat hartaku, fardhu karena Allah Ta’aala.”',
    active: true,
  });

  const [tanpaPin, setTanpaPin] = useState('no');

  let isMounted = true;

  const isLogged = async () => {
    let tanpaPin = await getSession('tanpaPin').then((tanpaPin) => {
      return tanpaPin;
    });
    if (tanpaPin === 'yes') {
      let pinTrx = await getSession('pinTrx').then((pinTrx) => {
        return pinTrx;
      });
      isMounted ? setPin(pinTrx) : null;
    }
    isMounted ? setTanpaPin(tanpaPin) : null;

    if (produk === 'Zakat') {
      getRef();
    }

    await useApiPost(apiUserBalance(), {})
      .then((res) => {
        if (isMounted) {
          getPajakInfo();
          if (res.statusCode === 200) {
            let val = res.values.data;
            setBalance(val.balance);
            setBalanceReal(val.balanceReal);
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

  const getRef = async () => {
    await useApiPost(apiUtilityReference(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            let ketss = val.values.ketNiatZakat;
            setKetNiatZakat(ketss ? ketss : ketNiatZakat);
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

  const getPajakInfo = async () => {
    await useApiPost(apiTransactionAdditional(), {
      productCode: detail.productCode,
    })
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setKet(val.data);
          } else {
            setKet({});
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
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

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, []);

  const payment = async () => {
    setModalPin(true);
  };

  const pay = async () => {
    if (pin === '') {
      return getSnackBar_error({
        title: 'Masukkan PIN',
        duration: 'LENGTH_LONG',
      });
    } else {
      setModalNotif(false);
      setModalPin(false);
      setTimeout(async () => {
        setIsLoading(true);
        await useApiPost(apiTransactionPay(), {
          productCode: detail.productCode,
          phone: phone,
          sendTo: sendTo,
          type: page === 'ppob' ? '6' : '0',
          pin: pin,
          counter: counterTrxNotif,
          amount: amount ? amount : 0,
          nominal: nominal ? nominal : 0,
        })
          .then((res) => {
            console.log({res})
            setIsLoading(false);
            if (res.statusCode === 200) {
              navigation.push('Success', {
                totalBayar: totalBayar,
                message: res.values.message,
              });
            } else if (res.statusCode === 202) {
              setModalNotif(true);
              setCounterMsgNotif(res.values.message);
              setCounterTrxNotif(res.values.data.counter);
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
      }, 500);
    }
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Konfirmasi Pembayaran'}
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
        <View style={{height: 35, backgroundColor: '#4F6CFF'}} />
        <TopupPage balance={balance} navigation={navigation} />

        <View style={[styles.boxOrder]}>
          {!page === 'ppob' ? (
            <View style={[styles.row, styles.listPaymentBorder]}>
              <View style={styles.col30}>
                <Text style={[styles.black, styles.fs12]}>Pembelian</Text>
              </View>
              <View style={styles.col70}>
                <Text
                  style={[
                    styles.rightText,
                    styles.black,
                    styles.fs12,
                    styles.right,
                  ]}>
                  {produk}
                </Text>
              </View>
            </View>
          ) : null}
          {sendTo !== '' ? (
            <>
              <View style={[styles.row, styles.listPaymentBorder]}>
                <View style={styles.col40}>
                  <Text style={[styles.black, styles.fs12]}>
                    No / ID Pelanggan
                  </Text>
                </View>
                <View style={styles.col60}>
                  <Text
                    style={[
                      styles.rightText,
                      styles.black,
                      styles.fs11,
                      styles.right,
                    ]}>
                    {phone}
                  </Text>
                </View>
              </View>
              <View style={[styles.row, styles.listPaymentBorder]}>
                <View style={styles.col40}>
                  <Text style={[styles.black, styles.fs12]}>Nomor Tujuan</Text>
                </View>
                <View style={styles.col60}>
                  <Text
                    style={[
                      styles.rightText,
                      styles.black,
                      styles.fs11,
                      styles.right,
                    ]}>
                    {sendTo}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <>
              {phone ? (
                <View style={[styles.row, styles.listPaymentBorder]}>
                  <View style={styles.col40}>
                    <Text style={[styles.black, styles.fs12]}>
                      Nomor Tujuan
                    </Text>
                  </View>
                  <View style={styles.col60}>
                    <Text
                      style={[
                        styles.rightText,
                        styles.black,
                        styles.fs11,
                        styles.right,
                      ]}>
                      {phone}
                    </Text>
                  </View>
                </View>
              ) : null}
            </>
          )}
          {produk === 'Donasi' || produk === 'Zakat' ? (
            <>
              <View style={[styles.row, styles.listPaymentBorder]}>
                <View style={styles.col40}>
                  <Text style={[styles.black, styles.fs12]}>Nama Penyedia</Text>
                </View>
                <View style={styles.col60}>
                  <Text
                    style={[
                      styles.rightText,
                      styles.black,
                      styles.fs11,
                      styles.right,
                    ]}>
                    {operatorName}
                  </Text>
                </View>
              </View>
              <View style={[styles.row, styles.listPaymentBorder]}>
                <View style={styles.col40}>
                  <Text style={[styles.black, styles.fs12]}>
                    Nominal {produk === 'Donasi' ? 'Donasi' : 'Zakat'}
                  </Text>
                </View>
                <View style={styles.col60}>
                  <Text
                    style={[
                      styles.rightText,
                      styles.black,
                      styles.fs11,
                      styles.right,
                    ]}>
                    {detail.productName}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={[styles.row, styles.listPaymentBorder]}>
                <View style={styles.col20}>
                  <Text style={[styles.black, styles.fs12]}>Produk</Text>
                </View>
                <View style={styles.col80}>
                  <Text
                    style={[
                      styles.rightText,
                      styles.black,
                      styles.fs11,
                      styles.right,
                    ]}>
                    {detail.productName}
                  </Text>
                </View>
              </View>
            </>
          )}
          {!page === 'ppob' ? (
            <View style={[styles.row, styles.listPaymentBorder]}>
              <View style={styles.col60}>
                <Text style={[styles.black, styles.fs12]}>Kode Produk</Text>
              </View>
              <View style={styles.col40}>
                <Text
                  style={[
                    styles.rightText,
                    styles.black,
                    styles.fs12,
                    styles.right,
                  ]}>
                  {detail.productCode}
                </Text>
              </View>
            </View>
          ) : null}
          <View style={[styles.row, styles.listPayment]}>
            <View style={styles.col30}>
              <Text style={[styles.black, styles.fs12]}>Keterangan</Text>
            </View>
            <View style={styles.col70}>
              <Text
                style={[
                  styles.rightText,
                  styles.right,
                  styles.black,
                  styles.fs11,
                  styles.fontWSR,
                ]}>
                {detail.description
                  ? detail.description
                  : produk === 'Donasi'
                  ? 'Donasi'
                  : produk === 'Zakat'
                  ? 'Bayar Zakat'
                  : '-'}
              </Text>
            </View>
          </View>
        </View>

        {detailTrx.length > 0 ? (
          <>
            <View
              style={[
                styles.centerContent,
                styles.bgWhite,
                styles.pr15,
                styles.pl15,
                styles.mt10,
              ]}>
              <Text
                style={[
                  styles.fs13,
                  styles.greyB7,
                  styles.fontWSB,
                  styles.mb5,
                ]}>
                Detail Transaksi
              </Text>
            </View>

            <View style={[styles.boxOrder, styles.mt5]}>
              {detailTrx.map((item, key) => (
                <View
                  style={
                    parseInt(key + 1) === detailTrx.length
                      ? [styles.row, styles.listPayment]
                      : [styles.row, styles.listPaymentBorder]
                  }
                  key={key}>
                  <View style={styles.col40}>
                    <Text style={[styles.black, styles.fs12]}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={styles.col60}>
                    <Text
                      style={[
                        styles.rightText,
                        styles.black,
                        styles.fs12,
                        styles.right,
                      ]}>
                      {item.values}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : allDetailTrx ? (
          <>
            <View
              style={[
                styles.centerContent,
                styles.bgWhite,
                styles.pr15,
                styles.pl15,
                styles.mt10,
              ]}>
              <Text
                style={[
                  styles.fs13,
                  styles.greyB7,
                  styles.fontWSB,
                  styles.mb5,
                ]}>
                Detail Transaksi
              </Text>
            </View>

            <View style={[styles.boxOrder, styles.mt5]}>
              <View style={[styles.listPayment]}>
                <Text style={[styles.black, styles.fs12]}>{allDetailTrx}</Text>
              </View>
            </View>
          </>
        ) : null}

        <View
          style={[
            styles.centerContent,
            styles.bgWhite,
            styles.pr15,
            styles.pl15,
            styles.mt10,
          ]}>
          <Text
            style={[styles.fs13, styles.greyB7, styles.fontWSB, styles.mb5]}>
            Detail Pembayaran
          </Text>
        </View>

        <View style={[styles.boxOrder, styles.mt5]}>
          <View style={[styles.row, styles.listPaymentBorder]}>
            <View style={styles.col40}>
              <Text style={[styles.black, styles.fs12]}>Harga</Text>
            </View>
            <View style={styles.col60}>
              <Text
                style={[
                  styles.rightText,
                  styles.black,
                  styles.fs12,
                  styles.right,
                ]}>
                Rp {tagihan !== '0' ? tagihan : detail.price}
              </Text>
            </View>
          </View>
          {produk !== 'Digipos' ? (
            <View style={[styles.row, styles.listPaymentBorder]}>
              <View style={styles.col40}>
                <Text style={[styles.black, styles.fs12]}>Biaya Admin</Text>
              </View>
              <View style={styles.col60}>
                <Text
                  style={[
                    styles.rightText,
                    styles.black,
                    styles.fs12,
                    styles.right,
                  ]}>
                  Rp {admin}
                </Text>
              </View>
            </View>
          ) : null}
          <View style={[styles.row, styles.listPayment]}>
            <View style={styles.col40}>
              <Text style={[styles.black, styles.fs12]}>Total Pembayaran</Text>
            </View>
            <View style={styles.col60}>
              <Text
                style={[
                  styles.rightText,
                  styles.right,
                  styles.black,
                  styles.fs13,
                  styles.bold,
                ]}>
                Rp {totalBayar}
              </Text>
            </View>
          </View>
        </View>

        {ket.taxNote ? (
          <>
            <View
              style={[
                styles.centerContent,
                styles.bgWhite,
                styles.pr15,
                styles.pl15,
                styles.mt10,
              ]}>
              <Text
                style={[
                  styles.fs13,
                  styles.greyB7,
                  styles.fontWSB,
                  styles.mb5,
                ]}>
                Detail Produk
              </Text>
            </View>

            <View style={[styles.boxOrder, styles.mt5]}>
              <View style={[styles.row, styles.listPaymentBorder]}>
                <View style={styles.col40}>
                  <Text style={[styles.black, styles.fs12]}>Tipe Produk</Text>
                </View>
                <View style={styles.col60}>
                  <Text
                    style={[
                      styles.rightText,
                      styles.right,
                      styles.black,
                      styles.fs13,
                      styles.fontWSR,
                    ]}>
                    {ket.taxNote}
                  </Text>
                </View>
              </View>
              <View style={[styles.row, styles.listPaymentBorder]}>
                <View style={styles.col40}>
                  <Text style={[styles.black, styles.fs12]}>
                    Nama Perusahaan
                  </Text>
                </View>
                <View style={styles.col60}>
                  <Text
                    style={[
                      styles.rightText,
                      styles.right,
                      styles.black,
                      styles.fs13,
                      styles.fontWSR,
                    ]}>
                    {ket.companyName}
                  </Text>
                </View>
              </View>
              <View style={[styles.row, styles.listPaymentBorder]}>
                <View style={styles.col40}>
                  <Text style={[styles.black, styles.fs12]}>
                    NPWP Perusahaan
                  </Text>
                </View>
                <View style={styles.col60}>
                  <Text
                    style={[
                      styles.rightText,
                      styles.right,
                      styles.black,
                      styles.fs13,
                      styles.bold,
                    ]}>
                    {ket.companyNpwp}
                  </Text>
                </View>
              </View>
              <View style={[styles.row, styles.listPayment]}>
                <View style={styles.col40}>
                  <Text style={[styles.black, styles.fs12]}>
                    Lokasi Perusahaan
                  </Text>
                </View>
                <View style={styles.col60}>
                  <Text
                    style={[
                      styles.rightText,
                      styles.right,
                      styles.black,
                      styles.fs13,
                      styles.fontWSR,
                    ]}>
                    {ket.companyAddress}
                  </Text>
                </View>
              </View>
            </View>
          </>
        ) : null}

        <View style={styles.boxOrderPaymentMethod}>
          <View style={[styles.row, styles.pl10, styles.pr10]}>
            <View style={[styles.col90]}>
              <Text style={[styles.white, styles.fs12, styles.fontWSR]}>
                Metode Pembayaran
              </Text>
              <Text style={[styles.white, styles.fs15, styles.bold]}>
                Saldo
              </Text>
            </View>
            <View style={[styles.center, {borderRadius:38/2, width:38, height:38, backgroundColor:'#ffffff'}]}>
              <SvgXml width={30} height={30} xml={IcPay} />
            </View>
          </View>
        </View>

        {produk === 'Zakat' ? (
          <View style={[styles.mt5, styles.mb20]}>
            <Keterangan
              menu="normal"
              image={ketNiatZakat.image}
              title={ketNiatZakat.title}
              msg={ketNiatZakat.message}
            />
          </View>
        ) : (
          <View style={[styles.keteranganBaru, styles.mt10, styles.mb20]}>
            <View style={styles.row}>
              <View style={[styles.col15, styles.centerOnly, styles.pt5]}>
                <SvgXml width={40} height={40} xml={IconWarning} />
              </View>
              <View style={[styles.col85, styles.pl10]}>
                <Text style={[styles.fs12, styles.fontWSB, styles.black]}>
                  Keterangan
                </Text>
                <Text
                  style={[
                    styles.fs11,
                    styles.fontWSR,
                    styles.black,
                    styles.mt5,
                  ]}>
                  Pastikan data transaksi sudah benar.
                </Text>
                <Text
                  style={[
                    styles.fs11,
                    styles.fontWSR,
                    styles.black,
                    styles.mt5,
                  ]}>
                  Transaksi tidak dapat dibatalkan jika transaksi sudah sukses.
                </Text>
                <Text
                  style={[
                    styles.fs11,
                    styles.fontWSR,
                    styles.black,
                    styles.mt5,
                  ]}>
                  Jika terjadi gangguan/ masalah, pengembalian saldo akan
                  dilakukan dalam rentang waktu 1x24 jam
                </Text>
              </View>
            </View>
          </View>
        )}
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

            <Text style={[styles.fs15, styles.green, styles.fontWSB]}>
              Rp  {totalBayar}
            </Text>
          </View>
          <View style={[styles.col30]}>
            <Ripple
              onPress={() => {
                isLoading ? null : payment();
              }}
              style={[
                isLoading ? styles.buttonBeliGrey : styles.buttonBeli,
                styles.rightText,
              ]}>
              <Text
                style={[styles.bold, styles.fs12, styles.white, styles.fontWSB]}
                uppercase={false}>
                {isLoading ? 'Loading...' : 'Lanjut'}
              </Text>
            </Ripple>
          </View>
        </View>
      </View>

      <ModalPin
        isLoading={isLoading}
        close={true}
        modal={'normal'}
        tanpaPin={tanpaPin}
        isVisible={modalPin}
        onSwipeComplete={() => {
          !isLoading ? setModalPin(false) : null;
        }}
        value={pin}
        onChangeText={(pin) => setPin(pin)}
        title={'Masukkan PIN Anda'}
        titleClose={'Batal'}
        titleButton={'Bayar'}
        onPressClose={() => {
          !isLoading ? setModalPin(false) : null;
        }}
        onPress={() => {
          !isLoading ? pay() : null;
        }}
      />

      <ModalNotif
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalNotif}
        onSwipeComplete={() => setModalNotif(false)}
        title={'Notifikasi'}
        message={counterMsgNotif}
        titleClose={'Tidak'}
        titleButton={'Ya'}
        onPressClose={() => {
          setModalNotif(false);
        }}
        onPress={() => {
          pay();
        }}
      />
    </SafeAreaView>
  );
};

export default Confirm;
