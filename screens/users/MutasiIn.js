// import {
//   BackHandler,
//   InteractionManager,
//   SafeAreaView,
//   View,
//   Text,
//   TouchableOpacity,
//   useWindowDimensions,
//   ToastAndroid,
//   ScrollView,
//   RefreshControl,
// } from 'react-native';
// import styles from '../../assets/styles/Style';
// import Header from '../../content/header/Header';
// import {apiMutasiCredit, apiMutasiDebit, apiMutasiSummary, apiUtilityReference} from '../../helpers/endPoint';
// import {getRupiah, getSnackBar_error} from '../../helpers/Helpers';
// import {useApiPost} from '../../helpers/useFetch';
// import {Fonts} from '../../assets/fonts/Fonts';
// import IcOutMutasi from '../../assets/svg/mutasiKeluar.svg';
// import IcAddMutasi from '../../assets/svg/mutasiMasuk.svg';
// import {SvgXml} from 'react-native-svg';
// import {TabView, SceneMap, TabBar} from '';
// import {IcActiveDown, IcNextLeft, IcNextRight, IcActiveUp} from '../../assets';
// import InMutasi from '../../content/ListMutasi/MutasiIn';
// import OutMutasi from '../../content/ListMutasi/MutasiOut';
// import moment from 'moment';
// moment.locale('id');


// const MutasiIn = (props) => {
//   let {params} = props.route;
//   const navigation = useNavigation();
//   const [isLoading, setIsLoading] = useState(true);
//   const [data, setData] = useState({});
//   const layout = useWindowDimensions();
//   const [debit, setDebit] = useState('');
//   const [credit, setCredit] = useState('');
//   const [date, setDate] = useState(new Date());
//   const [min, setMin] = useState(1);
//   const [index, setIndex] = React.useState(0);
//   const [start, setStart] = useState('');
//   const [end, setEnd] = useState('');
//   const [dataDebit, setDataDebit] = useState([])
//   const [dataCredit, setDataCredit] = useState([])
//   const [pageDebit, setPageDebit] = useState(0)
//   const [totalPageDebit, setTotalPageDebit] = useState(0)
//   const [pageCredit, setPageCredit] = useState(0)
//   const [totalPageCredit, setTotalPageCredit] = useState(0)
//   const [routes] = React.useState([
//     {key: 'first', title: 'Uang Masuk'},
//     {key: 'second', title: 'Uang Keluar'},
//   ]);
//   const [trigerPageDebit, setTrigerPageDebit] = useState(false)
//   const [trigerPageCredit, setTrigerPageCredit] = useState(false)
//   let output = moment(date, 'MM-YY');

//   let isMounted = true;

//   const prevDate = () => {
//     if (min === 1) {
//       setMin(min - 1);
//       let month = date.getMonth(); // January
//       let year = date.getFullYear();

//       let startDate = moment([year, month - min]).format('YYYY-MM-DD');
//       let endDate = moment(startDate)
//         .clone()
//         .endOf('month')
//         .format('YYYY-MM-DD');
        
//       setStart(startDate)
//       setEnd(endDate)
//       getSummary(startDate, endDate)
//       getMutasiDebit(startDate, endDate)
//       getMutasiCredit(startDate, endDate)
//     } else {
//       ToastAndroid.show(
//         'Filter tidak boleh lebih dari satu bulan',
//         ToastAndroid.SHORT,
//       );
//     }
//   };

//   const nextDate = () => {
//     if (min === 0) {
//       setMin(min + 1)
//       let startDate = moment(output).startOf('month').format('YYYY-MM-DD');
//       let endDate = moment(date).format('YYYY-MM-DD');

//       setStart(startDate)
//       setEnd(endDate)
//       getSummary(startDate, endDate)
//       getMutasiDebit(startDate, endDate)
//       getMutasiCredit(startDate, endDate)
//     } else {
//       ToastAndroid.show(
//         'Filter tidak boleh lebih dari satu bulan',
//         ToastAndroid.SHORT,
//       );
//     }
//   };

//   const getSummary = async (s, e) => {
//     setIsLoading(true)
//       await useApiPost(apiMutasiSummary(), {
//         startDate: s ? s : moment(output).startOf('month').format('YYYY-MM-DD'),
//         endDate: e ? e : moment(date).format('YYYY-MM-DD')
//       })
//         .then(async (res) => {
//           setIsLoading(false);
//           if (isMounted) {
//             let dataDebit = res.values.data.debitTotal;
//             let dataCredit = res.values.data.creditTotal;
//             if (res.statusCode === 200) {
//               setDebit(dataDebit === null ? '' : dataDebit);
//               setCredit(dataCredit === null ? '' : dataCredit);
//             } else {
//               let err = res.values.message;
//               ToastAndroid.show(err, ToastAndroid.SHORT);
//             }
//           }
//         })
//         .catch((error) => {
//           setIsLoading(false);
//         });
//   };

