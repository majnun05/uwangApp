// import {useNavigation} from '@react-navigation/native';
// import React, {useEffect, useRef, useState} from 'react';
// import {
//   ActivityIndicator,
//   BackHandler,
//   Image,
//   Keyboard,
//   KeyboardAvoidingView,
//   PermissionsAndroid,
//   RefreshControl,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {RNCamera} from 'react-native-camera';
// import Ripple from 'react-native-material-ripple';
// import {SvgXml} from 'react-native-svg';
// import { IcAnn, ImgQris } from '../../assets';
// import styles from '../../assets/styles/Style';
// import IconBijak from '../../assets/svg/bijak.svg';
// import IconBottom from '../../assets/svg/bottom.svg';
// import icCamera from '../../assets/svg/ic_camera.svg';
// import IconKtp from '../../assets/svg/ktp.svg';
// import IconQuestionGrey from '../../assets/svg/question-grey.svg';
// import IconSelfie from '../../assets/svg/selfie.svg';
// import Header from '../../content/header/Header';
// import ModalPin from '../../content/modal/ModalPin';
// import {apiUserRegisterKyc} from '../../helpers/endPoint';

// import {
//   getSession,
//   getSnackBar_error,
//   getSnackBar_success,
//   openLinkWeb,
// } from '../../helpers/Helpers';
// import {useApiPostUploadRegister} from '../../helpers/useFetch';

// const ProfileKycRegister = (props) => {
//   let {params} = props.route;
//   const refCamera = useRef();
//   const navigation = useNavigation();
//   const [isLoading, setIsLoading] = useState(false);
//   const [modalPin, setModalPin] = useState(false);
//   const [nameAnda, setNameAnda] = useState(false);
//   const [messageEmail, setMessageEmail] = useState('Masukkan Email');
//   const [name, setName] = useState('');
//   const [gender, setGender] = useState('male');
//   const [phone, setPhone] = useState('');
//   const [ktp, setKtp] = useState('');
//   const [bussinessType, setBussinessType] = useState('');
//   const [qrisName, setqrisName] = useState('');
//   const [income, setIncome] = useState('');
//   const [incomeName, setIncomeName] = useState('');
//   const [email, setEmail] = useState('');
//   const [provinceId, setProvinceId] = useState('');
//   const [provinceName, setProvinceName] = useState('');
//   const [districtId, setDistrictId] = useState('');
//   const [districtName, setDistrictName] = useState('');
//   const [cityId, setCityId] = useState('');
//   const [cityName, setCityName] = useState('');
//   const [cityType, setCityType] = useState('');
//   const [address, setAddress] = useState('');
//   const [postalCode, setPostalCode] = useState('');
//   const [ktpImageUrl, setKtpImageUrl] = useState('');
//   const [selfieImageUrl, setSelfieImageUrl] = useState('');
//   const [formName, setFormName] = useState(false);
//   const [formKtp, setFormKtp] = useState(false);
//   const [formBussinessType, setFormBussinessType] = useState(false);
//   const [formqrisName, setFormqrisName] = useState(false);
//   const [formIncome, setFormIncome] = useState(false);
//   const [formEmail, setFormEmail] = useState(false);
//   const [formProvinceId, setFormProvinceId] = useState(false);
//   const [formCityId, setFormCityId] = useState(false);
//   const [formDistrictId, setFormDistrictId] = useState(false);
//   const [formAddress, setFormAddress] = useState(false);
//   const [formPostalCode, setFormPostalCode] = useState(false);
//   const [formPhone, setFormPhone] = useState(false);
//   const [formKtpImageUrl, setFormKtpImageUrl] = useState(false);
//   const [formSelfieImageUrl, setFormSelfieImageUrl] = useState(false);
//   const [checkIncome, setCheckIncome] = useState(false);
//   const [checkBussinessType, setCheckBussinessType] = useState(false);
//   const [checkProvinceId, setCheckProvinceId] = useState(false);
//   const [checkCityId, setCheckCityId] = useState(false);
//   const [checkDistrictId, setCheckDistrictId] = useState(false);
//   const [pin, setPin] = useState('');
//   const [idUser, setIdUser] = useState('');
//   const [isValidEmail, setValidEmail] = useState(false);
//   const [triger, setTriger] = useState(false);
//   const [trigerSelfi, setTrigerSelfi] = useState(false);
//   const [minPhone, setMinPhone] = useState(false)


//   const getPermisionCamera = async () => {
//     try {
//       await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
//         title: 'Izin Kamera',
//         message: 'Aplikasi Uwang membutuhkan izin Kamera Anda',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       });
//     } catch (err) {
//       getSnackBar_error({
//         title: 'Aplikasi Uwang membutuhkan izin Kamera Anda',
//         duration: 'LENGTH_LONG',
//       });
//     }
//   };

//   const openWebView = async (val) => {
//     let syarat = await getSession('syarat').then((syarat) => {
//       return syarat;
//     });
    
//     let kebijakan = await getSession('kebijakan').then((kebijakan) => {
//       return kebijakan;
//     });

//     if(val === '1'){
//       if(syarat === '#'){
//         return
//       }else{
//         openLinkWeb(syarat)
//       }
//     }else{
//       if(kebijakan === '#'){
//         return
//       }else{
//         openLinkWeb(kebijakan)
//       }
//     }
//   };

