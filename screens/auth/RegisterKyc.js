// import {useNavigation} from '@react-navigation/native';
// import React, {useEffect, useRef, useState} from 'react';
// import {
//   ActivityIndicator,
//   BackHandler,
//   Image,
//   Keyboard,
//   PermissionsAndroid,
//   RefreshControl,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableNativeFeedback,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {RNCamera} from 'react-native-camera';
// import Ripple from 'react-native-material-ripple';
// import {SvgXml} from 'react-native-svg';
// import { IcAnn} from '../../assets';
// import styles from '../../assets/styles/Style';
// import IconBack from '../../assets/svg/back.svg';
// import IconBijak from '../../assets/svg/bijak.svg';
// import IconBottom from '../../assets/svg/bottom.svg';
// import icCamera from '../../assets/svg/ic_camera.svg';
// import IconKtp from '../../assets/svg/ktp.svg';
// import IconLengkungOrange from '../../assets/svg/lengkung-orange.svg';
// import IconLengkung from '../../assets/svg/lengkung.svg';
// import IconQuestionGrey from '../../assets/svg/question-grey.svg';
// import IconQuestionWhite from '../../assets/svg/question-white.svg';
// import IconSelfie from '../../assets/svg/selfie.svg';
// import IconTitik from '../../assets/svg/titik.svg';
// import ModalNotifs from '../../content/modal/ModalNotif';
// import StatusBars from '../../content/more/StatusBar';
// import {apiUserRegister, apiUserRegisterKyc} from '../../helpers/endPoint';
// import {
//   getSession,
//   getSnackBar_error,
//   getSnackBar_success,
//   openLinkWeb,
//   setSession,
// } from '../../helpers/Helpers';
// import {useApiPost, useApiPostUploadRegister} from '../../helpers/useFetch';

// const RegisterKyc = (props) => {
//   let {params} = props.route;
//   const refCamera = useRef();
//   const navigation = useNavigation();
//   const [isLoading, setIsLoading] = useState(false);
//   const [nameAnda, setNameAnda] = useState(false);
//   const [modalNotif, setModalNotif] = useState(false);
//   const [lengthScroll, setLengthScroll] = useState(0);
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
//   const [checkBussinessType, setCheckBussinessType] = useState(false);
//   const [checkIncome, setCheckIncome] = useState(false);
//   const [checkProvinceId, setCheckProvinceId] = useState(false);
//   const [checkCityId, setCheckCityId] = useState(false);
//   const [checkDistrictId, setCheckDistrictId] = useState(false);
//   const [dataReg, setDataReg] = useState(params.dataReg);
//   const [accessTokenRegister, setAccessTokenRegister] = useState('');
//   const [checkKyc, setCheckKyc] = useState(true);
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

//   const actionCheck = (checkWith) => {
//     let regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (checkWith === 'RegisterOnly') {
//       registerData(checkWith);
//     } else {
//       Keyboard.dismiss();
//       if (
//         name === '' ||
//         ktp === '' ||
//         provinceId === '' ||
//         cityId === '' ||
//         districtId === '' ||
//         address === '' ||
//         postalCode === '' ||
//         phone === '' || phone < 10 ||
//         ktpImageUrl === '' ||
//         selfieImageUrl === ''
//       ) {
//         name ? setFormName(false) : setFormName(true);
//         ktp ? setFormKtp(false) : setFormKtp(true);
//         email ? setFormEmail(false) : setFormEmail(true);
//         provinceId ? setFormProvinceId(false) : setFormProvinceId(true);
//         cityId ? setFormCityId(false) : setFormCityId(true);
//         districtId ? setFormDistrictId(false) : setFormDistrictId(true);
//         address ? setFormAddress(false) : setFormAddress(true);
//         postalCode ? setFormPostalCode(false) : setFormPostalCode(true);
//         phone ? setFormPhone(false) : setFormPhone(true);
//         phone < 10 ? setMinPhone(true) : setFormPhone(false);
//         ktpImageUrl ? setFormKtpImageUrl(false) : setFormKtpImageUrl(true);
//         selfieImageUrl
//           ? setFormSelfieImageUrl(false)
//           : setFormSelfieImageUrl(true);
//       } else if (regx.test(email) === false) {
//         setValidEmail(true);
//         return false;
//       } else {
//         setValidEmail(false);
//         registerData(checkWith);
//       }
//     }
//   };

//   const doneRegister = async () => {
//     let guideApp = await getSession('guideApp').then((guideApp) => {
//       return guideApp;
//     });
//     let guideAppKasir = await getSession('guideAppKasir').then(
//       (guideAppKasir) => {
//         return guideAppKasir;
//       },
//     );
//     setSession({name: 'token', value: accessTokenRegister});
//     setSession({name: 'tokenDemo', value: accessTokenRegister});
//     setSession({name: 'isLoggedV2', value: 'yes'});
//     setSession({name: 'qrCode', value: 'false'});
//     setSession({name: 'tanpaPin', value: 'no'});
//     setSession({name: 'pinAplikasi', value: 'no'});
//     setSession({name: 'fingerPrint', value: 'no'});
//     setSession({name: 'pinTrx', value: 'no'});
//     setSession({name: 'virtualAccount', value: 'no'});
//     setSession({name: 'namaLoket', value: 'Topindo'});
//     setSession({
//       name: 'guideApp',
//       value: guideApp ? 'false' : 'true',
//     });
//     setSession({
//       name: 'guideAppKasir',
//       value: guideAppKasir ? 'false' : 'true',
//     });
//     setSession({
//       name: 'alamatLoket',
//       value:
//         'Jln.P.Diponegoro No.48 Singkawang, Kalimantan Barat (Kode pos 79123)',
//     });
//     setSession({
//       name: 'footLoket',
//       value:
//         'Tersedia Pulsa, kuota multi operator, Token PLN, bayar Listrik , pdam, telkom dan Multi pembayaran lainnya.',
//     });
//     getSnackBar_success({
//       title: 'Register Berhasil',
//       duration: 'LENGTH_INDEFINITE',
//     });
//     navigation.replace('Home');
//   };

