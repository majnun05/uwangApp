import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  BackHandler,
  Platform,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiCashierAddTransaksi} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {
  getSnackBar_error,
  getSnackBar_success,
  getRupiah,
  getSession,
} from '../../helpers/Helpers';
import Header from '../../content/header/Header';
import styles from '../../assets/styles/Style';
import IconCalendarBlack from '../../assets/svg/calendar-black.svg';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const AddTransaction = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [idUser, setIdUser] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [hargaModal, setHargaModal] = useState('');
  const [hargaJual, setHargaJual] = useState('');
  const [qty, setQty] = useState('');
  const [dateTransaction, setDateTransaction] = useState(new Date());

  const isLogged = async () => {
    let idUser_ = await getSession('idUser').then((idUser) => {
      return idUser;
    });
    setIdUser(idUser_);
  };

  const hargaJualChange = (value, index) => {
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setHargaJual(getRupiah(valu));
    } else {
      setHargaJual('');
    }
  };

  const hargaModalChange = (value, index) => {
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setHargaModal(getRupiah(valu));
    } else {
      setHargaModal('');
    }
  };

  const changeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dateTransaction;

    setShow(Platform.OS === 'ios');
    if (event.type === 'neutralButtonPressed') {
      setDateTransaction(new Date(0));
    } else {
      setDateTransaction(currentDate);
    }
  };

  const _onRefresh = () => {
    setIsLoading(false);
  };

  const saveBarang = async () => {
    if (
      namaBarang === '' ||
      qty === '' ||
      qty === '0' ||
      hargaModal === '' ||
      hargaJual === ''
    ) {
      getSnackBar_error({
        title: 'Lengkapi Data',
        duration: 'LENGTH_INDEFINITE',
      });
    } else {
      setIsLoading(true);
      await useApiPost(apiCashierAddTransaksi(), {
        trxId: moment(dateTransaction)
          .format('YYYY-MM-DD HH:mm:ss')
          .replace(/[^0-9]/g, ''),
        resellerId: idUser,
        name: namaBarang,
        stock: '',
        unit: '',
        buyingPrice: hargaModal.replace(/[^0-9]/g, ''),
        sellingPrice: hargaJual.replace(/[^0-9]/g, ''),
        qty: qty,
        productType: 'TOPINDO',
        transactionDate: dateTransaction,
      })
        .then((res) => {
          setIsLoading(false);
          if (res.statusCode === 200) {
            getSnackBar_success({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
            navigation.push('Cashier');
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

    isLogged();

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Tambah Transaksi'}
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
        <View style={[styles.boxBottomBorder, styles.mb10, styles.pb15]}>
          <View style={styles.PulsaLabelPhone}>
            <Text style={[styles.PulsaTextPhone, styles.fontWSB]}>
              Nama Produk
            </Text>
          </View>
          <View style={styles.sectionForm}>
            <TextInput
              autoCorrect={false}
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              placeholder={`Contoh: Tomat 2Kg`}
              placeholderTextColor="#d2d2d2"
              value={namaBarang}
              onChangeText={(namaBarang) => setNamaBarang(namaBarang)}
            />
          </View>
          <View style={styles.PulsaLabelPhone}>
            <Text style={[styles.PulsaTextPhone, styles.fontWSB]}>
              Jumlah Produk
            </Text>
          </View>
          <View style={styles.sectionForm}>
            <TextInput
              autoCorrect={false}
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              keyboardType="numeric"
              placeholder={`Contoh: 1`}
              placeholderTextColor="#d2d2d2"
              value={qty}
              onChangeText={(qty) => setQty(qty)}
            />
          </View>
          <View style={styles.PulsaLabelPhone}>
            <Text style={[styles.PulsaTextPhone, styles.fontWSB]}>
              Harga Modal
            </Text>
          </View>
          <View style={styles.sectionForm}>
            <TextInput
              autoCorrect={false}
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              keyboardType="number-pad"
              placeholder={`Contoh: 10.000`}
              placeholderTextColor="#d2d2d2"
              value={hargaModal}
              onChangeText={hargaModalChange}
            />
          </View>
          <View style={styles.PulsaLabelPhone}>
            <Text style={[styles.PulsaTextPhone, styles.fontWSB]}>
              Harga Jual
            </Text>
          </View>
          <View style={styles.sectionForm}>
            <TextInput
              autoCorrect={false}
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              keyboardType="number-pad"
              placeholder={`Contoh: 15.000`}
              placeholderTextColor="#d2d2d2"
              value={hargaJual}
              onChangeText={hargaJualChange}
            />
          </View>
          <View style={styles.PulsaLabelPhone}>
            <Text style={[styles.PulsaTextPhone, styles.fontWSB]}>
              Tanggal Transaksi
            </Text>
          </View>
          <View style={styles.sectionForm}>
            <TextInput
              editable={false}
              autoCorrect={false}
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              placeholder={`Pilih Tanggal Transaksi`}
              placeholderTextColor="#d2d2d2"
              value={moment(dateTransaction).format('YYYY-MM-DD')}
            />
            {show && (
              <DateTimePicker
                maximumDate={new Date()}
                testID="dateTimePicker"
                value={dateTransaction}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={changeDate}
              />
            )}
            <TouchableOpacity
              style={styles.hrefContact}
              onPress={() => {
                setShow(true);
              }}>
              <SvgXml width={23} height={23} xml={IconCalendarBlack} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Ripple
        onPress={() => {
          !isLoading ? saveBarang() : null;
        }}
        style={[styles.btnBuyNowFormGreen, styles.mb20]}>
        <Text
          style={[styles.fs13, styles.white, styles.fontWSM]}
          uppercase={false}>
          Tambahkan
        </Text>
      </Ripple>
    </SafeAreaView>
  );
};

export default AddTransaction;
