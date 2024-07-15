import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  TouchableNativeFeedback,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Keyboard,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {
  apiHistoryCheckReceipt,
  apiHistoryPrintReceipt,
} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {selectContactPhone} from 'react-native-select-contact';
import {
  getSnackBar_error,
  getSession,
  getRupiah,
  replacePhone,
} from '../../helpers/Helpers';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/HeaderRight';
import IconCalendarBlack from '../../assets/svg/calendar-black.svg';
import IconContact from '../../assets/svg/input-contact.svg';
import IconPrintBlack from '../../assets/svg/print-black.svg';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const CetakStruk = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(false);
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [admin, setAdmin] = useState('');
  const [dataRes, setDataRes] = useState([]);

  const changeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === 'ios');
    if (event.type === 'neutralButtonPressed') {
      setDate(new Date(0));
    } else {
      setDate(currentDate);
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
          var phone = selectedPhone.number;
        }
        phoneChange(phone);
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

  const phoneChange = async (value, index) => {
    if (value.indexOf('62') != -1) {
      var phones = replacePhone(value, '+62', '0');
      number = phones.replace(/ /g, '');
      number = phones.replace(/-/g, '');
    } else {
      var number = value;
    }
    setPhone(number);
    setForm(false);
  };

  const adminChange = (value, index) => {
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setAdmin(getRupiah(valu));
    } else {
      setAdmin('');
    }
  };

  const _onRefresh = () => {
    setIsLoading(false);
  };

  const actionData = async () => {
    if (phone === '') {
      phone ? setForm(false) : setForm(true);
    } else {
      Keyboard.dismiss();
      setIsLoading(true);
      await useApiPost(apiHistoryCheckReceipt(), {
        date: date,
        phone: phone,
        adminFee: admin ? admin.replace(/[^0-9]/g, '') : '',
      })
        .then(async (res) => {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setDataRes(val.data);
          } else {
            setDataRes([]);
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  const printData = async (trxID) => {
    let printerName = await getSession('printerName').then((printerName) => {
      return printerName;
    });

    if (phone === '') {
      phone ? setForm(false) : setForm(true);
    } else {
      setIsLoading(true);
      await useApiPost(apiHistoryPrintReceipt(), {
        transactionID: trxID,
        date: date,
        phone: phone,
        adminFee: admin ? admin.replace(/[^0-9]/g, '') : '',
      })
        .then(async (res) => {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            navigation.push('CetakPreview', {
              serialNumber: val.data.serialNumber ? val.data.serialNumber : '',
              isDefault: val.data.default ? val.data.default : false,
              isToken: val.data.isToken ? val.data.isToken : false,
              phone: phone,
              item: val.data,
              printerName: printerName,
              adminFee: admin.replace(/[^0-9]/g, ''),
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

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Cetak Struk'}
        shadow={true}
        right={
          <TouchableNativeFeedback
            onPress={() => navigation.navigate('Printer')}>
            <View
              style={[
                styles.mr5,
                styles.boxPriceSale,
                {width: '55%', alignSelf: 'flex-end'},
              ]}>
              <Text style={[styles.black, styles.fs10, styles.fontWSR]}>
                Atur Printer
              </Text>
            </View>
          </TouchableNativeFeedback>
        }
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
        <View style={[styles.pl15, styles.pr15, styles.pt10, styles.mb10]}>
          <View style={styles.PulsaLabelPhone}>
            <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>
              ID Pel / Nomor Telepon
            </Text>
          </View>
          <View
            style={[
              styles.sectionForm,
              {
                borderBottomColor: form ? 'red' : '#ddd',
                marginBottom: form ? 10 : 5,
              },
            ]}>
            <TextInput
              autoCorrect={false}
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              placeholder="Masukkan ID pel / Nomor telepon"
              keyboardType="number-pad"
              placeholderTextColor="#d2d2d2"
              value={phone}
              onChangeText={phoneChange}
              maxLength={20}
              minLength={14}
            />
            <TouchableOpacity
              style={styles.hrefContact}
              onPress={() => {
                openContact();
              }}>
              <SvgXml width={23} height={23} xml={IconContact} />
            </TouchableOpacity>
            {form ? (
              <View style={{position: 'absolute', left: 2, bottom: -18}}>
                <Text style={{color: 'red', fontSize: 10}}>
                  Masukkan ID Pel / Nomor Telepon
                </Text>
              </View>
            ) : null}
          </View>
          <View
            style={
              form
                ? [styles.PulsaLabelPhone, styles.mt5]
                : [styles.PulsaLabelPhone]
            }>
            <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>Tanggal</Text>
          </View>
          <View style={styles.sectionForm}>
            <TextInput
              editable={false}
              autoCorrect={false}
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              placeholder="Masukkan Tanggal"
              keyboardType="numeric"
              placeholderTextColor="#d2d2d2"
              value={moment(date).format('YYYY-MM-DD')}
              maxLength={20}
              minLength={14}
            />
            {show && (
              <DateTimePicker
                maximumDate={new Date()}
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={changeDate}
              />
            )}
            <TouchableOpacity
              style={styles.hrefContact}
              onPress={() => {
                setShow(true);
              }}>
              <SvgXml width={23} height={23} xml={IconCalendarBlack} />
            </TouchableOpacity>
          </View>

          <View style={styles.PulsaLabelPhone}>
            <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>
              Biaya Admin
            </Text>
          </View>
          <View style={styles.sectionForm}>
            <TextInput
              autoCorrect={false}
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              placeholder="Masukkan Biaya Admin"
              placeholderTextColor="#d2d2d2"
              value={admin}
              onChangeText={adminChange}
              keyboardType="number-pad"
            />
          </View>
        </View>

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#DDD')}
          onPress={() => {
            !isLoading ? actionData() : null;
          }}>
          <View style={[styles.btnBuyNowFormGreen]}>
            <Text
              style={[styles.bold, styles.fs13, styles.white, styles.fontWSB]}
              uppercase={false}>
              Cetak
            </Text>
          </View>
        </TouchableNativeFeedback>

        {dataRes.length > 0 ? (
          <>
            <View style={[styles.mb40, styles.mt10]}>
              {dataRes.map((item, key) => (
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple('#DDD')}
                  key={key}
                  onPress={() => {
                    !isLoading ? printData(item.transactionId) : null;
                  }}>
                  <View
                    style={[
                      styles.row,
                      styles.pt10,
                      styles.pb10,
                      styles.rowListPulsa2,
                    ]}>
                    <View
                      style={[styles.col90, styles.centerContent, styles.pl10]}>
                      <Text
                        style={[styles.textListPulsa]}
                        numberOfLines={2}
                        ellipsizeMode="tail">
                        {item.productName}
                      </Text>
                      <View style={[styles.row]}>
                        <View style={[styles.col50]}>
                          <Text
                            style={[styles.fs10, styles.greyB7, styles.pl4]}>
                            {item.phone}
                          </Text>
                        </View>
                        <View style={[styles.col50]}>
                          <Text
                            style={[
                              styles.fs10,
                              styles.greyB7,
                              styles.rightText,
                            ]}>
                            {moment(item.transactionDate).format(
                              'Do MMM YYYY HH:mm',
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={[styles.col10, styles.center]}>
                      <SvgXml
                        width={23}
                        height={23}
                        style={[styles.rightText]}
                        xml={IconPrintBlack}
                      />
                    </View>
                  </View>
                </TouchableNativeFeedback>
              ))}
            </View>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CetakStruk;
