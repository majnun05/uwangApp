import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  Text,
  TouchableNativeFeedback,
  RefreshControl,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {apiTarikDanaAction} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_error} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import TopupPage from '../../content/fitur/TopupPage';
import ModalPin from '../../content/modal/ModalPin';
import IconWarning from '../../assets/svg/warning.svg';
import IconIntersect from '../../assets/svg/intersect2.svg';

const TarikDanaDetail = (props) => {
  let {params} = props.route;
  let det = params.detail;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [modalPin, setModalPin] = useState(false);
  const [bankCode, setBankCode] = useState(det.bankCode);
  const [alasan, setAlasan] = useState(det.alasan);
  const [fee, setFee] = useState(det.fee);
  const [admin, setAdmin] = useState(det.admin);
  const [rekening, setrekening] = useState(det.rekening);
  const [amount, setAmount] = useState(det.amount);
  const [total, setTotal] = useState(det.total);
  const [detail, setdetail] = useState(det.data);
  const [allMessage, setallMessage] = useState(det.allMessage);
  const [balance, setbalance] = useState(det.balance);
  const [balanceReal, setbalanceReal] = useState(det.balanceReal);
  const [pin, setPin] = useState('');

  const _onRefresh = () => {
    setIsLoading(false);
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

    return () => backHandler.remove();
  }, []);

  const payNow = () => {
    setModalPin(true);
  };

  const pay = async () => {
    if (pin === '') {
      return getSnackBar_error({
        title: 'Masukkan PIN Anda',
        duration: 'LENGTH_LONG',
      });
    } else {
      let amo = amount ? amount.replace(/[^0-9]/g, '') : amount;
      setIsLoading(true);
      setModalPin(false);
      await useApiPost(apiTarikDanaAction(), {
        pin: pin,
        productCode: bankCode,
        phone: rekening + '@' + amo,
        sendTo: '',
        type: '6',
        counter: 1,
      })
        .then((res) => {
          setIsLoading(false);
          if (res.statusCode === 200) {
            navigation.push('TarikDanaSuccess', {
              total: total,
              message: res.values.message,
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

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Konfirmasi Penarikan'}
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
        <View style={{height: 35, backgroundColor: '#4F6CFF'}} />
        <TopupPage balance={balance} navigation={navigation} />

        <View style={[styles.boxOrder]}>
          {detail.length > 0 ? (
            detail.map((item, key) => (
              <View style={[styles.row, styles.listPaymentBorder]} key={key}>
                <View style={styles.col40}>
                  <Text style={[styles.black, styles.fs12]}>{item.title}</Text>
                </View>
                <View style={styles.col60}>
                  <Text style={[styles.rightText, styles.black, styles.fs12]}>
                    {item.values}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={[styles.row, styles.listPayment]}>
              <View style={styles.col100}>
                <Text style={[styles.black, styles.fs12]}>{allMessage}</Text>
              </View>
            </View>
          )}

          <View style={[styles.row, styles.listPayment]}>
            <View style={styles.col20}>
              <Text style={[styles.black, styles.fs12]}>Alasan</Text>
            </View>
            <View style={styles.col80}>
              <Text
                style={[
                  styles.rightText,
                  styles.black,
                  styles.fs12,
                  styles.right,
                ]}>
                {alasan ? alasan : '-'}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.centerContent,
            styles.bgWhite,
            styles.pr15,
            styles.pl15,
            styles.mt10,
          ]}>
          <Text
            style={[styles.fs13, styles.greyB7, styles.fontWSB, styles.mb5]}>
            Detail Penarikan
          </Text>
        </View>

        <View style={[styles.boxOrder, styles.mt5]}>
          <View style={[styles.row, styles.listPaymentBorder]}>
            <View style={styles.col40}>
              <Text style={[styles.black, styles.fs12]}>Nominal</Text>
            </View>
            <View style={styles.col60}>
              <Text style={[styles.rightText, styles.black, styles.fs12]}>
                Rp  {amount}
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.listPaymentBorder]}>
            <View style={styles.col40}>
              <Text style={[styles.black, styles.fs12]}>Biaya Admin</Text>
            </View>
            <View style={styles.col60}>
              <Text style={[styles.rightText, styles.black, styles.fs12]}>
                Rp  {admin}
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.listPaymentBorder]}>
            <View style={styles.col40}>
              <Text style={[styles.black, styles.fs12]}>Cashback</Text>
            </View>
            <View style={styles.col60}>
              <Text style={[styles.rightText, styles.black, styles.fs12]}>
                Rp  {fee}
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.listPayment]}>
            <View style={styles.col40}>
              <Text style={[styles.black, styles.fs12]}>Total Penarikan</Text>
            </View>
            <View style={styles.col60}>
              <Text
                style={[
                  styles.rightText,
                  styles.black,
                  styles.fs13,
                  styles.bold,
                ]}>
                Rp  {total}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.keteranganBaru, styles.mt10, styles.mb20]}>
          <View style={styles.row}>
            <View style={[styles.col15, styles.centerOnly, styles.pt5]}>
              <SvgXml width={40} height={40} xml={IconWarning} />
            </View>
            <View style={[styles.col85, styles.pl10]}>
              <Text style={[styles.fs12, styles.fontWSB, styles.black]}>
                Keterangan
              </Text>
              <Text
                style={[styles.fs11, styles.fontWSR, styles.black, styles.mt5]}>
                Pastikan data transaksi sudah benar.
              </Text>
              <Text
                style={[styles.fs11, styles.fontWSR, styles.black, styles.mt5]}>
                Transaksi tidak dapat dibatalkan jika transaksi sudah sukses.
              </Text>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              zIndex: -1,
              bottom: '-5%',
              right: '0%',
              borderTopRightRadius: 100,
              borderTopLeftRadius: 100,
            }}>
            <SvgXml width={70} height={70} xml={IconIntersect} />
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
            <Text style={styles.labelFooterBtn}>Total Penarikan</Text>

            <Text style={[styles.fs15, styles.green, styles.fontWSB]}>
              Rp  {total}
            </Text>
          </View>
          <View style={[styles.col30]}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#DDD')}
              onPress={() => {
                !isLoading ? payNow() : null;
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

      <ModalPin
        isLoading={isLoading}
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalPin}
        onSwipeComplete={() => {
          !isLoading ? setModalPin(false) : null;
        }}
        value={pin}
        onChangeText={(pin) => setPin(pin)}
        title={'Konfirmasi PIN'}
        titleClose={'Batal'}
        titleButton={'Tarik'}
        onPressClose={() => {
          !isLoading ? setModalPin(false) : null;
        }}
        onPress={() => {
          !isLoading ? pay() : null;
        }}
      />
    </SafeAreaView>
  );
};

export default TarikDanaDetail;
