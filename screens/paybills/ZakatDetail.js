import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
  InteractionManager,
  TextInput,
  Image,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiUtilityReference, apiUtilityConfig} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSession, getSnackBar_error, getRupiah} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import ModalDetail from '../../content/modal/ModalDetail';
import Keterangan from '../../content/fitur/Keterangan';
import IconCalculator from '../../assets/svg/calculator.svg';

const VoucherGameDetail = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalDetail, setModalDetail] = useState(false);
  const [minimumZakat, setMinimumZakat] = useState(0);
  const [totalHitung, setTotalHitung] = useState('');
  const [amount, setAmount] = useState('');
  const [tabungan, setTabungan] = useState('');
  const [simpanan, setSimpanan] = useState('');
  const [aset, setAset] = useState('');
  const [harta, setHarta] = useState('');
  const [hutang, setHutang] = useState('');
  const [form, setForm] = useState(false);
  const [form1, setForm1] = useState(false);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);
  const [form4, setForm4] = useState(false);
  const [form5, setForm5] = useState(false);
  const [produk, setProduk] = useState('Zakat');
  const [adminFee, setAdminFee] = useState(0);
  const [detail, setDetail] = useState(params.detail);
  const [tabs, setTabs] = useState('zakat');
  const [imageDefault, setImageDefault] = useState('');
  const [ktr, setKtr] = useState({title: '', message: '', active: false});
  const [message2, setMessage2] = useState('Masukkan Nomor Pelanggan');
  let isMounted = true;

  const isLogged = async () => {
    let imgDef = await getSession('imageDefault').then((imageDefault) => {
      return imageDefault;
    });
    if (isMounted) {
      setImageDefault(imgDef);
    }
    getRef();

    await useApiPost(apiUtilityReference(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            let kets = val.values.ketZakatDetail;
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

  const getRef = async () => {
    await useApiPost(apiUtilityConfig(), {})
      .then((res) => {
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values;
            setMinimumZakat(val.values.minimum_zakat);
            setAdminFee(val.values.admin_zakat);
          } else if (res.statusCode === 500) {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          } else {
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

  const amountChange = (value, index) => {
    setForm(false);
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setAmount(getRupiah(valu));
    } else {
      setAmount('');
    }
  };

  const changeTabs = (data) => {
    setTabs(data);
  };

  const tabunganChange = (value, index) => {
    setForm1(false);
    setTotalHitung(0);
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setTabungan(getRupiah(valu));
    } else {
      setTabungan('');
    }
  };

  const simpananChange = (value, index) => {
    setForm2(false);
    setTotalHitung(0);
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setSimpanan(getRupiah(valu));
    } else {
      setSimpanan('');
    }
  };

  const asetChange = (value, index) => {
    setForm3(false);
    setTotalHitung(0);
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setAset(getRupiah(valu));
    } else {
      setAset('');
    }
  };

  const hartaChange = (value, index) => {
    setForm4(false);
    setTotalHitung(0);
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setHarta(getRupiah(valu));
    } else {
      setHarta('');
    }
  };

  const hutangChange = (value, index) => {
    setForm5(false);
    setTotalHitung(0);
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setHutang(getRupiah(valu));
    } else {
      setHutang('');
    }
  };

  const hitungZakat = () => {
    // if (
    //   tabungan === '' ||
    //   simpanan === '' ||
    //   aset === '' ||
    //   harta === '' ||
    //   hutang === ''
    // ) {
    //   tabungan ? setForm1(false) : setForm1(true);
    //   simpanan ? setForm2(false) : setForm2(true);
    //   aset ? setForm3(false) : setForm3(true);
    //   harta ? setForm4(false) : setForm4(true);
    //   hutang ? setForm5(false) : setForm5(true);
    //   setTotalHitung(0);
    // } else {

    // }

    let tab = tabungan ? tabungan.replace(/[^0-9]/g, '') : 0;
    let sim = simpanan ? simpanan.replace(/[^0-9]/g, '') : 0;
    let ase = aset ? aset.replace(/[^0-9]/g, '') : 0;
    let har = harta ? harta.replace(/[^0-9]/g, '') : 0;
    let hut = hutang ? hutang.replace(/[^0-9]/g, '') : 0;
    let totalHar = parseInt(
      parseInt(tab) + parseInt(sim) + parseInt(ase) + parseInt(har),
    );
    let totalHit = parseInt(parseInt(totalHar) - parseInt(hut));
    let totalSemua = parseInt(parseInt(totalHit) * 0.025);
    if (parseInt(totalSemua) >= parseInt(minimumZakat)) {
      setTotalHitung(totalSemua);
    } else {
      setTotalHitung(totalSemua);
      getSnackBar_error({
        title: 'Kamu belum wajib bayar zakat maal',
        duration: 'LENGTH_LONG',
      });
    }
  };

  const bayarZakat = () => {
    if (amount === '') {
      getSnackBar_error({
        title: 'Masukkan Nilai Zakat',
        duration: 'LENGTH_LONG',
      });
    } else {
      let amo = amount.replace(/[^0-9]/g, '');
      if (parseInt(amo) >= parseInt(minimumZakat)) {
        setModalDetail(true);
      } else {
        getSnackBar_error({
          title: 'Kamu belum wajib bayar zakat maal',
          duration: 'LENGTH_LONG',
        });
      }
    }
  };

  const bayarHitungZakat = () => {
    if (totalHitung === '') {
      getSnackBar_error({
        title: 'Masukkan Nilai Zakat',
        duration: 'LENGTH_LONG',
      });
    } else {
      if (parseInt(totalHitung) >= parseInt(minimumZakat)) {
        setAmount(getRupiah(totalHitung));
        setTabs('zakat');
      } else {
        getSnackBar_error({
          title: 'Kamu belum wajib bayar zakat maal',
          duration: 'LENGTH_LONG',
        });
      }
    }
  };

  const payment = () => {
    if (amount === '') {
      getSnackBar_error({
        title: 'Masukkan Nilai Zakat',
        duration: 'LENGTH_LONG',
      });
    } else {
      setModalDetail(false);
      let amo = amount.replace(/[^0-9]/g, '');

      let det = {
        description: detail.description,
        imgUrl: detail.imgUrl,
        isBug: detail.isBug,
        point: detail.point,
        price: amount,
        priceReal: amo,
        productCode: detail.productCode,
        productName: amount,
      };

      return navigation.push('Confirm', {
        detail: det,
        sendTo: '',
        tagihan: '0',
        totalTagihan: getRupiah(
          parseInt(parseInt(amo) + parseInt(adminFee ? adminFee : 0)),
        ),
        detailTrx: [],
        allDetailTrx: '',
        phone: '',
        nominal: amo,
        operatorName: detail.productName,
        admin: getRupiah(adminFee ? adminFee : 0),
        produk: produk,
        page: 'elektrik',
      });
    }
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={detail.productName}
        shadow={true}
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
        <View style={[styles.center, styles.bgBlue, styles.pt20, styles.pb20]}>
          <View
            style={[
              styles.bgWhite,
              styles.pt10,
              styles.pb10,
              styles.pl10,
              styles.pr10,
              {borderRadius: 5},
            ]}>
            <Image
              resizeMethod="resize"
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 140,
                height: 50,
                resizeMode: 'contain',
              }}
              source={{uri: detail.imgUrl ? detail.imgUrl : imageDefault}}
            />
          </View>
          <Text
            style={[
              styles.titleProductZakat,
              styles.mt10,
              styles.mb30,
              styles.white,
            ]}
            numberOfLines={2}
            ellipsizeMode="tail">
            {detail.productName}
          </Text>
        </View>
        <View style={[styles.row, styles.tabBox, {marginTop: -30}]}>
          <TouchableOpacity
            style={[
              styles.col50,
              styles.center,
              tabs === 'zakat' ? styles.tabBodyActive : null,
            ]}
            onPress={() => changeTabs('zakat')}>
            <Text
              style={[
                styles.fs13,
                tabs === 'zakat' ? styles.white : styles.grey92,
                styles.fontWSB,
              ]}>
              Zakat
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.col50,
              styles.center,
              tabs === 'lainnya' ? styles.tabBodyActive : null,
            ]}
            onPress={() => changeTabs('lainnya')}>
            <Text
              style={[
                styles.fs13,
                tabs === 'lainnya' ? styles.white : styles.grey92,
                styles.fontWSB,
              ]}>
              Hitung Zakat
            </Text>
          </TouchableOpacity>
        </View>

        {tabs === 'zakat' ? (
          <>
            <View style={[styles.pl15, styles.pr15]}>
              <View style={styles.PulsaLabelPhone}>
                <Text
                  style={[styles.PulsaTextPhone, styles.fontWSB, styles.mt5]}>
                  Masukkan Nilai Zakat
                </Text>
              </View>

              <View
                style={[
                  styles.sectionForm,
                  form ? styles.mb10 : null,
                  {borderBottomColor: form ? 'red' : '#ddd'},
                ]}>
                <TextInput
                  editable={true}
                  autoCorrect={false}
                  style={[
                    amount
                      ? styles.PulsaInputBoxNewPhone
                      : styles.PulsaInputBoxNewPhoneEmpty,
                  ]}
                  placeholderTextColor="#CFCFCF"
                  placeholder={'Rp  1.000.000'}
                  keyboardType={'number-pad'}
                  value={amount}
                  onChangeText={amountChange}
                />
              </View>
            </View>

            <Ripple
              onPress={() => {
                if (amount) {
                  !isLoading ? bayarZakat() : null;
                }
              }}
              style={[
                amount ? styles.btnBuyNowForm : styles.btnBuyNowFormEmpty,
                styles.ml20,
                styles.mr20,
              ]}>
              <Text
                style={[styles.fs13, styles.white, styles.fontWSM]}
                uppercase={false}>
                Bayar Zakat
              </Text>
            </Ripple>

            {ktr.active ? (
              <View style={[styles.mt10, styles.ml5, styles.mr5]}>
                <Keterangan menu="normal" title={ktr.title} msg={ktr.message} />
              </View>
            ) : null}
          </>
        ) : (
          <>
            <View style={[styles.mb5, styles.pb5, styles.pl15, styles.pr15]}>
              <View style={styles.PulsaLabelPhone}>
                <Text
                  style={[styles.PulsaTextPhone, styles.fontWSB, styles.mt5]}>
                  Nilai tabungan, deposito & giro
                </Text>
              </View>

              <View
                style={[
                  styles.sectionForm,
                  form1 ? styles.mb15 : null,
                  {borderBottomColor: form1 ? 'red' : '#ddd'},
                ]}>
                <TextInput
                  editable={true}
                  autoCorrect={false}
                  style={[
                    tabungan
                      ? styles.PulsaInputBoxNewPhone
                      : styles.PulsaInputBoxNewPhoneEmpty,
                  ]}
                  placeholderTextColor="#CFCFCF"
                  placeholder={'Masukkan Nilai tabungan, deposito & giro'}
                  keyboardType={'number-pad'}
                  value={tabungan}
                  onChangeText={tabunganChange}
                />
                {form1 ? (
                  <View style={{position: 'absolute', left: 0, bottom: -18}}>
                    <Text style={{color: 'red', fontSize: 10}}>
                      Masukkan Nilai tabungan, deposito & giro
                    </Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.PulsaLabelPhone}>
                <Text
                  style={[styles.PulsaTextPhone, styles.fontWSB, styles.mt5]}>
                  Nilai simpanan emas & perak
                </Text>
              </View>

              <View
                style={[
                  styles.sectionForm,
                  form2 ? styles.mb15 : null,
                  {borderBottomColor: form2 ? 'red' : '#ddd'},
                ]}>
                <TextInput
                  editable={true}
                  autoCorrect={false}
                  style={[
                    simpanan
                      ? styles.PulsaInputBoxNewPhone
                      : styles.PulsaInputBoxNewPhoneEmpty,
                  ]}
                  placeholderTextColor="#CFCFCF"
                  placeholder={'Masukkan Nilai simpanan emas & perak'}
                  keyboardType={'number-pad'}
                  value={simpanan}
                  onChangeText={simpananChange}
                />
                {form2 ? (
                  <View style={{position: 'absolute', left: 0, bottom: -18}}>
                    <Text style={{color: 'red', fontSize: 10}}>
                      Masukkan Nilai simpanan emas & perak
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.PulsaLabelPhone}>
                <Text
                  style={[styles.PulsaTextPhone, styles.fontWSB, styles.mt5]}>
                  Aset tidak bergerak
                </Text>
              </View>

              <View
                style={[
                  styles.sectionForm,
                  form3 ? styles.mb15 : null,
                  {borderBottomColor: form3 ? 'red' : '#ddd'},
                ]}>
                <TextInput
                  editable={true}
                  autoCorrect={false}
                  style={[
                    aset
                      ? styles.PulsaInputBoxNewPhone
                      : styles.PulsaInputBoxNewPhoneEmpty,
                  ]}
                  placeholderTextColor="#CFCFCF"
                  placeholder={'Masukkan Aset tidak bergerak'}
                  keyboardType={'number-pad'}
                  value={aset}
                  onChangeText={asetChange}
                />
                {form3 ? (
                  <View style={{position: 'absolute', left: 0, bottom: -18}}>
                    <Text style={{color: 'red', fontSize: 10}}>
                      Masukkan Aset tidak bergerak
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.PulsaLabelPhone}>
                <Text
                  style={[styles.PulsaTextPhone, styles.fontWSB, styles.mt5]}>
                  Surat berharga, harta niaga, piutang
                </Text>
              </View>

              <View
                style={[
                  styles.sectionForm,
                  form4 ? styles.mb15 : null,
                  {borderBottomColor: form4 ? 'red' : '#ddd'},
                ]}>
                <TextInput
                  editable={true}
                  autoCorrect={false}
                  style={[
                    harta
                      ? styles.PulsaInputBoxNewPhone
                      : styles.PulsaInputBoxNewPhoneEmpty,
                  ]}
                  placeholderTextColor="#CFCFCF"
                  placeholder={'Masukkan Surat berharga, harta niaga, piutang'}
                  keyboardType={'number-pad'}
                  value={harta}
                  onChangeText={hartaChange}
                />
                {form4 ? (
                  <View style={{position: 'absolute', left: 0, bottom: -18}}>
                    <Text style={{color: 'red', fontSize: 10}}>
                      Masukkan Surat berharga, harta niaga, piutang
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.PulsaLabelPhone}>
                <Text
                  style={[styles.PulsaTextPhone, styles.fontWSB, styles.mt5]}>
                  Jumlah utang / cicilan
                </Text>
              </View>

              <View
                style={[
                  styles.sectionForm,
                  form5 ? styles.mb15 : null,
                  {borderBottomColor: form5 ? 'red' : '#ddd'},
                ]}>
                <TextInput
                  editable={true}
                  autoCorrect={false}
                  style={[
                    hutang
                      ? styles.PulsaInputBoxNewPhone
                      : styles.PulsaInputBoxNewPhoneEmpty,
                  ]}
                  placeholderTextColor="#CFCFCF"
                  placeholder={'Masukkan Jumlah utang / cicilan'}
                  keyboardType={'number-pad'}
                  value={hutang}
                  onChangeText={hutangChange}
                />
                {form5 ? (
                  <View style={{position: 'absolute', left: 0, bottom: -18}}>
                    <Text style={{color: 'red', fontSize: 10}}>
                      Masukkan Jumlah utang / cicilan
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>

            <View
              style={[
                styles.bgBlue,
                styles.ml20,
                styles.mr20,
                styles.pl20,
                styles.pt15,
                styles.pb15,
                styles.row,
                styles.mb10,
                {borderRadius: 5},
              ]}>
              <View style={styles.col20}>
                <SvgXml width={50} height={50} xml={IconCalculator} />
              </View>
              <View style={styles.col60}>
                <Text
                  style={[
                    styles.fs12,
                    styles.white,
                    styles.fontWSM,
                    styles.centerText,
                  ]}
                  uppercase={false}>
                  Wajib Bayar Zakat
                </Text>
                <Text
                  style={[
                    styles.fs20,
                    styles.white,
                    styles.fontWSB,
                    styles.centerText,
                  ]}
                  uppercase={false}>
                  Rp  {getRupiah(totalHitung ? totalHitung : 0)}
                </Text>
              </View>
              <View style={styles.col20} />
            </View>
          </>
        )}
      </ScrollView>
      {tabs === 'lainnya' ? (
        <Ripple
          onPress={() => {
            if (parseInt(totalHitung) > 0) {
              bayarHitungZakat();
            } else {
              hitungZakat();
            }
          }}
          style={[
            styles.btnBuyNowForm,
            styles.ml20,
            styles.mr20,
            styles.mb10,
            styles.mt10,
          ]}>
          <Text
            style={[styles.fs13, styles.white, styles.fontWSM]}
            uppercase={false}>
            {parseInt(totalHitung) > 0 ? 'Bayar Zakat' : 'Hitung Zakat'}
          </Text>
        </Ripple>
      ) : null}

      <ModalDetail
        donasi={true}
        close={true}
        operatorName={detail.productName}
        modal={'normal'}
        isVisible={modalDetail}
        onSwipeComplete={() => setModalDetail(false)}
        title={'Detail Zakat'}
        titleDonasi={'Nilai Zakat'}
        //produk
        productName={amount}
        productCode={detail.productCode}
        description={detail.description}
        price={amount}
        totalPrice={getRupiah(
          parseInt(
            parseInt(amount ? amount.replace(/[^0-9]/g, '') : 0) +
              parseInt(adminFee ? adminFee : 0),
          ),
        )}
        admin={'Rp  ' + getRupiah(adminFee ? adminFee : 0)}
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
