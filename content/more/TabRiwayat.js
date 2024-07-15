//import libraries
import React, {useEffect, useRef} from 'react';
import {View, ScrollView, Text} from 'react-native';
import styles from '../../assets/styles/Style';
import Ripple from 'react-native-material-ripple';

// make a component
const TabRiwayat = (props) => {
  const scrollView = useRef(null);
  let checkGrosir = props.checkGrosir;

  const onSomeEvent = () => {
    scrollView.current.scrollTo({x: 20000, animated: true}); // will scroll to the top at y-position 0
  };

  const onSomeEventLeft = () => {
    scrollView.current.scrollTo({y: 20000, animated: true}); // will scroll to the top at y-position 0
  };

  useEffect(() => {
    if (
      props.menu === 'riwayatreward' ||
      props.menu === 'riwayatpelni' ||
      props.menu === 'riwayatpesawat' ||
      props.menu === 'riwayatkereta'
    ) {
      onSomeEvent();
      setTimeout(async () => {
        if (props.menu === 'riwayatpesawat') {
          scrollView.current.scrollTo({x: 510, y: 220, animated: true});
        } else {
          scrollView.current.scrollTo({x: 20000, animated: true});
        }
      }, 500);
    } else {
      onSomeEventLeft();
      setTimeout(async () => {
        if (props.menu === 'isisaldo') {
          scrollView.current.scrollTo({y: 120, x: 120, animated: true});
        } else if (props.menu === 'transfersaldo') {
          scrollView.current.scrollTo({y: 120, x: 250, animated: true});
        } else if (props.menu === 'riwayatgrosir') {
          scrollView.current.scrollTo({y: 120, x: 380, animated: true});
        } else {
          scrollView.current.scrollTo({y: 20000, animated: true});
        }
      }, 500);
    }
  }, []);

  return (
    <View
      style={[
        styles.row,
        styles.bxListHomeNormalProduct,
        styles.borderBottomBold,
        styles.pb5,
        styles.pt10,
      ]}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        ref={scrollView}>
        <Ripple
          onPress={() =>
            props.navigation.navigate('RiwayatAllTrx', {
              reseller_id: '',
            })
          }
          style={
            props.menu === 'alltrasaction'
              ? [styles.rowRiwayatActive]
              : [styles.rowRiwayat]
          }>
          <Text
            style={[
              styles.fs12,
              props.menu === 'alltrasaction' ? styles.white : styles.black,
              styles.fontWSM,
            ]}>
            Semua Transaksi
          </Text>
        </Ripple>

        <Ripple
          style={
            props.menu === 'isiulang'
              ? [styles.rowRiwayatActive]
              : [styles.rowRiwayat]
          }
          onPress={() => props.navigation.navigate('Riwayat')}>
          <Text
            style={[
              styles.fs12,
              props.menu === 'isiulang' ? styles.white : styles.black,
              styles.fontWSM,
            ]}>
            Isi Ulang
          </Text>
        </Ripple>

        <Ripple
          onPress={() =>
            props.navigation.navigate('RiwayatBayarTagihan', {
              reseller_id: '',
            })
          }
          style={
            props.menu === 'bayartagihan'
              ? [styles.rowRiwayatActive]
              : [styles.rowRiwayat]
          }>
          <Text
            style={[
              styles.fs12,
              props.menu === 'bayartagihan' ? styles.white : styles.black,
              styles.fontWSM,
            ]}>
            Bayar Tagihan
          </Text>
        </Ripple>

        {/* <Ripple
          onPress={() =>
            props.navigation.navigate('RiwayatMutasi', {
              reseller_id: '',
            })
          }
          style={
            props.menu === 'mutasisaldo'
              ? [styles.rowRiwayatActive]
              : [styles.rowRiwayat]
          }>
          <Text
            style={[
              styles.fs12,
              props.menu === 'mutasisaldo' ? styles.white : styles.black,
              styles.fontWSM,
            ]}>
            Mutasi Saldo
          </Text>
        </Ripple> */}

        <Ripple
          onPress={() =>
            props.navigation.navigate('RiwayatTopup', {
              reseller_id: '',
            })
          }
          style={
            props.menu === 'isisaldo'
              ? [styles.rowRiwayatActive]
              : [styles.rowRiwayat]
          }>
          <Text
            style={[
              styles.fs12,
              props.menu === 'isisaldo' ? styles.white : styles.black,
              styles.fontWSM,
            ]}>
            Isi Saldo
          </Text>
        </Ripple>

        <Ripple
          onPress={() =>
            props.navigation.navigate('RiwayatTransfer', {
              reseller_id: '',
            })
          }
          style={
            props.menu === 'transfersaldo'
              ? [styles.rowRiwayatActive]
              : [styles.rowRiwayat]
          }>
          <Text
            style={[
              styles.fs12,
              props.menu === 'transfersaldo' ? styles.white : styles.black,
              styles.fontWSM,
            ]}>
            Transfer Saldo
          </Text>
        </Ripple>

        {/* <Ripple
          onPress={() => {
            props.navigation.navigate('RiwayatReward', {
              reseller_id: '',
            });
          }}
          style={
            props.menu === 'riwayatreward'
              ? [styles.rowRiwayatActive]
              : [styles.rowRiwayat]
          }>
          <Text
            style={[
              styles.fs12,
              props.menu === 'riwayatreward' ? styles.white : styles.black,
              styles.fontWSM,
            ]}>
            Tukar Poin
          </Text>
        </Ripple> */}
      </ScrollView>
    </View>
  );
};

// make the component available to other parts of the app
export default TabRiwayat;
