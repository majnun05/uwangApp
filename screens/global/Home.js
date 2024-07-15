import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Image,
  InteractionManager,
  Linking,
  PermissionsAndroid,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {SvgXml} from 'react-native-svg';
// import SwipeablePanel from 'rn-swipeable-panel';
import {IcNotif, IcQris, IcRowBot, IcRowTop, IcWallet, LogoMark} from '../../assets';
import IcTopUp from '../../assets/svg/IcTopUp.svg';
import IcTf from '../../assets/svg/IcTranfer.svg';
import {Fonts} from '../../assets/fonts/Fonts';
import styles from '../../assets/styles/Style';
import Menu from '../../content/fitur/Menu';
import MenuHighlight from '../../content/fitur/MenuHighlight';
import MenuTagihan from '../../content/fitur/MenuTagihan';
import MenuVoucher from '../../content/fitur/MenuVoucher';
import HeaderHome from '../../content/header/HeaderHome';
import ModalAd from '../../content/modal/ModalAds';
import ModalNotifs from '../../content/modal/ModalNotif';
import News from '../../content/fitur/News';
import Database from '../../helpers/Database';
import {
  apiQrisBalance,
  apiUserBalance,
  apiUserCheckKyc,
  apiUserUpdateFcm,
  apiUtilityConfig,
  apiUtilityNews,
  apiUtilityRewards,
  apiUtilitySlider,
} from '../../helpers/endPoint';
import {getSession, getSnackBar_error, setSession} from '../../helpers/Helpers';
import {useApiPost} from '../../helpers/useFetch';
import SliderHome from '../../content/Slider/SliderHome';
const db = new Database();

async function requestFineLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Izin Lokasi',
        message: 'Aplikasi Uwang membutuhkan izin lokasi Anda',
      },
    );
  } catch (err) {
    return false;
  }
}

async function requestCoarseLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Izin Lokasi',
        message: 'Aplikasi Uwang membutuhkan izin lokasi Anda',
      },
    );
  } catch (err) {
    return false;
  }
}

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Izin Kamera',
        message: 'Aplikasi Uwang membutuhkan Kamera Anda',
      },
    );
  } catch (err) {
    return false;
  }
}

