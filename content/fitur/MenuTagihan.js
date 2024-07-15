//import libraries
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from '../../assets/styles/Style';
import Ripple from 'react-native-material-ripple';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {
  IcAngsuranKredit,
  IcBpjs,
  IcCicilanFinance,
  IcDigipos,
  IcDonasi,
  IcEmoney,
  IcESamsat,
  IcGasPgn,
  IcHpPasca,
  IcKartuKredit,
  IcPaketData,
  IcPbb,
  IcPdam,
  IcPertagas,
  IcPln,
  IcPulsa,
  IcSteaming,
  IcTelkom,
  IcTelponSms,
  IcTfSaldo,
  IcTvInternet,
  IcVoucherData,
  IcVouchergame,
  IcWifiId,
  IcZakat,
} from '../../assets';
import {getSession} from '../../helpers/Helpers';

// make a component
const MenuTagihan = (props) => {
  const navigation = useNavigation();
  const [checkKyc, setCheckKyc] = useState('0');
  let productMenu = props.productMenu ? props.productMenu : {};
  let lockKYC = props.lockKYC ? props.lockKYC : {};
  let checks = props.checkGrosir ? props.checkGrosir : false;

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
      {productMenu.pln ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('PlnToken')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcPln} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            PLN
          </Text>
        </View>
      ) : null}

      {productMenu.pdam ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('Pdam')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcPdam} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            PDAM
          </Text>
        </View>
      ) : null}

      {productMenu.telkom ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('Telkom')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcTelkom} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Telkom
          </Text>
        </View>
      ) : null}

      {productMenu.bpjs ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('Bpjs')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcBpjs} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Bpjs
          </Text>
        </View>
      ) : null}

      {productMenu.hpPascabayar ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('HpPasca')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcHpPasca} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Hp{'\n'}pascabayar
          </Text>
        </View>
      ) : null}

      {productMenu.cicilanFinance ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('Finance')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcCicilanFinance} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Cicilan Finance
          </Text>
        </View>
      ) : null}

      {productMenu.bayarTvNew ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('BayarTv')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcTvInternet} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Bayara Tv
          </Text>
        </View>
      ) : null}

      {productMenu.tvKabelInternet ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('TvKabelVoucher')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcTvInternet} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            TV Kabel & Internet
          </Text>
        </View>
      ) : null}

      {productMenu.pgn ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('Pgn')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcGasPgn} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Gas Pgn
          </Text>
        </View>
      ) : null}

      {productMenu.pertagas ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('PertagasToken')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcPertagas} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Pertagas
          </Text>
        </View>
      ) : null}

      {productMenu.eSamsat ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('Maintenance')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcESamsat} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            E-Samsat
          </Text>
          <View style={[styles.boxSoonMenu]}>
            <Text style={[styles.soon]}>Soon</Text>
          </View>
        </View>
      ) : null}

      {productMenu.pbb ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('Maintenance')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcPbb} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            PBB
          </Text>
          <View style={[styles.boxSoonMenu]}>
            <Text style={[styles.soon]}>Soon</Text>
          </View>
        </View>
      ) : null}

      {productMenu.angsuranKredit ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('AngsuranKredit')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcAngsuranKredit} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Angsuran Kredit
          </Text>
        </View>
      ) : null}

      {productMenu.kartuKredit ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('KartuKredit')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcKartuKredit} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Kartu Kredit
          </Text>
        </View>
      ) : null}

      {productMenu.zakat ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('Zakat')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcZakat} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Zakat
          </Text>
        </View>
      ) : null}

      {productMenu.donasi ? (
        <View style={[styles.center, styles.boxMenuOutNew]}>
          <Ripple onPress={() => navigation.push('KartuKredit')}>
            <View style={[styles.boxMenuNew, styles.center]}>
              <SvgXml width={50} height={50} xml={IcDonasi} />
            </View>
          </Ripple>
          <Text
            style={[styles.menuTheme]}
            numberOfLines={2}
            ellipsizeMode="tail">
            Donasi
          </Text>
        </View>
      ) : null}

      {/* <View style={[styles.center, styles.boxMenuOutNew]}>
        <Ripple onPress={() => navigation.push('TransferSaldo')}>
          <View style={[styles.boxMenuNew, styles.center]}>
            <SvgXml width={50} height={50} xml={IcTfSaldo} />
          </View>
        </Ripple>
        <Text style={[styles.menuTheme]} numberOfLines={2} ellipsizeMode="tail">
          Transfer Saldo
        </Text>
      </View> */}
{/* 
      {productMenu.tarikDana ? (
              <View style={[styles.templateRow]}>
                <Ripple
                  onPress={() => {
                    if (checkKyc === '2') {
                      navigation.push('TarikDana');
                    } else {
                      if (lockKYC.tarikDana) {
                        navigation.push('MaintenanceKyc');
                      } else {
                        navigation.push('TarikDana');
                      }
                    }
                  }}>
                  <View style={[styles.center]}>
                    <SvgXml width={50} height={50} xml={IconTarikDana} />
                    <Text style={[styles.templateMenu, styles.mt5]}>
                      Tarik Dana
                    </Text>
                    {checkKyc !== '2' ? (
                      <>
                        {lockKYC.tarikDana ? (
                          <View
                            style={[
                              styles.boxSoonMenu,
                              styles.pt5,
                              styles.pb5,
                              styles.pl5,
                              styles.pr5,
                              {top: '15%', right: '10%'},
                            ]}>
                            <SvgXml width="15" height="15" xml={IconGembok} />
                          </View>
                        ) : null}
                      </>
                    ) : null}
                  </View>
                </Ripple>
              </View>
            ) : null} */}

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
export default MenuTagihan;