//   const registerData = async (checkWith) => {
//     let guideApp = await getSession('guideApp').then((guideApp) => {
//       return guideApp;
//     });
//     let guideAppKasir = await getSession('guideAppKasir').then(
//       (guideAppKasir) => {
//         return guideAppKasir;
//       },
//     );
//     setIsLoading(true);
//     useApiPost(apiUserRegister(), {
//       registerToken: dataReg.registerToken,
//       name: dataReg.name,
//       phone: dataReg.phone,
//       pin: dataReg.pin,
//       confirm_pin: dataReg.confirm,
//       referal: dataReg.referal,
//     })
//       .then((res) => {
//         setIsLoading(false);
//         if (res.statusCode === 200) {
//           let val = res.values.data;
//           setAccessTokenRegister(val.tokens.accessToken);

//           if (checkWith === 'RegisterOnly') {
//             setSession({name: 'token', value: val.tokens.accessToken});
//             setSession({name: 'tokenDemo', value: val.tokens.refreshToken});
//             setSession({name: 'isLoggedV2', value: 'yes'});
//             setSession({name: 'qrCode', value: 'false'});
//             setSession({name: 'tanpaPin', value: 'no'});
//             setSession({name: 'pinAplikasi', value: 'no'});
//             setSession({name: 'fingerPrint', value: 'no'});
//             setSession({name: 'pinTrx', value: 'no'});
//             setSession({name: 'virtualAccount', value: 'no'});
//             setSession({name: 'namaLoket', value: 'Topindo'});
//             setSession({
//               name: 'guideApp',
//               value: guideApp ? 'false' : 'true',
//             });
//             setSession({
//               name: 'guideAppKasir',
//               value: guideAppKasir ? 'false' : 'true',
//             });
//             setSession({
//               name: 'alamatLoket',
//               value:
//                 'Jln.P.Diponegoro No.48 Singkawang, Kalimantan Barat (Kode pos 79123)',
//             });
//             setSession({
//               name: 'footLoket',
//               value:
//                 'Tersedia Pulsa, kuota multi operator, Token PLN, bayar Listrik , pdam, telkom dan Multi pembayaran lainnya.',
//             });
//             getSnackBar_success({
//               title: res.values.message,
//               duration: 'LENGTH_INDEFINITE',
//             });
//             navigation.replace('Home');
//           } else {
//             registerKycData(val.tokens.accessToken);
//           }
//         } else {
//           getSnackBar_error({
//             title: res.values.message,
//             duration: 'LENGTH_INDEFINITE',
//           });
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//       });
//   };

//   const registerKycData = async (accessTokenParams) => {
//     let guideApp = await getSession('guideApp').then((guideApp) => {
//       return guideApp;
//     });
//     let guideAppKasir = await getSession('guideAppKasir').then(
//       (guideAppKasir) => {
//         return guideAppKasir;
//       },
//     );
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
//       // bussinessType ? setFormBussinessType(false) : setFormBussinessType(true);
//       // qrisName ? setFormqrisName(false) : setFormqrisName(true);
//       // income ? setFormIncome(false) : setFormIncome(true);
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
//       setIsLoading(true);
//       setValidEmail(false);
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
//         accessToken: accessTokenParams,
//       })
//         .then((res) => {
//           if (res.statusCode === 200) {
//             setSession({name: 'token', value: accessTokenParams});
//             setSession({name: 'tokenDemo', value: accessTokenParams});
//             setSession({name: 'isLoggedV2', value: 'yes'});
//             setSession({name: 'qrCode', value: 'false'});
//             setSession({name: 'tanpaPin', value: 'no'});
//             setSession({name: 'pinAplikasi', value: 'no'});
//             setSession({name: 'fingerPrint', value: 'no'});
//             setSession({name: 'pinTrx', value: 'no'});
//             setSession({name: 'virtualAccount', value: 'no'});
//             setSession({name: 'namaLoket', value: 'Topindo'});
//             setSession({
//               name: 'guideApp',
//               value: guideApp ? 'false' : 'true',
//             });
//             setSession({
//               name: 'guideAppKasir',
//               value: guideAppKasir ? 'false' : 'true',
//             });
//             setSession({
//               name: 'alamatLoket',
//               value:
//                 'Jln.P.Diponegoro No.48 Singkawang, Kalimantan Barat (Kode pos 79123)',
//             });
//             setSession({
//               name: 'footLoket',
//               value:
//                 'Tersedia Pulsa, kuota multi operator, Token PLN, bayar Listrik , pdam, telkom dan Multi pembayaran lainnya.',
//             });
//             getSnackBar_success({
//               title: res.values.message,
//               duration: 'LENGTH_INDEFINITE',
//             });
//             navigation.replace('Home');
//             setCheckKyc(true);
//           } else {
//             setCheckKyc(false);
//             setIsLoading(false);
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

//   nameChange = (value, index) => {
//     setName(value.replace(/[^A-Za-z 0-9]/g, ''));
//     setFormName(false);
//   };

//   ktpChange = (value, index) => {
//     setKtp(value);
//     setFormKtp(false);
//   };

//   emailChange = (value, index) => {
//     setEmail(value);
//     setFormEmail(false);
//     setValidEmail(false);
//   };

