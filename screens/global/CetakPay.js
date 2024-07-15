import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  RefreshControl,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import ContentText from '../../content/fitur/ContentText';
import IconEmpty from '../../assets/svg/empty.svg';

const CetakPay = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(params.pages);
  const [dataRes, setDataRes] = useState([
    {bank: 'Bank BCA'},
    {bank: 'Bank BRI'},
    {bank: 'Bank Mandiri'},
    {bank: 'Bank BNI'},
    {bank: 'Tunai'},
    {bank: 'Bon'},
  ]);

  const _onRefresh = () => {
    setIsLoading(false);
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

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Pilih Bank'}
        shadow={false}
        right={false}
      />
      <ScrollView
        style={[styles.bgWhite]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }>
        {dataRes.length > 0 ? (
          <View style={[styles.mb20, styles.mt10]}>
            {dataRes.map((item, key) => (
              <ContentText
                key={key}
                onPress={() => {
                  navigation.navigate(pages, {
                    bank: item.bank,
                  });
                }}
                name={item.bank}
              />
            ))}
          </View>
        ) : (
          <View style={styles.boxEmpty}>
            <SvgXml width={120} height={120} xml={IconEmpty} />
            {!isLoading ? (
              <Text style={styles.textEmpty}>Tidak Ada Data</Text>
            ) : null}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CetakPay;
