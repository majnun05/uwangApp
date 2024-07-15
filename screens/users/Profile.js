// import React, {useEffect, useState, createRef, useRef} from 'react';
// import {
//   SafeAreaView,
//   BackHandler,
//   ScrollView,
//   View,
//   Text,
//   TouchableOpacity,
//   RefreshControl,
//   InteractionManager,
//   TouchableNativeFeedback,
//   Linking,
//   Image,
//   Pressable,
//   StyleSheet,
//   Alert,
//   ToastAndroid,
//   PermissionsAndroid,
//   Dimensions,
//   ActivityIndicator,
// } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
// import {InAppBrowser} from 'react-native-inappbrowser-reborn';
// import Ripple from 'react-native-material-ripple';
// import Clipboard from '@react-native-community/clipboard';
// import IcOutMutasi from '../../assets/svg/mutasiKeluar.svg';
// import IcAddMutasi from '../../assets/svg/mutasiMasuk.svg';
// import IcQr from '../../assets/svg/QrCode.svg';
// import {useNavigation} from '@react-navigation/native';
// import {SvgXml} from 'react-native-svg';
// import {Fonts} from '../../assets/fonts/Fonts';
// import ActionSheet from 'react-native-actions-sheet';
// import LogoPT from '../../assets/img/LogoPT.png'
// import {
//   apiUserProfile,
//   apiQrisBalance,
//   apiPaylaterBalance,
//   apiTransactionWithdraw,
//   apiTransactionPaylater,
//   apiUserTrxNetwork,
//   apiUtilityComment,
//   apiUserLogout,
//   apiUtilityConfig,
//   apiUserCheckKyc,
//   apiPaylaterCheck,
//   apiGetProfileImage,
//   apiUpdateProfileImage,
//   apiMutasiSummary,
// } from '../../helpers/endPoint';
// import {useApiPost, useApiUpdateAvatar} from '../../helpers/useFetch';
// import {
//   setSession,
//   getSession,
//   getSnackBar_error,
//   getSnackBar_success,
//   getRupiah,
// } from '../../helpers/Helpers';
// import styles from '../../assets/styles/Style';
// import ModalPin from '../../content/modal/ModalPin';
// import ModalNotif from '../../content/modal/ModalNotif';
// import ModalNilai from '../../content/modal/ModalNilai';
// import StatusKyc from '../../content/fitur/StatusKyc';
// import IconHeaderCom from '../../assets/svg/header-com.svg';
// import IconBack from '../../assets/svg/back.svg';
// import IconPencil from '../../assets/svg/pencil.svg';
// import IconProfile from '../../assets/svg/profile.svg';
// import IconCopyWhite from '../../assets/svg/copypaste-white.svg';
// import IconRightArrow from '../../assets/svg/right-arrow.svg';
// import Database from '../../helpers/Database';
// import IcCamera from '../../assets/svg/IcCamera.svg';
// import {
//   IcArrLine,
//   IcArrR,
//   IcPickGalery,
//   IcProfile,
//   IcProfileFix,
//   IcQris,
//   IcRigthRow,
//   IcTakeCamera,
//   IcWallet,
//   ImgAvatar,
//   ImgBlok,
//   LogoProfilePT,
//   LogoUwangPT
// } from '../../assets';
// import Modal from 'react-native-modal';
// import { CommonActions } from "@react-navigation/native";
// import {IcBackCamera, IcFlipCamera} from '../../assets';
// import icCamera from '../../assets/svg/ic_camera.svg';
// import {RNCamera} from 'react-native-camera';
// import moment from 'moment';
// moment.locale('ID');

// const actionSheetRef = createRef();
// const HEIGH = Dimensions.get('window').height

// const db = new Database();

// const Profile = ({route}) => {
//   // let {params} = props.route;
//   const navigation = useNavigation();
//   const refCamera = useRef();
//   const [rote, setRote] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLoadingQris, setIsLoadingQris] = useState(false);
//   const [isLoadingPay, setIsLoadingPay] = useState(false);
//   const [modalKomisi, setModalKomisi] = useState(false);
//   const [modalPaylater, setModalPaylater] = useState(false);
//   const [checkKyc, setCheckKyc] = useState('0');
//   const [modalLogout, setModalLogout] = useState(false);
//   const [modalRate, setModalRate] = useState(false);
//   const [tanpaPin, setTanpaPin] = useState('no');
//   const [pin, setPin] = useState('');
//   const [trxNetwork, setTrxNetwork] = useState('');
//   const [data, setData] = useState({});
//   const [dataQris, setDataQris] = useState({});
//   const [dataPaylater, setDataPaylater] = useState({
//     balance_paylater: 0,
//     balance_paylater_real: 0,
//   });
//   const [comment, setComment] = useState('');
//   const [commentCount, setCommentCount] = useState(0);
//   const [rate, setRate] = useState(0);
//   const [informasi, setInformasi] = useState({});
//   const [syarat, setSyarat] = useState({});
//   const [kebijakan, setKebijakan] = useState({});
//   const [checkPaylater, setCheckPaylater] = useState(false);
//   const [versionName, setVersionName] = useState('1.0.0');
//   const [versionNameSystem, setVersionNameSystem] = useState('1.0.0');
//   const [avatar, setAvatar] = useState('');
//   const [debit, setDebit] = useState('');
//   const [credit, setCredit] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [date, setDate] = useState(new Date());
//   const [camera, setCamera] = useState(false)
//   let output = moment(date, 'MM-YY');
//   let isMounted = true;

