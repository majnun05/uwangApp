//import libraries
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from '../../assets/styles/Style';
import Ripple from 'react-native-material-ripple';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import IconGembok from '../../assets/svg/gembok.svg';
import {
  IcBpjs,
  IcDigipos,
  IcEmoney,
  IcPaketData,
  IcPbb,
  IcPdam,
  IcPln,
  IcPulsa,
  IcRoaming,
  IcSteaming,
  IcTelponSms,
  IcVoucherData,
  IcVouchergame,
  IcWifiId,
} from '../../assets';
import {getSession} from '../../helpers/Helpers';

// make a component
const MenuHighlight = (props) => {
  const navigation = useNavigation();
  const [checkKyc, setCheckKyc] = useState('0');
  let productMenu = props.productMenu ? props.productMenu : {};
  let lockKYC = props.lockKYC ? props.lockKYC : {};
  let checks = props.checkGrosir ? props.checkGrosir : false;
  let isMounted = true;

  const check = async () => {
    let checkKycSess = await getSession('checkKycSess').then((checkKycSess) => {
      return checkKycSess;
    });
    if (isMounted) {
      setCheckKyc(checkKycSess);
    }
  };

  return (
    <>
      {productMenu.pulsa ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('Pulsa')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcPulsa} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Pulsa
          </Text>
        </View>
      ) : null}

      {productMenu.paketData ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('PaketData')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcPaketData} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Paket Data
          </Text>
        </View>
      ) : null}

      {/* {productMenu.eMoney ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple
            onPress={() => {
              if (checkKyc === '2') {
                navigation.push('EMoney');
              } else {
                if (lockKYC.eMoney) {
                  navigation.push('MaintenanceKyc');
                } else {
                  navigation.push('EMoney');
                }
              }
            }}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcEmoney} />
            </View>
            {checkKyc !== '2' ? (
              <>
                {lockKYC.eMoney ? (
                  <View
                    style={[
                      styles.boxSoonMenu,
                      styles.pt5,
                      styles.pb5,
                      styles.pl5,
                      styles.pr5,
                      {left:0},
                    ]}>
                    <SvgXml width="15" height="15" xml={IconGembok} />
                  </View>
                ) : null}
              </>
            ) : null}
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            E-Money
          </Text>
        </View>
      ) : null} */}

      {productMenu.digipos ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('Digipos')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcDigipos} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Digipos
          </Text>
        </View>
      ) : null}

      {productMenu.paketSms ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('PaketSms')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcTelponSms} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Paket SMS{'\n'}& Telepon
          </Text>
        </View>
      ) : null}

      {productMenu.wifiId ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('Wifiid')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcWifiId} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Wifi ID
          </Text>
        </View>
      ) : null}

      {productMenu.streaming ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('Streaming')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcSteaming} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Streaming
          </Text>
        </View>
      ) : null}

      {productMenu.roaming ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('Roaming')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcRoaming} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Roaming
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
export default MenuHighlight;
