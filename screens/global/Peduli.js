import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  View,
  TouchableNativeFeedback,
  Dimensions,
  Text,
  FlatList,
  RefreshControl,
  Keyboard,
  InteractionManager,
  Image,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {
  apiUtilityConfig,
  apiHistoryDonation,
  apiTransactionTransferSaldo,
} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSession, getRupiah, getSnackBar_error} from '../../helpers/Helpers';
import ModalDonasi from '../../content/modal/ModalDonasi';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/HeaderOperator';
import IconProfile from '../../assets/svg/profile-black.svg';
import IconEmpty from '../../assets/svg/empty.svg';
import IconRightPage from '../../assets/svg/right-page.svg';
import IconLeftPage from '../../assets/svg/left-page.svg';
import HTMLRender from 'react-native-render-html';

import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const Peduli = (props) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalTransfer, setModalTransfer] = useState(false);
  const [con, setCon] = useState(false);
  const [dataRes, setDataRes] = useState([]);
  const [imageDefault, setImageDefault] = useState('');
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [totalDonate, setTotalDonate] = useState(0);
  const [nominal, setNominal] = useState('');
  const [pin, setPin] = useState('');
  const {width} = Dimensions.get('window');
  let isMounted = true;

  // ========================
  // === Get COnfig ===
  // ========================
  const isLogged = async () => {
    let imgDef = await getSession('imageDefault').then((imageDefault) => {
      return imageDefault;
    });
    if (isMounted) {
      setImageDefault(imgDef);
    }
    getDonate(page);
    await useApiPost(apiUtilityConfig(), {})
      .then((res) => {
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values.values;
            setCon(val.donasi);
          } else {
            setCon({});
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  // ========================
  // === Get Donatur ===
  // ========================
  const getDonate = async (hal) => {
    await useApiPost(apiHistoryDonation(), {
      page: hal,
    })
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values.data;
            setDataRes(val.data);
            setTotalDonate(val.totalAmount);
            setTotalPage(val.pagination.totalPage);
            setTotalData(val.totalData);
          } else {
            setDataRes(false);
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const transferNow = async () => {
    Keyboard.dismiss();
    if (pin === '') {
      getSnackBar_error({
        title: 'Masukkan PIN Anda',
        duration: 'LENGTH_LONG',
      });
    } else if (nominal === '') {
      getSnackBar_error({
        title: 'Masukkan Nominal',
        duration: 'LENGTH_LONG',
      });
    } else {
      setModalTransfer(false);
      setTimeout(async () => {
        setIsLoading(true);
        await useApiPost(apiTransactionTransferSaldo(), {
          transferTo: con.idreseller,
          nominal: nominal.replace(/[^0-9]/g, ''),
          pin: pin,
          isDonate: true,
        })
          .then((res) => {
            setIsLoading(false);
            if (res.statusCode === 200) {
              navigation.push('TransferSaldoSuccess', {
                total: nominal,
                message: res.values.message,
                title: 'Donasi',
              });
              setPin('');
              setNominal('');
              setTransferTo('');
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
      }, 500);
    }
  };

  const nominalChange = (value, index) => {
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setNominal(getRupiah(valu));
    } else {
      setNominal('');
    }
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged(page);
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
      isLogged(page);
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, []);

  const nextPage = () => {
    if (parseInt(page) < parseInt(totalPage)) {
      setIsLoading(true);
      setPage(parseInt(page) + 1);
      getDonate(parseInt(page) + 1);
    }
  };

  const previousPage = () => {
    if (parseInt(page) > 1) {
      setIsLoading(true);
      setPage(parseInt(page) - 1);
      getDonate(parseInt(page) - 1);
    }
  };

  renderItem = React.useCallback(({item, index}) => {
    return (
      <View
        key={index}
        style={[
          styles.row,
          styles.mb10,
          styles.pr10,
          styles.pl10,
          styles.pt10,
          styles.pb10,
          styles.bgAbuMulusBgt,
          styles.ml20,
          styles.mr20,
        ]}>
        <View style={[styles.col15, styles.center]}>
          <SvgXml width={40} height={40} xml={IconProfile} />
        </View>
        <View style={[styles.col85, styles.centerContent, styles.pl5]}>
          <Text
            style={[styles.fs13, styles.blue, styles.fontWSB]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.donatur}
          </Text>
          <Text style={[styles.fs12, styles.greyB7, styles.fontWSR]}>
            Donasi{' '}
            <Text style={[styles.fs12, styles.greyB7, styles.fontWSB]}>
              {getRupiah(item.amount ? item.amount : 0)}
            </Text>
          </Text>
          <Text
            style={[styles.fs11, styles.greyB7, styles.fontWSR, styles.mt10]}>
            {moment(item.createdAt).format('Do MMM YYYY hh:mm')}
          </Text>
        </View>
      </View>
    );
  });

  listEmptyComponent = () => {
    return (
      <View style={styles.boxEmpty}>
        <SvgXml width={120} height={120} xml={IconEmpty} />
        {!isLoading ? (
          <Text style={styles.textEmpty}>Tidak Ada Data</Text>
        ) : null}
      </View>
    );
  };

  shouldItemUpdate = (prev, next) => {
    const {numColumns, shouldItemUpdate} = this.props;
    if (numColumns > 1) {
      return (
        prev.item.length !== next.item.length ||
        prev.item.some((prevItem, ii) =>
          shouldItemUpdate(
            {item: prevItem, index: prev.index * numColumns + ii},
            {item: next.item[ii], index: next.index * numColumns + ii},
          ),
        )
      );
    } else {
      return shouldItemUpdate(prev, next);
    }
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Uwang Peduli'}
        shadow={true}
        right={false}
      />
      <View style={[styles.flex1, {marginTop: -40}]}>
        <FlatList
          refreshControl={
            <RefreshControl
              colors={['#4F6CFF', '#4F6CFF']}
              refreshing={isLoading}
              onRefresh={_onRefresh}
            />
          }
          ListHeaderComponent={
            <View style={[styles.bgWhite]}>
              <View style={[styles.mt10, styles.ml15, styles.mr15]}>
                <Image
                  resizeMethod="resize"
                  source={{
                    uri: con.image ? con.image : imageDefault,
                  }}
                  style={{
                    borderRadius: 5,
                    width: null,
                    height: width / 3,
                    marginLeft: 5,
                    marginRight: 5,
                    flex: 0,
                  }}
                  resizeMode={con.image ? 'stretch' : 'cover'}
                />
              </View>

              <Text
                style={[styles.titleDetailDonasis, styles.pl20, styles.pr20]}>
                {con.title ? con.title : ''}
              </Text>

              <View
                style={[
                  styles.pl20,
                  styles.pr20,
                  styles.pb10,
                  styles.row,
                  styles.borderBottomBold,
                ]}>
                <Text style={[styles.fs15, styles.blue, styles.fontWSB]}>
                  Rp {getRupiah(totalDonate ? totalDonate : 0)}
                </Text>
                <Text
                  style={[
                    styles.fs11,
                    styles.greyB7,
                    styles.fontWSR,
                    styles.mt5,
                    styles.ml5,
                  ]}>
                  Terkumpul
                </Text>
              </View>

              {con.description ? (
                <View
                  style={[
                    styles.pt10,
                    styles.pl20,
                    styles.pr20,
                    styles.pb10,
                    styles.borderBottomBold,
                  ]}>
                  <HTMLRender
                    source={{html: con.description}}
                    imagesMaxWidth={Dimensions.get('window').width}
                    tagsStyles={{
                      p: {
                        fontSize: 12,
                        letterSpacing: 0,
                        color: '#262626',
                      },
                    }}
                  />
                </View>
              ) : null}

              <Text
                style={[
                  styles.textListDonasi,
                  styles.mt10,
                  styles.fs13,
                  styles.pb5,
                  styles.mb10,
                  styles.ml20,
                  styles.mr20,
                ]}
                numberOfLines={2}
                ellipsizeMode="tail">
                Donasi ({totalData ? totalData : 0})
              </Text>
            </View>
          }
          ListFooterComponent={
            <>
              {parseInt(totalPage) > 1 ? (
                <View
                  style={[
                    styles.bxButtonMore,
                    styles.row,
                    styles.mb20,
                    styles.mt10,
                    styles.ml20,
                    styles.mr20,
                  ]}>
                  <View style={[styles.col30]}>
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple('#DDD')}
                      onPress={() => previousPage()}>
                      <View
                        style={[
                          styles.leftText,
                          styles.col100,
                          styles.pt15,
                          styles.pb15,
                          styles.pl15,
                        ]}>
                        <SvgXml width={19} height={19} xml={IconLeftPage} />
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                  <View style={[styles.col40, styles.center]}>
                    <Text style={[styles.black, styles.fs11, styles.fontWSR]}>
                      Page {page}/{totalPage}
                    </Text>
                    {/* <Text style={[styles.black, styles.fs10, styles.fontWSR]}>
              Total Data {totalData}
            </Text> */}
                  </View>
                  <View style={[styles.col30]}>
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple('#DDD')}
                      onPress={() => nextPage()}>
                      <View
                        style={[
                          styles.col100,
                          styles.pt15,
                          styles.pb15,
                          styles.pr15,
                        ]}>
                        <View style={[styles.rightText]}>
                          <SvgXml width={19} height={19} xml={IconRightPage} />
                        </View>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>
              ) : null}
            </>
          }
          shouldItemUpdate={this.shouldItemUpdate}
          data={dataRes}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={this.listEmptyComponent}
          removeClippedSubviews={true}
          legacyImplementation={true}
        />
      </View>

      {con.active === '1' ? (
        <TouchableNativeFeedback
          onPress={() => {
            setModalTransfer(true);
          }}>
          <View
            style={[
              styles.btnPrimary,
              styles.mt10,
              styles.mb15,
              styles.ml20,
              styles.mr20,
            ]}>
            <Text
              style={[styles.bold, styles.fs13, styles.white, styles.fontWSB]}>
              Donasi Sekarang
            </Text>
          </View>
        </TouchableNativeFeedback>
      ) : null}

      <ModalDonasi
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalTransfer}
        onSwipeComplete={() => setModalTransfer(false)}
        ket="Masukkan Nominal"
        placeholder="Contoh : 100.000"
        value1={con.title}
        value2={nominal}
        onChangeText2={nominalChange}
        value3={pin}
        onChangeText3={(pin) => setPin(pin)}
        title={'Donasi'}
        titleClose={'Batal'}
        titleButton={'Donasi Sekarang'}
        onPressClose={() => {
          setModalTransfer(false);
        }}
        onPress={() => {
          transferNow();
        }}
      />
    </SafeAreaView>
  );
};

export default Peduli;