//   const actionData = async () => {
//     let regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     Keyboard.dismiss();
//     if (
//       name === '' ||
//       ktp === '' ||
//       email === '' ||
//       provinceId === '' ||
//       cityId === '' ||
//       districtId === '' ||
//       address === '' ||
//       postalCode === '' ||
//       phone === '' || phone < 10 ||
//       ktpImageUrl === '' ||
//       selfieImageUrl === ''
//     ) {
//       name ? setFormName(false) : setFormName(true);
//       ktp ? setFormKtp(false) : setFormKtp(true);
//       email ? setFormEmail(false) : setFormEmail(true);
//       provinceId ? setFormProvinceId(false) : setFormProvinceId(true);
//       cityId ? setFormCityId(false) : setFormCityId(true);
//       districtId ? setFormDistrictId(false) : setFormDistrictId(true);
//       address ? setFormAddress(false) : setFormAddress(true);
//       postalCode ? setFormPostalCode(false) : setFormPostalCode(true);
//       phone ? setFormPhone(false) : setFormPhone(true);
//       phone < 10 ? setMinPhone(true) : setFormPhone(false);
//       ktpImageUrl ? setFormKtpImageUrl(false) : setFormKtpImageUrl(true);
//       selfieImageUrl
//         ? setFormSelfieImageUrl(false)
//         : setFormSelfieImageUrl(true);
//     } else if (regx.test(email) === false) {
//       setValidEmail(true);
//       return false;
//     } else {
//       setValidEmail(false);
//       setIsLoading(true);
  
//       useApiPostUploadRegister(apiUserRegisterKyc(), {
//         name: name,
//         ktp: ktp,
//         bussinessType: '',
//         qrisName: '',
//         income: '',
//         gender: gender,
//         email: email,
//         provinceId: provinceId,
//         districtId: districtId,
//         cityId: cityId,
//         address: address,
//         postalCode: postalCode,
//         phone: phone,
//         ktpImageUrl: ktpImageUrl,
//         selfieImageUrl: selfieImageUrl,
//       })
//         .then((res) => {
//           // console.log('res kyc profile', res)
//           setIsLoading(false);
//           if (res.statusCode === 200) {
//             setName('');
//             setKtp('');
//             setGender('male');
//             setPhone('');
//             setEmail('');
//             setBussinessType('');
//             setIncome('');
//             setIncomeName('');
//             setqrisName('');
//             setProvinceId('');
//             setProvinceName('');
//             setDistrictId('');
//             setDistrictName('');
//             setCityId('');
//             setCityName('');
//             setCityType('');
//             setKtpImageUrl('');
//             setSelfieImageUrl('');
//             setAddress('');
//             setPostalCode('');
//             getSnackBar_success({
//               title: res.values.message,
//               duration: 'LENGTH_INDEFINITE',
//             });
//           } else {
//             getSnackBar_error({
//               title: res.values.message,
//               duration: 'LENGTH_INDEFINITE',
//             });
//           }
//         })
//         .catch((error) => {
//           setIsLoading(false);
//         });
//     }
//   };

//   const nameChange = (value, index) => {
//     setName(value.replace(/[^A-Za-z 0-9]/g, ''));
//     setFormName(false);
//   };

//   const ktpChange = (value, index) => {
//     setKtp(value);
//     setFormKtp(false);
//   };

//   const emailChange = (value, index) => {
//     setEmail(value);
//     setFormEmail(false);
//     setValidEmail(false);
//   };

//   const qrisNameChange = (value, index) => {
//     setqrisName(value);
//     setFormqrisName(false);
//   };

//   const phoneChange = (value, index) => {
//     setPhone(value);
//     setFormPhone(false);
//   };

//   const addressChange = (value, index) => {
//     setAddress(value);
//     setFormAddress(false);
//   };

//   const postalCodeChange = (value, index) => {
//     setPostalCode(value);
//     setFormPostalCode(false);
//   };

//   const chooseGender = (value) => {
//     setGender(value);
//   };

//   const chooseName = (value) => {
//     setNameAnda(value);
//     if (value) {
//       setqrisName(name);
//     } else {
//       setqrisName('');
//     }
//     setFormqrisName(false);
//   };

//   const loadID = async () => {
//     let idUser_ = await getSession('idUser').then((idUser) => {
//       return idUser;
//     });
//     setIdUser(idUser_);
//   };

//   const backAction = () => {
//     if (triger === true) {
//       setTriger(false);
//     } else if (triger === false) {
//       navigation.goBack();
//     }
//     return true;
//   };

//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction,
//     );

//     loadID();
//     getPermisionCamera();

//     if (params.province.province_id) {
//       params.province.province_id ? setFormProvinceId(false) : null;
//       setProvinceId(params.province.province_id);
//       setProvinceName(params.province.province_name);
//       if (checkProvinceId) {
//         setCheckProvinceId(true);
//       } else {
//         setCheckProvinceId(true);
//       }
//     }