//   const requestCameraPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'Izin Kamera',
//           message: 'Aplikasi Uwang membutuhkan izin Kamera Anda',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         return;
//         // ToastAndroid.show('Izin Kamera Sukses', ToastAndroid.SHORT)
//       } else {
//         getSnackBar_error({
//           title: 'Aplikasi Uwang membutuhkan izin Kamera Anda',
//           duration: 'LENGTH_LONG',
//         });
//       }
//     } catch (err) {
//       getSnackBar_error({
//         title: 'Aplikasi Uwang membutuhkan izin Kamera Anda',
//         duration: 'LENGTH_LONG',
//       });
//     }
//   };

//   // ========================
//   // === Get User Profile ===
//   // ========================
//   const isLogged = async () => {
//     let isLogged = await getSession('isLoggedV2').then((isLogged) => {
//       return isLogged;
//     });
//     let tanpaPin_ = await getSession('tanpaPin').then((tanpaPin) => {
//       return tanpaPin;
//     });

//     if (isLogged === 'yes') {
//       if (isMounted) {
//         setTanpaPin(tanpaPin_);
//         setVersionNameSystem(DeviceInfo.getVersion());
//       }
//       await useApiPost(apiUserProfile(), {})
//         .then((res) => {
//           getRef();
//           if (isMounted) {
//             setIsLoading(false);
//             if (res.statusCode === 200) {
//               let val = res.values;
//               setData(val.data);
//             } else if (res.statusCode === 500) {
//               getSnackBar_error({
//                 title: res.values.message,
//                 duration: 'LENGTH_INDEFINITE',
//               });
//             } else {
//               setIsLoading(false);
//             }
//           }
//         })
//         .catch((error) => {
//           setIsLoading(false);
//         });
//     } else {
//       setIsLoading(false);
//     }
//   };

//   // ========================
//   // === Get Reference ===
//   // ========================
//   const getCheckPaylater = async () => {
//     await useApiPost(apiPaylaterCheck(), {})
//       .then((res) => {
//         if (isMounted) {
//           if (res.statusCode === 200) {
//             let val = res.values;
//             if (val.values) {
//               getBalancePaylater();
//             }
//             setCheckPaylater(val.values);
//           } else if (res.statusCode === 500) {
//             getSnackBar_error({
//               title: res.values.message,
//               duration: 'LENGTH_INDEFINITE',
//             });
//           } else {
//             setIsLoading(false);
//           }
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//       });
//   };

//   // ========================
//   // === Get Reference ===
//   // ========================
//   const getCheckKyc = async () => {
//     await useApiPost(apiUserCheckKyc(), {})
//       .then((res) => {
//         if (isMounted) {
//           if (res.statusCode === 200) {
//             let val = res.values;
//             setCheckKyc(val.data.registered);
//             setSession({
//               name: 'checkKycSess',
//               value: val.data.registered ? val.data.registered.toString() : '0',
//             });
//           } else if (res.statusCode === 500) {
//             getSnackBar_error({
//               title: res.values.message,
//               duration: 'LENGTH_INDEFINITE',
//             });
//           } else {
//             setIsLoading(false);
//           }
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//       });
//   };

//   // ========================
//   // === Get Balance Qris ===
//   // ========================
//   const getBalanceQris = async () => {
//     setIsLoadingQris(true);
//     await useApiPost(apiQrisBalance(), {})
//       .then((res) => {
//         if (isMounted) {
//           setIsLoadingQris(false);
//           if (res.statusCode === 200) {
//             let val = res.values.values;
//             setDataQris(val);
//           } else if (res.statusCode === 500) {
//             getSnackBar_error({
//               title: res.values.message,
//               duration: 'LENGTH_INDEFINITE',
//             });
//           } else {
//             setIsLoading(false);
//           }
//         }
//       })
//       .catch((error) => {
//         setIsLoadingQris(false);
//       });
//   };

//   // ========================
//   // === Get Balance Paylater ===
//   // ========================
//   const getBalancePaylater = async () => {
//     setIsLoadingPay(true);
//     await useApiPost(apiPaylaterBalance(), {})
//       .then((res) => {
//         if (isMounted) {
//           setIsLoadingPay(false);
//           if (res.statusCode === 200) {
//             let val = res.values;
//             setDataPaylater(val.values);
//           } else if (res.statusCode === 500) {
//             setDataPaylater({
//               balance_paylater: 0,
//               balance_paylater_real: 0,
//             });
//             getSnackBar_error({
//               title: res.values.message,
//               duration: 'LENGTH_INDEFINITE',
//             });
//           } else {
//             setDataPaylater({
//               balance_paylater: 0,
//               balance_paylater_real: 0,
//             });
//             setIsLoading(false);
//           }
//         }
//       })
//       .catch((error) => {
//         setIsLoadingPay(false);
//       });
//   };

//   // ========================
//   // === Get Reference ===
//   // ========================
//   const getRef = async () => {
//     await useApiPost(apiUtilityConfig(), {})
//       .then((res) => {
//         // console.log({res})
//         if (isMounted) {
//           if (res.statusCode === 200) {
//             let val = res.values;
//             setInformasi(val.values.informasi);
//             setSyarat(val.values.syarat);
//             setKebijakan(val.values.kebijakan);

//             // let versionPlaystore = val.values.versionPlaystore
//             //   ? val.values.versionPlaystore
//             //   : '2.1';
//             // setVersionName(versionPlaystore);
//           } else if (res.statusCode === 500) {
//             getSnackBar_error({
//               title: res.values.message,
//               duration: 'LENGTH_INDEFINITE',
//             });
//           } else {
//             setIsLoading(false);
//           }
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//       });
//   };

