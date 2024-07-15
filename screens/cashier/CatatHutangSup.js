import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {getSnackBar_error, getRupiah} from '../../helpers/Helpers';
import Header from '../../content/header/Header';
import styles from '../../assets/styles/Style';
import IconProfile from '../../assets/svg/profile.svg';

const CatatHutangSup = (props) => {
  let {params} = props.route;
  let peng = params.penghutang;
  const navigation = useNavigation();
  const [namaHutang, setNamaHutang] = useState('');
  const [jumlahHutang, setJumlahHutang] = useState('');
  const [id_member_loan, setIdMemberLoan] = useState(peng?.id_member_loan);
  const [name, setName] = useState(peng?.name);
  const [phone, setPhone] = useState(peng?.phone);
  const [address, setAddress] = useState(peng?.address);

  const lanjutCatat = () => {
    let jml = jumlahHutang.replace(/[^0-9]/g, '');
    if (namaHutang === '' || jml === '') {
      getSnackBar_error({
        title: 'Lengkapi Data',
        duration: 'LENGTH_INDEFINITE',
      });
    } else {
      let hutang = [
        {
          title: namaHutang,
          amount: jml,
        },
      ];

      let penghutang = {
        id_member_loan: id_member_loan,
        total: jml,
        name: name,
        phone: phone,
        address: address,
      };
      navigation.push('DetailHutangSup', {
        hutang: hutang,
        penghutang: penghutang,
        check: 'catat',
      });
    }
  };

  const jumlahHutangChange = (value, index) => {
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setJumlahHutang(getRupiah(valu));
    } else {
      setJumlahHutang('');
    }
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
        title={'Catat Hutang'}
        shadow={false}
        right={false}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={[styles.bgWhite]}>
        <View
          style={{
            borderRadius: 5,
            marginTop: 10,
            marginBottom: 5,
            marginLeft: 10,
            marginRight: 10,
            paddingVertical: 10,
            elevation: 1,
            justifyContent: 'center',
            backgroundColor: '#f4f4f4',
            flexDirection: 'row',
          }}>
          <View style={[styles.col15, styles.center]}>
            <SvgXml width={40} height={40} xml={IconProfile} />
          </View>
          <View style={[styles.col85, styles.centerContent]}>
            <Text style={[styles.fs14, styles.fontWSB, styles.black]}>
              {name}
            </Text>
            <Text style={[styles.fs12, styles.fontWSR, styles.grey75]}>
              {phone}
            </Text>
          </View>
        </View>

        <View style={[styles.boxBottomBorder, styles.mb10, styles.pb15]}>
          <View style={styles.PulsaLabelPhone}>
            <Text style={[styles.PulsaTextPhone, styles.fontWSB]}>
              Nama Hutang
            </Text>
          </View>
          <View style={styles.sectionForm}>
            <TextInput
              autoCorrect={false}
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              placeholder={`Contoh: Tomat 2Kg`}
              placeholderTextColor="#d2d2d2"
              value={namaHutang}
              onChangeText={(namaHutang) => setNamaHutang(namaHutang)}
            />
          </View>
          <View style={styles.PulsaLabelPhone}>
            <Text style={[styles.PulsaTextPhone, styles.fontWSB]}>
              Jumlah Hutang
            </Text>
          </View>
          <View style={styles.sectionForm}>
            <TextInput
              autoCorrect={false}
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              keyboardType="number-pad"
              placeholder={`Contoh: 10.000`}
              placeholderTextColor="#d2d2d2"
              value={jumlahHutang}
              onChangeText={jumlahHutangChange}
            />
          </View>
        </View>
      </ScrollView>

      <Ripple
        onPress={() => lanjutCatat()}
        style={[styles.btnBuyNowFormGreen, styles.mb20]}>
        <Text
          style={[styles.fs13, styles.white, styles.fontWSM]}
          uppercase={false}>
          Lanjut
        </Text>
      </Ripple>
    </SafeAreaView>
  );
};

export default CatatHutangSup;
