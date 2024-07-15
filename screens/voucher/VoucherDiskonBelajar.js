import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  View,
  Text,
  InteractionManager,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiProductOperator, apiUtilityReference} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_error, getSession} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import ContentGame from '../../content/fitur/ContentOperatorArrow';
import IconEmpty from '../../assets/svg/empty.svg';
import Keterangan from '../../content/fitur/Keterangan';

const VoucherDiskonBelajar = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [dataResBelajar, setDataResBelajar] = useState([]);
  const [imgVoucherDiskon, setImgVoucherDiskon] = useState('');
  const [ktr, setKtr] = useState({title: '', message: '', active: false});
  let isMounted = true;

  const {width} = Dimensions.get('window');

  const isLogged = async () => {
    let voucherDiskon = await getSession('voucherDiskon').then(
      (voucherDiskon) => {
        return voucherDiskon;
      },
    );
    setImgVoucherDiskon(voucherDiskon);
    await useApiPost(apiUtilityReference(), {})
      .then((res) => {
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values;
            let op_belajar = val.values.productVoucher_discount_belajar;
            let kets = val.values.ketVoucherDiskon;

            setKtr(kets ? kets : ktr);
            getOperatorBelajar(op_belajar);
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

  const getOperatorBelajar = async (ope) => {
    let op = ope ? ope.toString() : '';
    let operatorFix = op.split(',');
    await useApiPost(apiProductOperator(), {
      idoperator: operatorFix,
      page: 1,
    })
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setDataResBelajar(val.data.data);
          } else if (res.statusCode === 500) {
            setDataResBelajar([]);
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          } else {
            setDataResBelajar([]);
            setIsLoading(false);
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

  const renderItem = React.useCallback(({item, index}) => {
    return (
      <ContentGame
        key={index}
        shadow={true}
        onPress={() =>
          navigation.push('VoucherDiskonDetail', {
            operatorId: item.idOperator,
            operatorName: item.namaOperator,
            imgProduk: item.imgUrl,
          })
        }
        image={item.imgUrl}
        operatorName={item.namaOperator}
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
        onBack={() => navigation.navigate('Home')}
        title={'Pilih Voucher Diskon'}
        shadow={false}
        right={false}
      />
      {/* <View style={[styles.pl5, styles.pr5, {marginTop: -40}]}>
        {imgVoucherDiskon ? (
          <View style={[styles.mb5, styles.ml15, styles.mr15]}>
            <Image
              resizeMethod="resize"
              source={{
                uri: imgVoucherDiskon,
              }}
              style={{
                borderRadius: 5,
                width: null,
                height: width / 3,
                marginLeft: 5,
                marginRight: 5,
                flex: 0,
              }}
              resizeMode={'stretch'}
            />
          </View>
        ) : null}
      </View> */}

      <View
        style={[
          styles.row,
          styles.tabBox,
          styles.ml20,
          styles.mr20,
          {justifyContent: 'space-around'},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('VoucherDiskon')}
            style={{
              width: 20,
              height: 20,
              borderRadius: 20 / 2,
              backgroundColor: 'white',
              marginHorizontal: 20,
              borderWidth: 0.4,
            } }></TouchableOpacity>
          <Text>Deals</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('VoucherDiskonBelajar')}
            style={ {
              width: 20,
              height: 20,
              borderRadius: 20 / 2,
              backgroundColor: 'blue',
              borderWidth: 0.4,
            }}></TouchableOpacity>
          <Text style={{marginHorizontal: 20}}>Belajar</Text>
        </View>
      </View>

      {/* <View style={[styles.row, styles.tabBox]}>
        <TouchableOpacity
          style={[styles.col50, styles.center]}
          onPress={() => navigation.navigate('VoucherDiskon')}>
          <Text style={[styles.fs13, styles.grey92, styles.fontWSB]}>
            Deals
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.col50, styles.center, styles.tabBodyActive]}>
          <Text style={[styles.fs13, styles.white, styles.fontWSB]}>
            Belajar
          </Text>
        </TouchableOpacity>
      </View> */}

      <FlatList
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }
        ListFooterComponent={
          <View style={[styles.mt10, styles.mb20, styles.pl5, styles.pr5]}>
            {dataResBelajar.length > 0 ? (
              <>
                {ktr.active ? (
                  <Keterangan title={ktr.title} msg={ktr.message} />
                ) : null}
              </>
            ) : null}
          </View>
        }
        ListHeaderComponent={
          <>
            {dataResBelajar.length > 0 ? (
              <View style={[styles.boxJudul, styles.mb10]}>
                <Text style={styles.textJudulTop}>Beli Voucher Diskon</Text>
                <Text style={styles.textJudulBottom}>
                  Pembelian Kode Voucher Diskon
                </Text>
              </View>
            ) : null}
          </>
        }
        shouldItemUpdate={shouldItemUpdate}
        data={dataResBelajar}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={listEmptyComponent}
        removeClippedSubviews={true}
        legacyImplementation={false}
      />
    </SafeAreaView>
  );
};

export default VoucherDiskonBelajar;
