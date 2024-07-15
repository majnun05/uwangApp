import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  View,
  TextInput,
  RefreshControl,
  Text,
  InteractionManager,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiProductDetail} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_error} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import ContentProduk from '../../content/fitur/ContentOperatorArrow';
import IconSearch from '../../assets/svg/search.svg';
import IconEmpty from '../../assets/svg/empty.svg';

const DonasiNominal = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [dataRes, setDataRes] = useState([]);
  const [dataResReal, setDataResReal] = useState([]);
  const [operatorId, setOperatorId] = useState(params.operatorId);
  const [operatorName, setOperatorName] = useState(params.operatorName);
  const [imgProduk, setImgProduk] = useState(params.imgProduk);
  let isMounted = true;

  const isLogged = async () => {
    let op = operatorId ? operatorId.toString() : '';
    let operatorFix = op.split(',');
    await useApiPost(apiProductDetail(), {
      idoperator: operatorFix,
    })
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setDataRes(val.data);
            setDataResReal(val.data);
          } else if (res.statusCode === 500) {
            setDataRes([]);
            setDataResReal([]);
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          } else {
            setDataRes([]);
            setDataResReal([]);
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
      isLogged();
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, []);

  const searchFilterFunction = async (text) => {
    let textSearch = text.toLowerCase();

    const data = [...dataRes];
    const searchData = data.filter((item) => {
      if (item.productName.toLowerCase().includes(textSearch)) {
        return true;
      }

      if (item.productCode.toLowerCase().includes(textSearch)) {
        return true;
      }

      return (
        item.productName &&
        item.productCode &&
        (item.productName.toLowerCase() == textSearch ||
          item.productCode.toLowerCase() == textSearch)
      );
    });
    setDataRes(searchData);
  };

  const renderItem = React.useCallback(({item, index}) => {
    return (
      <ContentProduk
        key={index}
        onPress={() => {
          navigation.push('DonasiDetail', {
            detail: item,
            operatorId: operatorId,
            operatorName: operatorName,
            imgProduk: imgProduk,
          });
        }}
        image={item.imgUrl}
        operatorName={item.productName}
        productCode={item.productCode}
        description={item.description}
        phone={''}
        price={item.price}
        isBug={item.isBug}
        point={item.point}
      />
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
        onBack={() => navigation.goBack(null)}
        title={'Pilih Nominal'}
        shadow={false}
        right={false}
      />

      <View style={{height: 30, backgroundColor: '#4F6CFF'}} />
      <View style={[{marginTop: -28}]}>
        <View
          style={[
            styles.formSearchFormCari,
            styles.ml15,
            styles.mr15,
            styles.mb10,
            styles.row,
          ]}>
          <View style={[styles.mt15, styles.mr5]}>
            <SvgXml width={20} height={18} xml={IconSearch} />
          </View>
          <TextInput
            placeholderTextColor="#bdbdbd"
            style={[styles.fs15, styles.black, styles.fontWSR, styles.col100]}
            placeholder="Cari Nominal ..."
            onChangeText={(text) => searchFilterFunction(text)}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                setDataRes(dataResReal);
              }
            }}
          />
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

export default DonasiNominal;