//   // ========================
//   // === Tarik Komisi ===
//   // ========================
//   const submitWithdraw = async () => {
//     if (pin === '') {
//       getSnackBar_error({
//         title: 'Masukkan PIN Anda',
//         duration: 'LENGTH_INDEFINITE',
//       });
//     } else {
//       setModalKomisi(false);
//       setTimeout(async () => {
//         setIsLoading(true);
//         await useApiPost(apiTransactionWithdraw(), {
//           pin: pin,
//         })
//           .then((res) => {
//             setIsLoading(false);
//             if (res.statusCode === 200) {
//               return getSnackBar_success({
//                 title: res.values.message,
//                 duration: 'LENGTH_INDEFINITE',
//               });
//             } else {
//               getSnackBar_error({
//                 title: res.values.message,
//                 duration: 'LENGTH_INDEFINITE',
//               });
//             }
//           })
//           .catch((error) => {
//             setIsLoading(false);
//           });
//       }, 500);
//     }
//   };

//   // ========================
//   // === Comment Rate ===
//   // ========================
//   const submitComment = async () => {
//     if (comment === '' || rate === 0) {
//       getSnackBar_error({
//         title: 'Lengkapi Data',
//         duration: 'LENGTH_INDEFINITE',
//       });
//     } else {
//       setModalRate(false);
//       setTimeout(async () => {
//         setIsLoading(true);
//         await useApiPost(apiUtilityComment(), {
//           description: comment,
//           rate: rate.toString(),
//         })
//           .then((res) => {
//             setIsLoading(false);
//             if (res.statusCode === 200) {
//               setRate(0);
//               setComment('');
//               setCommentCount(0);
//               navigation.navigate('RateSuccess', {
//                 message: res.values.message,
//               });
//             } else {
//               getSnackBar_error({
//                 title: res.values.message,
//                 duration: 'LENGTH_INDEFINITE',
//               });
//             }
//           })
//           .catch((error) => {
//             setIsLoading(false);
//           });
//       }, 500);
//     }
//   };

//   // ========================
//   // === Klaim Paylater ===
//   // ========================
//   const submitKlaimPaylater = async () => {
//     if (pin === '') {
//       getSnackBar_error({
//         title: 'Masukkan PIN Anda',
//         duration: 'LENGTH_INDEFINITE',
//       });
//     } else {
//       setModalPaylater(false);
//       setTimeout(async () => {
//         setIsLoading(true);
//         await useApiPost(apiTransactionPaylater(), {
//           pin: pin,
//         })
//           .then((res) => {
//             setIsLoading(false);
//             if (res.statusCode === 200) {
//               return getSnackBar_success({
//                 title: res.values.message,
//                 duration: 'LENGTH_INDEFINITE',
//               });
//             } else {
//               getSnackBar_error({
//                 title: res.values.message,
//                 duration: 'LENGTH_INDEFINITE',
//               });
//             }
//           })
//           .catch((error) => {
//             setIsLoading(false);
//           });
//       }, 500);
//     }
//   };

//   // ========================
//   // === Trx Jaringan ===
//   // ========================
//   const submitTrxNetwork = async () => {
//     setIsLoading(true);
//     await useApiPost(apiUserTrxNetwork(), {})
//       .then((res) => {
//         setIsLoading(false);
//         if (res.statusCode === 200) {
//           let val = res.values;
//           setTrxNetwork(val.data.total.toString());
//         } else if (res.statusCode === 500) {
//           getSnackBar_error({
//             title: res.values.message,
//             duration: 'LENGTH_INDEFINITE',
//           });
//         } else {
//           setIsLoading(false);
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//       });
//   };

//   const deleteProfile = async (data) => {
//     db.deleteProfileBalance()
//       .then((data) => {
//         //success
//       })
//       .catch((error) => {
//         setRefreshing(false);
//       });
//   };

//   // ========================
//   // === Logout ===
//   // ========================
//   const submitLogout = async () => {
//     setModalLogout(false);
//     setIsLoading(true);
//     await useApiPost(apiUserLogout(), {})
//       .then((res) => {
//         // console.log('logout', res)
//         setIsLoading(false);
//         if (res.statusCode === 200) {
//           deleteProfile();
//           setSession({name: 'token', value: ''});
//           setSession({name: 'isLoggedV2', value: 'no'});
//           setSession({name: 'guideApp', value: 'false'});
//           setSession({name: 'guideAppKasir', value: 'false'});
//           setSession({name: 'tanpaPin', value: 'no'});
//           setSession({
//             name: 'pinTrx',
//             value: '',
//           });
//           navigation.push('Login');
//         } else if (res.statusCode === 500) {
//           getSnackBar_error({
//             title: res.values.message,
//             duration: 'LENGTH_INDEFINITE',
//           });
//         } else {
//           setIsLoading(false);
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//       });
//   };

//   const _onRefresh = () => {
//     setIsLoading(true);
//     getAvatar();
//     isLogged();
//     getCheckPaylater();
//     getCheckKyc();
//     getBalanceQris();
//   };

//   const copy = (datas) => {
//     let message = datas;
//     ToastAndroid.show(`${datas} telah disalin`, ToastAndroid.SHORT);
//     Clipboard.setString(message);
//   };

//   const commentChange = (value, index) => {
//     setCommentCount(value.length);
//     setComment(value);
//   };