//   qrisNameChange = (value, index) => {
//     setqrisName(value);
//     setFormqrisName(false);
//   };

//   phoneChange = (value, index) => {
//     setPhone(value);
//     setFormPhone(false);
//   };

//   addressChange = (value, index) => {
//     setAddress(value);
//     setFormAddress(false);
//   };

//   postalCodeChange = (value, index) => {
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

//   const backButtonHandler = () => {
//     if (accessTokenRegister) {
//       doneRegister();
//     } else if (triger === true) {
//       setTriger(false);
//     } else {
//       setModalNotif(true);
//     }
//     return true;
//   };

//   const loginCheck = async () => {
//     let isLogged = await getSession('isLoggedV2').then((isLogged) => {
//       return isLogged;
//     });
//     if (isLogged === 'yes') {
//       navigation.replace('Home');
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       // refresh back screen
//       loginCheck();
//       // end refresh back screen
//     });

//     BackHandler.addEventListener('hardwareBackPress', backButtonHandler);

//     getPermisionCamera();

//     if (params.province.province_id) {
//       params.province.province_id ? setFormProvinceId(false) : null;
//       setProvinceId(params.province.province_id);
//       setProvinceName(params.province.province_name);
//       if (checkProvinceId) {
//         setCheckProvinceId(true);
//       } else {
//         // setPercent(parseInt(parseInt(perprovinceId) + parseInt(percent)));
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
//         // setPercent(parseInt(parseInt(percityId) + parseInt(percent)));
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
//         // setPercent(parseInt(parseInt(perdistrictId) + parseInt(percent)));
//         setCheckDistrictId(true);
//       }
//     }

//     if (params.bussiness.business_type) {
//       params.bussiness ? setFormBussinessType(false) : null;
//       setBussinessType(params.bussiness.business_type);
//       if (checkBussinessType) {
//         setCheckBussinessType(true);
//       } else {
//         // setPercent(parseInt(parseInt(perbussinesstype) + parseInt(percent)));
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
//         // setPercent(parseInt(parseInt(perincome) + parseInt(percent)));
//         setCheckIncome(true);
//       }
//     }

//     return () => {
//       unsubscribe();
//       BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
//     };
//   }, [
//     backButtonHandler,
//     params.province,
//     params.city,
//     params.district,
//     params.bussiness,
//     params.pendapatan,
//     navigation,
//   ]);

//   const _onRefresh = () => {
//     setIsLoading(false);
//     // setPercent(0);
//   };

//   const handleScroll = (event) => {
//     setLengthScroll(event.nativeEvent.contentOffset.y);
//   };

//   const PendingView = () => <ActivityIndicator size="large" color="#00A79C" />;

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

//   const takePicture = async (camera) => {
//     const options = {quality: 0.5, base64: true};
//     const data = await camera.takePictureAsync(options);
//     if (data.uri) {
//       setKtpImageUrl(data);
//       setTriger(false);
//     }else {
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
//     }else {
//       setSelfieImageUrl('');
//       setFormSelfieImageUrl(true);
//     }
//   };

//   const getSelfi = () => {
//     setTriger(true);
//     setTrigerSelfi(true);
//   };

//   return (
//     <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
//       <StatusBars />
//       <ScrollView
//         contentContainerStyle={{flexGrow: 1}}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             colors={['#4F6CFF', '#4F6CFF']}
//             refreshing={isLoading}
//             onRefresh={_onRefresh}
//           />
//         }
//         onScroll={handleScroll}
//         scrollEventThrottle={16}>
//         {triger === true ? (
//           <RNCamera
//             ref={refCamera}
//             style={s.preview}
//             type={
//               trigerSelfi
//                 ? RNCamera.Constants.Type.front
//                 : RNCamera.Constants.Type.back
//             }
//             flashMode={RNCamera.Constants.FlashMode.off}
//             androidCameraPermissionOptions={{
//               title: 'Permission to use camera',
//               message: 'We need your permission to use your camera',
//               buttonPositive: 'Ok',
//               buttonNegative: 'Cancel',
//             }}
//             androidRecordAudioPermissionOptions={{
//               title: 'Permission to use audio recording',
//               message: 'We need your permission to use your audio',
//               buttonPositive: 'Ok',
//               buttonNegative: 'Cancel',
//             }}>
//             {({camera, status, recordAudioPermissionStatus}) => {
//               if (status !== 'READY') return <PendingView />;
//               return (
//                 <View
//                   style={{
//                     flex: 0,
//                     flexDirection: 'row',
//                     justifyContent: 'center',
//                   }}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       trigerSelfi
//                         ? takePictureSelfi(camera)
//                         : takePicture(camera);
//                     }}
//                     style={s.capture}>
//                     <SvgXml
//                       width="60"
//                       height="50"
//                       style={[styles.mb10, styles.mt10]}
//                       xml={icCamera}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               );
//             }}
//           </RNCamera>
//         ) : (
//           <View style={styles.containerLogin}>
//             <View
//               style={[styles.bgBlue, styles.pl20, styles.pr20, {height: 130}]}>
        
