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
} from 'react-native';
// import Clipboard from '@react-native-community/clipboard';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {getRupiah, getSnackBar_success} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import IconWarning from '../../assets/svg/warning.svg';
import IconIntersect from '../../assets/svg/intersect2.svg';
import IconCopy from '../../assets/svg/copypaste.svg';
import IconOvo from '../../assets/svg/ovo.svg';
import {WebView} from 'react-native-webview';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const TopupEwalletDone = (props) => {
  let {params} = props.route;

  // let params = {
  //   detailEwallet: {
  //     adminFee: '1.500',
  //     amount: '100000',
  //     merchantToken:
  //       '4ae5b5d4a640fc03f0854ad4af216ae677267f42ed1af13aac0a28f342cc22f9',
  //     now: '20210205142730',
  //     referenceNo: 'TPD2752i2939939',
  //     total: '100.000',
  //     txId: 'IONPAYTEST05202102051427531693',
  //   },
  // };

  let totalFix = params.detailEwallet.amount ? params.detailEwallet.amount : 0;
  let countAdmin = parseInt(parseInt(totalFix) - (totalFix * 1.5) / 100);
  let adminFix = parseInt(parseInt(totalFix) - parseInt(countAdmin));

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [statusPayment, setStatusPayment] = useState(true);
  const [referenceNo, setReferenceNo] = useState(
    params.detailEwallet.referenceNo ? params.detailEwallet.referenceNo : '',
  );
  const [total, setTotal] = useState(
    params.detailEwallet.total ? params.detailEwallet.total : 0,
  );
  const [adminFee, setAdminFee] = useState(getRupiah(adminFix));
  const [now, setNow] = useState(params.detailEwallet.now);
  const [merchantToken, setMerchantToken] = useState(
    params.detailEwallet.merchantToken
      ? params.detailEwallet.merchantToken
      : '',
  );
  const [txId, setTxId] = useState(params.detailEwallet.txId);
  const [htmlOVO, setHtmlOVO] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  const isLogged = async () => {
    var preview =
      '<!DOCTYPE html><html><body><form action="https://api.nicepay.co.id/nicepay/direct/v2/payment"><input type="hidden" name="timeStamp" value=' +
      now +
      '><br><input type="hidden" name="tXid" value=' +
      txId +
      '><br><input type="hidden" name="callBackUrl" value="https://topindo-warehouse.id:9997/api/nicepay/callback_ewallet?tXid=' +
      txId +
      '&timeStamp=' +
      now +
      '&amt=10000&merchantToken=' +
      merchantToken +
      '"><br><input type="hidden" name="merchantToken" value=' +
      merchantToken +
      '><br><br><input style="background-color:#4F6CFF;color:white;width:100%;padding-top:30px;padding-bottom:40px;font-size:35px;font-weight:bold;border-radius:5px;margin-bottom:20px;" type="submit" value="Proses" onclick="myfunction()" id="hidden-btn"></form><div style="text-align:center;font-size:35px;" id="loading-text">Mohon tunggu ....</div><script type=text/javascript>document.getElementById("loading-text").style.display = "none";function myfunction() {document.getElementById("hidden-btn").style.display = "none";document.getElementById("loading-text").style.display = "block";}</script></body></html>';
    setHtmlOVO(preview);
  };

  const copy = (rek) => {
    getSnackBar_success({
      title: `${referenceNo} telah disalin`,
      duration: 'LENGTH_INDEFINITE',
    });
    // Clipboard.setString(rek);
  };

  const _onRefresh = () => {
    setIsLoading(false);
    // isLogged();
    setTimeLeft(30);
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

    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => {
      backHandler.remove();
      clearInterval(intervalId);
    };
  }, [timeLeft]);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.navigate('Home')}
        title={'OVO'}
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
                Berikut sisa waktu pembayaran:
              </Text>
              <View style={[styles.leftText, styles.mt10]}>
                <View style={styles.row}>
                  <View
                    style={{
                      backgroundColor: '#EBF4F4',
                      borderWidth: 1,
                      borderColor: '#000000',
                      borderRadius: 5,
                      padding: 5,
                      marginRight: 10,
                    }}>
                    <Text style={[styles.black, styles.fontWSB, styles.fs15]}>
                      00
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#EBF4F4',
                      borderWidth: 1,
                      borderColor: '#000000',
                      borderRadius: 5,
                      padding: 5,
                    }}>
                    <Text style={[styles.black, styles.fontWSB, styles.fs15]}>
                      {parseInt(timeLeft) < 10 ? '0' + timeLeft : timeLeft}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              zIndex: -1,
              bottom: '-8%',
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
              <SvgXml width={60} height={30} xml={IconOvo} />
            </View>
            <View style={[styles.col85, styles.pl10]}>
              <Text style={[styles.fs13, styles.black, styles.fontWSB]}>
                OVO
              </Text>
              <Text
                style={[
                  styles.fs11,
                  styles.grey92,
                  styles.fontWSR,
                  styles.mt5,
                ]}>
                Nomor Referensi
              </Text>
              <TouchableOpacity
                style={styles.row}
                onPress={() => copy(referenceNo)}>
                <Text style={[styles.fs18, styles.green, styles.fontWSB]}>
                  {referenceNo}
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

              <View style={[styles.row, styles.listDone, styles.mt10]}>
                <View style={styles.col50}>
                  <Text style={[styles.black, styles.fs13, styles.fontWSR]}>
                    Jumlah Pembayaran
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
                    Rp  {total}
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
                      styles.green,
                      styles.fs13,
                      styles.fontWSB,
                    ]}>
                    Rp  {adminFee}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {parseInt(timeLeft) < 1 ? (
          <>
            <View style={styles.boxEmpty}>
              <Text style={styles.textEmpty}>Waktu Pembayaran Berakhir</Text>
            </View>
          </>
        ) : (
          <>
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
                    Klik tombol proses dibawah untuk melanjutkan
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
                    Buka aplikasi OVO Anda
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
                    Tekan dan periksa notifikasi (icon bel di pojok kanan atas)
                  </Text>
                </View>
              </View>
              <View style={[styles.row, styles.pl10, styles.pr10]}>
                <View style={[styles.col10, styles.centerOnly, styles.pt5]}>
                  <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                    4.
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
                    Konfirmasi pembayaran Uwang
                  </Text>
                </View>
              </View>
            </View>
            <View style={{marginTop: -30}}>
              <WebView
                style={{
                  height: 90,
                  marginRight: 8,
                  marginLeft: 8,
                  marginBottom: 20,
                }}
                source={{
                  html: htmlOVO,
                }}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopupEwalletDone;