//   const getAvatar = async () => {
//     await useApiPost(apiGetProfileImage(), {})
//       .then((res) => {
//         // console.log({res})
//         if (res.statusCode === 200) {
//           let ava = res.values.data.avatarUrl;
//           setAvatar(ava);
//         } else {
//           ToastAndroid.show(res.values.message, ToastAndroid.SHORT);
//           setAvatar('');
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//       });
//   }

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       // refresh back screen
//       getCheckKyc();
//       // getAvatar()
//       // end refresh back screen
//     });

//     const backAction = () => {
//       BackHandler.exitApp()
//       return true
//     };

//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction,
//     );

//     requestCameraPermission();

//     InteractionManager.runAfterInteractions(() => {
//       isLogged();
//       getAvatar();
//       getSummary();
//       getCheckPaylater();
//       getBalanceQris();
//     });

//     if (route.params?.post) {
//       updateAvatar(route.params.post);
//     }

//     return () => {
//       unsubscribe();
//       backHandler.remove();
//       isMounted = false;
//     };
//   }, [navigation, route.params?.post]);

//   const updateAvatar = async (val) => {
//     setIsLoading(true);
//     await useApiUpdateAvatar(apiUpdateProfileImage(), {
//       avatarImageUrl: val,
//     })
//       .then((res) => {
//         // console.log('update avatar', res)
//         setIsLoading(false);
//         if (res.statusCode === 200) {
//           let ava = res.values.data.avatarUrl;
//           getAvatar();
//         } else if (res.statusCode === 500) {
//           ToastAndroid.show(
//             'Ukuran gambar terlalu besar, maksimal 5mb',
//             ToastAndroid.SHORT,
//           );
//         } else {
//           ToastAndroid.show(res.values.message, ToastAndroid.SHORT);
//           setAvatar('');
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//       });
//   };

//   const openLink = async (link) => {
//     try {
//       const url = link;
//       if (await InAppBrowser.isAvailable()) {
//         await InAppBrowser.open(url, {
//           // iOS Properties
//           dismissButtonStyle: 'cancel',
//           preferredBarTintColor: '#4F6CFF',
//           preferredControlTintColor: 'white',
//           readerMode: false,
//           animated: true,
//           modalPresentationStyle: 'fullScreen',
//           modalTransitionStyle: 'coverVertical',
//           modalEnabled: true,
//           enableBarCollapsing: false,
//           // Android Properties
//           showTitle: true,
//           toolbarColor: '#4F6CFF',
//           secondaryToolbarColor: 'black',
//           enableUrlBarHiding: true,
//           enableDefaultShare: true,
//           forceCloseOnRedirection: false,
//           // Specify full animation resource identifier(package:anim/name)
//           // or only resource name(in case of animation bundled with app).
//           animations: {
//             startEnter: 'slide_in_right',
//             startExit: 'slide_out_left',
//             endEnter: 'slide_in_left',
//             endExit: 'slide_out_right',
//           },
//           headers: {
//             'my-custom-header': 'my custom header value',
//           },
//         });
//       } else Linking.openURL(url);
//     } catch (error) {
//       // console.log(error.message);
//     }
//   };

//   const getSummary = async () => {
//     setIsLoading(true);
//     await useApiPost(apiMutasiSummary(), {
//       startDate: moment(output).startOf('month').format('YYYY-MM-DD'),
//       endDate: moment(date).format('YYYY-MM-DD'),
//     })
//       .then(async (res) => {
//         setIsLoading(false);
//         if (isMounted) {
//           let dataDebit = res.values.data.debitTotal;
//           let dataCredit = res.values.data.creditTotal;
//           if (res.statusCode === 200) {
//             setDebit(dataDebit === null ? '' : dataDebit);
//             setCredit(dataCredit === null ? '' : dataCredit);
//           } else {
//             let err = res.values.message;
//             ToastAndroid.show(err, ToastAndroid.SHORT);
//           }
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//       });
//   };

//   const selectFile = () => {
//     actionSheetRef.current?.setModalVisible(false);
//     var options = {
//       includeBase64: true,
//       maxWidth: 500,
//       maxHeight: 500,
//       quality: 0.5,
//       title: 'Select Image',
//       customButtons: [
//         {
//           name: 'customOptionKey',
//           title: 'Choose file from Custom Option',
//         },
//       ],
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//     launchImageLibrary(options, (res) => {
//       if (res.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (res.error) {
//         console.log('ImagePicker Error: ', res.error);
//       } else if (res.customButton) {
//         console.log('User tapped custom button: ', res.customButton);
//         alert(res.customButton);
//       } else {
//         // console.log('avatar', res);
//         updateAvatar(res.assets[0]);
//       }
//     });
//   };

//   // const openCamera = () => {
//   //   actionSheetRef.current?.setModalVisible(false);
//   //   var options = {
//   //     includeBase64: true,
//   //     title: 'Select Image',
//   //     maxWidth: 500,
//   //     maxHeight: 500,
//   //     quality: 0.5,
//   //     customButtons: [
//   //       {
//   //         name: 'customOptionKey',
//   //         title: 'Choose file from Custom Option',
//   //       },
//   //     ],
//   //     storageOptions: {
//   //       skipBackup: true,
//   //       path: 'images',
//   //     },
//   //   };

//   //   launchCamera(options, (res) => {
//   //     if (res.didCancel) {
//   //       console.log('User cancelled image picker');
//   //     } else if (res.error) {
//   //       console.log('ImagePicker Error: ', res.error);
//   //     } else if (res.customButton) {
//   //       console.log('User tapped custom button: ', res.customButton);
//   //       alert(res.customButton);
//   //     } else {
//   //       // console.log({res})
//   //       updateAvatar(res.assets[0]);
//   //     }
//   //   });
//   // };

