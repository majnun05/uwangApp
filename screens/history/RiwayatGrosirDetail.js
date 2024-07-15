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
  StyleSheet,
  Linking,
  ToastAndroid,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
// import Clipboard from '@react-native-community/clipboard';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {
  getSession,
  getSnackBar_success,
  getSnackBar_error,
} from '../../helpers/Helpers';
import {getErrorGlobal} from '../../helpers/ErrorTranslate';
import {
  useApiGrosirGet,
  useApiGrosirPost,
  useApiPost_demo,
} from '../../helpers/useFetch';
import {
  apiGrosirHistoryDetail,
  apiGrosirOrderAccepted,
  apiGrosirComplain,
  apiGrosirGetComplain,
  apiPdfHistoryGrosir,
} from '../../helpers/endPoint';
import ModalNotifs from '../../content/modal/ModalNotif';
import ModalComplains from '../../content/modal/ModalComplain';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/HeaderWhite';
import IconDownload from '../../assets/svg/download-white.svg';
import IconPrint from '../../assets/svg/print.svg';
import SvgUri from 'react-native-svg-uri';

const RiwayatHistoryDetail = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [modalNotif, setModalNotif] = useState(false);
  const [modalComplain, setModalComplain] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [invoice, setInvoice] = useState(params.invoice);
  const [detail, setDetail] = useState({detail: {}});
  const [products, setProducts] = useState([]);
  const [imageDefault, setImageDefault] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [totalUnread, setTotalUnread] = useState('0');
  const [checkComplain, setCheckComplain] = useState('');
  let isMounted = true;

  const isLogged = async () => {
    let imgDef = await getSession('imageDefault').then((imageDefault) => {
      return imageDefault;
    });
    if (isMounted) {
      setImageDefault(imgDef);
      getComplainOrder();
    }

    let queryParam = `?`;
    queryParam += `invoice=${invoice}`;

    await useApiGrosirGet(apiGrosirHistoryDetail(queryParam), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setDetail(val.data);
            setProducts(val.data.products);
          } else {
            setDetail([]);
            setProducts([]);
            getErrorGlobal(res.values.errors);
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const titleChange = (value, index) => {
    setTitle(value);
  };

  const descriptionChange = (value, index) => {
    setDescription(value);
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
  };

  const copy = () => {
    let desc = `${detail.tracking_number}`;
    getSnackBar_success({
      title: `Nomor Resi disalin`,
      duration: 'LENGTH_LONG',
    });

    // Clipboard.setString(desc);
  };

  const getComplainOrder = async () => {
    let queryParam = `?`;
    queryParam += `invoice=${invoice}`;
    queryParam += `&page=1`;
    await useApiGrosirGet(apiGrosirGetComplain(queryParam), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setTotalUnread(val.data.unread ? val.data.unread : 0);
            setCheckComplain(val.data.title ? val.data.title : '');
          } else {
            setTotalUnread(0);
            setCheckComplain('');
            getErrorGlobal(res.values.errors);
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const ordersAccepted = async () => {
    setModalNotif(false);
    setTimeout(async () => {
      setIsLoading(true);
      await useApiGrosirPost(apiGrosirOrderAccepted(), {
        invoice: detail.invoice,
      })
        .then((res) => {
          setIsLoading(false);
          if (res.statusCode === 200) {
            isLogged();
            getSnackBar_success({
              title: `Pesanan sudah diterima`,
              duration: 'LENGTH_LONG',
            });
          } else {
            getErrorGlobal(res.values.errors);
          }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, 500);
  };

  const complain = async () => {
    if (title === '') {
      ToastAndroid.show(`Masukkan Judul`, ToastAndroid.SHORT);
    } else if (description === '') {
      ToastAndroid.show(`Masukkan Deskripsi`, ToastAndroid.SHORT);
    } else {
      setModalComplain(false);
      setTimeout(async () => {
        setIsLoading(true);
        await useApiGrosirPost(apiGrosirComplain(), {
          invoice: detail.invoice,
          title: title,
          description: description,
        })
          .then((res) => {
            setIsLoading(false);
            if (res.statusCode === 200) {
              getComplainOrder();
              setTitle('');
              setDescription('');
              getSnackBar_success({
                title: `Komplain telah dikirim`,
                duration: 'LENGTH_LONG',
              });
            } else {
              getErrorGlobal(res.values.errors);
            }
          })
          .catch((error) => {
            setIsLoading(false);
          });
      }, 500);
    }
  };

  const downloadPdf = async () => {
    setIsLoading(true);
    await useApiPost_demo(apiPdfHistoryGrosir(), {
      products: products,
      detail: detail,
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

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Detail Riwayat'}
        shadow={false}
        right={true}
        textBlack={false}
        textLeft={true}
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
        <View style={[styles.borderBottomBold]}>
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
              <Text style={[styles.fs12, styles.black, styles.fontWSB]}>
                Status Pemesanan
              </Text>
            </View>
            <View style={[styles.col60, styles.pl5, styles.centerContent]}>
              <View
                style={[
                  styles.row,
                  styles.right,
                  styles.rightText,
                  s.statusGlobal,
                  {backgroundColor: detail.color ? detail.color : '#ddd'},
                ]}>
                <Text
                  style={[
                    styles.fs11,
                    detail.text_color
                      ? {color: detail.text_color}
                      : styles.grey75,
                    styles.fontWSB,
                  ]}>
                  {detail.status}
                </Text>
                {detail.icon_url ? (
                  <SvgUri
                    width={15}
                    height={15}
                    source={{
                      uri: detail.icon_url,
                    }}
                  />
                ) : null}
              </View>
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
                Invoice
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
                {detail.invoice}
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
                Tgl Pesan
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
                {detail.date}
              </Text>
            </View>
          </View>
          {detail.tracking_number ? (
            <View
              style={[
                styles.row,
                styles.pl15,
                styles.pr15,
                styles.pb10,
                styles.pt10,
              ]}>
              <View style={[styles.col40, styles.pl5]}>
                <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                  Nomor Resi
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => copy()}
                style={[styles.col60, styles.pl5, styles.centerContent]}>
                <Text
                  style={[
                    styles.fs12,
                    styles.black,
                    styles.fontWSB,
                    styles.rightText,
                    styles.right,
                  ]}>
                  {detail.tracking_number}
                </Text>
                <Text style={[styles.green, styles.fs12, styles.right]}>
                  Salin
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        {products ? (
          <View style={[styles.borderBottomBold, styles.mt10, styles.pb10]}>
            <View style={[styles.pl20, styles.pr20, styles.pb10]}>
              <Text style={[styles.fs13, styles.black, styles.fontWSB]}>
                Informasi Produk
              </Text>
            </View>
            {products.map((item, key) => (
              <View style={[styles.row, styles.pt5, styles.pb10]} key={key}>
                <View style={[styles.col25, styles.center]}>
                  <Image
                    resizeMethod="resize"
                    source={{
                      uri: item.image_url ? item.image_url : imageDefault,
                    }}
                    style={{
                      width: '100%',
                      height: 60,
                      borderRadius: 10,
                    }}
                    resizeMode="contain"
                  />
                </View>
                <View style={[styles.col75, styles.centerContent]}>
                  <Text
                    style={[styles.black, styles.fs14, styles.fontWSB]}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {item.product_name}
                  </Text>

                  <View style={[styles.row, styles.pr15]}>
                    <View style={[styles.col40]}>
                      <Text
                        style={[styles.grey75, styles.fs12, styles.fontWSR]}>
                        {item.qty} Barang
                      </Text>
                    </View>
                    <View
                      style={[styles.col60, styles.pl5, styles.centerContent]}>
                      <Text
                        style={[
                          styles.fs12,
                          styles.green,
                          styles.fontWSB,
                          styles.rightText,
                          styles.right,
                        ]}>
                        {item.sub_total}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {detail.detail ? (
          <View style={[styles.borderBottomBold, styles.mt10, styles.pb10]}>
            <View style={[styles.pl20, styles.pr20, styles.pb10]}>
              <Text style={[styles.fs13, styles.black, styles.fontWSB]}>
                Informasi Pengiriman
              </Text>
            </View>

            <View style={[styles.row, styles.pl15, styles.pr15, styles.pt5]}>
              <View style={[styles.col40, styles.pl5, styles.centerContent]}>
                <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                  Penerima
                </Text>
              </View>
              <View style={[styles.col60, styles.centerContent]}>
                <Text
                  style={[
                    styles.fs12,
                    styles.black,
                    styles.fontWSR,
                    styles.right,
                  ]}>
                  {detail.detail.receiver_name}
                </Text>
              </View>
            </View>

            <View style={[styles.row, styles.pl15, styles.pr15, styles.pt5]}>
              <View style={[styles.col40, styles.pl5, styles.centerContent]}>
                <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                  No telepon
                </Text>
              </View>
              <View style={[styles.col60, styles.centerContent]}>
                <Text
                  style={[
                    styles.fs12,
                    styles.black,
                    styles.fontWSR,
                    styles.right,
                  ]}>
                  {detail.detail.receiver_phone}
                </Text>
              </View>
            </View>
            <View style={[styles.row, styles.pl15, styles.pr15, styles.pt5]}>
              <View style={[styles.col40, styles.pl5, styles.centerContent]}>
                <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                  Alamat penerima
                </Text>
              </View>
              <View style={[styles.col60, styles.centerContent]}>
                <Text
                  style={[
                    styles.fs12,
                    styles.black,
                    styles.fontWSR,
                    styles.right,
                  ]}>
                  {detail.detail.address}
                </Text>
              </View>
            </View>
          </View>
        ) : null}

        <View style={[styles.mt10]}>
          <View
            style={[
              styles.borderBottom,
              styles.pl20,
              styles.pr20,
              styles.pb10,
            ]}>
            <Text style={[styles.fs13, styles.black, styles.fontWSB]}>
              Informasi Pembayaran
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
                Metode Bayar
              </Text>
            </View>
            <View style={[styles.col60, styles.centerContent]}>
              <Text
                style={[
                  styles.fs12,
                  styles.green,
                  styles.fontWSR,
                  styles.right,
                ]}>
                {detail.payment_method}
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
                Ongkos Kirim
              </Text>
            </View>
            <View style={[styles.col60, styles.centerContent]}>
              <Text
                style={[
                  styles.fs12,
                  styles.black,
                  styles.fontWSR,
                  styles.right,
                ]}>
                {detail.shipping_price}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.row,
              styles.pl15,
              styles.pr15,
              styles.pb10,
              styles.pt10,
            ]}>
            <View style={[styles.col40, styles.pl5, styles.centerContent]}>
              <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                Total Bayar
              </Text>
            </View>
            <View style={[styles.col60, styles.centerContent]}>
              <Text
                style={[
                  styles.fs12,
                  styles.green,
                  styles.fontWSB,
                  styles.right,
                ]}>
                {detail.total}
              </Text>
            </View>
          </View>
        </View>

        {detail.button_complain ? (
          <Ripple
            onPress={() => {
              if (checkComplain) {
                navigation.push('RiwayatGrosirComplain', {
                  invoice: detail.invoice,
                });
              } else {
                setModalComplain(true);
              }
            }}
            style={[
              styles.btnBuyNowFormOrange,
              styles.ml20,
              styles.mr20,
              styles.mb10,
              styles.mt10,
            ]}>
            <Text
              style={[styles.fs13, styles.white, styles.fontWSM]}
              uppercase={false}>
              Komplain
            </Text>
            {parseInt(totalUnread) > 0 ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: '#ffffff',
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 10,
                }}>
                <Text
                  style={[styles.fs11, styles.orange, styles.fontWSB]}
                  uppercase={false}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {totalUnread}
                </Text>
              </View>
            ) : null}
          </Ripple>
        ) : null}

        <View style={[styles.mt10, styles.mb20]}>
          <View style={[styles.row, styles.ml20, styles.mr20, styles.mb10]}>
            {detail.button_tracking ? (
              <View
                style={
                  detail.button_download
                    ? [styles.col60, styles.pr10]
                    : [styles.col100]
                }>
                <Ripple
                  onPress={() => {
                    navigation.push('RiwayatGrosirLacak', {
                      histories: detail.histories,
                      invoice: detail.invoice,
                      tracking_number: detail.tracking_number,
                    });
                  }}
                  style={[s.btnOutline]}>
                  <Text
                    style={[styles.fs13, styles.green, styles.fontWSM]}
                    uppercase={false}>
                    Lacak Paket
                  </Text>
                </Ripple>
              </View>
            ) : null}

            {detail.button_download ? (
              <>
                <View
                  style={
                    detail.button_tracking
                      ? [styles.col20, styles.pl5]
                      : [styles.col50, styles.pr5]
                  }>
                  <Ripple
                    onPress={() => {
                      downloadPdf();
                    }}
                    style={[s.btnDownload]}
                    style={[s.btnDownload]}>
                    <SvgXml xml={IconDownload} />
                  </Ripple>
                </View>

                <View
                  style={
                    detail.button_tracking
                      ? [styles.col20, styles.pl5]
                      : [styles.col50, styles.pl5]
                  }>
                  <Ripple
                    onPress={() => {
                      navigation.push('CetakPreviewGrosir', {
                        item: detail,
                        printerName: '',
                      });
                    }}
                    style={[s.btnCetak]}>
                    <SvgXml xml={IconPrint} />
                  </Ripple>
                </View>
              </>
            ) : null}
          </View>

          {detail.button_accept ? (
            <Ripple
              onPress={() => {
                setModalNotif(true);
              }}
              style={[
                styles.btnBuyNowFormGreen,
                styles.ml20,
                styles.mr20,
                styles.mb10,
              ]}>
              <Text
                style={[styles.fs13, styles.white, styles.fontWSM]}
                uppercase={false}>
                Pesanan sudah di Terima
              </Text>
            </Ripple>
          ) : null}
        </View>
      </ScrollView>

      <ModalComplains
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalComplain}
        onSwipeComplete={() => setModalComplain(false)}
        value={title}
        onChangeText={titleChange}
        value2={description}
        onChangeText2={descriptionChange}
        title={'Komplain'}
        titleClose={'Batal'}
        titleButton={'Kirim'}
        onPressClose={() => {
          setModalComplain(false);
        }}
        onPress={() => {
          complain();
        }}
      />

      <ModalNotifs
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalNotif}
        onSwipeComplete={() => setModalNotif(false)}
        title={'Notifikasi'}
        message={'Apa Pesanan Sudah diterima ?'}
        titleClose={'Tidak'}
        titleButton={'Ya'}
        onPressClose={() => {
          setModalNotif(false);
        }}
        onPress={() => {
          ordersAccepted();
        }}
      />
    </SafeAreaView>
  );
};

export default RiwayatHistoryDetail;

const s = StyleSheet.create({
  statusGlobal: {
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
  },
  btnOutline: {
    borderColor: '#00A79D',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOutlineEmpty: {
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#dddddd',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDownload: {
    backgroundColor: '#BE3F45',
    borderRadius: 5,
    padding: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCetak: {
    backgroundColor: '#84B749',
    borderRadius: 5,
    padding: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDownloadEmpty: {
    backgroundColor: '#dddddd',
    borderRadius: 5,
    padding: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCetakEmpty: {
    backgroundColor: '#dddddd',
    borderRadius: 5,
    padding: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
