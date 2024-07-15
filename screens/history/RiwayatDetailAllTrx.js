import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
  RefreshControl,
  InteractionManager,
  Linking,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
// import Clipboard from '@react-native-community/clipboard';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {
  apiCashierViewSetHarga,
  apiCashierViewSetAdmin,
  apiCashierAddSetHarga,
  apiCashierAddSetAdmin,
  apiTransactionAdditional,
  apiHistoryTransactionDetail,
  apiPdfSimpanBukti,
  apiHistoryAllTrxDetail,
} from '../../helpers/endPoint';
import {useApiPost} from '../../helpers/useFetch';
import {
  getSession,
  getSnackBar_error,
  getSnackBar_success,
  getRupiah,
} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import ModalPrice from '../../content/modal/ModalPrice';
import Header from '../../content/header/Header';
import IconCentang from '../../assets/svg/status/centang.svg';
import IconGagal from '../../assets/svg/status/centang-gagal.svg';
import IconPending from '../../assets/svg/status/centang-pending.svg';
import IconCopyWhite from '../../assets/svg/copypaste-white.svg';
import IconBatas from '../../assets/svg/status/batas-sukses.svg';
import IconBatasGagal from '../../assets/svg/status/batas-gagal.svg';
import IconBatasPending from '../../assets/svg/status/batas-pending.svg';
import IconLogoText from '../../assets/svg/logo-with-text.svg';
import IconPdf from '../../assets/svg/pdf.svg';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const RiwayatDetailAllTrx = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalAtur, setModalAtur] = useState(false);
  const [modalAdmin, setModalAdmin] = useState(false);
  const [idUser, setIdUser] = useState('');
  const [priceSale, setPriceSale] = useState('0');
  const [priceSaleData, setPriceSaleData] = useState('0');
  const [adminFee, setAdminFee] = useState('0');
  const [adminFeeData, setAdminFeeData] = useState('0');
  const [idTrx, setIdTrx] = useState(params.idTrx);
  const [detail, setDetail] = useState({
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
  });
  const [imageDefault, setImageDefault] = useState('');
  const [logoDefault, setLogoDefault] = useState('');
  const [totalPembayaran, setTotalPembayaran] = useState('0');
  const [description, setDescription] = useState('');
  const [ket, setKet] = useState({});
  let isMounted = true;

  const isLogged = async () => {
    let isLogged = await getSession('isLoggedV2').then((isLogged) => {
      return isLogged;
    });
    let idUser_ = await getSession('idUser').then((idUser) => {
      return idUser;
    });
    let imgDef = await getSession('imageDefault').then((imageDefault) => {
      return imageDefault;
    });
    let logoDef = await getSession('logoDefault').then((logoDefault) => {
      return logoDefault;
    });
    if (isMounted) {
      setImageDefault(imgDef);
      setLogoDefault(logoDef);
    }
    if (isLogged === 'yes') {
      setIdUser(idUser_);
      await useApiPost(apiHistoryAllTrxDetail(), {
        transactionId: params.idTrx ? params.idTrx : '',
      })
        .then((res) => {
        // console.log('data detail', res)
        setIsLoading(false)
          if (isMounted) {
            if (res.statusCode === 200) {
              let val = res.values;
              setDetail(val.data);
              setDescription(val.data.description);
            //   viewSetHarga(idUser_, val.data);
            //   getPajakInfo(val.data.productCode);
            } else {
              setIsLoading(false);
              setDetail({});
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
    } else {
      setIsLoading(false);
    }
  };


  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
  };

  const renderReservationForm = (description) => {
    if (description !== '') {
      let loopForm = [];
      for (var key in description) {
        if (description[key] !== '') {
          var json = {
            name: key.replace(/_/g, ' ').replace(/\b[a-z]/g, function (letter) {
              return letter.toUpperCase();
            }),
            value: description[key],
          };
          loopForm.push(json);
        }
      }

      return loopForm.map((data, key) => {
        return (
          <View key={key}>
            {data.value !== '-' || data.value !== '' ? (
              <>
                {data.name === 'IsToken' ? null : (
                  <>
                    {data.name !== 'Default' && data.name !== 'Sn' ? (
                      <View
                        style={[
                          styles.row,
                          styles.borderBottom,
                          styles.pl15,
                          styles.pr15,
                          styles.pb10,
                          styles.pt10,
                        ]}>
                        <View
                          style={[
                            styles.col40,
                            styles.pl5,
                            styles.centerContent,
                          ]}>
                          <Text
                            style={[styles.fs12, styles.black, styles.fontWSR]}>
                            {data.name}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.col60,
                            styles.pl5,
                            styles.centerContent,
                          ]}>
                          <Text
                            style={[
                              styles.fs12,
                              styles.black,
                              styles.fontWSR,
                              styles.rightText,
                            ]}>
                            {data.value}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </>
                )}
              </>
            ) : null}
          </View>
        );
      });
    } else {
      return <></>;
    }
  };


  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
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

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack()}
        title={'Detail History'}
        shadow={true}
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
        {!isLoading ? (
          <View
            style={
              detail.status === 'SUKSES'
                ? [styles.boxTopStatus]
                : detail.status === 'GAGAL'
                ? [styles.boxTopStatusGagal]
                : [styles.boxTopStatusPending]
            }>
            <View style={[styles.row, styles.pt15, styles.pb15]}>
              <SvgXml
                width={50}
                height={50}
                style={{
                  position: 'absolute',
                  left: '40%',
                }}
                xml={
                  detail.status === 'SUKSES'
                    ? IconBatas
                    : detail.status === 'GAGAL'
                    ? IconBatasGagal
                    : IconBatasPending
                }
              />

              <View style={[styles.col60, styles.centerContent, styles.pl10]}>
                <View style={styles.row}>
                  <SvgXml
                    width={20}
                    height={20}
                    xml={
                      detail.status === 'SUKSES'
                        ? IconCentang
                        : detail.status === 'GAGAL'
                        ? IconGagal
                        : IconPending
                    }
                  />
                  <Text
                    style={[
                      styles.white,
                      styles.bold,
                      styles.pl5,
                      styles.fs15,
                    ]}>
                    {detail.status === 'SUKSES'
                      ? 'Sukses'
                      : detail.status === 'GAGAL'
                      ? 'Gagal'
                      : 'Pending'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : null}

        <View style={styles.borderBottomBold}>
          <View style={[styles.row, styles.pt5, styles.pb10]}>
            <View style={[styles.col20, styles.center]}>
              {detail.imageUrl ? (
                <Image
                  resizeMethod="resize"
                  source={{
                    uri: detail.imageUrl,
                  }}
                  style={styles.imageRiwayatBorder}
                />
              ) : (
                <>
                  {imageDefault ? (
                    <Image
                      resizeMethod="resize"
                      source={{
                        uri: imageDefault,
                      }}
                      style={styles.imageRiwayatBorder}
                    />
                  ) : null}
                </>
              )}
            </View>
            <View style={[styles.col80, styles.centerContent]}>
              <Text
                style={[styles.textListRegion, styles.fs13, styles.fontWSB]}
                numberOfLines={2}
                ellipsizeMode="tail">
                {detail.productName}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.borderBottom,
              styles.pl20,
              styles.pr20,
              styles.pb10,
            ]}>
            <Text style={[styles.fs13, styles.black, styles.fontWSB]}>
                Detail Transaksi
            </Text>
          </View>

          <View
            style={[
              styles.row,
              styles.borderBottom,
              styles.pl15,
              styles.pr15,
              styles.pb10,
              styles.pt10,
            ]}>
            <View style={[styles.col40, styles.pl5, styles.centerContent]}>
              <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                Nomor tujuan
              </Text>
            </View>
            <View style={[styles.col60, styles.pl5, styles.centerContent]}>
              <Text
                style={[
                  styles.fs12,
                  styles.black,
                  styles.fontWSR,
                  styles.rightText,
                  styles.right,
                ]}>
                {detail.phone}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.row,
              styles.borderBottom,
              styles.pl15,
              styles.pr15,
              styles.pb10,
              styles.pt10,
            ]}>
            <View style={[styles.col40, styles.pl5, styles.centerContent]}>
              <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                Harga
              </Text>
            </View>
            <View style={[styles.col60, styles.pl5, styles.centerContent]}>
              <Text
                style={[
                  styles.fs12,
                  styles.green,
                  styles.fontWSB,
                  styles.rightText,
                  styles.right,
                ]}>
                Rp {getRupiah(detail.price)}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.row,
              styles.borderBottom,
              styles.pl15,
              styles.pr15,
              styles.pb10,
              styles.pt10,
            ]}>
            <View style={[styles.col40, styles.pl5, styles.centerContent]}>
              <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                No.Pesanan
              </Text>
            </View>
            <View style={[styles.col60, styles.pl5, styles.centerContent]}>
              <Text
                style={[
                  styles.fs12,
                  styles.black,
                  styles.fontWSR,
                  styles.rightText,
                  styles.right,
                ]}>
                {detail.transactionId}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.row,
              styles.borderBottom,
              styles.pl15,
              styles.pr15,
              styles.pb10,
              styles.pt10,
            ]}>
            <View style={[styles.col40, styles.pl5]}>
              <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                Nomor Serial
              </Text>
            </View>
            <View style={[styles.col60, styles.pl5, styles.centerContent]}>
              <Text
                style={[
                  styles.fs12,
                  styles.black,
                  styles.fontWSR,
                  styles.rightText,
                  styles.right,
                ]}>
                {detail.serialNumber}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.row,
              styles.borderBottom,
              styles.pl15,
              styles.pr15,
              styles.pb15,
              styles.pt10,
            ]}>
            <View style={[styles.col40, styles.pl5, styles.centerContent]}>
              <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                Waktu Pemesanan
              </Text>
            </View>
            <View style={[styles.col60, styles.pl5, styles.centerContent]}>
              <Text
                style={[
                  styles.fs12,
                  styles.black,
                  styles.fontWSR,
                  styles.rightText,
                  styles.right,
                ]}>
                {moment(
                  detail.transactionDate ? detail.transactionDate : new Date(),
                ).format('Do MMMM YYYY, HH:mm:ss')}
              </Text>
            </View>
          </View>
        </View>

        {description ? (
          <View style={[styles.borderBottomBold]}>
            {Object.keys(description).length > 0 ? (
              <>{renderReservationForm(description)}</>
            ) : null}
          </View>
        ) : null}

        <View
          style={[
            styles.row,
            styles.borderBottom,
            styles.pl15,
            styles.pr15,
            styles.pb15,
            styles.pt10,
          ]}>
          <View style={[styles.col40, styles.pl5, styles.centerContent]}>
            <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
              Metode Pembayaran
            </Text>
          </View>
          <View style={[styles.col60, styles.pl5, styles.centerContent]}>
            <Text
              style={[
                styles.fs12,
                styles.green,
                styles.fontWSB,
                styles.rightText,
              ]}>
              Saldo
            </Text>
          </View>
        </View>

        <View style={[styles.mt5]}>
          <View
            style={[
              styles.row,
              styles.pl15,
              styles.pr15,
              styles.pb10,
              styles.pt10,
              {borderBottomWidth:1, borderBottomColor:'#E0E0E0'}
            ]}>
            <View style={[styles.col40, styles.pl5, styles.centerContent]}>
              <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                Total Pembayaran
              </Text>
            </View>
            <View style={[styles.col60, styles.pl5, styles.centerContent]}>
              <Text
                style={[
                  styles.fs12,
                  styles.green,
                  styles.fontWSB,
                  styles.rightText,
                ]}>
                Rp {detail.productPriceFormatted}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default RiwayatDetailAllTrx;