//   const takePicture = async (camera) => {
//     const options = {quality: 0.1, base64: true, width:500, height:500};
//     const data = await camera.takePictureAsync(options);
//     // console.log('data foto', data);
//     if (data.uri) {
//       updateAvatar(data)
//       setCamera(false)
//       navigation.dispatch(
//         CommonActions.setParams({
//           tabBarVisible: true,
//         })
//         )
//       }
//   };
  
//   const hideCamera = () => {
//     setCamera(false)
//     navigation.dispatch(
//       CommonActions.setParams({
//         tabBarVisible: true,
//       })
//     )
//   }

//   const PendingView = () => <ActivityIndicator size="large" color="#4F6CFF" />;

//   const toggleModal = () => {
//     actionSheetRef.current?.setModalVisible();
//   };

//   const onNavigate = () => {
//     // navigation.push('TakeFoto', {
//     //   triger: true
//     // });
//     setCamera(true)
//     actionSheetRef.current?.hide()
//     navigation.dispatch(
//       CommonActions.setParams({
//         tabBarVisible: false,
//       })
//     )
//   };

//   const changeCamera = () => {
//     setRote(!rote);
//   };

//   return (
//     <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
//       {camera ? (
//         <RNCamera
//         ref={refCamera}
//         style={ss.preview}
//         type={
//           rote ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
//         }
//         androidCameraPermissionOptions={{
//           title: 'Permission to use camera',
//           message: 'We need your permission to use your camera',
//           buttonPositive: 'Ok',
//           buttonNegative: 'Cancel',
//         }}>
//         {({camera, status, recordAudioPermissionStatus}) => {
//           if (status !== 'READY') return <PendingView />;
//           return (
//             <View
//               style={{
//                 flex: 0,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 flexDirection: 'row',
//               }}>
//               <TouchableOpacity
//                 onPress={() => hideCamera()}
//                 style={ss.back}>
//                 <SvgXml
//                   width="50"
//                   height="45"
//                   style={[styles.mb10, styles.mt10]}
//                   xml={IcBackCamera}
//                 />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => takePicture(camera)}
//                 style={ss.capture}>
//                 <SvgXml
//                   width="60"
//                   height="50"
//                   style={[styles.mb10, styles.mt10]}
//                   xml={icCamera}
//                 />
//               </TouchableOpacity>

//               <TouchableOpacity onPress={() => changeCamera()} style={ss.rote}>
//                 <SvgXml
//                   width="60"
//                   height="50"
//                   style={[styles.mb10, styles.mt10]}
//                   xml={IcFlipCamera}
//                 />
//               </TouchableOpacity>
//             </View>
//           );
//         }}
//       </RNCamera>
//       ) : (
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         style={[styles.bgWhite]}
//         refreshControl={
//           <RefreshControl
//             colors={['#4F6CFF', '#4F6CFF']}
//             refreshing={isLoading}
//             onRefresh={_onRefresh}
//           />
//         }>
//         <View style={styles.headerGreenProfile}>
//           <View style={styles.row}>
//             <View style={styles.col60}>
//               {/* <TouchableOpacity
//                 activeOpacity={0.8}
//                 onPress={() =>  backAction()}>
//                 <SvgXml width={20} height={20} xml={IconBack} />
//               </TouchableOpacity> */}
//             </View>
//             <TouchableOpacity
//               activeOpacity={0.8}
//               onPress={() => {
//                 if (checkKyc === '0') {
//                   navigation.navigate('ProfileKycRegister');
//                 } else {
//                   navigation.navigate('ProfileChange', {
//                     checkKyc: checkKyc,
//                   });
//                 }
//               }}
//               style={[styles.col40, styles.center]}>
//               <View style={[styles.row, styles.rightText]}>
//                 <SvgXml width={15} height={15} xml={IconPencil} />
//                 <Text style={[styles.white, styles.fs12, styles.ml5]}>
//                   Ubah
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </View>

//           <View
//             style={[
//               styles.center,
//               styles.mb10,
//               styles.col100,
//               styles.pr10,
//               styles.pl10,
//               {marginTop: -20},
//             ]}>
//             <View
//               style={{
//                 backgroundColor: '#FFFFFF',
//                 width: 90,
//                 height: 90,
//                 borderRadius: 90 / 2,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               {avatar ? (
//                 <Image
//                   style={{width: 80, height: 80, borderRadius: 80 / 2}}
//                   source={{uri: avatar}}
//                 />
//               ) : (
//                 <Image
//                   style={{width: 80, height: 80, borderRadius: 80 / 2}}
//                   source={ImgAvatar}
//                 />
//               )}
//               <TouchableOpacity
//                 onPress={() => toggleModal()}
//                 activeOpacity={0.7}
//                 style={{
//                   backgroundColor: '#ffffff',
//                   width: 35,
//                   height: 35,
//                   borderRadius: 35 / 2,
//                   position: 'absolute',
//                   right: -10,
//                   bottom: 0,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}>
//                 <SvgXml width={20} height={20} xml={IcCamera} />
//               </TouchableOpacity>
//             </View>