//     if (params.city.city_id) {
//       params.city.city_id ? setFormCityId(false) : null;
//       setCityId(params.city.city_id);
//       setCityName(params.city.city_name);
//       setCityType(params.city.type);
//       if (checkCityId) {
//         setCheckCityId(true);
//       } else {
//         setCheckCityId(true);
//       }
//     }

//     if (params.district.district_id) {
//       params.district.district_id ? setFormDistrictId(false) : null;
//       setDistrictId(params.district.district_id);
//       setDistrictName(params.district.district_name);
//       if (checkDistrictId) {
//         setCheckDistrictId(true);
//       } else {
//         setCheckDistrictId(true);
//       }
//     }

//     if (params.bussiness.business_type) {
//       params.bussiness ? setFormBussinessType(false) : null;
//       setBussinessType(params.bussiness.business_type);
//       if (checkBussinessType) {
//         setCheckBussinessType(true);
//       } else {
//         setCheckBussinessType(true);
//       }
//     }

//     if (params.pendapatan.income) {
//       params.pendapatan ? setFormIncome(false) : null;
//       setIncome(params.pendapatan.income);
//       setIncomeName(params.pendapatan.incomeName);
//       if (checkIncome) {
//         setCheckIncome(true);
//       } else {
//         setCheckIncome(true);
//       }
//     }

//     return () => {
//       backHandler.remove();
//     };
//   }, [
//     params.province,
//     params.city,
//     params.district,
//     params.bussiness,
//     params.pendapatan,
//   ]);

//   const _onRefresh = () => {
//     setIsLoading(false);
//     // setPercent(0);
//   };

//   const PendingView = () => <ActivityIndicator size="large" color="#4F6CFF" />;

//   const takePicture = async (camera) => {
//     const options = {quality: 0.5, base64: true};
//     const data = await camera.takePictureAsync(options);
//     if (data.uri) {
//       setKtpImageUrl(data);
//       setTriger(false);
//       setFormKtpImageUrl(false);
//     } else {
//       setKtpImageUrl('');
//       setFormKtpImageUrl(true);
//     }
//   };

//   const takePictureSelfi = async (camera) => {
//     const options = {quality: 0.5, base64: true};
//     const data = await camera.takePictureAsync(options);
//     if (data.uri) {
//       setSelfieImageUrl(data);
//       setTrigerSelfi(false);
//       setTriger(false);
//     } else {
//       setSelfieImageUrl('');
//       setFormSelfieImageUrl(true);
//     }
//   };

//   const getSelfi = () => {
//     setTriger(true);
//     setTrigerSelfi(true);
//   };

//   const onGoBack = () => {
//     if (triger) {
//       setTriger(false);
//     } else if (triger === false) {
//       navigation.goBack();
//     }
//   };

