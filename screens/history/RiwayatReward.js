import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  FlatList,
  RefreshControl,
  View,
  Text,
  Image,
  InteractionManager,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import TabRiwayat from '../../content/more/TabRiwayat';
import IconEmpty from '../../assets/svg/empty.svg';
import {useApiPost, useError} from '../../helpers/useFetch';
import {apiHistoryReward} from '../../helpers/endPoint';
import {getSnackBar_error, getSession} from '../../helpers/Helpers';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const RiwayatReward = (props) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [dataRes, setDataRes] = useState([]);
  const [page, setPage] = useState(1);
  const [checkGrosir, setCheckGrosir] = useState('false');
  let isMounted = true;

  const isLogged = async (hal) => {
    let availGrosir_ = await getSession('availGrosir').then((availGrosir) => {
      return availGrosir;
    });

    if (isMounted) {
      setCheckGrosir(availGrosir_);
    }

    await useApiPost(apiHistoryReward(), {})
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
            setIsLoading(false);
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
          <Image
            resizeMethod="resize"
            resizeMode="contain"
            style={[
              {
                width: '100%',
                height: 50,
              },
            ]}
            source={{
              uri: item.rewardImageURL,
            }}
          />
        </View>
        <View style={[styles.col60]}>
          <Text style={[styles.fs11, styles.grey92, styles.fontWSR]}>
            {moment(item.transactionDate).format('Do MMMM YYYY, HH:mm')}
          </Text>
          <Text
            style={[styles.black, styles.fs13, styles.bold]}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item.rewardName}
          </Text>
          <Text style={[styles.fs12, styles.green, styles.fontWSB]}>
            Total Poin {item.totalPoint}
          </Text>
        </View>
        <View style={[styles.col20, styles.center]}>
          <Text
            style={[
              styles.fs12,
              item.status === 'PROSES' ? styles.red : styles.blue,
              styles.fontWSB,
            ]}>
            {item.status}
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
        right={false}
      />
      <TabRiwayat
        menu="riwayatreward"
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
    </SafeAreaView>
  );
};

export default RiwayatReward;
