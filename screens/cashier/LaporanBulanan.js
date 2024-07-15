import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Platform,
  Linking,
  RefreshControl,
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {
  apiCashierViewTransaksi,
  apiCashierSumMontly,
  apiCashierEditTransaksi,
  apiCsvLaporanBulanan,
} from '../../helpers/endPoint';
import {useApiPost} from '../../helpers/useFetch';
import {
  getSession,
  getSnackBar_error,
  getSnackBar_success,
  getRupiah,
} from '../../helpers/Helpers';
import Header from '../../content/header/Header';
import ModalFilters from '../../content/modal/ModalFilter';
import ModalPrice from '../../content/modal/ModalPrice';
import styles from '../../assets/styles/Style';
import IconCalendar from '../../assets/svg/calendar2.svg';
import IconDownloadKasir from '../../assets/svg/download-kasir.svg';
import IconUntung from '../../assets/svg/untung.svg';
import IconJual from '../../assets/svg/jual.svg';
import IconBulanKasir from '../../assets/svg/bulan-kasir.svg';
import IconIntersect from '../../assets/svg/intersect2.svg';
import IconRightPage from '../../assets/svg/right-page.svg';
import IconLeftPage from '../../assets/svg/left-page.svg';
import IconEmpty from '../../assets/svg/empty.svg';
import moment from 'moment';
import 'moment/locale/id';
import { IcAngsuranKredit, IcRoaming } from '../../assets';
moment.locale('id');

