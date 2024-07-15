import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  Text,
  RefreshControl,
  Image,
  TouchableOpacity,
  InteractionManager,
  FlatList,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiProductOperator, apiUtilityReference} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSession, getSnackBar_error} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/HeaderOperator';
import ContentGame from '../../content/fitur/ContentOperatorArrow';
import IconEmpty from '../../assets/svg/empty.svg';

const VoucherGameLainnya = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [dataResLain, setDataResLain] = useState([]);
  const [tabs, setTabs] = useState('game');
  const [imgVoucherGame, setImgVoucherGame] = useState('');
  const [activeGame, setActiveGame] = useState(false);
  const [activeOther, setActiveOther] = useState(true);
  let isMounted = true;

  const {width} = Dimensions.get('window');

  const isLogged = async () => {
    let voucherGame = await getSession('voucherGame').then((voucherGame) => {
      return voucherGame;
    });
    setImgVoucherGame(voucherGame);
    await useApiPost(apiUtilityReference(), {})
      .then((res) => {
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values;
            let op_lain = val.values.productGameLainnya;
            getOperatorLain(op_lain);
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

  const getOperatorLain = async (ope) => {
    let op = ope ? ope.toString() : '';
    let operatorFix = op.split(',');

    await useApiPost(apiProductOperator() + '?voucherGame=lainnya', {
      idoperator: operatorFix,
      page: 1,
    })
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setDataResLain(val.data.data);
          } else if (res.statusCode === 500) {
            setDataResLain([]);
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          } else {
            setDataResLain([]);
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

  const changeTabs = (data) => {
    setTabs(data);
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
      <View style={[styles.pl5, styles.pr5]}>
        <ContentGame
          key={index}
          shadow={true}
          onPress={() =>
            navigation.push('VoucherGameDetail', {
              operatorId: item.idOperator,
              operatorName: item.namaOperator,
              imgProduk: item.imgUrl,
              produk:
                item.typeGame === 'inject' ? 'Inject Game' : 'Voucher Game',
            })
          }
          image={item.imgUrl}
          operatorName={item.namaOperator}
        />
      </View>
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
      navigation.navigate('VoucherGame')
    } else {
      setActiveGame(false);
      setActiveOther(true);
    }
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.navigate('Home')}
        title={'Pilih Voucher Game'}
        shadow={false}
        right={false}
      />
      <View style={[styles.pl5, styles.pr5, {marginTop: -40}]}>
        {imgVoucherGame ? (
          <View style={[styles.mb5, styles.ml15, styles.mr15]}>
            <Image
              resizeMethod="resize"
              source={{
                uri: imgVoucherGame,
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
      </View>



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
            onPress={() =>  navigation.navigate('VoucherGame')}
            style={{
              width: 20,
              height: 20,
              borderRadius: 20 / 2,
              backgroundColor: 'white',
              marginHorizontal: 20,
              borderWidth: 0.4,
            }}></TouchableOpacity>
          <Text>Game</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <TouchableOpacity
            onPress={() =>  navigation.navigate('VoucherGameLainnya')}
            style={{
              width: 20,
              height: 20,
              borderRadius: 20 / 2,
              backgroundColor: 'blue',
              borderWidth: 0.4,
            }}></TouchableOpacity>
          <Text style={{marginHorizontal: 20}}>Lainnya</Text>
        </View>
        </View>

      {/* <View style={[styles.row, styles.tabBox, styles.ml20, styles.mr20]}>
        <TouchableOpacity
          style={[styles.col50, styles.center]}
          onPress={() => navigation.navigate('VoucherGame')}>
          <Text style={[styles.fs13, styles.grey92, styles.fontWSB]}>Game</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.col50, styles.center, styles.tabBodyActive]}>
          <Text style={[styles.fs13, styles.white, styles.fontWSB]}>
            Lainnya
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
        ListFooterComponent={<View style={styles.mb30} />}
        ListHeaderComponent={
          <>
            {dataResLain.length > 0 ? (
              <View
                style={[styles.boxJudul, styles.mb10, styles.ml5, styles.mr5]}>
                <Text style={styles.textJudulTop}>Beli Voucher Game</Text>
                <Text style={styles.textJudulBottom}>
                  Pembelian kode Voucher dan Gift Card
                </Text>
              </View>
            ) : null}
          </>
        }
        shouldItemUpdate={shouldItemUpdate}
        data={dataResLain}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={listEmptyComponent}
        removeClippedSubviews={true}
        legacyImplementation={false}
      />
    </SafeAreaView>
  );
};

export default VoucherGameLainnya;
