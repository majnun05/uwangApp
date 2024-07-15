import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  View,
  TouchableOpacity,
  Text,
  Platform,
  RefreshControl,
  FlatList,
  InteractionManager,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import ModalFilters from '../../content/modal/ModalFilter';
import Header from '../../content/header/Header';
import IconCalendar from '../../assets/svg/calendar2.svg';
import IconChat from '../../assets/svg/inbox.svg';
import IconEmpty from '../../assets/svg/empty.svg';
import IconRightPage from '../../assets/svg/right-page.svg';
import IconLeftPage from '../../assets/svg/left-page.svg';
import {useApiPost, useError} from '../../helpers/useFetch';
import {apiHistoryInbox} from '../../helpers/endPoint';
import {getSnackBar_error} from '../../helpers/Helpers';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const Pesan = () => {
  // const controller = new AbortController();
  // const signal = controller.signal;
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(true);
  const [dataRes, setDataRes] = useState([]);
  const [modalFilter, setModalFilter] = useState(false);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  let isMounted = true;

  // setTimeout(() => controller.abort(), 5000);

  const isLogged = async (hal) => {
    await useApiPost(apiHistoryInbox(), {
      startDate: moment(dateStart).format('YYYY-MM-DD'),
      endDate: moment(dateEnd).format('YYYY-MM-DD'),
      page: hal,
      // signal: signal,
    })
      .then((res) => {
        if (isMounted) {
          setRefreshing(false);
          let val = res.values;
          if (res.statusCode === 200) {
            setDataRes(val.data.data);
            setTotalPage(val.data.pagination.totalPage);
            setTotalData(val.data.totalData);
          } else if (res.statusCode === 500) {
            setDataRes([]);
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          } else {
            setDataRes([]);
          }
        }
      })
      .catch((error) => {
        setRefreshing(false);
      });
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
      setRefreshing(false);
      getSnackBar_error({
        title: 'Batas filter 7 hari dari tanggal pertama',
        duration: 'LENGTH_LONG',
      });
    } else {
      setRefreshing(true);
      setModalFilter(false);
      isLogged(page);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // refresh back screen
      InteractionManager.runAfterInteractions(() => {
        isLogged(page);
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

    return () => {
      backHandler.remove();
      unsubscribe();
      isMounted = false;
    };
  }, [navigation]);

  const _onRefresh = () => {
    setRefreshing(true);
    isLogged(page);
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
        onPress={() => {
          navigation.push('PesanDetail', {
            detail: item,
          });
        }}
        style={[styles.rowListPesan, styles.borderBottom]}>
        <View style={[styles.imgListBoxPesan, styles.centerOnly]}>
          <SvgXml width={30} height={30} xml={IconChat} />
        </View>
        <View style={[styles.bxPricePesan]}>
          <View style={[styles.row]}>
            <View style={styles.col30}>
              <Text
                style={[styles.textListDesPesan, styles.textListDesPesan]}
                numberOfLines={2}
                ellipsizeMode="tail">
                Topinfo
              </Text>
            </View>
            <View style={styles.col70}>
              <Text
                style={styles.textListDatePesan}
                numberOfLines={2}
                ellipsizeMode="tail">
                {moment(item.date).format('DD MMM YYYY HH:mm')}
              </Text>
            </View>
          </View>
          <Text
            style={styles.textListPesan}
            note
            numberOfLines={2}
            ellipsizeMode="tail">
            {item.message}
          </Text>
        </View>
      </Ripple>
    );
  });

  listEmptyComponent = () => {
    return (
      <View style={styles.boxEmpty}>
        <SvgXml width={120} height={120} xml={IconEmpty} />
        {!refreshing ? (
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

  const nextPage = () => {
    if (parseInt(page) < parseInt(totalPage)) {
      setRefreshing(true);
      setPage(parseInt(page) + 1);
      isLogged(parseInt(page) + 1);
    }
  };

  const previousPage = () => {
    if (parseInt(page) > 1) {
      setRefreshing(true);
      setPage(parseInt(page) - 1);
      isLogged(parseInt(page) - 1);
    }
  };

  const refreshBtn = () => {
    setRefreshing(true);
    isLogged(page);
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.navigate('Home')}
        title={'Pesan'}
        shadow={true}
        right={
          <TouchableOpacity onPress={() => setModalFilter(true)}>
            <SvgXml width={23} height={23} xml={IconCalendar} />
          </TouchableOpacity>
        }
      />
      <View style={[styles.flex1, styles.bgWhite]}>
        <FlatList
          refreshControl={
            <RefreshControl
              colors={['#4F6CFF', '#4F6CFF']}
              refreshing={refreshing}
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

export default Pesan;
