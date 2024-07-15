import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  RefreshControl,
  InteractionManager,
  ImageBackground,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useApiPost, useApiPost_demo} from '../../helpers/useFetch';
import IconBack from '../../assets/svg/back.svg';
import {
  apiUserBalance,
  apiUtilityConfig,
  apiTransactionGetListVa,
  apiTransactionCreateVa,
  apiHistoryAlfamart,
  apiHistoryIndomaret,
  apiTopupEwallet,
  apiTopupAlfamart,
  apiTopupIndomaret,
  apiTopupTransferBank,
  apiUserGetPhone,
} from '../../helpers/endPoint';
import {
  getSnackBar_error,
  getSnackBar_success,
  getRupiah,
  setSession,
  getSession,
} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import ModalPin from '../../content/modal/ModalPin';
import Header from '../../content/header/HeaderRight';
import IconAsakita from '../../assets/svg/metode/asakita.svg';
import IconVa from '../../assets/svg/metode/va.svg';
import IconIndo from '../../assets/svg/metode/indo.svg';
import IconAlfa from '../../assets/svg/metode/alfamart-group.svg';
import IconTf from '../../assets/svg/metode/tf.svg';
import IconOvo from '../../assets/svg/metode/ovo.svg';
import IconQris from '../../assets/svg/metode/qris-topup.svg';
import IconActive from '../../assets/svg/active.svg';
import IconGembok from '../../assets/svg/gembok-red.svg';
import IconDelete from '../../assets/svg/delete-red.svg';
import * as nominal from '../../data/Nominal.json';
import * as metode from '../../data/Metode.json';
import {BgTopUp, IcArrL, IcCeklis, IcQris} from '../../assets';

