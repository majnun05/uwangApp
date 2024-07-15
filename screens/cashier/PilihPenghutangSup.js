import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  RefreshControl,
  SafeAreaView,
  BackHandler,
  InteractionManager,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiCashierViewMemberLoan} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSession, getSnackBar_error} from '../../helpers/Helpers';
import Header from '../../content/header/Header';
import styles from '../../assets/styles/Style';
import IconEmpty from '../../assets/svg/empty.svg';
import IconRightArrow from '../../assets/svg/right-arrow.svg';
import IconProfile from '../../assets/svg/profile-kasir.svg';
import IconSearch from '../../assets/svg/search-black.svg';
import IconRightPage from '../../assets/svg/right-page.svg';
import IconLeftPage from '../../assets/svg/left-page.svg';

const PilihPenghutangSup = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [dataRes, setDataRes] = useState([]);
  const [dataResReal, setDataResReal] = useState([]);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  let isMounted = true;

  const isLogged = async (hal) => {
    let idUser_ = await getSession('idUser').then((idUser) => {
      return idUser;
    });
    await useApiPost(apiCashierViewMemberLoan(), {
      idReseller: idUser_,
      page: hal,
      isSupplier: true,
    })
      .then(async (res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setDataRes(val.data.data);
            setDataResReal(val.data.data);
            setTotalPage(val.data.pagination.totalPage);
            setTotalData(val.data.totalData);
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

  const searchFilterFunction = async (text) => {
    let textSearch = text.toLowerCase();

    const data = [...dataRes];
    const searchData = data.filter((item) => {
      if (item.name.toLowerCase().includes(textSearch)) {
        return true;
      }

      if (item.phone.toLowerCase().includes(textSearch)) {
        return true;
      }

      return (
        item.name &&
        item.phone &&
        (item.name.toLowerCase() == textSearch ||
          item.phone.toLowerCase() == textSearch)
      );
    });
    setDataRes(searchData);
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged(page);
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
    return (
      <Ripple
        key={index}
        onPress={() => {
          let penghutang = {
            id_member_loan: item._id,
            total: 0,
            name: item.name,
            phone: item.phone,
            address: item.address,
          };

          navigation.navigate('CatatHutangSup', {
            penghutang: penghutang,
          });
        }}
        style={[styles.row, styles.boxListHutangDaftarDetail]}>
        <View style={[styles.col20, styles.center]}>
          <SvgXml width={40} height={40} xml={IconProfile} />
        </View>
        <View style={[styles.col70, styles.pl5, styles.pt5]}>
          <Text style={[styles.fs15, styles.fontWSB, styles.black]}>
            {item.name}
          </Text>
          <Text style={[styles.fs12, styles.grey92, styles.mt10]} note>
            {item.phone}
          </Text>
          <Text style={[styles.fs12, styles.grey92]} note>
            {item.address}
          </Text>
        </View>
        <View style={[styles.col10, styles.center]}>
          <SvgXml width={20} height={20} xml={IconRightArrow} />
        </View>
      </Ripple>
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

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Pilih Penghutang'}
        shadow={false}
        right={false}
      />
      <View style={[styles.boxFormCari, styles.pl15, styles.pr15]}>
        <View style={[styles.formSearchKotak]}>
          <TextInput
            underlineColorAndroid="#EFEFEF"
            placeholderTextColor="#757575"
            style={[styles.fs15, styles.grey92, styles.fontWSR, {height: 45}]}
            placeholder="Cari Penghutang disini ..."
            onChangeText={(text) => searchFilterFunction(text)}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                setDataRes(dataResReal);
              }
            }}
          />
          <View style={[styles.hrefContact, styles.mt5, styles.mr5]}>
            <SvgXml width={15} height={15} xml={IconSearch} />
          </View>
        </View>
      </View>
      <FlatList
        ListFooterComponent={<View style={styles.mb20} />}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
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

export default PilihPenghutangSup;
