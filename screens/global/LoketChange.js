import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  getSnackBar_success,
  getSession,
  setSession,
} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import TextPrint from '../../content/print/TextPrint';
import TextPrintBold from '../../content/print/TextPrintBold';
import TextPrintBoldCenter from '../../content/print/TextPrintBoldCenter';
import TextPrintCenter from '../../content/print/TextPrintCenter';

const LoketChange = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [namaLoket, setNamaLoket] = useState('');
  const [alamatLoket, setAlamatLoket] = useState('');
  const [footLoket, setfootLoket] = useState('');
  const [form1, setForm1] = useState(false);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);

  const namaLoketChange = (value, index) => {
    setNamaLoket(value);
    setForm1(false);
  };

  const alamatLoketChange = (value, index) => {
    setAlamatLoket(value);
    setForm2(false);
  };

  const footLoketChange = (value, index) => {
    setfootLoket(value);
    setForm3(false);
  };

  const _onRefresh = () => {
    setIsLoading(false);
  };

  const actionData = async () => {
    Keyboard.dismiss();
    if (namaLoket === '' || alamatLoket === '' || footLoket === '') {
      namaLoket ? setForm1(false) : setForm1(true);
      alamatLoket ? setForm2(false) : setForm2(true);
      footLoket ? setForm3(false) : setForm3(true);
    } else {
      setIsLoading(true);

      setSession({name: 'namaLoket', value: namaLoket.toString()});
      setSession({
        name: 'alamatLoket',
        value: alamatLoket.toString(),
      });
      setSession({name: 'footLoket', value: footLoket.toString()});

      getSnackBar_success({
        title: 'Ubah Loket Berhasil',
        duration: 'LENGTH_LONG',
      });
      setIsLoading(false);
    }
  };

  const loket = async () => {
    let namaLoket = await getSession('namaLoket').then((namaLoket) => {
      return namaLoket;
    });

    let alamatLoket = await getSession('alamatLoket').then((alamatLoket) => {
      return alamatLoket;
    });

    let footLoket = await getSession('footLoket').then((footLoket) => {
      return footLoket;
    });

    setNamaLoket(namaLoket);
    setAlamatLoket(alamatLoket);
    setfootLoket(footLoket);
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
    loket();

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Pengaturan Struk'}
        shadow={true}
        right={false}
      />
      <KeyboardAvoidingView style={{flex: 1}}>
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
          <View style={[{backgroundColor: '#F5F5F5', padding: 5}]}>
            <View style={[styles.boxStruk, styles.mt20, styles.mb20]}>
              <TextPrintBoldCenter>{namaLoket}</TextPrintBoldCenter>
              <TextPrintCenter style={[styles.textCenter]}>
                {alamatLoket}
              </TextPrintCenter>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.fs11,
                  styles.grey92,
                  styles.fontWSB,
                  styles.textCenter,
                  styles.mb5,
                ]}>
                ...............................................................................................................
              </Text>
              <View style={[styles.row]}>
                <View style={styles.col25}>
                  <TextPrint>Waktu</TextPrint>
                </View>
                <View style={styles.col75}>
                  <TextPrint>:&nbsp;07/02/2021 20:10</TextPrint>
                </View>
              </View>
              <View style={[styles.row]}>
                <View style={styles.col25}>
                  <TextPrint>SN</TextPrint>
                </View>
                <View style={styles.col75}>
                  <TextPrint>:&nbsp;1008143643134452101</TextPrint>
                </View>
              </View>
              <View style={[styles.row]}>
                <View style={styles.col25}>
                  <TextPrint>Tujuan</TextPrint>
                </View>
                <View style={styles.col75}>
                  <TextPrint>:&nbsp;0812345xxx</TextPrint>
                </View>
              </View>
              <View style={[styles.row]}>
                <View style={styles.col25}>
                  <TextPrint>Produk</TextPrint>
                </View>
                <View style={styles.col75}>
                  <TextPrint>:&nbsp;THREE 100K</TextPrint>
                </View>
              </View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.fs11,
                  styles.grey92,
                  styles.fontWSB,
                  styles.textCenter,
                  styles.mb5,
                ]}>
                ...............................................................................................................
              </Text>
              <View style={[styles.row, styles.mb5]}>
                <View style={[styles.col25, styles.centerContent]}>
                  <TextPrint>Harga</TextPrint>
                </View>
                <View style={[styles.col60, styles.centerContent]}>
                  <TextPrint>:&nbsp;Rp  100.000</TextPrint>
                </View>
              </View>
              <View style={[styles.row, styles.mt5]}>
                <View style={styles.col25}>
                  <TextPrint>Admin</TextPrint>
                </View>
                <View style={[styles.col60]}>
                  <TextPrint>:&nbsp;Rp  1.000</TextPrint>
                </View>
              </View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.fs11,
                  styles.grey92,
                  styles.fontWSB,
                  styles.textCenter,
                  styles.mb5,
                ]}>
                ...............................................................................................................
              </Text>
              <View style={[styles.row]}>
                <View style={styles.col25}>
                  <TextPrintBold>Total</TextPrintBold>
                </View>
                <View style={styles.col75}>
                  <TextPrintBold>:&nbsp;Rp  101.000</TextPrintBold>
                </View>
              </View>
              <TextPrintCenter>{footLoket}</TextPrintCenter>
            </View>
          </View>

          <View style={[styles.pl10, styles.pr10]}>
            <View style={styles.PulsaLabelPhone}>
              <Text
                style={[styles.PulsaTextPhone, styles.fontWSB, styles.blue]}>
                Header Struk
              </Text>
            </View>
            <View style={styles.PulsaLabelPhone}>
              <Text style={[styles.PulsaTextPhone, styles.fontWSB]}>
                Nama Loket
              </Text>
            </View>
            <View
              style={[
                styles.sectionForm,
                {
                  borderBottomColor: form1 ? 'red' : '#ddd',
                  marginBottom: form1 ? 10 : 5,
                },
              ]}>
              <TextInput
                autoCorrect={false}
                style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
                placeholder="Masukkan Nama Loket"
                placeholderTextColor="#757575"
                value={namaLoket}
                onChangeText={namaLoketChange}
              />
              {form1 ? (
                <View style={{position: 'absolute', left: 2, bottom: -18}}>
                  <Text style={{color: 'red', fontSize: 10}}>
                    Masukkan Nama Loket
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={styles.PulsaLabelPhone}>
              <Text style={[styles.PulsaTextPhone, styles.fontWSB]}>
                Alamat Loket
              </Text>
            </View>
          </View>
          <View style={[styles.borderBottomBold, styles.pl10, styles.pr10]}>
            <View
              style={[
                styles.sectionForm,
                {
                  borderBottomColor: form2 ? 'red' : '#ddd',
                  marginBottom: form2 ? 10 : 5,
                },
              ]}>
              <TextInput
                autoCorrect={false}
                style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
                placeholder="Masukkan Alamat Loket"
                placeholderTextColor="#757575"
                value={alamatLoket}
                onChangeText={alamatLoketChange}
              />
              {form2 ? (
                <View style={{position: 'absolute', left: 2, bottom: -18}}>
                  <Text style={{color: 'red', fontSize: 10}}>
                    Masukkan Alamat Loket
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          <View style={[styles.pl10, styles.pr10, styles.pb10, styles.mb20]}>
            <View style={styles.PulsaLabelPhone}>
              <Text
                style={[styles.PulsaTextPhone, styles.fontWSB, styles.blue]}>
                Footer Loket
              </Text>
            </View>
            <View style={styles.PulsaLabelPhone}>
              <Text style={[styles.PulsaTextPhone, styles.fontWSB]}>
                Footer Note
              </Text>
            </View>
            <View
              style={[
                styles.sectionForm,
                {
                  borderBottomColor: form3 ? 'red' : '#ddd',
                  marginBottom: form3 ? 10 : 5,
                },
              ]}>
              <TextInput
                autoCorrect={false}
                style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
                placeholder="Masukkan Footer Loket"
                placeholderTextColor="#757575"
                value={footLoket}
                onChangeText={footLoketChange}
              />
              {form3 ? (
                <View style={{position: 'absolute', left: 2, bottom: -18}}>
                  <Text style={{color: 'red', fontSize: 10}}>
                    Masukkan Footer Loket
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            !isLoading ? actionData() : null;
          }}>
          <View
            style={[
              styles.btnBuyNowFormGreen,
              styles.borderTop,
              styles.mb10,
              styles.mt10,
              styles.ml5,
              styles.mr5,
            ]}>
            <Text
              style={[styles.fs15, styles.white, styles.fontWSM]}
              uppercase={false}>
              Simpan
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoketChange;
