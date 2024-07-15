// import React, {useEffect, useState, useRef} from 'react';
// import {
//   SafeAreaView,
//   BackHandler,
//   ScrollView,
//   View,
//   PermissionsAndroid,
//   TouchableOpacity,
//   Linking,
//   TouchableNativeFeedback,
//   Text,
//   RefreshControl,
//   Alert,
//   InteractionManager,
//   Image,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {SvgXml} from 'react-native-svg';
// import {useApiPost, useError} from '../../helpers/useFetch';
// import {apiUtilityTopPoint} from '../../helpers/endPoint';
// import styles from '../../assets/styles/Style';
// import Header from '../../content/header/Header';
// import store from '../../assets/img/store.png';
// import IconEmpty from '../../assets/svg/empty.svg';
// import IconStore from '../../assets/svg/store.svg';
// import IconSeru from '../../assets/svg/seru.svg';
// import MapView, {PROVIDER_GOOGLE, Callout} from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';
// import Loading from '../../content/fitur/Loading';

// async function requestFineLocationPermission() {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Izin Lokasi',
//         message: 'Aplikasi Uwang membutuhkan izin lokasi Anda',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       //log
//     } else {
//       //log
//     }
//   } catch (err) {
//     //console.warn(err);
//     return false;
//   }
// }

// async function requestCoarseLocationPermission() {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//       {
//         title: 'Izin Lokasi',
//         message: 'Aplikasi Uwang membutuhkan izin lokasi Anda',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       //log
//     } else {
//       //log
//     }
//   } catch (err) {
//     //console.warn(err);
//     return false;
//   }
// }

// const TopPoint = () => {
//   const _map = useRef(null);
//   const navigation = useNavigation();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLoadingScreen, setIsLoadingScreen] = useState(true);
//   const [isMaps, setIsMaps] = useState(false);
//   const [markers, setMarkers] = useState([]);
//   const [initialPosition, setInitialPosition] = useState({
//     latitude: parseFloat(-6.9432238),
//     longitude: parseFloat(107.7600642),
//     latitudeDelta: 0.0222,
//     longitudeDelta: 0.0221,
//   });
//   const [dataCoordinate, setDataCoordinate] = useState([
//     {nameReseller: 'Topindo', latitude: -6.9341736, longitude: 107.7709961},
//   ]);
//   const [coordinate, setCoordinate] = useState({
//     latitude: -6.9432238,
//     longitude: 107.7600642,
//   });
//   let isMounted = true;

//   onMarkerPressed = (location, index) => {
//     _map.current.animateToRegion({
//       latitude: parseFloat(location.latitude),
//       longitude: parseFloat(location.longitude),
//       latitudeDelta: 0.0222,
//       longitudeDelta: 0.0221,
//     });
//   };

//   // const getGps = () => {
//   //   Geolocation.getCurrentPosition(
//   //     (position) => {
//   //       console.log('lokasi');
//   //       if (isMounted) {
//   //         if (position.coords.latitude) {
//   //           setIsMaps(true);
//   //           checkGPS(position.coords.latitude, position.coords.longitude);
//   //         } else {
//   //           setIsLoading(false);
//   //           setIsMaps(false);
//   //         }
//   //       }
//   //     },
//   //     (error) => {
//   //       setIsLoading(false);
//   //       Alert.alert(
//   //         'Notifikasi',
//   //         'Aktifkan GPS dan Izin Lokasi Terlebih Dahulu',
//   //         [
//   //           {
//   //             text: 'Cancel',
//   //             onPress: () => {
//   //               setIsLoading(false);
//   //             },
//   //           },
//   //           {
//   //             text: 'OK',
//   //             onPress: () => {
//   //               setIsLoading(false);
//   //             },
//   //           },
//   //         ],
//   //         {cancelable: false},
//   //       );
//   //     },
//   //     {enableHighAccuracy: true, timeout: 20000},
//   //   );
//   // };

//   const checkGPS = async (latitude, longitude) => {
//     getMaps(latitude, longitude);
//   };

