import React, {useEffect, useState, useRef} from 'react';
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
import Ripple from 'react-native-material-ripple';
// import Clipboard from '@react-native-community/clipboard';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiUtilityReference} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {
  getSnackBar_error,
  getRupiah,
  getSnackBar_success,
} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import IconTop from '../../assets/svg/top.svg';
import IconBottom from '../../assets/svg/bottom.svg';
import IconCopy from '../../assets/svg/copypaste.svg';
import IconBca from '../../assets/svg/bank/bca.svg';
import IconBni from '../../assets/svg/bank/bni.svg';
import IconBri from '../../assets/svg/bank/bri.svg';
import IconMandiri from '../../assets/svg/bank/mandiri.svg';
import { IcCopas } from '../../assets';

const RiwayatDetail = (props) => {
  let {params} = props.route;
  const scrollView = useRef(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(params.amount);
  const [dataRes, setDataRes] = useState([]);
  const [detailBank, setDetailBank] = useState({});
  const [intruksi, setIntruksi] = useState(false)
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
                status: val.bcaStatus ? val.bcaStatus : false,
              },
              {
                id: 2,
                icon: 'bni',
                name: val.bniName,
                number: val.bniNumber,
                status: val.bniStatus ? val.bniStatus : false,
              },
              {
                id: 3,
                icon: 'bri',
                name: val.briName,
                number: val.briNumber,
                status: val.briStatus ? val.briStatus : false,
              },
              {
                id: 4,
                icon: 'mandiri',
                name: val.mandiriName,
                number: val.mandiriNumber,
                status: val.mandiriStatus ? val.mandiriStatus : false,
              },
            ];
            setDataRes(dats);
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

  const copy = (rek, msg) => {
    getSnackBar_success({
      title: msg,
      duration: 'LENGTH_LONG',
    });
    // Clipboard.setString(rek);
  };

  const _onRefresh = () => {
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

  const showInstruksi = () => {
    setIntruksi(!intruksi)
  }

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Transfer Bank'}
        shadow={true}
        right={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.bgWhite]}
        ref={scrollView}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }>
        
        <View
          style={[
            styles.mb10,
            {
              backgroundColor: '#ffffff',
              paddingTop: 10,
              paddingBottom: 10,
              marginBottom: 5,
              marginTop: 15,
              borderBottomColor: '#F3F3F3',
              borderBottomWidth: 7,
              borderRadius: 5,
              borderWidth: 1,
              marginHorizontal: 15,
              borderColor: '#ddd',
            },
          ]}>
          <View
            style={[
              styles.pl10,
              styles.pr10,
              {flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'},
            ]}>
            <Text style={[styles.fs15, styles.black, styles.fontWSR]}>
              Instruksi Pembayaran
            </Text>
            <TouchableOpacity
              onPress={() => showInstruksi()}
              activeOpacity={0.7}>
              <SvgXml width={18} height={18} xml={intruksi ? IconTop : IconBottom} />
            </TouchableOpacity>
          </View>

          {intruksi ? (
             <>
             <View
               style={[
                 styles.row,
                 styles.pb5,
                 styles.pt10,
                 styles.pl10,
                 styles.pr10,
              
               ]}>
               <View style={[styles.col10]}>
                 <View
                   style={{
                     backgroundColor: '#ffffff',
                     justifyContent: 'center',
                     alignItems: 'center',
                   }}>
                   <Text style={[styles.fs13, styles.black, styles.fontWSB]}>
                     1.
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
                 <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                   Nilai transfer HARUS SAMA PERSIS dengan nilai yang tertera
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
               <View style={[styles.col10]}>
                 <View
                   style={{
                     backgroundColor: '#FFFFFF',
      
                     justifyContent: 'center',
                     alignItems: 'center',
                   }}>
                   <Text style={[styles.fs13, styles.black, styles.fontWSB]}>
                     2.
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
                 <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                   Nilai SALDO yang masuk adalah sesuai nilai yang di TRANSFER
                   (tidak ada Biaya Admin). SALDO otomatis masuk dalam 5-10
                   menit.
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
               <View style={[styles.col10]}>
                 <View
                   style={{
                     backgroundColor: '#FFFFFF',
                     justifyContent: 'center',
                     alignItems: 'center',
                   }}>
                   <Text style={[styles.fs13, styles.black, styles.fontWSB]}>
                     3.
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
                 <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                   ISI SALDO Via Transfer Bank dapat dilakukan pada pukul 07.00
                   WIB s/d 20.45 WIB
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
               <View style={[styles.col10]}>
                 <View
                   style={{
                     backgroundColor: '#FFFFFF',
                     justifyContent: 'center',
                     alignItems: 'center',
                   }}>
                   <Text style={[styles.fs13, styles.black, styles.fontWSB]}>
                     4.
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
                 <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                   Jika ISI SALDO tidak masuk lebih dari 6 jam (karena gangguan
                   Mutasi Bank), HUBUNGI KAMI untuk di proses validasi dan
                   input manual
                 </Text>
               </View>
             </View>
           </>
         ) : null}
        </View>

        <View style={[styles.pl15, styles.pr15, styles.mb50]}>
          <Text style={[styles.fs15, styles.black, styles.fontWSB]}>
            Pilihan Bank
          </Text>
          <Text
            style={[styles.fs12, styles.grey92, styles.fontWSR, styles.mb10]}>
            Silahkan transfer ke salah satu Bank pilihan Anda
          </Text>

          {dataRes.map((item, key) => (
            <View style={[styles.boxListBankTopup]} key={key}>
              {!item.status ? (
                <View style={styles.boxGangguanMetode}>
                  <Text style={[styles.fs9, styles.white, styles.fontWSB]}>
                    Gangguan
                  </Text>
                </View>
              ) : null}
              <Ripple
                onPress={() => {
                  if (item.status) {
                    item.id === detailBank.id
                      ? setDetailBank({})
                      : setDetailBank(item);
                  }
                }}
                style={[styles.row]}>
                <View style={styles.col20}>{renderIcon(item.icon)}</View>
                <View style={styles.col70}>
                  <Text
                    style={[
                      styles.fs13,
                      styles.black,
                      styles.fontWSB,
                      styles.mt10,
                    ]}>
                    Bank {item.icon.toUpperCase()}
                  </Text>
                </View>
                <View style={[styles.col10, styles.center]}>
                  {item.status ? (
                    <>
                      {item.id === detailBank.id ? (
                        <SvgXml width={15} height={15} xml={IconTop} />
                      ) : (
                        <SvgXml width={15} height={15} xml={IconBottom} />
                      )}
                    </>
                  ) : null}
                </View>
              </Ripple>
              {item.id === detailBank.id ? (
                <>
                  <Text style={[styles.fs11, styles.grey92, styles.fontWSR]}>
                    Transfer pembayaran ke nomor rekening
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      copy(item.number, item.number + ' telah disalin')
                    }
                    style={[styles.row, {justifyContent:'space-between', alignItems:'center'}]}>
                    <Text style={[styles.fs20, styles.green, styles.fontWSB]}>
                      {item.number}
                    </Text>
                    <View
                      style={[
                        styles.row,
                        styles.ml10,
                        styles.mt10,
                        {borderWidth:1, paddingHorizontal:5, paddingVertical:3, borderRadius:3, borderColor:'#4F6CFF'}
                      ]}>
                      <SvgXml width={15} height={15} xml={IcCopas} />
                      <Text
                        style={[
                          styles.fs10,
                          styles.blue,
                          styles.fontWSB,
                          styles.ml5,
                        ]}>
                        Salin
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.fs11,
                      styles.greyB7,
                      styles.fontWSR,
                      styles.mt10,
                    ]}>
                    a/n : {item.name}
                  </Text>
                </>
              ) : null}
            </View>
          ))}
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
                copy(
                  getRupiah(amount).toString(),
                  `${getRupiah(amount)} telah disalin`,
                )
              }>
              <Text style={[styles.fs15, styles.green, styles.fontWSB]}>
                Rp {getRupiah(amount)}
              </Text>
              <View
                style={[styles.row, styles.ml10, styles.mt5, styles.leftText]}>
                <SvgXml width={15} height={15} xml={IconCopy} />
                <Text
                  style={[
                    styles.fs10,
                    styles.black,
                    styles.fontWSB,
                    styles.ml5,
                  ]}>
                  Salin Tiket
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.col30]}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#DDD')}
              onPress={() => navigation.goBack(null)}>
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

      {/* {!this.state.isLoading ? ( */}
      {/* <TouchableOpacity style={styles.fabButton} onPress={() => onSomeEvent()}>
        <SvgXml width={15} height={15} xml={IconBottom} />
      </TouchableOpacity> */}
      {/* ) : null} */}
    </SafeAreaView>
  );
};

export default RiwayatDetail;
