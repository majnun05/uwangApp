import React, {Fragment, useState, useEffect, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  RefreshControl,
  InteractionManager,
  BackHandler,
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
// import {apiPesawatList} from '../../../../helpers/endPoint';
// import {useApiPost} from '../../../../helpers/useFetch';
import {getRupiah, setSession} from '../../../../helpers/Helpers';
import CardInfo from './Components/CardInfo';
import TicketList from './Components/TicketList';
import IconEmpty from '../../../../assets/svg/empty.svg';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const TicketPulang = ({navigation, route}) => {
  const params = route.params;
  const filterSheetRef = useRef();
  const [filterSheet, setFilterSheet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [travel, setTravel] = useState(params.travel);
  const [from, setFrom] = useState(params.from);
  const [to, setTo] = useState(params.to);
  const [date, setDate] = useState(params.date);
  const [dateTo, setDateTo] = useState(params.dateTo);
  const [passenger, setPassenger] = useState(params.passenger);
  const [classCabin, setClassCabin] = useState(params.classCabin);
  const [itemPergi, setItemPergi] = useState(params.itemPergi);
  const [totalPergi, settotalPergi] = useState(params.totalPergi);
  const [pricePergi, setpricePergi] = useState(params.pricePergi);
  const [countPassenger, setCountPassenger] = useState(0);
  const [dataResFilterPulang, setDataResFilterPulang] = useState(
    params.dataResFilterPulang ? params.dataResFilterPulang : [],
  );
  const [dataRes, setDataRes] = useState(
    params.dataResPulang ? params.dataResPulang : [],
  );
  const [dataResReal, setDataResReal] = useState(
    params.dataResPulang ? params.dataResPulang : [],
  );
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
  let isMounted = true;

  const isLogged = async () => {
    setSession({name: 'cartItems', value: ''});
    setSession({name: 'myCartPass', value: '[]'});

    let cnt = parseInt(passenger.ADT + passenger.CHD + passenger.INF);
    if (isMounted) {
      setCountPassenger(cnt);

      if (isMounted) {
        setIsLoading(false);
        let dP = dataResFilterPulang;
        let dpNew = [];
        dP.forEach((item) => {
          dpNew.push({
            ...item,
            check: false,
          });
        });
        setDataPesawat(dpNew);
      }
    }
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
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

  const renderItem = React.useCallback(({item, index}) => {
    let transit = parseInt(item.segments.length - 1);
    let datasFrom = item.segments[0];
    let depTime = moment(item.departure).format('HH:mm');
    let arvTime = moment(item.arrival).format('HH:mm');
    let currency = datasFrom.fares?.currencyCode;

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
            codeTo={from.code}
            codeFrom={to.code}
            duration={`${item.flightDuration} (${
              transit > 0 ? transit + ' Transit' : 'Langsung'
            })`}
            price={
              currency + ' ' + getRupiah(item.priceTotal ? item.priceTotal : 0)
            }
            onPressDetail={() => {
              navigation.push('DetailKeberangkatanPulang', {
                travel: travel,
                from: from,
                to: to,
                date: date,
                dateTo: dateTo,
                passenger: passenger,
                classCabin: classCabin,
                item: item,
                itemPergi: itemPergi,
                totalPergi: totalPergi,
                pricePergi: pricePergi,
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
      isLogged();
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (filterSheet) {
      filterSheetRef.current?.setModalVisible(true);
    } else {
      filterSheetRef.current?.setModalVisible(false);
    }
  }, [filterSheet]);

  return (
    <View style={styles.page}>
      <Header type="fromto" from={to.name} to={from.name} />

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
                destination={`${to.code} - ${from.code}`}
                date={moment(dateTo).format('Do MMM')}
                passenger={countPassenger}
                cabin={classCabin.name}
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
    </View>
  );
};

export default TicketPulang;

const styles = StyleSheet.create({
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