//             <Text
//               style={[
//                 styles.nameUserProfile,
//                 styles.textCenter,
//                 {marginTop: 5},
//               ]}>
//               {!isLoading
//                 ? checkKyc === '2'
//                   ? data.qrisName
//                     ? data.qrisName
//                     : data.userName
//                   : data.userName
//                 : 'Loading ...'}
//             </Text>
//             <View
//               style={[
//                 styles.center,
//                 styles.mt5,
//                 {flexDirection: 'row', alignItems: 'center', paddingLeft: 40},
//               ]}>
//               <TouchableOpacity
//                 style={{paddingRight: 5}}
//                 activeOpacity={0.8}
//                 onPress={() => {
//                   copy(data.userID);
//                 }}>
//                 <Text style={[styles.idUserProfile]}>
//                   {!isLoading ? data.userID : '-'}
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 style={[styles.row, styles.mt5]}
//                 onPress={() => {
//                   copy(data.userID);
//                 }}>
//                 <SvgXml width={15} height={15} xml={IconCopyWhite} />
//                 <Text style={[styles.white, styles.fs12, styles.ml5]}>
//                   Salin
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>

//         <View style={[styles.widgedProfile]}>
//           <TouchableOpacity
//             activeOpacity={0.7}
//             onPress={() => {
//               isLogged();
//             }}
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               marginVertical: 5,
//             }}>
//             <View
//               style={{
//                 width: 38,
//                 height: 38,
//                 backgroundColor: '#F2F2F2',
//                 borderRadius: 38 / 2,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 marginHorizontal: 10,
//               }}>
//               <SvgXml xml={IcWallet} />
//             </View>
//             <View>
//               <Text
//                 style={{fontSize: 12, color: '#4F4F4F', fontFamily: Fonts.WSR}}>
//                 Uwang Cash
//               </Text>
//               <Text
//                 style={[
//                   styles.textOutline,
//                   styles.black,
//                   styles.fs16,
//                   styles.fontWSB,
//                 ]}>
//                 Rp {!isLoading ? (data.balance ? data.balance : 0) : 0}
//               </Text>
//             </View>
//           </TouchableOpacity>

//           {/* <View style={{marginHorizontal: 10}}>
//             <SvgXml xml={IcArrLine} />
//           </View>

//           <Ripple
//             onPress={() => {
//               if (checkKyc === '2') {
//                 navigation.navigate('Qris');
//               }
//             }}
//             style={{flexDirection: 'row', alignItems: 'center'}}>
//             <View
//               style={{
//                 width: 38,
//                 height: 38,
//                 backgroundColor: '#F2F2F2',
//                 borderRadius: 38 / 2,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               <SvgXml xml={IcQris} />
//             </View>
//             <View style={{marginHorizontal: 10}}>
//               <Text
//                 style={{fontSize: 12, color: '#4F4F4F', fontFamily: Fonts.WSR}}>
//                 Saldo QRIS
//               </Text>
//               <Text
//                 style={[
//                   styles.textOutline,
//                   styles.fs16,
//                   styles.fontWSB,
//                   {color: '#F85C5C'},
//                 ]}>
//                 Rp {' '}
//                 {!isLoadingQris ? (dataQris.balance ? dataQris.balance : 0) : 0}
//               </Text>
//             </View>
//           </Ripple> */}
//         </View>

//         {checkKyc === '1' ? (
//           <StatusKyc
//             onPress={() => {
//               navigation.navigate('ProfileChange', {
//                 checkKyc: checkKyc,
//               });
//             }}
//             title="Menunggu Verifikasi"
//             subTitle="Registrasi KYC Anda sedang dalam proses"
//             btnTitle="Ubah"
//             progress="99%"
//           />
//         ) : (
//           <>
//             {checkKyc === '0' ? (
//               <StatusKyc
//                 onPress={() => {
//                   navigation.navigate('ProfileKycRegister');
//                 }}
//                 title="Lengkapi Data diri Anda"
//                 subTitle="Untuk menikmati berbagai fitur lainnya"
//                 btnTitle="Lengkapi"
//                 progress="5%"
//               />
//             ) : checkKyc === '3' ? (
//               <StatusKyc
//                 onPress={() => {
//                   navigation.navigate('ProfileChange', {
//                     checkKyc: checkKyc,
//                   });
//                 }}
//                 title="Proses KYC Anda ditolak"
//                 subTitle="Silahkan lengkapi/perbaiki data diri Anda"
//                 btnTitle="Ubah"
//                 progress="99%"
//               />
//             ) : null}
//           </>
//         )}

//         <View style={{backgroundColor: '#ffffff', marginBottom: 15}}>
//           <TouchableOpacity
//             activeOpacity={0.6}
//             onPress={() => {
//               navigation.navigate('QrCode', {
//                 reseller_id: '',
//               });
//             }}
//             style={{
//               marginHorizontal: 20,
//               alignItems: 'center',
//               justifyContent: 'center',
//               borderRadius: 8,
//               borderWidth: 1.5,
//               borderColor: '#BDBDBD',
//               flexDirection: 'row',
//               paddingVertical: 13,
//               marginTop: checkKyc === '2' ? 15 : 0
//             }}>
//             <SvgXml width={20} height={20} xml={IcQr} />
//             <Text style={{color: '#000000', marginLeft: 8}}>
//               Tampilkan QR Code
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <View
//           style={{
//             borderTopWidth: 2,
//             borderBottomWidth: 2,
//             paddingVertical: 8,
//             borderTopColor: '#F2F2F2',
//             borderBottomColor: '#F2F2F2',
//           }}>
//           <Text
//             style={{
//               color: 'black',
//               marginLeft: 20,
//               marginBottom: 8,
//               fontFamily: Fonts.WSSB,
//               fontSize: 16,
//             }}>
//             Mutasi Saldo
//           </Text>
//           <View style={{backgroundColor: '#ffffff', marginBottom: 10}}>
//             <View
//               style={{
//                 marginHorizontal: 18,
//                 borderRadius: 8,
//                 justifyContent: 'center',
//                 backgroundColor: '#F6F6F6',
//                 flexDirection: 'row',
//                 paddingVertical: 8,
//               }}>
//               <TouchableOpacity
//                 onPress={() => navigation.push('MutasiIn', {pass: 'IN'})}
//                 activeOpacity={0.7}
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent:'center',
//                   flex:1
//                 }}>
//                 <SvgXml width={30} height={30} xml={IcAddMutasi} />
//                 <View style={{ width:110}}>
//                   <Text style={{color: '#000000', marginLeft: 8}}>
//                     Uang Masuk
//                   </Text>
//                   <Text
//                     style={{
//                       color: '#000000',
//                       marginLeft: 8,
//                       fontWeight: 'bold',
//                     }}>
//                     Rp {debit ? debit : 0}
//                   </Text>
//                 </View>
//               </TouchableOpacity>

