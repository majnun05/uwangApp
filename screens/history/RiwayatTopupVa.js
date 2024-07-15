import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
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

const RiwayatTopupVa = (props) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack(null);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const renderLogoBank = (bank) => {
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
      return <SvgXml width={60} height={40} xml={IconBri} />;
    }
  };

  const renderInstruction = (bank) => {
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

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Virtual Account'}
        shadow={true}
        right={false}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={[styles.bgWhite]}>
        <View style={[styles.boxTopupPayBottom]}>
          <View style={[styles.row, styles.pb5]}>
            <View style={[styles.col20, styles.centerOnly]}>
              {renderLogoBank('cimbniaga')}
            </View>
            <View style={[styles.col80, styles.pl10]}>
              <Text style={[styles.fs13, styles.black, styles.fontWSB]}>
                BNI
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

              <View style={styles.row}>
                <Text style={[styles.fs18, styles.green, styles.fontWSB]}>
                  1008996573733333
                </Text>

                <TouchableOpacity
                  style={[styles.row, styles.ml10, styles.leftText, styles.mt5]}
                  activeOpacity={0.9}
                  // onPress={() => this.copy(this.state.va)}
                >
                  <SvgXml width={15} height={15} xml={IconCopy} />
                  <Text
                    style={[
                      styles.fs10,
                      styles.grey75,
                      styles.fontWSB,
                      styles.ml5,
                    ]}>
                    Salin
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={[
                  styles.fs13,
                  styles.greyB7,
                  styles.fontWSR,
                  styles.mt10,
                ]}>
                Minimal Isi Saldo Rp 100.000
              </Text>
              <Text style={[styles.fs13, styles.greyB7, styles.fontWSR]}>
                Biaya Admin{' '}
                <Text style={[styles.fs13, styles.green, styles.fontWSR]}>
                  Rp 1.000
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.boxTopupPayBottomVA}>
          {renderInstruction('cimbniaga')}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RiwayatTopupVa;