//               {lengthScroll < 11 ? (
//                 <View style={[styles.row, styles.mt20, styles.mb50]}>
//                   <TouchableOpacity
//                     style={[styles.col10, styles.centerContent]}
//                     onPress={() => {
//                       if (accessTokenRegister) {
//                         doneRegister();
//                       } else {
//                         setModalNotif(true);
//                       }
//                     }}>
//                     <SvgXml width="25" height="20" xml={IconBack} />
//                   </TouchableOpacity>
//                   <View
//                     style={[styles.col70, styles.pl10, styles.centerContent]}>
//                     <Text style={[styles.white, styles.bold, styles.fs17]}>
//                       Daftar
//                     </Text>
//                     <Text style={[styles.white, styles.fs12]}>
//                       Lengkapi Data
//                       {/* : {parseInt(percent) > 99 ? 100 : percent}% */}
//                     </Text>
//                   </View>
//                   <TouchableOpacity
//                     onPress={() => {
//                       alert('Lengkapi Data Diri Anda');
//                     }}
//                     style={[styles.col20, styles.RightText, {zIndex: 10}]}>
//                     <SvgXml
//                       width="30"
//                       height="30"
//                       style={[styles.RightText]}
//                       xml={IconQuestionWhite}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               ) : null}
          
//             </View>

//             <View style={styles.boxAllOtp}>
//               <View style={[styles.centerOtpNormal, styles.mt5, styles.pl20]}>
//                 <View style={[styles.row, styles.centerContent, styles.mb20]}>
//                   <View
//                     style={{
//                       width: 45,
//                       height: 45,
//                       backgroundColor: '#4F6CFF',
//                       borderRadius: 100,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}>
//                     <Text style={[styles.white, styles.fs30]}>1</Text>
//                   </View>
//                   <View
//                     style={{
//                       width: 50,
//                       height: 1,
//                       top: '7%',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       backgroundColor: '#DBDBDB',
//                     }}></View>
//                   <View
//                     style={{
//                       width: 45,
//                       height: 45,
//                       backgroundColor: '#4F6CFF',
//                       borderRadius: 100,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}>
//                     <Text style={[styles.white, styles.fs30]}>2</Text>
//                   </View>
//                 </View>
//                 <Text
//                   style={[
//                     styles.black,
//                     styles.bold,
//                     styles.fs17,
//                     styles.textCenter,
//                   ]}>
//                   Data Diri
//                 </Text>
//                 <Text
//                   style={[
//                     styles.grey75,
//                     styles.fs13,
//                     styles.mb20,
//                     styles.mt5,
//                     styles.textCenter,
//                   ]}>
//                   Anda dapat mengisi nanti dan melewati step ini
//                 </Text>
//                 <Text
//                   style={[
//                     styles.black,
//                     styles.fs15,
//                     styles.mt10,
//                     styles.pl2,
//                     styles.bold,
//                   ]}>
//                   Nama Sesuai Identitas (KTP/SIM){''}<Text style={{color:'red'}}>*</Text>
//                 </Text>
//                 <View
//                   style={[
//                     formName ? styles.boxFormOtpRed : styles.boxFormOtp,
//                     styles.center,
//                   ]}>
//                   <TextInput
//                     autoCorrect={false}
//                     style={[
//                       styles.PulsaInputBoxNew,
//                       styles.black,
//                       styles.fontWSR,
//                       styles.pl2,
//                     ]}
//                     placeholder="Masukkan Nama Sesuai Identitas (KTP/SIM)"
//                     placeholderTextColor="#757575"
//                     underlineColorAndroid="transparent"
//                     value={name}
//                     onChangeText={nameChange}
//                     maxLength={40}
//                   />
//                   {formName ? (
//                     <View style={{position: 'absolute', left: 3, bottom: -18}}>
//                       <Text style={{color: 'red', fontSize: 10}}>
//                         Masukkan Nama Sesuai Identitas (KTP/SIM)
//                       </Text>
//                     </View>
//                   ) : null}
//                 </View>
//                 <Text
//                   style={[styles.black, styles.fs15, styles.pl2, styles.bold]}>
//                   Nomor Identitas (KTP/SIM){''}<Text style={{color:'red'}}>*</Text>
//                 </Text>
//                 <View
//                   style={[
//                     formKtp ? styles.boxFormOtpRed : styles.boxFormOtp,
//                     styles.center,
//                   ]}>
//                   <TextInput
//                     autoCorrect={false}
//                     style={[
//                       styles.PulsaInputBoxNew,
//                       styles.black,
//                       styles.fontWSR,
//                       styles.pl2,
//                     ]}
//                     placeholder="Masukkan Nomor Identitas (KTP/SIM)"
//                     placeholderTextColor="#757575"
//                     underlineColorAndroid="transparent"
//                     value={ktp}
//                     onChangeText={ktpChange}
//                     maxLength={16}
//                     keyboardType="numeric"
//                   />
//                   {formKtp ? (
//                     <View style={{position: 'absolute', left: 3, bottom: -18}}>
//                       <Text style={{color: 'red', fontSize: 10}}>
//                         Masukkan Nomor Identitas (KTP/SIM)
//                       </Text>
//                     </View>
//                   ) : null}
//                 </View>
//                 <Text
//                   style={[
//                     styles.black,
//                     styles.fs15,
//                     styles.pl2,
//                     styles.bold,
//                     styles.mt5,
//                   ]}>
//                   Jenis Kelamin{''}<Text style={{color:'red'}}>*</Text>
//                 </Text>
//                 <View style={[styles.row, styles.mb10, styles.mt5]}>
//                   <View style={[styles.col50]}>
//                     <TouchableNativeFeedback
//                       background={TouchableNativeFeedback.Ripple('#DDD')}
//                       onPress={() => {
//                         chooseGender('male');
//                       }}>
//                       <View style={[styles.row]}>
//                         <View
//                           style={
//                             gender === 'male'
//                               ? styles.genderActiveStyle
//                               : styles.genderStyle
//                           }
//                         />
//                         <Text
//                           style={[
//                             styles.black,
//                             styles.fs15,
//                             styles.mt10,
//                             styles.pl2,
//                           ]}>
//                           Laki-Laki
//                         </Text>
//                       </View>
//                     </TouchableNativeFeedback>
//                   </View>
//                   <View style={[styles.col50]}>
//                     <TouchableNativeFeedback
//                       background={TouchableNativeFeedback.Ripple('#DDD')}
//                       onPress={() => {
//                         chooseGender('female');
//                       }}>
//                       <View style={[styles.row]}>
//                         <View
//                           style={
//                             gender === 'female'
//                               ? styles.genderActiveStyle
//                               : styles.genderStyle
//                           }
//                         />
//                         <Text
//                           style={[
//                             styles.black,
//                             styles.fs15,
//                             styles.mt10,
//                             styles.pl2,
//                           ]}>
//                           Perempuan
//                         </Text>
//                       </View>
//                     </TouchableNativeFeedback>
//                   </View>
//                 </View>
//                 <Text
//                   style={[styles.black, styles.fs15, styles.pl2, styles.bold]}>
//                   Provinsi{''}<Text style={{color:'red'}}>*</Text>
//                 </Text>
//                 <Ripple
//                   style={[
//                     styles.row,
//                     formProvinceId ? styles.arePageRed : styles.arePage,
//                     styles.mb10,
//                   ]}
//                   onPress={() => {
//                     navigation.navigate('Province', {
//                       pages: 'RegisterKyc',
//                     });
//                   }}>
//                   <View style={[styles.col90]}>
//                     <Text
//                       style={[
//                         styles.fs13,
//                         provinceId ? styles.black : styles.grey75,
//                         styles.fontWSR,
//                       ]}>
//                       {provinceId ? provinceName : 'Pilih Provinsi'}
//                     </Text>
//                   </View>
//                   <View style={[styles.col10, styles.center]}>
//                     <SvgXml width={15} height={15} xml={IconBottom} />
//                   </View>
//                 </Ripple>