//               <View style={{height: 40, width: 1, backgroundColor: '#ddd'}} />

//               <TouchableOpacity
//                 onPress={() => navigation.push('MutasiIn', {pass: 'OUT'})}
//                 activeOpacity={0.7}
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent:'center',
//                   flex:1,
//                 }}>
//                 <SvgXml width={30} height={30} xml={IcOutMutasi} />
//                 <View style={{ width:110}}>
//                   <Text style={{color: '#000000', marginLeft: 8}}>
//                     Uang Keluar
//                   </Text>
//                   <Text
//                     style={{
//                       color: '#000000',
//                       marginLeft: 8,
//                       fontWeight: 'bold',
//                     }}>
//                     Rp {credit ? credit : 0}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>

//         <View style={styles.ListItemSeparator}>
//           <Text style={[styles.fontMSB, styles.fs15, styles.black]}>
//             Pengaturan
//           </Text>
//         </View>
//         <Ripple
//           onPress={() => navigation.navigate('Pin')}
//           style={styles.ListItem}>
//           <View style={[styles.row, styles.pl20, styles.pr20]}>
//             <View style={[styles.col90]}>
//               <Text
//                 style={[
//                   styles.fontWSR,
//                   styles.fs13,
//                   styles.black,
//                   styles.leftText,
//                 ]}>
//                 PIN
//               </Text>
//               <Text
//                 style={[
//                   styles.fontWSM,
//                   styles.fs11,
//                   styles.grey8f,
//                   styles.leftText,
//                 ]}>
//                 Keamanan transaksi, buka aplikasi
//               </Text>
//             </View>
//             <View style={[styles.col10, styles.center]}>
//               <SvgXml width={20} height={20} xml={IcArrR} />
//             </View>
//           </View>
//         </Ripple>

//         <View style={styles.ListItemSeparator}>
//           <Text style={[styles.fontMSB, styles.fs15, styles.black]}>
//             Lainnya
//           </Text>
//         </View>

//         {/* <Ripple onPress={() => setModalRate(true)} style={styles.ListItem}>
//           <View style={[styles.row, styles.pl20, styles.pr20, styles.col100]}>
//             <Text
//               style={[
//                 styles.fontWSR,
//                 styles.fs13,
//                 styles.black,
//                 styles.leftText,
//               ]}>
//               Beri Penilaian Aplikasi
//             </Text>
//             <View style={[styles.boxNew, {left: '8%', paddingHorizontal: 10}]}>
//               <Text style={[styles.new, {bottom: '0%'}]}>New</Text>
//             </View>
//           </View>
//         </Ripple> */}
//         {informasi.link !== '#' ? (
//           <TouchableNativeFeedback
//             background={TouchableNativeFeedback.Ripple('#DDD')}
//             onPress={() => {
//               openLink(informasi.link);
//             }}>
//             <View style={styles.ListItem}>
//               <View
//                 style={[styles.row, styles.pl20, styles.pr20, styles.col100]}>
//                 <Text
//                   style={[
//                     styles.fontWSR,
//                     styles.fs13,
//                     styles.black,
//                     styles.leftText,
//                   ]}>
//                   {informasi.title}
//                 </Text>
//               </View>
//             </View>
//           </TouchableNativeFeedback>
//         ) : null}
        
//         {syarat.link ? (
//           <TouchableNativeFeedback
//             background={TouchableNativeFeedback.Ripple('#DDD')}
//             onPress={() => {
//               openLink(syarat.link);
//             }}>
//             <View style={styles.ListItem}>
//               <View
//                 style={[styles.row, styles.pl20, styles.pr20, styles.col100]}>
//                 <Text
//                   style={[
//                     styles.fontWSR,
//                     styles.fs13,
//                     styles.black,
//                     styles.leftText,
//                   ]}>
//                   {syarat.title}
//                 </Text>
//               </View>
//             </View>
//           </TouchableNativeFeedback>
//         ) : null}

//         {kebijakan.link ? (
//           <TouchableNativeFeedback
//             background={TouchableNativeFeedback.Ripple('#DDD')}
//             onPress={() => {
//               openLink(kebijakan.link);
//             }}>
//             <View style={styles.ListItem}>
//               <View
//                 style={[styles.row, styles.pl20, styles.pr20, styles.col100]}>
//                 <Text
//                   style={[
//                     styles.fontWSR,
//                     styles.fs13,
//                     styles.black,
//                     styles.leftText,
//                   ]}>
//                   {kebijakan.title}
//                 </Text>
//               </View>
//             </View>
//           </TouchableNativeFeedback>
//         ) : null}

