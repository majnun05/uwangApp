import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  RefreshControl,
  Image,
  Text,
  InteractionManager,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {
  apiTargetTransaksi,
  apiTargetTransaksiRiwayat,
} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSession, getSnackBar_error} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import IconEmpty from '../../assets/svg/empty.svg';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const TargetTransaksi = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [dataRes, setDataRes] = useState([]);
  const [dataTop, setDataTop] = useState({});
  const [imgTarget, setImgTarget] = useState('');
  const [imageDefault, setImageDefault] = useState('');
  let isMounted = true;

  const isLogged = async () => {
    let targetTransaksi = await getSession('targetTransaksi').then(
      (targetTransaksi) => {
        return targetTransaksi;
      },
    );
    let imgDef = await getSession('imageDefault').then((imageDefault) => {
      return imageDefault;
    });

    if (isMounted) {
      setImageDefault(imgDef);
      setImgTarget(targetTransaksi);
    }
    await useApiPost(apiTargetTransaksi(), {})
      .then((res) => {
        if (isMounted) {
          if (res.statusCode === 200) {
            let val = res.values;
            setDataTop(val.data);
            getRiwayat();
          } else {
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

  const getRiwayat = async (op) => {
    await useApiPost(apiTargetTransaksiRiwayat(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values.data;
            setDataRes(val.data);
          } else {
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

  const bulan = (bln) => {
    if (bln === '01') {
      return 'Januari';
    } else if (bln === '02') {
      return 'Februari';
    } else if (bln === '03') {
      return 'Maret';
    } else if (bln === '04') {
      return 'April';
    } else if (bln === '05') {
      return 'Mei';
    } else if (bln === '06') {
      return 'Juni';
    } else if (bln === '07') {
      return 'Juli';
    } else if (bln === '08') {
      return 'Agustus';
    } else if (bln === '09') {
      return 'September';
    } else if (bln === '10') {
      return 'Oktober';
    } else if (bln === '11') {
      return 'November';
    } else {
      return 'Desember';
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

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Target Transaksi Agen'}
        shadow={true}
        right={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.bgWhite]}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }>
        <View style={[styles.mb5, styles.ml10, styles.mr10, styles.mt10]}>
          <Image
            resizeMethod="resize"
            resizeMode="stretch"
            source={{
              uri: imgTarget ? imgTarget : imageDefault,
            }}
            style={[styles.imageBig, {borderRadius: 5}]}
          />
          {dataTop.success ? (
            <View
              style={{
                position: 'absolute',
                bottom: 10,
                left: 0,
                right: 0,
                width: '100%',
              }}>
              <Text
                style={[
                  styles.black,
                  styles.fs15,
                  styles.fontWSB,
                  styles.textCenter,
                ]}>
                Target {moment(new Date()).format('MMMM YYYY')}
              </Text>
              <Text
                style={[
                  styles.green,
                  styles.fs15,
                  styles.fontWSR,
                  styles.textCenter,
                ]}>
                Tercapai
              </Text>
            </View>
          ) : (
            <View
              style={{
                position: 'absolute',
                bottom: 10,
                left: 0,
                right: 0,
                width: '100%',
              }}>
              <Text
                style={[
                  styles.black,
                  styles.fs15,
                  styles.fontWSB,
                  styles.textCenter,
                ]}>
                Target {moment(new Date()).format('MMMM YYYY')}
              </Text>
              <Text
                style={[
                  styles.green,
                  styles.fs15,
                  styles.fontWSR,
                  styles.textCenter,
                ]}>
                {dataTop.transaction}x Transaksi dari {dataTop.target}x Target
              </Text>
            </View>
          )}
        </View>

        {dataRes.length > 0 ? (
          <View style={[styles.pl15, styles.pr15, styles.mt10]}>
            <Text
              style={[styles.black, styles.fs15, styles.fontWSR, styles.mb10]}>
              Riwayat Target
            </Text>

            {dataRes.map((item, key) => (
              <View style={[styles.row, styles.boxListTarget]} key={key}>
                <View style={[styles.col70, styles.p5]}>
                  <Text style={[styles.fs15, styles.fontWSB, styles.black]}>
                    {bulan(item.created_month)} {item.created_year}
                  </Text>
                  <Text style={[styles.fs12, styles.greyB7]} note>
                    {item.transaction}x Transaksi dari {item.target}x Target
                  </Text>
                </View>
                <View style={[styles.col30]}>
                  {item.status === '1' ? (
                    <View style={styles.boxGangguanOK}>
                      <Text style={[styles.fs9, styles.white, styles.fontWSB]}>
                        Tercapai
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.boxGangguanGagal}>
                      <Text style={[styles.fs9, styles.white, styles.fontWSB]}>
                        Gagal
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.boxEmpty}>
            <SvgXml width={120} height={120} xml={IconEmpty} />
            {!isLoading ? (
              <Text style={styles.textEmpty}>Tidak Ada Data</Text>
            ) : null}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TargetTransaksi;
