import React, {useEffect} from 'react';
import {Text, View, ScrollView, SafeAreaView, BackHandler} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import Header from '../../content/header/Header';
import styles from '../../assets/styles/Style';
import IconRightArrow from '../../assets/svg/right-arrow.svg';

const CatatChoose = () => {
  const navigation = useNavigation();

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

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Catat Hutang'}
        shadow={true}
        right={false}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={[styles.bgWhite]}>
        <Ripple
          onPress={() => navigation.push('PilihPenghutang')}
          style={styles.rowsKasir}>
          <View style={styles.col90}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#515151',
              }}>
              Catat Pembeli
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: '#929292',
              }}>
              Mencatat Daftar Hutang Pembeli terhadap Toko
            </Text>
          </View>
          <View style={[styles.col10, styles.center]}>
            <SvgXml width={20} height={20} xml={IconRightArrow} />
          </View>
        </Ripple>

        <Ripple
          onPress={() => navigation.push('PilihPenghutangSup')}
          style={styles.rowsKasir}>
          <View style={styles.col90}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#515151',
              }}>
              Catat Supplier
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: '#929292',
              }}>
              Mencatat Daftar Hutang Toko terhadap supplier
            </Text>
          </View>
          <View style={[styles.col10, styles.center]}>
            <SvgXml width={20} height={20} xml={IconRightArrow} />
          </View>
        </Ripple>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CatatChoose;
