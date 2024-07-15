import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  PermissionsAndroid,
  Keyboard,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiDownlineRegister} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {
  getSnackBar_error,
  getSnackBar_success,
  replacePhone,
} from '../../helpers/Helpers';
import ModalNotifs from '../../content/modal/ModalNotif';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/HeaderWhite';
import IconBottom from '../../assets/svg/bottom-small.svg';
import Contact from '../../assets/svg/input-contact.svg';
import {selectContactPhone} from 'react-native-select-contact';

const DownlineRegister = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [modalNotif, setModalNotif] = useState(false);
  const [provinceId, setProvinceId] = useState('');
  const [provinceName, setProvinceName] = useState('');
  const [cityId, setCityId] = useState('');
  const [cityName, setCityName] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [markup, setMarkup] = useState('');
  const [formName, setFormName] = useState(false);
  const [formPhone, setFormPhone] = useState(false);
  const [formProvince, setFormProvince] = useState(false);
  const [formCity, setFormCity] = useState(false);
  const [formDistrict, setFormDistrict] = useState(false);
  const [formZipCode, setFormZipCode] = useState(false);
  const [formAddress, setFormAddress] = useState(false);
  const [formMarkup, setFormMarkup] = useState(false);

  const nameChange = (value, index) => {
    setName(value.replace(/[^A-Za-z 0-9]/g, ''));
    setFormName(false);
  };

  const phoneChange = (value, index) => {
    if (value.indexOf('62') != -1) {
      var phones = replacePhone(value, '+62', '0');
      number = phones.replace(/ /g, '');
      number = phones.replace(/-/g, '');
    } else {
      var number = value;
    }
    let num = number.replace(/[^0-9]/g, '');
    setPhone(num);
    setFormPhone(false);
  };

  const zipCodeChange = (value, index) => {
    setZipCode(value.replace(/[^0-9]/g, ''));
    setFormZipCode(false);
  };

  const markupChange = (value, index) => {
    setMarkup(value.replace(/[^0-9]/g, ''));
    setFormMarkup(false);
  };

  const addressChange = (value, index) => {
    setAddress(value);
    setFormAddress(false);
  };

  const _onRefresh = () => {
    setIsLoading(false);
  };

  const actionData = async () => {
    setModalNotif(false);
    Keyboard.dismiss();
    if (
      name === '' ||
      phone === '' ||
      provinceId === '' ||
      cityId === '' ||
      districtId === '' ||
      address === '' ||
      zipCode === '' ||
      markup === ''
    ) {
      name ? setFormName(false) : setFormName(true);
      phone ? setFormPhone(false) : setFormPhone(true);
      provinceId ? setFormProvince(false) : setFormProvince(true);
      cityId ? setFormCity(false) : setFormCity(true);
      districtId ? setFormDistrict(false) : setFormDistrict(true);
      address ? setFormAddress(false) : setFormAddress(true);
      zipCode ? setFormZipCode(false) : setFormZipCode(true);
      markup ? setFormMarkup(false) : setFormMarkup(true);
    } else {
      setIsLoading(true);
      await useApiPost(apiDownlineRegister(), {
        name: name,
        phone: phone,
        provinceId: provinceId.toString(),
        cityId: cityId.toString(),
        districtId: districtId.toString(),
        address: address,
        zipCode: zipCode,
        markup: markup,
      })
        .then((res) => {
          setIsLoading(false);
          if (res.statusCode === 200) {
            getSnackBar_success({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
            setName('');
            setPhone('');
            setProvinceId('');
            setProvinceName('');
            setCityId('');
            setCityName('');
            setDistrictId('');
            setDistrictName('');
            setAddress('');
            setZipCode('');
            setMarkup('');
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
        setPhone(phone);
        setFormPhone(false);
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

    setProvinceId(params.province.province_id);
    setProvinceName(params.province.province_name);
    setCityId(params.city.city_id);
    setCityName(params.city.city_name);
    setDistrictId(params.district.district_id);
    setDistrictName(params.district.district_name);

    params.province.province_id ? setFormProvince(false) : null;
    params.city.city_id ? setFormCity(false) : null;
    params.district.district_id ? setFormDistrict(false) : null;

    return () => backHandler.remove();
  }, [params.province, params.city, params.district]);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Register Downline'}
        shadow={true}
        right={false}
      />
      <KeyboardAvoidingView style={{flex: 1}}>
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
          <View style={[styles.pl10, styles.pr10, styles.pb10, styles.mb20]}>
            <View style={styles.PulsaLabelPhone}>
              <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>
                Nama Lengkap
              </Text>
            </View>
            <View
              style={[
                styles.sectionForm,
                {
                  borderBottomColor: formName ? 'red' : '#ddd',
                  marginBottom: formName ? 10 : 5,
                },
              ]}>
              <TextInput
                autoCorrect={false}
                style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
                placeholder="Masukkan Nama Lengkap"
                placeholderTextColor="#757575"
                value={name}
                onChangeText={nameChange}
              />
              {formName ? (
                <View style={{position: 'absolute', left: 2, bottom: -18}}>
                  <Text style={{color: 'red', fontSize: 10}}>
                    Masukkan Nama Lengkap
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={styles.PulsaLabelPhone}>
              <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>
                Nomor Telepon
              </Text>
            </View>
            <View
              style={[
                styles.sectionForm,
                {
                  borderBottomColor: formPhone ? 'red' : '#ddd',
                  marginBottom: formPhone ? 10 : 5,
                },
              ]}>
              <TextInput
                autoCorrect={false}
                style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
                placeholder="Masukkan Nomor Telepon"
                placeholderTextColor="#757575"
                keyboardType="number-pad"
                value={phone}
                onChangeText={phoneChange}
              />
              <TouchableOpacity
                style={styles.hrefContact}
                onPress={() => {
                  openContact();
                }}>
                <SvgXml width={23} height={23} xml={Contact} />
              </TouchableOpacity>
              {formPhone ? (
                <View style={{position: 'absolute', left: 2, bottom: -18}}>
                  <Text style={{color: 'red', fontSize: 10}}>
                    Masukkan Nomor Telepon
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={styles.PulsaLabelPhone}>
              <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>
                Provinsi
              </Text>
            </View>
            <Ripple
              onPress={() => {
                navigation.navigate('Province', {
                  pages: 'DownlineRegister',
                });
              }}
              style={[
                styles.row,
                styles.arePage,
                {
                  borderBottomColor: formProvince ? 'red' : '#ddd',
                  marginBottom: formProvince ? 0 : 5,
                },
              ]}>
              <View style={[styles.col90]}>
                <Text
                  style={
                    provinceName
                      ? [styles.fs13, styles.black, styles.fontWSR]
                      : [styles.fs13, styles.grey75, styles.fontWSR]
                  }>
                  {provinceName ? provinceName : 'Pilih Provinsi'}
                </Text>
              </View>
              <View style={[styles.col10, styles.center]}>
                <SvgXml width={13} height={13} xml={IconBottom} />
              </View>
            </Ripple>
            {formProvince ? (
              <View style={{position: 'relative', left: 6, bottom: -4}}>
                <Text style={{color: 'red', fontSize: 10}}>Pilih Provinsi</Text>
              </View>
            ) : null}
            <View style={styles.PulsaLabelPhone}>
              <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>Kota</Text>
            </View>
            <Ripple
              onPress={() => {
                navigation.navigate('City', {
                  pages: 'DownlineRegister',
                  province_id: provinceId,
                });
              }}
              style={[
                styles.row,
                styles.arePage,
                {
                  borderBottomColor: formCity ? 'red' : '#ddd',
                  marginBottom: formCity ? 0 : 5,
                },
              ]}>
              <View style={[styles.col90]}>
                <Text
                  style={
                    cityName
                      ? [styles.fs13, styles.black, styles.fontWSR]
                      : [styles.fs13, styles.grey75, styles.fontWSR]
                  }>
                  {cityName ? cityName : 'Pilih Kota'}
                </Text>
              </View>
              <View style={[styles.col10, styles.center]}>
                <SvgXml width={13} height={13} xml={IconBottom} />
              </View>
            </Ripple>

            {formCity ? (
              <View style={{position: 'relative', left: 6, bottom: -4}}>
                <Text style={{color: 'red', fontSize: 10}}>Pilih Kota</Text>
              </View>
            ) : null}
            <View style={styles.PulsaLabelPhone}>
              <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>
                Kecamatan
              </Text>
            </View>
            <Ripple
              onPress={() => {
                navigation.navigate('District', {
                  pages: 'DownlineRegister',
                  city_id: cityId,
                });
              }}
              style={[
                styles.row,
                styles.arePage,
                {
                  borderBottomColor: formDistrict ? 'red' : '#ddd',
                  marginBottom: formDistrict ? 0 : 5,
                },
              ]}>
              <View style={[styles.col90]}>
                <Text
                  style={
                    districtName
                      ? [styles.fs13, styles.black, styles.fontWSR]
                      : [styles.fs13, styles.grey75, styles.fontWSR]
                  }>
                  {districtName ? districtName : 'Pilih Kecamatan'}
                </Text>
              </View>
              <View style={[styles.col10, styles.center]}>
                <SvgXml width={13} height={13} xml={IconBottom} />
              </View>
            </Ripple>

            {formDistrict ? (
              <View style={{position: 'relative', left: 6, bottom: -4}}>
                <Text style={{color: 'red', fontSize: 10}}>
                  Pilih Kecamatan
                </Text>
              </View>
            ) : null}
            <View style={styles.PulsaLabelPhone}>
              <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>
                Alamat
              </Text>
            </View>
            <View
              style={[
                styles.sectionForm,
                {
                  borderBottomColor: formAddress ? 'red' : '#ddd',
                  marginBottom: formAddress ? 10 : 5,
                },
              ]}>
              <TextInput
                autoCorrect={false}
                style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
                placeholder="Masukkan Alamat"
                placeholderTextColor="#757575"
                value={address}
                onChangeText={addressChange}
              />
              {formAddress ? (
                <View style={{position: 'absolute', left: 2, bottom: -18}}>
                  <Text style={{color: 'red', fontSize: 10}}>
                    Masukkan Alamat
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={styles.PulsaLabelPhone}>
              <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>
                Kode Pos
              </Text>
            </View>
            <View
              style={[
                styles.sectionForm,
                {
                  borderBottomColor: formZipCode ? 'red' : '#ddd',
                  marginBottom: formZipCode ? 10 : 5,
                },
              ]}>
              <TextInput
                autoCorrect={false}
                style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
                placeholder="Masukkan Kode Pos"
                placeholderTextColor="#757575"
                keyboardType="number-pad"
                value={zipCode}
                onChangeText={zipCodeChange}
              />
              {formZipCode ? (
                <View style={{position: 'absolute', left: 2, bottom: -18}}>
                  <Text style={{color: 'red', fontSize: 10}}>
                    Masukkan Kode Pos
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={styles.PulsaLabelPhone}>
              <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>
                Markup Harga
              </Text>
            </View>
            <View
              style={[
                styles.sectionForm,
                {
                  borderBottomColor: formMarkup ? 'red' : '#ddd',
                  marginBottom: formMarkup ? 10 : 5,
                },
              ]}>
              <TextInput
                autoCorrect={false}
                style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
                placeholder="Masukkan Markup Harga"
                placeholderTextColor="#757575"
                keyboardType="number-pad"
                value={markup}
                onChangeText={markupChange}
              />
              {formMarkup ? (
                <View style={{position: 'absolute', left: 2, bottom: -18}}>
                  <Text style={{color: 'red', fontSize: 10}}>
                    Masukkan Markup
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </ScrollView>
        <Ripple
          onPress={() => {
            !isLoading ? setModalNotif(true) : null;
          }}
          style={[
            styles.btnBuyNowFormGreen,
            styles.borderTop,
            styles.mb10,
            styles.mt10,
            styles.ml12,
            styles.mr12,
          ]}>
          <Text
            style={[styles.fs15, styles.white, styles.fontWSM]}
            uppercase={false}>
            Daftar
          </Text>
        </Ripple>
      </KeyboardAvoidingView>

      <ModalNotifs
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalNotif}
        onSwipeComplete={() => setModalNotif(false)}
        title={'Notifikasi'}
        message={'Apakah Anda yakin akan menyimpan data ini ?'}
        titleClose={'Tidak'}
        titleButton={'Ya'}
        onPressClose={() => {
          setModalNotif(false);
        }}
        onPress={() => {
          actionData();
        }}
      />
    </SafeAreaView>
  );
};

export default DownlineRegister;