//         <Ripple onPress={() => setModalLogout(true)} style={styles.ListItem}>
//           <View style={[styles.row, styles.pl20, styles.pr20, styles.col100]}>
//             <Text
//               style={[
//                 styles.fontWSR,
//                 styles.fs13,
//                 styles.black,
//                 styles.leftText,
//               ]}>
//               Keluar
//             </Text>
//           </View>
//         </Ripple>

//         <View style={[styles.versionProfile, styles.mt15]}>
//           <SvgXml width={150} height={40} xml={LogoUwangPT}style={{marginBottom:10}}/>
//           <Text style={[styles.fontWSR, styles.fs12, styles.black]}>
//             Version {versionNameSystem}
//           </Text>
//         </View>

//         {/* {DeviceInfo.getVersion() !== versionName ? (
//           <View style={[styles.centerButton]}>
//             <Ripple
//               onPress={() => {
//                 Linking.openURL(
//                   'https://play.google.com/store/apps/details?id=com.uwang.android',
//                 );
//               }}
//               style={styles.btnUpdate}>
//               <Text style={[styles.txtBtn]}>Update</Text>
//             </Ripple>
//           </View>
//         ) : null} */}
//       </ScrollView>
//       )}
//       <ActionSheet
//         containerStyle={{
//           borderTopLeftRadius: 18,
//           borderTopRightRadius: 18,
//           borderBottomLeftRadius: 0,
//           borderBottomRightRadius: 0,
//         }}
//         statusBarTranslucent={false}
//         gestureEnabled={true}
//         headerAlwaysVisible={true}
//         ref={actionSheetRef}>
//         <View style={{height: HEIGH/3.7, paddingHorizontal: 15, paddingTop: 15}}>
//           <Text style={[styles.fs14, styles.fontWSB, styles.black]}>
//             Edit Profile
//           </Text>

//           <TouchableOpacity
//             activeOpacity={0.7}
//             onPress={() => onNavigate()}
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               marginTop: 20,
//             }}>
//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <SvgXml width={20} height={20} xml={IcTakeCamera} />
//               <Text style={[styles.ml12]}>Camera Langsung</Text>
//             </View>
//             <SvgXml width={20} height={20} xml={IcArrR} />
//           </TouchableOpacity>

//           <TouchableOpacity
//             activeOpacity={0.7}
//             onPress={() => selectFile()}
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               marginTop: 30,
//             }}>
//             <View style={{flexDirection: 'row', alignItems: 'center',}}>
//               <SvgXml width={20} height={20} xml={IcPickGalery} />
//               <Text style={[styles.ml12]}>Pilih Lewat Galery</Text>
//             </View>
//             <SvgXml width={20} height={20} xml={IcArrR} />
//           </TouchableOpacity>
//         </View>
//       </ActionSheet>

//       <ModalNotif
//         close={true}
//         modal={'normal'}
//         tanpaPin={'no'}
//         isVisible={modalLogout}
//         onSwipeComplete={() => setModalLogout(false)}
//         title={'Notifikasi'}
//         message={'Apa Anda yakin akan Keluar ?'}
//         titleClose={'Tidak'}
//         titleButton={'Ya'}
//         onPressClose={() => {
//           setModalLogout(false);
//         }}
//         onPress={() => {
//           submitLogout();
//         }}
//       />

//       <ModalPin
//         close={true}
//         modal={'normal'}
//         tanpaPin={tanpaPin}
//         isVisible={modalKomisi}
//         onSwipeComplete={() => setModalKomisi(false)}
//         value={pin}
//         onChangeText={(pin) => setPin(pin)}
//         title={'Tarik Komisi'}
//         titleClose={'Batal'}
//         titleButton={'Tarik'}
//         onPressClose={() => {
//           setModalKomisi(false);
//         }}
//         onPress={() => {
//           submitWithdraw();
//         }}
//       />

//       <ModalPin
//         close={true}
//         modal={'normal'}
//         tanpaPin={tanpaPin}
//         isVisible={modalPaylater}
//         onSwipeComplete={() => setModalPaylater(false)}
//         value={pin}
//         onChangeText={(pin) => setPin(pin)}
//         title={'Klaim Paylater'}
//         titleClose={'Batal'}
//         titleButton={'Klaim'}
//         onPressClose={() => {
//           setModalPaylater(false);
//         }}
//         onPress={() => {
//           submitKlaimPaylater();
//         }}
//       />

//       <ModalNilai
//         close={true}
//         modal={'normal'}
//         tanpaPin={'no'}
//         isVisible={modalRate}
//         onSwipeComplete={() => setModalRate(false)}
//         value={comment}
//         onChangeText={commentChange}
//         value2={rate}
//         onPressRate={(rate) => setRate(rate)}
//         commentCount={commentCount}
//         title={'Berikan Penilaian Anda Mengenai Aplikasi Uwang'}
//         titleClose={'Batal'}
//         titleButton={'Kirim'}
//         onPressClose={() => {
//           setModalRate(false);
//         }}
//         onPress={() => {
//           submitComment();
//         }}
//       />
//     </SafeAreaView>
//   );
// };

// const s = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     flexDirection: 'column',
//     justifyContent: 'space-around',
//     width: 150,
//     height: 150,
//     paddingLeft: 20,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });

// export default Profile;

// const ss = StyleSheet.create({
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
//     marginHorizontal: 20,
//   },
//   back: {
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//   },
//   rote: {
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//   },
// });