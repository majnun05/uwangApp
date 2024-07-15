import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  Dimensions,
  ScrollView,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
  RefreshControl,
  Image,
  ImageBackground,
  ActivityIndicator,
  InteractionManager,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useApiPost} from '../../helpers/useFetch';
import {
  apiUtilityConfig,
  apiQrisHistory,
  apiQrisUser,
  apiQrisCheck,
  apiQrisBalance,
  apiQrisWitdraw,
  apiPdfQris,
  apiCsvHistoryQris,
} from '../../helpers/endPoint';
import {
  getSnackBar_error,
  getSession,
  getRupiah,
  isTimeBetween,
} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import ModalFilters from '../../content/modal/ModalFilter';
import ModalQris from '../../content/modal/ModalQris';
import Header from '../../content/header/Header';
import IconEmpty from '../../assets/svg/empty.svg';
import IconSaldoQris from '../../assets/svg/saldo-qris-green.svg';
import IconRightPage from '../../assets/svg/right-page.svg';
import IconLeftPage from '../../assets/svg/left-page.svg';
import IconRefresh from '../../assets/svg/refresh.svg';
import IconBack from '../../assets/svg/back.svg';

import moment from 'moment';
import 'moment/locale/id';
import {IcArrR, IcCalender, IcQris} from '../../assets';
moment.locale('id');

const WIDTH = Dimensions.get('window').width;

