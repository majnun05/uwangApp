import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  View,
  Text,
  RefreshControl,
  Image,
  InteractionManager,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiProductOperator, apiUtilityReference} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSession, getSnackBar_error} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/HeaderOperator';
import ContentOperator from '../../content/fitur/ContentOperatorArrow';
import IconEmpty from '../../assets/svg/empty.svg';
import Keterangan from '../../content/fitur/Keterangan';

const TvKabelinternet = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [dataRes, setDataRes] = useState([]);
  const [imgTvKabelInternet, setImgTvKabelInternet] = useState('');
  const [ktr, setKtr] = useState({title: '', message: '', active: false});
  const [activeGame, setActiveGame] = useState(true);
  const [activeOther, setActiveOther] = useState(false);
  let isMounted = true;

  const {width} = Dimensions.get('window');

  const isLogged = async () => {
    let _tvKabelInternet = await getSession('tvKabelInternet').then(
      (tvKabelInternet) => {
        return tvKabelInternet;
      },
    );
    if (isMounted) {
      setImgTvKabelInternet(_tvKabelInternet);
    }
    await useApiPost(apiUtilityReference(), {})
      .then((res) => {
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values;
            let op = val.values.productVoucher_tv;
            let kets = val.values.ketTvKabelVoucher;

            setKtr(kets ? kets : ktr);
            getOperator(op);
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

  const getOperator = async (ope) => {
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
            setDataRes(val.data.data);
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
      <ContentOperator
        key={index}
        onPress={() =>
          navigation.push('TvKabelVoucherDetail', {
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

  const onChangeWidget = (val) => {
    if (val === 'game') {
      setActiveGame(true);
      setActiveOther(false);
    } else {
      setActiveGame(false);
      setActiveOther(true);
      navigation.navigate('TvKabelTagihan');
    }
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.navigate('Home')}
        title={'TV Kabel & Internet'}
        shadow={false}
        right={false}
      />
      <View style={[styles.flex1, {marginTop: -40}]}>
        {imgTvKabelInternet ? (
          <View style={[styles.mb5, styles.ml15, styles.mr15]}>
            <Image
              resizeMethod="resize"
              source={{
                uri: imgTvKabelInternet,
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
              onPress={() => navigation.navigate('VoucherGame')}
              style={{
                width: 20,
                height: 20,
                borderRadius: 20 / 2,
                backgroundColor: 'blue',
                marginHorizontal: 20,
                borderWidth: 0.4,
              }}></TouchableOpacity>
            <Text>Voucher TV</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TvKabelTagihan')}
              style={{
                width: 20,
                height: 20,
                borderRadius: 20 / 2,
                backgroundColor: 'white',
                borderWidth: 0.4,
              }}></TouchableOpacity>
            <Text style={{marginHorizontal: 20}}>Tagihan TV</Text>
          </View>
        </View>

        {/* <View
          style={[
            styles.row,
            styles.tabBox,
            styles.ml20,
            styles.mr20,
            styles.mb10,
          ]}>
          <TouchableOpacity
            style={[styles.col50, styles.center, styles.tabBodyActive]}>
            <Text style={[styles.fs13, styles.white, styles.fontWSB]}>
              Voucher TV
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.col50, styles.center]}
            onPress={() => navigation.navigate('TvKabelTagihan')}>
            <Text style={[styles.fs13, styles.grey92, styles.fontWSB]}>
              Tagihan TV
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
              {dataRes.length > 0 ? (
                <>
                  {ktr.active ? (
                    <Keterangan title={ktr.title} msg={ktr.message} />
                  ) : null}
                </>
              ) : null}
            </View>
          }
          shouldItemUpdate={shouldItemUpdate}
          data={dataRes}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={listEmptyComponent}
          removeClippedSubviews={true}
          contentContainerStyle={{
            flexDirection: 'column',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default TvKabelinternet;
