import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  BackHandler,
  InteractionManager,
  RefreshControl,
  Alert,
} from 'react-native';
import {
  getSnackBar_error,
  getSession,
  getRupiah,
  getTimeFull,
  getClass,
} from '../../../../helpers/Helpers';
import {
  Header,
  Gap,
  Button,
  CardTouch,
  Text,
  ActionSheet,
} from '../../components';
import ModalNotifs from '../../../../content/modal/ModalNotif';
import ModalPin from '../../../../content/modal/ModalPin';
import s from '../../../../assets/styles/Style';
import ListPenerbangan from './ListPenerbangan';
import DetailBox from '../DetailKeberangkatan/components/DetailBox';
import DetailTime from '../DetailKeberangkatan/components/DetailTime';
import LineVertical from '../DetailKeberangkatan/components/LineVertical';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const FormPemesanan = ({navigation, route}) => {
  const params = route.params;
  const detailSheetRef = useRef();
  const [detailSheet, setDetailSheet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalNotif, setModalNotif] = useState(false);
  const [modalPin, setModalPin] = useState(false);
  const [travel, setTravel] = useState(params.travel);
  const [from, setFrom] = useState(params.from);
  const [to, setTo] = useState(params.to);
  const [passenger, setPassenger] = useState(params.passenger);
  const [classCabin, setClassCabin] = useState(params.classCabin);
  const [itemPulang, setItemPulang] = useState(params.itemPulang);
  const [item, setItem] = useState(params.item);
  const [dataPemesanan, setDataPemesanan] = useState(params.dataPemesanan);
  const [cartItems, setCartItems] = useState(
    params.cartItems ? params.cartItems : [],
  );
  const [pin, setPin] = useState('');
  const [tanpaPin, setTanpaPin] = useState('no');
  const [country1, setcountry1] = useState('ID');
  const [country2, setcountry2] = useState('ID');
  const [total, settotal] = useState(params.total);
  const [totalPulang, settotalPulang] = useState(params.totalPulang);
  const [pricePergi, setpricePergi] = useState(params.pricePergi);
  const [pricePulang, setpricePulang] = useState(params.pricePulang);
  const [totalBayar, settotalBayar] = useState(0);
  const [totalPricePergi, setTotalPricePergi] = useState({
    adult: {total: 0, qty: 1},
    child: {total: 0, qty: 0},
    infant: {total: 0, qty: 0},
  });
  const [totalPricePulang, setTotalPricePulang] = useState({
    adult: {total: 0, qty: 0},
    child: {total: 0, qty: 0},
    infant: {total: 0, qty: 0},
  });
  const [detail, setDetail] = useState({segments: []});
  let isMounted = true;

  const isLogged = async () => {
    let country1_ = await getSession('country1').then((country1) => {
      return country1;
    });
    let country2_ = await getSession('country2').then((country2) => {
      return country2;
    });
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
      setcountry1(country1_);
      setcountry2(country2_);
      setTanpaPin(tanpaPin);
    }

    let ttlAdt = 0;
    let ttlPriceAdt = 0;
    let ttlPriceChd = 0;
    let ttlPriceInf = 0;
    let ttlPriceAdtPulang = 0;
    let ttlPriceChdPulang = 0;
    let ttlPriceInfPulang = 0;
    let ttlAdtPulang = 0;
    let ttlChdPulang = 0;
    let ttlInfPulang = 0;

    pricePergi.map((it0) => {
      it0.segments.map((it1) => {
        it1.fares.map((it2) => {
          newPaxAdt = it2.paxFares.filter(function (itemPax) {
            return itemPax.paxType === 'ADT';
          });
          newPaxChd = it2.paxFares.filter(function (itemPax) {
            return itemPax.paxType === 'CHD';
          });
          newPaxInf = it2.paxFares.filter(function (itemPax) {
            return itemPax.paxType === 'INF';
          });
          ttlAdt = newPaxAdt.length;
          newPaxAdt.map((it3) => {
            ttlPriceAdt += it3.total;
          });
          ttlChd = newPaxChd.length;
          newPaxChd.map((it3) => {
            ttlPriceChd += it3.total;
          });
          ttlInf = newPaxInf.length;
          newPaxInf.map((it3) => {
            ttlPriceInf += it3.total;
          });
        });
      });
    });

    if (travel === 'pulangpergi') {
      pricePulang.map((it0) => {
        it0.segments.map((it1) => {
          it1.fares.map((it2) => {
            newPaxAdt = it2.paxFares.filter(function (itemPax) {
              return itemPax.paxType === 'ADT';
            });
            newPaxChd = it2.paxFares.filter(function (itemPax) {
              return itemPax.paxType === 'CHD';
            });
            newPaxInf = it2.paxFares.filter(function (itemPax) {
              return itemPax.paxType === 'INF';
            });
            ttlAdtPulang = newPaxAdt.length;
            newPaxAdt.map((it3) => {
              ttlPriceAdtPulang += it3.total;
            });
            ttlChdPulang = newPaxChd.length;
            newPaxChd.map((it3) => {
              ttlPriceChdPulang += it3.total;
            });
            ttlInfPulang = newPaxInf.length;
            newPaxInf.map((it3) => {
              ttlPriceInfPulang += it3.total;
            });
          });
        });
      });
    }

    setTotalPricePergi({
      adult: {total: ttlPriceAdt, qty: ttlAdt},
      child: {total: ttlPriceChd, qty: ttlChd},
      infant: {total: ttlPriceInf, qty: ttlInf},
    });
    setTotalPricePulang({
      adult: {total: ttlPriceAdtPulang, qty: ttlAdtPulang},
      child: {total: ttlPriceChdPulang, qty: ttlChdPulang},
      infant: {total: ttlPriceInfPulang, qty: ttlInfPulang},
    });
  };

  const booking = () => {
    let arr_rep = [];
    let arrPass = cartItems;
    for (let i = 0; i < arrPass.length; i++) {
      arr_rep.push(arrPass[i].firstName);
    }

    let result_rep = JSON.stringify(arr_rep);
    let cek_guest = result_rep.match(/Penumpang/i);

    if (dataPemesanan.phone) {
      if (cartItems.length > 0) {
        if (cek_guest === null) {
          navigation.push('PesawatPayment', {
            totalPricePergi: totalPricePergi,
            totalPricePulang: totalPricePulang,
            dataPemesanan: dataPemesanan,
            item: item,
            itemPulang: itemPulang,
            cartItems: cartItems,
            travel: travel,
            passenger: passenger,
            from: from,
            to: to,
            totalBayar: totalBayar,
          });
        } else {
          getSnackBar_error({
            title: 'Lengkapi data terlebih dahulu',
            duration: 'LENGTH_LONG',
          });
        }
      } else {
        getSnackBar_error({
          title: 'Lengkapi Detail Penumpang',
          duration: 'LENGTH_LONG',
        });
      }
    } else {
      getSnackBar_error({
        title: 'Lengkapi Data Pemesan',
        duration: 'LENGTH_LONG',
      });
    }
  };

  const _onRefresh = () => {
    isLogged();
  };

  const updateDetail = (datas) => {
    setDetail(datas);
    setDetailSheet(true);
  };

  const renderFillData = () => {
    let parAdult = passenger.ADT;
    let parChild = passenger.CHD;
    let parInfant = passenger.INF;
    let totalPassenger =
      parseInt(parAdult) + parseInt(parChild) + parseInt(parInfant);
    let pass = [];

    if (cartItems.length > 0) {
      pass = cartItems ? cartItems : [];
    } else {
      let adultskip = false;
      let childskip = false;
      let infantskip = false;
      for (let i = 0; i < totalPassenger; i++) {
        let genderData = '';
        if (parAdult > 0 && adultskip === false) {
          genderData = 'Dewasa';

          if (i + 1 == parAdult) {
            adultskip = true;
          }
        } else if (parChild > 0 && childskip === false) {
          genderData = 'Anak';

          if (i + 1 - parAdult == parChild) {
            childskip = true;
          }
        } else if (parInfant > 0 && infantskip === false) {
          genderData = 'Bayi';

          if (i + 1 == parInfant) {
            infantskip = true;
          }
        } else {
          genderData = 'Bayi';
        }

        let infs = parseInt(i - parseInt(parAdult + parChild));

        // create array bagasi pergi
        let dataSsrsPergi = [];
        pricePergi.map((it0) => {
          let totalTransit = it0.ssrs;
          for (let i = 0; i < totalTransit.length; i++) {
            let element = totalTransit[i];
            let arr = {
              num: parseInt(i + 1),
              route: element.ssrRoute,
              ssrType: '',
              ssrCode: '',
              ssrText: '',
              ssrWeight: 0,
              ssrUnit: '',
              ssrRoute: '',
              ssrPrice: 0,
              ssrs: element.ssrs,
            };
            dataSsrsPergi.push(arr);
          }
        });
        // end create array bagasi pergi

        // create array bagasi pulang
        let dataSsrsPulang = [];
        if (travel === 'pulangpergi') {
          pricePulang.map((it0) => {
            let totalTransit2 = it0.ssrs;
            for (let i = 0; i < totalTransit2.length; i++) {
              let element2 = totalTransit2[i];
              let arr = {
                num: parseInt(i + 1),
                route: element2.ssrRoute,
                ssrType: '',
                ssrCode: '',
                ssrText: '',
                ssrWeight: 0,
                ssrUnit: '',
                ssrRoute: '',
                ssrPrice: 0,
                ssrs: element2.ssrs,
              };
              dataSsrsPulang.push(arr);
            }
          });
        } else {
          dataSsrsPulang = [];
        }
        // end create array bagasi pulang

        let arr = {
          qty: i + 1,
          gender: genderData,
          nameNum:
            genderData === 'Bayi'
              ? `${parseInt(infs + 1)}.2`
              : `${parseInt(i + 1)}.1`,
          paxType:
            genderData === 'Dewasa'
              ? 'ADT'
              : genderData === 'Anak'
              ? 'CHD'
              : 'INF',
          firstName: 'Penumpang ' + genderData,
          lastName: '',
          phone: '',
          email: '',
          title: 'MR',
          nationality: 'ID',
          nationalityName: 'Indonesia',
          dob: '',
          ssrsPergi: dataSsrsPergi,
          ssrsPulang: dataSsrsPulang,
          docs: {
            cardType: '',
            cardNum: '',
            cardIssuePlace: 'ID',
            cardIssuePlaceName: 'Indonesia',
            cardExpired: {
              year: '',
              month: '',
              day: '',
            },
          },
        };
        pass.push(arr);
      }
    }

    let passengerList = [];
    pass.length > 0
      ? pass.map((item, key) =>
          passengerList.push(
            <View key={key}>
              <CardTouch
                title={`${item.firstName} ${item.lastName}`}
                icon="pencil"
                onPress={() => {
                  if (item.firstName === 'Penumpang ' + item.gender) {
                    navigation.push('FormPenumpang', {
                      qty: item.qty,
                      titleForm: 'Isi Penumpang ' + item.gender,
                      gender: item.gender,
                      nameNum: '',
                      paxType: item.paxType,
                      firstName: '',
                      lastName: '',
                      phone: '',
                      email: '',
                      title: 'MR',
                      nationality: 'ID',
                      nationalityName: 'Indonesia',
                      dob: '',
                      cartItems: pass,
                      country1: country1,
                      country2: country2,
                      ssrsPergi: item,
                      ssrsPulang: item.ssrsPulang,
                      docs: item.docs,
                    });
                  } else {
                    navigation.push('FormPenumpang', {
                      qty: item.qty,
                      titleForm: 'Edit Penumpang ' + item.gender,
                      gender: item.gender,
                      nameNum: item.nameNum,
                      paxType: item.paxType,
                      firstName: item.firstName,
                      lastName: item.lastName,
                      phone: item.phone,
                      email: item.email,
                      title: item.title,
                      nationality: item.nationality,
                      nationalityName: item.nationalityName,
                      dob: item.dob,
                      cartItems: pass,
                      country1: country1,
                      country2: country2,
                      ssrsPergi: item,
                      ssrsPulang: item.ssrsPulang,
                      docs: item.docs,
                    });
                  }
                }}
              />
              <Gap height={11} />
            </View>,
          ),
        )
      : null;

    return <>{passengerList}</>;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // refresh back screen
      if (isMounted) {
        if (params.cartItems) {
          setCartItems(params.cartItems);

          let cr = params.cartItems;
          let tlBgPergi = 0;
          let tlBgPulang = 0;

          cr.map((it1, ky1) => {
            it1.ssrsPergi.map((it2, ky2) => {
              tlBgPergi += it2.ssrPrice;
            });
            it1.ssrsPulang.map((it2, ky2) => {
              tlBgPulang += it2.ssrPrice;
            });
          });
          let ttlBg = parseInt(parseInt(tlBgPergi) + parseInt(tlBgPulang));
          let ttlAll = parseInt(parseInt(total) + parseInt(totalPulang));

          settotalBayar(parseInt(ttlAll + ttlBg));
        }

        if (params.dataPemesanan) {
          setDataPemesanan(params.dataPemesanan);
        }
      }
      // end refresh back screen
    });

    const backAction = () => {
      Alert.alert('Notifikasi', 'Jika kembali data Anda akan kembali kosong', [
        {text: 'Batalkan', onPress: () => {}, style: 'cancel'},
        {text: 'Ya', onPress: () => navigation.goBack(null)},
      ]);

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
      unsubscribe();
      backHandler.remove();
      isMounted = false;
    };
  }, [params.cartItems, params.dataPemesanan, totalBayar]);

  useEffect(() => {
    if (detailSheet) {
      detailSheetRef.current?.setModalVisible(true);
    } else {
      detailSheetRef.current?.setModalVisible(false);
    }
  }, [detailSheet]);

  return (
    <View style={styles.page}>
      <Header
        title="Form Pemesanan"
        onPressBack={() => {
          Alert.alert(
            'Notifikasi',
            'Jika kembali data Anda akan kembali kosong',
            [
              {text: 'Batalkan', onPress: () => {}, style: 'cancel'},
              {text: 'Ya', onPress: () => navigation.goBack(null)},
            ],
          );
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }>
        <View style={styles.container}>
          <Text weight="bold" size={14}>
            Detail Penerbangan
          </Text>
          <Gap height={16} />
          <View style={styles.panel}>
            <View style={styles.panelTitle}>
              <Text weight="bold" size={14}>
                {from.name} - {to.name}
              </Text>
            </View>
            <View style={styles.panelBody}>
              <ListPenerbangan
                title={`${from.code} - ${to.code}`}
                desc={`${moment(item.departure).format('LLLL')} - ${
                  classCabin.name
                }`}
                onPress={() => {
                  updateDetail(item);
                }}
              />
              {travel !== 'pergi' ? (
                <>
                  <Gap height={1} backgroundColor="#DBDBDB" />
                  <ListPenerbangan
                    title={`${to.code} - ${from.code}`}
                    desc={`${moment(itemPulang.departure).format('LLLL')} - ${
                      classCabin.name
                    }`}
                    onPress={() => {
                      updateDetail(itemPulang);
                    }}
                  />
                </>
              ) : null}
            </View>
          </View>
          <Gap height={19} />
          <Text weight="bold" size={14}>
            Data Pemesan
          </Text>
          <Gap height={14} />
          <CardTouch
            title={
              dataPemesanan.phone
                ? 'Edit Data Pemesan'
                : 'Masukkan Data Pemesan'
            }
            icon="pencil"
            onPress={() =>
              navigation.push('FormPemesan', {
                title: dataPemesanan.title,
                name: dataPemesanan.name,
                phone: dataPemesanan.phone,
                email: dataPemesanan.email,
              })
            }
          />

          {dataPemesanan.phone ? (
            <DetailPemesan
              title={dataPemesanan.title}
              name={dataPemesanan.name}
              phone={dataPemesanan.phone}
              email={dataPemesanan.email}
            />
          ) : null}

          <Gap height={14} />
          <Text weight="bold" size={14}>
            Data Penumpang
          </Text>
          <Gap height={14} />
          {renderFillData()}

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
              {cartItems[0].ssrsPergi.length > 0 ? (
                <View style={{marginTop: 5, marginBottom: 5}}>
                  <Text weight="semibold" size={14}>
                    Detail Bagasi
                  </Text>

                  {cartItems.map((item_, key) => (
                    <View style={{marginTop: 5, marginBottom: 2}} key={key}>
                      {item_.ssrsPergi.length > 0 ? (
                        <>
                          {item_.ssrsPergi[0]?.ssrType ||
                          item_.ssrsPergi[1]?.ssrType ||
                          item_.ssrsPergi[2]?.ssrType ? (
                            <Text
                              weight="semibold"
                              size={
                                12
                              }>{`- ${item_.firstName} ${item_.lastName}`}</Text>
                          ) : null}
                        </>
                      ) : null}
                      {item_.ssrsPergi.map((item_2, keys) => (
                        <View keys={keys} style={{marginLeft: 10}}>
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
                    <View style={{marginTop: 5, marginBottom: 2}} key={key}>
                      {item_.ssrsPulang.length > 0 ? (
                        <>
                          {item_.ssrsPulang[0]?.ssrType ||
                          item_.ssrsPulang[1]?.ssrType ||
                          item_.ssrsPulang[2]?.ssrType ? (
                            <Text
                              weight="semibold"
                              size={
                                12
                              }>{`- ${item_.firstName} ${item_.lastName}`}</Text>
                          ) : null}
                        </>
                      ) : null}

                      {item_.ssrsPulang.map((item_2, keys) => (
                        <View keys={keys} style={{marginLeft: 10}}>
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
        </View>
      </ScrollView>
      <View style={[styles.bottom]}>
        <View style={styles.bottomRow}>
          <Text weight="semibold" size={14} weight="bold">
            Total Pembayaran
          </Text>
          <Text weight="bold" size={17} color="#00A79D">
            Rp  {getRupiah(totalBayar)}
          </Text>
        </View>
        <Gap height={10} />
        <Button
          title="Lanjut Pembayaran"
          onPress={() => {
            booking();
          }}
        />
      </View>

      {/*  */}
      <ActionSheet
        actionRef={detailSheetRef}
        onClose={() => {
          setDetailSheet(false);
        }}
        paddingHorizontal={20}
        title={'Detail Penerbangan'}>
        {detail.segments.map((items, key) => (
          <View
            style={[styles.timeline, styles.padding, {marginBottom: 40}]}
            key={key}>
            <View style={styles.timelineLeft}>
              <DetailTime
                fromTime={moment(items.departureDateTime).format('HH:mm')}
                fromDate={moment(items.departureDateTime).format('Do MMM')}
                toTime={moment(items.arrivalDateTime).format('HH:mm')}
                toDate={moment(items.arrivalDateTime).format('Do MMM')}
                duration={getTimeFull(
                  moment(items.departureDateTime).format('DD/MM/YYYY HH:mm:ss'),
                  moment(items.arrivalDateTime).format('DD/MM/YYYY HH:mm:ss'),
                )}
              />
            </View>
            <View style={styles.timelineCenter}>
              <LineVertical />
            </View>
            <View style={styles.timelineRight}>
              <DetailBox
                from={`${items.origin.airportName} (${items.origin.code})`}
                to={`${items.destination.airportName} (${items.destination.code})`}
                planeImage={items.flightDesignator.planeImage}
                planeName={items.flightDesignator.planeName}
                planeNumber={
                  items.flightDesignator.carrierCode +
                  '-' +
                  items.flightDesignator.flightNumber
                }
                classCabin={getClass(items.fares.fareGroupCode)}
                baggage={items.fares.defaultBaggage}
              />
            </View>
          </View>
        ))}
      </ActionSheet>
      {/*  */}

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

      <ModalNotifs
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalNotif}
        onSwipeComplete={() => setModalNotif(false)}
        title={'Notifikasi'}
        message={'Pastikan data Pemesanan Anda sudah benar'}
        titleClose={'Periksa'}
        titleButton={'Lanjut'}
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
    </View>
  );
};

const ListPrice = ({from, to, qty, age, price}) => {
  return (
    <View style={[styles.bottomRow, {marginBottom: 0}]}>
      {age ? (
        <Text size={12}>
          {from} {qty ? `- ${to} (x${qty} ${age})` : null}
        </Text>
      ) : (
        <Text size={12}>
          Bagasi {from} {qty ? `- ${to} (x${qty})` : null}
        </Text>
      )}
      <Text size={12} color="#000000">
        Rp  {price}
      </Text>
    </View>
  );
};

const DetailPemesan = ({title, name, phone, email}) => {
  return (
    <>
      <View style={[s.row, s.mt5]}>
        <View style={s.col50}>
          <Text style={[s.black, s.fs12, s.fontWSB]}>Nama Lengkap</Text>
        </View>
        <View style={s.col50}>
          <Text style={[s.black, s.fs12, s.fontWSB, s.right]}>
            {title} {name}
          </Text>
        </View>
      </View>
      <View style={[s.row, s.mt5]}>
        <View style={s.col50}>
          <Text style={[s.black, s.fs12, s.fontWSB]}>Nomor Telepon</Text>
        </View>
        <View style={s.col50}>
          <Text style={[s.black, s.fs12, s.fontWSB, s.right]}>{phone}</Text>
        </View>
      </View>
      <View style={[s.row, s.mt5]}>
        <View style={s.col50}>
          <Text style={[s.black, s.fs12, s.fontWSB]}>Alamat Email</Text>
        </View>
        <View style={s.col50}>
          <Text style={[s.black, s.fs12, s.fontWSB, s.right]}>{email}</Text>
        </View>
      </View>
    </>
  );
};

export default FormPemesanan;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  bottom: {
    paddingHorizontal: 25,
    paddingBottom: 15,
    paddingTop: 5,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  panel: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DEDEDE',
  },
  panelTitle: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomColor: '#DBDBDB',
    borderBottomWidth: 1,
  },
  panelBody: {
    paddingHorizontal: 16,
  },
  rowFasilitas: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topFasilitas: {
    backgroundColor: '#F9F9F9',
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  circleFasilitas: {
    backgroundColor: '#D8D8D8',
    width: 5,
    height: 5,
    borderRadius: 5 / 2,
    marginHorizontal: 5,
  },
  listFasilitas: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeline: {
    flexDirection: 'row',
  },
  padding: {
    paddingHorizontal: 20,
  },
  timelineLeft: {
    alignSelf: 'stretch',
  },
  timelineCenter: {
    alignSelf: 'stretch',
    marginHorizontal: 10,
  },
  timelineRight: {
    flex: 1,
  },
});