//                 {formProvinceId ? (
//                   <View style={{position: 'relative', left: 5, bottom: 4}}>
//                     <Text style={{color: 'red', fontSize: 10}}>
//                       Pilih Provinsi
//                     </Text>
//                   </View>
//                 ) : null}

//                 <Text
//                   style={[styles.black, styles.fs15, styles.pl2, styles.bold]}>
//                   Kota{''}<Text style={{color:'red'}}>*</Text>
//                 </Text>
//                 <Ripple
//                   style={[
//                     styles.row,
//                     formCityId ? styles.arePageRed : styles.arePage,
//                     styles.mb10,
//                   ]}
//                   onPress={() => {
//                     navigation.navigate('City', {
//                       pages: 'RegisterKyc',
//                       province_id: provinceId,
//                     });
//                   }}>
//                   <View style={[styles.col90]}>
//                     <Text
//                       style={[
//                         styles.fs13,
//                         cityName ? styles.black : styles.grey75,
//                         styles.fontWSR,
//                       ]}>
//                       {cityName ? cityType + ' ' + cityName : 'Pilih Kota'}
//                     </Text>
//                   </View>
//                   <View style={[styles.col10, styles.center]}>
//                     <SvgXml width={15} height={15} xml={IconBottom} />
//                   </View>
//                 </Ripple>

//                 {formCityId ? (
//                   <View style={{position: 'relative', left: 5, bottom: 4}}>
//                     <Text style={{color: 'red', fontSize: 10}}>Pilih Kota</Text>
//                   </View>
//                 ) : null}
//                 <Text
//                   style={[styles.black, styles.fs15, styles.pl2, styles.bold]}>
//                   Kecamatan{''}<Text style={{color:'red'}}>*</Text>
//                 </Text>
//                 <Ripple
//                   style={[
//                     styles.row,
//                     formDistrictId ? styles.arePageRed : styles.arePage,
//                     styles.mb10,
//                   ]}
//                   onPress={() => {
//                     navigation.navigate('District', {
//                       pages: 'RegisterKyc',
//                       city_id: cityId,
//                     });
//                   }}>
//                   <View style={[styles.col90]}>
//                     <Text
//                       style={[
//                         styles.fs13,
//                         districtName ? styles.black : styles.grey75,
//                         styles.fontWSR,
//                       ]}>
//                       {districtName ? districtName : 'Pilih Kecamatan'}
//                     </Text>
//                   </View>
//                   <View style={[styles.col10, styles.center]}>
//                     <SvgXml width={15} height={15} xml={IconBottom} />
//                   </View>
//                 </Ripple>