//   return (
//     <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
//       <Header
//         onBack={() => onGoBack()}
//         title={'Data Diri'}
//         shadow={true}
//         right={false}
//       />
//       <KeyboardAvoidingView style={{flex: 1}}>
//         <ScrollView
//           contentContainerStyle={{flexGrow: 1}}
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl
//               colors={['#4F6CFF', '#4F6CFF']}
//               refreshing={isLoading}
//               onRefresh={_onRefresh}
//             />
//           }
//           scrollEventThrottle={16}>
//           {triger === true ? (
//             <RNCamera
//               ref={refCamera}
//               style={s.preview}
//               type={
//                 trigerSelfi
//                   ? RNCamera.Constants.Type.front
//                   : RNCamera.Constants.Type.back
//               }
//               flashMode={RNCamera.Constants.FlashMode.off}
//               androidCameraPermissionOptions={{
//                 title: 'Permission to use camera',
//                 message: 'We need your permission to use your camera',
//                 buttonPositive: 'Ok',
//                 buttonNegative: 'Cancel',
//               }}
//               androidRecordAudioPermissionOptions={{
//                 title: 'Permission to use audio recording',
//                 message: 'We need your permission to use your audio',
//                 buttonPositive: 'Ok',
//                 buttonNegative: 'Cancel',
//               }}>
//               {({camera, status, recordAudioPermissionStatus}) => {
//                 if (status !== 'READY') return <PendingView />;
//                 return (
//                   <View
//                     style={{
//                       flex: 0,
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}>
//                     <TouchableOpacity
//                       onPress={() => {
//                         trigerSelfi
//                           ? takePictureSelfi(camera)
//                           : takePicture(camera);
//                       }}
//                       style={s.capture}>
//                       <SvgXml
//                         width="60"
//                         height="50"
//                         style={[styles.mb10, styles.mt10]}
//                         xml={icCamera}
//                       />
//                     </TouchableOpacity>
//                   </View>
//                 );
//               }}
//             </RNCamera>
//           ) : (
//             <View style={[styles.pl10, styles.pr10, styles.pb10, styles.mb20]}>
//               <View style={styles.PulsaLabelPhone}>
//                 <Text style={[styles.PulsaTextPhone, styles.fontWSB]}>
//                Nama Sesuai Identitas (KTP/SIM){''}<Text style={{color:'red'}}>*</Text>
//                 </Text>
//               </View>
//               <View
//                 style={[
//                   styles.sectionForm,
//                   {
//                     borderBottomColor: formName ? 'red' : '#ddd',
//                     marginBottom: formName ? 10 : 0,
//                   },
//                 ]}>
//                 <TextInput
//                   autoCorrect={false}
//                   style={[
//                     styles.PulsaInputBoxNew,
//                     styles.black,
//                     styles.fontWSR,
//                   ]}
//                   placeholder="Masukkan Nama Sesuai Identitas (KTP/SIM)"
//                   placeholderTextColor="#757575"
//                   underlineColorAndroid="transparent"
//                   value={name}
//                   onChangeText={nameChange}
//                   maxLength={40}
//                 />
//                 {formName ? (
//                   <View style={{position: 'absolute', left: 0, bottom: -18}}>
//                     <Text style={{color: 'red', fontSize: 10}}>
//                       Masukkan Nama Sesuai Identitas (KTP/SIM)
//                     </Text>
//                   </View>
//                 ) : null}
//               </View>
//               <View style={styles.PulsaLabelPhone}>
//                 <Text style={[styles.PulsaTextPhone, styles.fontWSB]}>
//                Nomor Identitas (KTP/SIM){''}<Text style={{color:'red'}}>*</Text>
//                 </Text>
//               </View>
//               <View
//                 style={[
//                   styles.sectionForm,
//                   {
//                     borderBottomColor: formKtp ? 'red' : '#ddd',
//                     marginBottom: formKtp ? 10 : 0,
//                   },
//                 ]}>
//                 <TextInput
//                   autoCorrect={false}
//                   style={[
//                     styles.PulsaInputBoxNew,
//                     styles.black,
//                     styles.fontWSR,
//                   ]}
//                   placeholder="Masukkan Nomor Identitas (KTP/SIM)"
//                   placeholderTextColor="#757575"
//                   underlineColorAndroid="transparent"
//                   value={ktp}
//                   onChangeText={ktpChange}
//                   keyboardType="numeric"
//                   maxLength={16}
//                 />
//                 {formKtp ? (
//                   <View style={{position: 'absolute', left: 0, bottom: -18}}>
//                     <Text style={{color: 'red', fontSize: 10}}>
//                       Masukkan Nomor Identitas (KTP/SIM)
//                     </Text>
//                   </View>
//                 ) : null}
//               </View>
//               <View style={styles.PulsaLabelPhone}>
//                 <Text style={[styles.PulsaTextPhone, styles.fontWSB]}>
//                   Jenis Kelamin{''}<Text style={{color:'red'}}>*</Text>
//                 </Text>
//               </View>
//               <View style={[styles.row, styles.mb5, styles.mt5, styles.pl10]}>
//                 <View style={[styles.col50]}>
//                   <Ripple
//                     onPress={() => {
//                       chooseGender('male');
//                     }}
//                     style={[styles.row]}>
//                     <View
//                       style={
//                         gender === 'male'
//                           ? styles.genderActiveStyle
//                           : styles.genderStyle
//                       }
//                     />
//                     <Text
//                       style={[
//                         styles.black,
//                         styles.fs15,
//                         styles.mt10,
//                         styles.pl2,
//                       ]}>
//                       Laki-Laki
//                     </Text>
//                   </Ripple>
//                 </View>
//                 <View style={[styles.col50]}>
//                   <Ripple
//                     onPress={() => {
//                       chooseGender('female');
//                     }}
//                     style={[styles.row]}>
//                     <View
//                       style={
//                         gender === 'female'
//                           ? styles.genderActiveStyle
//                           : styles.genderStyle
//                       }
//                     />
//                     <Text
//                       style={[
//                         styles.black,
//                         styles.fs15,
//                         styles.mt10,
//                         styles.pl2,
//                       ]}>
//                       Perempuan
//                     </Text>
//                   </Ripple>
//                 </View>
//               </View>
//               <View style={styles.PulsaLabelPhone}>
//                 <Text style={[styles.PulsaTextPhone, styles.fontWSB]}>
//                Provinsi{''}<Text style={{color:'red'}}>*</Text>
//                 </Text>
//               </View>
//               <Ripple
//                 style={[
//                   styles.row,
//                   formProvinceId ? styles.arePageRed : styles.arePage,
//                   styles.mb10,
//                 ]}
//                 onPress={() => {
//                   navigation.navigate('Province', {
//                     pages: 'ProfileKycRegister',
//                   });
//                 }}>
//                 <View style={[styles.col90]}>
//                   <Text
//                     style={[
//                       styles.fs13,
//                       provinceId ? styles.black : styles.grey75,
//                       styles.fontWSR,
//                     ]}>
//                     {provinceId ? provinceName : 'Pilih Provinsi'}
//                   </Text>
//                 </View>
//                 <View style={[styles.col10, styles.center]}>
//                   <SvgXml width={15} height={15} xml={IconBottom} />
//                 </View>
//               </Ripple>
//               {formProvinceId ? (
//                 <View style={{position: 'relative', left: 5, bottom: 7}}>
//                   <Text style={{color: 'red', fontSize: 10}}>
//                     Pilih Provinsi
//                   </Text>
//                 </View>
//               ) : null}

