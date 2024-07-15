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
  Image,
} from 'react-native';
// import Clipboard from '@react-native-community/clipboard';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useApiPost, useError} from '../../helpers/useFetch';
import {apiUtilityReference} from '../../helpers/endPoint';
import {getSnackBar_error, getSnackBar_success} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import IconTop from '../../assets/svg/top.svg';
import IconBottom from '../../assets/svg/bottom.svg';
import IconCopy from '../../assets/svg/copypaste.svg';
import IconBca from '../../assets/svg/bank/bca.svg';
import IconBni from '../../assets/svg/bank/bni.svg';
import IconBri from '../../assets/svg/bank/bri.svg';
import IconMandiri from '../../assets/svg/bank/mandiri.svg';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const TopupQris = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(params.amount);
  const [dataBank, setDataBank] = useState([]);
  const [detailBank, setDetailBank] = useState({});
  let isMounted = true;

  const isLogged = async () => {
    await useApiPost(apiUtilityReference(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values.values;
            let dats = [
              {
                id: 1,
                icon: 'bca',
                name: val.bcaName,
                number: val.bcaNumber,
              },
              {
                id: 2,
                icon: 'bni',
                name: val.bniName,
                number: val.bniNumber,
              },
              {
                id: 3,
                icon: 'bri',
                name: val.briName,
                number: val.briNumber,
              },
              {
                id: 4,
                icon: 'mandiri',
                name: val.mandiriName,
                number: val.mandiriNumber,
              },
            ];
            setDataBank(dats);
          }
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

  const copy = (rek, msg) => {
    getSnackBar_success({
      title: msg,
      duration: 'LENGTH_INDEFINITE',
    });
    // Clipboard.setString(rek);
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
  };

  const renderIcon = (item) => {
    if (item === 'bca') {
      return <SvgXml width={60} height={40} xml={IconBca} />;
    } else if (item === 'bni') {
      return <SvgXml width={60} height={40} xml={IconBni} />;
    } else if (item === 'bri') {
      return <SvgXml width={60} height={40} xml={IconBri} />;
    } else {
      return <SvgXml width={60} height={40} xml={IconMandiri} />;
    }
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
        title={'Transfer Bank'}
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
        <View style={[styles.boxTopupPayBottom, styles.mb10, styles.mt10]}>
          <View style={[styles.pl10, styles.pr10]}>
            <Text style={[styles.fs15, styles.black, styles.fontWSB]}>
              Instruksi Pembayaran
            </Text>
          </View>
          <View
            style={[
              styles.row,
              styles.pb5,
              styles.pt10,
              styles.pl10,
              styles.pr10,
            ]}>
            <View style={[styles.col15, styles.center]}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  backgroundColor: '#4F6CFF',
                  borderRadius: 100,
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={[styles.fs15, styles.white, styles.fontWSB]}>
                  1
                </Text>
              </View>
              <View
                style={{
                  zIndex: -1,
                  width: 1,
                  height: 50,
                  backgroundColor: '#DBDBDB',
                  position: 'absolute',
                  left: '49%',
                  top: 30,
                }}
              />
            </View>
            <View
              style={[
                styles.col85,
                styles.pl5,
                styles.pr5,
                styles.centerContent,
              ]}>
              <Text style={[styles.fs13, styles.black, styles.fontWSR]}>
                Nilai transfer QRIS HARUS SAMA PERSIS dengan nilai yang tertera
                pada JUMLAH HARUS DIBAYAR di akhir halaman ini.
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.row,
              styles.pb5,
              styles.pt10,
              styles.pl10,
              styles.pr10,
            ]}>
            <View style={[styles.col15, styles.center]}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  backgroundColor: '#4F6CFF',
                  borderRadius: 100,
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={[styles.fs15, styles.white, styles.fontWSB]}>
                  2
                </Text>
              </View>
              <View
                style={{
                  zIndex: -1,
                  width: 1,
                  height: 50,
                  backgroundColor: '#DBDBDB',
                  position: 'absolute',
                  left: '49%',
                  top: 30,
                }}
              />
            </View>
            <View
              style={[
                styles.col85,
                styles.pl5,
                styles.pr5,
                styles.centerContent,
              ]}>
              <Text style={[styles.fs13, styles.black, styles.fontWSR]}>
                Nilai SALDO yang masuk adalah sesuai nilai yang di TRANSFER
                (tidak ada Biaya Admin). SALDO otomatis masuk dalam 5-10 menit.
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.row,
              styles.pb5,
              styles.pt10,
              styles.pl10,
              styles.pr10,
            ]}>
            <View style={[styles.col15, styles.center]}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  backgroundColor: '#4F6CFF',
                  borderRadius: 100,
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={[styles.fs15, styles.white, styles.fontWSB]}>
                  3
                </Text>
              </View>
              <View
                style={{
                  zIndex: -1,
                  width: 1,
                  height: 50,
                  backgroundColor: '#DBDBDB',
                  position: 'absolute',
                  left: '49%',
                  top: 30,
                }}
              />
            </View>
            <View
              style={[
                styles.col85,
                styles.pl5,
                styles.pr5,
                styles.centerContent,
              ]}>
              <Text style={[styles.fs13, styles.black, styles.fontWSR]}>
                ISI SALDO Via Transfer QRIS Uwang dapat dilakukan 24 Jam
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.row,
              styles.pb5,
              styles.pt10,
              styles.pl10,
              styles.pr10,
            ]}>
            <View style={[styles.col15, styles.center]}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  backgroundColor: '#4F6CFF',
                  borderRadius: 100,
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={[styles.fs15, styles.white, styles.fontWSB]}>
                  4
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.col85,
                styles.pl5,
                styles.pr5,
                styles.centerContent,
              ]}>
              <Text style={[styles.fs13, styles.black, styles.fontWSR]}>
                Jika ISI SALDO tidak masuk lebih dari 1 jam (karena gangguan
                Mutasi QRIS), HUBUNGI KAMI untuk proses validasi dan input
                manual
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.pl15, styles.pr15, styles.center]}>
          <Text
            style={[
              styles.fs14,
              styles.black,
              styles.mb5,
              styles.fontWSB,
              styles.leftText,
            ]}>
            Scan QR Code Uwang
          </Text>
          <Text
            style={[
              styles.fs11,
              styles.grey92,
              styles.fontWSR,
              styles.leftText,
            ]}>
            Pindai QR Code berikut melalui Aplikasi Mobile Banking atau Aplikasi
            E-Money anda
          </Text>
          <View>
            <Image resizeMethod="resize" style={[styles.qrCodeTopup]} />
          </View>
        </View>

        <View style={[styles.row, styles.pr15, styles.pl15, styles.mb15]}>
          <View style={[styles.col50, styles.pr10]}>
            <TouchableOpacity
              style={styles.bottomQrisMulti}
              onPress={() => {
                //askPermission();
              }}
              activeOpacity={0.5}>
              <Text style={[styles.fs13, styles.textGreenBold]}>PDF</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.col50, styles.pl10]}>
            <TouchableOpacity
              style={styles.bottomQrisMulti}
              onPress={() =>
                navigation.navigate('QrisImage', {
                  barcode: '',
                  qris_bg: '',
                })
              }
              activeOpacity={0.5}>
              <Text style={[styles.fs13, styles.textGreenBold]}>Perbesar</Text>
            </TouchableOpacity>
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
            <Text style={styles.labelFooterBtn}>Jumlah Harus Dibayar</Text>

            <TouchableOpacity
              style={[styles.row, styles.leftText]}
              activeOpacity={0.9}
              onPress={() =>
                copy(amount.toString(), `${amount} telah disalin`)
              }>
              <Text style={[styles.fs15, styles.green, styles.fontWSB]}>
                Rp  {amount}
              </Text>
              <View
                style={[styles.row, styles.ml10, styles.mt5, styles.leftText]}>
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
          <View style={[styles.col30]}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#DDD')}
              onPress={() => navigation.navigate('Home')}>
              <View style={[styles.buttonBeli, styles.rightText]}>
                <Text
                  style={[
                    styles.bold,
                    styles.fs13,
                    styles.white,
                    styles.fontWSB,
                  ]}
                  uppercase={false}>
                  Selesai
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TopupQris;