const LaporanBulanan = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalFilter, setModalFilter] = useState(false);
  const [modalAtur, setModalAtur] = useState(false);
  const [totalKeuntungan, setTotalKeuntungan] = useState(0);
  const [totalPenjualan, setTotalPenjualan] = useState(0);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [dataCart, setDataCart] = useState([]);
  const [dataCsv, setDataCsv] = useState([]);
  const [idTrx, setIdTrx] = useState('');
  const [productCode, setProductCode] = useState('');
  const [amount, setAmount] = useState('');
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  let isMounted = true;

  const isLogged = async (hal) => {
    let idUser_ = await getSession('idUser').then((idUser) => {
      return idUser;
    });
    loadSum(idUser_);
    await useApiPost(apiCashierViewTransaksi(), {
      resellerId: idUser_,
      month: moment(new Date()).format('MM'),
      startDate: moment(dateStart).format('YYYY-MM-DD'),
      endDate: moment(dateEnd).format('YYYY-MM-DD'),
      page: hal, //munculkan semua data transaksi hari ini
    })
      .then(async (res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let dats = res.values.data;
            let len = dats;

            let results = [];
            for (let i = 0; i < len.length; i++) {
              let row = len[i];

              const {
                tanggal,
                type_barang,
                qty,
                harga_jual,
                harga_modal,
                nama,
                stok,
                satuan,
                idreseller,
                idtrx,
              } = row;

              results.push({
                tanggal,
                type_barang,
                qty,
                harga_jual,
                harga_modal,
                nama,
                stok,
                satuan,
                idreseller,
                idtrx,
              });
            }

            setDataCart(results);
            setDataCsv(dats);
            setTotalPage(res.values.pagination.totalPage);
            setTotalData(res.values.total);
          } else {
            setIsLoading(false);
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

  const loadSum = async (idUser_) => {
    await useApiPost(apiCashierSumMontly(), {
      resellerId: idUser_,
      month: moment(new Date()).format('MM'),
      year: moment(new Date()).format('YYYY'),
    })
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          let val = res.values;
          let len = val.data[0];
          if (parseInt(val.data.length) > 0) {
            setTotalPenjualan(len.total_penjualan);
            setTotalKeuntungan(len.keuntungan);
          } else {
            setTotalPenjualan(0);
            setTotalKeuntungan(0);
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const downloadCsv = async () => {
    setIsLoading(true);
    await useApiPost(apiCsvLaporanBulanan(), {
      data: dataCsv,
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

  const aturHarga = (hrga, idtrx, pCode) => {
    setModalAtur(true);
    setAmount(getRupiah(hrga));
    setIdTrx(idtrx);
    setProductCode(pCode);
  };

  const aturHargaToko = async () => {
    let idUser_ = await getSession('idUser').then((idUser) => {
      return idUser;
    });
    let valu = amount.replace(/[^0-9]/g, '');
    if (parseInt(valu) > 0) {
      setModalAtur(false);
      setIsLoading(true);
      setTimeout(async () => {
        await useApiPost(apiCashierEditTransaksi(), {
          resellerId: idUser_,
          trxId: idTrx,
          sellingPrice: valu,
          productCode: productCode,
        })
          .then((res) => {
            if (res.statusCode === 200) {
              isLogged(page);
              return getSnackBar_success({
                title: res.values.message,
                duration: 'LENGTH_INDEFINITE',
              });
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
        title: 'Masukkan Harga Jual',
        duration: 'LENGTH_INDEFINITE',
      });
    }
  };

  const amountChange = (value, index) => {
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setAmount(getRupiah(valu));
    } else {
      setAmount('');
    }
  };

  const filter = () => {
    let start = new Date(dateStart);
    let end = new Date(dateEnd);

    let cekSelisih1 = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
    );
    let cekSelisih2 = end;
    let thirdSelisih1 = moment(cekSelisih1, 'DD/MM/YYYY');
    let thirdSelisih2 = moment(cekSelisih2, 'DD/MM/YYYY');
    let akhirSelisih = thirdSelisih2.diff(thirdSelisih1, 'days');

    if (parseInt(akhirSelisih) > 30) {
      getSnackBar_error({
        title: 'Batas filter 30 hari',
        duration: 'LENGTH_INDEFINITE',
      });
    } else {
      setModalFilter(false);
      isLogged(page);
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
      isLogged(page);
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, []);

  const renderItem = React.useCallback(({item, index}) => {
    let total_modal = parseInt(item.harga_modal) * parseInt(item.qty);
    let total_jual = parseInt(item.harga_jual) * parseInt(item.qty);
    let total_all = parseInt(total_jual) - parseInt(total_modal);
    return (
      <View
        key={index}
        style={[styles.boxListPenghutang, styles.mt5, styles.ml15, styles.mr15]}
        activeOpacity={0.9}>
        <View style={[styles.p10Normal]}>
          <Text style={styles.titleBox}>{item.nama}</Text>
          <View style={[styles.row]}>
            <View style={styles.col70}>
              {item.type_barang !== 'Tarik Keuntungan' &&
              item.type_barang !== 'Input Pengeluaran' ? (
                <Text style={[styles.description, styles.fs11]} note>
                  {moment(item.tanggal).format('DD MMMM YYYY HH:mm')} | Jumlah
                  Beli : {getRupiah(item.qty)}
                </Text>
              ) : (
                <Text style={[styles.description, styles.fs11]} note>
                  {moment(item.tanggal).format('DD MMMM YYYY HH:mm')}
                </Text>
              )}
              {item.type_barang !== 'Tarik Keuntungan' &&
              item.type_barang !== 'Input Pengeluaran' ? (
                <Text
                  style={[
                    styles.mt5,
                    styles.fs12,
                    styles.black,
                    styles.fontWSR,
                    styles.leftText,
                  ]}>
                  Harga Modal : Rp {getRupiah(item.harga_modal)}
                </Text>
              ) : null}
            </View>
            <View style={styles.col30}>
              {item.type_barang !== 'Tarik Keuntungan' &&
              item.type_barang !== 'Input Pengeluaran' ? (
                <View>
                  {item.stok ? (
                    <Text
                      style={[
                        styles.description,
                        styles.rightText,
                        styles.fs11,
                      ]}
                      note>
                      Stok : {item.stok} {item.satuan}
                    </Text>
                  ) : null}
                </View>
              ) : null}
            </View>
          </View>
        </View>
        <View
          style={[styles.row, styles.bgGrey, styles.p10Normal, styles.mt10]}>
          <View style={[styles.col60, styles.center]}>
            {item.type_barang !== 'Tarik Keuntungan' &&
            item.type_barang !== 'Input Pengeluaran' ? (
              <View
                style={[
                  {
                    alignSelf: 'flex-start',
                    justifyContent: 'center',
                  },
                ]}>
                <Text style={[styles.fs10, styles.grey92, styles.leftText]}>
                  Harga Jual
                </Text>
                <View style={[styles.row]}>
                  <Text
                    style={[
                      styles.fs13,
                      styles.black,
                      styles.fontWSR,
                      styles.leftText,
                      styles.mt2,
                    ]}>
                    Rp {getRupiah(item.harga_jual)}
                    &nbsp;&nbsp;&nbsp;
                  </Text>
                  <Ripple
                    onPress={() =>
                      aturHarga(item.harga_jual, item.idtrx, item.productCode)
                    }
                    style={[styles.boxAturharga]}>
                    <Text style={[styles.black, styles.fs10, styles.fontWSB]}>
                      ATUR
                    </Text>
                  </Ripple>
                </View>
              </View>
            ) : null}
          </View>

          <View style={[styles.col40, styles.center]}>
            <Text style={[styles.fs12, styles.grey92, styles.rightText]}>
              {item.type_barang === 'Tarik Keuntungan'
                ? 'Total Penarikan'
                : item.type_barang === 'Input Pengeluaran'
                ? 'Total Penginputan'
                : 'Laba'}
            </Text>
            {item.type_barang === 'Tarik Keuntungan' ? (
              <Text
                style={[
                  styles.fs14,
                  styles.orange,
                  styles.fontWSB,
                  styles.rightText,
                ]}>
                -Rp {getRupiah(item.harga_modal)}
              </Text>
            ) : item.type_barang === 'Input Pengeluaran' ? (
              <Text
                style={[
                  styles.fs14,
                  styles.blue,
                  styles.fontWSB,
                  styles.rightText,
                ]}>
                Rp {getRupiah(item.harga_modal)}
              </Text>
            ) : (
              <Text
                style={[
                  styles.fs14,
                  styles.blue,
                  styles.fontWSB,
                  styles.rightText,
                ]}>
                Rp {getRupiah(total_all)}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  });

  const listEmptyComponent = () => {
    return (
      <View style={styles.boxEmpty}>
        {!isLoading ? (
          <>
            <SvgXml width={120} height={120} xml={IconEmpty} />
            <Text style={styles.textEmpty}>Tidak Ada Data</Text>
          </>
        ) : null}
      </View>
    );
  };

  const shouldItemUpdate = (prev, next) => {
    const {numColumns, shouldItemUpdate} = this.props;
    if (numColumns > 1) {
      return (
        prev.item.length !== next.item.length ||
        prev.item.some((prevItem, ii) =>
          shouldItemUpdate(
            {item: prevItem, index: prev.index * numColumns + ii},
            {item: next.item[ii], index: next.index * numColumns + ii},
          ),
        )
      );
    } else {
      return shouldItemUpdate(prev, next);
    }
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Laporan'}
        shadow={false}
        right={
          <TouchableOpacity onPress={() => setModalFilter(true)}>
            <SvgXml width={23} height={23} xml={IconCalendar} />
          </TouchableOpacity>
        }
      />

      <View style={styles.boxInjekKasir2}>
        <View
          style={[
            styles.pl25,
            styles.bgBlue,
            {
              borderBottomLeftRadius: 50,
              paddingTop: 20,
              paddingBottom: 50,
            },
          ]}>
          <View style={styles.row}>
            <View style={[styles.col50, styles.row]}>
              <>
                <SvgXml width={35} height={35} xml={IcAngsuranKredit} />
              </>
              <View style={styles.pl5}>
                <Text
                  style={[
                    styles.leftText,
                    styles.right,
                    styles.white,
                    styles.fs15,
                    styles.fontWSB,
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {getRupiah(totalPenjualan)}
                </Text>

                <Text
                  style={[
                    styles.leftText,
                    styles.white,
                    styles.fs10,
                    styles.fontWSR,
                  ]}>
                  Total Penjualan
                </Text>
              </View>
            </View>
            <View style={[styles.col50, styles.row]}>
              <>
                <SvgXml width={35} height={35} xml={IcRoaming} />
              </>
              <View style={styles.pl5}>
                <Text
                  style={[
                    styles.leftText,
                    styles.right,
                    styles.white,
                    styles.fs15,
                    styles.fontWSB,
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {getRupiah(totalKeuntungan)}
                </Text>

                <Text
                  style={[
                    styles.leftText,
                    styles.white,
                    styles.fs10,
                    styles.fontWSR,
                  ]}>
                  Total Keuntungan
                </Text>
              </View>
            </View>
          </View>
          
        </View>
      </View>

      <View style={[styles.bgWhite, styles.btnDownload]}>
        <View style={[styles.row]}>
          <View style={[styles.col80, styles.p10Normal]}>
            <Text style={[styles.black, styles.bold, styles.fs15]}>
              {moment(new Date()).format('MMMM YYYY')}
            </Text>
            <Text style={[styles.grey92, styles.fs10]}>
              Download Laporan Anda
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.col20, styles.center]}
            onPress={() => downloadCsv()}>
            <SvgXml width={30} height={30} xml={IconDownloadKasir} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ListHeaderComponent={<View style={styles.mt10} />}
        ListFooterComponent={
          <>
            {dataCart.length > 0 ? (
              <View
                style={[
                  styles.keteranganBaru,
                  styles.mt5,
                  styles.pt20,
                  styles.pb20,
                  styles.ml12,
                  styles.mr12,
                ]}>
                <Text style={[styles.fs12, styles.fontWSB, styles.black]}>
                  Catatan
                </Text>
                <Text style={[styles.fs12, styles.fontWSR, styles.black]}>
                  Transaksi yang tercatat di fitur Kasir merupakan transaksi
                  yang dilakukan melalui aplikasi. Jika ada transaksi selain
                  dari aplikasi silahkan melakukan pencatatan manual melalui
                  Menu Mulai Jualan
                </Text>
                <View
                  style={{
                    position: 'absolute',
                    zIndex: -1,
                    bottom: '-8%',
                    right: '0%',
                    borderTopRightRadius: 100,
                    borderTopLeftRadius: 100,
                  }}>
                  <SvgXml width={70} height={70} xml={IconIntersect} />
                </View>
              </View>
            ) : null}
          </>
        }
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }
        shouldItemUpdate={shouldItemUpdate}
        data={dataCart}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={listEmptyComponent}
        removeClippedSubviews={true}
        legacyImplementation={false}
      />

      {parseInt(totalPage) > 1 ? (
        <View
          style={[styles.bxButtonMore, styles.row, styles.mb10, styles.mt10]}>
          <View style={[styles.col30]}>
            <Ripple
              onPress={() => previousPage()}
              style={[
                styles.leftText,
                styles.col100,
                styles.pt15,
                styles.pb15,
                styles.pl15,
              ]}>
              <SvgXml width={19} height={19} xml={IconLeftPage} />
            </Ripple>
          </View>
          <View style={[styles.col40, styles.center]}>
            <Text style={[styles.black, styles.fs11, styles.fontWSR]}>
              Page {page}/{totalPage}
            </Text>
            <Text style={[styles.black, styles.fs10, styles.fontWSR]}>
              Total Data {totalData}
            </Text>
          </View>
          <View style={[styles.col30]}>
            <Ripple
              onPress={() => nextPage()}
              style={[styles.col100, styles.pt15, styles.pb15, styles.pr15]}>
              <View style={[styles.rightText]}>
                <SvgXml width={19} height={19} xml={IconRightPage} />
              </View>
            </Ripple>
          </View>
        </View>
      ) : null}

      <ModalPrice
        modal={'normal'}
        isVisible={modalAtur}
        onSwipeComplete={() => setModalAtur(false)}
        value={amount}
        onChangeText={amountChange}
        title={'Atur Harga Jual'}
        titleClose={'Batal'}
        titleButton={'Atur'}
        placeholder="Contoh : 10.000"
        onPressClose={() => {
          setModalAtur(false);
        }}
        onPress={() => {
          aturHargaToko();
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

export default LaporanBulanan;
