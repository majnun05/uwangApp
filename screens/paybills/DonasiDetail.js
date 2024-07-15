import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  View,
  Text,
  RefreshControl,
  FlatList,
  InteractionManager,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiProductDetail} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_error, getRupiah} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import ModalDetail from '../../content/modal/ModalDetail';
import ContentPulsa from '../../content/fitur/ContentPulsa';
import IconEmpty from '../../assets/svg/empty.svg';

const DonasiDetail = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalDetail, setModalDetail] = useState(false);
  const [dataRes, setDataRes] = useState([]);
  const [phone, setPhone] = useState(params.phone);
  const [operatorId, setOperatorId] = useState(params.operatorId);
  const [operatorName, setOperatorName] = useState(params.operatorName);
  const [produk, setProduk] = useState('Donasi');
  const [adminFee, setAdminFee] = useState(0);
  const [detail, setDetail] = useState({});
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

  const payment = () => {
    setModalDetail(false);

    return navigation.push('Confirm', {
      detail: detail,
      sendTo: '',
      tagihan: '0',
      totalTagihan: getRupiah(parseInt(detail.priceReal + adminFee)),
      detailTrx: [],
      allDetailTrx: '',
      operatorName: operatorName,
      phone: '',
      admin: adminFee,
      produk: produk,
      page: 'elektrik',
    });
  };

  const chooseProduct = (data) => {
    let tot = parseInt(parseInt(data.priceReal ? data.priceReal : 0) * 0.015);
    setAdminFee(tot);
    setDetail(data);
    setModalDetail(true);
  };

  const renderItem = React.useCallback(({item, index}) => {
    return (
      <ContentPulsa
        key={index}
        onPress={() => {
          item.isBug ? null : chooseProduct(item);
        }}
        image={item.imgUrl}
        productName={item.productName}
        productCode={item.productCode}
        description={item.description}
        phone={phone}
        price={item.price}
        isBug={item.isBug}
        point={item.point}
        column={'2'}
      />
    );
  });

  const listEmptyComponent = () => {
    return (
      <View style={styles.boxEmpty}>
        <SvgXml width={120} height={120} xml={IconEmpty} />
        {!isLoading ? (
          <Text style={styles.textEmpty}>Tidak Ada Data</Text>
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
        title={operatorName}
        shadow={false}
        right={false}
      />

      <FlatList
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }
        ListFooterComponent={<View style={styles.mb20} />}
        ListHeaderComponent={
          <View style={[styles.pt10, styles.bgWhite, styles.mb10]}>
            {dataRes.length > 0 ? (
              <Text style={[styles.PulsaTextPhoneNotHeight, styles.pl20]}>
                Pilih Nominal
              </Text>
            ) : null}
          </View>
        }
        shouldItemUpdate={shouldItemUpdate}
        data={dataRes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={listEmptyComponent}
        removeClippedSubviews={true}
        numColumns={2}
        legacyImplementation={false}
      />

      <ModalDetail
        donasi={true}
        operatorName={operatorName}
        close={true}
        modal={'normal'}
        isVisible={modalDetail}
        onSwipeComplete={() => setModalDetail(false)}
        title={'Detail Donasi'}
        titleDonasi={'Nominal Donasi'}
        //produk
        productName={detail.productName}
        productCode={detail.productCode}
        description={detail.description}
        price={detail.price}
        totalPrice={getRupiah(parseInt(detail.priceReal + adminFee))}
        admin={'Rp  ' + getRupiah(adminFee)}
        //end produk
        titleButton={'Lanjut'}
        onPressClose={() => {
          setModalDetail(false);
        }}
        onPayment={() => {
          payment();
        }}
      />
    </SafeAreaView>
  );
};

export default DonasiDetail;
