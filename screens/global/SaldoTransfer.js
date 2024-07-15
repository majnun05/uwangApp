import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Image,
  InteractionManager,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {IcArrR, IcBank, Ictransfer, ImgEmptyTrx} from '../../assets';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import {
  apiHistoryTransferSaldo,
  apiUtilityReference,
} from '../../helpers/endPoint';
import {getSnackBar_error} from '../../helpers/Helpers';
import HistoryTrx from '../../content/HistoryTrx/HistoryTrx';
import {useApiPost} from '../../helpers/useFetch';

const SaldoTransfer = (props) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [dataTrf, setDataTrf] = useState([]);
  const [typeTrf, setTypeTrf] = useState('');
  let isMounted = true;

  const isLogged = async () => {
    getHistoryTrf();
    await useApiPost(apiUtilityReference(), {})
      .then(async (res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values.values;
            setData(val);
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

  const getHistoryTrf = async () => {
    setIsLoading(true);
    await useApiPost(apiHistoryTransferSaldo(), {})
      .then(async (res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setDataTrf(val.data);
          } else {
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

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
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

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Transfer Saldo'}
        shadow={true}
        right={false}
      />
      <View style={{backgroundColor: 'white', margin: 15}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.push('TransferSaldo')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 0.5,
            borderRadius: 7,
            borderColor: '#BDBDBD',
            paddingHorizontal: 10,
            paddingVertical: 15,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SvgXml xml={Ictransfer} width={20} height={20} />
            <Text style={[{marginLeft: 10, fontSize: 14}, styles.fontWSR]}>
              Ke Sesama Uwang
            </Text>
          </View>
          <View>
            <SvgXml xml={IcArrR} width={20} height={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.push('TarikDana')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 0.5,
            borderRadius: 7,
            borderColor: '#BDBDBD',
            paddingHorizontal: 10,
            paddingVertical: 15,
            marginTop: 15,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SvgXml xml={IcBank} width={20} height={20} />
            <Text style={[{marginLeft: 10, fontSize: 14}, styles.fontWSR]}>
              Ke Rekening Bank
            </Text>
          </View>
          <View>
            <SvgXml xml={IcArrR} width={20} height={20} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{backgroundColor: 'white', margin: 15}}>
        <Text style={[styles.fontWSB, styles.fs16, styles.black, styles.mb5]}>
          Transaksi Terakhir
        </Text>
        {isLoading ? null : (
          <>
            {dataTrf.length > 0 ? (
              <View style={{marginBottom: 40}}>
                <HistoryTrx
                  data={dataTrf === undefined ? [] : dataTrf}
                  load={isLoading}
                />
              </View>
            ) : (
              <View
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 50,
                }}>
                <Image
                  source={ImgEmptyTrx}
                  resizeMode="stretch"
                  style={{width: 250, height: 200, alignSelf: 'center', marginBottom:10}}
                />
                <Text
                  style={[
                    styles.fontWSR,
                    styles.fs14,
                    styles.black,
                    styles.mb5,
                  ]}>
                  Belum ada transaksi hari ini
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SaldoTransfer;
