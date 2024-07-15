import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  BackHandler,
  InteractionManager,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {apiPesawatPrice} from '../../../../helpers/endPoint';
import {useApiPost} from '../../../../helpers/useFetch';
import {getRupiah} from '../../../../helpers/Helpers';
import {Header, Gap, Text, Button} from '../../components';
import {
  getClass,
  getTimeFull,
  getSnackBar_error,
} from '../../../../helpers/Helpers';
import IconRightList from '../../../../assets/svg/right-lists.svg';
import {SvgXml} from 'react-native-svg';
import {IconClock} from '../../assets';
import {ActionSheet} from '../../components';
import DetailBox from './components/DetailBox';
import DetailTime from './components/DetailTime';
import LineVertical from './components/LineVertical';
import s from '../../../../assets/styles/Style';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const DetailKeberangkatan = ({navigation, route}) => {
  const params = route.params;
  const detailSheetRef = useRef();
  const [detailSheet, setDetailSheet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [travel, setTravel] = useState(params.travel);
  const [from, setFrom] = useState(params.from);
  const [to, setTo] = useState(params.to);
  const [date, setDate] = useState(params.date);
  const [dateTo, setDateTo] = useState(params.dateTo);
  const [passenger, setPassenger] = useState(params.passenger);
  const [classCabin, setClassCabin] = useState(params.classCabin);
  const [item, setItem] = useState(params.item);
  const [dataResPulang, setDataResPulang] = useState(params.dataResPulang);
  const [dataResFilterPulang, setDataResFilterPulang] = useState(
    params.dataResFilterPulang,
  );
  const [segments, setSegments] = useState([]);
  const [total, setTotal] = useState(0);
  const [pricePergi, setpricePergi] = useState({});
  const [dataFares, setdataFares] = useState([]);
  const [key, setKey] = useState('');
  const [tujuan, settujuan] = useState('');
  let isMounted = true;

  const isLogged = async () => {
    let dataSeg = [];
    let arr = item.segments;

    for (var i = 0; i < arr.length; i++) {
      let pushData = {
        flightDesignator: arr[i].flightDesignator,
        fareRuleKey: arr[i].fares?.fareRuleKey,
        fareCode: arr[i].fares?.fareCode,
        arrivalDateTime: arr[i].arrivalDateTime,
        departureDateTime: arr[i].departureDateTime,
        additionalBaggageSupport: arr[i].additionalBaggageSupport,
        origin: arr[i].origin,
        RPH: arr[i].RPH,
        destination: arr[i].destination,
        through: arr[i].through,
      };
      dataSeg.push(pushData);
    }

    // console.log(JSON.stringify(dataSeg, null, 2));

    await useApiPost(apiPesawatPrice(), {
      paxTypeCount: passenger,
      journeys: [
        {
          vendorCode: item.vendorCode,
          connectingType: item.connectingType,
          segments: dataSeg,
        },
      ],
    })
      .then(async (res) => {
        if (isMounted) {
          setSegments(item.segments);
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            if (val.data.length > 0) {
              let seg = val.data;
              let ttl = 0;

              seg.map((it0) => {
                it0.segments.map((it1) => {
                  it1.fares.map((it2) => {
                    it2.paxFares.map((it3) => {
                      ttl += it3.total;
                    });
                  });
                });
              });

              setTotal(ttl);
              setpricePergi(seg);
            } else {
              setTotal(0);
              setpricePergi([]);
            }
          } else {
            navigation.goBack(null);
            setIsLoading(false);
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const showDetail = (it, k, t) => {
    setDetailSheet(true);
    setdataFares(it);
    setKey(k);
    settujuan(t);
  };

  const setFaresModal = (it) => {
    setDetailSheet(false);
    actionBtn(it, key);
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
  };

  const actionBtn = async (itemChange, num) => {
    setIsLoading(true);

    let ubah = [...segments];
    ubah[num].fares = itemChange;

    let dataSeg = [];
    let arr = ubah;
    for (var i = 0; i < arr.length; i++) {
      let pushData = {
        flightDesignator: arr[i].flightDesignator,
        fareRuleKey: arr[i].fares.fareRuleKey,
        fareCode: arr[i].fares.fareCode,
        arrivalDateTime: arr[i].arrivalDateTime,
        departureDateTime: arr[i].departureDateTime,
        additionalBaggageSupport: arr[i].additionalBaggageSupport,
        origin: arr[i].origin,
        RPH: arr[i].RPH,
        destination: arr[i].destination,
        through: arr[i].through,
      };
      dataSeg.push(pushData);
    }

    await useApiPost(apiPesawatPrice(), {
      paxTypeCount: passenger,
      journeys: [
        {
          vendorCode: item.vendorCode,
          connectingType: item.connectingType,
          segments: dataSeg,
        },
      ],
    })
      .then(async (res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            if (val.data.length > 0) {
              let seg = val.data;
              let ttl = 0;

              seg.map((it0) => {
                it0.segments.map((it1) => {
                  it1.fares.map((it2) => {
                    it2.paxFares.map((it3) => {
                      ttl += it3.total;
                    });
                  });
                });
              });

              setTotal(ttl);
              setpricePergi(seg);
            } else {
              setTotal(0);
              setpricePergi([]);
            }
            setSegments(ubah);
          } else {
            navigation.goBack(null);
            setSegments(item.segments);
            setIsLoading(false);
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
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
    if (detailSheet) {
      detailSheetRef.current?.setModalVisible(true);
    } else {
      detailSheetRef.current?.setModalVisible(false);
    }
  }, [detailSheet]);

  return (
    <View style={styles.page}>
      <Header
        title={travel === 'pergi' ? 'Detail Keberangkatan' : 'Detail Pergi'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }>
        <View style={[styles.padding, {marginTop: 20}]}>
          <View style={styles.rowBetween}>
            <Text size={14} weight="bold" full>
              {from.name} - {to.name}
            </Text>
            <View style={styles.row}>
              <SvgXml xml={IconClock} />
              <Gap width={5} />
              <Text size={14} color="#9F9F9F">
                {item.flightDuration}
              </Text>
            </View>
          </View>
          <View style={styles.hr} />
        </View>

        {/*  */}
        {segments.map((items, key) => (
          <View key={key}>
            <View style={[styles.timeline, styles.padding, {marginBottom: 20}]}>
              <View style={styles.timelineLeft}>
                <DetailTime
                  fromTime={moment(items.departureDateTime).format('HH:mm')}
                  fromDate={moment(items.departureDateTime).format('Do MMM')}
                  toTime={moment(items.arrivalDateTime).format('HH:mm')}
                  toDate={moment(items.arrivalDateTime).format('Do MMM')}
                  duration={getTimeFull(
                    moment(items.departureDateTime).format(
                      'DD/MM/YYYY HH:mm:ss',
                    ),
                    moment(items.arrivalDateTime).format('DD/MM/YYYY HH:mm:ss'),
                  )}
                />
              </View>
              <View style={styles.timelineCenter}>
                <LineVertical />
              </View>
              <View style={styles.timelineRight}>
                <DetailBox
                  from={`${items.origin.airportName} (${items.origin.code})`}
                  to={`${items.destination.airportName} (${items.destination.code})`}
                  planeImage={items.flightDesignator.planeImage}
                  planeName={items.flightDesignator.planeName}
                  planeNumber={
                    items.flightDesignator.carrierCode +
                    '-' +
                    items.flightDesignator.flightNumber
                  }
                  classCabin={getClass(items.fares.fareGroupCode)}
                  baggage={items.fares.defaultBaggage}
                  onDetail={() => setDetailSheet(true)}
                />
              </View>
            </View>

            <View style={[s.ml15, s.mr10, s.mb15]}>
              <Text size={13} weight="bold">
                Harga Tiket ({' '}
                {`${items.origin.code} - ${items.destination.code}`} )
              </Text>
              <TouchableOpacity
                onPress={() => {
                  showDetail(
                    items.fareList,
                    key,
                    `${items.origin.code} - ${items.destination.code}`,
                  );
                }}
                style={[s.row, styles.priceChoose, s.mt15]}>
                <View style={s.col90}>
                  <Text size={13} weight="bold" align="left" color={'#333333'}>
                    {items.fares.fareCode} ({items.fares.availCount}) {'\nRp '}
                    {getRupiah(
                      items.fares.paxFares[0].totalFare
                        ? items.fares.paxFares[0].totalFare
                        : 0,
                    )}
                  </Text>
                </View>
                <View style={[styles.col10, styles.center]}>
                  <SvgXml
                    width={10}
                    height={10}
                    style={styles.rightText}
                    xml={IconRightList}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.bottom}>
        <View
          style={[
            styles.rowBetween,
            {
              marginBottom: 10,
            },
          ]}>
          <Text size={14} weight="bold">
            Total Pembayaran
          </Text>
          <Text size={16} weight="bold" color="#00A79D">
            Rp  {getRupiah(total)}
          </Text>
        </View>
        <Button
          title={travel === 'pulang' ? 'Pesan Sekarang' : 'Pilih Penerbangan'}
          onPress={() => {
            if (!isLoading) {
              if (travel === 'pergi') {
                navigation.push('FormPemesanan', {
                  travel: travel,
                  from: from,
                  to: to,
                  date: date,
                  dateTo: dateTo,
                  passenger: passenger,
                  classCabin: classCabin,
                  item: item,
                  itemPulang: {},
                  cartItems: [],
                  total: total,
                  totalPulang: 0,
                  pricePergi: pricePergi,
                  pricePulang: [],
                });
              } else {
                navigation.push('PesawatTicketPulang', {
                  travel: travel,
                  from: from,
                  to: to,
                  date: moment(date).format('YYYY-MM-DD'),
                  dateTo:
                    travel === 'pergi'
                      ? ''
                      : moment(dateTo).format('YYYY-MM-DD'),
                  passenger: passenger,
                  classCabin: classCabin,
                  itemPergi: item,
                  totalPergi: total,
                  pricePergi: pricePergi,
                  dataResPulang: dataResPulang,
                  dataResFilterPulang: dataResFilterPulang,
                });
              }
            }
          }}
        />
      </View>

      {/*  */}
      <ActionSheet
        actionRef={detailSheetRef}
        onClose={() => {
          setDetailSheet(false);
        }}
        paddingHorizontal={20}
        title={tujuan}>
        <View style={[styles.padding, {paddingBottom: 20}]}>
          {dataFares.length > 0 ? (
            <View style={styles.sectionFilter}>
              <Text size={16} weight="bold">
                Pilih Harga Tiket
              </Text>
              <Gap height={15} />
              {dataFares.map((item, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    setFaresModal(item);
                  }}
                  style={[s.row, styles.priceChoose, s.pl15, s.pr15, s.mb10]}>
                  <View style={s.col90}>
                    <Text style={[s.fs12, s.fontWSB, s.black]}>
                      {item.fareCode} ({item.availCount})
                    </Text>
                    <Text style={[s.fs12, s.fontWSB, s.black]}>
                      Rp {' '}
                      {getRupiah(
                        item.paxFares[0].totalFare
                          ? item.paxFares[0].totalFare
                          : 0,
                      )}
                    </Text>
                  </View>
                  <View style={[s.col10, s.center]}>
                    <SvgXml
                      width={10}
                      height={10}
                      style={s.rightText}
                      xml={IconRightList}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}
        </View>
      </ActionSheet>
      {/*  */}
    </View>
  );
};

export default DetailKeberangkatan;

const styles = StyleSheet.create({
  priceChoose: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#ffffff',
    borderColor: '#BDBDBD',
    borderWidth: 1,
    margin: 2,
    borderRadius: 5,
    marginRight: 10,
  },
  priceActive: {
    width: 80,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderColor: '#00A79D',
    borderWidth: 1,
    margin: 2,
    borderRadius: 5,
    marginRight: 10,
  },
  price: {
    width: 80,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
    borderColor: '#ddd',
    borderWidth: 1,
    margin: 2,
    borderRadius: 5,
    marginRight: 10,
  },
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  timeline: {
    flexDirection: 'row',
  },
  padding: {
    paddingHorizontal: 20,
  },
  timelineLeft: {
    alignSelf: 'stretch',
  },
  timelineCenter: {
    alignSelf: 'stretch',
    marginHorizontal: 10,
  },
  timelineRight: {
    flex: 1,
  },
  container: {
    padding: 25,
  },
  bottom: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hr: {
    marginVertical: 10,
    height: 1,
    backgroundColor: '#DBDBDB',
  },

  rowFasilitas: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topFasilitas: {
    backgroundColor: '#F9F9F9',
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  circleFasilitas: {
    backgroundColor: '#D8D8D8',
    width: 5,
    height: 5,
    borderRadius: 5 / 2,
    marginHorizontal: 5,
  },
  listFasilitas: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
