import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  Text,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  PermissionsAndroid,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiQrisRegister} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_error, getSnackBar_success} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/HeaderWhite';
import IconBottom from '../../assets/svg/bottom-small.svg';
import Contact from '../../assets/svg/input-contact.svg';
import {selectContactPhone} from 'react-native-select-contact';

const QrisRegister = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [provinceId, setProvinceId] = useState('');
  const [provinceName, setProvinceName] = useState('');
  const [cityId, setCityId] = useState('');
  const [cityName, setCityName] = useState('');
  // const [districtId, setDistrictId] = useState('');
  // const [districtName, setDistrictName] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [bussinessType, setBussinessType] = useState('');
  const [bussinessName, setBussinessName] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [messageEmail, setMessageEmail] = useState('Masukkan Email');
  const [formName, setFormName] = useState(false);
  const [formEmail, setFormEmail] = useState(false);
  const [formPhone, setFormPhone] = useState(false);
  const [formProvince, setFormProvince] = useState(false);
  const [formCity, setFormCity] = useState(false);
  const [formDistrict, setFormDistrict] = useState(false);
  const [formZipCode, setFormZipCode] = useState(false);
  const [formAddress, setFormAddress] = useState(false);
  const [formBussinessType, setFormBussinessType] = useState(false);
  const [formBussinessName, setFormBussinessName] = useState(false);

  const nameChange = (value, index) => {
    setName(value.replace(/[^A-Za-z 0-9]/g, ''));
    setFormName(false);
  };

  const phoneChange = (value, index) => {
    setPhone(value.replace(/[^0-9]/g, ''));
    setFormPhone(false);
  };

  const emailChange = (text) => {
    setEmail(text);
    setFormEmail(false);
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if (reg.test(text) === false) {
    //   setEmail(text);
    //   setFormEmail(true);
    //   setMessageEmail('Email Tidak Valid');
    //   return false;
    // } else {

    //}
  };

  const zipCodeChange = (value, index) => {
    setZipCode(value.replace(/[^0-9]/g, ''));
    setFormZipCode(false);
  };

  bussinessNameChange = (value, index) => {
    setBussinessName(value);
    setFormBussinessName(false);
  };

  const addressChange = (value, index) => {
    setAddress(value);
    setFormAddress(false);
  };

  const _onRefresh = () => {
    setIsLoading(false);
  };

  const actionData = async () => {
    Keyboard.dismiss();
    if (
      name === '' ||
      email === '' ||
      phone === '' ||
      bussinessType === '' ||
      bussinessName === '' ||
      provinceId === '' ||
      cityId === '' ||
      // districtId === '' ||
      address === '' ||
      zipCode === ''
    ) {
      name ? setFormName(false) : setFormName(true);
      email ? setFormEmail(false) : setFormEmail(true);
      bussinessType ? setFormBussinessType(false) : setFormBussinessType(true);
      bussinessName ? setFormBussinessName(false) : setFormBussinessName(true);
      phone ? setFormPhone(false) : setFormPhone(true);
      provinceId ? setFormProvince(false) : setFormProvince(true);
      cityId ? setFormCity(false) : setFormCity(true);
      // districtId ? setFormDistrict(false) : setFormDistrict(true);
      address ? setFormAddress(false) : setFormAddress(true);
      zipCode ? setFormZipCode(false) : setFormZipCode(true);
    } else {
      setIsLoading(true);
      await useApiPost(apiQrisRegister(), {
        fullName: name,
        waNumber: phone,
        email: email,
        businessName: bussinessType,
        businessType: bussinessName,
        businessAddress: address,
        province: provinceId,
        city: cityId,
        // district: districtId,
        postalCode: zipCode,
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
            setEmail('');
            setBussinessName('');
            setBussinessType('');
            setProvinceId('');
            setProvinceName('');
            setCityId('');
            setCityName('');
            // setDistrictId('');
            // setDistrictName('');
            setAddress('');
            setZipCode('');
          } else {
            getSnackBar_error({
              title: res.values.values.message,
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
      navigation.push('Qris');
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
    // setDistrictId(params.district.district_id);
    // setDistrictName(params.district.district_name);
    setBussinessType(params.bussiness.business_type);

    params.province.province_id ? setFormProvince(false) : null;
    params.city.city_id ? setFormCity(false) : null;
    params.district.district_id ? setFormDistrict(false) : null;
    params.bussiness.business_type ? setFormBussinessType(false) : null;

    return () => backHandler.remove();
  }, [params.province, params.city, params.bussiness]);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.push('Qris')}
        title={'Registrasi QRIS'}
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
                Nomor Whatsapp
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
                placeholder="Masukkan Nomor Whatsapp"
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
                    Masukkan Nomor Whatsapp
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={styles.PulsaLabelPhone}>
              <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>Email</Text>
            </View>
            <View
              style={[
                styles.sectionForm,
                {
                  borderBottomColor: formEmail ? 'red' : '#ddd',
                  marginBottom: formEmail ? 10 : 5,
                },
              ]}>
              <TextInput
                autoCorrect={false}
                style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
                placeholder="Masukkan Email"
                placeholderTextColor="#757575"
                value={email}
                onChangeText={(email) => emailChange(email)}
              />
              {formEmail ? (
                <View style={{position: 'absolute', left: 2, bottom: -18}}>
                  <Text style={{color: 'red', fontSize: 10}}>
                    {messageEmail}
                  </Text>
                </View>
              ) : null}
            </View>

            <View style={styles.PulsaLabelPhone}>
              <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>
                Nama Usaha
              </Text>
            </View>
            <View
              style={[
                formBussinessName ? styles.boxFormOtpRed : styles.boxFormOtp,
                styles.center,
              ]}>
              <TextInput
                autoCorrect={false}
                style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
                placeholder="Masukkan Nama Usaha"
                placeholderTextColor="#757575"
                underlineColorAndroid="transparent"
                value={bussinessName}
                onChangeText={bussinessNameChange}
              />
              {formBussinessName ? (
                <View style={{position: 'absolute', left: 5, bottom: -18}}>
                  <Text style={{color: 'red', fontSize: 10}}>
                    Masukkan Nama Usaha
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={styles.PulsaLabelPhone}>
              <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>
                Jenis Usaha
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.row,
                formBussinessType ? styles.arePageRed : styles.arePage,
                styles.mb10,
              ]}
              onPress={() => {
                navigation.navigate('Bussiness', {
                  pages: 'QrisRegister',
                });
              }}>
              <View style={[styles.col90]}>
                <Text
                  style={[
                    styles.fs13,
                    bussinessType ? styles.black : styles.grey75,
                    styles.fontWSR,
                  ]}>
                  {bussinessType ? bussinessType : 'Pilih Jenis Usaha'}
                </Text>
              </View>
              <View style={[styles.col10, styles.center]}>
                <SvgXml width={15} height={15} xml={IconBottom} />
              </View>
            </TouchableOpacity>
            {formBussinessType ? (
              <View style={{position: 'relative', left: 5, bottom: 7}}>
                <Text style={{color: 'red', fontSize: 10}}>
                  Pilih Jenis Usaha
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
                Provinsi
              </Text>
            </View>
            <TouchableNativeFeedback
              onPress={() => {
                navigation.navigate('Province', {
                  pages: 'QrisRegister',
                });
              }}>
              <View
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
              </View>
            </TouchableNativeFeedback>
            {formProvince ? (
              <View style={{position: 'relative', left: 6, bottom: -4}}>
                <Text style={{color: 'red', fontSize: 10}}>Pilih Provinsi</Text>
              </View>
            ) : null}
            <View style={styles.PulsaLabelPhone}>
              <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>Kota</Text>
            </View>
            <TouchableNativeFeedback
              onPress={() => {
                navigation.navigate('City', {
                  pages: 'QrisRegister',
                  province_id: provinceId,
                });
              }}>
              <View
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
              </View>
            </TouchableNativeFeedback>
            {formCity ? (
              <View style={{position: 'relative', left: 6, bottom: -4}}>
                <Text style={{color: 'red', fontSize: 10}}>Pilih Kota</Text>
              </View>
            ) : null}
            {/* <View style={styles.PulsaLabelPhone}>
              <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>
                Kecamatan
              </Text>
            </View>
            <TouchableNativeFeedback
              onPress={() => {
                navigation.navigate('District', {
                  pages: 'QrisRegister',
                  city_id: cityId,
                });
              }}>
              <View
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
              </View>
            </TouchableNativeFeedback> */}
            {formDistrict ? (
              <View style={{position: 'relative', left: 6, bottom: -4}}>
                <Text style={{color: 'red', fontSize: 10}}>
                  Pilih Kecamatan
                </Text>
              </View>
            ) : null}
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
          </View>
        </ScrollView>
        <TouchableNativeFeedback
          onPress={() => {
            !isLoading ? actionData() : null;
          }}>
          <View
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
          </View>
        </TouchableNativeFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default QrisRegister;
