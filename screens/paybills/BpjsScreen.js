import React, {useState, useEffect} from 'react';
import {Text, View, SafeAreaView, ScrollView, RefreshControl, BackHandler} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { SvgXml } from 'react-native-svg';
import { IcBpjs } from '../../assets';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';

const BpjsScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  let isMounted = true

  const _onRefresh = () => {
      setIsLoading(true)
      setTimeout(() => {
          setIsLoading(false)
      }, 300);
  }

  useEffect(() => {
    const backAction = () => {
      navigation.goBack()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack()}
        title={'Pilih Produk'}
        shadow={false}
        right={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.bgWhite]}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }>
            <View style={{padding:20}}>
                <Ripple onPress={() => navigation.navigate('Bpjs', {value: '0'})}>
                    <View style={{flexDirection:'row', alignItems:'center', marginBottom:8}}>
                        <SvgXml width={35} height={35} xml={IcBpjs} />
                        <Text style={[styles.fontWSB, styles.ml10, styles.black,styles.fs16]}>Bpjs Kesehatan</Text>
                    </View>
                    <View style={{width:'100%', height:1, backgroundColor:'#ddd'}}/>
                </Ripple>

                <Ripple style={{marginTop:15}} onPress={() =>  navigation.navigate('Bpjs', {value: '1'})}>
                    <View style={{flexDirection:'row', alignItems:'center', marginBottom:8}}>
                        <SvgXml width={35} height={35} xml={IcBpjs} />
                        <Text style={[styles.fontWSB, styles.ml10, styles.black,styles.fs16]}>Bpjs Ketenagakerjaan</Text>
                    </View>
                    <View style={{width:'100%', height:1, backgroundColor:'#ddd'}}/>
                </Ripple>
            </View>

        </ScrollView>
    </SafeAreaView>
  );
};

export default BpjsScreen;

