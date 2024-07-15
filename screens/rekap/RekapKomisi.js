import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
  TouchableNativeFeedback,
  TextInput,
  InteractionManager,
  FlatList,
  Linking,
} from 'react-native';
// import Clipboard from '@react-native-community/clipboard';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiCsvRekapKomisi, apiHistoryRekapKomisi} from '../../helpers/endPoint';
import {useApiPost} from '../../helpers/useFetch';
import {
  getSession,
  getSnackBar_error,
  getSnackBar_success,
  getRupiah,
} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/HeaderRight';
import ModalFilters from '../../content/modal/ModalFilter';
import IconsSearchWhite from '../../assets/svg/search-white.svg';
import IconClose from '../../assets/svg/close.svg';
import IconExcel from '../../assets/svg/excel.svg';
import IconPelangiBulan from '../../assets/svg/pelangi-bulan.svg';
import IconCalendar from '../../assets/svg/calendar2.svg';
import IconRightPage from '../../assets/svg/right-page.svg';
import IconLeftPage from '../../assets/svg/left-page.svg';
import IconEmpty from '../../assets/svg/empty.svg';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const RekapKomisi = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalFilter, setModalFilter] = useState(false);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [dataRes, setDataRes] = useState([]);
  const [dataCsv, setDataCsv] = useState([]);
  const [totalCommission, setTotalCommission] = useState(0);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [statusSearch, setStatusSearch] = useState(false);
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

    await useApiPost(apiHistoryRekapKomisi(), {
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
            let resultsCsv = [];
            for (let i = 0; i < len.length; i++) {
              let row = len[i];

              const {
                no,
                transactionId,
                transactionDate,
                description,
                totalAmount,
                phone,
                sn,
              } = row;

              resultsCsv.push([
                no,
                transactionId,
                moment(transactionDate).format('DD MMMM YYYY HH:mm:ss'),
                description,
                'Rp ' + getRupiah(totalAmount),
                phone,
                sn,
              ]);
            }

            setDataRes(val.data.data);
            setDataCsv(resultsCsv);
            setTotalPage(val.data.pagination.totalPage);
            setTotalData(val.data.totalData);
            setTotalCommission(val.data.totalCommission);
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

  const showSearch = () => {
    setStatusSearch(!statusSearch);
  };

  const copy = (data) => {
    getSnackBar_success({
      title: `${data.toString()} telah disalin`,
      duration: 'LENGTH_LONG',
    });
    // Clipboard.setString(data);
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
    await useApiPost(apiCsvRekapKomisi(), {
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

  const keywordChange = async (text) => {
    let textSearch = text.toLowerCase();

    const data = [...dataRes];
    if (parseInt(textSearch.length) < 2) {
      isLogged(page);
    }
    const searchData = data.filter((item) => {
      if (item.description.toLowerCase().includes(textSearch)) {
        return true;
      }

      if (item.phone.toLowerCase().includes(textSearch)) {
        return true;
      }

      if (item.serialNumber.toLowerCase().includes(textSearch)) {
        return true;
      }

      return (
        item.description &&
        item.serialNumber &&
        item.phone &&
        (item.description.toLowerCase() == textSearch ||
          item.serialNumber.toLowerCase() == textSearch ||
          item.phone.toLowerCase() == textSearch)
      );
    });
    setKeyword(text);
    setDataRes(searchData);
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
            <View style={[styles.col50]}>
              <View style={[styles.row]}>
                <View style={[styles.col20]}>
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: '#E7E7E7',
                      borderRadius: 5,
                    }}
                  />
                </View>
                <View style={[styles.col70]}>
                  <Text
                    style={[
                      styles.fs13,
                      styles.black,
                      styles.fontWSB,
                      styles.LeftText,
                    ]}>
                    {totalCommission}
                  </Text>
                  <Text
                    style={[
                      styles.fs12,
                      styles.black,
                      styles.fontWSR,
                      styles.LeftText,
                    ]}>
                    Komisi
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.col50]}>
              <View style={[styles.row, styles.rightText]}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: '#E7E7E7',
                    borderRadius: 5,
                  }}
                />
                <View style={[styles.pl5]}>
                  <Text
                    style={[
                      styles.fs13,
                      styles.black,
                      styles.fontWSB,
                      styles.LeftText,
                    ]}>
                    {totalTransaction}
                  </Text>
                  <Text
                    style={[
                      styles.fs12,
                      styles.black,
                      styles.fontWSR,
                      styles.LeftText,
                    ]}>
                    Transaksi
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.mt10, styles.row]}>
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
              styles.ph0,
              styles.pt10,
              styles.pb10,
            ]}>
            <View style={[styles.col10]}>
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
            <View style={styles.col60}>
              <Text
                style={[
                  styles.white,
                  styles.fs12,
                  styles.fontWSB,
                  styles.leftText,
                ]}>
                Keterangan
              </Text>
            </View>
            <View style={styles.col30}>
              <Text
                style={[
                  styles.white,
                  styles.fs12,
                  styles.fontWSB,
                  styles.rightText,
                ]}>
                Jumlah
              </Text>
            </View>
          </View>
          <View style={styles.boxFormCariRekap}>
            {statusSearch ? (
              <View style={[styles.formCariRekap, styles.row]}>
                <TextInput
                  underlineColorAndroid="#ffffff"
                  placeholderTextColor="#bdbdbd"
                  style={[
                    styles.fs15,
                    styles.grey92,
                    styles.fontWSR,
                    styles.col90,
                  ]}
                  placeholder="Cari data disini ..."
                  value={keyword}
                  onChangeText={keywordChange}
                />
                <TouchableOpacity
                  onPress={() => {
                    showSearch();
                  }}
                  style={[styles.rightText, styles.mr20, styles.mb10]}>
                  <SvgXml width={23} height={23} xml={IconClose} />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </>
    );
  });

  const renderItem = React.useCallback(({item, index}) => {
    return (
      <View
        style={[styles.bxRowTable, styles.pr15, styles.borderBottom]}
        key={index}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.black, styles.fs12, styles.fontWSR]}>
            {item.transactionId}
          </Text>
        </View>
        <View style={styles.col60}>
          <Text style={[styles.black, styles.fs12, styles.fontWSR]}>
            {item.transactionDate}
          </Text>
          <TouchableOpacity
            style={[styles.row]}
            onPress={() => {
              copy(item.phone);
            }}>
            <View style={styles.col80}>
              <Text style={[styles.black, styles.fs12, styles.fontWSB]}>
                {item.phone}&nbsp;&nbsp;&nbsp;&nbsp;
              </Text>
            </View>
            <View style={[styles.col20, styles.centerContent]}>
              <Text
                style={[
                  styles.black,
                  styles.fs12,
                  styles.fontWSB,
                  styles.underline,
                  styles.RightText,
                ]}>
                Copy
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={[styles.blackDoff, styles.fs12]}>
            {item.description}
          </Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              copy(item.serialNumber);
            }}>
            <View style={styles.col80}>
              <Text
                style={[
                  styles.black,
                  styles.fs12,
                  styles.fontWSB,
                  styles.fontWSB,
                ]}>
                {item.serialNumber}&nbsp;&nbsp;&nbsp;&nbsp;
              </Text>
            </View>
            <View style={[styles.col20, styles.centerContent]}>
              <Text
                style={[
                  styles.black,
                  styles.fs12,
                  styles.fontWSB,
                  styles.underline,
                  styles.RightText,
                ]}>
                Copy
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.col30}>
          <Text
            style={[
              styles.black,
              styles.fs12,
              styles.fontWSB,
              styles.RightText,
            ]}>
            <Text
              style={[
                styles.black,
                styles.fs12,
                styles.fontWSB,
                styles.RightText,
              ]}>
              Rp 
            </Text>
            {getRupiah(item.totalAmount)}
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
        title={'Rekap Komisi'}
        shadow={false}
        right={
          <View style={[styles.rightText, styles.row]}>
            <TouchableOpacity
              style={[styles.mr15, styles.center]}
              onPress={() => {
                showSearch();
              }}>
              <SvgXml width={20} height={20} xml={IconsSearchWhite} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.col50_, styles.center]}
              onPress={() => setModalFilter(true)}>
              <SvgXml width={20} height={20} xml={IconCalendar} />
            </TouchableOpacity>
          </View>
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

export default RekapKomisi;
