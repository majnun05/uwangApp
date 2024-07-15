import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  View,
  Text,
  RefreshControl,
  FlatList,
  InteractionManager,
  TouchableOpacity
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiProductDetail, apiTransactionCheck} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {
  getSnackBar_error,
  getRupiah,
  replacePhone,
} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import ModalDetail from '../../content/modal/ModalDetail';
import InputPhone from '../../content/form/InputPhone';
import ContentProduk from '../../content/fitur/ContentProdukFull';
import IconEmpty from '../../assets/svg/empty.svg';
import IconBack from '../../assets/svg/back.svg';

const DigiposDetail = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalDetail, setModalDetail] = useState(false);
  const [form, setForm] = useState(false);
  const [dataRes, setDataRes] = useState([]);
  const [phone, setPhone] = useState('');
  const [operatorId, setOperatorId] = useState(params.operatorId);
  const [operatorName, setOperatorName] = useState(params.operatorName);
  const [imgProduk, setImgProduk] = useState(params.imgProduk);
  const [produk, setProduk] = useState('Digipos');
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

  const chooseProduct = (data) => {
    if (phone === '') {
      phone ? setForm(false) : setForm(true);
    } else {
      setDetail(data);
      setModalDetail(true);
    }
  };

  const payment = async () => {
    if (phone === '') {
      phone ? setForm(false) : setForm(true);
    } else {
      setModalDetail(false);
      setIsLoading(true);
      await useApiPost(apiTransactionCheck(), {
        productCode: detail.productCode ? detail.productCode : '',
        phone: phone,
      })
        .then((res) => {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;

            return navigation.push('Confirm', {
              detail: detail,
              sendTo: '',
              phone: phone,
              produk: produk,
              page: 'ppob',
              admin: getRupiah(val.data.adminFee ? val.data.adminFee : 0),
              tagihan: getRupiah(val.data.price ? val.data.price : 0),
              totalTagihan: getRupiah(
                val.data.billPayment ? val.data.billPayment : 0,
              ),
              detailTrx: val.data.message,
              allDetailTrx: val.data.allMessage,
            });
          } else {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_LONG',
            });
          }
        })
        .catch((error) => {
          setIsLoading(false);
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
    setForm(false);
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
                   placeholder="Contoh : 8123456xxx"
                   title="ID / Nomor Pelanggan"
                   contact={true}
                   copas={true}
                   minus={true}
                   image={imgProduk}
                   form={form}
                   titleForm="Masukkan ID / Nomor Pelanggan"
                />
              </View>
            </View>

            <View style={{marginVertical: 5}}>
            {dataRes.length > 0 ? (
              <Text style={[styles.PulsaTextPhoneNotHeight, styles.pl20]}>
                Pilih Produk
              </Text>
            ) : null} 
            </View>
            
          </View>
        }
        ListFooterComponent={<View style={styles.mb20} />}
        shouldItemUpdate={shouldItemUpdate}
        data={dataRes}
        renderItem={({item, index}) => {
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
        }}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={listEmptyComponent}
        removeClippedSubviews={true}
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

export default DigiposDetail;
