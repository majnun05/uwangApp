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
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import ModalFilters from '../../content/modal/ModalFilterHistory';
import Header from '../../content/header/Header';
import TabRiwayat from '../../content/more/TabRiwayat';
import IconSaldo from '../../assets/svg/saldo.svg';
import IconCalendar from '../../assets/svg/calendar2.svg';
import IconEmpty from '../../assets/svg/empty.svg';
import IconRightPage from '../../assets/svg/right-page.svg';
import IconLeftPage from '../../assets/svg/left-page.svg';
import {useApiPost, useError} from '../../helpers/useFetch';
import {apiHistoryMutation} from '../../helpers/endPoint';
import {getSnackBar_error, getSession} from '../../helpers/Helpers';
import moment from 'moment';
import 'moment/locale/id';
import { IcWallet } from '../../assets';
moment.locale('id');

const RiwayatMutasi = (props) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [dataRes, setDataRes] = useState([]);
  const [modalFilter, setModalFilter] = useState(false);
  const [downline, setDownline] = useState('');
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [checkGrosir, setCheckGrosir] = useState('false');
  let isMounted = true;

  const isLogged = async (hal) => {
    let availGrosir_ = await getSession('availGrosir').then((availGrosir) => {
      return availGrosir;
    });

    if (isMounted) {
      setCheckGrosir(availGrosir_);
    }

    await useApiPost(apiHistoryMutation(), {
      idDownline: downline,
      page: hal,
      startDate: moment(dateStart).format('YYYY-MM-DD'),
      endDate: moment(dateEnd).format('YYYY-MM-DD'),
    })
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
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
            setIsLoading(false);
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const closeModalFilter = () => {
    setModalFilter(false);
    isLogged(page);
  };

  const resetFilter = () => {
    setDownline('');
    setDateStart(new Date());
    setDateEnd(new Date());
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

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home');
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
      <View
        key={index}
        style={[
          styles.boxRiwayat,
          styles.row,
          styles.pt15,
          styles.pb10,
          styles.pr10,
          styles.pl10,
          styles.borderTop,
        ]}>
        <View style={[styles.col20, styles.center]}>
          <SvgXml width={35} height={35} xml={IcWallet} />
        </View>
        <View style={[styles.col60]}>
          <Text style={[styles.fs11, styles.grey92, styles.fontWSR]}>
            {moment(item.transactionDate).format('Do MMMM YYYY, HH:mm')}
          </Text>
          <Text
            style={[styles.black, styles.fs13, styles.bold]}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item.note}
          </Text>
          <Text style={[styles.fs12, styles.green, styles.fontWSB]}>
            <Text style={[styles.fs10, styles.green, styles.fontWSR]}>
              {' '}
              Rp 
            </Text>
            {item.balanceTotal}
          </Text>
        </View>
        <View style={[styles.col20, styles.center]}>
          <Text style={[styles.fs12, styles.red, styles.fontWSB]}>
            <Text style={[styles.fs10, styles.red, styles.fontWSR]}> Rp </Text>
            {item.balance}
          </Text>
        </View>
      </View>
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
        title={'Riwayat'}
        shadow={true}
        right={
          <TouchableOpacity
            onPress={() => setModalFilter(true)}
            style={[styles.row, styles.centerContent]}>
            <View style={[styles.ml15]}>
              <SvgXml width={23} height={23} xml={IconCalendar} />
            </View>
          </TouchableOpacity>
        }
      />
      <TabRiwayat
        menu="mutasisaldo"
        navigation={navigation}
        checkGrosir={checkGrosir}
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

      <ModalFilters
        close={true}
        filterRiwayat={true}
        modal={'normal'}
        isVisible={modalFilter}
        show1={show1}
        show2={show2}
        onPressDate1={() => setShow1(true)}
        onPressDate2={() => setShow2(true)}
        onSwipeComplete={() => {
          closeModalFilter();
        }}
        valueDownline={downline}
        onChangeTextDownline={(downline) => setDownline(downline)}
        value1={dateStart}
        onChangeText1={(dateStart) => setDateStart(dateStart)}
        value2={dateEnd}
        onChangeText2={(dateEnd) => setDateEnd(dateEnd)}
        onDateChange1={changeDateStart}
        onDateChange2={changeDateEnd}
        titleDownline={'Downline'}
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
        titleClose={'Reset'}
        onPressClose={() => {
          resetFilter();
        }}
      />
    </SafeAreaView>
  );
};

export default RiwayatMutasi;