//   // const getMaps = async (latitude, longitude) => {
//   //   let initialRegion1 = {
//   //     latitude: parseFloat(latitude),
//   //     longitude: parseFloat(longitude),
//   //     latitudeDelta: 0.0222,
//   //     longitudeDelta: 0.0221,
//   //   };
//   //   let cor1 = {
//   //     latitude: parseFloat(latitude),
//   //     longitude: parseFloat(longitude),
//   //   };

//   //   if (isMounted) {
//   //     setIsLoading(false);
//   //     setCoordinate(cor1);
//   //     setInitialPosition(initialRegion1);
//   //   }
//   //   isLogged(latitude, longitude);
//   // };

//   const _onRefresh = () => {
//     setIsLoading(true);
//     // getGps();
//   };

//   const isLogged = async (latitude, longitude) => {
//     setIsLoading(true);
//     await useApiPost(apiUtilityTopPoint(), {
//       latitude: parseFloat(latitude).toString(),
//       longitude: parseFloat(longitude).toString(),
//     })
//       .then((res) => {
//         if (isMounted) {
//           setIsLoading(false);
//           if (res.statusCode === 200) {
//             let val = res.values.values;
//             setDataCoordinate(val);
//           } else {
//             setDataCoordinate([]);
//           }
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//       });
//   };

//   useEffect(() => {
//     const backAction = () => {
//       navigation.navigate('Home');
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction,
//     );

//     InteractionManager.runAfterInteractions(() => {
//       requestFineLocationPermission();
//       requestCoarseLocationPermission();
//       getGps();
//       setTimeout(() => {
//         setIsLoadingScreen(false);
//       }, 1300);
//     });

//     return () => {
//       backHandler.remove();
//       isMounted = false;
//     };
//   }, []);

//   if (isLoadingScreen) {
//     return <Loading />;
//   }

//   return (
//     <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
//       <Header
//         onBack={() => navigation.navigate('Home')}
//         title={'TopUp Point'}
//         shadow={true}
//         right={false}
//       />

//       {!isLoadingScreen ? (
//         <>
//           {isMaps ? (
//             <View style={[styles.boxMaps]}>
//               <View style={[styles.containerMap]}>
//                 <MapView
//                   provider={PROVIDER_GOOGLE}
//                   ref={_map}
//                   zoomEnabled={true}
//                   showsUserLocation={true}
//                   style={styles.map}
//                   initialRegion={initialPosition}>
//                   <MapView.Marker
//                     draggable
//                     coordinate={coordinate}
//                     title={'Lokasi Anda'}></MapView.Marker>
//                   {dataCoordinate.map((marker, index) => (
//                     <MapView.Marker
//                       key={index}
//                       ref={(ref) => (markers[index] = ref)}
//                       onPress={() => this.onMarkerPressed(marker, index)}
//                       coordinate={{
//                         latitude: parseFloat(marker.latitude),
//                         longitude: parseFloat(marker.longitude),
//                       }}>
//                       <Image
//                         source={store}
//                         resizeMode="contain"
//                         resizeMethod="resize"
//                         style={{width: 60, height: 70}}
//                       />
//                       <Callout
//                         onPress={() => {
//                           Linking.openURL(
//                             'https://maps.google.com/?q=' +
//                               parseFloat(marker.latitude) +
//                               ',' +
//                               parseFloat(marker.longitude),
//                           );
//                         }}>
//                         <Text
//                           style={[styles.fs9, styles.black, styles.fontWSB]}>
//                           {marker.nama_toko}
//                         </Text>
//                       </Callout>
//                     </MapView.Marker>
//                   ))}
//                 </MapView>
//               </View>
//             </View>
//           ) : (
//             <>
//               {!isLoading ? (
//                 <View style={styles.qrBoxCodeWhite}>
//                   <SvgXml width={120} height={120} xml={IconEmpty} />
//                   <Text style={styles.textEmpty}>
//                     Lokasi Anda tidak terdeteksi
//                   </Text>