//               <Text
//                 style={[styles.black, styles.fs15, styles.pl2, styles.bold]}>
//                 Kota{''}<Text style={{color:'red'}}>*</Text>
//               </Text>
//               <Ripple
//                 style={[
//                   styles.row,
//                   formCityId ? styles.arePageRed : styles.arePage,
//                   styles.mb10,
//                 ]}
//                 onPress={() => {
//                   navigation.navigate('City', {
//                     pages: 'ProfileKycRegister',
//                     province_id: provinceId,
//                   });
//                 }}>
//                 <View style={[styles.col90]}>
//                   <Text
//                     style={[
//                       styles.fs13,
//                       cityName ? styles.black : styles.grey75,
//                       styles.fontWSR,
//                     ]}>
//                     {cityName ? cityType + ' ' + cityName : 'Pilih Kota'}
//                   </Text>
//                 </View>
//                 <View style={[styles.col10, styles.center]}>
//                   <SvgXml width={15} height={15} xml={IconBottom} />
//                 </View>
//               </Ripple>

//               {formCityId ? (
//                 <View style={{position: 'relative', left: 5, bottom: 4}}>
//                   <Text style={{color: 'red', fontSize: 10}}>Pilih Kota</Text>
//                 </View>
//               ) : null}

//               <Text
//                 style={[styles.black, styles.fs15, styles.pl2, styles.bold]}>
//                 Kecamatan{''}<Text style={{color:'red'}}>*</Text>
//               </Text>
//               <Ripple
//                 style={[
//                   styles.row,
//                   formDistrictId ? styles.arePageRed : styles.arePage,
//                   styles.mb10,
//                 ]}
//                 onPress={() => {
//                   navigation.navigate('District', {
//                     pages: 'ProfileKycRegister',
//                     city_id: cityId,
//                   });
//                 }}>
//                 <View style={[styles.col90]}>
//                   <Text
//                     style={[
//                       styles.fs13,
//                       districtName ? styles.black : styles.grey75,
//                       styles.fontWSR,
//                     ]}>
//                     {districtName ? districtName : 'Pilih Kecamatan'}
//                   </Text>
//                 </View>
//                 <View style={[styles.col10, styles.center]}>
//                   <SvgXml width={15} height={15} xml={IconBottom} />
//                 </View>
//               </Ripple>

//               {formDistrictId ? (
//                 <View style={{position: 'relative', left: 5, bottom: 4}}>
//                   <Text style={{color: 'red', fontSize: 10}}>
//                     Pilih Kecamatan
//                   </Text>
//                 </View>
//               ) : null}

