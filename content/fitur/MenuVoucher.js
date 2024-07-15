//import libraries
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from '../../assets/styles/Style';
import Ripple from 'react-native-material-ripple';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {
  IcBpjs,
  IcDigipos,
  IcDiskon,
  IcEmoney,
  IcPaketData,
  IcPbb,
  IcPdam,
  IcPln,
  IcPulsa,
  IcSteaming,
  IcTelponSms,
  IcTvInternet,
  IcVoucherData,
  IcVouchergame,
  IcWifiId,
} from '../../assets';

// make a component
const MenuVoucher = (props) => {
  const navigation = useNavigation();
  const [checkKyc, setCheckKyc] = useState('0');
  let productMenu = props.productMenu ? props.productMenu : {};
  let lockKYC = props.lockKYC ? props.lockKYC : {};
  let checks = props.checkGrosir ? props.checkGrosir : false;
  return (
    <>
      {productMenu.voucherGame ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('VoucherGame')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcVouchergame} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Voucher Game
          </Text>
        </View>
      ) : null}

      {productMenu.voucherData ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('VoucherData')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcVoucherData} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Voucher Data
          </Text>
        </View>
      ) : null}

      {productMenu.voucherTvNew ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('VoucherTv')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcTvInternet} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Voucher Tv
          </Text>
        </View>
      ) : null}

      {productMenu.voucherDiskon ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('VoucherDiskon')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcDiskon} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Voucher Diskon
          </Text>
        </View>
      ) : null}

      {/* {!checks ? ( */}
      {/* <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('Bpjs')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcPbb} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Data Tambah
          </Text>
        </View> */}
      {/* ) : null} */}
    </>
  );
};

// make the component available to other parts of the app
export default MenuVoucher;
