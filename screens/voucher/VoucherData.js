import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  View,
  Text,
  RefreshControl,
  InteractionManager,
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
import ContentOperator from '../../content/fitur/ContentOperatorArrow';
import IconEmpty from '../../assets/svg/empty.svg';
import Keterangan from '../../content/fitur/Keterangan';

const VoucherData = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [dataRes, setDataRes] = useState([]);
  const [ktr, setKtr] = useState({title: '', message: '', active: false});
  const [imgVoucherData, setImgVoucherData] = useState('');
  let isMounted = true;

  const {width} = Dimensions.get('window');

  const isLogged = async () => {
    let voucherData = await getSession('voucherData').then((voucherData) => {
      return voucherData;
    });
    setImgVoucherData(voucherData);
    await useApiPost(apiUtilityReference(), {})
      .then((res) => {
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values;
            let op = val.values.productVoucher_data;
            getOperator(op);

            let kets = val.values.ketVoucherData;
            setKtr(kets ? kets : ktr);
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

  const renderItem = React.useCallback(({item, index}) => {
    return (
      <>
        <ContentOperator
          key={index}
          onPress={() =>
            navigation.push('VoucherDataDetail', {
              operatorId: item.idOperator,
              operatorName: item.namaOperator,
              imgProduk: item.imgUrl,
              isVoucherKosong: item.isVoucherKosong,
            })
          }
          image={item.imgUrl}
          operatorName={item.namaOperator}
        />
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
        onBack={() => navigation.goBack(null)}
        title={'Pilih Operator'}
        shadow={false}
        right={false}
      />
      <View style={[styles.flex1]}>
        {imgVoucherData ? (
          <View style={[styles.mb5, styles.ml15, styles.mr15]}>
            <Image
              resizeMethod="resize"
              source={{
                uri: imgVoucherData,
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
        />
      </View>
    </SafeAreaView>
  );
};

export default VoucherData;