//               <View style={styles.PulsaLabelPhone}>
//                 <Text style={[styles.PulsaTextPhoneNotHeight, styles.fontWSB]}>
//                Alamat Sesuai Identitas (KTP/SIM){''}<Text style={{color:'red'}}>*</Text>
//                 </Text>
//               </View>
//               <View
//                 style={[
//                   styles.sectionForm,
//                   {
//                     borderBottomColor: formAddress ? 'red' : '#ddd',
//                     marginBottom: formAddress ? 10 : 0,
//                     height:60,
//                   },
//                 ]}>
//                 <TextInput
//                   autoCorrect={false}
//                   style={[
//                     styles.PulsaInputBoxNew,
//                     styles.black,
//                     styles.fontWSR,
//                   ]}
//                   placeholder="Alamat Sesuai Identitas (KTP/SIM)"
//                   placeholderTextColor="#757575"
//                   underlineColorAndroid="transparent"
//                   value={address}
//                   multiline={true}
//                   numberOfLines={4}
//                   onChangeText={addressChange}
//                   maxLength={100}
//                 />
//                 {formAddress ? (
//                   <View style={{position: 'absolute', left: 0, bottom: -18}}>
//                     <Text style={{color: 'red', fontSize: 10}}>
//                       Masukkan Alamat
//                     </Text>
//                   </View>
//                 ) : null}
//               </View>
//               <View style={[styles.PulsaLabelPhone, styles.mt10]}>
//                 <Text style={[styles.PulsaTextPhoneNotHeight, styles.fontWSB]}>
//                Kode POS{''}<Text style={{color:'red'}}>*</Text>
//                 </Text>
//               </View>
//               <View
//                 style={[
//                   styles.sectionForm,
//                   {
//                     borderBottomColor: formPostalCode ? 'red' : '#ddd',
//                     marginBottom: formPostalCode ? 20 : 0,
//                     backgroundColor: '#fff',
//                   },
//                 ]}>
//                 <TextInput
//                   autoCorrect={false}
//                   style={[
//                     styles.PulsaInputBoxNew,
//                     styles.black,
//                     styles.fontWSR,
//                   ]}
//                   placeholder="Masukkan Kode POS"
//                   placeholderTextColor="#757575"
//                   underlineColorAndroid="transparent"
//                   value={postalCode}
//                   onChangeText={postalCodeChange}
//                   keyboardType="numeric"
//                   maxLength={5}
//                 />
//                 {formPostalCode ? (
//                   <View style={{position: 'absolute', left: 0, bottom: -18}}>
//                     <Text style={{color: 'red', fontSize: 10}}>
//                       Masukkan Kode POS
//                     </Text>
//                   </View>
//                 ) : null}
//               </View>
//               <View style={[styles.PulsaLabelPhone, styles.mt5]}>
//                 <Text style={[styles.PulsaTextPhoneNotHeight, styles.fontWSB]}>
//                Email{''}<Text style={{color:'red'}}>*</Text>
//                 </Text>
//               </View>
//               <View
//                 style={[
//                   styles.sectionForm,
//                   {
//                     borderBottomColor:
//                       formEmail || isValidEmail ? 'red' : '#ddd',
//                     marginBottom: formEmail || isValidEmail ? 10 : 0,
//                   },
//                 ]}>
//                 <TextInput
//                   autoCorrect={false}
//                   style={[
//                     styles.PulsaInputBoxNew,
//                     styles.black,
//                     styles.fontWSR,
//                   ]}
//                   placeholder="Masukkan Email"
//                   placeholderTextColor="#757575"
//                   underlineColorAndroid="transparent"
//                   value={email}
//                   onChangeText={emailChange}
//                   keyboardType="email-address"
//                   maxLength={40}
//                 />
//                 {formEmail ? (
//                   <View style={{position: 'absolute', left: 0, bottom: -18}}>
//                     <Text style={{color: 'red', fontSize: 10}}>
//                       {messageEmail}
//                     </Text>
//                   </View>
//                 ) : null}
//                 {isValidEmail ? (
//                   <View style={{position: 'absolute', right: 0, bottom: -18}}>
//                     <Text style={{color: 'red', fontSize: 10}}>
//                       Format Email Harus Benar
//                     </Text>
//                   </View>
//                 ) : null}
//               </View>
//               <View style={styles.PulsaLabelPhone}>
//                 <Text style={[styles.PulsaTextPhone, styles.fontWSB]}>
//                Nomor WhatsApp{''}<Text style={{color:'red'}}>*</Text>
//                 </Text>
//               </View>
//               <View
//                 style={[
//                   styles.sectionForm,
//                   {
//                     borderBottomColor: formPhone ? 'red' : '#ddd',
//                     marginBottom: formPhone ? 10 : 0,
//                   },
//                 ]}>
//                 <TextInput
//                   autoCorrect={false}
//                   style={[
//                     styles.PulsaInputBoxNew,
//                     styles.black,
//                     styles.fontWSR,
//                   ]}
//                   keyboardType="numeric"
//                   placeholder="Masukkan Nomor WhatsApp"
//                   placeholderTextColor="#757575"
//                   underlineColorAndroid="transparent"
//                   value={phone}
//                   onChangeText={phoneChange}
//                   maxLength={14}
//                 />
//                 {formPhone ? (
//                   <View style={{position: 'absolute', left: 0, bottom: -18}}>
//                     <Text style={{color: 'red', fontSize: 10}}>
//                       {minPhone ? 'Minimal 9 digit' : 'Masukkan Nomor Whatsapp'}
//                     </Text>
//                   </View>
//                 ) : null}
//               </View>
//               <View style={[styles.row, styles.ml5, styles.mr5, styles.mt5]}>
//                 <View style={[styles.col90]}>
//                   <Text
//                     style={[
//                       styles.black,
//                       styles.fs15,
//                       styles.pl2,
//                       styles.bold,
//                       styles.mt5,
//                     ]}>
//                     Foto ID & Swafoto ID (KTP/SIM){''}<Text style={{color:'red'}}>*</Text>
//                   </Text>
//                 </View>
//                 <TouchableOpacity
//                   onPress={() => {
//                     alert('Foto Harus Jelas');
//                   }}
//                   style={[styles.col10]}>
//                   <SvgXml
//                     width="30"
//                     height="30"
//                     style={[styles.RightText]}
//                     xml={IconQuestionGrey}
//                   />
//                 </TouchableOpacity>
//               </View>
//               <TouchableOpacity
//                 onPress={() => setTriger(true)}
//                 style={[
//                   formKtpImageUrl ? styles.boxFotoRed : styles.boxFoto,
//                   styles.center,
//                   styles.pt10,
//                   styles.pb10,
//                   styles.mt10,
//                   styles.ml5,
//                   styles.mr5,
//                 ]}>
//                 {ktpImageUrl ? (
//                   <Image
//                     resizeMethod="resize"
//                     resizeMode="contain"
//                     source={{uri: ktpImageUrl.uri}}
//                     style={[styles.imageDefault]}
//                   />
//                 ) : (
//                   <SvgXml
//                     width="60"
//                     height="50"
//                     style={[styles.mb10, styles.mt10]}
//                     xml={IconKtp}
//                   />
//                 )}
//                 {ktpImageUrl ? (
//                   <Text style={[styles.black, styles.fs15, styles.mb10]}>
//                     Ganti{' '}
//                     <Text style={[styles.black, styles.fs15, styles.bold]}>
//                       foto KTP/SIM
//                     </Text>
//                   </Text>
//                 ) : (
//                   <Text style={[styles.black, styles.fs15, styles.mb10]}>
//                     Unggah{' '}
//                     <Text style={[styles.black, styles.fs15, styles.bold]}>
//                       foto KTP/SIM
//                     </Text>{' '}
//                     anda disini
//                   </Text>
//                 )}
//               </TouchableOpacity>
//               {formKtpImageUrl ? (
//                 <Text style={[styles.fs10, styles.mH5, {color: 'red'}]}>
//                   Foto KTP wajib di isi
//                 </Text>
//               ) : null}

