import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  BackHandler,
  RefreshControl,
  InteractionManager,
  TextInput,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiPriceTopup} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_error} from '../../helpers/Helpers';
import Header from '../../content/header/Header';
import TabPriceList from '../../content/more/TabPriceList';
import ContentPrice from '../../content/fitur/ContentPrice';
import IconCaret from '../../assets/svg/caret.svg';
import IconCaretRight from '../../assets/svg/caret-right.svg';
import IconEmpty from '../../assets/svg/empty.svg';
import IconSearch from '../../assets/svg/search-black.svg';
import styles from '../../assets/styles/Style';

const PriceListTopup = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [dataRes, setDataRes] = useState([]);
  const [dataResReal, setDataResReal] = useState([]);
  const [detailList, setDetailList] = useState({});
  let isMounted = true;

  const isLogged = async (hal) => {
    await useApiPost(apiPriceTopup(), {
      page: 1,
    })
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setDataRes(val.data.data);
            setDataResReal(val.data.data);
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
    setIsLoading(true);
    isLogged();
  };

  const chooseList = (item) => {
    setDetailList(item);
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

  const searchFilterFunction = (text) => {
    let textSearch = text.toLowerCase();

    const data = [...dataRes];
    const searchData = data.map((item) => {
      const src = item.data.filter((item) => {
        if (item.namaProduk.toLowerCase().includes(textSearch)) {
          return true;
        }

        if (item.kodeProduk.toLowerCase().includes(textSearch)) {
          return true;
        }

        return (
          item.namaProduk &&
          item.kodeProduk &&
          (item.namaProduk.toLowerCase() == textSearch ||
            item.kodeProduk.toLowerCase() == textSearch)
        );
      });

      return {
        ...item,
        data: src,
      };
    });
    const newData = [];
    for (let i = 0; i < searchData.length; i++) {
      if (searchData[i].data.length > 0) {
        newData.push(searchData[i]);
      }
    }

    setDataRes(newData);
  };

  const renderItem = React.useCallback(({item, index}) => {
    let items = [];
    if (item.data) {
      if (item.idOperator === detailList.idOperator) {
        items = item.data.map((items, keys) => {
          return (
            <ContentPrice
              key={keys}
              image={items.imgUrl}
              kodeproduk={items.kodeProduk}
              namaproduk={items.namaProduk}
              harga={items.harga}
              gangguan={items.gangguan}
            />
          );
        });
      }
    }

    return (
      <>
        <Ripple
          key={index}
          onPress={() => {
            item.idOperator === detailList.idOperator
              ? setDetailList({})
              : chooseList(item);
          }}
          style={[styles.boxTitleKategori, styles.row]}>
          <View style={[styles.col90]}>
            <Text
              style={styles.textKategoriPrice}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.nameOperator}
            </Text>
          </View>
          <View style={[styles.col10, styles.center, styles.mt5]}>
            <SvgXml
              width={15}
              height={15}
              xml={
                item.idOperator === detailList.idOperator
                  ? IconCaret
                  : IconCaretRight
              }
            />
          </View>
        </Ripple>
        {items}
      </>
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

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.navigate('Home')}
        title={'Daftar Harga'}
        shadow={true}
        right={false}
      />

      <TabPriceList menu="Topup" navigation={navigation} />
      <View style={[styles.boxFormCari, styles.pl15, styles.pr15]}>
        <View style={styles.formSearchKotak}>
          <TextInput
            underlineColorAndroid="#EFEFEF"
            placeholderTextColor="#757575"
            style={[styles.fs15, styles.grey92, styles.fontWSR, {height: 45}]}
            placeholder="Cari data disini..."
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
    </SafeAreaView>
  );
};

export default PriceListTopup;
