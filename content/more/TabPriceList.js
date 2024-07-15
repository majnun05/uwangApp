//import libraries
import React, {useEffect, useRef} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import styles from '../../assets/styles/Style';

// make a component
const TabPriceList = (props) => {
  const scrollView = useRef(null);

  const onSomeEvent = () => {
    scrollView.current.scrollTo({x: 20000, animated: true}); // will scroll to the top at y-position 0
  };

  const onSomeEventLeft = () => {
    scrollView.current.scrollTo({y: 20000, animated: true}); // will scroll to the top at y-position 0
  };

  useEffect(() => {
    if (
      props.menu === 'Pulsa' ||
      props.menu === 'Paket Data' ||
      props.menu === 'Telepon & SMS' ||
      props.menu === 'Voucher Data' ||
      props.menu === 'Game'
    ) {
      onSomeEventLeft();
    } else {
      onSomeEvent();
    }
  }, []);

  return (
    <View style={[styles.row, styles.bxListPrice]}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        ref={scrollView}>
        <TouchableOpacity
          style={
            props.menu === 'Pulsa'
              ? [styles.rowListPriceActive]
              : [styles.rowListPrice]
          }
          activeOpacity={0.7}
          onPress={() => props.navigation.navigate('PriceListPulsa')}>
          <View style={[styles.bxPricesHeight]}>
            <Text
              style={
                props.menu === 'Pulsa'
                  ? styles.textPriceListProductActive
                  : styles.textPriceListProduct
              }>
              Pulsa
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            props.menu === 'Paket Data'
              ? [styles.rowListPriceActive]
              : [styles.rowListPrice]
          }
          activeOpacity={0.7}
          onPress={() => props.navigation.navigate('PriceListPaketData')}>
          <View style={[styles.bxPricesHeight]}>
            <Text
              style={
                props.menu === 'Paket Data'
                  ? styles.textPriceListProductActive
                  : styles.textPriceListProduct
              }>
              Paket Data
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            props.menu === 'Telepon & SMS'
              ? [styles.rowListPriceActive]
              : [styles.rowListPrice]
          }
          activeOpacity={0.7}
          onPress={() => props.navigation.navigate('PriceListPaketSms')}>
          <View style={[styles.bxPricesHeight]}>
            <Text
              style={
                props.menu === 'Telepon & SMS'
                  ? styles.textPriceListProductActive
                  : styles.textPriceListProduct
              }>
              Telepon & SMS
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            props.menu === 'Voucher Data'
              ? [styles.rowListPriceActive]
              : [styles.rowListPrice]
          }
          activeOpacity={0.7}
          onPress={() => props.navigation.navigate('PriceListVoucher')}>
          <View style={[styles.bxPricesHeight]}>
            <Text
              style={
                props.menu === 'Voucher Data'
                  ? styles.textPriceListProductActive
                  : styles.textPriceListProduct
              }>
              Voucher Data
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            props.menu === 'Game'
              ? [styles.rowListPriceActive]
              : [styles.rowListPrice]
          }
          activeOpacity={0.7}
          onPress={() => props.navigation.navigate('PriceListGame')}>
          <View style={[styles.bxPricesHeight]}>
            <Text
              style={
                props.menu === 'Game'
                  ? styles.textPriceListProductActive
                  : styles.textPriceListProduct
              }>
              Game
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            props.menu === 'Topup'
              ? [styles.rowListPriceActive]
              : [styles.rowListPrice]
          }
          activeOpacity={0.7}
          onPress={() => props.navigation.navigate('PriceListTopup')}>
          <View style={[styles.bxPricesHeight]}>
            <Text
              style={
                props.menu === 'Topup'
                  ? styles.textPriceListProductActive
                  : styles.textPriceListProduct
              }>
              E-Money
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            props.menu === 'Ppob'
              ? [styles.rowListPriceActive]
              : [styles.rowListPrice]
          }
          activeOpacity={0.7}
          onPress={() => props.navigation.navigate('PriceListPpob')}>
          <View style={[styles.bxPricesHeight]}>
            <Text
              style={
                props.menu === 'Ppob'
                  ? styles.textPriceListProductActive
                  : styles.textPriceListProduct
              }>
              PPOB
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            props.menu === 'Token'
              ? [styles.rowListPriceActive]
              : [styles.rowListPrice]
          }
          activeOpacity={0.7}
          onPress={() => props.navigation.navigate('PriceListToken')}>
          <View style={[styles.bxPricesHeight]}>
            <Text
              style={
                props.menu === 'Token'
                  ? styles.textPriceListProductActive
                  : styles.textPriceListProduct
              }>
              Token
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            props.menu === 'Lainnya'
              ? [styles.rowListPriceActive]
              : [styles.rowListPrice]
          }
          activeOpacity={0.7}
          onPress={() => props.navigation.navigate('PriceListLainnya')}>
          <View style={[styles.bxPricesHeight]}>
            <Text
              style={
                props.menu === 'Lainnya'
                  ? styles.textPriceListProductActive
                  : styles.textPriceListProduct
              }>
              Lainnya
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// make the component available to other parts of the app
export default TabPriceList;
