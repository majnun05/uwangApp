import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  RefreshControl,
  SafeAreaView,
  BackHandler,
  TextInput,
  InteractionManager,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {
  apiCashierViewDataLoan,
  apiCashierByIDMemberLoan,
  apiCashierViewPiutang,
} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSession, getSnackBar_error, getRupiah} from '../../helpers/Helpers';
import Header from '../../content/header/Header';
import styles from '../../assets/styles/Style';
import IconRightArrow from '../../assets/svg/right-arrow.svg';
import IconProfile from '../../assets/svg/profile-kasir.svg';
import IconDuit from '../../assets/svg/duit.svg';
import IconBulanGrey from '../../assets/svg/bulan-grey.svg';
import IconEmpty from '../../assets/svg/empty.svg';
import IconSearch from '../../assets/svg/search-black.svg';
import IconRightPage from '../../assets/svg/right-page.svg';
import IconLeftPage from '../../assets/svg/left-page.svg';

const DaftarHutangSup = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [dataRes, setDataRes] = useState([]);
  const [dataResReal, setDataResReal] = useState([]);
  const [totalPiutang, setTotalPiutang] = useState(0);
  let isMounted = true;

  const isLogged = async (hal) => {
    let idUser_ = await getSession('idUser').then((idUser) => {
      return idUser;
    });
    viewPiutang(idUser_);
    await useApiPost(apiCashierViewDataLoan() + `/${idUser_}`, {
      isSupplier: true,
      page: hal,
    })
      .then(async (res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let lenAwal = res.values.data;
            let len = lenAwal.data;

            let results = [];
            for (let i = 0; i < len.length; i++) {
              let row = len[i];
              let pushArr = {
                phone: row._id.phone,
                name: row._id.name,
                id: row._id.id,
                address: row._id.address,
                total: row.total,
              };

              results.push(pushArr);
            }
            setDataRes(results);
            setDataResReal(results);
            setTotalPage(lenAwal.pagination.totalPage);
            setTotalData(lenAwal.totalData);
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

  const viewPiutang = async (idUser_) => {
    await useApiPost(apiCashierViewPiutang() + `/${idUser_}`, {
      isSupplier: true,
    })
      .then(async (res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let len = res.values.data;
            setTotalPiutang(len[0].total);
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

  const detailHutang = async (items) => {
    setIsLoading(true);
    await useApiPost(apiCashierByIDMemberLoan() + `/${items.id}`, {})
      .then(async (res) => {
        setIsLoading(false);
        if (res.statusCode === 200) {
          let len = res.values.data;
          let results = [];
          for (let i = 0; i < len.length; i++) {
            let row = len[i];
            let pushArr = {
              type: row.type,
              amount: row.amount,
              title: row.title,
              id_member_loan: row.idMemberLoan,
              idreseller: row.idReseller,
              id_data_loan: row._id,
            };

            results.push(pushArr);
          }

          let penghutang = {
            id_member_loan: items.id,
            total: items.total,
            name: items.name,
            phone: items.phone,
            address: items.address,
          };
          navigation.push('DetailHutangSup', {
            hutang: results,
            penghutang: penghutang,
            check: 'bayar',
          });
        } else {
          getSnackBar_error({
            title: res.values.message,
            duration: 'LENGTH_INDEFINITE',
          });
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

    return () => backHandler.remove();
  }, []);

  const renderItem = React.useCallback(({item, index}) => {
    return parseInt(item.total) > 0 ? (
      <Ripple
        key={index}
        onPress={() => {
          detailHutang(item);
        }}
        style={[styles.row, styles.boxListHutangDaftarDetail]}>
        <View style={[styles.col20, styles.center]}>
          <SvgXml width={40} height={40} xml={IconProfile} />
        </View>
        <View style={[styles.col70]}>
          <Text style={[styles.fs15, styles.fontWSB, styles.black]}>
            {item.name}
          </Text>
          <Text style={[styles.fs12, styles.grey92]} note>
            Total Rp  {getRupiah(item.total)}
          </Text>
        </View>
        <View style={[styles.col10, styles.center]}>
          <SvgXml width={20} height={20} xml={IconRightArrow} />
        </View>
      </Ripple>
    ) : null;
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

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Daftar Hutang Supplier'}
        shadow={false}
        right={false}
      />

      <View
        style={{
          backgroundColor: '#ECECEC',
          padding: 10,
          paddingTop: 15,
          paddingBottom: 15,
        }}>
        <View style={styles.row}>
          <View style={[styles.col15, styles.center]}>
            <SvgXml width={23} height={23} xml={IconDuit} />
          </View>
          <View style={styles.col85}>
            <Text style={[styles.black, styles.fs12, styles.leftText]}>
              Total Hutang
            </Text>
            <Text
              style={[
                styles.black,
                styles.fontWSB,
                styles.leftText,
                styles.fs15,
              ]}>
              Rp  {getRupiah(totalPiutang)}
            </Text>
          </View>
        </View>
        <SvgXml
          width={50}
          height={50}
          style={{
            position: 'absolute',
            right: 0,
            bottom: -5,
            zIndex: -1,
          }}
          xml={IconBulanGrey}
        />
      </View>
      <Ripple
        onPress={() => navigation.navigate('DaftarPenghutangSup')}
        style={[styles.btnKelola, styles.mt10]}>
        <Text style={[styles.black, styles.fs12, styles.bold]}>
          Kelola Daftar Penghutang
        </Text>
      </Ripple>

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
          style={[styles.bxButtonMore, styles.row, styles.mb10, styles.mt10]}>
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

export default DaftarHutangSup;
