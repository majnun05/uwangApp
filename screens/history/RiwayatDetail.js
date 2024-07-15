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

const RiwayatDetail = (props) => {
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
      await useApiPost(apiHistoryTransactionDetail(), {
        transactionId: params.idTrx ? params.idTrx : idTrx,
      })
        .then((res) => {
          if (isMounted) {
            if (res.statusCode === 200) {
              let val = res.values;
              setDetail(val.data);
              setDescription(val.data.description);
              viewSetHarga(idUser_, val.data);
              getPajakInfo(val.data.productCode);
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

  const viewSetHarga = async (idUser_, detailParams) => {
    await useApiPost(apiCashierViewSetHarga(), {
      resellerId: idUser_,
      page: 1,
      productCode: detailParams.productCode,
    })
      .then((res) => {
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values;
            if (parseInt(val.total) > 0) {
              let hargajual = val.data;
              setPriceSale(getRupiah(hargajual[0].harga_jual));
              setPriceSaleData(
                getRupiah(
                  hargajual[0].harga_jual ? hargajual[0].harga_jual : 0,
                ),
              );
              viewSetAdmin(hargajual[0].harga_jual, idUser_, detailParams);
            } else {
              setPriceSale(0);
              setPriceSaleData(0);
              viewSetAdmin(0, idUser_, detailParams);
            }
          } else {
            viewSetAdmin(0, idUser_, detailParams);
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

  const viewSetAdmin = async (harga_jual, idUser_, detailParams) => {
    setIsLoading(true);
    await useApiPost(apiCashierViewSetAdmin(), {
      resellerId: idUser_,
      page: 1,
      productCode: detailParams.productCode,
    })
      .then((res) => {
        // console.log({res})
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values.data;
            if (parseInt(val.length) > 0) {
              setAdminFee(getRupiah(val[0].biaya_admin));
              setAdminFeeData(
                getRupiah(val[0].biaya_admin ? val[0].biaya_admin : 0),
              );

              let totFix = 0;
              if (parseInt(harga_jual) > 0) {
                totFix = parseInt(
                  parseInt(val[0].biaya_admin) + parseInt(harga_jual),
                );
              } else {
                totFix = parseInt(
                  parseInt(detailParams.productPrice) +
                    parseInt(val[0].biaya_admin),
                );
              }
              setTotalPembayaran(totFix);
            } else {
              setAdminFee(0);
              setAdminFeeData(0);
              let totFix2 = 0;
              if (parseInt(harga_jual) > 0) {
                totFix2 = parseInt(parseInt(harga_jual));
              } else {
                totFix2 = parseInt(parseInt(detailParams.productPrice));
              }
              setTotalPembayaran(totFix2);
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

  const getPajakInfo = async (productCode) => {
    await useApiPost(apiTransactionAdditional(), {
      productCode: productCode,
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

  const aturHargaToko = async () => {
    let valu = priceSaleData.replace(/[^0-9]/g, '');
    if (parseInt(valu) >= parseInt(detail.productPrice)) {
      setModalAtur(false);
      setTimeout(async () => {
        setIsLoading(true);
        await useApiPost(apiCashierAddSetHarga(), {
          resellerId: idUser,
          productCode: detail.productCode,
          sellingPrice: valu,
        })
          .then((res) => {
            if (res.statusCode === 200) {
              getSnackBar_success({
                title: res.values.message,
                duration: 'LENGTH_INDEFINITE',
              });
              isLogged();
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
        title: 'Harga Jual Kurang dari Harga Produk',
        duration: 'LENGTH_INDEFINITE',
      });
    }
  };

  const aturHargaAdmin = async () => {
    let valu = adminFeeData.replace(/[^0-9]/g, '');
    if (parseInt(valu) >= 0) {
      setModalAdmin(false);
      setTimeout(async () => {
        setIsLoading(true);
        await useApiPost(apiCashierAddSetAdmin(), {
          resellerId: idUser,
          productCode: detail.productCode,
          adminFee: valu,
        })
          .then((res) => {
            setIsLoading(false);
            if (res.statusCode === 200) {
              getSnackBar_success({
                title: res.values.message,
                duration: 'LENGTH_INDEFINITE',
              });
              isLogged();
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
        title: 'Masukkan Biaya Admin',
        duration: 'LENGTH_INDEFINITE',
      });
    }
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
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

  const copy = () => {
    let desc = detail.description;
    // let desc = {
    //   isToken: true,
    //   jml_kwh: '125,9KWH',
    //   nama: 'SUMARNO',
    //   trf_daya: 'R1/2200',
    // };
    let renderPpobDetail;
    if (desc) {
      let dataForm = [];
      for (var key in desc) {
        let names = key
          .replace(/_/g, ' ')
          .replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
          });
        let val = desc[key];
        var json = {
          name: names,
          value: val,
        };
        dataForm.push(json);
      }
      renderPpobDetail = dataForm.map((data) => {
        if (data.value) {
          if (data.name === 'IsToken' || data.name === 'Default') {
            return ``;
          } else {
            return `${data.name}:${data.value.replace(/,/g, '.')}`;
          }
        } else {
          return ``;
        }
      });
    } else {
      renderPpobDetail = ``;
    }

    let message = `Produk : ${detail.productName}\nNomor Tujuan : ${
      detail.phone
    }\nHarga : ${detail.productPriceFormatted}\nNo.Pesanan : ${
      detail.transactionId
    }\nNomor Serial : ${detail.serialNumber}\nWaktu Pemesanan : ${moment(
      detail.transactionDate,
    ).format('Do MMMM YYYY, HH:mm:ss')}${renderPpobDetail
      .toString()
      .replace(/,/g, '\n')
      .replace(
        /:/g,
        ' : ',
      )}\nMetode Pembayaran : Saldo\nHarga Jual : Rp ${priceSale}\nBiaya Admin : Rp ${adminFee}\nTotal Pembayaran : Rp ${getRupiah(
      totalPembayaran,
    )}`;
    getSnackBar_success({
      title: `Riwayat telah disalin`,
      duration: 'LENGTH_LONG',
    });

    // Clipboard.setString(message);
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

  const downloadPdf = async () => {
    setIsLoading(true);
    await useApiPost(apiPdfSimpanBukti(), {
      description: description,
      detail: detail,
      ket: ket,
      logo: logoDefault,
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
  }, [])

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
              <View style={[styles.col40, styles.centerContent, styles.pr10]}>
           
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
                Rp {detail.productPriceFormatted}
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


        <View style={[styles.mt10]}>
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
                Rp {getRupiah(totalPembayaran)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RiwayatDetail;