//                 {formDistrictId ? (
//                   <View style={{position: 'relative', left: 5, bottom: 4}}>
//                     <Text style={{color: 'red', fontSize: 10}}>
//                       Pilih Kecamatan
//                     </Text>
//                   </View>
//                 ) : null}
//                 <Text
//                   style={[styles.black, styles.fs15, styles.pl2, styles.bold]}>
//                   Alamat Sesuai Identitas (KTP/SIM){''}<Text style={{color:'red'}}>*</Text>
//                 </Text>
//                 <View
//                   style={[
//                     formAddress ? styles.boxFormOtpRed : styles.boxFormOtp,
//                     styles.center,{ height: 60}
//                   ]}>
//                   <TextInput
//                     autoCorrect={false}
//                     style={[
//                       styles.PulsaInputBoxNew,
//                       styles.black,
//                       styles.fontWSR,
//                       styles.pl2,
//                     ]}
//                     placeholder="Masukkan Alamat"
//                     placeholderTextColor="#757575"
//                     underlineColorAndroid="transparent"
//                     value={address}
//                     multiline={true}
//                     numberOfLines={4}
//                     onChangeText={addressChange}
//                     maxLength={100}
//                   />
//                   {formAddress ? (
//                     <View style={{position: 'absolute', left: 3, bottom: -18}}>
//                       <Text style={{color: 'red', fontSize: 10}}>
//                         Masukkan Alamat
//                       </Text>
//                     </View>
//                   ) : null}
//                 </View>
//                 <Text
//                   style={[styles.black, styles.fs15, styles.pl2, styles.bold]}>
//                   Kode POS{''}<Text style={{color:'red'}}>*</Text>
//                 </Text>
//                 <View
//                   style={[
//                     formPostalCode ? styles.boxFormOtpRed : styles.boxFormOtp,
//                     styles.center,
//                   ]}>
//                   <TextInput
//                     autoCorrect={false}
//                     style={[
//                       styles.PulsaInputBoxNew,
//                       styles.black,
//                       styles.fontWSR,
//                       styles.pl2,
//                     ]}
//                     placeholder="Masukkan Kode POS"
//                     placeholderTextColor="#757575"
//                     underlineColorAndroid="transparent"
//                     value={postalCode}
//                     onChangeText={postalCodeChange}
//                     keyboardType="numeric"
//                     maxLength={5}
//                   />
//                   {formPostalCode ? (
//                     <View style={{position: 'absolute', left: 3, bottom: -18}}>
//                       <Text style={{color: 'red', fontSize: 10}}>
//                         Masukkan Kode POS
//                       </Text>
//                     </View>
//                   ) : null}
//                 </View>
//                 <Text
//                   style={[styles.black, styles.fs15, styles.pl2, styles.bold]}>
//                   Email{''}<Text style={{color:'red'}}>*</Text>
//                 </Text>
//                 <View
//                   style={[
//                     formEmail || isValidEmail
//                       ? styles.boxFormOtpRed
//                       : styles.boxFormOtp,
//                     styles.center,
//                   ]}>
//                   <TextInput
//                     autoCorrect={false}
//                     style={[
//                       styles.PulsaInputBoxNew,
//                       styles.black,
//                       styles.fontWSR,
//                       styles.pl2,
//                     ]}
//                     placeholder="Masukkan Email"
//                     placeholderTextColor="#757575"
//                     underlineColorAndroid="transparent"
//                     value={email}
//                     onChangeText={emailChange}
//                     keyboardType="email-address"
//                     maxLength={40}
//                   />
//                   {formEmail ? (
//                     <View style={{position: 'absolute', left: 3, bottom: -18}}>
//                       <Text style={{color: 'red', fontSize: 10}}>
//                         {messageEmail}
//                       </Text>
//                     </View>
//                   ) : null}
//                   {isValidEmail ? (
//                     <View style={{position: 'absolute', right: 3, bottom: -18}}>
//                       <Text style={{color: 'red', fontSize: 10}}>
//                         Format Email Harus Benar
//                       </Text>
//                     </View>
//                   ) : null}
//                 </View>
//                 <Text
//                   style={[styles.black, styles.fs15, styles.pl2, styles.bold]}>
//                   Nomor WhatsApp{''}<Text style={{color:'red'}}>*</Text>
//                 </Text>
//                 <View
//                   style={[
//                     formPhone ? styles.boxFormOtpRed : styles.boxFormOtp,
//                     styles.center,
//                   ]}>
//                   <TextInput
//                     autoCorrect={false}
//                     style={[
//                       styles.PulsaInputBoxNew,
//                       styles.black,
//                       styles.fontWSR,
//                       styles.pl2,
//                     ]}
//                     keyboardType="numeric"
//                     placeholder="Masukkan Nomor WhatsApp"
//                     placeholderTextColor="#757575"
//                     underlineColorAndroid="transparent"
//                     value={phone}
//                     onChangeText={phoneChange}
//                     maxLength={14}
//                   />
//                   {formPhone ? (
//                     <View style={{position: 'absolute', left: 3, bottom: -18}}>
//                       <Text style={{color: 'red', fontSize: 10}}>
//                         {minPhone ? 'Minimal 9 digit' : 'Masukkan Nomor Whatsapp'}
//                       </Text>
//                     </View>
//                   ) : null}
//                 </View>
//                 <View style={[styles.row]}>
//                   <View style={[styles.col90]}>
//                     <Text
//                       style={[
//                         styles.black,
//                         styles.fs15,
//                         styles.pl2,
//                         styles.bold,
//                         styles.mt5,
//                       ]}>
//                       Foto ID & Swafoto ID (KTP/SIM){''}<Text style={{color:'red'}}>*</Text>
//                     </Text>
//                   </View>
//                   <TouchableOpacity
//                     onPress={() => {
//                       alert('Foto Harus Jelas');
//                     }}
//                     style={[styles.col10]}>
//                     <SvgXml
//                       width="30"
//                       height="30"
//                       style={[styles.RightText]}
//                       xml={IconQuestionGrey}
//                     />
//                   </TouchableOpacity>
//                 </View>
//                 <TouchableOpacity
//                   onPress={() => {
//                     setTriger(true);
//                   }}
//                   style={[
//                     formKtpImageUrl ? styles.boxFotoRed : styles.boxFoto,
//                     styles.center,
//                     styles.pt10,
//                     styles.pb10,
//                     styles.mt10,
//                   ]}>
//                   {ktpImageUrl ? (
//                     <Image
//                       resizeMethod="resize"
//                       resizeMode="contain"
//                       source={{uri: ktpImageUrl.uri}}
//                       style={[styles.imageDefault]}
//                     />
//                   ) : (
//                     <SvgXml
//                       width="60"
//                       height="50"
//                       style={[styles.mb10, styles.mt10]}
//                       xml={IconKtp}
//                     />
//                   )}
//                   {ktpImageUrl ? (
//                     <Text style={[styles.black, styles.fs15, styles.mb10]}>
//                       Ganti{' '}
//                       <Text style={[styles.black, styles.fs15, styles.bold]}>
//                         foto KTP/SIM
//                       </Text>
//                     </Text>
//                   ) : (
//                     <Text style={[styles.black, styles.fs15, styles.mb10]}>
//                       Unggah{' '}
//                       <Text style={[styles.black, styles.fs15, styles.bold]}>
//                         foto KTP/SIM
//                       </Text>{' '}
//                       anda disini
//                     </Text>
//                   )}
//                 </TouchableOpacity>
//                 {formKtpImageUrl ? (
//                   <Text style={[styles.fs10, styles.mH5, {color: 'red'}]}>
//                     Foto KTP wajib di isi
//                   </Text>
//                 ) : null}
//                 <TouchableOpacity
//                   onPress={() => {
//                     getSelfi();
//                   }}
//                   style={[
//                     formSelfieImageUrl ? styles.boxFotoRed : styles.boxFoto,
//                     styles.center,
//                     styles.pt10,
//                     styles.pb10,
//                     styles.mt15,
//                     styles.mb10,
//                   ]}>
//                   {selfieImageUrl ? (
//                     <Image
//                       resizeMethod="resize"
//                       resizeMode="contain"
//                       source={{uri: selfieImageUrl.uri}}
//                       style={[styles.imageDefault]}
//                     />
//                   ) : (
//                     <SvgXml
//                       width="60"
//                       height="50"
//                       style={[styles.mb10, styles.mt10]}
//                       xml={IconSelfie}
//                     />
//                   )}
//                   {selfieImageUrl ? (
//                     <Text style={[styles.black, styles.fs15, styles.mb10]}>
//                       Ganti{' '}
//                       <Text style={[styles.black, styles.fs15, styles.bold]}>
//                         foto selfie dengan KTP/SIM
//                       </Text>
//                     </Text>
//                   ) : (
//                     <Text style={[styles.black, styles.fs15, styles.mb10]}>
//                       Unggah foto selfie dengan{' '}
//                       <Text style={[styles.black, styles.fs15, styles.bold]}>
//                         KTP/SIM
//                       </Text>
//                     </Text>
//                   )}
//                 </TouchableOpacity>
//                 {formSelfieImageUrl ? (
//                   <Text
//                     style={[
//                       styles.fs10,
//                       styles.mH5,
//                       styles.mb5,
//                       {color: 'red'},
//                     ]}>
//                     Foto selfi dengan KTP wajib di isi
//                   </Text>
//                 ) : null}