//               <TouchableOpacity
//                 onPress={() => getSelfi()}
//                 style={[
//                   formSelfieImageUrl ? styles.boxFotoRed : styles.boxFoto,
//                   styles.center,
//                   styles.pt10,
//                   styles.pb10,
//                   styles.mt15,
//                   styles.ml5,
//                   styles.mr5,
//                 ]}>
//                 {selfieImageUrl ? (
//                   <Image
//                     resizeMethod="resize"
//                     resizeMode="contain"
//                     source={{uri: selfieImageUrl.uri}}
//                     style={[styles.imageDefault]}
//                   />
//                 ) : (
//                   <SvgXml
//                     width="60"
//                     height="50"
//                     style={[styles.mb10, styles.mt10]}
//                     xml={IconSelfie}
//                   />
//                 )}
//                 {selfieImageUrl ? (
//                   <Text style={[styles.black, styles.fs15, styles.mb10]}>
//                     Ganti{' '}
//                     <Text style={[styles.black, styles.fs15, styles.bold]}>
//                       foto selfie dengan KTP/SIM
//                     </Text>
//                   </Text>
//                 ) : (
//                   <Text style={[styles.black, styles.fs15, styles.mb10]}>
//                     Unggah foto selfie dengan{' '}
//                     <Text style={[styles.black, styles.fs15, styles.bold]}>
//                       KTP/SIM
//                     </Text>
//                   </Text>
//                 )}
//               </TouchableOpacity>
//               {formSelfieImageUrl ? (
//                 <Text
//                   style={[styles.fs10, styles.mH5, styles.mb5, {color: 'red'}]}>
//                   Foto selfi dengan KTP wajib di isi
//                 </Text>
//               ) : null}
              
