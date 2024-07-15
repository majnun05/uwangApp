//import libraries
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { SvgXml } from 'react-native-svg';
import {
  IcAngsuranKredit,
  IcArrR,
  IcBpjs,
  IcCicilanFinance,
  IcDigipos,
  IcDiskon,
  IcDonasi,
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
  IcRoaming,
  IcSteaming,
  IcTelkom,
  IcTelponSms,
  IcTvInternet,
  IcVoucherData,
  IcVouchergame,
  IcWifiId,
  IcZakat
} from '../../assets';
import { default as Style, default as styles } from '../../assets/styles/Style';
import { getSession } from '../../helpers/Helpers';


// make a component
const Menu = (props) => {
  const navigation = useNavigation();
  const [isiUlang, setIsiUlang] = useState(false);
  const [tagihan, setTagihan] = useState(true);
  const [voucher, setVoucher] = useState(true);
  const [travel, setTravel] = useState(true);
  const [keagenan, setKeagenan] = useState(true);
  const [lainnya, setLainnya] = useState(true);
  const [checkKyc, setCheckKyc] = useState('0');
  let productMenu = props.productMenu ? props.productMenu : {};
  let lockKYC = props.lockKYC ? props.lockKYC : {};
  let checks = props.checkGrosir ? props.checkGrosir : false;
  let isMounted = true;

  const chooseMenu = (cek) => {
    if (cek === 'isiulang') {
      setIsiUlang(!isiUlang);
      setTagihan(true);
      setVoucher(true);
    } else if (cek === 'tagihan') {
      setTagihan(!tagihan);
      setIsiUlang(true);
      setVoucher(true);
    } else if (cek === 'voucher') {
      setVoucher(!voucher);
      setTagihan(true);
      setIsiUlang(true);
    }
  };

  // useEffect(() => {
  //   console.log('data',  productMenu)
  // },[])

  const check = async () => {
    let checkKycSess = await getSession('checkKycSess').then((checkKycSess) => {
      return checkKycSess;
    });
    if (isMounted) {
      setCheckKyc(checkKycSess);
    }
  };

  useEffect(() => {
    check();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 25,
          justifyContent: 'space-between',
          marginHorizontal: 10,
       
        }}>
        <Ripple
          onPress={() => chooseMenu('isiulang')}
          style={
            isiUlang
              ? [Style.boxCategoryMenu, {backgroundColor: '#ffffff'}]
              : [Style.boxCategoryMenu, {backgroundColor: '#4F6CFF'}]
          }>
          <Text style={isiUlang ? {color: '#BDBDBD'} : {color: '#ffffff'}}>
            Isi ulang
          </Text>
        </Ripple>
        <Ripple
          onPress={() => chooseMenu('tagihan')}
          style={
            tagihan
              ? [Style.boxCategoryMenu, {backgroundColor: '#ffffff'}]
              : [Style.boxCategoryMenu, {backgroundColor: '#4F6CFF'}]
          }>
          <Text style={tagihan ? {color: '#BDBDBD'} : {color: '#ffffff'}}>
            Tagihan
          </Text>
        </Ripple>
        <Ripple
          onPress={() => chooseMenu('voucher')}
          style={
            voucher
              ? [Style.boxCategoryMenu, {backgroundColor: '#ffffff'}]
              : [Style.boxCategoryMenu, {backgroundColor: '#4F6CFF'}]
          }>
          <Text style={voucher ? {color: '#BDBDBD'} : {color: '#ffffff'}}>
            Voucher
          </Text>
        </Ripple>
      </View>

      <View>
        {isiUlang ? null : (
          <View style={styles.templateLayout}>
               <View style={{marginLeft:15, marginVertical:10}}>
               <Text style={[styles.fs18, styles.fontMB, styles.black]}>Isi Ulang</Text>
               <Text style={[styles.fs12, styles.fontWSR, {color:'#757575'}]}>Isi Ulang Di Uwang Menjadi Lebih mudah</Text>
             </View>
            {productMenu.pulsa ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('Pulsa')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcPulsa}
                />
                <Text style={[styles.templateMenu]}>Pulsa</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.paketData ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('PaketData')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcPaketData}
                />
                <Text style={[styles.templateMenu]}>Paket Data</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.paketSms ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('PaketSms')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcTelponSms}
                />
                <Text style={[styles.templateMenu]}>Telepon/sms</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.eMoney ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('EMoney')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcTelponSms}
                />
                <Text style={[styles.templateMenu]}>E money</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.digipos ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('Digipos')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcDigipos}
                />
                <Text style={[styles.templateMenu]}>Digipos</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.wifiId ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('Wifiid')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcWifiId}
                />
                <Text style={[styles.templateMenu]}>Wifi ID</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.streaming ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('Streaming')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcSteaming}
                />
                <Text style={[styles.templateMenu]}>Wifi ID</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.roaming ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('Roaming')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcRoaming}
                />
                <Text style={[styles.templateMenu]}>Wifi ID</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}
          </View>
        )}
      </View>
      
      {/* TAGIHAN */}
      <View>
        {tagihan ? null : (
          <View style={styles.templateLayout}>
              <View style={{marginLeft:15, marginVertical:10}}>
               <Text style={[styles.fs18, styles.fontMB, styles.black]}>Bayar Tagihan</Text>
               <Text style={[styles.fs12, styles.fontWSR, {color:'#757575'}]}>Bayar Tagihan Di Uwang Menjadi Lebih mudah</Text>
             </View>
            {productMenu.pln ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('PlnToken')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcPln}
                />
                <Text style={[styles.templateMenu]}>PLN</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.pdam ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('Pdam')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcPdam}
                />
                <Text style={[styles.templateMenu]}>PDAM</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.telkom ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('Telkom')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcTelkom}
                />
                <Text style={[styles.templateMenu]}>Telkom indihome</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.bpjs ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('Bpjs')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcBpjs}
                />
                <Text style={[styles.templateMenu]}>BPJS</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.hpPascabayar ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('HpPasca')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcHpPasca}
                />
                <Text style={[styles.templateMenu]}>HP Pascabayar</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.cicilanFinance ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('Finance')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcCicilanFinance}
                />
                <Text style={[styles.templateMenu]}>Cicilan Finance</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.bayarTvNew ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('BayarTv')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcTvInternet}
                />
                <Text style={[styles.templateMenu]}>Bayar TV</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.tvKabelInternet ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('TvKabelVoucher')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcTvInternet}
                />
                <Text style={[styles.templateMenu]}>TV Kabel & Internet</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.pgn ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('Pgn')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcGasPgn}
                />
                <Text style={[styles.templateMenu]}>Gas PGN</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.pertagas ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('PertagasToken')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcPertagas}
                />
                <Text style={[styles.templateMenu]}>Pertagas</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.eSamsat ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('Samsat')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcESamsat}
                />
                <Text style={[styles.templateMenu]}>E-Samsat</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.pbb ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('Pbb')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcPbb}
                />
                <Text style={[styles.templateMenu]}>PBB</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.angsuranKredit ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('AngsuranKredit')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcAngsuranKredit}
                />
                <Text style={[styles.templateMenu]}>Angsuran Kredit</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.kartuKredit ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('KartuKredit')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcKartuKredit}
                />
                <Text style={[styles.templateMenu]}>Kartu Kredit</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.zakat ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('Zakat')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcZakat}
                />
                <Text style={[styles.templateMenu]}>Zakat</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.donasi ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('Donasi')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcDonasi}
                />
                <Text style={[styles.templateMenu]}>Donasi</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}
          </View>
        )}
      </View>

      <View>
        {voucher ? null : (
          <View style={styles.templateLayout}>
              <View style={{marginLeft:15, marginVertical:10}}>
               <Text style={[styles.fs18, styles.fontMB, styles.black]}>Voucher Game</Text>
               <Text style={[styles.fs12, styles.fontWSR, {color:'#757575'}]}>Topup voucher game Di Uwang Menjadi Lebih mudah</Text>
             </View>
            {productMenu.voucherGame ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('VoucherGame')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcVouchergame}
                />
                <Text style={[styles.templateMenu]}>Voucher Game</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.voucherData ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('VoucherData')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcVoucherData}
                />
                <Text style={[styles.templateMenu]}>Voucher Data</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.voucherTvNew ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('VoucherTv')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcTvInternet}
                />
                <Text style={[styles.templateMenu]}>Voucher TV</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}

            {productMenu.voucherDiskon ? (
              <Ripple
                style={[styles.templateRow]}
                onPress={() => navigation.push('VoucherDiskon')}>
                <SvgXml
                  style={{marginBottom: 8}}
                  width={50}
                  height={50}
                  xml={IcDiskon}
                />
                <Text style={[styles.templateMenu]}>Voucher Diskon</Text>
                <SvgXml width={25} height={25} xml={IcArrR} />
              </Ripple>
            ) : null}
          </View>
        )}
      </View>

     
    </SafeAreaView>
  );
};

// make the component available to other parts of the app
export default Menu;
