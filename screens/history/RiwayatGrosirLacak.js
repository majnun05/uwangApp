import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  Text,
  View,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';

const RiwayatGrosirLacak = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [invoice, setinvoice] = useState(params.invoice);
  const [tracking_number, settracking_number] = useState(
    params.tracking_number,
  );
  const [histories, sethistories] = useState(params.histories);

  const _onRefresh = () => {
    // setIsLoading(true);
    // isLogged();
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
        title={'Lacak Paket'}
        shadow={true}
        right={true}
        textBlack={true}
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
        <View
          style={[
            styles.ml15,
            styles.mr15,
            styles.pl5,
            styles.pr5,
            styles.pt10,
          ]}>
          <Text style={[styles.fs14, styles.black, styles.fontWSB]}>
            Invoice
          </Text>
          <Text style={[styles.fs13, styles.grey75, styles.fontWSR]}>
            {invoice}
          </Text>
        </View>
        {tracking_number ? (
          <View
            style={[
              styles.ml15,
              styles.mr15,
              styles.pl5,
              styles.pr5,
              styles.pt10,
            ]}>
            <Text style={[styles.fs14, styles.black, styles.fontWSB]}>
              Nomor Pelacakan
            </Text>
            <Text style={[styles.fs13, styles.grey75, styles.fontWSR]}>
              {tracking_number}
            </Text>
          </View>
        ) : null}
        <View style={[s.boxLacak, styles.mt20]}>
          {histories.map((item, key) => (
            <View
              style={[
                styles.row,
                parseInt(key + 1) !== histories.length ? s.borderLacak : null,
              ]}
              key={key}>
              <View style={[styles.col5]}>
                <View
                  style={
                    parseInt(key + 1) === histories.length
                      ? s.circle
                      : s.circleActive
                  }
                />
              </View>
              <View style={[styles.col95]}>
                <View style={{marginTop: -6}}>
                  <Text style={[styles.fs14, styles.black, styles.fontWSB]}>
                    {item.message}
                  </Text>
                  <Text style={[styles.fs12, styles.grey75, styles.fontWSR]}>
                    {item.date}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RiwayatGrosirLacak;

const s = StyleSheet.create({
  boxLacak: {
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 0.8,
  },
  borderLacak: {
    borderLeftColor: '#00A79D',
    borderLeftWidth: 1,
  },
  boxActive: {
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 0.8,
  },
  circleActive: {
    borderRadius: 100,
    width: 10,
    height: 10,
    backgroundColor: '#00A79D',
    marginLeft: -5,
    marginBottom: 70,
  },
  circle: {
    borderRadius: 100,
    width: 10,
    height: 10,
    backgroundColor: '#00A79D',
    marginLeft: -5,
  },
});
