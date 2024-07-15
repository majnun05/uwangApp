import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  View,
  Text,
  RefreshControl,
  InteractionManager,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiProductDetail, apiUtilityReference} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_error, replacePhone} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import ModalDetail from '../../content/modal/ModalDetail';
import InputPhone from '../../content/form/InputPhone';
import ContentProduk from '../../content/fitur/ContentProdukFull';
import IconEmpty from '../../assets/svg/empty.svg';
import Keterangan from '../../content/fitur/Keterangan';
import IconBack from '../../assets/svg/back.svg';

const Wifiid = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalDetail, setModalDetail] = useState(false);
  const [form, setForm] = useState(false);
  const [dataRes, setDataRes] = useState([]);
  const [phone, setPhone] = useState('');
  const [produk, setProduk] = useState('Wifi ID');
  const [adminFee, setAdminFee] = useState(0);
  const [detail, setDetail] = useState({});
  const [ktr, setKtr] = useState({title: '', message: '', active: false});
  let isMounted = true;

  const isLogged = async () => {
    await useApiPost(apiUtilityReference(), {})
      .then((res) => {
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values;
            let op = val.values.productWifi_id;
            getDetail(op);

            let kets = val.values.ketWifiId;
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

  const getDetail = async (ope) => {
    let op = ope ? ope.toString() : '';
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

  const chooseProduct = (data) => {
    if (phone === '') {
      phone ? setForm(false) : setForm(true);
    } else {
      setDetail(data);
      setModalDetail(true);
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
    setForm(false);
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
  };

  const payment = () => {
    if (phone === '') {
      phone ? setForm(false) : setForm(true);
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
        title={'WIFI ID'}
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
                  WIFI ID
                </Text>
              </View>
            </View>

            <View style={[styles.widgedPulsa]}>
              <View>
                <InputPhone
                   disable={false}
                   value={phone}
                   onChangeText={phoneChange}
                   placeholder="Contoh : 08123456xxx"
                   title="Masukkan Nomor Tujuan"
                   contact={true}
                   copas={true}
                   minus={true}
                   image={''}
                   form={form}
                   titleForm="Masukkan Nomor Tujuan"
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

            {/* <InputPhone
              disable={false}
              value={phone}
              onChangeText={phoneChange}
              placeholder="Contoh : 08123456xxx"
              title="Masukkan Nomor Tujuan"
              contact={true}
              copas={true}
              minus={true}
              image={''}
              form={form}
              titleForm="Masukkan Nomor Tujuan"
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
        legacyImplementation={false}
        ListFooterComponent={
          <View style={[styles.mt10, styles.mb20, styles.pl5, styles.pr5]}>
            {dataRes.length > 0 ? (
              <>
                {ktr.active ? (
                  <Keterangan
                    menu="normal"
                    title={ktr.title}
                    msg={ktr.message}
                  />
                ) : null}
              </>
            ) : null}
          </View>
        }
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

export default Wifiid;
