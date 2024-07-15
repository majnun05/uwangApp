import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  FlatList,
  RefreshControl,
  View,
  TouchableOpacity,
  Text,
  Platform,
  InteractionManager,
  Image,
  StyleSheet,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import ModalFilterGrosir from '../../content/modal/ModalFilterGrosir';
import Header from '../../content/header/Header';
import TabRiwayat from '../../content/more/TabRiwayat';
import IconCalendar from '../../assets/svg/calendar2.svg';
import IconEmpty from '../../assets/svg/empty.svg';
import IconRightPage from '../../assets/svg/right-page.svg';
import IconLeftPage from '../../assets/svg/left-page.svg';
import {useApiGrosirGet, useApiGetError} from '../../helpers/useFetch';
import {apiGrosirHistory, apiGetGrosirStatus} from '../../helpers/endPoint';
import {getErrorGlobal} from '../../helpers/ErrorTranslate';
import {getSnackBar_error, getSession} from '../../helpers/Helpers';
import SvgUri from 'react-native-svg-uri';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const Riwayat = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [dataRes, setDataRes] = useState([]);
  const [modalFilter, setModalFilter] = useState(false);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [imageDefault, setImageDefault] = useState('');
  const [status, setStatus] = useState(0);
  const [invoice, setInvoice] = useState('');
  const [dataStatus, setDataStatus] = useState([
    {code: 0, name: 'Semua', active: true},
    {code: 5, name: 'Pembayaran Terverifikasi', active: false},
    {code: 1, name: 'Dikemas', active: false},
    {code: 2, name: 'Dalam Pengiriman', active: false},
    {code: 3, name: 'Pesanan Diterima', active: false},
    {code: 4, name: 'Pesanan Dibatalkan', active: false},
  ]);

  let isMounted = true;

  const isLogged = async (hal, st) => {
    let imgDef = await getSession('imageDefault').then((imageDefault) => {
      return imageDefault;
    });
    if (isMounted) {
      setImageDefault(imgDef);
    }

    let queryParam = `?`;
    queryParam += `status=${st}`;
    queryParam += `&start_date=${moment(dateStart).format('YYYY-MM-DD')}`;
    queryParam += `&end_date=${moment(dateEnd).format('YYYY-MM-DD')}`;
    queryParam += `&invoice=${invoice}`;
    queryParam += `&page=${hal}`;

    await useApiGrosirGet(apiGrosirHistory(queryParam), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;

            setDataRes(val.data.histories);
            setTotalPage(val.data.pagination.totalPage);
            setTotalData(val.data.totalData);
          } else {
            setDataRes([]);
            getErrorGlobal(res.values.errors);
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const getDataStatus = async () => {
    useApiGetError(apiGetGrosirStatus(), {})
      .then((res) => {
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values;
            setDataStatus(val.data);
          } else {
            setDataStatus(dataStatus);
          }
        }
      })
      .catch((error) => {});
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
      let st = dataStatus.filter(function (item) {
        return item.active === true;
      });

      let stFix;
      if (st.length > 0) {
        stFix = st[0].code;
      } else {
        stFix = 0;
      }

      setIsLoading(true);
      setModalFilter(false);
      setStatus(stFix);
      isLogged(page, stFix);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // refresh back screen
      InteractionManager.runAfterInteractions(() => {
        isLogged(page, status);
      });
      // end refresh back screen
    });
    const backAction = () => {
      navigation.navigate('Home');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    InteractionManager.runAfterInteractions(() => {
      //get List Status
      getDataStatus();
    });

    return () => {
      backHandler.remove();
      unsubscribe();
      isMounted = false;
    };
  }, [navigation, dateStart, dateEnd]);

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged(page, status);
    getDataStatus();
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

  renderItem = React.useCallback(({item, index}) => {
    return (
      <Ripple
        onPress={() =>
          navigation.push('RiwayatGrosirDetail', {
            invoice: item.invoice,
          })
        }
        key={index}
        style={[
          styles.boxRiwayat,
          styles.pt10,
          styles.pb10,
          styles.pr15,
          styles.pl1,
        ]}>
        <View style={[styles.row, styles.pb10]}>
          <View style={[styles.col50, styles.centerContent]}>
            <Text
              style={[styles.fs12, styles.grey8f, styles.fontWSR, styles.ml20]}>
              {item.date}
            </Text>
          </View>
          <View style={[styles.col50, styles.centerContent]}>
            <View
              style={[
                styles.row,
                styles.right,
                styles.rightText,
                s.statusGlobal,
                {backgroundColor: item.color},
              ]}>
              <Text
                style={[
                  styles.fs11,
                  item.text_color ? {color: item.text_color} : styles.grey75,
                  styles.fontWSB,
                  styles.mr5,
                ]}>
                {item.status}
              </Text>
              {item.icon_url ? (
                <SvgUri
                  width={15}
                  height={15}
                  source={{
                    uri: item.icon_url,
                  }}
                />
              ) : null}
            </View>
          </View>
        </View>

        <View style={[styles.row, styles.pt5, styles.pb10]}>
          <View style={[styles.col25, styles.center]}>
            <Image
              resizeMethod="resize"
              source={{
                uri: item.products.image_url
                  ? item.products.image_url
                  : imageDefault,
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
              {item.products.product_name}
            </Text>
            <Text style={[styles.grey75, styles.fs12, styles.fontWSR]}>
              {item.products.qty} Barang
            </Text>
          </View>
        </View>

        <View style={[styles.row]}>
          <View style={[styles.col50]}>
            {item.total_product ? (
              <View style={[styles.pl15, styles.pr15]}>
                <Text style={[styles.grey8f, styles.fs11, styles.fontWSR]}>
                  {item.total_product}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={[styles.col50]}>
            <Text
              style={[styles.green, styles.fs13, styles.fontWSB, styles.right]}>
              {item.total}
            </Text>
          </View>
        </View>
      </Ripple>
    );
  });

  listEmptyComponent = () => {
    return (
      <View style={styles.boxEmpty}>
        <SvgXml width={120} height={120} xml={IconEmpty} />
        {!isLoading ? (
          <Text style={styles.textEmpty}>Tidak Ada Data</Text>
        ) : null}
      </View>
    );
  };

  shouldItemUpdate = (prev, next) => {
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
        onBack={() => navigation.navigate('Home')}
        title={'Riwayat Pesanan'}
        shadow={true}
        right={
          <TouchableOpacity
            style={[styles.row, styles.centerContent]}
            onPress={() => setModalFilter(true)}>
            <View style={[styles.ml15]}>
              <SvgXml width={23} height={23} xml={IconCalendar} />
            </View>
          </TouchableOpacity>
        }
      />
      <TabRiwayat
        menu="riwayatgrosir"
        navigation={navigation}
        checkGrosir={'true'}
      />
      <View style={[styles.flex1, styles.bgWhite]}>
        <FlatList
          refreshControl={
            <RefreshControl
              colors={['#4F6CFF', '#4F6CFF']}
              refreshing={isLoading}
              onRefresh={_onRefresh}
            />
          }
          shouldItemUpdate={this.shouldItemUpdate}
          data={dataRes}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={this.listEmptyComponent}
          removeClippedSubviews={true}
          legacyImplementation={true}
        />
      </View>

      {parseInt(totalPage) > 1 ? (
        <View
          style={[styles.bxButtonMore, styles.row, styles.mb20, styles.mt10]}>
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

      <ModalFilterGrosir
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
        value3={invoice} //invoice
        onChangeText3={(inv) => setInvoice(inv)}
        dataStatus={dataStatus}
        onPressStatus={(dtStatus) => setDataStatus(dtStatus)}
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

export default Riwayat;

const s = StyleSheet.create({
  statusGlobal: {
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
  },
  statusKemas: {
    backgroundColor: '#C7ECE9',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
  },
  statusKirim: {
    backgroundColor: '#FCE7C7',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
  },
  statusTerima: {
    backgroundColor: '#D5F5E0',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
  },
  statusBatal: {
    backgroundColor: '#FFC7C7',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
  },
});