const Home = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(true);
  const [isLoadingQris, setIsLoadingQris] = useState(false);
  const [loadingSaldo, setLoadingSaldo] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [lengthScroll, setLengthScroll] = useState(0);
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [modalNotif, setModalNotif] = useState(false);
  const [modalAds, setModalAds] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [checkKyc, setCheckKyc] = useState('0');
  const [dataCategories, setDataCategories] = useState([]);
  const [dataProducts, setDataProducts] = useState(null);
  const [dataRewards, setDataRewards] = useState([]);
  const [dataNews, setDataNews] = useState([]);
  const [dataSlider, setDataSlider] = useState([]);
  const [countSlider, setCountSlider] = useState(0);
  const [balance, setBalance] = useState(0);
  const [balanceQris, setBalanceQris] = useState(0);
  const [point, setPoint] = useState(0);
  const [ref, setRef] = useState({
    informasi: {
      link: '',
      title: '',
    },
  });
  const [popup, setPopup] = useState({
    height: 0,
    image: '',
    link: '#',
    screen: '#',
    status: '1',
  });
  const [isUser, setIdUser] = useState('');
  const [user, setUser] = useState('');
  const [total_notif, settotal_notif] = useState('0');
  const [productMenu, setProductMenu] = useState({});
  const [lockKYC, setLockKYC] = useState({
    Qris: true,
    VA: true,
    tarikDana: true,
  });
  const [coords, setCoords] = useState({});
  const [availGrosir, setAvailGrosir] = useState(false);
  const [isiUlang, setIsiUlang] = useState(false);
  const [tagihan, setTagihan] = useState(true);
  const [voucher, setVoucher] = useState(true);
  const [Other, setOther] = useState(true);
  const [slider, setSlider] = useState([])

  let isMounted = true;

  const openPanel = () => {
    setIsPanelActive(true);
    navigation.setOptions({tabBarVisible: false});
  };

  const closePanel = () => {
    setIsPanelActive(false);
    navigation.setOptions({tabBarVisible: true});
  };

  // ========================
  // === Get Slider ===
  // ========================
  const getSlider = async () => {
    let isLogged = await getSession('isLoggedV2').then((isLogged) => {
      return isLogged;
    });
    if (isLogged === 'yes') {
      await useApiPost(apiUtilitySlider(), {})
        .then((res) => {
          // console.log('data',res)
          if (isMounted) {
            if (res.statusCode === 200) {
              let val = res.values.values;
              setSlider(val.data)
            } else {
              getSnackBar_error({
                title: res.values.message,
                duration: 'LENGTH_INDEFINITE',
              });
            }
          }
        })
        .catch((error) => {
          setRefreshing(false);
        });
    } else {
      navigation.replace('Login');
    }
  };

  // ========================
  // === Get Reference ===
  // ========================
  const getRef = async () => {
    let popup_check = await getSession('popup').then((popup) => {
      return popup;
    });
    await useApiPost(apiUtilityConfig(), {})
      .then((res) => {
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values;
            // console.log('data produk', val.values.productMenu)
            setRef(val.values);
            setPopup(val.values.popup);
            setProductMenu(
              val.values.productMenu ? val.values.productMenu : {},
            );
            setLockKYC(val.values.lockKYC ? val.values.lockKYC : {});

            let statusPopup = val.values.popup;
            let st = statusPopup.status
              ? statusPopup.status.toString()
              : statusPopup.status;
            if (popup_check === 'yes') {
              if (st === '1') {
                setModalAds(true);
              } else {
                setModalAds(false);
              }
            }

            // let versionPlaystore = val.values.versionPlaystore //==========================================================================================================================
            //   ? val.values.versionPlaystore
            //   : '2.0.2';
            // if (DeviceInfo.getVersion() !== versionPlaystore) {
            //   setModalUpdate(true);
            // }

            setSession({name: 'imageDefault', value: val.values.imageDefault});
            setSession({name: 'logoDefault', value: val.values.logo});
          } else {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
        }
      })
      .catch((error) => {
        setRefreshing(false);
      });
  };

  // ========================
  // === Get Balance Qris ===
  // ========================
  const getBalanceQris = async () => {
    setIsLoadingQris(true);
    await useApiPost(apiQrisBalance(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoadingQris(false);
          if (res.statusCode === 200) {
            let val = res.values.values;
            setBalanceQris(val.balance);
          } else if (res.statusCode === 500) {
            setBalanceQris(0);
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          } else {
            setBalanceQris(0);
            setIsLoadingQris(false);
          }
        }
      })
      .catch((error) => {
        setIsLoadingQris(false);
      });
  };

  // ========================
  // === Get Reference ===
  // ========================
  const getCheckKyc = async () => {
    await useApiPost(apiUserCheckKyc(), {})
      .then((res) => {
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values;
            setCheckKyc(val.data.registered);
            setSession({
              name: 'checkKycSess',
              value: val.data.registered ? val.data.registered.toString() : '0',
            });
          } else {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
        }
      })
      .catch((error) => {
        setRefreshing(false);
      });
  };

  // ========================
  // === Get Rewards ===
  // ========================
  const getRewards = async () => {
    await useApiPost(apiUtilityRewards(), {})
      .then((res) => {
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values;
            setDataRewards(val.values);
          } else {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
        }
      })
      .catch((error) => {
        setRefreshing(false);
      });
  };

  // ========================
  // === Get Update FCM ===
  // ========================
  const getUpdateFcm = async () => {
    let fcm = await getSession('fcm').then((fcm) => {
      return fcm;
    });
    // console.log(fcm)
    await useApiPost(apiUserUpdateFcm(), {
      fcm: fcm ? fcm.toString() : fcm,
    })
      .then((res) => {
        //log
      })
      .catch((error) => {
        setRefreshing(false);
      });
  };

  // ========================
  // === Get News ===
  // ========================
  const getNews = async () => {
    setLoadingNews(true);
    await useApiPost(apiUtilityNews(), {
      page: 1,
    })
      .then((res) => {
        if (isMounted) {
          setLoadingNews(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setDataNews(val.values.data);
          } else {
            setDataNews([]);
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
        }
      })
      .catch((error) => {
        setRefreshing(false);
      });
  };

  // ========================
  // === Get Balance ===
  // ========================
  const getBalance = async () => {
    setLoadingSaldo(true);
    await useApiPost(apiUserBalance(), {})
      .then((res) => {
        // console.log('data balance', res)
        if (isMounted) {
          setRefreshing(false);
          setLoadingSaldo(false);
          if (res.statusCode === 200) {
            let val = res.values.data;

            setBalance(val.balance);
            setPoint(val.point);
            setIdUser(val.idUser);
            setUser(val.nameUser);

            setSession({name: 'idUser', value: val.idUser});
            setSession({name: 'nameUser', value: val.nameUser});
            setSession({name: 'balanceUser', value: val.balance});
            setSession({
              name: 'balancerealUser',
              value: val.balanceReal.toString(),
            });

            let dataInsert = {
              iduser: val.iduser,
              name: val.name,
              balance: val.balance,
              balanceReal: val.balanceReal.toString(),
              point: val.point,
            };

            db.addProfileBalance(dataInsert)
              .then((data) => {
                //log
              })
              .catch((err) => {
                //log
              });
          } else if (res.statusCode === 401) {
            deleteProfile();
            setSession({name: 'token', value: ''});
            setSession({name: 'isLoggedV2', value: 'no'});
            setSession({name: 'guideApp', value: 'false'});
            setSession({name: 'guideAppKasir', value: 'false'});
            setSession({name: 'tanpaPin', value: 'no'});
            setSession({
              name: 'pinTrx',
              value: '',
            });
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
            navigation.push('Login');
          } else {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
        }
      })
      .catch((error) => {
        setRefreshing(false);
      });
  };

  // ========================
  // === Get Delete Profile ===
  // ========================
  const deleteProfile = async (data) => {
    db.deleteProfileBalance()
      .then((data) => {
        getBalance();
      })
      .catch((error) => {
        setRefreshing(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp()
        return true;
      };

      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        // Once the Screen gets blur Remove Event Listener
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [isPanelActive]),
  );

  const loadDataNotif = async () => {
    let countBadge_ = await getSession('countBadge').then((countBadge) => {
      return countBadge ? countBadge.toString() : '0';
    });
    settotal_notif(parseInt(countBadge_));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // refresh back screen
      getBalanceQris();
      getCheckKyc();
      loadDataNotif();
      deleteProfile();
      // end refresh back screen
    });

    InteractionManager.runAfterInteractions(() => {
      // load api
      getSlider();
      getRef();
      getUpdateFcm();
      // end load api

      requestFineLocationPermission();
      requestCoarseLocationPermission();
      requestCameraPermission();
    });

    return () => {
      unsubscribe();
      isMounted = false;
    };
  }, [navigation]);

  const handleScroll = (event) => {
    setLengthScroll(event.nativeEvent.contentOffset.y);
  };

  const _onRefresh = () => {
    setRefreshing(true);
    getSlider();
    deleteProfile();
    loadDataNotif();
    getCheckKyc();
    getRef();
    getUpdateFcm();
    getBalanceQris();
  };

  const openLink = async (link) => {
    try {
      const url = link;
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#4F6CFF',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#4F6CFF',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
      } else Linking.openURL(url);
    } catch (error) {
      //console.log(error.message);
    }
  };

  const closeModalAds = () => {
    setModalAds(false);
    setSession({name: 'popup', value: 'no'});
  };

  const chooseMenu = (cek) => {
    if (cek === 'isiulang') {
      setIsiUlang(!isiUlang);
      setTagihan(true);
      setVoucher(true);
      setOther(true);
    } else if (cek === 'tagihan') {
      setTagihan(!tagihan);
      setIsiUlang(true);
      setVoucher(true);
      setOther(true);
    } else if (cek === 'voucher') {
      setVoucher(!voucher);
      setTagihan(true);
      setIsiUlang(true);
      setOther(true);
    } else if (cek === 'other') {
      setOther(!Other);
      setVoucher(true);
      setTagihan(true);
      setIsiUlang(true);
    }
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <View style={{backgroundColor:'#4F6CFF', width:'100%', height:60, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:25}}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Image style={{width:30, height:30}} source={LogoMark} resizeMode="stretch" />
            <View style={{marginLeft:10, flexDirection:'row', alignItems:'center'}}>
                <Text style={[styles.fs15, styles.white, styles.fontWSR]}>Halo, </Text>
                <Text style={[styles.fs15, styles.white, styles.fontWSB, {width:150}]}>{user}</Text>
            </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Notifikasi')} activeOpacity={0.7}>
          <SvgXml width={23} height={23} xml={IcNotif} />
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={refreshing}
            onRefresh={_onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={[styles.bgWhite]}>
        {/* <HeaderHome
          header="fixed"
          navigation={navigation}
          iduser={isUser}
          total_notif={total_notif}
          userName={user}
        /> */}
        {/* <Slider data={dataSlider} count={countSlider} /> */}
        
        {/* <SaldoHome
          loadingSaldo={loadingSaldo}
          loadingQris={isLoadingQris}
          navigation={navigation}
          balance={balance}
          onDeleteProfile={() => {
            deleteProfile();
          }}
          checkKyc={checkKyc}
          balanceQris={balanceQris}
          lockKYC={lockKYC}
        /> */}

        <View style={{backgroundColor:'#4F6CFF', width:'100%', height:100, borderBottomEndRadius:50, borderBottomStartRadius:50}}/>

        <View style={[styles.widgetHome]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.backIcon}>
                <SvgXml xml={IcWallet} />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#4F4F4F',
                    fontFamily: Fonts.WSR,
                  }}>
                  Uwang Cash
                </Text>
                <Text
                  style={[
                    styles.textOutline,
                    styles.black,
                    styles.fs16,
                    styles.fontWSB,
                  ]}>
                  {loadingSaldo ? (
                    <Text
                      style={[
                        styles.textOutline,
                        styles.black,
                        styles.fs16,
                        styles.fontWSB,
                      ]}>
                      Loading ...
                    </Text>
                  ) : (
                    <>
                      <Text
                        style={[
                          styles.textOutline,
                          styles.black,
                          styles.fs16,
                          styles.fontWSB,
                        ]}>
                        Rp
                      </Text>{' '}
                      {balance}
                    </>
                  )}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(224, 224, 224, 1)',
              marginHorizontal: 10,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
       
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.push('Topup', {
                  checkKyc: checkKyc,
                  lockKYC: lockKYC,
                })
              }
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:'center',
                flex:1
              }}>
              <SvgXml xml={IcTopUp} width={25} height={25} />
              <Text
                style={{
                  marginLeft: 10,
                  color: '#4F6CFF',
                  fontFamily: Fonts.WSB,
                }}>
                Isi Saldo
              </Text>
            </TouchableOpacity>

            <View
              style={{
                width: 1,
                height: 40,
                marginTop:5,
                backgroundColor: '#BDBDBD',
              }}
            />

            <TouchableOpacity
              onPress={() => navigation.push('SaldoTransfer')}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:'center',
                flex:1
              }}>
              <SvgXml xml={IcTf} width={25} height={25} />
              <Text
                style={{
                  marginLeft: 10,
                  color: '#4F6CFF',
                  fontFamily: Fonts.WSB,
                }}>
                Transfer Saldo
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => chooseMenu('isiulang')}
          style={[styles.contentHome, {marginTop: 15}]}>
          <View>
            <Text style={[styles.fs16, styles.fontMB, styles.black]}>
              Isi Ulang
            </Text>
            <Text
              style={[
                styles.fs12,
                styles.fontWSR,
                {color: '#757575', marginBottom: 15, width:310},
              ]}>
              Isi ulang pulsa, paket data internet hingga streaming
            </Text>
          </View>

          <View>
            <SvgXml
              xml={isiUlang ? IcRowBot : IcRowTop}
              width={20}
              height={20}
            />
          </View>
        </TouchableOpacity>

        {isiUlang ? null : (
          <View style={[styles.layoutTheme]}>
            <View
              style={[styles.row, styles.mb5, styles.rowWrap, styles.col100]}>
              <MenuHighlight
                menu="home"
                checkGrosir={availGrosir}
                productMenu={productMenu}
                lockKYC={lockKYC}
                checkKyc={checkKyc}
              />
            </View>
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => chooseMenu('tagihan')}
          style={[styles.contentHome]}>
          <View>
            <Text style={[styles.fs16, styles.fontMB, styles.black]}>
              Tagihan
            </Text>
            <Text
              style={[
                styles.fs12,
                styles.fontWSR,
                {color: '#757575', marginBottom: 15, width:310},
              ]}>
              Bayar cicilan, tagihan telepon, listrik, air dan lainnya
            </Text>
          </View>
          <View>
            <SvgXml
              xml={tagihan ? IcRowBot : IcRowTop}
              width={20}
              height={20}
            />
          </View>
        </TouchableOpacity>

        {tagihan ? null : (
          <View style={[styles.layoutTheme]}>
            <View
              style={[styles.row, styles.mb5, styles.rowWrap, styles.col100]}>
              <MenuTagihan
                menu="home"
                checkGrosir={availGrosir}
                productMenu={productMenu}
                lockKYC={lockKYC}
                checkKyc={checkKyc}
              />
            </View>
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => chooseMenu('voucher')}
          style={[styles.contentHome]}>
          <View>
            <Text style={[styles.fs16, styles.fontMB, styles.black]}>
              Voucher
            </Text>
            <Text
              style={[
                styles.fs12,
                styles.fontWSR,
                {color: '#757575', marginBottom: 15, width:310},
              ]}>
              Beli voucher dan topup game hingga voucher diskon
            </Text>
          </View>
          <View>
            <SvgXml
              xml={voucher ? IcRowBot : IcRowTop}
              width={20}
              height={20}
            />
          </View>
        </TouchableOpacity>

        {voucher ? null : (
          <View style={[styles.layoutTheme]}>
            <View
              style={[styles.row, styles.mb5, styles.rowWrap, styles.col100]}>
              <MenuVoucher
                menu="home"
                checkGrosir={availGrosir}
                productMenu={productMenu}
                lockKYC={lockKYC}
                checkKyc={checkKyc}
              />
            </View>
          </View>
        )}

        {/* <Info
          navigation={navigation}
          link={ref.informasi.link}
          title={ref.informasi.title}
        /> */}

        {/* <View style={availGrosir ? styles.mt15 : null}>
          <Rewards point={point} data={dataRewards} navigation={navigation} />
        </View> */}

        {/* {loadingNews ? (
          <View style={[styles.mb10, styles.center]}>
            <ActivityIndicator size="small" color="#4F6CFF" />
          </View>
        ) : (
          <News point={point} data={dataNews} navigation={navigation} />
        )} */}

        {slider.length > 0 ? (
          <SliderHome dataCousel={slider}/>
        ) : null}
      </ScrollView>

      <ModalNotifs
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalNotif}
        onSwipeComplete={() => setModalNotif(false)}
        title={'Notifikasi'}
        message={'Apa Anda yakin akan Keluar ?'}
        titleClose={'Tidak'}
        titleButton={'Ya'}
        onPressClose={() => {
          setModalNotif(false);
        }}
        onPress={() => {
          BackHandler.exitApp();
        }}
      />

      <ModalNotifs
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalUpdate}
        onSwipeComplete={() => setModalUpdate(false)}
        title={'Notifikasi'}
        message={'Segera update aplikasi versi terbaru'}
        titleClose={'Nanti'}
        titleButton={'Update'}
        onPressClose={() => {
          setModalUpdate(false);
        }}
        onPress={() => {
          Linking.openURL(
            'https://play.google.com/store/apps/details?id=com.uwang.android',
          );
        }}
      />

      <ModalAd
        close={true}
        isVisible={modalAds}
        onSwipeComplete={() => closeModalAds()}
        popup={popup}
        navigation={navigation}
        onPressClose={() => {
          closeModalAds();
        }}
        onPressModal={() => {
          closeModalAds();
          if (popup.link !== '#') {
            openLink(popup.link);
          } else {
            if (popup.screen !== '#') {
              navigation.navigate(popup.screen);
            }
          }
        }}
      />
      {/* <SwipeablePanel
        fullWidth
        useNativeDriver={true}
        openLarge={true}
        isActive={isPanelActive}
        onClose={() => {
          closePanel();
        }}
        onPressCloseButton={() => {
          closePanel();
        }}>
        <Menu
          menu="all"
          productMenu={productMenu}
          lockKYC={lockKYC}
          checkKyc={checkKyc}
          checkGrosir={availGrosir}
        />
      </SwipeablePanel> */}
    </SafeAreaView>
  );
};

export default React.memo(Home);
