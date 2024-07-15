import React, {Fragment, useState, useEffect, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  RefreshControl,
  InteractionManager,
  BackHandler,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  Button,
  Gap,
  Header,
  ActionSheet,
  Checkbox,
  Text,
} from '../../components';
import {SvgXml} from 'react-native-svg';
import {apiPesawatList} from '../../../../helpers/endPoint';
import {useApiPost} from '../../../../helpers/useFetch';
import {getRupiah, setSession} from '../../../../helpers/Helpers';
import IconCalendarBlack from '../../../../assets/svg/calendar-black.svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import s from '../../../../assets/styles/Style';
import CardInfo from './Components/CardInfo';
import TicketList from './Components/TicketList';
import IconEmpty from '../../../../assets/svg/empty.svg';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const Ticket = ({navigation, route}) => {
  const params = route.params;
  const filterSheetRef = useRef();
  const filterSheetRefTgl = useRef();
  const [filterSheet, setFilterSheet] = useState(false);
  const [filterSheetTgl, setFilterSheetTgl] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [travel, setTravel] = useState(params.travel);
  const [from, setFrom] = useState(params.from);
  const [to, setTo] = useState(params.to);
  const [date, setDate] = useState(params.date);
  const [dateTo, setDateTo] = useState(params.dateTo);
  const [dateFil, setDateFil] = useState(new Date(params.date));
  const [dateToFil, setDateToFil] = useState(new Date(params.dateTo));
  const [passenger, setPassenger] = useState(params.passenger);
  const [classCabin, setClassCabin] = useState(params.classCabin);
  const [countPassenger, setCountPassenger] = useState(0);
  const [dataRes, setDataRes] = useState([]);
  const [dataResPulang, setDataResPulang] = useState([]);
  const [dataResFilterPulang, setDataResFilterPulang] = useState([]);
  const [dataResReal, setDataResReal] = useState([]);
  const [dataPesawat, setDataPesawat] = useState([]);
  const [dataTransit, setDataTransit] = useState([
    {
      code: 'SUM',
      name: 'Transit',
      check: false,
    },
    {
      code: 'DIRECT',
      name: 'Langsung',
      check: false,
    },
  ]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  let isMounted = true;

  const isLogged = async (dt, dt2) => {
    setSession({name: 'cartItems', value: ''});
    setSession({name: 'myCartPass', value: '[]'});
    setSession({name: 'country1', value: from.country_code});
    setSession({name: 'country2', value: to.country_code});

    let cnt = parseInt(passenger.ADT + passenger.CHD + passenger.INF);
    if (isMounted) {
      setCountPassenger(cnt);
    }

    await useApiPost(apiPesawatList(), {
      paxTypeCount: passenger,
      originCode: from.code,
      destinationCode: to.code,
      departureDate: dt,
      returnDate: travel === 'pulangpergi' ? dt2 : '',
      classCabin: classCabin.code,
    })
      .then(async (res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            if (val.data.length > 0) {
              setDataRes(val.data[0].journeys);
              setDataResReal(val.data[0].journeys);

              if (travel === 'pulangpergi') {
                setDataResPulang(val.data[1].journeys);
                setDataResFilterPulang(val.filter.plane);
              } else {
                setDataResPulang([]);
                setDataResFilterPulang([]);
              }

              let dP = val.filter.plane;
              let dpNew = [];
              dP.forEach((item) => {
                dpNew.push({
                  ...item,
                  check: false,
                });
              });

              setDataPesawat(dpNew);
            } else {
              setDataRes([]);
              setDataResReal([]);
              setDataPesawat([]);
            }
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
    const currentDate = selectedDate || dateFil;

    setShow(Platform.OS === 'ios');
    if (event.type === 'neutralButtonPressed') {
      setDateFil(new Date(0));
    } else {
      setDateFil(currentDate);
    }
  };

  const changeDateTo = (event, selectedDate) => {
    const currentDateTo = selectedDate || dateToFil;

    setShow2(Platform.OS === 'ios');
    if (event.type === 'neutralButtonPressed') {
      setDateToFil(new Date(0));
    } else {
      setDateToFil(currentDateTo);
    }
  };

  const submitUpdateDate = () => {
    setFilterSheetTgl(false);
    setIsLoading(true);
    setDate(moment(dateFil).format('YYYY-MM-DD'));
    setDateTo(moment(dateToFil).format('YYYY-MM-DD'));
    isLogged(
      moment(dateFil).format('YYYY-MM-DD'),
      moment(dateToFil).format('YYYY-MM-DD'),
    );
  };

  const setFilter = (pes, check) => {
    let editPass = [...dataPesawat];
    editPass[pes].check = !check;
    setDataPesawat(editPass);
  };

  const setFilterTransit = (pes, check) => {
    let editPass = [...dataTransit];
    editPass[pes].check = !check;
    setDataTransit(editPass);
  };

  const resetFilter = () => {
    let editPass1 = [...dataPesawat];
    let editPass = [...dataTransit];
    let pesaNew = [];
    editPass1.forEach((item) => {
      let ars = {
        code: item.code,
        logo: item.logo,
        name: item.name,
        check: false,
      };
      pesaNew.push(ars);
    });

    let tranNew = [];
    editPass.forEach((item) => {
      let ars = {
        code: item.code,
        name: item.name,
        check: false,
      };
      tranNew.push(ars);
    });

    setDataTransit(tranNew);
    setDataPesawat(pesaNew);
    setDataRes(dataResReal);
    setFilterSheet(false);
  };

  const submitFilter = () => {
    let pesa = dataPesawat.filter(function (item) {
      return item.check === true;
    });

    let tran = dataTransit.filter(function (item) {
      return item.check === true;
    });

    const resultPesawat = dataResReal.filter(function (item1) {
      return pesa.some(function (item2) {
        return item1.planeCode == item2.code;
      });
    });

    let arrAll = [];
    if (pesa.length > 0) {
      arrAll = resultPesawat;
    } else {
      arrAll = dataResReal;
    }

    const resultTransit = arrAll.filter(function (item1) {
      return tran.some(function (item2) {
        return item1.connectingType == item2.code;
      });
    });

    let resultDone = [];
    if (tran.length > 0) {
      resultDone = resultTransit;
    } else {
      if (pesa.length > 0) {
        resultDone = arrAll;
      } else {
        resultDone = dataResReal;
      }
    }

    let tot = parseInt(pesa.length + tran.length);
    if (tot > 0) {
      setDataRes(resultDone);
    } else {
      setDataRes(dataResReal);
    }
    setFilterSheet(false);
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged(
      moment(date).format('YYYY-MM-DD'),
      moment(dateTo).format('YYYY-MM-DD'),
    );
  };

  const renderItem = React.useCallback(({item, index}) => {
    let transit = parseInt(item.segments.length - 1);
    let datasFrom = item.segments[0];
    let depTime = moment(item.departure).format('HH:mm');
    let arvTime = moment(item.arrival).format('HH:mm');
    let currency = datasFrom?.fares?.currencyCode;

    return (
      <View style={styles.containerList} key={index}>
        <Fragment>
          <Gap height={15} />
          <TicketList
            imageUrl={item.connectingType === 'DIRECT' ? item.planeImage : ''}
            maskapaiName={item.planeName}
            maskapaiCode={item.planeNumber}
            timeFrom={depTime}
            timeTo={arvTime}
            codeTo={to.code}
            codeFrom={from.code}
            duration={`${item.flightDuration} (${
              transit > 0 ? transit + ' Transit' : 'Langsung'
            })`}
            price={
              currency + ' ' + getRupiah(item.priceTotal ? item.priceTotal : 0)
            }
            onPressDetail={() => {
              navigation.push('DetailKeberangkatan', {
                travel: travel,
                from: from,
                to: to,
                date: date,
                dateTo: dateTo,
                passenger: passenger,
                classCabin: classCabin,
                item: item,
                dataResPulang: dataResPulang,
                dataResFilterPulang: dataResFilterPulang,
              });
            }}
          />
        </Fragment>
      </View>
    );
  });

  const listEmptyComponent = () => {
    return (
      <View
        style={[
          styles.boxEmpty,
          {justifyContent: 'center', alignItems: 'center', marginTop: 40},
        ]}>
        {!isLoading ? (
          <>
            <SvgXml width={120} height={120} xml={IconEmpty} />
            <Text style={styles.textEmpty}>Tidak Ada Rute</Text>
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
      isLogged(
        moment(date).format('YYYY-MM-DD'),
        moment(dateTo).format('YYYY-MM-DD'),
      );
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, [dateFil, dateToFil]);

  useEffect(() => {
    if (filterSheet) {
      filterSheetRef.current?.setModalVisible(true);
    } else {
      filterSheetRef.current?.setModalVisible(false);
    }
  }, [filterSheet]);

  useEffect(() => {
    if (filterSheetTgl) {
      filterSheetRefTgl.current?.setModalVisible(true);
    } else {
      filterSheetRefTgl.current?.setModalVisible(false);
    }
  }, [filterSheetTgl]);

  return (
    <View style={styles.page}>
      <Header type="fromto" from={from.name} to={to.name} />

      <FlatList
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }
        ListHeaderComponent={
          <>
            <Gap height={23} backgroundColor="#00A79D" />
            <View style={styles.container}>
              <CardInfo
                destination={`${from.code} - ${to.code}`}
                date={moment(date).format('Do MMM')}
                passenger={countPassenger}
                cabin={classCabin.name}
                onEdit={() => {
                  navigation.goBack();
                }}
              />
            </View>
          </>
        }
        ListFooterComponent={<Gap height={25} />}
        shouldItemUpdate={shouldItemUpdate}
        data={dataRes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={listEmptyComponent}
        removeClippedSubviews={true}
        legacyImplementation={false}
      />

      <View style={styles.bottom}>
        <View style={styles.bottomCol}>
          <Button
            title="Filter"
            onPress={() => {
              setFilterSheet(true);
            }}
            type="secondary"
          />
        </View>
        <Gap width={20} />
        <View style={styles.bottomCol}>
          <Button
            title="Ubah Tanggal"
            onPress={() => {
              setFilterSheetTgl(true);
            }}
            type="grey"
          />
        </View>
      </View>

      {/*  */}
      <ActionSheet
        actionRef={filterSheetRef}
        onClose={() => {
          setFilterSheet(false);
        }}
        paddingHorizontal={20}
        title="Urutkan & Filter">
        <View style={[styles.padding, {paddingBottom: 20}]}>
          {dataPesawat.length > 0 ? (
            <View style={styles.sectionFilter}>
              <Text size={16} weight="bold">
                Maskapai Penerbangan
              </Text>
              <Gap height={15} />
              {dataPesawat.map((item, key) => (
                <Checkbox
                  key={key}
                  layout="between"
                  label={item.name}
                  imageUrl={item.logo}
                  mb={10}
                  checked={item.check}
                  onPress={() => {
                    setFilter(key, item.check);
                  }}
                  withImage={true}
                />
              ))}
            </View>
          ) : null}
          <View style={styles.sectionFilter}>
            <Text size={16} weight="bold">
              Transit
            </Text>
            <Gap height={15} />
            {dataTransit.map((item, key) => (
              <Checkbox
                key={key}
                layout="between"
                label={item.name}
                mb={20}
                checked={item.check}
                onPress={() => {
                  setFilterTransit(key, item.check);
                }}
              />
            ))}
          </View>

          <View style={styles.bottomBtn}>
            <View style={styles.bottomBtnCol}>
              <Button
                title="Reset Semua"
                onPress={() => {
                  resetFilter();
                }}
                type="grey"
              />
            </View>
            <Gap width={20} />
            <View style={styles.bottomBtnCol}>
              <Button
                title="Terapkan"
                onPress={() => {
                  submitFilter();
                }}
              />
            </View>
          </View>
        </View>
      </ActionSheet>
      {/*  */}

      {/*  */}
      <ActionSheet
        actionRef={filterSheetRefTgl}
        onClose={() => {
          setFilterSheetTgl(false);
        }}
        paddingHorizontal={20}
        title="Ubah Tanggal">
        <View style={[styles.padding, {paddingBottom: 20}]}>
          <View style={styles.sectionFilter}>
            <Text size={16} weight="bold">
              Tanggal Pergi
            </Text>
            <View style={[styles.sectionForm]}>
              <TextInput
                editable={false}
                autoCorrect={false}
                style={[s.PulsaInputBoxNew, s.black, s.fontWSR]}
                placeholder="Masukkan Tanggal"
                placeholderTextColor="#d2d2d2"
                value={moment(dateFil).format('YYYY-MM-DD')}
                maxLength={20}
                minLength={14}
              />
              {show && (
                <DateTimePicker
                  minimumDate={new Date()}
                  testID="dateTimePicker"
                  value={dateFil}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={changeDate}
                />
              )}
              <TouchableOpacity
                style={s.hrefContact}
                onPress={() => {
                  setShow(true);
                }}>
                <SvgXml width={23} height={23} xml={IconCalendarBlack} />
              </TouchableOpacity>
            </View>
          </View>

          {travel === 'pulangpergi' ? (
            <View style={styles.sectionFilter}>
              <Text size={16} weight="bold">
                Tanggal Pulang
              </Text>
              <View style={[styles.sectionForm]}>
                <TextInput
                  editable={false}
                  autoCorrect={false}
                  style={[s.PulsaInputBoxNew, s.black, s.fontWSR]}
                  placeholder="Masukkan Tanggal"
                  placeholderTextColor="#d2d2d2"
                  value={moment(dateToFil).format('YYYY-MM-DD')}
                  maxLength={20}
                  minLength={14}
                />
                {show2 && (
                  <DateTimePicker
                    minimumDate={new Date()}
                    testID="dateTimePicker"
                    value={dateToFil}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={changeDateTo}
                  />
                )}
                <TouchableOpacity
                  style={s.hrefContact}
                  onPress={() => {
                    setShow2(true);
                  }}>
                  <SvgXml width={23} height={23} xml={IconCalendarBlack} />
                </TouchableOpacity>
              </View>
              <Gap height={10} />
            </View>
          ) : null}

          <View style={styles.bottomBtn}>
            <View style={styles.bottomBtnCol}>
              <Button
                title="Terapkan"
                onPress={() => {
                  submitUpdateDate();
                }}
              />
            </View>
          </View>
        </View>
      </ActionSheet>
      {/*  */}
    </View>
  );
};

export default Ticket;

const styles = StyleSheet.create({
  textForm: {
    fontSize: 12,
    color: '#000000',
  },
  sectionForm: {
    height: 45,
    flexDirection: 'row',
    marginVertical: 5,
    marginLeft: 0,
    marginRight: 0,
  },
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    marginTop: -23,
    paddingHorizontal: 25,
  },
  containerList: {
    paddingHorizontal: 25,
  },
  padding: {
    paddingHorizontal: 20,
  },
  sectionFilter: {
    borderTopWidth: 1,
    borderColor: '#DBDBDB',
    paddingTop: 20,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    backgroundColor: 'white',
  },
  bottomCol: {
    flex: 1,
  },
  bottomBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 0,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 0,
    backgroundColor: 'white',
  },
  bottomBtnCol: {
    flex: 1,
  },
});
