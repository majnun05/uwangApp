import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
  RefreshControl,
  InteractionManager,
} from 'react-native';
// import Clipboard from '@react-native-community/clipboard';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useApiPost, useError} from '../../helpers/useFetch';
import {apiUtilityConfig} from '../../helpers/endPoint';
import {
  getSnackBar_error,
  getRupiah,
  getSession,
  getSnackBar_success,
} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import IconWarning from '../../assets/svg/warning.svg';
import IconIntersect from '../../assets/svg/intersect2.svg';
import IconCopy from '../../assets/svg/copypaste.svg';
import IconIndomaret from '../../assets/svg/indomaret.svg';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const TopupIndomaretDone = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentCode, setPaymentCode] = useState(params.dataIndo.payNo);
  const [total, setTotal] = useState(
    params.dataIndo.total.replace(/[^0-9]/g, ''),
  );
  const [total_admin, setTotalAdmin] = useState(0);
  const [ket, setKet] = useState('');
  let isMounted = true;

  const isLogged = async () => {
    await useApiPost(apiUtilityConfig(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setTotalAdmin(val.values.admin_fee_indomart);
            setKet(
              val.values.keteranganTopupIndo
                ? val.values.keteranganTopupIndo
                : 'Uwang Via Plasa Mall',
            );
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

  const copy = (rek) => {
    getSnackBar_success({
      title: 'Kode Pembayaran telah disalin',
      duration: 'LENGTH_INDEFINITE',
    });
    // Clipboard.setString(rek);
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home');
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

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.navigate('Home')}
        title={'Indomaret'}
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
        <View
          style={[
            styles.keteranganBaru,
            styles.mr0,
            styles.mt0,
            styles.ml0,
            styles.pt20,
            styles.pb20,
          ]}>
          <View style={styles.row}>
            <View style={[styles.col15, styles.center]}>
              <SvgXml width={40} height={40} xml={IconWarning} />
            </View>
            <View style={[styles.col85, styles.pl10]}>
              <Text style={[styles.fs13, styles.fontWSB, styles.black]}>
                Segera Lakukan Pembayaran
              </Text>
              <Text
                style={[styles.fs12, styles.fontWSR, styles.black, styles.mt5]}>
                Batas waktu untuk pembayaran adalah{' '}
                <Text style={[styles.fs11, styles.fontWSB, styles.black]}>
                  2 jam
                </Text>
                {' \n'}
                setelah transaksi
              </Text>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              zIndex: -1,
              bottom: '-12%',
              right: '0%',
              borderTopRightRadius: 100,
              borderTopLeftRadius: 100,
            }}>
            <SvgXml width={70} height={70} xml={IconIntersect} />
          </View>
        </View>

        <View style={[styles.boxTopupPayBottom, styles.mt0]}>
          <View style={[styles.row, styles.pl10, styles.pr10]}>
            <View style={[styles.col15, styles.centerOnly]}>
              <SvgXml width={60} height={30} xml={IconIndomaret} />
            </View>
            <View style={[styles.col85, styles.pl10]}>
              <Text style={[styles.fs13, styles.black, styles.fontWSB]}>
                Indomaret
              </Text>
              <Text
                style={[
                  styles.fs11,
                  styles.grey92,
                  styles.fontWSR,
                  styles.mt5,
                ]}>
                Kode Pembayaran
              </Text>
              <TouchableOpacity
                style={styles.row}
                onPress={() => copy(paymentCode)}>
                <Text style={[styles.fs18, styles.green, styles.fontWSB]}>
                  {paymentCode}
                </Text>
                <View
                  style={[
                    styles.row,
                    styles.ml10,
                    styles.leftText,
                    styles.mt5,
                  ]}>
                  <SvgXml width={15} height={15} xml={IconCopy} />
                  <Text
                    style={[
                      styles.fs10,
                      styles.grey75,
                      styles.fontWSB,
                      styles.ml5,
                    ]}>
                    Salin
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.boxTopupPayBottom,
            styles.mt0,
            styles.pl15,
            styles.pr15,
          ]}>
          <Text
            style={[styles.fs15, styles.black, styles.fontWSB, styles.mb10]}>
            Rincian
          </Text>
          <View style={[styles.row, styles.listDone]}>
            <View style={styles.col50}>
              <Text style={[styles.black, styles.fs13, styles.fontWSR]}>
                Nominal
              </Text>
            </View>
            <View style={styles.col50}>
              <Text
                style={[
                  styles.rightText,
                  styles.greyB7,
                  styles.fs13,
                  styles.fontWSR,
                ]}>
                Rp  {getRupiah(total ? total : 0)}
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.listDone]}>
            <View style={styles.col50}>
              <Text style={[styles.black, styles.fs13, styles.fontWSR]}>
                Biaya Admin
              </Text>
            </View>
            <View style={styles.col50}>
              <Text
                style={[
                  styles.rightText,
                  styles.greyB7,
                  styles.fs13,
                  styles.fontWSR,
                ]}>
                Rp  {getRupiah(total_admin ? total_admin : 0)}
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.listDone]}>
            <View style={styles.col50}>
              <Text style={[styles.black, styles.fs13, styles.fontWSR]}>
                Saldo yang masuk
              </Text>
            </View>
            <View style={styles.col50}>
              <Text
                style={[
                  styles.rightText,
                  styles.greyB7,
                  styles.fs13,
                  styles.fontWSR,
                ]}>
                Rp  {getRupiah(parseInt(total - total_admin))}
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.listDone]}>
            <View style={styles.col50}>
              <Text style={[styles.black, styles.fs13, styles.fontWSB]}>
                Jumlah yang harus dibayar
              </Text>
            </View>
            <View style={styles.col50}>
              <Text
                style={[
                  styles.rightText,
                  styles.green,
                  styles.fs13,
                  styles.fontWSB,
                ]}>
                Rp  {getRupiah(parseInt(total ? total : 0))}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.boxTopupPayBottomLast, styles.mt0]}>
          <Text
            style={[
              styles.fs15,
              styles.black,
              styles.fontWSB,
              styles.mb10,
              styles.pl5,
            ]}>
            Petunjuk Pembayaran
          </Text>
          <View style={[styles.row, styles.pt5, styles.pl10, styles.pr10]}>
            <View style={[styles.col10, styles.centerOnly, styles.pt5]}>
              <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                1.
              </Text>
            </View>
            <View
              style={[
                styles.col90,
                styles.pb10,
                styles.borderBottom1,
                styles.centerContent,
              ]}>
              <Text style={[styles.fs13, styles.black, styles.fontWSR]}>
                Tunjukan Kode pembayaran{' '}
                <Text style={[styles.fs13, styles.black, styles.fontWSB]}>
                  {paymentCode}
                </Text>{' '}
                kepada kasir Indomaret, sampaikan ingin melakukan pembayaran{' '}
                <Text style={[styles.fs13, styles.black, styles.fontWSB]}>
                  {ket}
                </Text>
                , kemudian lakukan pembayaran sesuai angka diatas.
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.pl10, styles.pr10]}>
            <View style={[styles.col10, styles.centerOnly, styles.pt5]}>
              <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                2.
              </Text>
            </View>
            <View
              style={[
                styles.col90,
                styles.pb10,
                styles.borderBottom1,
                styles.centerContent,
              ]}>
              <Text style={[styles.fs13, styles.black, styles.fontWSR]}>
                Simpan juga bukti pembayaran yang diberikan oleh kasir
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.pl10, styles.pr10]}>
            <View style={[styles.col10, styles.centerOnly, styles.pt5]}>
              <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                3.
              </Text>
            </View>
            <View
              style={[
                styles.col90,
                styles.pb10,
                styles.borderBottom1,
                styles.centerContent,
              ]}>
              <Text style={[styles.fs13, styles.black, styles.fontWSR]}>
                Biaya Admin diterapkan oleh Minimarket dan Payment gateway.
                Uwang Hanya fasilitator
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.pl15, styles.pr15]}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#DDD')}
          onPress={() => navigation.navigate('Home')}>
          <View style={[styles.btnBuyNow, styles.mb10, {borderRadius: 5}]}>
            <Text
              style={[styles.bold, styles.fs13, styles.white, styles.fontWSB]}
              uppercase={false}>
              Selesai
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </SafeAreaView>
  );
};

export default TopupIndomaretDone;