//                 {/* <Text
//                   style={[
//                     styles.black,
//                     styles.bold,
//                     styles.fs17,
//                     styles.textCenter,
//                   ]}>
//                   Data Usaha
//                 </Text>
//                 <Text
//                   style={[
//                     styles.grey75,
//                     styles.fs13,
//                     styles.mb20,
//                     styles.mt5,
//                     styles.textCenter,
//                   ]}>
//                   Lengkapi data Usaha, Fitur QRIS anda akan didaftarkan{'\n'}(
//                   proses 3 hari kerja )
//                 </Text>
//                 <Text
//                   style={[styles.black, styles.fs15, styles.pl2, styles.bold]}>
//                   Jenis Usaha
//                 </Text>
//                 <TouchableOpacity
//                   style={[
//                     styles.row,
//                     formBussinessType ? styles.arePageRed : styles.arePage,
//                     styles.mb5,
//                   ]}
//                   onPress={() => {
//                     navigation.navigate('Bussiness', {
//                       pages: 'RegisterKyc',
//                     });
//                   }}>
//                   <View style={[styles.col90]}>
//                     <Text
//                       style={[
//                         styles.fs13,
//                         bussinessType ? styles.black : styles.grey75,
//                         styles.fontWSR,
//                       ]}>
//                       {bussinessType ? bussinessType : 'Pilih Jenis Usaha'}
//                     </Text>
//                   </View>
//                   <View style={[styles.col10, styles.center]}>
//                     <SvgXml width={15} height={15} xml={IconBottom} />
//                   </View>
//                 </TouchableOpacity>
//                 {formBussinessType ? (
//                   <View style={{position: 'relative', left: 5, bottom: 4}}>
//                     <Text style={{color: 'red', fontSize: 10}}>
//                       Pilih Jenis Usaha
//                     </Text>
//                   </View>
//                 ) : null}
//                 <Text
//                   style={[styles.black, styles.fs15, styles.pl2, styles.bold]}>
//                   Pendapatan Per Tahun
//                 </Text>
//                 <TouchableOpacity
//                   style={[
//                     styles.row,
//                     formIncome ? styles.arePageRed : styles.arePage,
//                     styles.mb5,
//                   ]}
//                   onPress={() => {
//                     navigation.navigate('Pendapatan', {
//                       pages: 'RegisterKyc',
//                     });
//                   }}>
//                   <View style={[styles.col90]}>
//                     <Text
//                       style={[
//                         styles.fs13,
//                         incomeName ? styles.black : styles.grey75,
//                         styles.fontWSR,
//                       ]}>
//                       {incomeName ? incomeName : 'Pilih Pendapatan Per Tahun'}
//                     </Text>
//                   </View>
//                   <View style={[styles.col10, styles.center]}>
//                     <SvgXml width={15} height={15} xml={IconBottom} />
//                   </View>
//                 </TouchableOpacity>
//                 {formIncome ? (
//                   <View style={{position: 'relative', left: 5, bottom: 4}}>
//                     <Text style={{color: 'red', fontSize: 10}}>
//                       Pilih Pendapatan Per Tahun
//                     </Text>
//                   </View>
//                 ) : null}
//                 <Text
//                   style={[
//                     styles.black,
//                     styles.fs15,
//                     styles.pl2,
//                     styles.bold,
//                     styles.mt5,
//                   ]}>
//                   Nama Usaha (Nama QRIS)
//                 </Text>
//                 <View
//                   style={[
//                     formqrisName ? styles.boxFormOtpRed : styles.boxFormOtp,
//                     styles.center,
//                     {marginBottom: formqrisName ? 10 : 0},
//                   ]}>
//                   <TextInput
//                     autoCorrect={false}
//                     style={[
//                       styles.PulsaInputBoxNew,
//                       styles.black,
//                       styles.fontWSR,
//                       styles.pl2,
//                     ]}
//                     placeholder="Masukkan Nama Usaha/ Nama QRIS"
//                     placeholderTextColor="#757575"
//                     underlineColorAndroid="transparent"
//                     value={qrisName}
//                     onChangeText={qrisNameChange}
//                     maxLength={40}
//                   />
//                   {formqrisName ? (
//                     <View style={{position: 'absolute', left: 3, bottom: -18}}>
//                       <Text style={{color: 'red', fontSize: 10}}>
//                         Masukkan Nama Usaha/ Nama QRIS
//                       </Text>
//                     </View>
//                   ) : null}
//                 </View>
                
