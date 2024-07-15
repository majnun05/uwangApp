import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import React, { useEffect } from 'react';
import { Linking, LogBox, Text, TouchableOpacity } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import * as RootNavigation from './app/NavigationService';
import { navigationRef } from './app/NavigationService';
import StatusBars from './content/more/StatusBar';
import MyTabBar from './content/more/TabBar';
import { getSession, setSession } from './helpers/Helpers';
import {
  AddTransaction,
  AngsuranKredit,
  AngsuranKreditProduk, Bantuan,
  BayarTv,
  BayarTvProduk,
  Bpjs,
  BpjsScreen,
  BpjsKerja,
  Bussiness,
  //end area
  // cashier
  Cashier,
  CatatChoose,
  CatatHutang,
  CatatHutangSup,
  CatatSuccess,
  CatatSuccessSup,
  CetakPay,
  CetakPreview,
  CetakPreviewTransfer,
  CetakStruk,
  ChangePin,
  ChangePinLogin,
  Chat,
  City,
  // qris
  // payment
  Confirm, DaftarHutang,
  DaftarHutangSup,
  DaftarPenghutang,
  DaftarPenghutangSup,
  DetailHutang,
  DetailHutangSup, Digipos,
  DigiposDetail,
  District,
  Donasi,
  DonasiDetail,
  DonasiNominal,
  Downline,
  DownlineDetail,
  DownlineNew,
  //end paybills
  // keagenan
  DownlineRegister,
  DownloadBanner,
  EMoney,
  EMoneyDetail,
  Finance,
  FinanceProduk,
  //end voucher
  // grosir

  //global
  Home,
  HpPasca,
  HpPascaProduk,
  Hubungi,
  Intro,
  KartuKredit,
  SaldoTransfer,
  KartuKreditProduk, 
  LaporanBulanan,
  Login,
  ChooseOtp,
  AddPin,
  UserBlok,
  ConfirmPin,
  LoginVerify,
  LoketChange,
  Maintenance,
  MaintenanceKyc,
  News,
  Notifikasi,
  NotifikasiDetail,
  OtpLogin,
  PaketData,
  PaketDataDetail,
  PaketSms,
  PaketSmsDetail,
  Pbb,
  PbbProduk,
  Pdam,
  PdamProduk,
  Peduli, Pendapatan,
  Pertagas,
  PertagasToken,
  PertagasTokenProduk,
  Pesan,
  PesanDetail, Pgn,
  PilihPenghutang,
  PilihPenghutangSup,
  Pin,
  PinForm,
  //end cashier
  // auth
  PinLogin,
  //end refillable
  //paybills
  Pln,
  PlnToken,
  PlnTokenProduk,
  PriceListGame,
  PriceListLainnya,
  PriceListPaketData,
  PriceListPaketSms,
  PriceListPpob,
  //end rekap
  // pricelist
  PriceListPulsa,
  PriceListToken,
  PriceListTopup,
  PriceListVoucher,
  Printer,
  //end auth
  // users
  Profile,
  MutasiIn,
  ProfileChange,
  ProfileKycRegister,
  TakeFoto,
  // end global
  //area
  Province,
  //end payment
  // refillable
  Pulsa,
  PulsaDetail,
  QrCode,
  // end topup
  // qris
  Qris,
  QrisImage,
  QrisRegister,
  QrisSuccess,
  RateSuccess,
  Referal,
  Register,
  RegisterKyc,
  //end keagenan
  // rekap
  RekapKomisi,
  RekapSaldo,
  RekapTransaksi,
  Rewards,
  RewardsSuccess,
  //end users
  // History
  Riwayat,
  RiwayatDetail,
  RiwayatMutasi,
  RiwayatReward,
  RiwayatTopup,
  RiwayatBayarTagihan,
  RiwayatAllTrx,
  RiwayatDetailAllTrx,
  RiwayatTopupAlfa,
  RiwayatTopupDetail,
  RiwayatTopupIndo,
  RiwayatTopupVa,
  RiwayatTransfer,
  Roaming,
  RoamingDetail,
  Samsat,
  SamsatProduk,
  ScanQr,
  ScanQrPln,
  Streaming,
  StreamingDetail,
  Success,
  TargetTransaksi,
  TarikDana,
  TarikDanaBank,
  TarikDanaDetail,
  TarikDanaSuccess,
  Telkom, TopPoint,
  // end History
  // topup
  Topup,
  TopupAlfamartDone,
  TopupDone,
  TopupEwalletDone,
  TopupIndomaretDone,
  TopupPaylater,
  TopupQris,
  TopupVa,
  TopupVaDone,
  TransferSaldo,
  TransferSaldoSuccess,
  TvKabelTagihan,
  TvKabelTagihanDetail,
  TvKabelVoucher,
  TvKabelVoucherDetail,
  VoucherData,
  VoucherDataDetail,
  //end pricelist
  // voucher
  VoucherDiskon,
  VoucherDiskonBelajar,
  VoucherDiskonDetail,
  VoucherGame,
  VoucherGameDetail,
  VoucherGameLainnya,
  VoucherTv,
  VoucherTvDetail,
  Wifiid,
  Zakat,
  ZakatDetail,
} from './screens/Screen';

enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const getTabBarVisible = (route) => {
  const params = route.params;
  if (params) {
    if (params.tabBarVisible === false) {
      return false;
    }
  }
  return true;
};

function TabStackScreen() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      lazy={true}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="RiwayatAllTrx" component={RiwayatAllTrx}/>
      <Tab.Screen name="ScanQr" component={ScanQr} options={{ title: '' }}/>
      <Tab.Screen name="Hubungi Kami" component={Hubungi}/>
      <Tab.Screen name="Profile" component={Profile} options={({ route }) => ({
              tabBarVisible: getTabBarVisible(route),
            })} />
    </Tab.Navigator>
  );
}

LogBox.ignoreAllLogs();

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

const notificationChannelId = 'my_notif_channel';
const App = () => {
  let lastId = 0;
  const showNotif = async (notif) => {
    let dats;
    if (notif.data) {
      dats = {
        targetScreen: notif.data?.targetScreen,
        gambar: notif.data?.gambar,
        link: notif.data?.link,
        _id: notif.data?._id,
        transactionId: notif.data?.transactionId,
        invoice: notif.data?.invoice,
      };
    } else {
      dats = {
        targetScreen: 'Home',
        gambar: '',
        link: '#',
        _id: '',
        transactionId: '',
        invoice: '',
      };
    }

    if (dats.targetScreen === 'Notifikasi') {
      loadNotif(1);
    }

    PushNotification.localNotification({
      channelId: notificationChannelId,
      id: lastId++,
      title: notif.title,
      message: notif.message,
      bigPictureUrl: dats.gambar ? dats.gambar : '',
      playSound: false,
      soundName: 'default',
      autoCancel: true,
      onlyAlertOnce: true,
      userInfo: {
        targetScreen: dats.targetScreen,
        link: dats.link,
        _id: dats._id,
        transactionId: dats.transactionId,
        invoice: dats.invoice,
      },
    });
  };

  const clickNotif = async (notif) => {
    let isLogged = await getSession('isLoggedV2').then((isLogged) => {
      return isLogged;
    });

    if (isLogged === 'yes') {
      let targetScreen = notif.data.targetScreen;
      let link;
      let idNot;
      if (targetScreen === 'Notifikasi') {
        link = notif.data.link ? notif.data.link : '#';
        idNot = notif.data._id ? notif.data._id : '';
      } else {
        link = '#';
        idNot = '';
      }

      if (link === '#') {
        setSession({name: 'popup', value: 'no'});
        setTimeout(() => {
          if (targetScreen === 'Notifikasi') {
            if (idNot) {
              RootNavigation.navigate('NotifikasiDetail', {
                _id: idNot,
              });
            } else {
              RootNavigation.navigate('Notifikasi');
            }
          } else if (targetScreen === 'RiwayatDetail') {
            let idTrx = notif.data.transactionId
              ? notif.data.transactionId
              : '';
            if (idTrx) {
              RootNavigation.navigate('RiwayatDetail', {
                idTrx: idTrx,
              });
            } else {
              RootNavigation.navigate('Riwayat');
            }
          } else {
            RootNavigation.navigate(targetScreen);
          }
        }, 500);
      } else {
        if (link) {
          Linking.openURL(link);
        } else {
          setTimeout(() => {
            RootNavigation.navigate('Home');
          }, 500);
        }
      }

      PushNotification.cancelLocalNotifications({
        id: notif.id,
      });
    } else {
      PushNotification.cancelLocalNotifications({
        id: notif.id,
      });
      RootNavigation.navigate('Login');
    }
  };

  const loadNotif = async (count) => {
    let countBadge_ = await getSession('countBadge').then((countBadge) => {
      return countBadge ? countBadge.toString() : '0';
    });

    let ct;
    if (parseInt(countBadge_) > 0) {
      ct = parseInt(parseInt(countBadge_) + parseInt(count));
    } else {
      ct = count;
    }

    setSession({
      name: 'countBadge',
      value: ct.toString(),
    });
  };

  useEffect(() => {
    Sentry.init({
      dsn:
        'https://c07699bfd981457c90b60c1fb7237a93@o505370.ingest.sentry.io/5688335',
      // To set a uniform sample rate
      tracesSampleRate: 0.01,
    });
    setSession({name: 'popup', value: 'yes'});

    PushNotification.createChannel(
      {
        channelId: notificationChannelId,
        channelName: `Uwang channel`,
        channelDescription: 'A Uwang channel',
        playSound: false,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => {
        // console.log(`createChannel 'TopindoPay channel' returned '${created}'`);
      },
    );

    PushNotification.configure({
      onRegister: function (token) {
        setSession({
          name: 'fcm',
          value: token.token ? token.token.toString() : token.token,
        });
      },

      onNotification: function (notification) {
        const clicked = notification.userInteraction;
        if (clicked) {
          clickNotif(notification);
        } else {
          showNotif(notification);
        }
      },

      onAction: function (notification) {
        // console.log('ACTION:', notification.action);
        // console.log('NOTIFICATION:', notification);
        // process the action
      },

      onRegistrationError: function (err) {
        //console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBars />
      <Stack.Navigator
        screenOptions={{
          replaceAnimation: 'push',
          gestureEnabled: true,
          headerShown: false,
          stackAnimation: 'slide_from_right',
          screenOrientation: 'portrait',
        }}
        initialRouteName="Intro">
        {/* global */}
        <Stack.Screen name="Home" component={TabStackScreen} />
        <Stack.Screen name="Peduli" component={Peduli} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Notifikasi" component={Notifikasi} />
        <Stack.Screen
          name="NotifikasiDetail"
          component={NotifikasiDetail}
          initialParams={{
            _id: '',
          }}
        />
        <Stack.Screen name="Rewards" component={Rewards} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="RewardsSuccess" component={RewardsSuccess} />
        <Stack.Screen name="CetakStruk" component={CetakStruk} />
        <Stack.Screen
          name="CetakPreview"
          component={CetakPreview}
          initialParams={{
            serialNumber: '',
            isDefault: false,
            isToken: false,
            phone: '',
            item: {
              description: {},
            },
            printerName: '',
            printerID: '',
          }}
        />
        <Stack.Screen
          name="CetakPreviewTransfer"
          component={CetakPreviewTransfer}
          initialParams={{
            tanggal: new Date(),
            idDownline: '',
            namaDownline: '',
            jumlah: '',
            printerName: '',
            printerID: '',
            bank: '',
          }}
        />
    
        <Stack.Screen name="CetakPay" component={CetakPay} />
        <Stack.Screen name="Hubungi" component={Hubungi} />
        <Stack.Screen name="Pesan" component={Pesan} />
        <Stack.Screen name="PesanDetail" component={PesanDetail} />
        <Stack.Screen name="Bantuan" component={Bantuan} />
        <Stack.Screen name="RateSuccess" component={RateSuccess} />
        <Stack.Screen name="LoketChange" component={LoketChange} />
        <Stack.Screen name="DownloadBanner" component={DownloadBanner} />
        <Stack.Screen
          name="TarikDana"
          component={TarikDana}
          initialParams={{
            detail: {},
          }}
        />
        <Stack.Screen name="TarikDanaBank" component={TarikDanaBank} />
        <Stack.Screen name="TarikDanaDetail" component={TarikDanaDetail} />
        <Stack.Screen name="TarikDanaSuccess" component={TarikDanaSuccess} />
        <Stack.Screen name="ScanQr" component={ScanQr} />
        <Stack.Screen name="ScanQrPln" component={ScanQrPln} />
        <Stack.Screen name="QrCode" component={QrCode} />
        <Stack.Screen name="SaldoTransfer" component={SaldoTransfer} />
        <Stack.Screen
          name="TopPoint"
          component={TopPoint}
          initialParams={{
            longitude: parseFloat(-6.9432238),
            latitude: parseFloat(107.7600642),
          }}
        />
        <Stack.Screen name="Maintenance" component={Maintenance} />
        <Stack.Screen name="MaintenanceKyc" component={MaintenanceKyc} />
        {/* end global */}

        {/* auth */}
        <Stack.Screen name="PinLogin" component={PinLogin} />
        <Stack.Screen name="OtpLogin" component={OtpLogin} />
        <Stack.Screen name="ChangePinLogin" component={ChangePinLogin} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ChooseOtp" component={ChooseOtp} />
        <Stack.Screen name="AddPin" component={AddPin} />
        <Stack.Screen name="UserBlok" component={UserBlok} />
        <Stack.Screen name="ConfirmPin" component={ConfirmPin} />
        <Stack.Screen
          name="LoginVerify"
          component={LoginVerify}
          initialParams={{
            type: 'SMS',
            check: 'Login',
            phone: '',
            hash: '',
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          initialParams={{
            registerToken: '',
            phone: '',
          }}
        />
        <Stack.Screen
          name="RegisterKyc"
          component={RegisterKyc}
          initialParams={{
            pendapatan: {},
            bussiness: '',
            province: {},
            district: {},
            city: {},
            dataReg: {},
          }}
        />
        <Stack.Screen name="Bussiness" component={Bussiness} />
        <Stack.Screen name="Pendapatan" component={Pendapatan} />
        {/* end auth */}

        {/* cashier */}
        <Stack.Screen name="Cashier" component={Cashier} />
        <Stack.Screen name="CatatChoose" component={CatatChoose} />
        <Stack.Screen name="LaporanBulanan" component={LaporanBulanan} />
        <Stack.Screen name="CatatHutang" component={CatatHutang} />
        <Stack.Screen name="PilihPenghutang" component={PilihPenghutang} />
        <Stack.Screen name="DetailHutang" component={DetailHutang} />
        <Stack.Screen name="CatatSuccess" component={CatatSuccess} />
        <Stack.Screen name="CatatHutangSup" component={CatatHutangSup} />
        <Stack.Screen
          name="PilihPenghutangSup"
          component={PilihPenghutangSup}
        />
        <Stack.Screen name="DetailHutangSup" component={DetailHutangSup} />
        <Stack.Screen name="CatatSuccessSup" component={CatatSuccessSup} />
        <Stack.Screen name="DaftarHutang" component={DaftarHutang} />
        <Stack.Screen name="DaftarPenghutang" component={DaftarPenghutang} />
        <Stack.Screen name="DaftarHutangSup" component={DaftarHutangSup} />
        <Stack.Screen
          name="DaftarPenghutangSup"
          component={DaftarPenghutangSup}
        />
        <Stack.Screen name="AddTransaction" component={AddTransaction} />
        {/* end cashier */}

        {/* area */}
        <Stack.Screen
          name="Province"
          component={Province}
          initialParams={{pages: ''}}
        />
        <Stack.Screen
          name="District"
          component={District}
          initialParams={{pages: ''}}
        />
        <Stack.Screen
          name="City"
          component={City}
          initialParams={{pages: ''}}
        />
        {/* end area */}

        {/* topup */}
        <Stack.Screen
          name="Topup"
          component={Topup}
          initialParams={{
            checkKyc: '',
            lockKYC: {Qris: true, VA: true, tarikDana: true},
          }}
        />
        <Stack.Screen name="TopupVa" component={TopupVa} />
        <Stack.Screen name="TopupVaDone" component={TopupVaDone} />
        <Stack.Screen name="TopupAlfamartDone" component={TopupAlfamartDone} />
        <Stack.Screen
          name="TopupIndomaretDone"
          component={TopupIndomaretDone}
        />
        <Stack.Screen name="TopupEwalletDone" component={TopupEwalletDone} />
        <Stack.Screen name="TopupDone" component={TopupDone} />
        <Stack.Screen name="TopupQris" component={TopupQris} />
        <Stack.Screen name="TopupPaylater" component={TopupPaylater} />
        {/* end topup */}

        {/* qris */}
        <Stack.Screen name="Qris" component={Qris} />
        <Stack.Screen name="QrisImage" component={QrisImage} />
        <Stack.Screen name="QrisSuccess" component={QrisSuccess} />
        <Stack.Screen
          name="QrisRegister"
          component={QrisRegister}
          initialParams={{
            bussiness: '',
            province: {},
            district: {},
            city: {},
          }}
        />
        {/* end qris */}

        {/* payment */}
        <Stack.Screen name="Confirm" component={Confirm} />
        <Stack.Screen name="Success" component={Success} />
        {/* end payment */}

        {/* refillable */}
        <Stack.Screen name="Pulsa" component={Pulsa} />
        <Stack.Screen name="PulsaDetail" component={PulsaDetail} />
        <Stack.Screen name="PaketData" component={PaketData} />
        <Stack.Screen name="PaketDataDetail" component={PaketDataDetail} />
        <Stack.Screen name="PaketSms" component={PaketSms} />
        <Stack.Screen name="PaketSmsDetail" component={PaketSmsDetail} />
        <Stack.Screen name="EMoney" component={EMoney} />
        <Stack.Screen name="EMoneyDetail" component={EMoneyDetail} />
        <Stack.Screen
          name="Digipos"
          component={Digipos}
          initialParams={{detail: {}}}
        />
        <Stack.Screen name="DigiposDetail" component={DigiposDetail} />
        <Stack.Screen name="Wifiid" component={Wifiid} />
        <Stack.Screen name="Streaming" component={Streaming} />
        <Stack.Screen name="StreamingDetail" component={StreamingDetail} />
        <Stack.Screen name="Roaming" component={Roaming} />
        <Stack.Screen name="RoamingDetail" component={RoamingDetail} />
        {/* end refillable */}

        {/* paybills */}
        <Stack.Screen
          name="BayarTv"
          component={BayarTv}
          initialParams={{detail: {}}}
        />
        <Stack.Screen name="BayarTvProduk" component={BayarTvProduk} />
        <Stack.Screen name="Pln" component={Pln} />
        <Stack.Screen
          name="PlnToken"
          component={PlnToken}
          initialParams={{detail: {}}}
        />
        <Stack.Screen name="PlnTokenProduk" component={PlnTokenProduk} />
        <Stack.Screen
          name="Pdam"
          component={Pdam}
          initialParams={{detail: {}}}
        />
        <Stack.Screen name="PdamProduk" component={PdamProduk} />
        <Stack.Screen name="Bpjs" component={Bpjs} />
        <Stack.Screen name="BpjsScreen" component={BpjsScreen} />
        <Stack.Screen name="BpjsKerja" component={BpjsKerja} />
        <Stack.Screen name="Telkom" component={Telkom} />
        <Stack.Screen
          name="HpPasca"
          component={HpPasca}
          initialParams={{detail: {}}}
        />
        <Stack.Screen name="HpPascaProduk" component={HpPascaProduk} />
        <Stack.Screen name="TvKabelVoucher" component={TvKabelVoucher} />
        <Stack.Screen
          name="TvKabelVoucherDetail"
          component={TvKabelVoucherDetail}
          initialParams={{detail: {}}}
        />
        <Stack.Screen name="TvKabelTagihan" component={TvKabelTagihan} />
        <Stack.Screen
          name="TvKabelTagihanDetail"
          component={TvKabelTagihanDetail}
          initialParams={{detail: {}}}
        />
        <Stack.Screen
          name="Finance"
          component={Finance}
          initialParams={{detail: {}}}
        />
        <Stack.Screen name="FinanceProduk" component={FinanceProduk} />
        <Stack.Screen name="Pgn" component={Pgn} />
        <Stack.Screen name="Pertagas" component={Pertagas} />
        <Stack.Screen
          name="PertagasToken"
          component={PertagasToken}
          initialParams={{detail: {}}}
        />
        <Stack.Screen
          name="PertagasTokenProduk"
          component={PertagasTokenProduk}
        />
        <Stack.Screen
          name="Samsat"
          component={Samsat}
          initialParams={{detail: {}}}
        />
        <Stack.Screen name="SamsatProduk" component={SamsatProduk} />
        <Stack.Screen name="Pbb" component={Pbb} initialParams={{detail: {}}} />
        <Stack.Screen name="PbbProduk" component={PbbProduk} />
        <Stack.Screen
          name="AngsuranKredit"
          component={AngsuranKredit}
          initialParams={{detail: {}}}
        />
        <Stack.Screen
          name="AngsuranKreditProduk"
          component={AngsuranKreditProduk}
        />
        <Stack.Screen
          name="KartuKredit"
          component={KartuKredit}
          initialParams={{detail: {}}}
        />
        <Stack.Screen name="KartuKreditProduk" component={KartuKreditProduk} />
        <Stack.Screen
          name="Zakat"
          component={Zakat}
          initialParams={{detail: {}}}
        />
        <Stack.Screen name="ZakatDetail" component={ZakatDetail} />
        <Stack.Screen
          name="Donasi"
          component={Donasi}
          initialParams={{detail: {}}}
        />
        <Stack.Screen
          name="DonasiDetail"
          component={DonasiDetail}
          initialParams={{
            detail: {},
            operatorId: '',
            operatorName: '',
            imgProduk: '',
          }}
        />
        <Stack.Screen
          name="DonasiNominal"
          component={DonasiNominal}
          initialParams={{
            detail: {},
            operatorId: '',
            operatorName: '',
            imgProduk: '',
          }}
        />
        {/* end paybills */}

        {/* keagenan */}
        <Stack.Screen
          name="DownlineRegister"
          component={DownlineRegister}
          initialParams={{province: {}, district: {}, city: {}}}
        />
        <Stack.Screen name="Downline" component={Downline} />
        <Stack.Screen name="DownlineNew" component={DownlineNew} />
        <Stack.Screen name="DownlineDetail" component={DownlineDetail} />
        <Stack.Screen name="Referal" component={Referal} />
        <Stack.Screen name="TargetTransaksi" component={TargetTransaksi} />
        <Stack.Screen
          name="TransferSaldo"
          component={TransferSaldo}
          initialParams={{idReseller: ''}}
        />
        <Stack.Screen
          name="TransferSaldoSuccess"
          component={TransferSaldoSuccess}
          initialParams={{idReseller: ''}}
        />
        {/* end keagenan */}

        {/* keagenan */}
        <Stack.Screen name="RekapKomisi" component={RekapKomisi} />
        <Stack.Screen name="RekapTransaksi" component={RekapTransaksi} />
        <Stack.Screen name="RekapSaldo" component={RekapSaldo} />
        {/* end keagenan */}

        {/* voucher */}
        <Stack.Screen name="VoucherDiskon" component={VoucherDiskon} />
        <Stack.Screen
          name="VoucherDiskonBelajar"
          component={VoucherDiskonBelajar}
        />
        <Stack.Screen
          name="VoucherDiskonDetail"
          component={VoucherDiskonDetail}
        />
        <Stack.Screen name="VoucherTv" component={VoucherTv} />
        <Stack.Screen name="VoucherTvDetail" component={VoucherTvDetail} />
        <Stack.Screen name="VoucherData" component={VoucherData} />
        <Stack.Screen name="VoucherDataDetail" component={VoucherDataDetail} />
        <Stack.Screen name="VoucherGame" component={VoucherGame} />
        <Stack.Screen
          name="VoucherGameLainnya"
          component={VoucherGameLainnya}
        />
        <Stack.Screen name="VoucherGameDetail" component={VoucherGameDetail} />
        {/* end voucher */}

        {/* history */}
        <Stack.Screen name="Riwayat" component={Riwayat} />
        <Stack.Screen
          name="RiwayatDetail"
          component={RiwayatDetail}
          initialParams={{
            idTrx: '',
            description: '',
            imageUrl: '',
            nominal: '',
            operatorId: '',
            phone: '',
            productCode: '',
            productName: '',
            productPrice: '',
            productPriceFormatted: '',
            serialNumber: '',
            status: '',
            transactionDate: '',
            transactionId: '',
          }}
        />
        <Stack.Screen name="RiwayatTopup" component={RiwayatTopup} />
        <Stack.Screen name="RiwayatAllTrx" component={RiwayatAllTrx} />
        <Stack.Screen name="RiwayatDetailAllTrx" component={RiwayatDetailAllTrx} />
        <Stack.Screen name="RiwayatBayarTagihan" component={RiwayatBayarTagihan} />
        <Stack.Screen
          name="RiwayatTopupDetail"
          component={RiwayatTopupDetail}
        />
        <Stack.Screen name="RiwayatTopupAlfa" component={RiwayatTopupAlfa} />
        <Stack.Screen name="RiwayatTopupIndo" component={RiwayatTopupIndo} />
        <Stack.Screen name="RiwayatTopupVa" component={RiwayatTopupVa} />
        <Stack.Screen name="RiwayatMutasi" component={RiwayatMutasi} />
        <Stack.Screen name="RiwayatTransfer" component={RiwayatTransfer} />
        <Stack.Screen name="RiwayatReward" component={RiwayatReward} />
    

        {/* end history */}

        {/* profile */}
        <Stack.Screen name="Printer" component={Printer} />
        {/* <Stack.Screen name="Profile" component={Profile} /> */}
        <Stack.Screen name="MutasiIn" component={MutasiIn} />
        <Stack.Screen name="TakeFoto" component={TakeFoto} />
        <Stack.Screen
          name="ProfileChange"
          component={ProfileChange}
          initialParams={{
            pendapatan: {income: '', incomeName: ''},
            bussiness: '',
            province: {},
            district: {},
            city: {},
          }}
        />
        <Stack.Screen
          name="ProfileKycRegister"
          component={ProfileKycRegister}
          initialParams={{
            pendapatan: {income: '', incomeName: ''},
            bussiness: '',
            province: {},
            district: {},
            city: {},
          }}
        />
        <Stack.Screen name="ChangePin" component={ChangePin} />
        <Stack.Screen name="Pin" component={Pin} />
        <Stack.Screen name="PinForm" component={PinForm} />
        {/* end profile */}

        {/* pricelist */}
        <Stack.Screen name="PriceListPulsa" component={PriceListPulsa} />
        <Stack.Screen
          name="PriceListPaketData"
          component={PriceListPaketData}
        />
        <Stack.Screen name="PriceListPaketSms" component={PriceListPaketSms} />
        <Stack.Screen name="PriceListGame" component={PriceListGame} />
        <Stack.Screen name="PriceListTopup" component={PriceListTopup} />
        <Stack.Screen name="PriceListPpob" component={PriceListPpob} />
        <Stack.Screen name="PriceListToken" component={PriceListToken} />
        <Stack.Screen name="PriceListLainnya" component={PriceListLainnya} />
        <Stack.Screen name="PriceListVoucher" component={PriceListVoucher} />
        {/* end pricelist */}

        {/* grosir */}
     
        {/* end grosir */}

        {/* kategory menu uwang */}

        {/* end kategory menu uwang */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