const Topup = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAlfa, setIsLoadingAlfa] = useState(false);
  const [isLoadingIndo, setIsLoadingIndo] = useState(false);
  const [modalPin, setModalPin] = useState(false);
  const [modalPinVa, setModalPinVa] = useState(false);
  const [minimumVa, setMinimumVa] = useState(0);
  const [balance, setBalance] = useState(0);
  const [ref, setRef] = useState({});
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [dataVa, setDataVa] = useState([]);
  const [dataHistoryAlfa, setDataHistoryAlfa] = useState({});
  const [dataHistoryIndo, setDataHistoryIndo] = useState({});
  const [checkKyc, setCheckKyc] = useState('0');
  const [dataMetode, setDataMetode] = useState(metode.data);
  const [detailMetode, setDetailMetode] = useState({
    id: 1,
    status: '1',
    icon: 'tf',
    title: 'Transfer Bank',
    subtitle: 'Isi Saldo Melalui Transfer Bank',
    link: 'TopupDone',
  });
  const [detailNominal, setDetailNominal] = useState({});
  const [dataNominal, setDataNominal] = useState(nominal.data);
  const [maxTopup, setMaxTopup] = useState(0);
  const [maxTopupReal, setMaxTopupReal] = useState(0);
  const [minTopup, setMinTopup] = useState(0);
  const [minTopupReal, setMinTopupReal] = useState(0);
  const [lockKYC, setLockKYC] = useState({});
  let isMounted = true;

  const isLogged = async () => {
    let checkKycSess = await getSession('checkKycSess').then((checkKycSess) => {
      return checkKycSess;
    });
    setCheckKyc(checkKycSess);

    await useApiPost(apiUserBalance(), {})
      .then((res) => {
        getRef();
        getListVa();
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values.data;
            setBalance(val.balance);
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
        // console.log('config', res)
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values;
            setRef(val.values);
            setMinimumVa(
              val.values.limit_minimum_va
                ? val.values.limit_minimum_va
                : 100000,
            );
            setLockKYC(val.values.lockKYC ? val.values.lockKYC : {});

            if (val.values.indoTopup === '1') {
              getHistoryIndo();
            }

            if (val.values.alfaTopup === '1') {
              getHistoryAlfa();
            }

            let met = dataMetode;
            let metNew = [];
            for (var i = 0; i < met.length; i++) {
              let id = met[i].id;
              let icon = met[i].icon;
              let title = met[i].title;
              let subtitle = met[i].subtitle;
              let link = met[i].link;

              let status = '1';
              if (met[i].icon === 'alfa') {
                status = val.values.alfaTopup;
              } else if (met[i].icon === 'indo') {
                status = val.values.indoTopup;
              } else if (met[i].icon === 'ovo') {
                status = val.values.ovoTopup;
              } else if (met[i].icon === 'va') {
                status = val.values.vaTopup ? val.values.vaTopup : '1';
              } else if (met[i].icon === 'qris') {
                status = val.values.qrisTopup;
              } else if (met[i].icon === 'asakita') {
                status = val.values.paylaterTopup;
              } else if (met[i].icon === 'tf') {
                status = val.values.tfTopup;
              } else {
                status = met[i].status;
              }

              metNew.push({
                id: id,
                status: status,
                icon: icon,
                title: title,
                subtitle: subtitle,
                link: link,
              });
            }

            setDataMetode(metNew);
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

  const getListVa = async () => {
    await useApiPost(apiTransactionGetListVa(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let va = res.values.values;
            setDataVa(va);
          } else {
            setDataVa([]);
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const getHistoryAlfa = async () => {
    setIsLoadingAlfa(true);
    await useApiPost(apiHistoryAlfamart(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoadingAlfa(false);
          if (res.statusCode === 200) {
            setDataHistoryAlfa(res.values.data);
          } else {
            setDataHistoryAlfa({});
          }
        }
      })
      .catch((error) => {
        setIsLoadingAlfa(false);
      });
  };

  const getHistoryIndo = async () => {
    setIsLoadingIndo(true);
    await useApiPost(apiHistoryIndomaret(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoadingIndo(false);
          if (res.statusCode === 200) {
            setDataHistoryIndo(res.values.data);
          } else {
            setDataHistoryIndo({});
          }
        }
      })
      .catch((error) => {
        setIsLoadingIndo(false);
      });
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
  };

  const actionVa = async () => {
    if (pin === '') {
      return getSnackBar_error({
        title: 'Masukkan PIN Anda',
        duration: 'LENGTH_LONG',
      });
    } else {
      setModalPinVa(false);
      setIsLoading(true);
      setTimeout(async () => {
        await useApiPost(apiTransactionCreateVa(), {
          pin: pin,
        })
          .then((res) => {
            if (res.statusCode === 200) {
              isLogged();
              setSession({name: 'virtualAccount', value: 'yes'});
              setPin('');
              return getSnackBar_success({
                title: res.values.message,
                duration: 'LENGTH_LONG',
              });
            } else {
              setIsLoading(false);
              return getSnackBar_error({
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

  const submitTopupEwallet = async () => {
    // console.log('data pin', pin)
    if (pin === '') {
      return getSnackBar_error({
        title: 'Masukkan PIN Anda',
        duration: 'LENGTH_LONG',
      });
    } else {
      setModalPin(false);
      setTimeout(async () => {
        setIsLoading(true);
        await useApiPost(apiTopupEwallet(), {
          pin: pin,
          amount: amount.replace(/[^0-9]/g, ''),
          code: 'OVOE',
        })
          .then((res) => {
            setIsLoading(false);
            if (res.statusCode === 200) {
              setPin('');
              setAmount('');
              return navigation.push('TopupEwalletDone', {
                detailEwallet: res.values.values,
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
      }, 500);
    }
  };

  const submitTopupAlfa = async () => {
    if (pin === '') {
      return getSnackBar_error({
        title: 'Masukkan PIN Anda',
        duration: 'LENGTH_LONG',
      });
    } else {
      setModalPin(false);
      setTimeout(async () => {
        setIsLoading(true);
        await useApiPost(apiTopupAlfamart(), {
          pin: pin,
          amount: amount.replace(/[^0-9]/g, ''),
        })
          .then((res) => {
            setIsLoading(false);
            if (res.statusCode === 200) {
              setPin('');
              setAmount('');
              return navigation.push('TopupAlfamartDone', {
                dataAlfa: res.values.values,
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
      }, 500);
    }
  };

  const submitTopup = async () => {
    if (pin === '') {
      return getSnackBar_error({
        title: 'Masukkan PIN Anda',
        duration: 'LENGTH_LONG',
      });
    } else {
      setModalPin(false);
      setTimeout(async () => {
        setIsLoading(true);
        await useApiPost(apiTopupTransferBank(), {
          pin: pin,
          nominal: amount.replace(/[^0-9]/g, ''),
        })
          .then((res) => {
            setIsLoading(false);
            if (res.statusCode === 200) {
              setPin('');
              setAmount('');
              return navigation.push('TopupDone', {
                amount: res.values.message,
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
      }, 500);
    }
  };

  const submitAsakita = async () => {
    let idUser = await getSession('idUser').then((idUser) => {
      return idUser;
    });
    if (amount === '') {
      getSnackBar_error({
        title: 'Masukkan Nominal',
        duration: 'LENGTH_INDEFINITE',
      });
    } else {
      let amo = amount.replace(/[^0-9]/g, '');
      if (parseInt(amo) <= 0) {
        getSnackBar_error({
          title: 'Masukkan Nominal',
          duration: 'LENGTH_INDEFINITE',
        });
      } else {
        setIsLoading(true);
        await useApiPost_demo(apiUserGetPhone(), {})
          .then((res) => {
            setIsLoading(false);
            if (res.statusCode === 200) {
              setPin('');
              setAmount('');
              let val = res.values.data;
              return navigation.push('TopupPaylater', {
                amount: amo,
                phone: val.phoneNumber ? val.phoneNumber : 0,
                idUser: idUser,
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
      checkMaxMin(detailMetode.icon);
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, []);

  const checkMaxMin = (icons) => {
    let max;
    let min;
    if (icons === 'tf') {
      max = ref.limit_tf_real ? ref.limit_tf_real : 99000000;
      min = ref.limit_minimum_tf_real ? ref.limit_minimum_tf_real : 50000;
    } else if (icons === 'ovo') {
      max = ref.limit_ovo_real;
      min = ref.limit_minimum_real;
    } else if (icons === 'alfa') {
      max = ref.limit_alfa_real;
      min = ref.limit_minimum_real;
    } else if (icons === 'asakita') {
      max = 100000000000;
      min = 0;
    } else {
      max = ref.limit_indomart_real;
      min = ref.limit_minimum_real;
    }

    setMaxTopup(getRupiah(max));
    setMaxTopupReal(max);
    setMinTopup(getRupiah(min));
    setMinTopupReal(min);
  };

  const amountChange = (value, index) => {
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setAmount(getRupiah(valu));
    } else {
      setAmount('');
    }
  };

  const deleteNumber = () => {
    setAmount('');
  };

  const chooseNominal = (item) => {
    setDetailNominal(item);
    setAmount(getRupiah(item.price_real));
  };

  const chooseMetode = (item) => {
    setDetailMetode(item);
    checkMaxMin(item.icon);
  };

  const chooseMetodeVa = (item) => {
    setDetailMetode(item);
  };

  const choosePaymentMethod = () => {
    let amo = amount.replace(/[^0-9]/g, '');
    if (detailMetode.id) {
      if (detailMetode.icon === 'va') {
        if (amount === '') {
          getSnackBar_error({
            title: 'Masukkan Nominal',
            duration: 'LENGTH_INDEFINITE',
          });
        } else if (parseInt(amo) <= 0) {
          getSnackBar_error({
            title: 'Masukkan Nominal',
            duration: 'LENGTH_INDEFINITE',
          });
        } else if (parseInt(amo) < parseInt(minimumVa)) {
          getSnackBar_error({
            title: 'Minimal Topup Virtual Account ' + getRupiah(minimumVa),
            duration: 'LENGTH_INDEFINITE',
          });
        } else {
          navigation.push('TopupVa', {
            catatan: ref,
          });
        }
      } else {
        if (amount === '') {
        getSnackBar_error({
          title: 'Masukkan Nominal',
          duration: 'LENGTH_INDEFINITE',
        });
      } else if (parseInt(amo) <= 0) {
        getSnackBar_error({
          title: 'Masukkan Nominal',
          duration: 'LENGTH_INDEFINITE',
        });
      } else if (parseInt(amo) < parseInt(minTopupReal)) {
        getSnackBar_error({
          title: 'Minimal Topup ' + minTopup,
          duration: 'LENGTH_INDEFINITE',
        });
      } else if (parseInt(amo) > parseInt(maxTopupReal)) {
        getSnackBar_error({
          title: 'Maksimal Topup ' + maxTopup,
          duration: 'LENGTH_INDEFINITE',
        });
      } else {
        if (detailMetode.icon === 'asakita') {
          submitAsakita();
        } else {
          setModalPin(true);
        }
      }
      }
    } else {
      getSnackBar_error({
        title: 'Pilih Metode Pembayaran',
        duration: 'LENGTH_INDEFINITE',
      });
    }
  };

  const renderIcon = (item) => {
    if (item === 'ovo') {
      return <SvgXml width={40} height={40} xml={IconOvo} />;
    } else if (item === 'alfa') {
      return <SvgXml width={40} height={40} xml={IconAlfa} />;
    } else if (item === 'indo') {
      return <SvgXml width={40} height={40} xml={IconIndo} />;
    } else if (item === 'tf') {
      return <SvgXml width={40} height={40} xml={IconTf} />;
    } else if (item === 'qris') {
      return <SvgXml width={40} height={40} xml={IcQris} />;
    } else if (item === 'asakita') {
      return <SvgXml width={40} height={40} xml={IconAsakita} />;
    } else {
      return <SvgXml width={40} height={40} xml={IconVa} />;
    }
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
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
      <ImageBackground source={BgTopUp} style={{width: '100%', height: 240}}>
        <View style={{padding: 20, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
            <SvgXml width={28} height={28} xml={IconBack} />
          </TouchableOpacity>
          <Text
            style={[
              styles.white,
              styles.fs18,
              styles.fontWSB,
              {marginLeft: 10},
            ]}>
            Isi Saldo
          </Text>
        </View>

        <View style={{alignSelf: 'center', alignItems: 'center'}}>
          <Text style={[styles.white, styles.fs16, styles.fontWSR]}>
            Total Saldo
          </Text>
          <Text style={[styles.white, styles.fs25, styles.fontWSB]}>
            Rp {balance}
          </Text>
        </View>
      </ImageBackground>

      {/* <TouchableOpacity
          style={[styles.hrefContact, styles.mt5]}
          onPress={() => {
            navigation.push('TopupEwalletDone');
          }}>
          <Text style={styles.PulsaTextPhone}>tessssssssss</Text>
        </TouchableOpacity> */}

      <View style={[styles.widgedTopup]}>
        <View style={[styles.borderBottomBold, styles.pb10]}>
          <View style={[styles.boxTopupTopNormal]}>
            <View style={[styles.PulsaLabelPhone]}>
              <Text style={styles.PulsaTextPhone}>Nominal</Text>
            </View>
            <View style={[styles.sectionForm]}>
              <TextInput
                editable={!isLoading ? true : false}
                autoCorrect={false}
                style={styles.inputBoxTopup}
                placeholder="Masukkan Nominal"
                keyboardType="number-pad"
                placeholderTextColor="#d2d2d2"
                maxLength={10}
                value={amount}
                onChangeText={amountChange}
              />
              {amount ? (
                <TouchableOpacity
                  style={[styles.hrefContact, styles.mt5]}
                  onPress={() => {
                    !isLoading ? deleteNumber() : null;
                  }}>
                  <SvgXml width={13} height={13} xml={IconDelete} />
                </TouchableOpacity>
              ) : null}
            </View>
            <Text
              style={[
                styles.fs12,
                styles.greyB7,
                styles.fontWSR,
                styles.pt10,
                styles.pl5,
              ]}>
              Pilih Nominal Instan
            </Text>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {dataNominal.map((item, key) => (
              <Ripple
                key={key}
                onPress={() => {
                  if (!isLoading) {
                    chooseNominal(item);
                  }
                }}
                style={
                  item.id === detailNominal.id
                    ? amount === item.price
                      ? [
                          styles.rowSaldoNominalActive,
                          dataNominal.slice(-1)[0].id === item.id
                            ? styles.mr15
                            : null,
                        ]
                      : [
                          styles.rowSaldoNominal,
                          dataNominal.slice(-1)[0].id === item.id
                            ? styles.mr15
                            : null,
                        ]
                    : [
                        styles.rowSaldoNominal,
                        dataNominal.slice(-1)[0].id === item.id
                          ? styles.mr15
                          : null,
                      ]
                }>
                <Text style={[styles.fs15, styles.black, styles.fontWSR]}>
                  {item.price}
                </Text>
                {item.id === detailNominal.id ? (
                  <>
                    {amount === item.price ? (
                      <View
                        style={{
                          position: 'absolute',
                          top: '70%',
                          right: 5,
                          zIndex: 1,
                        }}>
                        <SvgXml width={12} height={12} xml={IcCeklis} />
                      </View>
                    ) : null}
                  </>
                ) : null}
              </Ripple>
            ))}
          </ScrollView>
        </View>
      </View>

      
        <View style={[styles.pl15, styles.mt10]}>
          <Text
            style={[styles.fs15, styles.greyB7, styles.fontWSB, styles.mb10]}>
            Metode Pembayaran
          </Text>
        </View>

       
        <View style={[styles.pl15, styles.pr15, styles.mt10]}>
           {dataMetode.map((item, key) => (
            <View key={key}>
              {item.status === '1' ? (
                <Ripple
                  onPress={() => {
                    if (!isLoading) {
                      if (item.icon === 'va') {
                        if (item.status === '1') {
                          if (checkKyc === '2') {
                            dataVa.length > 0
                              ? chooseMetodeVa(item)
                              : setModalPinVa(true);
                          } else {
                            if (lockKYC.VA) {
                              navigation.navigate('MaintenanceKyc');
                            } else {
                              dataVa.length > 0
                                ? chooseMetodeVa(item)
                                : setModalPinVa(true);
                            }
                          }
                        } else {
                          navigation.navigate('Maintenance');
                        }
                      } else if (item.icon === 'alfa') {
                        if (item.status === '1') {
                          dataHistoryAlfa.payNumber
                            ? navigation.push('TopupAlfamartDone', {
                                dataAlfa: {
                                  payNo: dataHistoryAlfa.payNumber,
                                  total: getRupiah(dataHistoryAlfa.total),
                                },
                                page: 'Topup',
                              })
                            : chooseMetode(item);
                        } else {
                          navigation.navigate('Maintenance');
                        }
                      } else if (item.icon === 'indo') {
                        if (item.status === '1') {
                          dataHistoryIndo.payNumber
                            ? navigation.push('TopupIndomaretDone', {
                                dataIndo: {
                                  payNo: dataHistoryIndo.payNumber,
                                  total: getRupiah(dataHistoryIndo.total),
                                },
                                page: 'Topup',
                              })
                            : chooseMetode(item);
                        } else {
                          navigation.navigate('Maintenance');
                        }
                      } else if (item.icon === 'qris') {
                        navigation.navigate('Maintenance');
                      } else if (item.icon === 'asakita') {
                        if (item.status === '1') {
                          chooseMetode(item);
                        } else {
                          navigation.navigate('Maintenance');
                        }
                      } else {
                        chooseMetode(item);
                      }
                    }
                  }}
                  style={
                    item.id === detailMetode.id
                      ? [styles.boxSaldoNormalActive, styles.mt5]
                      : [styles.boxSaldoNormal, styles.mt5]
                  }>
                  {!isLoadingAlfa ? (
                    <>
                      {dataHistoryAlfa.payNumber ? (
                        <>
                          {item.icon === 'alfa' ? (
                            <View style={styles.boxPendingMetode}>
                              <Text
                                style={[
                                  styles.fs9,
                                  styles.black,
                                  styles.fontWSB,
                                ]}>
                                Transaksi Tertunda
                              </Text>
                            </View>
                          ) : null}
                        </>
                      ) : null}
                    </>
                  ) : (
                    <>
                      {item.icon === 'alfa' ? (
                        <View style={styles.boxPendingMetode}>
                          <Text
                            style={[styles.fs9, styles.black, styles.fontWSB]}>
                            Loading ...
                          </Text>
                        </View>
                      ) : null}
                    </>
                  )}

                  {!isLoadingIndo ? (
                    <>
                      {dataHistoryIndo.payNumber ? (
                        <>
                          {item.icon === 'indo' ? (
                            <View style={styles.boxPendingMetode}>
                              <Text
                                style={[
                                  styles.fs9,
                                  styles.black,
                                  styles.fontWSB,
                                ]}>
                                Transaksi Tertunda
                              </Text>
                            </View>
                          ) : null}
                        </>
                      ) : null}
                    </>
                  ) : (
                    <>
                      {item.icon === 'indo' ? (
                        <View style={styles.boxPendingMetode}>
                          <Text
                            style={[styles.fs9, styles.black, styles.fontWSB]}>
                            Loading ...
                          </Text>
                        </View>
                      ) : null}
                    </>
                  )}

                  <View style={styles.row}>
                    <View style={[styles.col20, styles.center]}>
                      {renderIcon(item.icon)}
                    </View>
                    <View style={styles.col70}>
                      <Text
                        style={[
                          styles.fs13,
                          styles.black,
                          styles.fontWSB,
                          styles.mt2,
                        ]}>
                        {item.title}
                      </Text>
                      <Text
                        style={[styles.fs11, styles.grey75, styles.fontWSR]}>
                        {item.subtitle}
                      </Text>
                    </View>
                    <View style={[styles.col10, styles.center]}>
                      {item.id === detailMetode.id ? (
                        <SvgXml width={23} height={23} xml={IcCeklis} />
                      ) : null}
                    </View>
                  </View>

                  {item.icon === 'va' ? (
                    checkKyc !== '2' ? (
                      <>
                        {lockKYC.VA ? (
                          <View
                            style={[
                              styles.gembokStyle,
                              {
                                position: 'absolute',
                                right: 10,
                                top: 10,
                              },
                            ]}>
                            <SvgXml width={20} height={20} xml={IconGembok} />
                          </View>
                        ) : null}
                      </>
                    ) : null
                  ) : null}
                </Ripple>
              ) : null}
            </View>
          ))}
        </View>
      </ScrollView>
      <Ripple
        onPress={() => {
          !isLoading ? choosePaymentMethod() : null;
        }}
        style={[
          styles.btnPrimary,
          styles.ml15,
          styles.mr15,
          styles.pt15,
          styles.pb15,
          styles.mb10,
          styles.mt10,
        ]}>
        <Text
          style={[styles.fs13, styles.white, styles.fontWSB]}
          uppercase={false}>
          Topup
        </Text>
      </Ripple>

      <ModalPin
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalPin}
        onSwipeComplete={() => setModalPin(false)}
        value={pin}
        onChangeText={(pin) => setPin(pin)}
        title={`Topup ${detailMetode.title}`}
        titleClose={'Batal'}
        titleButton={'Topup'}
        onPressClose={() => {
          setModalPin(false);
        }}
        onPress={() => {
          if (detailMetode.icon === 'tf') {
            submitTopup();
          } else if (detailMetode.icon === 'ovo') {
            submitTopupEwallet();
          } else {
            submitTopupAlfa();
          }
        }}
      />

      <ModalPin
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalPinVa}
        onSwipeComplete={() => setModalPinVa(false)}
        value={pin}
        onChangeText={(pin) => setPin(pin)}
        ket={
          dataVa.length > 0
            ? 'NonAktifkan Virtual Account'
            : 'Aktifkan Virtual Account'
        }
        title={'Konfirmasi PIN'}
        titleClose={'Batal'}
        titleButton={dataVa.length > 0 ? 'NonAktifkan' : 'Aktifkan'}
        onPressClose={() => {
          setModalPinVa(false);
        }}
        onPress={() => {
          actionVa();
        }}
      />
    </SafeAreaView>
  );
};

export default Topup;