//                   <Text style={[styles.textEmptyKeterangan, styles.centerText]}>
//                     Silahkan aktifkan Lokasi/GPS Anda{'\n'}lalu buka pengaturan
//                     di aplikasi Uwang{'\n'}matikan dan nyalakan kembali
//                     izin lokasi lalu buka aplikasi
//                   </Text>
//                   <TouchableOpacity
//                     style={[styles.btnRegQris, styles.mt20]}
//                     onPress={() => navigation.push('TopPoint')}
//                     activeOpacity={0.9}>
//                     <Text
//                       style={[
//                         styles.bold,
//                         styles.fs13,
//                         styles.white,
//                         styles.fontWSB,
//                       ]}
//                       uppercase={false}>
//                       Muat Ulang
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               ) : null}
//             </>
//           )}
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             refreshControl={
//               <RefreshControl
//                 colors={['#4F6CFF', '#4F6CFF']}
//                 refreshing={isLoading}
//                 onRefresh={_onRefresh}
//               />
//             }>
//             {isMaps ? (
//               <>
//                 <View
//                   style={[
//                     styles.row,
//                     styles.mt10,
//                     styles.mb10,
//                     styles.pl10,
//                     styles.pr10,
//                   ]}>
//                   <View style={[styles.mt10, styles.col10, styles.centerOnly]}>
//                     <SvgXml width={23} height={23} xml={IconSeru} />
//                   </View>
//                   <View style={[styles.mt5, styles.pl10, styles.col90]}>
//                     <Text style={[styles.black, styles.fs12, styles.fontWSR]}>
//                       TopUp Point merupakan Gerai Resmi Topindo untuk
//                       mempermudah Anda melakukan Isi Saldo secara langsung
//                     </Text>
//                   </View>
//                 </View>
//                 {dataCoordinate.length > 0 ? (
//                   <>
//                     {dataCoordinate.map((item, key) => (
//                       <TouchableNativeFeedback
//                         background={TouchableNativeFeedback.Ripple('#DDD')}
//                         key={key}
//                         onPress={() => {
//                           Linking.openURL(
//                             'https://maps.google.com/?q=' +
//                               parseFloat(item.latitude) +
//                               ',' +
//                               parseFloat(item.longitude),
//                           );
//                         }}>
//                         <View style={[styles.bxListPesan, styles.borderBottom]}>
//                           <View style={styles.rowListPesan}>
//                             <View
//                               style={[styles.imgListBoxPesan, styles.center]}>
//                               <SvgXml width={25} height={25} xml={IconStore} />
//                             </View>
//                             <View style={[styles.bxPricePesan, styles.mt5]}>
//                               <View style={[styles.row]}>
//                                 <View style={styles.col70}>
//                                   <Text
//                                     style={[
//                                       styles.textListDesPesan,
//                                       styles.textListDesPesan,
//                                     ]}
//                                     numberOfLines={2}
//                                     ellipsizeMode="tail">
//                                     {item.nama_toko}
//                                   </Text>
//                                 </View>
//                                 <View style={styles.col30}>
//                                   <Text
//                                     style={styles.textListDatePesan}
//                                     numberOfLines={2}
//                                     ellipsizeMode="tail">
//                                     {item.idreseller}
//                                   </Text>
//                                 </View>
//                               </View>
//                               <Text
//                                 style={styles.textListPesan}
//                                 note
//                                 numberOfLines={2}
//                                 ellipsizeMode="tail">
//                                 {item.alamat}
//                               </Text>
//                             </View>
//                           </View>
//                         </View>
//                       </TouchableNativeFeedback>
//                     ))}
//                   </>
//                 ) : (
//                   <View style={styles.boxEmpty}>
//                     <SvgXml width={120} height={120} xml={IconEmpty} />
//                     {!isLoading ? (
//                       <Text style={styles.textEmpty}>Tidak Ada Data</Text>
//                     ) : null}
//                   </View>
//                 )}
//               </>
//             ) : null}
//           </ScrollView>
//         </>
//       ) : null}
//     </SafeAreaView>
//   );
// };

// export default TopPoint;