//   const getMutasiDebit = async (st, en) => {
//     setIsLoading(true) 
//     await useApiPost(apiMutasiDebit(), {
//       startDate: st ? st : moment(output).startOf('month').format('YYYY-MM-DD'),
//       endDate: en ? en : moment(date).format('YYYY-MM-DD'),
//     })
//       .then(async (res) => {
//         // console.log('res debit', res)
//         setIsLoading(false);
//         if (isMounted) {
//           if (res.statusCode === 200) {
//             let dataDebit = res.values.data.data;
//             let curPage = res.values.data.pagination;
//             let page = res.values.data.pagination;
//             let  totalPage = res.values.data.totalData;
//             setDataDebit(dataDebit)
//             setPageDebit(curPage.currentPage)
//             setTotalPageDebit(page.totalPage)
//           } else {
//             let err = res.values.message;
//             setDataDebit([])
//             ToastAndroid.show(err, ToastAndroid.SHORT);
//           }
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//       });
//   }

//   const reloadDebit = async (page) => {
//     setIsLoading(true) 
//     await useApiPost(apiMutasiDebit(), {
//       startDate: start ? start : moment(output).startOf('month').format('YYYY-MM-DD'),
//       endDate: end ? end : moment(date).format('YYYY-MM-DD'),
//       page: page
//     })
//       .then(async (res) => {
//         // console.log('res debit reload', res)
//         setIsLoading(false);
//         if (isMounted) {
//           if (res.statusCode === 200) {
//             let val = res.values;
//             let curentPage = res.values.data.pagination.currentPage;
//             let page = res.values.data.pagination.totalPage;
//             let  totalPage = res.values.data.totalData;
//             setPageDebit(curentPage)
//             setTotalPageDebit(page)
//             setDataDebit([...dataDebit, ...val.data.data]);
//           } else {
//             let err = res.values.message;
//             setDataDebit([])
//             ToastAndroid.show(err, ToastAndroid.SHORT);
//           }
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//       });
//   }

//   const getMutasiCredit = async (str, end) => {
//     setIsLoading(true)
//     await useApiPost(apiMutasiCredit(), {
//       startDate: str ? str : moment(output).startOf('month').format('YYYY-MM-DD'),
//       endDate: end ? end : moment(date).format('YYYY-MM-DD')
//     })
//       .then(async (res) => {
//         // console.log('res credit', res)
//         setIsLoading(false);
//         if (isMounted) {
//           if (res.statusCode === 200) {
//             let dataCredit = res.values.data.data;
//             let curentPage = res.values.data.pagination.currentPage;
//             let page = res.values.data.pagination.totalPage;
//             let  totalPage = res.values.data.totalData;
//             setDataCredit(dataCredit);
//             setPageCredit(curentPage)
//             setTotalPageCredit(page)
//           } else {
//             let err = res.values.message;
//             setDataCredit([]);
//             ToastAndroid.show(err, ToastAndroid.SHORT);
//           }
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//       });
//   }

//   const reloadCredit = async (page) => {
//     setIsLoading(true) 
//     await useApiPost(apiMutasiCredit(), {
//       startDate: start ? start : moment(output).startOf('month').format('YYYY-MM-DD'),
//       endDate: end ? end : moment(date).format('YYYY-MM-DD'),
//       page: page
//     })
//       .then(async (res) => {
//         setIsLoading(false);
//         if (isMounted) {
//           if (res.statusCode === 200) {
//             let val = res.values;
//             let curPage = res.values.data.pagination;
//             let page = res.values.data.pagination;
//             let  totalPage = res.values.data.totalData;
//             setPageCredit(curPage.currentPage)
//             setTotalPageCredit(page.totalPage)
//             setDataCredit([...dataCredit, ...val.data.data]);
//           } else {
//             let err = res.values.message;
//             setDataCredit([])
//             ToastAndroid.show(err, ToastAndroid.SHORT);
//           }
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//       });
//   }

//   useEffect(() => {
//     const backAction = () => {
//       navigation.goBack(null);
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction,
//     );

//     InteractionManager.runAfterInteractions(() => {
//       getSummary()
//       getMutasiDebit()
//       getMutasiCredit()
//     });

//     if(params.pass === 'OUT'){
//       setIndex(1)
//     }

//     return () => {
//       backHandler.remove();
//       isMounted = false;
//     };
//   }, [params.pass]);

