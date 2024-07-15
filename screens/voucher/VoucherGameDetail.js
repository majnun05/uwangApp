import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  View,
  Text,
  RefreshControl,
  InteractionManager,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiProductDetail} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_error, replacePhone} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import ModalDetail from '../../content/modal/ModalDetail';
import InputPhone from '../../content/form/InputPhone';
import ContentProduk from '../../content/fitur/ContentProdukFull';
import IconEmpty from '../../assets/svg/empty.svg';
import IconBack from '../../assets/svg/back.svg';

const VoucherGameDetail = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalDetail, setModalDetail] = useState(false);
  const [phone, setPhone] = useState('');
  const [dataRes, setDataRes] = useState([]);
  const [operatorId, setOperatorId] = useState(params.operatorId);
  const [operatorName, setOperatorName] = useState(params.operatorName);
  const [imgProduk, setImgProduk] = useState(params.imgProduk);
  const [produk, setProduk] = useState(params.produk);
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

  const chooseProduct = (data) => {
    if (phone === '') {
      getSnackBar_error({
        title:
          produk === 'Voucher Game'
            ? 'Masukkan Nomor Tujuan'
            : 'Masukkan ID Game',
        duration: 'LENGTH_LONG',
      });
    } else {
      setDetail(data);
      setModalDetail(true);
    }
  };

  const payment = () => {
    if (phone === '') {
      getSnackBar_error({
        title:
          produk === 'Voucher Game'
            ? 'Masukkan Nomor Tujuan'
            : 'Masukkan ID Game',
        duration: 'LENGTH_LONG',
      });
    } else if (detail.productCode === '' || detail.productCode === undefined) {
      getSnackBar_error({
        title: 'Pilih Produk',
        duration: 'LENGTH_LONG',
      });
    } else {
      setModalDetail(false);
      return navigation.push('Confirm', {
        detail: detail,
        sendTo: '',
        tagihan: '0',
        totalTagihan: '0',
        detailTrx: [],
        allDetailTrx: '',
        phone: phone,
        admin: adminFee,
        produk: produk,
        page: 'elektrik',
      });
    }
  };

  const phoneChange = async (value, index) => {
    if (value.indexOf('62') != -1) {
      var phones = replacePhone(value, '+62', '0');
      number = phones.replace(/ /g, '');
      number = phones.replace(/-/g, '');
    } else {
      var number = value;
    }
    let num = number.replace(/[^0-9]/g, '');
    setPhone(num);
  };

  const renderItem = React.useCallback(({item, index}) => {
    return (
      <ContentProduk
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
      {/* <Header
        onBack={() => navigation.goBack(null)}
        title={operatorName}
        shadow={false}
        right={false}
      /> */}
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
          <View style={[styles.pb10, styles.bgWhite]}>

<View style={{height: 116, backgroundColor: '#4F6CFF'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 20,
                }}>
                <TouchableOpacity onPress={() => navigation.goBack(null)}>
                  <SvgXml width={25} height={25} xml={IconBack} />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.white,
                    styles.fs18,
                    styles.fontWSB,
                    {marginLeft: 10},
                  ]}>
                  {operatorName}
                </Text>
              </View>
            </View>

            <View style={[styles.widgedPulsa]}>
              <View>
                <InputPhone
                  disable={false}
                  value={phone}
                  onChangeText={phoneChange}
                  placeholder={
                    produk === 'Voucher Game'
                      ? 'Contoh : 08123456xxx'
                      : 'Contoh : 123456xxx'
                  }
                  title={
                    produk === 'Voucher Game'
                      ? 'Masukkan Nomor Tujuan'
                      : 'Masukkan ID Game'
                  }
                  contact={true}
                  copas={true}
                  minus={true}
                  image={imgProduk}
                />
              </View>
            </View>

            <View style={{marginVertical: 5}}>
            {dataRes.length > 0 ? (
              <Text style={[styles.PulsaTextPhoneNotHeight, styles.pl20]}>
                Pilih Nominal
              </Text>
            ) : null}
            </View>

            {/* <View style={{height: 60, backgroundColor: '#4F6CFF'}} />
            <InputPhone
              disable={false}
              value={phone}
              onChangeText={phoneChange}
              placeholder={
                produk === 'Voucher Game'
                  ? 'Contoh : 08123456xxx'
                  : 'Contoh : 123456xxx'
              }
              title={
                produk === 'Voucher Game'
                  ? 'Masukkan Nomor Tujuan'
                  : 'Masukkan ID Game'
              }
              contact={true}
              copas={true}
              minus={true}
              image={imgProduk}
            />
            {dataRes.length > 0 ? (
              <Text style={[styles.PulsaTextPhoneNotHeight, styles.pl20]}>
                Pilih Nominal
              </Text>
            ) : null} */}
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
        numColumns={1}
        horizontal={false}
        pageSize={20}
        legacyImplementation={false}
      />

      <ModalDetail
        close={true}
        modal={'normal'}
        isVisible={modalDetail}
        onSwipeComplete={() => setModalDetail(false)}
        title={'Detail Pembelian'}
        //produk
        productName={detail.productName}
        productCode={detail.productCode}
        description={detail.description}
        phone={phone}
        price={detail.price}
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

export default VoucherGameDetail;
