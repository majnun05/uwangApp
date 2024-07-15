import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  View,
  Text,
  RefreshControl,
  FlatList,
  InteractionManager,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import IconChat from '../../assets/svg/inbox.svg';
import IconEmpty from '../../assets/svg/empty.svg';
import IconRightPage from '../../assets/svg/right-page.svg';
import IconLeftPage from '../../assets/svg/left-page.svg';
import {useApiPost, useError} from '../../helpers/useFetch';
import {apiUtilityNotification} from '../../helpers/endPoint';
import {getSnackBar_error, setSession} from '../../helpers/Helpers';
import moment from 'moment';
import 'moment/locale/id';
import { IcNotification } from '../../assets';
moment.locale('id');

const Notifikasi = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(true);
  const [dataRes, setDataRes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  let isMounted = true;
  

  const isLogged = async (hal) => {
    await useApiPost(apiUtilityNotification(), {
      page: hal,
    })
      .then((res) => {
        if (isMounted) {
          setRefreshing(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setDataRes(val.values.data);
            setTotalPage(val.values.pagination.totalPage);
            setTotalData(val.values.totalData);
          } else {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
        }
      })
      .catch((error) => {
        setRefreshing(false);
      });
  };

  const deleteDataNotif = async () => {
    if (isMounted) {
      //setSession({name: 'countBadge', value: '0'});
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
      deleteDataNotif();
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, [navigation]);

  const _onRefresh = () => {
    setRefreshing(true);
    isLogged(page);
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

  const regex = /(<([^>]+)>)/gi;

  const renderItem = React.useCallback(({item, index}) => {
    return (
      <Ripple
        onPress={() => {
          navigation.push('NotifikasiDetail', {
            _id: item._id,
          });
        }}
        style={[styles.rowListPesan, styles.borderBottom]}>
        <View style={[styles.imgListBoxPesan, styles.centerOnly]}>
          <SvgXml width={30} height={30} xml={IcNotification} />
        </View>
        <View style={[styles.bxPricePesan]}>
          <View style={[styles.row]}>
            <View style={styles.col75}>
              <Text
                style={[styles.textListDesPesan, styles.textListDesPesan]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.title}
              </Text>
            </View>
            <View style={styles.col25}>
              <Text
                style={styles.textListDatePesan}
                numberOfLines={1}
                ellipsizeMode="tail">
                {moment(item.createdAt).format('Do MMM')}
              </Text>
            </View>
          </View>
          <Text
            style={styles.textListPesan}
            note
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.description.replace(regex, '')}
          </Text>
        </View>
      </Ripple>
    );
  });
  

  const listEmptyComponent = () => {
    return (
      <View style={styles.boxEmpty}>
        <SvgXml width={120} height={120} xml={IconEmpty} />
        {!refreshing ? (
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
    <SafeAreaView style={[styles.flex1, styles.bgWhite,]}>
      <Header
        onBack={() => navigation.navigate('Home')}
        title={'Notifikasi'}
        shadow={true}
        right={false}
      />
      {/* <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <SvgXml xml={IconEmpty}/>
        <Text style={[styles.fs15, styles.fontWSR, {marginTop: 10, color:'#BDBDBD'}]}>Oppsss, Data Notifikasi Kosong</Text>
      </View> */}
      <View style={[styles.flex1, styles.bgWhite]}>
        <FlatList
          refreshControl={
            <RefreshControl
              colors={['#4F6CFF', '#4F6CFF']}
              refreshing={refreshing}
              onRefresh={_onRefresh}
            />
          }
          shouldItemUpdate={shouldItemUpdate}
          data={dataRes}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={listEmptyComponent}
          removeClippedSubviews={true}
          legacyImplementation={false}
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
    </SafeAreaView>
  );
};

export default Notifikasi;
