import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  InteractionManager,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiProductPulsa, apiUtilityReference} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_error, replacePhone} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import InputPhone from '../../content/form/InputPhone';
import ContentOperator from '../../content/fitur/ContentOperator';
import IconEmpty from '../../assets/svg/empty.svg';
import Keterangan from '../../content/fitur/Keterangan';
import {IcEmpety} from '../../assets';
import IconBack from '../../assets/svg/back.svg';

const PaketData = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [dataRes, setDataRes] = useState([]);
  const [phone, setPhone] = useState('');
  const [imgProduk, setImgProduk] = useState('');
  const [ktr, setKtr] = useState({title: '', message: '', active: false});
  let isMounted = true;

  const isLogged = async () => {
    await useApiPost(apiUtilityReference(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            let kets = val.values.ketPaketData;
            setKtr(kets ? kets : ktr);
          } else {
            setKtr({title: '', message: '', active: false});
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

  const getProduct = async (data) => {
    await useApiPost(apiProductPulsa(), {
      phone: data,
      type: 'data',
    })
      .then((res) => {
        if (res.statusCode === 200) {
          let val = res.values;
          setDataRes(val.data);
          setImgProduk(val.data[0].imgUrl);
        } else if (res.statusCode === 500) {
          setDataRes([]);
          setImgProduk('');
          getSnackBar_error({
            title: res.values.message,
            duration: 'LENGTH_INDEFINITE',
          });
        } else {
          setDataRes([]);
          setImgProduk('');
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

    if (num.length > 3) {
      getProduct(num);
    } else {
      setDataRes([]);
      setImgProduk('');
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
      <ContentOperator
        key={index}
        onPress={() =>
          navigation.push('PaketDataDetail', {
            operatorId: item.operatorId,
            operatorName: item.operatorName,
            phone: phone,
            imgProduk: imgProduk,
          })
        }
        image={item.imgUrl}
        operatorName={item.operatorName}
      />
    );
  });

  const listEmptyComponent = () => {
    return (
      <View style={styles.boxEmpty}>
        <SvgXml width={120} height={120} xml={IcEmpety} />
        <Text style={styles.textEmpty}>Tidak Ada Data</Text>
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
      <FlatList
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }
        stickyHeaderIndices={[0]}
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
                  Isi Ulang Paket Data
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
                  image={imgProduk}
                />
              </View>
            </View>

            <View style={{marginVertical:5}}>
              {dataRes.length > 0 ? (
                <Text style={[styles.PulsaTextPhoneNotHeight, styles.pl20]}>
                  Pilih Produk
                </Text>
              ) : null}
            </View>

            {parseInt(phone.length) > 0 ? (
              <>
                {parseInt(phone.length) < 5 ? (
                  <View style={styles.mb10}>
                    <ActivityIndicator size="small" color="#4F6CFF" />
                  </View>
                ) : null}
              </>
            ) : null}
          </View>
        }
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

export default PaketData;
