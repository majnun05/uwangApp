import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  Text,
  RefreshControl,
  InteractionManager,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiUserTanpaPin, apiUserResetPin} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {
  getSnackBar_success,
  getSnackBar_error,
  getSession,
  setSession,
} from '../../helpers/Helpers';
// import FingerprintScanner from 'react-native-fingerprint-scanner';
import ModalTanpaPin from '../../content/modal/ModalTanpaPin';
import ModalNotif from '../../content/modal/ModalNotif';
import ModalSuccess from '../../content/modal/ModalSuccess';
import ModalSuccessCenter from '../../content/modal/ModalSuccessCenter';
import IconOn from '../../assets/svg/on.svg';
import IconOff from '../../assets/svg/off.svg';
import IconChecklist from '../../assets/svg/checklist.svg';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import IconRightArrow from '../../assets/svg/right-arrow.svg';
import { IcArrR, IcSwitchOn } from '../../assets';

const ChangePin = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [modalTanpa, setModalTanpa] = useState(false);
  const [modalReset, setModalReset] = useState(false);
  const [modalResetSuccess, setModalResetSuccess] = useState(false);
  const [tanpaPin, setTanpaPin] = useState('no');
  const [pinAplikasi, setPinAplikasi] = useState('no');
  const [fingerPrint, setFingerPrint] = useState('no');
  const [pinTanpa, setPinTanpa] = useState('');
  const [checkSupport, setCheckSupport] = useState('');
  const [msgReset, setMsgReset] = useState('Reset PIN Berhasil');

  const isLogged = async () => {
    let tanpaPin_ = await getSession('tanpaPin').then((tanpaPin) => {
      return tanpaPin;
    });
    let pinAplikasi_ = await getSession('pinAplikasi').then((pinAplikasi) => {
      return pinAplikasi;
    });
    let fingerPrint_ = await getSession('fingerPrint').then((fingerPrint) => {
      return fingerPrint;
    });
    setTanpaPin(tanpaPin_);
    setPinAplikasi(pinAplikasi_);
    setFingerPrint(fingerPrint_);
    setIsLoading(false);
  };

  // ========================
  // === Transaksi Tanpa Pin ===
  // ========================
  const submitTanpaPin = async () => {
    if (pinTanpa === '') {
      getSnackBar_error({
        title: 'Masukkan PIN Anda',
        duration: 'LENGTH_INDEFINITE',
      });
    } else {
      setModalTanpa(false);
      setIsLoading(true);
      setTimeout(async () => {
        await useApiPost(apiUserTanpaPin(), {
          pin: pinTanpa,
          status: tanpaPin === 'yes' ? '0' : '1',
        })
          .then((res) => {
            setIsLoading(false);
            if (res.statusCode === 200) {
              if (tanpaPin === 'yes') {
                setSession({name: 'pinTrx', value: ''});
                setSession({name: 'tanpaPin', value: 'no'});
              } else {
                setSession({name: 'tanpaPin', value: 'yes'});
                setSession({
                  name: 'pinTrx',
                  value: pinTanpa.toString(),
                });
              }
              setPinTanpa('');
              isLogged();
              return getSnackBar_success({
                title: res.values.message,
                duration: 'LENGTH_LONG',
              });
            } else {
              getSnackBar_error({
                title: res.values.message,
                duration: 'LENGTH_INDEFINITE',
              });
            }
          })
          .catch((error) => {
            setIsLoading(false);
          });
      }, 500);
    }
  };

  // ========================
  // === Pin Aplikasi ===
  // ========================
  const submitPinAplikasi = async () => {
    if (pinAplikasi === 'no') {
      setSession({name: 'pinAplikasi', value: 'yes'});
    } else {
      setSession({name: 'pinAplikasi', value: 'no'});
      setSession({name: 'fingerPrint', value: 'no'});
    }
    isLogged();
  };

  // ========================
  // === Finger Print  ===
  // ========================
  const submitFingerPrint = async () => {
    if (fingerPrint === 'no') {
      setSession({name: 'pinAplikasi', value: 'yes'});
      setSession({name: 'fingerPrint', value: 'yes'});
    } else {
      setSession({name: 'fingerPrint', value: 'no'});
    }
    isLogged();
  };

  // ========================
  // === Transaksi Tanpa Pin ===
  // ========================
  const submitReset = async () => {
    setModalReset(false);
    setIsLoading(true);
    setTimeout(async () => {
      await useApiPost(apiUserResetPin(), {})
        .then((res) => {
          setIsLoading(false);
          if (res.statusCode === 200) {
            setModalResetSuccess(true);
            setMsgReset(res.values.message);
          } else {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, 500);
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

    // FingerprintScanner.isSensorAvailable()
    //   .then((biometryType) => {
    //     setCheckSupport(biometryType);
    //   })
    //   .catch((error) => {
    //     setCheckSupport(error.message.toString());
    //   });

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'PIN Aplikasi'}
        shadow={true}
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
        <Ripple
          onPress={() => navigation.navigate('PinForm')}
          style={styles.ListItem}>
          <View style={[styles.row, styles.pl20, styles.pr20]}>
            <View style={[styles.col90]}>
              <Text
                style={[
                  styles.fontWSR,
                  styles.fs13,
                  styles.black,
                  styles.leftText,
                ]}>
                Ubah PIN
              </Text>
            </View>
            <View style={[styles.col10, styles.center]}>
              <SvgXml width={20} height={20} xml={IcArrR} />
            </View>
          </View>
        </Ripple>
        <Ripple onPress={() => setModalReset(true)} style={styles.ListItem}>
          <View style={[styles.row, styles.pl20, styles.pr20]}>
            <View style={[styles.col90]}>
              <Text
                style={[
                  styles.fontWSR,
                  styles.fs13,
                  styles.black,
                  styles.leftText,
                ]}>
                Reset PIN
              </Text>
            </View>
            <View style={[styles.col10, styles.center]}>
              <SvgXml width={20} height={20} xml={IcArrR} />
            </View>
          </View>
        </Ripple>
        <Ripple onPress={() => setModalTanpa(true)} style={styles.ListItem}>
          <View style={[styles.row, styles.pl20, styles.pr15]}>
            <View style={[styles.col80]}>
              <Text
                style={[
                  styles.fontWSR,
                  styles.fs13,
                  styles.black,
                  styles.leftText,
                ]}>
                PIN Transaksi
              </Text>
              <Text
                style={[
                  styles.fontWSM,
                  styles.fs11,
                  styles.grey8f,
                  styles.leftText,
                ]}>
                Tampil konfirmasi pin di setiap transaksi
              </Text>
            </View>
            <View style={[styles.col20, styles.center]}>
              <SvgXml
                width={45}
                height={35}
                xml={tanpaPin === 'yes' ? IconOff : IcSwitchOn}
              />
            </View>
          </View>
        </Ripple>

        <Ripple
          onPress={() => {
            submitPinAplikasi();
          }}
          style={styles.ListItem}>
          <View style={[styles.row, styles.pl20, styles.pr15]}>
            <View style={[styles.col80]}>
              <Text
                style={[
                  styles.fontWSR,
                  styles.fs13,
                  styles.black,
                  styles.leftText,
                ]}>
                PIN Buka Aplikasi
              </Text>
              <Text
                style={[
                  styles.fontWSM,
                  styles.fs11,
                  styles.grey8f,
                  styles.leftText,
                ]}>
                Tampil konfirmasi pin saat buka aplikasi
              </Text>
            </View>
            <View style={[styles.col20, styles.center]}>
              <SvgXml
                width={45}
                height={35}
                xml={pinAplikasi === 'no' ? IconOff : IcSwitchOn}
              />
            </View>
          </View>
        </Ripple>

        <View style={styles.ListItem}>
          <View style={[styles.pl20, styles.pr20, styles.mt10]}>
            <Text
              style={[
                styles.fontWSR,
                styles.fs11,
                styles.grey8f,
                styles.leftText,
              ]}>
              Aktifkan Pendukung PIN Aplikasi
            </Text>
            <Text
              style={[
                styles.fontWSR,
                styles.fs11,
                styles.grey8f,
                styles.leftText,
              ]}>
              Dapat membuka PIN dengan metode dibawah ini
            </Text>
          </View>
        </View>
        <Ripple
          onPress={() => {
            if (
              checkSupport === 'Device does not support Fingerprint Scanner.'
            ) {
              getSnackBar_error({
                title: 'Perangkat Anda tidak mendukung Sidik Jari',
                duration: 'LENGTH_LONG',
              });
            } else {
              submitFingerPrint();
            }
          }}
          style={styles.ListItem}>
          <View style={[styles.row, styles.pl20, styles.pr20]}>
            <View style={[styles.col80]}>
              <Text
                style={[
                  styles.fontWSR,
                  styles.fs13,
                  styles.black,
                  styles.leftText,
                ]}>
                Finger Print / Face Detection
              </Text>
              {checkSupport ===
              'Device does not support Fingerprint Scanner.' ? (
                <Text
                  style={[
                    styles.fontWSM,
                    styles.fs11,
                    styles.grey8f,
                    styles.leftText,
                  ]}>
                  Perangkat Anda tidak mendukung Sidik Jari
                </Text>
              ) : null}
            </View>
            <View style={[styles.col20, styles.center]}>
              {fingerPrint === 'yes' ? (
                <SvgXml width={25} height={20} xml={IconChecklist} />
              ) : null}
            </View>
          </View>
        </Ripple>
      </ScrollView>

      <ModalNotif
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalReset}
        onSwipeComplete={() => setModalReset(false)}
        title={'Notifikasi'}
        message={'Apa Anda yakin akan reset PIN ?'}
        titleClose={'Tidak'}
        titleButton={'Ya'}
        onPressClose={() => {
          setModalReset(false);
        }}
        onPress={() => {
          submitReset();
        }}
      />

      <ModalSuccessCenter
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalResetSuccess}
        onSwipeComplete={() => setModalResetSuccess(false)}
        onBackButtonPress={() => setModalResetSuccess(false)}
        title={'PIN Berhasil Reset'}
        message={
          msgReset ? msgReset : 'Kami telah mengirim PIN Baru anda via SMS'
        }
        titleClose={'Tidak'}
        titleButton={'Ya'}
        onPressClose={() => {
          setModalResetSuccess(false);
        }}
      />

      <ModalTanpaPin
        close={true}
        modal={'normal'}
        tanpaPin={tanpaPin}
        isVisible={modalTanpa}
        onSwipeComplete={() => setModalTanpa(false)}
        value={pinTanpa}
        onChangeText={(pinTanpa) => setPinTanpa(pinTanpa)}
        title={
          tanpaPin === 'no' ? 'Matikan PIN Transaksi' : 'Aktifkan PIN Transaksi'
        }
        titleClose={'Batal'}
        titleButton={tanpaPin === 'no' ? 'Matikan' : 'Aktifkan'}
        onPressClose={() => {
          setModalTanpa(false);
        }}
        onPress={() => {
          submitTanpaPin();
        }}
      />
    </SafeAreaView>
  );
};

export default ChangePin;
