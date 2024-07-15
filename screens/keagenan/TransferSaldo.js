import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  TouchableNativeFeedback,
  PermissionsAndroid,
  RefreshControl,
  Keyboard,
  InteractionManager,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {
  apiTransactionCheckUser,
  apiTransactionTransferSaldo,
  apiUserBalance,
  apiUtilityReference,
} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {
  getSnackBar_error,
  getRupiah,
  replacePhone,
} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import ModalTransfer from '../../content/modal/ModalTransfer';
import IconContact from '../../assets/svg/input-contact.svg';
import IconSeru from '../../assets/svg/seru.svg';
import {selectContactPhone} from 'react-native-select-contact';
import Keterangan from '../../content/fitur/Keterangan';
import ActionSheet from "react-native-actions-sheet";
import { IcWallet } from '../../assets';
import IcScan from '../../assets/svg/scanUwang.svg'

const TransferSaldo = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalTransfer, setModalTransfer] = useState(false);
  const [nominal, setNominal] = useState('');
  const [transferTo, setTransferTo] = useState(params.idReseller);
  const [pin, setPin] = useState('');
  const [form1, setForm1] = useState(false);
  const [form2, setForm2] = useState(false);
  const [resellerName, setResellerName] = useState('');
  const [resellerId, setResellerId] = useState('');
  const [balance, setBalance] = useState(0);
  const [balanceReal, setBalanceReal] = useState(0)
  const [ktr, setKtr] = useState({title: '', message: '', active: false});
  let isMounted = true;

  const isLogged = async () => {
    getUserBalance()
    await useApiPost(apiUtilityReference(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            let kets = val.values.ketTransferSaldo;
            setKtr(kets ? kets : ktr);
          } else if (res.statusCode === 500) {
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

  const getUserBalance = async () => {
    setIsLoading(true);
    await useApiPost(apiUserBalance(), {})
      .then((res) => {
        console.log({res})
        setIsLoading(false);
        if (res.statusCode === 200) {
          let val = res.values.data;
          setBalance(val.balance);
          setBalanceReal(val.balanceReal)
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

  const transferToChange = (value, index) => {
    if (value.indexOf('62') != -1) {
      var phones = replacePhone(value, '+62', '0');
      number = phones.replace(/ /g, '');
      number = phones.replace(/-/g, '');
    } else {
      var number = value;
    }
    setTransferTo(number);
    setForm1(false);
  };

  const nominalChange = (value, index) => {
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setNominal(getRupiah(valu));
      setForm2(false);
    } else {
      setNominal('');
      setForm2(true);
    }
  };

  const _onRefresh = () => {
    setIsLoading(false);
  };

  const checkNominal = async () => {
    if (nominal === 0 || nominal === '' || transferTo === '') {
      nominal ? setForm2(false) : setForm2(true);
      transferTo ? setForm1(false) : setForm1(true);
    } else if(parseInt(balance) === 0 || balanceReal === 0){
      ToastAndroid.show( 'Saldo tidak mencukupi', ToastAndroid.SHORT)
    }else if(transferTo.length < 3){
      ToastAndroid.show("Nomor tujuan minimal 3 karakter", ToastAndroid.SHORT)
    }else {
      checkAction();
    }
  };

  const checkAction = async () => {
    let valu = nominal.replace(/[^0-9]/g, '');
    if (parseInt(valu) < 10000) {
      ToastAndroid.show('Minimal Transfer Rp 10.000', ToastAndroid.SHORT)
    } else {
      setIsLoading(true);
      await useApiPost(apiTransactionCheckUser(), {
        transferTo: transferTo,
      })
        .then((res) => {
          setIsLoading(false);
          if (res.statusCode === 200) {
            setModalTransfer(true);
            setResellerName(res.values.data.resellerName);
            setResellerId(res.values.data.resellerId);
          } else {
            ToastAndroid.show(res.values.message, ToastAndroid.SHORT)
          }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  const transferNow = async () => {
    Keyboard.dismiss();
    if (pin === '') {
      getSnackBar_error({
        title: 'Masukkan PIN Anda',
        duration: 'LENGTH_LONG',
      });
    } else {
      setModalTransfer(false);
      setTimeout(async () => {
        setIsLoading(true);
        await useApiPost(apiTransactionTransferSaldo(), {
          transferTo: resellerId,
          nominal: nominal.replace(/[^0-9]/g, ''),
          pin: pin,
          isDonate: false,
        })
          .then((res) => {
            setIsLoading(false);
            if (res.statusCode === 200) {
              navigation.push('TransferSaldoSuccess', {
                total: nominal,
                message: res.values.message,
                title: 'Transfer',
              });
              setPin('');
              setNominal('');
              setTransferTo('');
            } else {
              ToastAndroid.show(res.values.message, ToastAndroid.SHORT)
            }
          })
          .catch((error) => {
            setIsLoading(false);
          });
      }, 500);
    }
  };

  const getPhoneNumber = () => {
    return selectContactPhone()
      .then((selection) => {
        if (!selection) {
          return null;
        }

        let {contact, selectedPhone} = selection;
        if (selectedPhone.number.indexOf('62') != -1) {
          var phone = ReplaceAll(selectedPhone.number, '+62', '0');
          phone = phone.replace(/ /g, '');
          phone = phone.replace(/-/g, '');
        } else {
          var phone = selectedPhone.number.replace(/-/g, '');
        }
        setTransferTo(phone);
        setForm1(false);
      })
      .catch((error) => {
        getSnackBar_error({
          title: 'Aplikasi Uwang membutuhkan izin kontak Anda',
          duration: 'LENGTH_LONG',
        });
      });
  };

  const openContact = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Izin Kontak',
          message: 'Aplikasi Uwang membutuhkan izin kontak Anda',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getPhoneNumber();
      }
    } catch (err) {
      getSnackBar_error({
        title: 'Aplikasi Uwang membutuhkan izin kontak Anda',
        duration: 'LENGTH_LONG',
      });
    }
  };

  const ReplaceAll = (Source, stringToFind, stringToReplace) => {
    if (stringToFind.indexOf('+62') != -1) {
      var temp = Source;
      var index = temp.indexOf(stringToFind);

      while (index != -1) {
        temp = temp.replace(stringToFind, stringToReplace);
        index = temp.indexOf(stringToFind);
      }

      return temp;
    } else {
      return stringToFind;
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

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Sesama Uwang'}
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
            styles.topBarTarikDana,
            styles.mt15,
            styles.mr15,
            styles.ml15,
            styles.row,
          ]}>
          <View style={[styles.col15, styles.center]}>
            <SvgXml width={33} height={33} xml={IcWallet} />
          </View>
          <View style={[styles.col70, styles.centerContent]}>
            <Text style={[styles.fs12, styles.black]}>Saldo Anda</Text>
            <Text style={[styles.fs18, styles.black, styles.fontWSB]}>
              Rp {balance}
            </Text>
          </View>
        </View>
        <View style={[styles.ml15, styles.mr15]}>
          <View style={[styles.PulsaLabelPhone, styles.mt5]}>
            <Text style={styles.PulsaTextPhone}>Nomor Telepon/ID Pelangan</Text>
          </View>
          <View
            style={[
              styles.sectionForm,
              {
                borderBottomColor: form1 ? 'red' : '#ddd',
                marginBottom: form1 ? 10 : 5,
              },
            ]}>
            <TextInput
              autoCorrect={false}
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              placeholder="Masukkan Tujuan ...."
              placeholderTextColor="#d2d2d2"
              value={transferTo}
              onChangeText={transferToChange}
              maxLength={14}
              minLeng
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 8,
                zIndex: 50,
                right: 38,
              }}
              onPress={() => {
                navigation.push('ScanQr');
              }}>
              <SvgXml width={23} height={23} xml={IcScan} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.hrefContact}
              onPress={() => {
                openContact();
              }}>
              <SvgXml width={23} height={23} xml={IconContact} />
            </TouchableOpacity>

            {form1 ? (
              <View style={{position: 'absolute', left: 2, bottom: -18}}>
                <Text style={{color: 'red', fontSize: 10}}>
                  Masukkan Tujuan Transfer
                </Text>
              </View>
            ) : null}
          </View>
          <View style={[styles.PulsaLabelPhone]}>
            <Text style={styles.PulsaTextPhone}>Nominal</Text>
          </View>
          <View
            style={[
              styles.sectionForm,
              {
                borderBottomColor: form2 ? 'red' : '#ddd',
                marginBottom: form2 ? 18 : 5,
              },
            ]}>
            <TextInput
              autoCorrect={false}
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              placeholder="Masukkan Nominal ...."
              placeholderTextColor="#d2d2d2"
              value={nominal}
              onChangeText={nominalChange}
              keyboardType="number-pad"
            />
            {form2 ? (
              <View style={{position: 'absolute', left: 2, bottom: -18}}>
                <Text style={{color: 'red', fontSize: 10}}>
                  Masukkan Nominal
                </Text>
              </View>
            ) : null}
          </View>
          <View style={[styles.row, styles.mt10, styles.mb10]}>
            <SvgXml width={23} height={23} xml={IconSeru} />
            <Text
              style={[
                styles.black,
                styles.fs12,
                styles.fontWSR,
                styles.mt2,
                styles.pl10,
              ]}>
              Transfer saldo minimal nominal Rp 10.000
            </Text>
          </View>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#DDD')}
            onPress={() => {
              !isLoading ? checkNominal() : null;
            }}>
            <View style={[styles.btnPrimary, styles.mt10, styles.mb15]}>
              <Text
                style={[
                  styles.bold,
                  styles.fs13,
                  styles.white,
                  styles.fontWSB,
                ]}>
                Transfer Saldo
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        {ktr.active ? (
          <Keterangan menu="normal" title={ktr.title} msg={ktr.message} />
        ) : null}
      </ScrollView>

      <ModalTransfer
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalTransfer}
        onSwipeComplete={() => setModalTransfer(false)}
        ket="Masukkan Markup"
        placeholder="Contoh : 100"
        value1={resellerId + ' - ' + resellerName}
        value2={nominal}
        value3={pin}
        onChangeText3={(pin) => setPin(pin)}
        title={'Transfer Saldo'}
        titleClose={'Batal'}
        titleButton={'Transfer'}
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

export default TransferSaldo;