const Qris = () => {
  let srv = moment(new Date()).format('HH:mm');
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoadingCheck, setIsLoadingCheck] = useState(false);
  const [isLoadingSaldo, setIsLoadingSaldo] = useState(false);
  const [modalTarik, setModalTarik] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);
  const initialLayout = {width: Dimensions.get('window').width};
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'Scan', title: 'Scan'},
    {key: 'History', title: 'History'},
  ]);
  const [pin, setPin] = useState('');
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [page, setPage] = useState(1);
  const [balance, setBalance] = useState(0);
  const [balanceReal, setBalanceReal] = useState(0);
  const [nominal, setNominal] = useState('');
  const [dataCsv, setDataCsv] = useState([]);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [imageURL, setImageURL] = useState('');
  const [checkRegister, setCheckRegister] = useState('');
  const [ref, setRef] = useState({});
  let isMounted = true;

  const downloadCsv = async () => {
    let idUser = await getSession('idUser').then((idUser) => {
      return idUser;
    });
    let nameUser = await getSession('nameUser').then((nameUser) => {
      return nameUser;
    });

    setIsLoading(true);
    await useApiPost(apiCsvHistoryQris(), {
      data: dataCsv,
      nameUser: nameUser,
      idUser: idUser,
    })
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            Linking.openURL(val.data.csvUrl);
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

  // ========================
  // === Load all function ===
  // ========================
  const isLogged = async (hal) => {
    let isLogged = await getSession('isLoggedV2').then((isLogged) => {
      return isLogged;
    });
    if (isLogged === 'yes') {
      getRef();
      getCheckQris();
      getQrisBalance();
      await useApiPost(apiQrisUser(), {})
        .then((res) => {
          if (isMounted) {
            setIsLoading(false);
            if (res.statusCode === 200) {
              let val = res.values.values;
              setImageURL(val.imageUrl);
            } else if (res.statusCode === 500) {
              getSnackBar_error({
                title: res.values.message,
                duration: 'LENGTH_INDEFINITE',
              });
            } else {
              setIsLoading(false);
            }
          }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  // ========================
  // === Get Reference ===
  // ========================
  const getRef = async () => {
    await useApiPost(apiUtilityConfig(), {})
      .then((res) => {
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values;
            setRef(val.values);
          } else if (res.statusCode === 500) {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          } else {
            setIsLoading(false);
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  // ========================
  // === Get Check QRIS ===
  // ========================
  const getCheckQris = async () => {
    setIsLoadingCheck(true);
    await useApiPost(apiQrisCheck(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoadingCheck(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setCheckRegister(val.message);
          } else if (res.statusCode === 500) {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          } else {
            setIsLoading(false);
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  // ========================
  // === Get Balance QRIS ===
  // ========================
  const getQrisBalance = async () => {
    setIsLoadingSaldo(true);
    await useApiPost(apiQrisBalance(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoadingSaldo(false);
          if (res.statusCode === 200) {
            let val = res.values.values;
            setBalance(val.balance);
            setBalanceReal(val.balanceReal);
          } else if (res.statusCode === 500) {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          } else {
            setIsLoading(false);
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  // ========================
  // === Get History QRIS ===
  // ========================
  const getHistory = async (hal) => {
    let nameUser = await getSession('nameUser').then((nameUser) => {
      return nameUser;
    });
    setIsLoadingHistory(true);
    await useApiPost(apiQrisHistory(), {
      dateStart: moment(dateStart).format('YYYY-MM-DD'),
      dateEnd: moment(dateEnd).format('YYYY-MM-DD'),
      page: hal,
    })
      .then((res) => {
        if (isMounted) {
          setIsLoadingHistory(false);
          if (res.statusCode === 200) {
            let val = res.values.values;
            let len = val.data;
            if (len.length > 0) {
              let resultsCsv = [];
              for (let i = 0; i < len.length; i++) {
                let row = len[i];

                const {
                  transaction_id,
                  transaction_date,
                  idreseller,
                  amount,
                  issuer_name,
                } = row;

                resultsCsv.push([
                  transaction_id,
                  moment(transaction_date).format('DD MMMM YYYY HH:mm:ss'),
                  idreseller,
                  nameUser,
                  'Rp ' + getRupiah(amount),
                  issuer_name,
                ]);
              }

              setDataCsv(val.data);
              setData(val.data);
              setTotalPage(val.pagination.totalPage);
              setTotalData(val.totalData);
            } else {
              setDataCsv([]);
              setData([]);
              setTotalPage(0);
              setTotalData(0);
            }
          } else {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
        }
      })
      .catch((error) => {
        setIsLoadingHistory(false);
      });
  };

  // ========================
  // === Func Filter History ===
  // ========================
  const filter = () => {
    let start = dateStart;
    let end = dateEnd;

    let cekSelisih1 = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
    );
    let cekSelisih2 = end;
    let thirdSelisih1 = moment(cekSelisih1, 'DD/MM/YYYY');
    let thirdSelisih2 = moment(cekSelisih2, 'DD/MM/YYYY');
    let akhirSelisih = thirdSelisih2.diff(thirdSelisih1, 'days');

    if (parseInt(akhirSelisih) > 7) {
      getSnackBar_error({
        title: 'Batas filter 7 hari dari tanggal pertama',
        duration: 'LENGTH_LONG',
      });
    } else {
      setIsLoadingHistory(true);
      setModalFilter(false);
      getHistory(page);
    }
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    InteractionManager.runAfterInteractions(() => {
      isLogged(page);
      getHistory(page);
      getCheckQris();
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, []);

  const refreshBtn = () => {
    setIsLoading(true);
    isLogged(page);
    getHistory(page);
  };

  const nextPage = () => {
    if (parseInt(page) < parseInt(totalPage)) {
      setIsLoading(true);
      setPage(parseInt(page) + 1);
      isLogged(parseInt(page) + 1);
    }
  };

  const previousPage = () => {
    if (parseInt(page) > 1) {
      setIsLoading(true);
      setPage(parseInt(page) - 1);
      isLogged(parseInt(page) - 1);
    }
  };

  const changeDateStart = (event, selectedDate) => {
    const currentDate = selectedDate || dateStart;

    setShow1(Platform.OS === 'ios');
    if (event.type === 'neutralButtonPressed') {
      setDateStart(new Date(0));
      setDateEnd(new Date(0));
    } else {
      setDateStart(currentDate);
      setDateEnd(currentDate);
    }
  };

  const changeDateEnd = (event, selectedDate) => {
    const currentDate = selectedDate || dateEnd;

    setShow2(Platform.OS === 'ios');
    if (event.type === 'neutralButtonPressed') {
      setDateEnd(new Date(0));
    } else {
      setDateEnd(currentDate);
    }
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged(page);
  };

  const _onRefreshHistory = () => {
    getHistory(page);
  };

  // ========================
  // === Withdraw QRIS ===
  // ========================
  const tarikEmoney = () => {
    if (parseInt(balanceReal) > 0) {
      setModalTarik(true);
    } else {
      return getSnackBar_error({
        title: 'Saldo QRIS Anda Nol',
        duration: 'LENGTH_INDEFINITE',
      });
    }
  };

  const isOdd = (n) => {
    let angka = parseInt(n);
    let hasil = Math.round(angka / 1000) * 1000;

    return hasil;
  };

  // ========================
  // === Withdraw QRIS Action ===
  // ========================
  const tarikAction = async () => {
    if (nominal === '') {
      return getSnackBar_error({
        title: 'Masukkan Nominal',
        duration: 'LENGTH_INDEFINITE',
      });
    } else if (pin === '') {
      return getSnackBar_error({
        title: 'Masukkan PIN Anda',
        duration: 'LENGTH_INDEFINITE',
      });
    } else {
      setIsLoading(true);
      let nom = nominal.replace(/[^0-9]/g, '');

      if (parseInt(nom) > 0) {
        let cekNum = isOdd(parseInt(nom));
        if (cekNum !== parseInt(nom)) {
          return getSnackBar_error({
            title: 'Nominal harus per kelipatan 1.000',
            duration: 'LENGTH_INDEFINITE',
          });
        } else {
          setModalTarik(false);
          setIsLoading(true);
          setTimeout(async () => {
            await useApiPost(apiQrisWitdraw(), {
              pin: pin,
              amount: nom,
            })
              .then((res) => {
                setIsLoading(false);
                if (res.statusCode === 200) {
                  let val = res.values;
                  navigation.push('QrisSuccess', {
                    total: nominal,
                    message: val.message,
                  });
                } else {
                  getSnackBar_error({
                    title: res.values.message,
                    duration: 'LENGTH_INDEFINITE',
                  });
                }
              })
              .catch((error) => {
                setIsLoadingHistory(false);
              });
          }, 500);
        }
      } else {
        return getSnackBar_error({
          title: 'Masukkan Nominal',
          duration: 'LENGTH_INDEFINITE',
        });
      }
    }
  };

  const nominalChange = (value, index) => {
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setNominal(getRupiah(valu));
    } else {
      setNominal('');
    }
  };

  const downloadPdf = async () => {
    setIsLoading(true);
    await useApiPost(apiPdfQris(), {
      bg: ref.qris_bg,
      image: imageURL,
    })
      .then((res) => {
        setIsLoading(false);
        if (res.statusCode === 200) {
          let val = res.values;
          Linking.openURL(val.data.pdfUrl);
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
  };

  const ScanTab = () => (
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
      {ref.qris_bg ? (
        <ImageBackground
          resizeMethod="resize"
          source={{
            uri: ref.qris_bg,
          }}
          style={[styles.bgQris]}
          resizeMode={'stretch'}>
          <Image
            resizeMethod="resize"
            style={[
              styles.qrCodeImage,
              {
                marginTop: 80,
                marginBottom: 35,
              },
            ]}
            source={{
              uri: imageURL,
            }}
            resizeMode={'contain'}
          />
        </ImageBackground>
      ) : null}
      <View
        style={[
          styles.row,
          styles.pr15,
          styles.pl15,
          styles.pt10,
          styles.mb15,
        ]}>
        <View style={[styles.col50, styles.pr10]}>
          <TouchableOpacity
            style={styles.bottomQrisMulti}
            onPress={() => {
              downloadPdf();
            }}
            activeOpacity={0.5}>
            <Text style={[styles.fs13, styles.textGreenBold]}>PDF</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.col50, styles.pl10]}>
          <TouchableOpacity
            style={styles.bottomQrisMulti}
            onPress={() =>
              navigation.navigate('QrisImage', {
                barcode: imageURL,
                qris_bg: ref.qris_bg,
              })
            }
            activeOpacity={0.5}>
            <Text style={[styles.fs13, styles.textGreenBold]}>Perbesar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const HistoryTab = () => (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.bgWhite]}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoadingHistory}
            onRefresh={_onRefreshHistory}
          />
        }>
        <View>
          <View
            style={[
              styles.row,
              styles.mb10,
              styles.ml15,
              styles.mr15,
              {
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 1.5,
                borderColor: '#ddd',
                borderRadius: 7,
                paddingVertical: 7,
                paddingHorizontal: 10,
              },
            ]}>
            <TouchableOpacity
              onPress={() => setModalFilter(true)}
              activeOpacity={0.7}
              style={{width: WIDTH / 1.4}}>
              <Text style={{color: 'black'}}>Atur Tanggal</Text>
              <Text style={{fontSize: 12, marginTop: 2}}>{`${moment(
                dateStart,
              ).format('DD MMMM YYYY')} - ${moment(dateEnd).format(
                'DD MMMM YYYY',
              )}`}</Text>
            </TouchableOpacity>
            <SvgXml width={20} height={20} xml={IcCalender} />
            {/* <View style={[styles.col40, styles.justifyContent]}>
              <Text style={[styles.fs12, styles.greyB7, styles.mt5]}>
                {moment(dateStart).format('YYYY MM DD')}
              </Text>
            </View>
            <View style={[styles.col30, styles.pr5]}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#DDD')}
                onPress={() => setModalFilter(true)}>
                <View style={styles.bottomQrisMultiSmall}>
                  <Text style={[styles.fs12, styles.textGreenBold]}>
                    Atur Tanggal
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={[styles.col30, styles.pl5]}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#DDD')}
                onPress={() => downloadCsv()}>
                <View style={styles.bottomQrisMultiSmall}>
                  <Text style={[styles.fs12, styles.textGreenBold]}>
                    Download
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View> */}
          </View>

          <View style={(styles.mb40, styles.mt15)}>
            {data.length > 0 ? (
              <>
                {data.map((item, key) => (
                  <View
                    style={[styles.rowListQris, styles.pb10, styles.pl10]}
                    key={key}>
                    <Text
                      style={[styles.textListPulsa, styles.mb0]}
                      numberOfLines={2}
                      ellipsizeMode="tail">
                      {item.issuer_name
                        ? 'Transaksi ' + item.issuer_name
                        : 'PENARIKAN QRIS'}
                    </Text>
                    <View style={[styles.row]}>
                      <View style={[styles.col50]}>
                        <Text style={[styles.fs10, styles.greyB7, styles.pl4]}>
                          {moment(item.transaction_date).format(
                            'dddd, Do MMMM YYYY HH:mm',
                          )}
                        </Text>
                      </View>
                      <View style={[styles.col50]}>
                        <Text
                          style={[
                            styles.fs12,
                            styles.blue,
                            styles.bold,
                            styles.rightText,
                          ]}>
                          Rp  {getRupiah(item.amount)}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </>
            ) : (
              <View style={styles.boxEmpty}>
                <SvgXml width={120} height={120} xml={IconEmpty} />
                {!isLoading ? (
                  <Text style={styles.textEmpty}>Tidak Ada Data</Text>
                ) : null}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      {parseInt(totalPage) > 1 ? (
        <View
          style={[styles.bxButtonMore, styles.row, styles.mb20, styles.mt10]}>
          <View style={[styles.col30]}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#DDD')}
              onPress={() => previousPage()}>
              <View
                style={[
                  styles.leftText,
                  styles.col100,
                  styles.pt15,
                  styles.pb15,
                  styles.pl15,
                ]}>
                <SvgXml width={19} height={19} xml={IconLeftPage} />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={[styles.col40, styles.center]}>
            <Text style={[styles.black, styles.fs11, styles.fontWSR]}>
              Page {page}/{totalPage}
            </Text>
          </View>
          <View style={[styles.col30]}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#DDD')}
              onPress={() => nextPage()}>
              <View
                style={[styles.col100, styles.pt15, styles.pb15, styles.pr15]}>
                <View style={[styles.rightText]}>
                  <SvgXml width={19} height={19} xml={IconRightPage} />
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      ) : null}

      {data.length > 0 ? (
        <View
          style={[
            styles.ml15,
            styles.mr15,
            styles.mb20,
            {
              backgroundColor: '#4F6CFF',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 15,
              borderRadius: 8,
            },
          ]}>
          <Text style={[styles.fontWSB, {color: 'white'}]}>Download</Text>
        </View>
      ) : null}
    </>
  );

  // const renderTabBar = (props) => {
  //   return (
  //     <TabBar
  //       style={{
  //         backgroundColor: '#FFFFFF',
  //         elevation: 0,
  //         borderColor: '#ddd',
  //         borderBottomWidth: 1,
  //         height: 55,
  //       }}
  //       inactiveColor="#000000"
  //       activeColor="#4F6CFF"
  //       labelStyle={[
  //         {
  //           textTransform: 'capitalize',
  //         },
  //         styles.fontWSM,
  //         styles.mt5,
  //       ]}
  //       {...props}
  //       indicatorStyle={{backgroundColor: '#4F6CFF', height: 2.5}}
  //     />
  //   );
  // };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{
        backgroundColor: '#FFFFFF',
        elevation: 0,
      }}
      inactiveColor="#F2F2F2"
      activeColor="#4F6CFF"
      indicatorStyle={{backgroundColor: '#4F6CFF'}}
      tabStyle={{flexDirection: 'row', backgroundColor: '#FFFFFF'}}
      renderLabel={({route, focused, color}) => (
        <View
          style={{
            backgroundColor: color,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            marginBottom: 5,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: WIDTH / 2.4,
              paddingTop: 13,
            }}>
            <Text
              style={
                focused
                  ? [{color: 'white'}, styles.fs13, styles.fontMSB]
                  : [{color: 'black'}, styles.fs13, styles.fontMSB]
              }>
              {route.title}
            </Text>
            <Text
              style={
                focused
                  ? [{color: 'white'}, styles.fs12, styles.fontMSB]
                  : [{color: '#828282'}, styles.fs12, styles.fontMSB]
              }></Text>
          </View>
        </View>
      )}
    />
  );

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <View style={[styles.bgWhite]}>
        <View style={{height: 116, backgroundColor: '#4F6CFF'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.goBack('Home')}>
                <SvgXml width={25} height={25} xml={IconBack} />
              </TouchableOpacity>
              <Text
                style={[
                  styles.white,
                  styles.fs18,
                  styles.fontWSB,
                  {marginLeft: 10},
                ]}>
                Akun QRIS
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                refreshBtn();
              }}>
              <SvgXml width={25} height={25} xml={IconRefresh} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.widgedPulsa]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              marginVertical: 5,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <SvgXml width={33} height={33} xml={IcQris} />
              <View style={{marginLeft: 15}}>
                <Text
                  style={[
                    styles.textOutline,
                    styles.TopupTitleBlack,
                    styles.fs13,
                    styles.grey92,
                  ]}>
                  Saldo QRIS Anda
                </Text>

                <Text
                  style={[
                    styles.textOutline,
                    styles.black,
                    styles.fs15,
                    styles.fontWSB,
                  ]}>
                  {!isLoadingSaldo ? balance : '-'}
                </Text>
              </View>
            </View>
            <View style={[styles.col40, styles.center]}>
              {imageURL ? (
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple('#DDD')}
                  onPress={() => {
                    if (isTimeBetween('23:50', '00:06', srv)) {
                      getSnackBar_error({
                        title: 'Sistem sedang cut off',
                        duration: 'LENGTH_INDEFINITE',
                      });
                    } else {
                      tarikEmoney();
                    }
                  }}>
                  <View
                    style={[styles.btnTarikDanaQris, styles.pr15, styles.pl15]}>
                    <Text
                      style={[
                        styles.fontWSB,
                        styles.fs11,
                        styles.rightText,
                        styles.white,
                        ,
                        {fontWeight: 'bold'},
                      ]}>
                      Tarik Saldo
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              ) : (
                <View style={{height: 40}} />
              )}
            </View>
          </View>
        </View>
      </View>


      {/* <View style={[styles.seconHeaderQris, styles.bgWhite]}>
        <View style={styles.row}>
          <View style={styles.col60}>
            <View
              style={[
                styles.pulsaDataKet,
                styles.ml5,
                styles.row,
                styles.center,
              ]}>
              <View style={[styles.center, styles.col10, {width:38, height:38, borderRadius: 38/2, backgroundColor:'#F2F2F2'}]}>
                <SvgXml width={33} height={33} xml={IcQris} />
              </View>
              <View style={[styles.col90, styles.pl15]}>
                <Text
                  style={[
                    styles.textOutline,
                    styles.TopupTitleBlack,
                    styles.fs11,
                    styles.grey92,
                  ]}>
                  Saldo QRIS Anda
                </Text>

                <Text
                  style={[
                    styles.textOutline,
                    styles.black,
                    styles.fs15,
                    styles.fontWSB,
                  ]}>
                  {!isLoadingSaldo ? balance : '-'}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.col40, styles.center]}>
            {imageURL ? (
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#DDD')}
                onPress={() => {
                  if (isTimeBetween('23:50', '00:06', srv)) {
                    getSnackBar_error({
                      title: 'Sistem sedang cut off',
                      duration: 'LENGTH_INDEFINITE',
                    });
                  } else {
                    tarikEmoney();
                  }
                }}>
                <View style={[styles.btnTarikDana, styles.pr15, styles.pl15]}>
                  <Text
                    style={[
                      styles.fontWSB,
                      styles.fs11,
                      styles.rightText,
                      styles.black,
                      ,
                      {fontWeight: 'bold'},
                    ]}>
                    Tarik Saldo
                  </Text>
                </View>
              </TouchableNativeFeedback>
            ) : (
              <View style={{height: 40}} />
            )}
          </View>
        </View>
      </View> */}

      {/* {!isLoading ? (
        <>
          {imageURL ? (
            <TabView
              indicatorStyle={{backgroundColor: 'white'}}
              style={{backgroundColor: '#ffffff'}}
              navigationState={{index, routes}}
              renderScene={({route}) => {
                switch (route.key) {
                  case 'Scan':
                    return ScanTab();
                  case 'History':
                    return HistoryTab();
                  default:
                    return null;
                }
              }}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
              renderTabBar={renderTabBar}
            />
          ) : (
            <>
              {!isLoadingCheck ? (
                checkRegister ? (
                  <View style={styles.boxEmpty}>
                    <SvgXml width={120} height={120} xml={IconEmpty} />
                    <Text style={styles.textEmpty}>{checkRegister}</Text>
                  </View>
                ) : (
                  <View style={styles.boxEmpty}>
                    <SvgXml width={120} height={120} xml={IconEmpty} />
                    <Text style={styles.textEmpty}>Tidak Ada Data</Text>
                  </View>
                )
              ) : (
                // <ImageBackground
                //   resizeMethod="resize"
                //   resizeMode="stretch"
                //   style={[styles.center, styles.bgQris, styles.flex1]}
                //   source={require('../../assets/img/loading-qris.jpg')}>
                // </ImageBackground>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator size="large" color="#4F6CFF" />
                </View>
              )}
            </>
          )}
        </>
      ) : (
        // <ImageBackground
        //   resizeMethod="resize"
        //   resizeMode="stretch"
        //   style={[styles.center, styles.bgQris, styles.flex1]}
        //   source={require('../../assets/img/loading-qris.jpg')}>
        // </ImageBackground>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#4F6CFF" />
        </View>
      )} */}

      <ModalQris
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalTarik}
        onSwipeComplete={() => setModalTarik(false)}
        placeholder="Contoh : 100"
        value1={nominal}
        onChangeText1={nominalChange}
        value2={pin}
        onChangeText2={(pin) => setPin(pin)}
        title={'Tarik Saldo QRIS'}
        titleClose={'Batal'}
        titleButton={'Tarik'}
        onPressClose={() => {
          setModalTarik(false);
        }}
        onPress={() => {
          tarikAction();
        }}
      />

      <ModalFilters
        close={true}
        modal={'normal'}
        isVisible={modalFilter}
        show1={show1}
        show2={show2}
        onPressDate1={() => setShow1(true)}
        onPressDate2={() => setShow2(true)}
        onSwipeComplete={() => setModalFilter(false)}
        value1={dateStart}
        onChangeText1={(dateStart) => setDateStart(dateStart)}
        value2={dateEnd}
        onChangeText2={(dateEnd) => setDateEnd(dateEnd)}
        onDateChange1={changeDateStart}
        onDateChange2={changeDateEnd}
        titleStart={'Dari Tanggal'}
        titleEnd={'Sampai Tanggal'}
        placeholderStart={'Select dari tanggal...'}
        placeholderEnd={'Select sampai tanggal...'}
        ket={'Maksimum rentang Tanggal Awal dan Akhir mutasi adalah 7 hari'}
        title={'Filter'}
        titleButton={'Cari'}
        onPress={() => {
          filter();
        }}
      />
    </SafeAreaView>
  );
};

export default Qris;
