import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  TouchableNativeFeedback,
  Text,
  RefreshControl,
  InteractionManager,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useApiPost, useError} from '../../helpers/useFetch';
import {apiTransactionGetListVa} from '../../helpers/endPoint';
import {getSession} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import IconBca from '../../assets/svg/bank/bca.svg';
import IconBni from '../../assets/svg/bank/bni.svg';
import IconBri from '../../assets/svg/bank/bri.svg';
import IconMandiri from '../../assets/svg/bank/mandiri.svg';
import IconCimbNiaga from '../../assets/svg/bank/cimbniaga.svg';
import IconDanamon from '../../assets/svg/bank/danamon.svg';
import IconPermata from '../../assets/svg/bank/permata.svg';
import IconRightArrow from '../../assets/svg/right-arrow.svg';
import IconWarning from '../../assets/svg/warning.svg';
import IconIntersect from '../../assets/svg/intersect2.svg';
import moment from 'moment';
import 'moment/locale/id';
import { IcArrR } from '../../assets';
moment.locale('id');

const TopupVa = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [dataCatatan, setDataCatatan] = useState(params.catatan);
  const [dataVa, setDataVa] = useState([]);
  let isMounted = true;

  const isLogged = async () => {
    await useApiPost(apiTransactionGetListVa(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let va = res.values.values;
            let vaPush = [];
            for (let i = 0; i < va.length; i++) {
              if (va[i].code !== 'HNBN' && va[i].code !== 'IBBK') {
                // BANK KEB Hana
                arr = {
                  va_number: va[i].va_number,
                  code: va[i].code,
                  bank: va[i].bank,
                };
                vaPush.push(arr);
              }
            }

            setDataVa(vaPush);
          } else {
            setDataVa([]);
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const _onRefresh = () => {
    setIsLoading(false);
    isLogged();
  };

  const renderFacility = (bank) => {
    let code;
    if (bank === 'BNIA') {
      //Bank PT. BANK CIMB NIAGA, TBK.
      code = 'ATM, Mobile Banking, Internet Banking';
    } else if (bank === 'IBBK') {
      //Bank International Indonesia M
      code = 'ATM, SMS Banking, Internet Banking';
    } else if (bank === 'BRIN') {
      //Bank Rakyat Indonesia
      code = 'ATM, Mobile Banking, Internet Banking';
    } else if (bank === 'BDIN') {
      //Bank PT. BANK DANAMON INDONESI
      code = 'ATM, Mobile Banking';
    } else if (bank === 'BBBA') {
      //Bank Permata
      code = 'ATM, Mobile Banking, Internet Banking';
    } else if (bank === 'BMRI') {
      //Bank Mandiri
      code = 'ATM, Mobile Banking, Internet Banking';
    } else if (bank === 'BNIN') {
      //Bank Negara Indonesia 46
      code = 'ATM, SMS Banking, Mobile Banking, Internet Banking';
    } else if (bank === 'HNBN') {
      //Bank KEB Hana Indonesia
      code = 'ATM, Internet Banking';
    } else {
      //Bank Central Asia
      code = 'ATM, Mobile Banking, Internet Banking';
    }
    return code;
  };

  const renderLogoBank = (code) => {
    if (code === 'BNIN') {
      return <SvgXml width={60} height={40} xml={IconBni} />;
    } else if (code === 'BMRI') {
      return <SvgXml width={60} height={40} xml={IconMandiri} />;
    } else if (code === 'BRIN') {
      return <SvgXml width={60} height={40} xml={IconBri} />;
    } else if (code === 'BNIA') {
      return <SvgXml width={60} height={40} xml={IconCimbNiaga} />;
    } else if (code === 'BDIN') {
      return <SvgXml width={60} height={40} xml={IconDanamon} />;
    } else if (code === 'BBBA') {
      return <SvgXml width={60} height={40} xml={IconPermata} />;
    } else {
      return <SvgXml width={60} height={40} xml={IconBca} />;
    }
  };

  const renderCode = (bank) => {
    let code;
    if (bank === 'BNIA') {
      //Bank PT. BANK CIMB NIAGA, TBK.
      code = 'cimbniaga';
    } else if (bank === 'IBBK') {
      //Bank International Indonesia M
      code = 'bii';
    } else if (bank === 'BRIN') {
      //Bank Rakyat Indonesia
      code = 'bri';
    } else if (bank === 'BDIN') {
      //Bank PT. BANK DANAMON INDONESIA
      code = 'danamon';
    } else if (bank === 'BBBA') {
      //Bank Permata
      code = 'permata';
    } else if (bank === 'BMRI') {
      //Bank Mandiri
      code = 'mandiri';
    } else if (bank === 'BNIN') {
      //Bank Negara Indonesia 46
      code = 'bni';
    } else if (bank === 'HNBN') {
      //Bank KEB Hana Indonesia
      code = 'keb';
    } else {
      //Bank Central Asia
      code = 'bca';
    }
    return code;
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
        title={'Virtual Account'}
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
        <View style={[styles.keteranganBaru, styles.mt10]}>
          <View style={styles.row}>
            <View style={[styles.col15, styles.center]}>
              <SvgXml width={40} height={40} xml={IconWarning} />
            </View>
            <View style={[styles.col85, styles.pl10]}>
              <Text style={[styles.fs12, styles.fontWSB, styles.black]}>
                Catatan
              </Text>
              {dataCatatan.admin_fee2 ? (
                <Text style={[styles.fs12, styles.fontWSR, styles.black]}>
                  {dataCatatan.admin_fee2}
                </Text>
              ) : null}
            </View>
          </View>
        </View>

        <View style={[styles.boxVaChoose]}>
          {dataVa.map((item, key) => (
            <TouchableNativeFeedback
              key={key}
              background={TouchableNativeFeedback.Ripple('#DDD')}
              onPress={() => {
                navigation.push('TopupVaDone', {
                  va_description: dataCatatan.va_description,
                  bank: renderCode(item.code),
                  nameBank: item.bank,
                  va: item.va_number,
                });
              }}>
              <View style={[styles.boxTopupVa, styles.row]}>
                <View style={[styles.col15, styles.centerOnly]}>
                  {renderLogoBank(item.code)}
                </View>
                <View style={[styles.col75, styles.pl15, styles.centerContent]}>
                  <Text style={[styles.fs13, styles.black, styles.fontWSB]}>
                    {item.bank}
                  </Text>
                  <Text style={[styles.fs11, styles.grey92, styles.fontWSR]}>
                    {renderFacility(item.code)}
                  </Text>
                </View>
                <View style={[styles.col10, styles.center]}>
                  <SvgXml width={20} height={20} xml={IcArrR} />
                </View>
              </View>
            </TouchableNativeFeedback>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopupVa;
