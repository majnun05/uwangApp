import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  SafeAreaView,
  BackHandler,
  RefreshControl,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiDownlineList} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_error} from '../../helpers/Helpers';
import Header from '../../content/header/HeaderRight';
import styles from '../../assets/styles/Style';
import IconRightArrow from '../../assets/svg/right-lists.svg';
import IconProfile from '../../assets/svg/profile.svg';
import IconEmpty from '../../assets/svg/empty.svg';
import IconRightPage from '../../assets/svg/right-page.svg';
import IconLeftPage from '../../assets/svg/left-page.svg';
import IconSearch from '../../assets/svg/search-black.svg';

const Downline = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataRes, setDataRes] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [totalDataNew, setTotalDataNew] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  let isMounted = true;

  const getOld = async (hal, cr) => {
    await useApiPost(apiDownlineList(), {
      isNew: 0,
      keyword: cr ? cr : '',
      page: hal,
    })
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          setIsLoadingSearch(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setDataRes(val.data.data);
            setTotalPage(val.data.pagination.totalPage);
            setTotalData(val.data.totalData);
            setTotalDataNew(val.data.totalDataNew);
          } else {
            setDataRes([]);
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

  const _onRefresh = () => {
    getOld(1, '');
  };

  const nextPage = () => {
    if (parseInt(page) < parseInt(totalPage)) {
      setIsLoading(true);
      setPage(parseInt(page) + 1);
      getOld(parseInt(page) + 1);
    }
  };

  const previousPage = () => {
    if (parseInt(page) > 1) {
      setIsLoading(true);
      setPage(parseInt(page) - 1);
      getOld(parseInt(page) - 1);
    }
  };

  const keywordChange = async (value, index) => {
    setQ(value);
    if (parseInt(value.length) > 2) {
      getOld(page, value);
    } else {
      getOld(1, '');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // refresh back screen
      getOld(1, '');
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
      isMounted = false;
      unsubscribe();
    };
  }, [totalData, totalDataNew, navigation]);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.navigate('Home')}
        title={'List Downline'}
        shadow={true}
        right={
          <TouchableNativeFeedback
            onPress={() => navigation.navigate('DownlineRegister')}>
            <View
              style={[
                styles.mr5,
                styles.boxPriceSale,
                {width: '50%', alignSelf: 'flex-end'},
              ]}>
              <Text style={[styles.black, styles.fs10, styles.fontWSR]}>
                Tambah
              </Text>
            </View>
          </TouchableNativeFeedback>
        }
      />
      <View style={[styles.boxFormCari, styles.pl20, styles.pr20]}>
        <View style={[styles.formSearchKotak]}>
          <TextInput
            underlineColorAndroid="#EFEFEF"
            placeholderTextColor="#757575"
            style={[styles.fs15, styles.grey92, styles.fontWSR, {height: 45}]}
            placeholder="Cari Downline disini ..."
            value={q}
            onChangeText={keywordChange}
          />
          <View style={[styles.hrefContact, styles.mt5, styles.mr5]}>
            {isLoadingSearch ? (
              <ActivityIndicator size="small" color="#4F6CFF" />
            ) : (
              <SvgXml width={15} height={15} xml={IconSearch} />
            )}
          </View>
        </View>
      </View>

      <View style={[styles.row]}>
        <Ripple
          style={[
            styles.col50,
            styles.center,
            styles.activeTab,
            styles.pb15,
            styles.pt15,
          ]}>
          <Text style={[styles.blue, styles.fs12, styles.fontWSB]}>
            Terdaftar ({totalData ? totalData : 0})
          </Text>
        </Ripple>
        <Ripple
          onPress={() => navigation.navigate('DownlineNew')}
          style={[
            styles.col50,
            styles.center,
            styles.noActiveTab,
            styles.pb15,
            styles.pt15,
          ]}>
          <Text style={[styles.black, styles.fs12, styles.fontWSR]}>
            Baru ({totalDataNew ? totalDataNew : 0})
          </Text>
        </Ripple>
      </View>

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
        <View style={[styles.mb10]}>
          {dataRes.length > 0 ? (
            <>
              {dataRes.map((item, key) => (
                <TouchableNativeFeedback
                  key={key}
                  background={TouchableNativeFeedback.Ripple('#DDD')}
                  onPress={() =>
                    navigation.push('DownlineDetail', {
                      detail: item,
                    })
                  }>
                  <View style={[styles.row, styles.rowListPage, styles.mt10]}>
                    <View style={[styles.col10, styles.centerOnly]}>
                      <SvgXml width={35} height={35} xml={IconProfile} />
                    </View>
                    <View style={[styles.col80, styles.pl5, styles.pr10]}>
                      <Text style={[styles.fs13, styles.fontWSB, styles.black]}>
                        {item.resellerName}
                      </Text>
                      <Text style={[styles.fs10, styles.fontWSM, styles.black]}>
                        {item.idReseller}
                      </Text>

                      <Text
                        style={[
                          styles.fs10,
                          styles.fontWSB,
                          styles.black,
                          styles.mt5,
                        ]}>
                        Rp  {item.balance}
                      </Text>
                    </View>
                    <View style={[styles.col10, styles.center]}>
                      <SvgXml width={12} height={12} xml={IconRightArrow} />
                    </View>
                  </View>
                </TouchableNativeFeedback>
              ))}
            </>
          ) : (
            <View style={styles.boxEmpty}>
              <SvgXml width={120} height={120} xml={IconEmpty} />
              {!isLoading ? (
                <Text style={styles.textEmpty}>Tidak Ada Data</Text>
              ) : null}
            </View>
          )}
        </View>
      </ScrollView>
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
    </SafeAreaView>
  );
};

export default Downline;
