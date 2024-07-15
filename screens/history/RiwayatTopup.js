import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  FlatList,
  RefreshControl,
  View,
  Text,
  InteractionManager,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import TabRiwayat from '../../content/more/TabRiwayat';
import IconSaldo from '../../assets/svg/saldo.svg';
import IconEmpty from '../../assets/svg/empty.svg';
import IconSukses from '../../assets/svg/status/sukses.svg';
import IconGagal from '../../assets/svg/status/gagal.svg';
import IconPending from '../../assets/svg/status/pending.svg';
import {useApiPost, useError} from '../../helpers/useFetch';
import {apiHistoryTopup} from '../../helpers/endPoint';
import {getSnackBar_error, getRupiah, getSession} from '../../helpers/Helpers';
import moment from 'moment';
import 'moment/locale/id';
import { IcWallet } from '../../assets';
moment.locale('id');

const RiwayatTopup = (props) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [dataRes, setDataRes] = useState([]);
  const [checkGrosir, setCheckGrosir] = useState('false');
  let isMounted = true;

  const isLogged = async () => {
    let availGrosir_ = await getSession('availGrosir').then((availGrosir) => {
      return availGrosir;
    });

    if (isMounted) {
      setCheckGrosir(availGrosir_);
    }

    await useApiPost(apiHistoryTopup(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setDataRes(val.data);
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
        setIsLoading(false);
      });
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
      isLogged();
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, []);

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
  };

  renderItem = React.useCallback(({item, index}) => {
    if (item.type !== 'trfbank') {
      return (
        <Ripple
          key={index}
          onPress={() => {
            let newitem = {
              trxId: item.trxId,
              payNumber: item.payNumber,
              referenceNumber: item.referenceNumber,
              total: item.total,
              adminFee: item.adminFee ? item.adminFee : 0,
              status: item.status,
              type: item.type,
            };
            if (item.statusText === 'PENDING') {
              item.type === 'alfa'
                ? navigation.push('RiwayatTopupAlfa', {
                    dataAlfa: newitem,
                    page: 'RiwayatTopup',
                  })
                : navigation.push('RiwayatTopupIndo', {
                    dataIndo: newitem,
                    page: 'RiwayatTopup',
                  });
            }
          }}
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
            <Text
              style={[styles.black, styles.fs13, styles.bold]}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item.type === 'alfa' ? 'Alfamart' : 'Indomaret'} -{' '}
              {item.payNumber}
            </Text>
            <Text style={[styles.fs11, styles.grey92, styles.fontWSR]}>
              {moment(item.transactionDate).format('LLL')}
            </Text>

            <SvgXml
              width={60}
              height={15}
              style={styles.mt2}
              xml={
                item.statusText === 'PENDING'
                  ? IconPending
                  : item.statusText === 'SUKSES'
                  ? IconSukses
                  : IconGagal
              }
            />
          </View>
          <View style={[styles.col20, styles.center]}>
            <Text style={[styles.fs12, styles.green, styles.fontWSB]}>
              <Text style={[styles.fs10, styles.green, styles.fontWSR]}>
                {' '}
                Rp {getRupiah(item.total ? item.total : 0)}
              </Text>
            </Text>
          </View>

          {item.statusText === 'PENDING' ? (
            <View style={styles.boxPriceListPending}>
              <Text style={[styles.fs9, styles.white, styles.fontWSB]}>
                Lanjut Bayar
              </Text>
            </View>
          ) : null}
        </Ripple>
      );
    } else {
      return (
        <Ripple
          key={index}
          onPress={() => {
            if (item.statusText === 'PENDING') {
              navigation.push('RiwayatTopupDetail', {
                amount: item.nominal,
              });
            }
          }}
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
            <Text
              style={[styles.black, styles.fs13, styles.bold]}
              numberOfLines={2}
              ellipsizeMode="tail">
              Transfer Bank
            </Text>
            <Text style={[styles.fs11, styles.grey92, styles.fontWSR]}>
              {moment(item.transactionDate).format('LLL')}
            </Text>
            {item.note ? (
              <Text style={[styles.fs11, styles.grey92, styles.fontWSR]}>
                {item.note}
              </Text>
            ) : null}

            <SvgXml
              width={60}
              height={15}
              style={styles.mt2}
              xml={
                item.statusText === 'PENDING'
                  ? IconPending
                  : item.statusText === 'SUKSES'
                  ? IconSukses
                  : IconGagal
              }
            />
          </View>
          <View style={[styles.col20, styles.center]}>
            <Text style={[styles.fs12, styles.green, styles.fontWSB]}>
              <Text style={[styles.fs10, styles.green, styles.fontWSR]}>
                {' '}
                Rp {getRupiah(item.nominal ? item.nominal : 0)}
              </Text>
            </Text>
          </View>

          {item.statusText === 'PENDING' ? (
            <View style={styles.boxPriceListPending}>
              <Text style={[styles.fs9, styles.white, styles.fontWSB]}>
                Lanjut Bayar
              </Text>
            </View>
          ) : null}
        </Ripple>
      );
    }
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
        title={'History'}
        shadow={true}
        right={false}
      />
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
        ListHeaderComponent={
          <TabRiwayat
            menu="isisaldo"
            navigation={navigation}
            checkGrosir={checkGrosir}
          />
        }
        removeClippedSubviews={true}
        legacyImplementation={true}
      />
    </SafeAreaView>
  );
};

export default RiwayatTopup;
