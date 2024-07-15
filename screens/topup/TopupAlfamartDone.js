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
import IconAlfamart from '../../assets/svg/alfamart.svg';
import IconBottom from '../../assets/svg/bottom.svg';
import IconTop from '../../assets/svg/top.svg';
import moment from 'moment';
import 'moment/locale/id';
import { IcArrR, IcWarningRound } from '../../assets';
moment.locale('id');

const TopupAlfamartDone = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentCode, setPaymentCode] = useState(params.dataAlfa.payNo);
  const [total, setTotal] = useState(
    params.dataAlfa.total.replace(/[^0-9]/g, ''),
  );
  const [total_admin, setTotalAdmin] = useState(0);
  const [ket, setKet] = useState('');
  const [show, setShow] = useState(false)
  let isMounted = true;

  const isLogged = async () => {
    await useApiPost(apiUtilityConfig(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setTotalAdmin(val.values.admin_fee_alfamart);
            setKet(
              val.values.keteranganTopupAlfa
                ? val.values.keteranganTopupAlfa
                : 'Uwang Via Nicepay',
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


  const showHide = () => {
    setShow(!show)
  }

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.navigate('Home')}
        title={'Alfamart'}
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
            {margin:5, marginTop:10, marginBottom:10}
          ]}>
          <View style={styles.row}>
            <View style={[styles.col15, styles.center]}>
              <SvgXml width={40} height={40} xml={IcWarningRound} />
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
        </View>

        <View style={[styles.boxTopupPayBottom, styles.mt0]}>
          <View style={[styles.row, styles.pl10, styles.pr10]}>
            <View style={[styles.col15, styles.centerOnly]}>
              <SvgXml width={60} height={30} xml={IconAlfamart} />
            </View>
            <View style={[styles.col85, styles.pl10]}>
              <Text style={[styles.fs13, styles.black, styles.fontWSB]}>
                Alfamart - Alfamidi - Dan Dan
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
                Rp {getRupiah(total ? total : 0)}
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
                Rp {getRupiah(total_admin ? total_admin : 0)}
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
                Rp {getRupiah(parseInt(total - total_admin))}
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
                Rp {getRupiah(parseInt(total))}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.mt0,
            {
              backgroundColor: '#ffffff',
              paddingHorizontal:5,
              paddingVertical:8,
              marginBottom: 5,
              marginTop: 10,
              borderRadius: 5,
              borderWidth:1,
              marginHorizontal:8,
              borderColor:'#ddd'
            },
          ]}>
          <TouchableOpacity onPress={() => showHide()} activeOpacity={0.7} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:5}}>
            <Text
              style={[
                styles.fs15,
                styles.black,
                styles.fontWSB,
                styles.mV5,
                styles.pl5,
              ]}>
              Petunjuk Pembayaran
            </Text>

            <SvgXml width={15} height={15} xml={show ? IconTop : IconBottom} />
          </TouchableOpacity>

            {show ? (
                 <>
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
                     kepada kasir Alfamart/ Alfamidi/ Dan Dan, sampaikan ingin
                     melakukan pembayaran{' '}
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
                 </>
            ) : null}  
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

export default TopupAlfamartDone;