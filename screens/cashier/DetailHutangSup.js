import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  BackHandler,
  RefreshControl,
  InteractionManager,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiCashierAddDataLoan} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {
  getSession,
  getSnackBar_error,
  getSnackBar_success,
  getRupiah,
} from '../../helpers/Helpers';
import Header from '../../content/header/Header';
import styles from '../../assets/styles/Style';
import IconProfile from '../../assets/svg/profile-kasir.svg';
import IconDuit from '../../assets/svg/duit.svg';
import IconBulanGrey from '../../assets/svg/bulan-grey.svg';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const DetailHutangSup = (props) => {
  let {params} = props.route;
  let peng = params.penghutang;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [jumlahbayar, setJumlahbayar] = useState('');
  const [idUser, setIdUser] = useState('');
  const [sisaHutang, setSisaHutang] = useState(0);
  const [hutang, setHutang] = useState(params.hutang);
  const [check, setCheck] = useState(params.check);
  const [id_member_loan, setIdMemberLoan] = useState(peng?.id_member_loan);
  const [name, setName] = useState(peng?.name);
  const [phone, setPhone] = useState(peng?.phone);
  const [address, setAddress] = useState(peng?.address);
  const [dateNow, setDateNow] = useState(
    moment(new Date()).format('dddd, Do MMMM YYYY h:mm'),
  );

  const showError = (isi) => {
    getSnackBar_error({
      title: isi,
      duration: 'LENGTH_INDEFINITE',
    });
  };

  const showSuccess = (isi) => {
    getSnackBar_success({
      title: isi,
      duration: 'LENGTH_INDEFINITE',
    });
  };

  const isLogged = async () => {
    let idUser_ = await getSession('idUser').then((idUser) => {
      return idUser;
    });
    setIdUser(idUser_);

    if (check === 'bayar') {
      let len = hutang;
      let results = [];
      sisaHutang_ = 0;
      for (let i = 0; i < len.length; i++) {
        let row = len[i];

        const {
          id_data_loan,
          idreseller,
          id_member_loan,
          title,
          amount,
          type,
        } = row;

        sisaHutang_ += parseInt(amount);

        results.push({
          id_data_loan,
          idreseller,
          id_member_loan,
          title,
          amount,
          type,
        });
      }

      setSisaHutang(sisaHutang_);
    }
  };

  const saveLoan = async () => {
    setIsLoading(true);
    await useApiPost(apiCashierAddDataLoan(), {
      idReseller: idUser,
      title: hutang[0].title,
      amount: hutang[0].amount,
      idMemberLoan: id_member_loan,
      type: 0,
      isSupplier: true,
    })
      .then((res) => {
        setIsLoading(false);
        if (res.statusCode === 200) {
          showSuccess(res.values.message);
          navigation.push('CatatSuccessSup', {
            type: 'catat',
            total: hutang[0].amount,
            message: 'Catat Hutang Berhasil',
          });
        } else {
          showError(res.values.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const payLoan = async () => {
    let valu = jumlahbayar.replace(/[^0-9]/g, '');
    if (valu === '' || valu === 0) {
      return showError('Masukkan Jumlah Bayar');
    } else {
      if (parseInt(valu) > parseInt(sisaHutang)) {
        return showError('Jumlah Bayar tidak boleh lebih dari total hutang');
      } else {
        setIsLoading(true);
        await useApiPost(apiCashierAddDataLoan(), {
          idReseller: idUser,
          title: 'Pembayaran Hutang',
          amount: -valu,
          idMemberLoan: id_member_loan,
          type: 1,
          isSupplier: true,
        })
          .then((res) => {
            setIsLoading(false);
            if (res.statusCode === 200) {
              showSuccess(res.values.message);
              navigation.push('CatatSuccessSup', {
                type: 'bayar',
                total: valu,
                message: 'Bayar Hutang Berhasil',
              });
            } else {
              showError(res.values.message);
            }
          })
          .catch((error) => {
            setIsLoading(false);
          });
      }
    }
  };

  const _onRefresh = () => {
    setIsLoading(false);
  };

  const jumlahbayarChange = (value, index) => {
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setJumlahbayar(getRupiah(valu));
    } else {
      setJumlahbayar('');
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

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Detail Hutang'}
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
          style={{
            backgroundColor: '#ECECEC',
            padding: 10,
            paddingTop: 15,
            paddingBottom: 15,
          }}>
          <View style={styles.row}>
            <View style={[styles.col15, styles.center]}>
              <SvgXml width={23} height={23} xml={IconDuit} />
            </View>
            <View style={styles.col85}>
              <Text style={[styles.black, styles.fs12, styles.leftText]}>
                Total Hutang
              </Text>
              <Text
                style={[
                  styles.orange,
                  styles.bold,
                  styles.leftText,
                  styles.fs13,
                ]}>
                Rp {' '}
                {check === 'bayar'
                  ? getRupiah(sisaHutang)
                  : getRupiah(hutang[0].amount)}
              </Text>
            </View>
          </View>
          <SvgXml
            width={50}
            height={50}
            style={{
              position: 'absolute',
              right: 0,
              bottom: -5,
              zIndex: -1,
            }}
            xml={IconBulanGrey}
          />
        </View>

        <View style={styles.boxListHutangDaftarDetail}>
          <View style={styles.row}>
            <View style={[styles.col20, styles.center]}>
              <SvgXml width={40} height={40} xml={IconProfile} />
            </View>
            <View style={[styles.col80, styles.pt5]}>
              <Text style={[styles.fs15, styles.fontWSB, styles.black]}>
                {name}
              </Text>
              <Text style={[styles.fs12, styles.grey92, styles.mt10]} note>
                {phone}
              </Text>
              <Text style={[styles.fs12, styles.grey92]} note>
                {address}
              </Text>
            </View>
          </View>
        </View>

        {check !== 'catat' ? (
          <View style={[styles.p10, styles.pb0]}>
            <Text style={[styles.PulsaTextPhone, styles.fontWSB, styles.pl5]}>
              Jumlah Bayar
            </Text>
            <View style={styles.sectionForm}>
              <TextInput
                style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
                placeholderTextColor="#d2d2d2"
                keyboardType="number-pad"
                value={jumlahbayar}
                onChangeText={jumlahbayarChange}
                placeholder={`contoh: 10.000`}
              />
            </View>
          </View>
        ) : null}

        <View style={[styles.PulsaLabelPhone, styles.pl10, styles.mt10]}>
          <Text style={[styles.PulsaTextPhoneNotHeight, styles.fontWSB]}>
            Riwayat Transaksi
          </Text>
        </View>

        <View style={styles.mb20}>
          {hutang.map((item, key) => (
            <View style={styles.detailHutangTop} key={key}>
              <Text style={[styles.greyB7, styles.bold, styles.fs13]}>
                {check !== 'catat' ? parseInt(key + 1) + '. ' : null}
                {item.title}
              </Text>
              <Text style={[styles.orange, styles.bold, styles.fs12]}>
                Rp  {item.amount ? getRupiah(item.amount) : item.amount}
              </Text>
              <Text style={[styles.greyB7, styles.fs11, styles.mt10]}>
                {check === 'catat'
                  ? dateNow
                  : moment(item.created_date).format('dddd, Do MMMM YYYY h:mm')}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Ripple
        onPress={() => {
          if (!isLoading) {
            if (check === 'catat') {
              saveLoan();
            } else {
              payLoan();
            }
          }
        }}
        style={[styles.btnBuyNowFormGreen, styles.mb20]}>
        {check === 'catat' ? (
          <Text
            style={[styles.fs13, styles.white, styles.fontWSM]}
            uppercase={false}>
            {isLoading ? 'Loading...' : 'Simpan Hutang'}
          </Text>
        ) : (
          <Text
            style={[styles.fs13, styles.white, styles.fontWSM]}
            uppercase={false}>
            {isLoading ? 'Loading...' : 'Bayar Hutang'}
          </Text>
        )}
      </Ripple>
    </SafeAreaView>
  );
};

export default DetailHutangSup;
