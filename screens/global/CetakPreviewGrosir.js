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
  TouchableNativeFeedback,
  InteractionManager,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {captureScreen} from 'react-native-view-shot';
import {SvgXml} from 'react-native-svg';
import {apiPdfStrukGrosir} from '../../helpers/endPoint';
import {useApiPost, useApiPost_demo} from '../../helpers/useFetch';
import {getSnackBar_error, getSession} from '../../helpers/Helpers';
import Share from 'react-native-share';
import Modal from 'react-native-modal';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/HeaderRight';
import IconPdf from '../../assets/svg/pdf.svg';
import IconShare from '../../assets/svg/share-white.svg';
import IconPrint from '../../assets/svg/print.svg';
import TextPrint from '../../content/print/TextPrint';
import TextPrintBoldLeft from '../../content/print/TextPrintBoldLeft';
import TextPrintBoldCenter from '../../content/print/TextPrintBoldCenter';
import TextPrintBoldRight from '../../content/print/TextPrintBoldRight';
import TextPrintCenter from '../../content/print/TextPrintCenter';
import TextPrintRight from '../../content/print/TextPrintRight';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const CetakPreviewGrosir = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalCapture, setModalCapture] = useState(false);
  const [namaLoket, setNamaLoket] = useState('');
  const [alamatLoket, setAlamatLoket] = useState('');
  const [footLoket, setfootLoket] = useState('');
  const [qrCode, setQrCode] = useState('false');
  const [hideButton, setHideButton] = useState(true);
  const [imageUri, setImageUri] = useState('');
  const [printerName, setprinterName] = useState(params.printerName);
  const [item, setItem] = useState(params.item);
  let isMounted = true;

  const enableQrCode = async () => {
    let qrCode_ = await getSession('qrCode').then((qrCode) => {
      return qrCode;
    });
    if (isMounted) {
      setQrCode(qrCode_);
    }
  };

  const loket = async () => {
    let namaLoket = await getSession('namaLoket').then((namaLoket) => {
      return namaLoket;
    });

    let alamatLoket = await getSession('alamatLoket').then((alamatLoket) => {
      return alamatLoket;
    });

    let footLoket = await getSession('footLoket').then((footLoket) => {
      return footLoket;
    });

    if (isMounted) {
      setNamaLoket(namaLoket);
      setAlamatLoket(alamatLoket);
      setfootLoket(footLoket);
      setIsLoading(false);
    }
  };

  const takeScreenShot = () => {
    setHideButton(false);
    capture();
  };

  const capture = () => {
    if (hideButton) {
      setTimeout(() => {
        captureScreen({
          //either png or jpg or webm (Android). Defaults to png
          format: 'jpg',
          //quality 0.0 - 1.0 (default). (only available on lossy formats like jpg)
          quality: 0.8,
        }).then(
          //callback function to get the result URL of the screnshot
          (uri) => {
            setImageUri(uri);
            setHideButton(true);
            setModalCapture(true);
          },
          (error) => console.log('Oops, Something Went Wrong', error),
        );
      }, 200);
    }
  };

  const shareImage = async () => {
    Share.open({
      url: imageUri,
      type: 'image/png',
      failOnCancel: false,
    }).catch((err) => console.log(err));
  };

  const downloadPdf = async () => {
    setIsLoading(true);
    await useApiPost_demo(apiPdfStrukGrosir(), {
      headerLocket: namaLoket,
      addressLocket: alamatLoket,
      footerLocket: footLoket,
      products: item.products,
      date: item.date,
      invoice: item.invoice,
      shippingPrice: item.shipping_price,
      total: item.total,
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

  const printStruk = async () => {
    try {
      await BluetoothEscposPrinter.printerInit();
      await BluetoothEscposPrinter.printerLeftSpace(0);

      await BluetoothEscposPrinter.printText('\r\n', {});
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      );
      await BluetoothEscposPrinter.setBlob(1);
      await BluetoothEscposPrinter.printText(namaLoket.toString() + '\r\n', {});
      await BluetoothEscposPrinter.setBlob(0);
      await BluetoothEscposPrinter.printText(
        alamatLoket.toString() + '\r\n',
        {},
      );
      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [12, 20],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Waktu', item.date],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [12, 20],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Invoice', item.invoice ? item.invoice.toString() : ''],
        {},
      );
      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );
      if (item.products) {
        let arr = item.products;
        for (var i = 0; i < arr.length; i++) {
          await BluetoothEscposPrinter.printColumn(
            [2, 17, 13],
            [
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.RIGHT,
            ],
            [
              arr[i].qty.toString(),
              arr[i].product_name.toString(),
              arr[i].sub_total,
            ],
            {},
          );
        }
      }

      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [14, 18],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Ongkos Kirim', item.shipping_price],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [14, 18],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Total', item.total],
        {},
      );
      await BluetoothEscposPrinter.printText('\r\n', {});
      await BluetoothEscposPrinter.printText(footLoket.toString() + '\r\n', {});
      if (qrCode === 'true') {
        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.CENTER,
        );
        await BluetoothEscposPrinter.printQRCode(
          item.transactionId ? item.transactionId.toString() : '',
          250,
          BluetoothEscposPrinter.ERROR_CORRECTION.L,
        ); //.then(()=>{alert('done')},(err)=>{alert(err)});
        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.CENTER,
        );
      }
      await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
    } catch (e) {
      let psn = '';
      if (e.message === 'COMMAND_NOT_SEND') {
        psn = 'Printer Tidak Terhubung';
      } else {
        psn = e.message;
      }
      getSnackBar_error({
        title: psn,
        duration: 'LENGTH_INDEFINITE',
      });
    }
  };

  const renderReservationForm = (arr) => {
    if (arr.length > 0) {
      return arr.map((datas, key) => {
        return (
          <View style={[styles.row]} key={key}>
            <View style={styles.col10}>
              <TextPrint>{datas.qty}</TextPrint>
            </View>
            <View style={styles.col60}>
              <TextPrint>{datas.product_name}</TextPrint>
            </View>
            <View style={styles.col30}>
              <TextPrintRight>{datas.sub_total}</TextPrintRight>
            </View>
          </View>
        );
      });
    } else {
      return <></>;
    }
  };

  const _onRefresh = () => {
    setIsLoading(true);
    loket();
    enableQrCode();
  };

  const connectBluetooth = async () => {
    let printerID = await getSession('printerID').then((printerID) => {
      return printerID;
    });

    let printerID_done = '';
    if (printerID) {
      printerID_done = printerID;
    } else {
      printerID_done = '';
    }

    if (printerID_done) {
      BluetoothManager.connect(printerID_done) // the device address scanned.
        .then((s) => {
          //log
        })
        .catch((error) => {
          //log
        });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // refresh back screen
      loket();
      enableQrCode();
      // end refresh back screen
    });
    const backAction = () => {
      navigation.goBack(null);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    InteractionManager.runAfterInteractions(() => {
      connectBluetooth();
      loket();
    });

    return () => {
      backHandler.remove();
      unsubscribe();
      isMounted = false;
    };
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      {hideButton ? (
        <Header
          onBack={() => navigation.goBack(null)}
          title={'Preview Struk'}
          shadow={true}
          right={
            <TouchableNativeFeedback
              onPress={() => navigation.navigate('Printer')}>
              <View
                style={[
                  styles.mr5,
                  styles.boxPriceSale,
                  {width: '55%', alignSelf: 'flex-end'},
                ]}>
                <Text style={[styles.black, styles.fs10, styles.fontWSR]}>
                  Atur Printer
                </Text>
              </View>
            </TouchableNativeFeedback>
          }
        />
      ) : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }>
        {hideButton ? (
          <Text style={[styles.titlePrinter, styles.pl20]}>
            Terhubung ke Printer :{' '}
            <Text style={[styles.green, styles.fs12]}>
              {!printerName ? 'Tidak Ada Perangkat' : printerName}
            </Text>
          </Text>
        ) : null}
        <View style={[styles.boxStruk, styles.mt20, styles.mb20]}>
          <TextPrintBoldCenter>{namaLoket}</TextPrintBoldCenter>
          <TextPrintCenter style={[styles.textCenter]}>
            {alamatLoket}
          </TextPrintCenter>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.fs11,
              styles.grey92,
              styles.fontWSB,
              styles.textCenter,
              styles.mb5,
            ]}>
            ...............................................................................................................
          </Text>
          <View style={[styles.row]}>
            <View style={styles.col25}>
              <TextPrint>Waktu</TextPrint>
            </View>
            <View style={styles.col75}>
              <TextPrintRight>{item.date}</TextPrintRight>
            </View>
          </View>
          <View style={[styles.row]}>
            <View style={styles.col25}>
              <TextPrint>Invoice</TextPrint>
            </View>
            <View style={styles.col75}>
              <TextPrintRight>{item.invoice}</TextPrintRight>
            </View>
          </View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.fs11,
              styles.grey92,
              styles.fontWSB,
              styles.textCenter,
              styles.mb5,
            ]}>
            ...............................................................................................................
          </Text>
          {item.products.length > 0 ? (
            <>{renderReservationForm(item.products)}</>
          ) : null}
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.fs11,
              styles.grey92,
              styles.fontWSB,
              styles.textCenter,
              styles.mb5,
            ]}>
            ...............................................................................................................
          </Text>
          <View style={[styles.row]}>
            <View style={styles.col30}>
              <TextPrint>Ongkos Kirim</TextPrint>
            </View>
            <View style={[styles.col70]}>
              <TextPrintRight>{item.shipping_price}</TextPrintRight>
            </View>
          </View>
          <View style={[styles.row, styles.mb5]}>
            <View style={styles.col30}>
              <TextPrintBoldLeft>Total</TextPrintBoldLeft>
            </View>
            <View style={styles.col70}>
              <TextPrintBoldRight>{item.total}</TextPrintBoldRight>
            </View>
          </View>
          <TextPrintCenter>{footLoket}</TextPrintCenter>
          {hideButton ? (
            <TouchableOpacity
              style={[styles.rightText, styles.mt20]}
              onPress={() => navigation.navigate('LoketChange')}>
              <Text style={[styles.green, styles.fs15]}>
                Edit Header / Footer
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {hideButton ? (
          <>
            <View style={[styles.row, styles.pl20, styles.pr20, styles.mt10]}>
              <View style={[styles.col70, styles.pr10]}>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple('#DDD')}
                  onPress={() => {
                    !isLoading ? printStruk() : null;
                  }}>
                  <View style={[styles.btnPrimary, styles.row]}>
                    <SvgXml width={23} height={23} xml={IconPrint} />
                    <Text style={[styles.fs14, styles.fontWSM, styles.white]}>
                      {' '}
                      Cetak
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View style={[styles.col15, styles.pr5]}>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple('#DDD')}
                  onPress={() => {
                    !isLoading ? downloadPdf() : null;
                  }}>
                  <View
                    style={[
                      styles.btnPrimary,
                      {backgroundColor: '#BE3F45'},
                      styles.pt15,
                    ]}>
                    <SvgXml width={20} height={20} xml={IconPdf} />
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View style={[styles.col15, styles.pl5]}>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple('#DDD')}
                  onPress={() => {
                    !isLoading ? takeScreenShot() : null;
                  }}>
                  <View
                    style={[
                      styles.btnPrimary,
                      {backgroundColor: '#84B749'},
                      styles.pt15,
                    ]}>
                    <SvgXml width={20} height={20} xml={IconShare} />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </>
        ) : null}
      </ScrollView>

      <Modal
        transparent={true}
        isVisible={modalCapture}
        onSwipeComplete={() => setModalCapture(false)}
        onBackdropPress={() => setModalCapture(false)}
        onBackButtonPress={() => setModalCapture(false)}
        //swipeDirection={['down', 'up', 'left', 'right']}
        swipeDirection={['down']}>
        <View style={styles.modalBodySuccess}>
          <View
            style={{
              width: 60,
              height: 8,
              borderRadius: 5,
              backgroundColor: '#E3E3E3',
              position: 'absolute',
              top: '2%',
              left: '42%',
              zIndex: 1,
            }}
          />
          <View style={styles.boxSuccess}>
            {imageUri ? (
              <Image
                resizeMethod="resize"
                source={{uri: imageUri}}
                style={{
                  width: 200,
                  height: 300,
                  resizeMode: 'contain',
                  marginTop: 5,
                }}
              />
            ) : null}
          </View>
          <View style={[styles.boxSuccess]}>
            <TouchableOpacity
              style={[styles.center, styles.btnBuyNowForm, styles.mt20]}
              onPress={() => {
                shareImage();
              }}>
              <Text style={[styles.white, styles.fs12, styles.fontWSB]}>
                Bagikan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CetakPreviewGrosir;
