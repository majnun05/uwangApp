import React, {useEffect, useState, useRef} from 'react';
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
  apiPesawatBooking,
  apiTransactionCheck,
  apiTransactionPay,
  apiPesawatRule,
} from '../../../../helpers/endPoint';
import {ActionSheet} from '../../components';
import {useApiPost} from '../../../../helpers/useFetch';
import {
  getSnackBar_error,
  getSession,
  getRupiah,
} from '../../../../helpers/Helpers';
import styles from '../../../../assets/styles/Style';
import Header from '../../../../content/header/Header';
import TopupPage from '../../../../content/fitur/TopupPage';
import ModalPin from '../../../../content/modal/ModalPin';
import ModalNotif from '../../../../content/modal/ModalNotif';
import IconPayMethod from '../../../../assets/svg/pay-method.svg';
import IconWarning from '../../../../assets/svg/warning.svg';
import IconIntersect from '../../../../assets/svg/intersect2.svg';
import IconRight from '../../../../assets/svg/right-arrow.svg';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const PesawatPayment = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const rulesSheetRef = useRef();
  const [rulesSheet, setRulesSheet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalPin, setModalPin] = useState(false);
  const [modalNotif, setModalNotif] = useState(false);
  const [modalCounter, setModalCounter] = useState(false);
  const [dataPemesanan, setDataPemesanan] = useState(params.dataPemesanan);
  const [totalPricePergi, setTotalPricePergi] = useState(
    params.totalPricePergi,
  );
  const [totalPricePulang, setTotalPricePulang] = useState(
    params.totalPricePulang,
  );
  const [item, setItem] = useState(params.item);
  const [itemPulang, setItemPulang] = useState(params.itemPulang);
  const [travel, setTravel] = useState(params.travel);
  const [passenger, setPassenger] = useState(params.passenger);
  const [cartItems, setCartItems] = useState(params.cartItems);
  const [from, setfrom] = useState(params.from);
  const [to, setto] = useState(params.to);
  const [pin, setPin] = useState('');
  const [balance, setBalance] = useState(0);
  const [tanpaPin, setTanpaPin] = useState('no');
  const [total, setTotal] = useState(params.totalBayar);
  const [counterTrxNotif, setCounterTrxNotif] = useState(1);
  const [counterMsgNotif, setCounterMsgNotif] = useState('');
  const [invoice, setInvoice] = useState('');
  const [rules, setRules] = useState([]);
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
    if (isMounted) {
      setTanpaPin(tanpaPin);
    }

    await useApiPost(apiUserBalance(), {})
      .then((res) => {
        getRule();
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values.data;
            setBalance(val.balance);
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

  const getRule = async () => {
    let numFare = item.segments;
    let numP = [];
    for (let i = 0; i < numFare.length; i++) {
      numP.push(numFare[i].fares.fareRuleKey);
    }

    let numFarePP = itemPulang.segments;
    let numPP = [];
    if (travel === 'pulangpergi') {
      for (let i = 0; i < numFarePP.length; i++) {
        numPP.push(numFarePP[i].fares.fareRuleKey);
      }
    }

    let bodyRules = [...numP, ...numPP];

    await useApiPost(apiPesawatRule(), {
      fareRuleKeys: bodyRules,
    })
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setRules(val.data);
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

  useEffect(() => {
    if (rulesSheet) {
      rulesSheetRef.current?.setModalVisible(true);
    } else {
      rulesSheetRef.current?.setModalVisible(false);
    }
  }, [rulesSheet]);

  const payment = async () => {
    setModalNotif(true);
  };

  const bookingNow = () => {
    let dataPax = [];
    let dataNumber = [];
    let dataEmail = [];
    cartItems.map((item) => {
      let ss = [];
      if (travel === 'pulangpergi') {
        ss = [...item.ssrsPergi, ...item.ssrsPulang];
      } else {
        ss = [...item.ssrsPergi];
      }

      let pax = {
        nameNum: item.nameNum,
        paxType: item.paxType,
        givenName: item.firstName,
        surName: item.lastName,
        title: item.title,
        nationality: item.nationality,
        dob: item.dob,
        docs: item.docs,
        ssrs: ss.length > 0 ? (ss[0].ssrType ? ss : []) : [],
      };
      let numbers = {
        nameNum: item.nameNum,
        country: item.nationality,
        phoneNum: item.phone,
        phoneType: 'M',
      };
      let emails = {
        nameNum: item.nameNum,
        email: item.email,
      };
      dataPax.push(pax);
      dataNumber.push(numbers);
      dataEmail.push(emails);
    });

    let custInfo = {
      paxNames: dataPax,
      contactNumbers: dataNumber,
      contactEmails: dataEmail,
    };

    let dataJourneys = [];
    let neys = travel === 'pergi' ? [item] : [item, itemPulang];

    neys.map((itemNeys) => {
      let seg = [];
      itemNeys.segments.map((item2) => {
        let seg2 = {
          fareGroupCode: item2.fares?.fareGroupCode,
          flightDesignator: item2.flightDesignator,
          fareCode: item2.fares?.fareCode,
          arrivalDateTime: item2.arrivalDateTime,
          departureDateTime: item2.departureDateTime,
          origin: item2.origin,
          RPH: item2.RPH,
          destination: item2.destination,
          through: item2.through,
          currencyCode: item2.fares?.currencyCode,
        };
        seg.push(seg2);
      });

      let Jour = {
        vendorCode: itemNeys.vendorCode,
        connectingType: itemNeys.connectingType,
        segments: seg,
      };
      dataJourneys.push(Jour);
    });

    let contactPerson = {
      title: dataPemesanan.title,
      contactNames: dataPemesanan.name,
      contactNumbers: dataPemesanan.phone,
      contactEmails: dataPemesanan.email,
    };

    setModalNotif(false);
    setModalPin(false);
    setIsLoading(true);
    setTimeout(async () => {
      await useApiPost(apiPesawatBooking(), {
        custInfo: custInfo,
        journeys: dataJourneys,
        contactPerson: contactPerson,
        ssrs: [],
        pin: pin,
      })
        .then(async (res) => {
          if (isMounted) {
            setIsLoading(false);
            if (res.statusCode === 200) {
              let val = res.values;
              hitInqTransaction(val.data.invoice);
              setInvoice(val.data.invoice);
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
    }, 500);
  };

  const hitInqTransaction = async (inv) => {
    await useApiPost(apiTransactionCheck(), {
      productCode: 'pesawat',
      phone: inv,
    })
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            transactionPayNow(inv);
          } else {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_LONG',
            });
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const transactionPayNow = async (inv) => {
    if (pin === '') {
      return getSnackBar_error({
        title: 'Masukkan PIN',
        duration: 'LENGTH_LONG',
      });
    } else {
      setModalCounter(false);
      setTimeout(async () => {
        await useApiPost(apiTransactionPay(), {
          productCode: 'pesawat',
          phone: inv,
          sendTo: '',
          type: '6',
          pin: pin,
          counter: counterTrxNotif,
          amount: 0,
          nominal: 0,
        })
          .then((res) => {
            if (isMounted) {
              setIsLoading(false);
              if (res.statusCode === 200) {
                navigation.push('PesawatSuccess', {
                  totalBayar: total,
                  message: res.values.message,
                });
              } else if (res.statusCode === 202) {
                setModalCounter(true);
                setCounterMsgNotif(res.values.message);
                setCounterTrxNotif(res.values.data.counter);
              } else {
                getSnackBar_error({
                  title: res.values.message,
                  duration: 'LENGTH_LONG',
                });
              }
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
        <View style={{height: 35, backgroundColor: '#00A79D'}} />
        <TopupPage balance={balance} navigation={navigation} />

        <Ripple
          onPress={() => {
            setRulesSheet(true);
          }}
          style={{
            marginTop: 10,
            borderColor: '#ddd',
            borderWidth: 1,
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginHorizontal: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={[styles.fs13, styles.greyB7, styles.fontWSB, styles.mt2]}>
            Aturan Pemesanan
          </Text>
          <View style={[styles.boxMenuNew, styles.center]}>
            <SvgXml width={20} height={20} xml={IconRight} />
          </View>
        </Ripple>

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
            Detail Transaksi
          </Text>
        </View>

        <View style={[styles.boxOrder, styles.mb10]}>
          <View style={[styles.row, styles.listPaymentBorder]}>
            <View style={styles.col60}>
              <Text style={[styles.black, styles.fs12]}>Nama Pemesan</Text>
            </View>
            <View style={styles.col40}>
              <Text
                style={[
                  styles.rightText,
                  styles.black,
                  styles.fs12,
                  styles.right,
                ]}>
                {dataPemesanan.name}
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.listPaymentBorder]}>
            <View style={styles.col60}>
              <Text style={[styles.black, styles.fs12]}>Nomor Telepon</Text>
            </View>
            <View style={styles.col40}>
              <Text
                style={[
                  styles.rightText,
                  styles.black,
                  styles.fs12,
                  styles.right,
                ]}>
                {dataPemesanan.phone}
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.listPayment]}>
            <View style={styles.col30}>
              <Text style={[styles.black, styles.fs12]}>Email</Text>
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
                {dataPemesanan.email}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.boxOrder, styles.mb10]}>
          <View style={[styles.row, styles.listPaymentBorder]}>
            <View style={styles.col60}>
              <Text style={[styles.black, styles.fs12]}>Produk</Text>
            </View>
            <View style={styles.col40}>
              <Text
                style={[
                  styles.rightText,
                  styles.black,
                  styles.fs12,
                  styles.right,
                ]}>
                Tiket Pesawat
              </Text>
            </View>
          </View>
          {travel === 'pulangpergi' ? (
            <View style={[styles.row, styles.listPaymentBorder]}>
              <View style={styles.col60}>
                <Text style={[styles.black, styles.fs12]}>Perjalanan</Text>
              </View>
              <View style={styles.col40}>
                <Text
                  style={[
                    styles.rightText,
                    styles.black,
                    styles.fs12,
                    styles.right,
                  ]}>
                  Pulang Pergi
                </Text>
              </View>
            </View>
          ) : null}
          <View style={[styles.row, styles.listPaymentBorder]}>
            <View style={styles.col30}>
              <Text style={[styles.black, styles.fs12]}>Maskapai</Text>
            </View>
            <View style={styles.col70}>
              <Text
                style={[
                  styles.rightText,
                  styles.right,
                  styles.black,
                  styles.fs12,
                ]}>
                {item.planeName}
                {travel === 'pulangpergi' ? `, ${itemPulang.planeName}` : ``}
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.listPaymentBorder]}>
            <View style={styles.col20}>
              <Text style={[styles.black, styles.fs12]}>Rute</Text>
            </View>
            <View style={styles.col80}>
              <Text
                style={[
                  styles.rightText,
                  styles.right,
                  styles.black,
                  styles.fs12,
                ]}>
                {`${from.name}-${to.name}`}
                {travel === 'pulangpergi' ? `, ${to.name}-${from.name}` : ``}
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.listPaymentBorder]}>
            <View style={styles.col50}>
              <Text style={[styles.black, styles.fs12]}>
                Tanggal Keberangkatan
              </Text>
            </View>
            <View style={styles.col50}>
              <Text
                style={[
                  styles.rightText,
                  styles.right,
                  styles.black,
                  styles.fs12,
                ]}>
                {moment(item.departure).format('LLL')}
                {travel === 'pulangpergi'
                  ? `, ${moment(itemPulang.departure).format('LLL')}`
                  : ``}
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.listPayment]}>
            <View style={styles.col50}>
              <Text style={[styles.black, styles.fs12]}>Jumlah Penumpang</Text>
            </View>
            <View style={styles.col50}>
              <Text
                style={[
                  styles.rightText,
                  styles.right,
                  styles.black,
                  styles.fs12,
                ]}>
                Dewasa {parseInt(passenger.ADT)}x
                {parseInt(passenger.CHD) > 0
                  ? ', Anak ' + parseInt(passenger.CHD) + 'x'
                  : ''}
                {parseInt(passenger.INF) > 0
                  ? ', Bayi ' + parseInt(passenger.INF) + 'x'
                  : ''}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.boxOrder, styles.mt5]}>
          {totalPricePergi.adult.qty > 0 ? (
            <ListPrice
              from={from.code}
              to={to.code}
              qty={totalPricePergi.adult.qty}
              age="Dewasa"
              price={getRupiah(
                totalPricePergi.adult.total ? totalPricePergi.adult.total : 0,
              )}
            />
          ) : null}
          {totalPricePergi.child.qty > 0 ? (
            <ListPrice
              from={from.code}
              to={to.code}
              qty={totalPricePergi.child.qty}
              age="Anak"
              price={getRupiah(
                totalPricePergi.child.total ? totalPricePergi.child.total : 0,
              )}
            />
          ) : null}
          {totalPricePergi.infant.qty > 0 ? (
            <ListPrice
              from={from.code}
              to={to.code}
              qty={totalPricePergi.infant.qty}
              age="Bayi"
              price={getRupiah(
                totalPricePergi.infant.total ? totalPricePergi.infant.total : 0,
              )}
            />
          ) : null}

          {travel === 'pulangpergi' ? (
            <>
              {totalPricePulang.adult.qty > 0 ? (
                <ListPrice
                  from={to.code}
                  to={from.code}
                  qty={totalPricePulang.adult.qty}
                  age="Dewasa"
                  price={getRupiah(
                    totalPricePulang.adult.total
                      ? totalPricePulang.adult.total
                      : 0,
                  )}
                />
              ) : null}
              {totalPricePulang.child.qty > 0 ? (
                <ListPrice
                  from={to.code}
                  to={from.code}
                  qty={totalPricePulang.child.qty}
                  age="Anak"
                  price={getRupiah(
                    totalPricePulang.child.total
                      ? totalPricePulang.child.total
                      : 0,
                  )}
                />
              ) : null}
              {totalPricePulang.infant.qty > 0 ? (
                <ListPrice
                  from={to.code}
                  to={from.code}
                  qty={totalPricePulang.infant.qty}
                  age="Bayi"
                  price={getRupiah(
                    totalPricePulang.infant.total
                      ? totalPricePulang.infant.total
                      : 0,
                  )}
                />
              ) : null}
            </>
          ) : null}

          {cartItems.length > 0 ? (
            <>
              {!!cartItems[0].ssrsPergi.length > 0 ? (
                <View
                  style={{
                    marginTop: 5,
                    paddingLeft: 10,
                  }}>
                  {cartItems.map((item_, key) => (
                    <View style={{marginTop: 5}} key={key}>
                      {item_.ssrsPergi.length > 0 ? (
                        <>
                          {item_.ssrsPergi[0]?.ssrType ||
                          item_.ssrsPergi[1]?.ssrType ||
                          item_.ssrsPergi[2]?.ssrType ? (
                            <Text
                              style={[
                                styles.black,
                                styles.fs12,
                                styles.fontWSB,
                              ]}>{`- ${item_.firstName} ${item_.lastName}`}</Text>
                          ) : null}
                        </>
                      ) : null}

                      {item_.ssrsPergi.map((item_2, keys) => (
                        <View keys={keys} style={{marginLeft: 0}}>
                          {item_2.ssrPrice > 0 ? (
                            <ListPrice
                              from={
                                item_2.route +
                                ' (' +
                                item_2.ssrWeight +
                                ' ' +
                                item_2.ssrUnit +
                                ')'
                              }
                              qty={''}
                              age=""
                              price={getRupiah(
                                item_2.ssrPrice ? item_2.ssrPrice : 0,
                              )}
                            />
                          ) : null}
                        </View>
                      ))}
                    </View>
                  ))}
                  {cartItems.map((item_, key) => (
                    <View key={key}>
                      {item_.ssrsPulang.length > 0 ? (
                        <>
                          {item_.ssrsPulang[0]?.ssrType ||
                          item_.ssrsPulang[1]?.ssrType ||
                          item_.ssrsPulang[2]?.ssrType ? (
                            <Text
                              style={[
                                styles.black,
                                styles.fs12,
                                styles.fontWSB,
                              ]}>{`- ${item_.firstName} ${item_.lastName}`}</Text>
                          ) : null}
                        </>
                      ) : null}

                      {item_.ssrsPulang.map((item_2, keys) => (
                        <View keys={keys} style={{marginLeft: 0}}>
                          {item_2.ssrPrice > 0 ? (
                            <ListPrice
                              from={
                                item_2.route +
                                ' (' +
                                item_2.ssrWeight +
                                ' ' +
                                item_2.ssrUnit +
                                ')'
                              }
                              qty={''}
                              age=""
                              price={getRupiah(
                                item_2.ssrPrice ? item_2.ssrPrice : 0,
                              )}
                            />
                          ) : null}
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              ) : null}
            </>
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
                Rp  {getRupiah(total ? total : 0)}
              </Text>
            </View>
          </View>
        </View>

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
            <View style={[styles.col10, styles.center]}>
              <SvgXml width={30} height={30} xml={IconPayMethod} />
            </View>
          </View>
        </View>

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
                style={[styles.fs11, styles.fontWSR, styles.black, styles.mt5]}>
                Pastikan data transaksi sudah benar.
              </Text>
              <Text
                style={[styles.fs11, styles.fontWSR, styles.black, styles.mt5]}>
                Transaksi tidak dapat dibatalkan jika transaksi sudah sukses.
              </Text>
              <Text
                style={[styles.fs11, styles.fontWSR, styles.black, styles.mt5]}>
                Jika terjadi gangguan/ masalah, pengembalian saldo akan
                dilakukan dalam rentang waktu 1x24 jam
              </Text>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              zIndex: -1,
              bottom: '-5%',
              right: '0%',
              borderTopRightRadius: 100,
              borderTopLeftRadius: 100,
            }}>
            <SvgXml width={70} height={70} xml={IconIntersect} />
          </View>
        </View>
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
              Rp  {getRupiah(total ? total : 0)}
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
          !isLoading ? bookingNow() : null;
        }}
      />

      <ModalNotif
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalNotif}
        onSwipeComplete={() => setModalNotif(false)}
        title={'Notifikasi'}
        message={'Pastikan data Pemesanan Anda sudah benar'}
        titleClose={'Periksa Kembali'}
        titleButton={'Ya'}
        onPressClose={() => {
          setModalNotif(false);
        }}
        onPress={() => {
          setModalNotif(false);
          setTimeout(() => {
            setModalPin(true);
          }, 500);
        }}
      />

      <ModalNotif
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalCounter}
        onSwipeComplete={() => setModalCounter(false)}
        title={'Notifikasi'}
        message={counterMsgNotif}
        titleClose={'Tidak'}
        titleButton={'Ya'}
        onPressClose={() => {
          setModalCounter(false);
        }}
        onPress={() => {
          transactionPayNow(invoice);
        }}
      />

      {/*  */}
      <ActionSheet
        actionRef={rulesSheetRef}
        onClose={() => {
          setRulesSheet(false);
        }}
        paddingHorizontal={20}
        title={'Aturan Pemesanan'}>
        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 10,
          }}>
          {rules.map((items, key) => (
            <Text style={[styles.fontWSR, styles.fs12, styles.black]} key={key}>
              {items.fareRuleText}
            </Text>
          ))}
        </View>
      </ActionSheet>
      {/*  */}
    </SafeAreaView>
  );
};

const ListPrice = ({from, to, qty, age, price}) => {
  return (
    <View style={[styles.row, styles.listPaymentBorder]}>
      <View style={styles.col40}>
        {age ? (
          <Text style={[styles.black, styles.fs12]}>
            {from} {qty ? `- ${to} (x${qty} ${age})` : null}
          </Text>
        ) : (
          <Text style={[styles.black, styles.fs12]}>
            Bagasi {from} {qty ? `- ${to} (x${qty})` : null}
          </Text>
        )}
      </View>
      <View style={styles.col60}>
        <Text
          style={[styles.rightText, styles.black, styles.fs12, styles.right]}>
          Rp  {price}
        </Text>
      </View>
    </View>
  );
};

export default PesawatPayment;