//                 <TouchableOpacity
//                   activeOpacity={0.4}
//                   onPress={() => {
//                     chooseName(!nameAnda);
//                   }}>
//                   <View style={[styles.row, styles.mb10, styles.ml5]}>
//                     <View
//                       style={
//                         nameAnda ? styles.nameActiveStyle : styles.nameStyle
//                       }
//                     />
//                     <Text
//                       style={[
//                         styles.black,
//                         styles.fs15,
//                         styles.mt7,
//                         styles.pl2,
//                       ]}>
//                       Isi dengan Nama Anda
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//                 <Text
//                   style={[
//                     styles.grey75,
//                     styles.fs13,
//                     styles.mb20,
//                     styles.mt5,
//                     styles.textCenter,
//                   ]}>
//                   Preview Hasil
//                 </Text>
//                 <View style={styles.center}>
//                   <View
//                     style={[
//                       {
//                         position: 'absolute',
//                         top: '16%',
//                         left: 0,
//                         right: 0,
//                         textAlign: 'center',
//                         zIndex: 1,
//                         marginHorizontal: '24%',
//                       },
//                     ]}>
//                     <Text
//                       style={[
//                         styles.fontWSB,
//                         styles.black,
//                         styles.fs11,
//                         styles.centerText,
//                       ]}>
//                       {qrisName}
//                     </Text>
//                   </View>
//                   <Image
//                     resizeMethod="resize"
//                     resizeMode="contain"
//                     source={ImgQris}
//                     style={{
//                       height: 300,
//                       width: 250,
//                       marginBottom: 20,
//                     }}
//                   />
//                 </View>
//                  */}

//                 <View style={[styles.row, styles.mt20, styles.mr10]}>
//                   <SvgXml width="30" height="30" xml={IcAnn} />
//                   <Text style={[styles.grey75, styles.fs13, styles.pl10]}>
//                     Dengan masuk atau mendaftar, Anda menyetujui{' '}
//                     <Text onPress={() => openWebView('1')} style={[styles.blue, styles.fs13, styles.fontWSB]}>
//                       Ketentuan Layanan
//                     </Text>{' '}
//                     dan{' '}
//                     <Text onPress={() => openWebView('2')} style={[styles.blue, styles.fs13, styles.fontWSB]}>
//                       Kebijakan Privasi{' '}
//                     </Text>
//                     Uwang
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         )}
//       </ScrollView>
//       {triger === true ? null : (
//         <View
//           style={[
//             styles.row,
//             styles.borderTop1,
//             styles.pt5,
//             styles.mb5,
//             styles.pr15,
//             styles.pl15,
//           ]}>
//           <TouchableOpacity
//             activeOpacity={0.6}
//             style={[styles.col50, styles.center]}
//             onPress={() => {
//               !isLoading
//                 ? accessTokenRegister
//                   ? doneRegister()
//                   : actionCheck('RegisterOnly')
//                 : null;
//             }}>
//             <Text style={[styles.green, styles.fs15, styles.fontWSB]}>
//               {isLoading ? 'Loading ...' : 'Nanti Saja'}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             activeOpacity={0.6}
//             style={[styles.btnDaftarGreen, styles.col50]}
//             onPress={() => {
//               !isLoading
//                 ? checkKyc
//                   ? actionCheck('RegisterWithKyc')
//                   : registerKycData(accessTokenRegister)
//                 : null;
//             }}>
//             <Text style={[styles.white, styles.fs15]}>
//               {isLoading ? 'Loading ...' : 'Simpan'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       <ModalNotifs
//         close={true}
//         modal={'normal'}
//         tanpaPin={'no'}
//         isVisible={modalNotif}
//         onSwipeComplete={() => setModalNotif(false)}
//         title={'Notifikasi'}
//         message={'Jika kembali data Anda akan terhapus'}
//         titleClose={'Tidak'}
//         titleButton={'Ya'}
//         onPressClose={() => {
//           setModalNotif(false);
//         }}
//         onPress={() => {
//           navigation.navigate('Register', {
//             phone: dataReg.phone,
//             registerToken: dataReg.registerToken,
//           });
//         }}
//       />
//     </SafeAreaView>
//   );
// };

// export default RegisterKyc;

// const s = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   preview: {
//     flex: 1,
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
