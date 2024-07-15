// import React, {useRef, useEffect} from 'react';
// import {
//   ActivityIndicator,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   Dimensions,
//   BackHandler
// } from 'react-native';
// import {RNCamera} from 'react-native-camera';
// import {SvgXml} from 'react-native-svg';
// import {useState} from 'react/cjs/react.development';
// import styles from '../../assets/styles/Style';
// import {IcBackCamera, IcFlipCamera} from '../../assets';
// import icCamera from '../../assets/svg/ic_camera.svg';

// const HEIGH = Dimensions.get('window').height

// const TakeFoto = ({navigation, route}) => {
//   const refCamera = useRef();
//   const [rote, setRote] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [triger, setTriger] = useState(false)
  
//   const changeCamera = () => {
//     setRote(!rote);
//   };
  
//   const PendingView = () => <ActivityIndicator size="large" color="#4F6CFF" />;

//   useEffect(() => {
//     const backAction = () => {
//       navigation.goBack()
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction,
//     );

//     if (route.params?.triger) {
//       setTriger(true)
//     }

//     return () => {
//       backHandler.remove();
//       isMounted = false;
//     };
//   }, [navigation, route.params?.triger]);
  
//   const updateAvatar = async (val) => {
//     setIsLoading(true);
//     navigation.navigate({
//       name: 'Profile',
//       params: {post: val},
//       merge: true,
//     });
//   };

//   const takePicture = async (camera) => {
//     const options = {quality: 0.1, base64: true, width:500, height:500};
//     const data = await camera.takePictureAsync(options);
//     // console.log('data foto', data);
//     if (data.uri) {
//       updateAvatar(data);
//     }
//   };

//   return (
//     <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
//       {triger ? (
//           <RNCamera
//           ref={refCamera}
//           style={s.preview}
//           type={
//             rote ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
//           }
//           androidCameraPermissionOptions={{
//             title: 'Permission to use camera',
//             message: 'We need your permission to use your camera',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}>
//           {({camera, status, recordAudioPermissionStatus}) => {
//             if (status !== 'READY') return <PendingView />;
//             return (
//               <View
//                 style={{
//                   flex: 0,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   flexDirection: 'row',
//                 }}>
//                 <TouchableOpacity
//                   onPress={() => navigation.goBack()}
//                   style={s.back}>
//                   <SvgXml
//                     width="50"
//                     height="45"
//                     style={[styles.mb10, styles.mt10]}
//                     xml={IcBackCamera}
//                   />
//                 </TouchableOpacity>
  
//                 <TouchableOpacity
//                   onPress={() => takePicture(camera)}
//                   style={s.capture}>
//                   <SvgXml
//                     width="60"
//                     height="50"
//                     style={[styles.mb10, styles.mt10]}
//                     xml={icCamera}
//                   />
//                 </TouchableOpacity>
  
//                 <TouchableOpacity onPress={() => changeCamera()} style={s.rote}>
//                   <SvgXml
//                     width="60"
//                     height="50"
//                     style={[styles.mb10, styles.mt10]}
//                     xml={IcFlipCamera}
//                   />
//                 </TouchableOpacity>
//               </View>
//             );
//           }}
//         </RNCamera>
//       ) : (
//         <ActivityIndicator size="large" color="#4F6CFF" />
//       )}
//     </View>
//   );
// };

// export default TakeFoto;

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
