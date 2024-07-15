import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  RefreshControl,
  TouchableNativeFeedback,
  InteractionManager,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {captureScreen} from 'react-native-view-shot';
import {SvgXml} from 'react-native-svg';
import {
  apiCashierViewSetHarga,
  apiCashierViewSetAdmin,
  apiCashierAddSetHarga,
  apiCashierEditHarga,
  apiCashierAddSetAdmin,
  apiPdfTransaksi,
} from '../../helpers/endPoint';
import {useApiPost} from '../../helpers/useFetch';
import {
  getSnackBar_error,
  getSession,
  getSnackBar_success,
  getRupiah,
} from '../../helpers/Helpers';
import Share from 'react-native-share';
import Modal from 'react-native-modal';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/HeaderRight';
import ModalPrice from '../../content/modal/ModalPrice';
import ModalKet from '../../content/modal/ModalKet';
import IconPdf from '../../assets/svg/pdf.svg';
import IconShare from '../../assets/svg/share-white.svg';
import IconPrint from '../../assets/svg/print.svg';
import TextPrint from '../../content/print/TextPrint';
import TextPrintBold from '../../content/print/TextPrintBold';
import TextPrintBoldCenter from '../../content/print/TextPrintBoldCenter';
import TextBoldCenterBig from '../../content/print/TextBoldCenterBig';
import TextPrintCenter from '../../content/print/TextPrintCenter';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const CetakPreview = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalPrice, setModalPrice] = useState(false);
  const [modalAdmin, setModalAdmin] = useState(false);
  const [modalKet, setModalKet] = useState(false);
  const [modalCapture, setModalCapture] = useState(false);
  const [idUser, setIdUser] = useState('');
  const [namaLoket, setNamaLoket] = useState('');
  const [alamatLoket, setAlamatLoket] = useState('');
  const [footLoket, setfootLoket] = useState('');
  const [qrCode, setQrCode] = useState('false');
  const [hideButton, setHideButton] = useState(true);
  const [imageUri, setImageUri] = useState('');
  const [isDefault, setIsDefault] = useState(params.isDefault);
  const [isToken, setIsToken] = useState(params.isToken);
  const [serialNumber, setSerialNumber] = useState(params.serialNumber);
  const [messageKeterangan, setMessageKeterangan] = useState(
    params.serialNumber,
  );
  const [messageKeteranganEdit, setMessageKeteranganEdit] = useState(
    params.serialNumber,
  );
  const [phone, setPhone] = useState(params.phone);
  const [printerName, setprinterName] = useState(params.printerName);
  const [item, setItem] = useState(params.item);
  const [totalFix, setTotalFix] = useState('0');
  const [adminFix, setAdminFix] = useState('0');
  const [hargaFix, setHargaFix] = useState('0');
  const [priceSale, setPriceSale] = useState('0');
  const [priceSaleData, setPriceSaleData] = useState('0');
  const [adminFee, setAdminFee] = useState('0');
  const [adminFeeData, setAdminFeeData] = useState('0');
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
    }
  };

  const loadSetHarga = async () => {
    let idUser_ = await getSession('idUser').then((idUser) => {
      return idUser;
    });
    setIdUser(idUser_);
    await useApiPost(apiCashierViewSetHarga(), {
      resellerId: idUser_,
      page: 1,
      productCode: item.productCode,
    })
      .then((res) => {
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values;
            if (parseInt(val.totalData) > 0) {
              let hargajual = val.data;
              setPriceSale(getRupiah(hargajual[0].harga_jual));
              setPriceSaleData(
                getRupiah(
                  hargajual[0].harga_jual ? hargajual[0].harga_jual : 0,
                ),
              );
              setHargaFix(getRupiah(hargajual[0].harga_jual));
              viewSetAdmin(idUser_, hargajual[0].harga_jual);
            } else {
              setHargaFix(
                getRupiah(item.productPrice ? item.productPrice : item.price),
              );
              viewSetAdmin(
                idUser_,
                item.productPrice ? item.productPrice : item.price,
              );
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
        setIsLoading(false);
      });
  };

  const viewSetAdmin = async (idUser_, hargaProduk) => {
    setIsLoading(true);
    await useApiPost(apiCashierViewSetAdmin(), {
      resellerId: idUser_,
      page: 1,
      productCode: item.productCode,
    })
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            if (parseInt(val.totalData) > 0) {
              let hargaadmin = val.data;
              setAdminFix(getRupiah(hargaadmin[0].biaya_admin));
              setAdminFee(getRupiah(hargaadmin[0].biaya_admin));
              setAdminFeeData(
                getRupiah(
                  hargaadmin[0].biaya_admin ? hargaadmin[0].biaya_admin : 0,
                ),
              );
              setTotalFix(
                getRupiah(
                  parseInt(hargaProduk) + parseInt(hargaadmin[0].biaya_admin),
                ),
              );
            } else {
              setAdminFix(getRupiah(item.adminFee ? item.adminFee : 0));
              setAdminFee(getRupiah(item.adminFee ? item.adminFee : 0));
              setAdminFeeData(item.adminFee ? item.adminFee : 0);
              setTotalFix(
                getRupiah(
                  parseInt(hargaProduk) +
                    parseInt(item.adminFee ? item.adminFee : 0),
                ),
              );
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
        setIsLoading(false);
      });
  };

  const reloadKet = () => {
    setMessageKeterangan(serialNumber);
    setMessageKeteranganEdit(serialNumber);
  };

  const aturKet = () => {
    if (messageKeteranganEdit === '') {
      getSnackBar_error({
        title: 'Masukkan Keterangan',
        duration: 'LENGTH_INDEFINITE',
      });
      setMessageKeteranganEdit(messageKeterangan);
    } else {
      setModalKet(false);
      setMessageKeterangan(messageKeteranganEdit);
    }
  };

  const deleteKeterangan = () => {
    Alert.alert('Notifikasi!', 'Anda yakin akan menghapus keterangan?', [
      {
        text: 'Batal',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Ya',
        onPress: () => {
          setMessageKeterangan('');
        },
      },
    ]);
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
    await useApiPost(apiPdfTransaksi(), {
      isDefault: isDefault,
      isToken: isToken,
      messageKeterangan: messageKeterangan,
      serialNumber: serialNumber,
      headerLocket: namaLoket,
      addressLocket: alamatLoket,
      footerLocket: footLoket,
      transactionDate: moment(item.transactionDate).format(
        'DD/MM/YYYY HH:mm:ss',
      ),
      phone: phone,
      product: item.productName,
      description: item.description,
      price: hargaFix,
      admin: adminFix,
      total: totalFix,
    })
      .then((res) => {
        if (isMounted) {
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
        [10, 2, 20],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
        ],
        [
          'Waktu',
          ':',
          moment(item.transactionDate).format('DD/MM/YYYY HH:mm:ss'),
        ],
        {},
      );
      if (!isToken) {
        if (!isDefault) {
          await BluetoothEscposPrinter.printColumn(
            [10, 2, 20],
            [
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.LEFT,
            ],
            ['SN', ':', serialNumber.toString()],
            {},
          );
        }
      }
      await BluetoothEscposPrinter.printColumn(
        [10, 2, 20],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
        ],
        ['Tujuan', ':', phone.toString()],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [10, 2, 20],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
        ],
        ['Produk', ':', item.productName.toString()],
        {},
      );

      if (item.description) {
        let arr_loop = item.description;
        if (Object.keys(arr_loop).length > 0) {
          var flightForm = [];
          for (var key in arr_loop) {
            if (arr_loop[key] !== '') {
              var json = {
                name: key
                  .replace(/_/g, ' ')
                  .replace(/\b[a-z]/g, function (letter) {
                    return letter.toUpperCase();
                  }),
                value: arr_loop[key],
              };
              flightForm.push(json);
            }
          }

          let arr = flightForm;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].value.toString() !== '') {
              if (arr[i].name.toString() !== 'IsToken') {
                if (
                  arr[i].name.toString() !== 'Default' &&
                  arr[i].name.toString() !== 'Sn'
                ) {
                  await BluetoothEscposPrinter.printColumn(
                    [10, 2, 20],
                    [
                      BluetoothEscposPrinter.ALIGN.LEFT,
                      BluetoothEscposPrinter.ALIGN.LEFT,
                      BluetoothEscposPrinter.ALIGN.LEFT,
                    ],
                    [arr[i].name.toString(), ':', arr[i].value.toString()],
                    {},
                  );
                }
              }
            }
          }
        }
      }

      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [10, 2, 20],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
        ],
        ['Harga', ':', 'Rp  ' + hargaFix ? hargaFix.toString() : 0],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [10, 2, 20],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
        ],
        ['Admin', ':', 'Rp  ' + adminFix ? adminFix.toString() : 0],
        {},
      );
      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );
      await BluetoothEscposPrinter.setBlob(0);
      await BluetoothEscposPrinter.printColumn(
        [10, 2, 20],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
        ],
        ['Total', ':', 'Rp  ' + totalFix ? totalFix.toString() : 0],
        {},
      );

      if (isDefault) {
        if (messageKeterangan) {
          await BluetoothEscposPrinter.printText('\r\n', {});
          await BluetoothEscposPrinter.printerAlign(
            BluetoothEscposPrinter.ALIGN.CENTER,
          );
          await BluetoothEscposPrinter.setBlob(0);
          await BluetoothEscposPrinter.printText('KETERANGAN\r\n', {});
          await BluetoothEscposPrinter.setBlob(0);
          await BluetoothEscposPrinter.printText(
            messageKeterangan ? messageKeterangan.toString() : '' + '\r\n',
            {
              encoding: 'GBK',
              codepage: 0,
              widthtimes: 0,
              heigthtimes: 0,
              fonttype: 8,
            },
          );
          await BluetoothEscposPrinter.setBlob(0);
          await BluetoothEscposPrinter.printerAlign(
            BluetoothEscposPrinter.ALIGN.CENTER,
          );
          await BluetoothEscposPrinter.printText('\r\n', {});
        }
      }

      if (isToken) {
        await BluetoothEscposPrinter.printText('\r\n', {});
        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.CENTER,
        );
        await BluetoothEscposPrinter.printText('-- TOKEN --\r\n', {});
        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.CENTER,
        );
        await BluetoothEscposPrinter.printText(
          serialNumber ? serialNumber.toString() : '' + '\r\n',
          {
            encoding: 'GBK',
            codepage: 0,
            widthtimes: 1,
            heigthtimes: 1.5,
            fonttype: 1,
          },
        );
        await BluetoothEscposPrinter.printText('\r\n', {});
      }
      await BluetoothEscposPrinter.printText('\r\n', {});
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      );
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

  const renderReservationForm = (item) => {
    if (item !== '') {
      var flightForm = [];
      for (var key in item) {
        if (item[key] !== '') {
          var json = {
            name: key.replace(/_/g, ' ').replace(/\b[a-z]/g, function (letter) {
              return letter.toUpperCase();
            }),
            value: item[key],
          };
          flightForm.push(json);
        }
      }

      return flightForm.map((data) => {
        return (
          <View key={data.name}>
            {data.value !== '-' || data.value !== '' ? (
              <>
                {data.name === 'IsToken' ? null : (
                  <>
                    {data.name !== 'Default' && data.name !== 'Sn' ? (
                      <View style={[styles.row]}>
                        <View style={styles.col25}>
                          <TextPrint>{data.name}</TextPrint>
                        </View>
                        <View style={styles.col75}>
                          <TextPrint>:&nbsp;{data.value}</TextPrint>
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

  const _onRefresh = () => {
    setIsLoading(true);
    loket();
    enableQrCode();
    loadSetHarga();
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

  const aturHargaToko = async () => {
    let valu = priceSaleData.replace(/[^0-9]/g, '');
    if (
      parseInt(valu) >=
      parseInt(item.productPrice ? item.productPrice : item.price)
    ) {
      setModalPrice(false);
      setIsLoading(true);
      setTimeout(async () => {
        await useApiPost(apiCashierAddSetHarga(), {
          resellerId: idUser,
          productCode: item.productCode,
          sellingPrice: valu,
        })
          .then((res) => {
            if (res.statusCode === 200) {
              updateHargaJual();
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
      }, 500);
    } else {
      getSnackBar_error({
        title: 'Harga Toko Kurang dari Harga Produk',
        duration: 'LENGTH_INDEFINITE',
      });
    }
  };

  const updateHargaJual = async () => {
    setIsLoading(true);
    let valu = priceSaleData.replace(/[^0-9]/g, '');
    await useApiPost(apiCashierEditHarga(), {
      resellerId: idUser,
      productCode: item.productCode,
      sellingPrice: valu,
    })
      .then((res) => {
        setIsLoading(false);
        if (res.statusCode === 200) {
          getSnackBar_success({
            title: res.values.message,
            duration: 'LENGTH_INDEFINITE',
          });
          loadSetHarga();
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

  const aturHargaAdmin = async () => {
    let valu = adminFeeData.replace(/[^0-9]/g, '');
    if (parseInt(valu) >= 0) {
      setModalAdmin(false);
      setTimeout(async () => {
        setIsLoading(true);
        await useApiPost(apiCashierAddSetAdmin(), {
          resellerId: idUser,
          productCode: item.productCode,
          adminFee: valu,
        })
          .then((res) => {
            if (res.statusCode === 200) {
              getSnackBar_success({
                title: res.values.message,
                duration: 'LENGTH_INDEFINITE',
              });
              loadSetHarga();
            } else {
              getSnackBar_error({
                title: res.values.message,
                duration: 'LENGTH_INDEFINITE',
              });
              setIsLoading(false);
            }
          })
          .catch((error) => {
            setIsLoading(false);
          });
      }, 500);
    } else {
      getSnackBar_error({
        title: 'Masukkan Biaya Admin',
        duration: 'LENGTH_INDEFINITE',
      });
    }
  };

  const hargaChange = (value, index) => {
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setPriceSaleData(getRupiah(valu));
    } else {
      setPriceSaleData('');
    }
  };

  const adminChange = (value, index) => {
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setAdminFeeData(getRupiah(valu));
    } else {
      setAdminFeeData('');
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
      loadSetHarga();
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
              <TextPrint>
                :&nbsp;
                {moment(item.transactionDate).format('DD/MM/YYYY HH:mm:ss')}
              </TextPrint>
            </View>
          </View>
          {!isToken ? (
            <>
              {!isDefault ? (
                <View style={[styles.row]}>
                  <View style={styles.col25}>
                    <TextPrint>SN</TextPrint>
                  </View>
                  <View style={styles.col75}>
                    <TextPrint>:&nbsp;{serialNumber}</TextPrint>
                  </View>
                </View>
              ) : null}
            </>
          ) : null}
          <View style={[styles.row]}>
            <View style={styles.col25}>
              <TextPrint>Tujuan</TextPrint>
            </View>
            <View style={styles.col75}>
              <TextPrint>:&nbsp;{phone}</TextPrint>
            </View>
          </View>
          <View style={[styles.row]}>
            <View style={styles.col25}>
              <TextPrint>Produk</TextPrint>
            </View>
            <View style={styles.col75}>
              <TextPrint>:&nbsp;{item.productName}</TextPrint>
            </View>
          </View>
          {item.description ? (
            <>
              {Object.keys(item.description).length > 0 ? (
                <>{renderReservationForm(item.description)}</>
              ) : null}
            </>
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
          <View style={[styles.row, styles.mb5]}>
            <View style={[styles.col25, styles.centerContent]}>
              <TextPrint>Harga</TextPrint>
            </View>
            <View style={[styles.col60, styles.centerContent]}>
              <TextPrint>:&nbsp;Rp  {hargaFix}</TextPrint>
            </View>
            {hideButton ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setModalPrice(true)}
                style={[styles.col15, styles.boxPriceSale]}>
                <Text style={[styles.greyB7, styles.fs9, styles.tebal]}>
                  ATUR
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={[styles.row, styles.mt5]}>
            <View style={styles.col25}>
              <TextPrint>Admin</TextPrint>
            </View>
            <View style={[styles.col60]}>
              <TextPrint>:&nbsp;Rp  {adminFix}</TextPrint>
            </View>
            {hideButton ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setModalAdmin(true)}
                style={[styles.col15, styles.boxPriceSale]}>
                <Text style={[styles.greyB7, styles.fs9, styles.tebal]}>
                  ATUR
                </Text>
              </TouchableOpacity>
            ) : null}
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
          <View style={[styles.row]}>
            <View style={styles.col25}>
              <TextPrintBold>Total</TextPrintBold>
            </View>
            <View style={styles.col75}>
              <TextPrintBold>:&nbsp;Rp  {totalFix}</TextPrintBold>
            </View>
          </View>
          {isDefault ? (
            <>
              {messageKeterangan ? (
                <View style={[styles.mb10, styles.mt10]}>
                  <TextPrintCenter style={[styles.textCenter]}>
                    KETERANGAN
                  </TextPrintCenter>
                  <TextBoldCenterBig>{messageKeterangan}</TextBoldCenterBig>
                </View>
              ) : null}
            </>
          ) : null}
          {isToken ? (
            <View style={[styles.mt5, styles.mb5]}>
              <TextBoldCenterBig style={[styles.textCenter]}>
                -- TOKEN --
              </TextBoldCenterBig>
              <TextBoldCenterBig>{serialNumber}</TextBoldCenterBig>
            </View>
          ) : null}
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
            {isDefault ? (
              <>
                {messageKeterangan ? (
                  <View
                    style={[styles.row, styles.pl20, styles.pr20, styles.mb10]}>
                    <View style={[styles.col50, styles.pr5]}>
                      <TouchableOpacity
                        style={[styles.row, styles.btnKet, styles.center]}
                        onPress={() => {
                          !isLoading ? setModalKet(true) : null;
                        }}>
                        <Text style={[styles.greyB7, styles.fs12]}>
                          Atur Keterangan
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.col50, styles.pl5]}>
                      <TouchableOpacity
                        style={[styles.row, styles.btnKet, styles.center]}
                        onPress={() => {
                          !isLoading ? deleteKeterangan() : null;
                        }}>
                        <Text style={[styles.greyB7, styles.fs12]}>
                          Hapus Keterangan
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View
                    style={[styles.row, styles.pl20, styles.pr20, styles.mb10]}>
                    <TouchableOpacity
                      style={[styles.row, styles.btnKet, styles.center]}
                      onPress={() => {
                        !isLoading ? setModalKet(true) : null;
                      }}>
                      <Text style={[styles.greyB7, styles.fs12]}>
                        Atur Keterangan
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            ) : null}

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

      <ModalPrice
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalPrice}
        onSwipeComplete={() => setModalPrice(false)}
        ket="Masukkan Nominal"
        placeholder="Contoh : 100.000"
        value={priceSaleData}
        onChangeText={hargaChange}
        title={'Atur Harga Jual'}
        titleClose={'Batal'}
        titleButton={'Atur'}
        onPressClose={() => {
          setModalPrice(false);
        }}
        onPress={() => {
          aturHargaToko();
        }}
      />

      <ModalPrice
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalAdmin}
        onSwipeComplete={() => setModalAdmin(false)}
        ket="Masukkan Nominal"
        placeholder="Contoh : 1.000"
        value={adminFeeData}
        onChangeText={adminChange}
        title={'Atur Biaya Admin'}
        titleClose={'Batal'}
        titleButton={'Atur'}
        onPressClose={() => {
          setModalAdmin(false);
        }}
        onPress={() => {
          aturHargaAdmin();
        }}
      />

      <ModalKet
        refresh={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalKet}
        onSwipeComplete={() => setModalKet(false)}
        placeholder="Masukkan Keterangan"
        value={messageKeteranganEdit}
        onChangeText={(messageKeteranganEdit) =>
          setMessageKeteranganEdit(messageKeteranganEdit)
        }
        title={'Atur Keterangan'}
        titleClose={'Batal'}
        titleButton={'Simpan'}
        onPressClose={() => {
          setModalKet(false);
        }}
        onRefresh={() => {
          reloadKet();
        }}
        onPress={() => {
          aturKet();
        }}
      />
    </SafeAreaView>
  );
};

export default CetakPreview;
