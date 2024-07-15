import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
  TextInput,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import StatusBars from '../../content/more/StatusBar';
import styles from '../../assets/styles/Style';
import IconLengkungOrange from '../../assets/svg/lengkung-orange.svg';
import IconTitik from '../../assets/svg/titik.svg';
import IconLengkung from '../../assets/svg/lengkung.svg';
import IconQuestionWhite from '../../assets/svg/question-white.svg';
import IconBack from '../../assets/svg/back.svg';
import IconBijak from '../../assets/svg/bijak.svg';
import {getSnackBar_error, getSession, openLinkWeb} from '../../helpers/Helpers';
import moment from 'moment';
import 'moment/locale/id';
import {IcAnn} from '../../assets/svgUwang';
moment.locale('id');

const Register = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [lengthScroll, setLengthScroll] = useState(0);
  const [percent, setPercent] = useState(25);
  const [pername, setPername] = useState(25);
  const [perpin, setPerpin] = useState(25);
  const [perconfirm, setPerconfirm] = useState(25);
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [confirm, setConfirm] = useState('');
  const [referal, setReferal] = useState('');
  const [registerToken, setRegisterToken] = useState(params.registerToken);
  const [phone, setPhone] = useState(params?.phone);
  const [regLinkReferal, setRegLinkReferal] = useState(false);

  const actionData = async () => {
    if (name === '' || phone === '') {
      return getSnackBar_error({
        title: 'Lengkapi Data',
        duration: 'LENGTH_INDEFINITE',
      });
    } else {
      let data = {
        registerToken: registerToken,
        name: name,
        phone: phone,
        referal: referal,
      };
      navigation.replace('AddPin', {
        reg: data,
        cek: 'register',
        phone: phone,
      });
    }
  };

  const openWebView = async (val) => {
    let syarat = await getSession('syarat').then((syarat) => {
      return syarat;
    });
    
    let kebijakan = await getSession('kebijakan').then((kebijakan) => {
      return kebijakan;
    });

    if(val === '1'){
      if(syarat === '#'){
        return
      }else{
        openLinkWeb(syarat)
      }
    }else{
      if(kebijakan === '#'){
        return
      }else{
        openLinkWeb(kebijakan)
      }
    }
  };

  const nameChange = (value, index) => {
    let percent_ = false;
    if (value) {
      if (!name) {
        percent_ = pername;
      } else {
        percent_ = false;
      }
    } else {
      percent_ = 0;
    }

    setName(value.replace(/[^A-Za-z 0-9]/g, ''));
    setPercent(
      percent_
        ? parseInt(parseInt(percent_) + parseInt(percent))
        : percent_ === false
        ? parseInt(percent)
        : parseInt(parseInt(percent) - pername),
    );
  };

  const referalChange = (value, index) => {
    setReferal(value);
  };

  const backButtonHandler = () => {
    navigation.navigate('Login');
    return true;
  };

  const isLogged = async () => {
    let kodereferal = await getSession('kodereferal').then((kodereferal) => {
      return kodereferal;
    });
    if (kodereferal !== '-') {
      setReferal(kodereferal ? kodereferal : '');
      setRegLinkReferal(true);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);

    isLogged();

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, [backButtonHandler]);

  const _onRefresh = () => {
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <StatusBars />
      {lengthScroll > 10 ? (
        <View
          style={[
            styles.row,
            styles.bgBlue,
            styles.pb15,
            styles.pt20,
            styles.pl20,
            styles.pr20,
            {elevation: 2, position: 'absolute', width: '100%'},
          ]}>
          <View style={[styles.col70, styles.pl10, styles.centerContent]}>
            <Text style={[styles.white, styles.bold, styles.fs17]}>Daftar</Text>
            <Text style={[styles.white, styles.fs12]}>
              Lengkapi Data 50%
              {/* : {percent}% */}
            </Text>
          </View>
          <View style={[styles.col20, styles.RightText, {zIndex: 10}]}>
            <SvgXml
              width="30"
              height="30"
              style={[styles.RightText]}
              xml={IconQuestionWhite}
            />
          </View>
        </View>
      ) : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }>
        <View style={styles.containerLogin}>
          <View
            style={[styles.bgBlue, styles.pl20, styles.pr20, {height: 130}]}>
            {lengthScroll < 11 ? (
              <View style={[styles.row, styles.mt20, styles.mb50]}>
                <View style={[styles.col70, styles.pl10, styles.centerContent]}>
                  <Text style={[styles.white, styles.bold, styles.fs17]}>
                    Daftar
                  </Text>
                  <Text style={[styles.white, styles.fs12]}>
                    Lengkapi Data 50%
                    {/* : {percent}% */}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    alert('Lengkapi Formulir Pendaftaran');
                  }}
                  style={[styles.col20, styles.RightText, {zIndex: 10}]}>
                  <SvgXml
                    width="30"
                    height="30"
                    style={[styles.RightText]}
                    xml={IconQuestionWhite}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          <View style={styles.boxAllOtp}>
            <View style={[styles.centerOtpNormal, styles.mt5, styles.pl20]}>
              <View style={[styles.row, styles.centerContent, styles.mb20]}>
                <View
                  style={{
                    width: 45,
                    height: 45,
                    backgroundColor: '#4F6CFF',
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[styles.white, styles.fs30]}>1</Text>
                </View>
                <View
                  style={{
                    width: 50,
                    height: 1,
                    top: '7%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#DBDBDB',
                  }}></View>
                <View
                  style={{
                    width: 45,
                    height: 45,
                    backgroundColor: '#DBDBDB',
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[styles.greyB7, styles.fs30]}>2</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.black,
                  styles.bold,
                  styles.fs17,
                  styles.textCenter,
                ]}>
                Pendaftaran
              </Text>
              <Text
                style={[
                  styles.grey75,
                  styles.fs13,
                  styles.mb20,
                  styles.mt5,
                  styles.textCenter,
                ]}>
                Data berikut wajib diisi untuk kebutuhan aplikasi
              </Text>
              <Text
                style={[
                  styles.black,
                  styles.fs15,
                  styles.mt10,
                  styles.pl2,
                  styles.bold,
                ]}>
                Nama Lengkap<Text style={{color:'red'}}>*</Text>{''}
              </Text>
              <View style={[styles.boxFormOtp, styles.mb10, styles.center]}>
                <TextInput
                  autoCorrect={false}
                  style={[
                    styles.PulsaInputBoxNew,
                    styles.black,
                    styles.fontWSR,
                    styles.pl2,
                  ]}
                  placeholder="Masukkan Nama Lengkap"
                  placeholderTextColor="#757575"
                  underlineColorAndroid="transparent"
                  value={name}
                  onChangeText={nameChange}
                  maxLength={40}
                  autoFocus={true}
                  returnKeyType="next"
                />
              </View>
              <Text
                style={[styles.black, styles.fs15, styles.pl2, styles.bold]}>
                Nomor Telepon<Text style={{color:'red'}}>*</Text>{''}
              </Text>
              <View style={[styles.boxFormOtp, styles.mb10, styles.center]}>
                <TextInput
                  editable={false}
                  autoCorrect={false}
                  style={[
                    styles.PulsaInputBoxNew,
                    styles.black,
                    styles.fontWSR,
                    styles.pl2,
                  ]}
                  keyboardType="numeric"
                  placeholder="Contoh : 082215xxxxx"
                  placeholderTextColor="#757575"
                  underlineColorAndroid="transparent"
                  value={phone}
                  maxLength={13}
                />
              </View>
{/* 
              <Text
                style={[styles.black, styles.fs15, styles.pl2, styles.bold]}>
                Kode Referal
              </Text>
              <View style={[styles.boxFormOtp, styles.mb10, styles.center]}>
                <TextInput
                  editable={regLinkReferal ? false : true}
                  autoCorrect={false}
                  style={[
                    styles.PulsaInputBoxNew,
                    styles.black,
                    styles.fontWSR,
                    regLinkReferal ? styles.pl10 : styles.pl2,
                    regLinkReferal ? styles.bgGrey : styles.bgWhite,
                  ]}
                  placeholder="Masukkan Kode Referal (optional)"
                  placeholderTextColor="#757575"
                  underlineColorAndroid="transparent"
                  value={referal}
                  onChangeText={referalChange}
                />
              </View> */}

              <View style={[styles.row, styles.mt5, styles.mr10]}>
                <SvgXml width="30" height="30" xml={IcAnn} />
                <Text style={[styles.grey75, styles.fs13, styles.pl10]}>
                  Dengan masuk atau mendaftar, Anda menyetujui{' '}
                  <Text onPress={() => openWebView('1')} style={[styles.blue, styles.fs13, styles.fontWSB]}>
                    Ketentuan Layanan
                  </Text>{' '}
                  dan{' '}
                  <Text onPress={() => openWebView('2')} style={[styles.blue, styles.fs13, styles.fontWSB]}>
                    Kebijakan Privasi{' '}
                  </Text>
                  Uwang
                </Text>
              </View>
              <Ripple
                onPress={() => {
                  actionData();
                }}
                style={
                 name || phone === '' ?
                  [styles.btnPrimary, styles.mt15]
                  : [styles.btnPrimaryGrey, styles.mt15]
                }>
                <Text
                  style={[
                    name || phone === '' ? styles.white : styles.black,
                    styles.fs15,
                    styles.fontWSM,
                  ]}>
                  Selanjutnya
                </Text>
              </Ripple>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