//               {/* <Text
//                 style={[
//                   styles.black,
//                   styles.bold,
//                   styles.fs17,
//                   styles.textCenter,
//                 ]}>
//                 Data Usaha
//               </Text>
//               <Text
//                 style={[
//                   styles.grey75,
//                   styles.fs13,
//                   styles.mb10,
//                   styles.mt5,
//                   styles.textCenter,
//                 ]}>
//                 Lengkapi data Usaha, Fitur QRIS anda akan didaftarkan{'\n'}(
//                 proses 3 hari kerja )
//               </Text>
//               <View style={styles.PulsaLabelPhone}>
//                 <Text style={[styles.PulsaTextPhone, styles.fontWSB]}>
//                   Jenis Usaha
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 style={[
//                   styles.row,
//                   formBussinessType ? styles.arePageRed : styles.arePage,
//                   styles.mb5,
//                 ]}
//                 onPress={() => {
//                   navigation.navigate('Bussiness', {
//                     pages: 'ProfileKycRegister',
//                   });
//                 }}>
//                 <View style={[styles.col90]}>
//                   <Text
//                     style={[
//                       styles.fs13,
//                       bussinessType ? styles.black : styles.grey75,
//                       styles.fontWSR,
//                     ]}>
//                     {bussinessType ? bussinessType : 'Pilih Jenis Usaha'}
//                   </Text>
//                 </View>
//                 <View style={[styles.col10, styles.center]}>
//                   <SvgXml width={15} height={15} xml={IconBottom} />
//                 </View>
//               </TouchableOpacity>
//               {formBussinessType ? (
//                 <View style={{position: 'relative', left: 5, bottom: 4}}>
//                   <Text style={{color: 'red', fontSize: 10}}>
//                     Pilih Jenis Usaha
//                   </Text>
//                 </View>
//               ) : null}
//               <View style={styles.PulsaLabelPhone}>
//                 <Text style={[styles.PulsaTextPhone, styles.fontWSB]}>
//                   Pendapatan Per Tahun
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 style={[
//                   styles.row,
//                   formIncome ? styles.arePageRed : styles.arePage,
//                   styles.mb5,
//                 ]}
//                 onPress={() => {
//                   navigation.navigate('Pendapatan', {
//                     pages: 'ProfileKycRegister',
//                   });
//                 }}>
//                 <View style={[styles.col90]}>
//                   <Text
//                     style={[
//                       styles.fs13,
//                       incomeName ? styles.black : styles.grey75,
//                       styles.fontWSR,
//                     ]}>
//                     {incomeName ? incomeName : 'Pilih Pendapatan Per Tahun'}
//                   </Text>
//                 </View>
//                 <View style={[styles.col10, styles.center]}>
//                   <SvgXml width={15} height={15} xml={IconBottom} />
//                 </View>
//               </TouchableOpacity>
//               {formIncome ? (
//                 <View style={{position: 'relative', left: 5, bottom: 4}}>
//                   <Text style={{color: 'red', fontSize: 10}}>
//                     Pilih Pendapatan Per Tahun
//                   </Text>
//                 </View>
//               ) : null}
//               <View style={styles.PulsaLabelPhone}>
//                 <Text style={[styles.PulsaTextPhone, styles.fontWSB]}>
//                   Nama Usaha (Nama QRIS)
//                 </Text>
//               </View>
//               <View
//                 style={[
//                   styles.sectionForm,
//                   {
//                     borderBottomColor: '#ddd',
//                     marginBottom: formqrisName ? 20 : 0,
//                     backgroundColor: '#fff',
//                     borderRadius: 5,
//                     paddingLeft: 0,
//                   },
//                 ]}>
//                 <TextInput
//                   editable={true}
//                   autoCorrect={false}
//                   style={[
//                     styles.PulsaInputBoxNew,
//                     styles.black,
//                     styles.fontWSR,
//                   ]}
//                   placeholder="Masukkan Nama Usaha/ Nama QRIS"
//                   placeholderTextColor="#757575"
//                   underlineColorAndroid="transparent"
//                   value={qrisName}
//                   onChangeText={qrisNameChange}
//                   maxLength={40}
//                 />
//                 {formqrisName ? (
//                   <View
//                     style={{
//                       position: 'absolute',
//                       left: 3,
//                       bottom: -18,
//                     }}>
//                     <Text style={{color: 'red', fontSize: 10}}>
//                       Masukkan Nama Usaha (Nama QRIS)
//                     </Text>
//                   </View>
//                 ) : null}
//               </View>
//               <TouchableOpacity
//                 activeOpacity={0.4}
//                 onPress={() => {
//                   chooseName(!nameAnda);
//                 }}>
//                 <View style={[styles.row, styles.mb10, styles.ml5]}>
//                   <View
//                     style={nameAnda ? styles.nameActiveStyle : styles.nameStyle}
//                   />
//                   <Text
//                     style={[
//                       styles.black,
//                       styles.fs15,
//                       styles.mt10,
//                       styles.pl2,
//                     ]}>
//                     Isi dengan Nama Anda
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//               <Text
//                 style={[
//                   styles.grey75,
//                   styles.fs13,
//                   styles.mb20,
//                   styles.mt5,
//                   styles.textCenter,
//                 ]}>
//                 Preview Hasil
//               </Text>
//               <View style={styles.center}>
//                 <View
//                   style={[
//                     {
//                       position: 'absolute',
//                       top: '10%',
//                       left: 0,
//                       right: 0,
//                       textAlign: 'center',
//                       zIndex: 1,
//                       marginHorizontal: '24%',
//                     },
//                   ]}>
//                   <Text
//                     style={[
//                       styles.fontWSB,
//                       styles.black,
//                       styles.fs11,
//                       styles.centerText,
//                     ]}>
//                     {idUser}
//                     {'\n'}
//                     {qrisName}
//                   </Text>
//                 </View>
//                 <Image
//                   resizeMethod="resize"
//                   resizeMode="contain"
//                   source={ImgQris}
//                   style={{
//                     height: 300,
//                     width: 250,
//                     marginBottom: 20,
//                   }}
//                 />
//               </View> */}
//               <View
//                 style={[
//                   styles.row,
//                   styles.mt20,
//                   styles.mr10,
//                   styles.pr10,
//                   styles.pl5,
//                 ]}>
//                 <SvgXml width="30" height="30" xml={IcAnn} />
//                 <Text style={[styles.grey75, styles.fs13, styles.pl10]}>
//                   Dengan masuk atau mendaftar, Anda menyetujui{' '}
//                   <Text onPress={() => openWebView('1')} style={[styles.blue, styles.fs13, styles.fontWSB]}>
//                     Ketentuan Layanan
//                   </Text>{' '}
//                   dan{' '}
//                   <Text onPress={() => openWebView('2')} style={[styles.blue, styles.fs13, styles.fontWSB]}>
//                     Kebijakan Privasi{' '}
//                   </Text>
//                   Uwang
//                 </Text>
//               </View>
//             </View>
//           )}
//         </ScrollView>
//         {triger === true ? null : (
//           <Ripple
//             onPress={() => {
//               !isLoading ? actionData() : null;
//             }}
//             style={[
//               styles.btnBuyNowFormGreen,
//               styles.borderTop,
//               styles.mb10,
//               styles.mt10,
//               styles.ml12,
//               styles.mr12,
//             ]}>
//             <Text
//               style={[styles.fs15, styles.white, styles.fontWSM]}
//               uppercase={false}>
//               {isLoading ? 'Loading ...' : 'Submit'}
//             </Text>
//           </Ripple>
//         )}
//       </KeyboardAvoidingView>

//       <ModalPin
//         isLoading={isLoading}
//         close={true}
//         modal={'normal'}
//         tanpaPin={'no'}
//         isVisible={modalPin}
//         onSwipeComplete={() => {
//           !isLoading ? setModalPin(false) : null;
//         }}
//         value={pin}
//         onChangeText={(pin) => setPin(pin)}
//         title={'Konfirmasi PIN'}
//         titleClose={'Batal'}
//         titleButton={'Simpan'}
//         onPressClose={() => {
//           !isLoading ? setModalPin(false) : null;
//         }}
//         onPress={() => {
//           !isLoading ? actionData() : null;
//         }}
//       />
//     </SafeAreaView>
//   );
// };

// export default ProfileKycRegister;

// const s = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   preview: {
//     flex: 1,
//     backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   capture: {
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//     margin: 20,
//   },
// });