//   const loadMore = () => {
//     // console.log(pageDebit)
//     // console.log(totalPageDebit)
//     if(pageDebit < totalPageDebit){
//       let pg = pageDebit + 1;
//       setPageDebit(pg)
//       setTrigerPageDebit(true)
//       reloadDebit(pg)
//     }
//   }

//   const loadMoreCredit = () => {
//     if(pageCredit < totalPageCredit){
//       let pg = pageCredit + 1;
//       setPageCredit(pg)
//       setTrigerPageCredit(true)
//       reloadCredit(pg)
//     }
//   }



//   const renderTabBar = (props) => (
//     <TabBar
//       {...props}
//       style={{
//         backgroundColor: '#FFFFFF',
//         elevation: 0,
//       }}
//       inactiveColor="#F2F2F2"
//       activeColor="#4F6CFF"
//       indicatorStyle={{backgroundColor: '#4F6CFF'}}
//       tabStyle={{flexDirection: 'row', backgroundColor: '#FFFFFF'}}
//       renderLabel={({route, focused, color}) => (
//         <View
//           style={{
//             backgroundColor: color,
//             flexDirection: 'row',
//             height: 60,
//             marginBottom: 5,
//             alignItems: 'center',
//             paddingLeft: 10,
//             borderRadius: 8,
//             paddingHorizontal:25,
//             marginHorizontal: 10,
//           }}>
//           {focused ? (
//             <SvgXml
//               width={30}
//               height={30}
//               xml={route.title === 'Uang Masuk' ? IcActiveDown : IcActiveUp}
//             />
//           ) : (
//             <SvgXml
//               width={30}
//               height={30}
//               xml={route.title === 'Uang Masuk' ? IcAddMutasi : IcOutMutasi}
//             />
//           )}
//           <View style={{marginLeft: 10, width:90}}>
//             <Text
//               style={
//                 focused
//                   ? [{color: 'white'}, styles.fs13, styles.fontMSB]
//                   : [{color: 'black'}, styles.fs13, styles.fontMSB]
//               }>
//               {route.title}
//             </Text>
//             <Text
//               style={
//                 focused
//                   ? [{color: 'white'}, styles.fs12, styles.fontMSB]
//                   : [{color: '#828282'}, styles.fs12, styles.fontMSB]
//               }>
//               {route.title === 'Uang Masuk'
//                 ? `Rp ${debit === '' ? 0 : debit}`
//                 : `Rp ${credit === '' ? 0 : credit}`}
//             </Text>
//           </View>
//         </View>
//       )}
//     />
//   );

//   return (
//     <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
//       <Header
//         onBack={() => navigation.goBack(null)}
//         title={'Mutasi Saldo'}
//         shadow={true}
//         right={false}
//       />
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           marginHorizontal: 15,
//           marginTop: 20,
//           marginBottom: 20,
//         }}>
//         <View>
//           <Text style={[styles.fs15, styles.fontMSB, {color: 'black'}]}>
//             {min === 0 ? moment(start).format('MMMM') : moment(output).startOf('month').format('MMMM')}
//           </Text>
//           <View style={{height:3}}/>
//           <Text style={[styles.fs11, styles.fontMSB]}>
//             {`${start ? moment(start).format('DD MMM') : moment(output).startOf('month').format('DD MMM')} - ${end ? moment(end).format('DD MMM YYYY'): moment(date).format('DD MMM YYYY')}`}
//           </Text>
//         </View>

//         <View style={{flexDirection: 'row', alignItems: 'center'}}>
//           <TouchableOpacity
//             style={{marginRight: 15}}
//             activeOpacity={0.7}
//             onPress={() => prevDate()}>
//             <SvgXml width={35} height={35} xml={IcNextLeft} />
//           </TouchableOpacity>
//           <TouchableOpacity activeOpacity={0.7} onPress={() => nextDate()}>
//             <SvgXml width={35} height={35} xml={IcNextRight} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <TabView
//         navigationState={{index, routes}}
//         renderScene={SceneMap({
//           first: () => <InMutasi debit={dataDebit} onEndReached={loadMore} page={pageDebit} totalPage={totalPageDebit} load={isLoading}/>,
//           second: () => <OutMutasi credit={dataCredit} onEndReached={loadMoreCredit} page={pageCredit} totalPage={totalPageCredit} load={isLoading}/>,
//         })}
//         renderTabBar={renderTabBar}
//         onIndexChange={setIndex}
//         initialLayout={{width: layout.width}}
//       />
//     </SafeAreaView>
//   );
// };

// export default MutasiIn;
