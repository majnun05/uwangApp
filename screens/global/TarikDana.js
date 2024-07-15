import React, {useEffect, useState, createRef} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  Text,
  TouchableNativeFeedback,
  RefreshControl,
  InteractionManager,
  TextInput,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  ToastAndroid
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {
  apiUtilityReference,
  apiTransactionCheck,
  apiUserBalance,
  apiUtilityConfig,
  apiProductDetail,
} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_error, getRupiah} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import ModalTarik from '../../content/modal/ModalTarik';
import InputPhone from '../../content/form/InputPhone';
import InputText from '../../content/form/InputText';
import IconRightArrow from '../../assets/svg/right-arrow.svg';
import IconIntersect from '../../assets/svg/intersect2.svg';
import IconSaldo from '../../assets/svg/saldo.svg';
import ContentProduk from '../../content/fitur/ContentOperatorArrow';
import IconSearch from '../../assets/svg/search.svg';
import IconEmpty from '../../assets/svg/empty.svg';
import IconCloseModal from '../../assets/svg/close-modal.svg';
import {IcArrR, IcPay, IcWallet, IcWarningRound} from '../../assets';
import Modal from 'react-native-modal';

const SCREEN_HEIGH = Dimensions.get('window');

const TarikDana = (props) => {
  let {params} = props.route;
  let actionSheet;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalTarikDana, setModalTarikDana] = useState(false);
  const [form1, setForm1] = useState(false);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);
  const [form4, setForm4] = useState(false);
  const [amount, setAmount] = useState('');
  const [alasan, setAlasan] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [bank, setBank] = useState('');
  const [bankEdit, setBankEdit] = useState('');
  const [rekening, setRekening] = useState('');
  const [rekeningEdit, setRekeningEdit] = useState('');
  const [operator, setOperator] = useState('');
  const [balance, setBalance] = useState(0);
  const [balanceReal, setBalanceReal] = useState(0);
  const [minimum, setMinimum] = useState('100.000');
  const [minimumReal, setMinimumReal] = useState(100000);
  const [maximum, setMaximum] = useState('2.000.000');
  const [maximumReal, setMaximumReal] = useState(2000000);
  const [dataRes, setDataRes] = useState([]);
  const [dataResReal, setDataResReal] = useState([]);
  let isMounted = true;

  const isLogged = async () => {
    getUserBalance();
    getConfig();
    await useApiPost(apiUtilityReference(), {})
      .then((res) => {
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values;
            let op = val.values.productPpob_tarikdana;
            setOperator(op);
            getBank(op);
          } else {
            setOperator('');
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

  const getBank = async (op) => {
    let val = op ? op.toString() : '';
    let operatorFix = val.split(',');
    await useApiPost(apiProductDetail(), {
      idoperator: operatorFix,
    })
      .then((res) => {
        console.log({res});
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setDataRes(val.data);
            setDataResReal(val.data);
          } else {
            setDataRes([]);
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

  const getConfig = async () => {
    await useApiPost(apiUtilityConfig(), {})
      .then((res) => {
        if (res.statusCode === 200) {
          let val = res.values;
          setMinimum(
            val.values.tarik_minimum ? val.values.tarik_minimum : '100.000',
          );
          setMinimumReal(
            val.values.tarik_minimum_real
              ? val.values.tarik_minimum_real
              : 100000,
          );
          setMaximum(
            val.values.tarik_maximum ? val.values.tarik_maximum : '2.000.000',
          );
          setMaximumReal(
            val.values.tarik_maximum_real
              ? val.values.tarik_maximum_real
              : 2000000,
          );
        } else {
          getSnackBar_error({
            title: res.values.message,
            duration: 'LENGTH_INDEFINITE',
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const getUserBalance = async () => {
    setIsLoading(true);
    await useApiPost(apiUserBalance(), {})
      .then((res) => {
        setIsLoading(false);
        if (res.statusCode === 200) {
          let val = res.values.data;
          setBalance(val.balance);
          setBalanceReal(val.balanceReal);
        } else {
          getSnackBar_error({
            title: res.values.message,
            duration: 'LENGTH_INDEFINITE',
          });
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

  const amountChange = (value, index) => {
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setAmount(getRupiah(valu));
      setForm2(false);
    } else {
      setAmount('');
      setForm2(true);
    }
  };

  const bankAccountChange = (value, index) => {
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setRekening(valu);
      setForm4(false);
    } else {
      setRekening('');
      setForm4(true);
    }
  };

  const alasanChange = async (value, index) => {
    setForm3(false);
    setAlasan(value);
  };

  const saveRekening = async () => {
    if (bankEdit === '') {
      getSnackBar_error({
        title: 'Pilih Bank Tujuan',
        duration: 'LENGTH_INDEFINITE',
      });
    } else if (rekeningEdit === '') {
      getSnackBar_error({
        title: 'Masukkan Nomor Rekening',
        duration: 'LENGTH_INDEFINITE',
      });
    } else {
      setRekening(rekeningEdit);
      setBank(bankEdit);
      setModalTarikDana(false);
      setForm1(false);
    }
  };

  const checkTarik = async () => {
    if (amount === '' || bank === '' || rekening === '') {
      bank ? setForm1(false) : setForm1(true);
      rekening ? setForm4(false) : setForm4(true)
      amount ? setForm2(false) : setForm2(true);
    } else {
      let amo = amount.replace(/[^0-9]/g, '');
      if (parseInt(balanceReal) > 0) {
        if (parseInt(amo) >= parseInt(minimumReal)) {
          if (parseInt(amo) > parseInt(maximumReal)) {
            ToastAndroid.show('Maksimal Penarikan untuk semua bank Rp ' + maximum, ToastAndroid.SHORT)
          } else {
            payment();
          }
        } else {
          ToastAndroid.show('Minimum Penarikan untuk semua bank Rp ' + minimum, ToastAndroid.SHORT)
        }
      } else {
        ToastAndroid.show('Saldo Anda tidak mencukupi', ToastAndroid.SHORT)
      }
    }
  };

  const payment = async () => {
    if (amount === '' || bank === '') {
      bank ? setForm1(false) : setForm1(true);
      amount ? setForm2(false) : setForm2(true);
    } else {
      let amo = amount.replace(/[^0-9]/g, '');
      setIsLoading(true);
      await useApiPost(apiTransactionCheck(), {
        productCode: bankCode,
        phone: rekening + '@' + amo,
        note: alasan,
      })
        .then((res) => {
          console.log({res})
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            return navigation.push('TarikDanaDetail', {
              detail: {
                bank: bank,
                bankCode: bankCode,
                alasan: alasan,
                rekening: rekening,
                allMessage: val.data.allMessage,
                data: val.data.message ? val.data.message : [],
                fee: getRupiah(val.data.fee ? val.data.fee : 0),
                admin: getRupiah(val.data.adminFee),
                total: getRupiah(val.data.billPayment),
                amount: amount,
                balance: balance,
                balanceReal: balanceReal,
              },
            });
          } else {
            ToastAndroid.show(res.values.message, ToastAndroid.SHORT)
          }
        })
        .catch((error) => {
          setIsLoading(false);
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
      setBankEdit(params.detail.productName ? params.detail.productName : '');
      setBankCode(params.detail.productCode ? params.detail.productCode : '');

      if (params.detail.productName) {
        setModalTarikDana(true);
      }
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, [params.detail]);

  const choseBank = (item) => {
    // console.log({item})
    setDataRes(dataResReal)
    if(item){
      setModalTarikDana(false)
      setBankCode(item.productCode)
      setBankEdit(item.productName)
      setBank(item.productName)
      setForm1(false)
    }else{
      setForm1(true)
    }
  }

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

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Rekening Bank'}
        shadow={false}
        right={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.bgWhite]}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }>
        <View
          style={[
            styles.topBarTarikDana,
            styles.mt15,
            styles.mr15,
            styles.ml15,
            styles.row,
          ]}>
          <View style={[styles.col15, styles.center]}>
            <SvgXml width={33} height={33} xml={IcWallet} />
          </View>
          <View style={[styles.col70, styles.centerContent]}>
            <Text style={[styles.fs12, styles.black]}>Saldo Anda</Text>
            <Text style={[styles.fs18, styles.black, styles.fontWSB]}>
              Rp {balance}
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.mt10,
            styles.fs11,
            styles.greyB7,
            styles.fontWSR,
            styles.ml20,
          ]}>
          Transfer Dana merupakan Penarikan saldo Uwang Anda
        </Text>

        <View style={[styles.mt5, styles.ml15, styles.mr15]}>
          <View style={styles.PulsaLabelPhone}>
            <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>
              Bank Tujuan
            </Text>
          </View>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#DDD')}
            onPress={() => {
              setModalTarikDana(true);
            }}>
            <View
              style={[
                styles.row,
                styles.arePage,
                {borderBottomColor: form1 ? 'red' : '#ddd'},
                {marginBottom: form1 ? 10 : 0},
              ]}>
              <View style={[styles.col90]}>
                <Text
                  style={[
                    styles.fs13,
                    bank ? styles.black : styles.greyCF,
                    styles.fontWSM,
                  ]}>
                  {bank
                    ? `${bank} ${rekening ? `(` + rekening + `)` : rekening}`
                    : 'Pilih Bank Tujuan'}
                </Text>
              </View>
              <View style={[styles.col10, styles.center]}>
                <SvgXml width={20} height={18} xml={IcArrR} />
              </View>
            </View>
          </TouchableNativeFeedback>
          {form1 ? (
            <View
              style={{
                position: 'absolute',
                left: 5,
                bottom: -10,
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 10,
                }}>
                Pilih Bank Tujuan
              </Text>
            </View>
          ) : null}
        </View>
        <View style={[{marginTop: 10}]}>
          <InputPhone
            disable={false}
            value={rekening}
            onChangeText={bankAccountChange}
            keyboardType={'number-pad'}
            placeholder="Masukan Nomor Rekening"
            title="Rekening"
            contact={false}
            copas={false}
            minus={false}
            image={''}
            form={form4}
            titleForm="Masukan Nomor Rekening"
          />
        </View>
        <View style={[{marginTop: -5}]}>
          <InputPhone
            disable={false}
            value={amount}
            onChangeText={amountChange}
            keyboardType={'number-pad'}
            placeholder="Contoh : 100.000"
            title="Nominal"
            contact={false}
            copas={false}
            minus={false}
            image={''}
            form={form2}
            titleForm="Masukkan Nominal"
          />
        </View>
        <View style={[{marginTop: -10}, styles.ml5, styles.mr5]}>
          <InputText
            disable={false}
            value={alasan}
            onChangeText={alasanChange}
            keyboardType={'default'}
            placeholder="-"
            title="Alasan"
            contact={false}
            copas={false}
            minus={false}
            image=""
            form={form3}
            maxLength={30}
            titleForm="Masukkan Alasan"
          />
          <View
            style={{
              position: 'absolute',
              right: 20,
              bottom: 25,
            }}>
            <Text style={[styles.fs11, styles.black, styles.fontWSR]}>
              {alasan.length + '/30'}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.keteranganBaru,
            styles.mt5,
            styles.pt10,
            styles.pl15,
            styles.pr15,
            styles.pb10,
            styles.ml15,
            styles.mr15,
            {flexDirection:'row', alignItems:'center'}
          ]}>
          <SvgXml width={35} height={35} xml={IcWarningRound} />
          <View style={{marginLeft:15}}>
            <Text style={[styles.fs11, styles.fontWSB, styles.black]}>
              Informasi Penarikan Saldo
            </Text>
            <Text style={[styles.fs11, styles.fontWSR, styles.black, {width:250}]}>
              - Minimum Penarikan untuk semua bank Rp {minimum}
            </Text>
            <Text style={[styles.fs11, styles.fontWSR, styles.black, {width:250}]}>
              - Maksimal Penarikan untuk semua bank Rp {maximum}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerBtn}>
        <View
          style={[
            styles.row,
            styles.pl15,
            styles.pr15,
            styles.pb10,
            styles.pt10,
          ]}>
          <View style={styles.col70}>
            <Text style={styles.labelFooterBtn}>Jumlah Penarikan</Text>
            <Text style={[styles.fs15, styles.green, styles.fontWSB]}>
              Rp {amount ? amount : 0}
            </Text>
          </View>
          <View style={[styles.col30]}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#DDD')}
              onPress={() => {
                !isLoading ? checkTarik() : null;
              }}>
              <View style={[styles.buttonBeliGreen, styles.rightText]}>
                <Text
                  style={[
                    styles.bold,
                    styles.fs13,
                    styles.white,
                    styles.fontWSB,
                  ]}
                  uppercase={false}>
                  Lanjut
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>

      <Modal
        backdropOpacity={0.4}
        transparent={true}
        useNativeDriver={true}
        isVisible={modalTarikDana}
        onSwipeComplete={() => setModalTarikDana(false)}
        swipeDirection="down"
        onBackButtonPress={() => setModalTarikDana(false)}
        style={{
          margin: 0,
          flex:1,
          backgroundColor:'white',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
        >
        <ScrollView
          style={[styles.bgWhite]}
          contentContainerStyle={{marginVertical: 10, flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={['#4F6CFF', '#4F6CFF']}
              refreshing={isLoading}
              onRefresh={_onRefresh}
            />
          }>
          <View
            style={{
              width: 60,
              height: 8,
              borderRadius: 5,
              backgroundColor: '#E3E3E3',
              position: 'absolute',
              top: '0.5%',
              left: '42%',
              zIndex: 1,
            }}
          />

          {isMounted ? (
            <TouchableOpacity
              onPress={() => setModalTarikDana(false)}
              style={{
                position: 'relative',
                left: '87%',
                top: 0,
                zIndex: -1,
              }}>
              <SvgXml width={30} height={30} xml={IconCloseModal} />
            </TouchableOpacity>
          ) : null}

          <View style={[{marginTop: 8}]}>
            <View
              style={[
                styles.formSearchTarikDana,
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
                style={[
                  styles.fs15,
                  styles.black,
                  styles.fontWSR,
                  styles.col100,
                ]}
                placeholder="Cari Bank Tujuan ..."
                onChangeText={(text) => searchFilterFunction(text)}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace') {
                    setDataRes(dataResReal);
                  }
                }}
              />
            </View>
          </View>

          {dataRes.length > 0 ? (
            <>
              {dataRes.map((item, key) => (
                <ContentProduk
                  key={key}
                  onPress={() => choseBank(item)}
                  image={item.imgUrl}
                  operatorName={item.productName}
                />
              ))}
            </>
          ) : (
            <View style={styles.boxEmpty}>
              <SvgXml width={120} height={120} xml={IconEmpty} />
              {!isLoading ? (
                <Text style={styles.textEmpty}>Tidak Ada Data</Text>
              ) : null}
            </View>
          )}
        </ScrollView>
      </Modal>

    </SafeAreaView>
  );
};

export default TarikDana;
