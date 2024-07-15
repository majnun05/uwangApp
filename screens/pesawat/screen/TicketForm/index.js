import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  InteractionManager,
  BackHandler,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  Text,
} from 'react-native';
import {
  IconRotate,
  IconPesawatDari,
  IconPesawatKe,
  IconCalendar,
  IconPesawatSeat,
  IconPenumpang,
} from '../../assets';
import {SvgXml} from 'react-native-svg';
import {
  Header,
  Corner,
  Gap,
  InputPesawat,
  Button,
  Radio,
  ActionSheet,
  Search,
  ListTo,
  CountPicker,
  ListSelect,
} from '../../components';
import s from '../../../../assets/styles/Style';
import {apiPesawatAirport} from '../../../../helpers/endPoint';
import {useApiPost} from '../../../../helpers/useFetch';
import {getSnackBar_error, setSession} from '../../../../helpers/Helpers';
import DateTimePicker from '@react-native-community/datetimepicker';
import IconEmpty from '../../../../assets/svg/empty.svg';
import kelasJson from '../../assets/json/kelas.json';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const TicketForm = ({navigation}) => {
  const tujuanSheetRef = useRef();
  const penumpangSheetRef = useRef();
  const kelasSheetRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [tujuanSheet, setTujuanSheet] = useState(false);
  const [penumpangSheet, setPenumpangSheet] = useState(false);
  const [kelasSheet, setKelasSheet] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [dataRes, setDataRes] = useState([]);
  const [dataResReal, setDataResReal] = useState([]);
  const [titleAirport, setTitleAirport] = useState('Keberangkatan');
  const [tab, setTab] = useState('pergi');
  const [from, setFrom] = useState({
    name: 'Jakarta, Indonesia',
    country_code: 'ID',
    country_name: 'Indonesia',
    airport: 'Soekarno Hatta',
    code: 'CGK',
  });
  const [to, setTo] = useState({
    name: 'Denpasar, Indonesia',
    country_code: 'ID',
    country_name: 'Indonesia',
    airport: 'I Gusti Ngurah Rai - Bali',
    code: 'DPS',
  });
  const [show, setShow] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);
  const [datakelas, setDatakelas] = useState(kelasJson.data);
  const [kelas, setKelas] = useState({
    name: 'Economy',
    code: 'E',
  });
  let isMounted = true;

  const isLogged = async (hal) => {
    setIsLoading(true);
    setPage(hal);
    setSession({name: 'cartItems', value: ''});
    await useApiPost(apiPesawatAirport(), {
      page: hal,
      search: searchValue,
    })
      .then(async (res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values.data;
            setDataRes(val.data);
            setDataResReal(val.data);
            setTotalPage(val.data.pagination.totalPage);
          } else if (res.statusCode === 500) {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          } else {
            setIsLoading(false);
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const changeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === 'ios');
    if (event.type === 'neutralButtonPressed') {
      setDate(new Date(0));
    } else {
      setDate(currentDate);
    }
  };

  const changeDateTo = (event, selectedDate) => {
    const currentDateTo = selectedDate || dateTo;

    setShowTo(Platform.OS === 'ios');
    if (event.type === 'neutralButtonPressed') {
      setDateTo(new Date(0));
    } else {
      setDateTo(currentDateTo);
    }
  };

  const addPassenger = (check) => {
    if (check === 'Dewasa') {
      if (parseInt(adult) > 0) {
        if (parseInt(parseInt(adult + child) + 1) > 7) {
          getSnackBar_error({
            title: 'Maksimal 7 penumpang dewasa atau anak per transaksi',
            duration: 'LENGTH_INDEFINITE',
          });
        } else {
          setAdult(parseInt(adult) + 1);
        }
      }
    } else if (check === 'Anak') {
      if (parseInt(parseInt(adult + child) + 1) > 7) {
        getSnackBar_error({
          title: 'Maksimal 7 penumpang dewasa atau anak per transaksi',
          duration: 'LENGTH_INDEFINITE',
        });
      } else {
        setChild(parseInt(child) + 1);
      }
    } else {
      if (parseInt(parseInt(infant) + 1) > parseInt(adult)) {
        getSnackBar_error({
          title:
            'Penumpang bayi tidak lebih dari penumpang dewasa per transaksi',
          duration: 'LENGTH_INDEFINITE',
        });
      } else {
        if (parseInt(parseInt(infant) + 1) > 4) {
          getSnackBar_error({
            title: 'Maksimal 4 penumpang bayi per transaksi',
            duration: 'LENGTH_INDEFINITE',
          });
        } else {
          setInfant(parseInt(parseInt(infant) + 1));
        }
      }
    }

    return true;
  };

  const minPassenger = (check) => {
    if (check === 'Dewasa') {
      if (parseInt(adult) > 1) {
        if (parseInt(infant) > parseInt(adult - 1)) {
          getSnackBar_error({
            title:
              'Penumpang bayi tidak lebih dari penumpang dewasa per transaksi',
            duration: 'LENGTH_INDEFINITE',
          });
        } else {
          setAdult(parseInt(adult) - 1);
        }
      }
    } else if (check === 'Anak') {
      if (parseInt(child) > 0) {
        setChild(parseInt(child) - 1);
      }
    } else {
      if (parseInt(infant) > 0) {
        setInfant(parseInt(infant) - 1);
      }
    }
    return true;
  };

  const setUpdateKelas = (item) => {
    setKelasSheet(false);
    setKelas(item);
  };

  const rotateSubmit = () => {
    setTo(from);
    setFrom(to);
  };

  const chooseAirport = (check) => {
    setTitleAirport(check === 'from' ? 'Keberangkatan' : 'Tujuan');
    setTujuanSheet(true);
  };

  const chooseDestination = (item) => {
    setTujuanSheet(false);
    if (titleAirport === 'Keberangkatan') {
      setFrom(item);
    } else {
      setTo(item);
    }
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged(page);
  };

  // const searchFilterFunction = async (text) => {
  //   const newData = dataRes.filter((item) => {
  //     let textSearch = text.toLowerCase();

  //     if (item.name.toLowerCase().includes(textSearch)) {
  //       return true;
  //     }

  //     if (item.code.toLowerCase().includes(textSearch)) {
  //       return true;
  //     }

  //     return (
  //       item.name &&
  //       item.code &&
  //       (item.name.toLowerCase() == textSearch ||
  //         item.code.toLowerCase() == textSearch)
  //     );
  //   });
  //   setDataRes(newData);
  // };

  const updatePP = (it) => {
    setTab(it);
    setDateTo(date);
  };

  const submitSearch = () => {
    navigation.push('PesawatTicket', {
      travel: tab,
      from: from,
      to: to,
      date: moment(date).format('YYYY-MM-DD'),
      dateTo: tab === 'pergi' ? '' : moment(dateTo).format('YYYY-MM-DD'),
      passenger: {
        ADT: adult,
        CHD: child,
        INF: infant,
      },
      classCabin: kelas,
    });
  };

  const renderFooter = () => {
    return (
      <>
        {page < totalPage ? (
          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                isLogged(parseInt(page + 1));
              }}
              style={styles.loadMoreBtn}>
              <Text style={styles.btnText}>Selanjutnya</Text>
              {isLoading ? (
                <ActivityIndicator color="white" style={{marginLeft: 8}} />
              ) : null}
            </TouchableOpacity>
          </View>
        ) : null}
      </>
    );
  };

  const renderItem = React.useCallback(({item, index}) => {
    return (
      <ListTo
        key={index}
        title={item.name}
        desc={item.airport}
        label={item.code}
        onPress={() => {
          chooseDestination(item);
        }}
      />
    );
  });

  const listEmptyComponent = () => {
    return (
      <View style={s.boxEmpty}>
        {!isLoading ? (
          <>
            <SvgXml width={120} height={120} xml={IconEmpty} />
            <Text style={s.textEmpty}>Tidak Ada Data</Text>
          </>
        ) : null}
      </View>
    );
  };

  const shouldItemUpdate = (prev, next) => {
    const {numColumns, shouldItemUpdate} = this.props;
    if (numColumns > 1) {
      return (
        prev.item.length !== next.item.length ||
        prev.item.some((prevItem, ii) =>
          shouldItemUpdate(
            {item: prevItem, index: prev.index * numColumns + ii},
            {item: next.item[ii], index: next.index * numColumns + ii},
          ),
        )
      );
    } else {
      return shouldItemUpdate(prev, next);
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
      isLogged(page);
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, [searchValue]);

  useEffect(() => {
    if (kelasSheet) {
      kelasSheetRef.current?.setModalVisible(true);
    } else {
      kelasSheetRef.current?.setModalVisible(false);
    }
  }, [kelasSheet]);
  useEffect(() => {
    if (tujuanSheet) {
      tujuanSheetRef.current?.setModalVisible(true);
    } else {
      tujuanSheetRef.current?.setModalVisible(false);
    }
  }, [tujuanSheet]);
  useEffect(() => {
    if (penumpangSheet) {
      penumpangSheetRef.current?.setModalVisible(true);
    } else {
      penumpangSheetRef.current?.setModalVisible(false);
    }
  }, [penumpangSheet]);

  return (
    <View style={styles.page}>
      <Header title="Pesawat" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }>
        <Corner height={100} />
        <View style={styles.container}>
          <View style={styles.box}>
            <View style={styles.radioRow}>
              <View style={styles.radioLeft}>
                <Radio
                  label="Sekali Pergi"
                  checked={tab === 'pergi' ? true : false}
                  onPress={() => {
                    updatePP('pergi');
                  }}
                />
              </View>
              <View style={styles.radioRight}>
                <Radio
                  label="Pulang Pergi"
                  checked={tab === 'pulangpergi' ? true : false}
                  onPress={() => {
                    updatePP('pulangpergi');
                  }}
                />
              </View>
            </View>
            <Gap height={25} />
            <View style={styles.fromWrapper}>
              <InputPesawat
                label="Dari"
                value={`${from.name} (${from.code})`}
                icon={IconPesawatDari}
                onPress={() => chooseAirport('from')}
              />
              <Gap height={15} />
              <TouchableOpacity
                style={styles.iconRotate}
                onPress={() => {
                  rotateSubmit();
                }}>
                <SvgXml xml={IconRotate} />
              </TouchableOpacity>
            </View>
            <InputPesawat
              label="Ke"
              value={`${to.name} (${to.code})`}
              icon={IconPesawatKe}
              onPress={() => chooseAirport('to')}
            />
            <Gap height={15} />
            <InputPesawat
              label="Pergi"
              value={moment(date).format('YYYY-MM-DD')}
              icon={IconCalendar}
              onPress={() => setShow(true)}
            />
            {show && (
              <DateTimePicker
                minimumDate={new Date()}
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={changeDate}
              />
            )}
            {tab === 'pulangpergi' ? (
              <>
                <Gap height={15} />
                <InputPesawat
                  label="Pulang"
                  value={moment(dateTo).format('YYYY-MM-DD')}
                  icon={IconCalendar}
                  onPress={() => setShowTo(true)}
                />
                {showTo && (
                  <DateTimePicker
                    minimumDate={date}
                    testID="dateTimePicker"
                    value={dateTo}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={changeDateTo}
                  />
                )}
              </>
            ) : null}
            <Gap height={15} />
            <InputPesawat
              label="Penumpang"
              value={`${adult} Dewasa${
                parseInt(child) > 0 ? `, ${child} Anak` : ``
              }${parseInt(infant) > 0 ? `, ${infant} Bayi` : ``}`}
              icon={IconPenumpang}
              onPress={() => setPenumpangSheet(true)}
            />
            <Gap height={15} />
            <InputPesawat
              label="Kelas Penerbangan"
              value={kelas.name}
              icon={IconPesawatSeat}
              onPress={() => setKelasSheet(true)}
            />
            <Gap height={22} />
            <Button
              title="Cari Tiket"
              onPress={() => {
                submitSearch();
              }}
            />
          </View>
        </View>
        <Gap height={30} />
      </ScrollView>

      {/*  */}
      <ActionSheet
        height={100}
        actionRef={tujuanSheetRef}
        onClose={() => {
          setTujuanSheet(false);
        }}
        paddingHorizontal={20}
        title={`Pilih ${titleAirport}`}>
        <View style={styles.padding}>
          <Search
            placeholder="Mau Pergi kemana?"
            noshadow
            onChangeText={(value) => {
              setSearchValue(value);
            }}
            // onChangeText={(text) => searchFilterFunction(text)}
            // onKeyPress={({nativeEvent}) => {
            //   if (nativeEvent.key === 'Backspace') {
            //     setDataRes(dataResReal);
            //   }
            // }}
          />
          <Gap height={10} />
          <FlatList
            ListFooterComponent={renderFooter}
            refreshControl={
              <RefreshControl
                colors={['#4F6CFF', '#4F6CFF']}
                refreshing={isLoading}
                onRefresh={_onRefresh}
              />
            }
            shouldItemUpdate={shouldItemUpdate}
            data={dataRes}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={listEmptyComponent}
            removeClippedSubviews={true}
            legacyImplementation={false}
          />
        </View>
      </ActionSheet>
      {/*  */}

      {/*  */}
      <ActionSheet
        actionRef={penumpangSheetRef}
        onClose={() => {
          setPenumpangSheet(false);
        }}
        paddingHorizontal={20}
        title="Penumpang">
        <View style={styles.padding}>
          <CountPicker
            title="Dewasa"
            desc="Usia 12+"
            value={adult}
            onPressMin={() => {
              minPassenger('Dewasa');
            }}
            onPressPlus={() => {
              addPassenger('Dewasa');
            }}
          />
          <Gap height={20} />
          <CountPicker
            title="Anak"
            desc="Usia 2 - 11"
            value={child}
            onPressMin={() => {
              minPassenger('Anak');
            }}
            onPressPlus={() => {
              addPassenger('Anak');
            }}
          />
          <Gap height={20} />
          <CountPicker
            title="Bayi"
            desc="Di bawah 2 tahun"
            value={infant}
            onPressMin={() => {
              minPassenger('Bayi');
            }}
            onPressPlus={() => {
              addPassenger('Bayi');
            }}
          />
          <Gap height={40} />
          <Button title="Selesai" onPress={() => setPenumpangSheet(false)} />
        </View>
      </ActionSheet>
      {/*  */}

      {/*  */}
      <ActionSheet
        actionRef={kelasSheetRef}
        onClose={() => {
          setKelasSheet(false);
        }}
        paddingHorizontal={20}
        title="Kelas Penerbangan">
        <View style={styles.padding}>
          {datakelas.map((item, key) => (
            <ListSelect
              key={key}
              title={item.name}
              checked={kelas.code === item.code ? true : false}
              onPress={() => setUpdateKelas(item)}
            />
          ))}
        </View>
      </ActionSheet>
      {/*  */}
    </View>
  );
};

export default TicketForm;

const styles = StyleSheet.create({
  footer: {
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#00A79D',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  padding: {
    paddingHorizontal: 20,
  },
  container: {
    paddingHorizontal: 25,
  },
  fromWrapper: {
    position: 'relative',
  },
  iconRotate: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FF931C',
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  radioLeft: {
    paddingRight: 5,
  },
  radioRight: {
    paddingLeft: 5,
  },
  box: {
    padding: 15,
    paddingTop: 28,
    borderRadius: 12,
    backgroundColor: 'white',
    marginTop: -100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
