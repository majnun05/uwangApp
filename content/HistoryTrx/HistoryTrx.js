import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Image
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import IcAddMutasi from '../../assets/svg/mutasiMasuk.svg';
import s from '../../assets/styles/Style';
import IconEmpty from '../../assets/svg/empty.svg';
import moment from 'moment';
import { IcHistoryUwang, ImgEmptyTrx, IcHistoryBank } from '../../assets';
moment.locale('ID')

const Item = ({title, trxdate, moneyRest, targetAcount}) => (
  <View style={styles.item}>
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <SvgXml width={35} height={35} xml={moneyRest === 'Sesama Uwang' ? IcHistoryUwang : IcHistoryBank} />
      <View style={{marginLeft:15, width:250,}}>
        <Text style={[s.fs12, s.fontMSB, {color:'black'}]}>{title}</Text>
        <Text style={[s.fs11, s.fontMSB, {marginVertical:3}]}>{moment(trxdate).format('DD MMMM YYYY, hh:mm')}</Text>
        <Text style={[s.fs12, s.fontMSB, {color:'#000000'}]}>{`${moneyRest} ${targetAcount}`}</Text>
      </View>
    </View>
  </View>
);



const HistoryTrx = ({data, load}) => {
  let loading = load
  const renderItem = ({item}) => <Item title={item.targetName} trxdate={item.transactionDate} moneyRest={item.targetServiceName}  targetAcount={item.targetAccount}/>;

  return (
    <SafeAreaView >
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={loading}
          />
        }
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        legacyImplementation={true}
        // ListEmptyComponent={listEmptyComponent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 0.8,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  title: {
    fontSize: 12,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HistoryTrx;
