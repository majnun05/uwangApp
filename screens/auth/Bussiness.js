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

const Bussiness = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(params.pages);
  const [dataRes, setDataRes] = useState([
    {business_type: 'Telco'},
    {business_type: 'Minimarket'},
    {business_type: 'Makanan'},
    {business_type: 'Elektronik'},
    {business_type: 'Jasa'},
    {business_type: 'Lainnya'},
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
        title={'Jenis Usaha'}
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
                    bussiness: item,
                  });
                }}
                name={item.business_type}
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

export default Bussiness;
