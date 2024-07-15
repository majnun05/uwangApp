import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  TextInput,
  RefreshControl,
  Text,
  InteractionManager,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import ContentProduk from '../../content/fitur/ContentOperatorArrow';
import IconEmpty from '../../assets/svg/empty.svg';
import * as province from '../../data/Provinces.json';
import Database from '../../helpers/Database';
const db = new Database();

const Province = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState(params.pages);
  const [dataRes, setDataRes] = useState([]);
  const [dataResReal, setDataResReal] = useState([]);
  let isMounted = true;

  const isLogged = async () => {
    if (isMounted) {
      setIsLoading(false);
      let results = [];
      let kal = province.data;
      for (let i = 0; i < kal.length; i++) {
        let row = kal[i];
        const {province_id, province_name} = row;
        results.push({
          province_id,
          province_name,
        });
      }
      setDataRes(results);
      setDataResReal(results);
    }
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
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

    InteractionManager.runAfterInteractions(() => {
      isLogged();
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, []);

  const searchFilterFunction = async (text) => {
    const newData = dataRes.filter((item) => {
      const itemData = `${item.province_name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    setDataRes(newData);
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <StatusBar animated={true} backgroundColor="#4F6CFF" />
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Pilih Provinsi'}
        shadow={false}
        right={false}
      />
      <View style={[styles.boxFormCari, styles.pl15, styles.pr15]}>
        <View style={styles.formSearchKotak}>
          <TextInput
            underlineColorAndroid="#EFEFEF"
            placeholderTextColor="#757575"
            style={[styles.fs15, styles.grey92, styles.fontWSR, {height: 45}]}
            placeholder="Cari Provinsi ..."
            onChangeText={(text) => searchFilterFunction(text)}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                setDataRes(dataResReal);
              }
            }}
          />
        </View>
      </View>
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
          <View style={styles.mb20}>
            {dataRes.map((item, key) => (
              <ContentProduk
                key={key}
                onPress={() => {
                  navigation.navigate(pages, {
                    province: item,
                    city: {city_id: 'kosong', city_name: '', city_type: ''},
                    district: {district_id: 'kosong', district_name: ''},
                  });
                }}
                maps={true}
                operatorName={item.province_name}
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

export default Province;