import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Dimensions
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import IcOutMutasi from '../../assets/svg/mutasiKeluar.svg';
import s from '../../assets/styles/Style';
import moment, { locale } from 'moment';
import IconEmpty from '../../assets/svg/empty.svg';
moment.locale('id')

const WIDTH = Dimensions.get('window').width

const Item = ({title, trxdate, moneyRest, moneyOut}) => (
  <View style={styles.item}>
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <SvgXml width={30} height={30} xml={IcOutMutasi} />
      <View style={{marginLeft:10, width: WIDTH/1.8}}>
        <Text style={[s.fs12, s.fontMSB, {color:'black'}]}>{title}</Text>
        <Text style={[s.fs11, s.fontMSB, {marginVertical:3}]}>{moment(trxdate).format('DD MMMM YYYY, HH:mm')}</Text>
        <Text style={[s.fs12, s.fontMSB, {color:'#6982FF'}]}>Rp {moneyRest}</Text>
      </View>
    </View>

    <View>
        <Text style={[s.fs13, s.fontMSB, {color:'#F15860'}]}>Rp {moneyOut}</Text>
    </View>
  </View>
);


const MutasiOut = ({credit, onEndReached, page, totalPage, load}) => {
  let loading = load
  const renderItem = ({item}) => <Item title={item.note} trxdate={item.transactionDate} moneyOut={item.balance} moneyRest={item.balanceTotal} />;

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {page < totalPage ? (
          <TouchableOpacity
            onPress={onEndReached}
            activeOpacity={0.9}
            style={styles.loadMoreBtn}>
          <Text style={{color:'black'}}>Load More</Text>
          {loading ? (
            <ActivityIndicator color="blue" style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  const listEmptyComponent = () => {
    return (
      <View style={s.boxEmpty}>
        <SvgXml width={100} height={100} xml={IconEmpty} />
        <Text style={s.textEmpty}>Tidak Ada Data</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={credit}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={loading}
          />
        }
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        ListFooterComponent={renderFooter}
        removeClippedSubviews={true}
        legacyImplementation={true}
        ListEmptyComponent={listEmptyComponent}
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
    borderTopWidth: 0.5,
    marginHorizontal:8,
    borderBottomWidth: 0.8,
    borderTopColor: '#E0E0E0',
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

export default MutasiOut;
