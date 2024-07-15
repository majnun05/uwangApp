import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
  RefreshControl,
  InteractionManager,
} from 'react-native';
// import Clipboard from '@react-native-community/clipboard';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useApiPost, useError} from '../../helpers/useFetch';
import {apiUtilityConfig} from '../../helpers/endPoint';
import {
  getSnackBar_error,
  getRupiah,
  getSnackBar_success,
} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import IconCopy from '../../assets/svg/copypaste.svg';
import IconBca from '../../assets/svg/bank/bca.svg';
import IconBni from '../../assets/svg/bank/bni.svg';
import IconBri from '../../assets/svg/bank/bri.svg';
import IconMandiri from '../../assets/svg/bank/mandiri.svg';
import IconCimbNiaga from '../../assets/svg/bank/cimbniaga.svg';
import IconDanamon from '../../assets/svg/bank/danamon.svg';
import IconPermata from '../../assets/svg/bank/permata.svg';
import Bca from '../../content/va_instruction/bca';
import Bni from '../../content/va_instruction/bni';
import Bri from '../../content/va_instruction/bri';
import Cimbniaga from '../../content/va_instruction/cimbniaga';
import Danamon from '../../content/va_instruction/danamon';
import Mandiri from '../../content/va_instruction/mandiri';
import Permata from '../../content/va_instruction/permata';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const TopupVaDone = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [bank, setBank] = useState(params.bank);
  const [nameBank, setNameBank] = useState(params.nameBank);
  const [va, setVa] = useState(params.va);
  const [vaDescription, setVaDescription] = useState(params.va_description);
  const [ref, setRef] = useState({});
  let isMounted = true;

  const isLogged = async () => {
    await useApiPost(apiUtilityConfig(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setRef(val.values);
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

  const copy = (rek) => {
    getSnackBar_success({
      title: 'Nomor Virtual Account telah disalin',
      duration: 'LENGTH_INDEFINITE',
    });
    // Clipboard.setString(rek);
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
  };

  const renderLogoBank = () => {
    if (bank === 'bca') {
      return <SvgXml width={60} height={40} xml={IconBca} />;
    } else if (bank === 'bni') {
      return <SvgXml width={60} height={40} xml={IconBni} />;
    } else if (bank === 'mandiri') {
      return <SvgXml width={60} height={40} xml={IconMandiri} />;
    } else if (bank === 'bri') {
      return <SvgXml width={60} height={40} xml={IconBri} />;
    } else if (bank === 'cimbniaga') {
      return <SvgXml width={60} height={40} xml={IconCimbNiaga} />;
    } else if (bank === 'danamon') {
      return <SvgXml width={60} height={40} xml={IconDanamon} />;
    } else if (bank === 'permata') {
      return <SvgXml width={60} height={40} xml={IconPermata} />;
    } else {
      return <SvgXml width={60} height={40} xml={IconBca} />;
    }
  };

  const renderInstruction = () => {
    if (bank === 'bca') {
      return <Bca />;
    } else if (bank === 'bni') {
      return <Bni />;
    } else if (bank === 'mandiri') {
      return <Mandiri />;
    } else if (bank === 'bri') {
      return <Bri />;
    } else if (bank === 'cimbniaga') {
      return <Cimbniaga />;
    } else if (bank === 'danamon') {
      return <Danamon />;
    } else {
      return <Permata />;
    }
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home');
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
        onBack={() => navigation.navigate('Home')}
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
        <View style={[styles.boxTopupPayBottom]}>
          <View style={[styles.row, styles.pb5]}>
            <View style={[styles.col20, styles.centerOnly]}>
              {renderLogoBank()}
            </View>
            <View style={[styles.col80, styles.pl10]}>
              <Text style={[styles.fs13, styles.black, styles.fontWSB]}>
                {nameBank}
              </Text>
              <Text
                style={[
                  styles.fs11,
                  styles.grey92,
                  styles.fontWSR,
                  styles.mt5,
                ]}>
                Nomor Virtual Account
              </Text>

              <TouchableOpacity
                style={styles.row}
                onPress={() => copy(va)}
                activeOpacity={0.7}>
                <Text style={[styles.fs18, styles.green, styles.fontWSB]}>
                  {va}
                </Text>

                <View
                  style={[
                    styles.row,
                    styles.ml10,
                    styles.leftText,
                    styles.mt5,
                  ]}>
                  <SvgXml width={15} height={15} xml={IconCopy} />
                  <Text
                    style={[
                      styles.fs12,
                      styles.black,
                      styles.fontWSB,
                      styles.ml5,
                    ]}>
                    Salin
                  </Text>
                </View>
              </TouchableOpacity>
              <Text
                style={[
                  styles.fs11,
                  styles.grey92,
                  styles.fontWSR,
                  styles.mt10,
                ]}>
                {vaDescription}
              </Text>
              <Text style={[styles.fs11, styles.grey92, styles.fontWSR]}>
                Biaya Admin{' '}
                <Text style={[styles.fs11, styles.green, styles.fontWSR]}>
                  Rp {getRupiah(ref.admin_fee_va ? ref.admin_fee_va : 0)}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.boxTopupPayBottomVA}>{renderInstruction()}</View>
      </ScrollView>

      <View style={[styles.pl15, styles.pr15]}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#DDD')}
          onPress={() => navigation.navigate('Home')}>
          <View style={[styles.btnBuyNow, styles.mb10, {borderRadius: 5}]}>
            <Text
              style={[styles.bold, styles.fs13, styles.white, styles.fontWSB]}
              uppercase={false}>
              Selesai
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </SafeAreaView>
  );
};

export default TopupVaDone;
