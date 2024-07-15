import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
  TouchableNativeFeedback,
  InteractionManager,
  FlatList,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {
  apiHistoryRekapTransaksi,
  apiCsvRekapTransaksi,
} from '../../helpers/endPoint';
import {useApiPost} from '../../helpers/useFetch';
import {getSession, getSnackBar_error, getRupiah} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import ModalFilters from '../../content/modal/ModalFilter';
import IconCalendar from '../../assets/svg/calendar2.svg';
import IconExcel from '../../assets/svg/excel.svg';
import IconPelangiBulan from '../../assets/svg/pelangi-bulan.svg';
import IconEmpty from '../../assets/svg/empty.svg';
import IconRightPage from '../../assets/svg/right-page.svg';
import IconLeftPage from '../../assets/svg/left-page.svg';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const RekapTransaksi = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalFilter, setModalFilter] = useState(false);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [page, setPage] = useState(1);
  const [dataRes, setDataRes] = useState([]);
  const [dataCsv, setDataCsv] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [idUser, setIdUser] = useState('');
  const [nameUser, setNameUser] = useState('');
  let isMounted = true;

  const isLogged = async (hal) => {
    let idUser_ = await getSession('idUser').then((idUser) => {
      return idUser;
    });
    let nameUser_ = await getSession('nameUser').then((nameUser) => {
      return nameUser;
    });
    setIdUser(idUser_);
    setNameUser(nameUser_);
    await useApiPost(apiHistoryRekapTransaksi(), {
      page: hal,
      startDate: moment(dateStart).format('YYYY-MM-DD'),
      endDate: moment(dateEnd).format('YYYY-MM-DD'),
    })
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            let len = val.data.data;

            setDataRes(val.data.data);
            setDataCsv(len);
            setTotalPage(val.data.pagination.totalPage);
            setTotalData(val.data.totalData);
            setTotalAmount(val.data.totalAmount);
            setTotalTransaction(val.data.totalTransaction);
          } else if (res.statusCode === 500) {
            setDataRes([]);
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          } else {
            setDataRes([]);
            setIsLoading(false);
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged(page);
  };

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
      setIsLoading(false);
      getSnackBar_error({
        title: 'Batas filter 7 hari dari tanggal pertama',
        duration: 'LENGTH_LONG',
      });
    } else {
      setIsLoading(true);
      setModalFilter(false);
      isLogged(page);
    }
  };

  const downloadCsv = async () => {
    setIsLoading(true);
    await useApiPost(apiCsvRekapTransaksi(), {
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
      isLogged(parseInt(page));
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, []);

  const renderHeader = React.useCallback(({item, index}) => {
    return (
      <>
        <View style={[styles.topBarProfile, styles.pb20]}>
          <Text
            style={[styles.fs12, styles.white, styles.fontWSR, styles.mt20]}>
            Periode
          </Text>
          <View style={[styles.boxPeriode, styles.mb10, styles.mt5]}>
            <Text style={[styles.fs14, styles.green, styles.fontWSB]}>
              {moment(dateStart).format('Do MMM YYYY')} sd{' '}
              {moment(dateEnd).format('Do MMM YYYY')}
            </Text>
          </View>
          <SvgXml
            width={120}
            height={80}
            style={{position: 'absolute', right: 0, bottom: 0, zIndex: -1}}
            xml={IconPelangiBulan}
          />
        </View>

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#DDD')}
          onPress={() => {
            if (dataRes.length > 0) {
              downloadCsv();
            }
          }}>
          <View
            style={[
              styles.row,
              styles.center,
              styles.btnBuyNowFormGreen,
              styles.mt20,
              styles.mb5,
            ]}>
            <Text
              style={[styles.mr5, styles.fs14, styles.white, styles.fontWSR]}
              uppercase={false}>
              Export CSV
            </Text>
            <SvgXml width={20} height={20} xml={IconExcel} />
          </View>
        </TouchableNativeFeedback>
        <View style={[styles.boxTopupTopRekap]}>
          <View style={[styles.row]}>
            <View style={styles.col50}>
              <Text style={[styles.fs12, styles.greyB7]}>{idUser}</Text>
            </View>
            <View style={styles.col50}>
              <Text style={[styles.fs12, styles.greyB7, styles.RightText]}>
                {nameUser}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.bxRowTableHeader,
              styles.mt10,
              styles.pt10,
              styles.pb10,
            ]}>
            <View style={styles.col10}>
              <Text
                style={[
                  styles.white,
                  styles.fs12,
                  styles.fontWSB,
                  styles.leftText,
                ]}>
                No
              </Text>
            </View>
            <View style={styles.col40}>
              <Text
                style={[
                  styles.white,
                  styles.fs12,
                  styles.fontWSB,
                  styles.leftText,
                ]}>
                Kode Produk
              </Text>
            </View>
            <View style={[styles.col15]}>
              <Text
                style={[
                  styles.white,
                  styles.fs12,
                  styles.fontWSB,
                  styles.rightText,
                ]}>
                Trx
              </Text>
            </View>
            <View style={styles.col35}>
              <Text
                style={[
                  styles.white,
                  styles.fs12,
                  styles.fontWSB,
                  styles.rightText,
                ]}>
                Total
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  });

  const renderItem = React.useCallback(({item, index}) => {
    return (
      <View
        style={[styles.bxRowTable, styles.mr20, styles.pl20, styles.pr10]}
        key={index}>
        <View style={[styles.col10, styles.center]}>
          <Text style={[styles.black, styles.fs12, styles.fontWSR]}>
            {item.no}
          </Text>
        </View>
        <View style={[styles.col40, styles.pl10]}>
          <Text style={[styles.black, styles.fs12, styles.fontWSR]}>
            {item.productCode}
          </Text>
        </View>
        <View style={[styles.col15]}>
          <Text
            style={[
              styles.black,
              styles.fs12,
              styles.fontWSR,
              styles.rightText,
            ]}>
            {item.totalTransaction}
          </Text>
        </View>
        <View style={[styles.col35]}>
          <Text style={[styles.blackDoff, styles.fs10, styles.RightText]}>
            Rp  {getRupiah(item.totalAmount)}
          </Text>
        </View>
      </View>
    );
  });

  const listEmptyComponent = () => {
    return (
      <View style={styles.boxEmpty}>
        <SvgXml width={120} height={120} xml={IconEmpty} />
        {!isLoading ? (
          <Text style={styles.textEmpty}>Tidak Ada Data</Text>
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
        title={'Rekap Transaksi'}
        shadow={false}
        right={
          <TouchableOpacity
            style={[styles.col50_, styles.center]}
            onPress={() => setModalFilter(true)}>
            <SvgXml width={20} height={20} xml={IconCalendar} />
          </TouchableOpacity>
        }
      />

      <FlatList
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }
        ListHeaderComponent={renderHeader}
        ListFooterComponent={
          <>
            {dataRes.length > 0 ? (
              <View
                style={[
                  styles.bxRowTable,
                  styles.mr20,
                  styles.pl20,
                  styles.pr10,
                ]}>
                <View style={styles.col10} />
                <View style={styles.col40}>
                  <Text
                    style={[
                      styles.black,
                      styles.fs12,
                      styles.fontWSB,
                      styles.rightText,
                    ]}>
                    Grand Total
                  </Text>
                </View>
                <View style={[styles.col15]}>
                  <Text
                    style={[
                      styles.black,
                      styles.fs12,
                      styles.fontWSB,
                      styles.rightText,
                    ]}>
                    {totalTransaction}
                  </Text>
                </View>
                <View style={styles.col35}>
                  <Text
                    style={[
                      styles.black,
                      styles.fs11,
                      styles.fontWSB,
                      styles.rightText,
                    ]}>
                    Rp  {getRupiah(totalAmount)}
                  </Text>
                </View>
              </View>
            ) : null}
          </>
        }
        shouldItemUpdate={shouldItemUpdate}
        data={dataRes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={listEmptyComponent}
        removeClippedSubviews={true}
        contentContainerStyle={{
          flexDirection: 'column',
        }}
        numColumns={1}
        horizontal={false}
        pageSize={20}
        legacyImplementation={false}
      />

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
            <Text style={[styles.black, styles.fs10, styles.fontWSR]}>
              Total Data {totalData}
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

export default RekapTransaksi;
