import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  TouchableNativeFeedback,
  RefreshControl,
  Share,
  InteractionManager,
} from 'react-native';
// import Clipboard from '@react-native-community/clipboard';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {apiUserReferal, apiUserReferalUpdate} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_error, getSnackBar_success} from '../../helpers/Helpers';
import ModalReferal from '../../content/modal/ModalReferal';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import IconCopy from '../../assets/svg/copypaste.svg';
import IconShare from '../../assets/svg/share.svg';

const Referal = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalReferal, setModalReferal] = useState(false);
  const [markup, setMarkup] = useState('');
  const [markupUpdate, setMarkupUpdate] = useState('');
  const [referalUpdate, setReferalUpdate] = useState('');
  const [referal, setReferal] = useState('');
  const [pin, setPin] = useState('');
  let isMounted = true;

  const isLogged = async () => {
    await useApiPost(apiUserReferal(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setReferal(val.data.referal);
            setMarkup(val.data.markup);
            setMarkupUpdate(val.data.markupReal);
            setReferalUpdate(val.data.referal);
          } else {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
  };

  const share = async () => {
    try {
      let message = `Hei, sudah coba Uwang? Ini sangat membantu saya menghemat waktu dan energi. Saya pikir Anda harus mencobanya dan dapatkan potongan harga di setiap transaksinya. Daftar di aplikasi Uwang dengan kode referal ${referal}`;
      const result = await Share.share({
        message: message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // alert(error.message);
    }
  };

  const copy = () => {
    let message = `Hei, sudah coba Uwang? Ini sangat membantu saya menghemat waktu dan energi. Saya pikir Anda harus mencobanya dan dapatkan potongan harga di setiap transaksinya. Daftar di aplikasi Uwang dengan kode referal ${referal}`;
    getSnackBar_success({
      title: 'Referal telah disalin',
      duration: 'LENGTH_LONG',
    });
    // Clipboard.setString(message);
  };

  const checkPin = async () => {
    if (pin === '') {
      getSnackBar_error({
        title: 'Masukkan PIN Anda',
        duration: 'LENGTH_INDEFINITE',
      });
    } else {
      updateData();
    }
  };

  const updateData = async () => {
    if (
      referalUpdate === '' ||
      parseInt(markupUpdate) < 0 ||
      markupUpdate === ''
    ) {
      return getSnackBar_error({
        title: 'Lengkapi Data',
        duration: 'LENGTH_INDEFINITE',
      });
    } else if (parseInt(markupUpdate) > 3000) {
      return getSnackBar_error({
        title: 'Markup maksimal sebesar 3000',
        duration: 'LENGTH_INDEFINITE',
      });
    } else {
      setModalReferal(false);
      setTimeout(async () => {
        setIsLoading(true);
        await useApiPost(apiUserReferalUpdate(), {
          pin: pin,
          referal: referalUpdate,
          markUp: markupUpdate.toString(),
        })
          .then((res) => {
            setIsLoading(false);
            if (res.statusCode === 200) {
              setPin('');
              isLogged();
              getSnackBar_success({
                title: res.values.message,
                duration: 'LENGTH_LONG',
              });
            } else {
              getSnackBar_error({
                title: res.values.message,
                duration: 'LENGTH_LONG',
              });
            }
          })
          .catch((error) => {
            setIsLoading(false);
          });
      }, 500);
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

    InteractionManager.runAfterInteractions(() => {
      isLogged();
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, [markup]);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Kode Referal'}
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
        <View
          style={[
            styles.rowListReferal,
            styles.mt15,
            styles.mr15,
            styles.ml15,
          ]}>
          <View style={[styles.row]}>
            <View style={[styles.col30, styles.pl10, styles.centerContent]}>
              <Text style={[styles.fs13, styles.black, styles.fontWSR]}>
                Kode Referal
              </Text>
              <Text style={[styles.fs13, styles.black, styles.fontWSR]}>
                Markup
              </Text>
            </View>
            <View style={[styles.col50, styles.pl5, styles.centerContent]}>
              <Text style={[styles.fs13, styles.black, styles.fontWSR]}>
                {referal}
              </Text>
              <Text style={[styles.fs13, styles.green, styles.fontWSB]}>
                Rp  {markup}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.col10, styles.centerContent]}
              onPress={() => copy()}>
              <SvgXml width={25} height={25} xml={IconCopy} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.col10, styles.pl10, styles.centerContent]}
              onPress={() => share()}>
              <SvgXml width={25} height={25} xml={IconShare} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TouchableNativeFeedback
        onPress={() => {
          !isLoading ? setModalReferal(true) : null;
        }}>
        <View
          style={[
            styles.btnPrimary,
            styles.mt10,
            styles.mb15,
            styles.ml15,
            styles.mr15,
          ]}>
          <Text
            style={[styles.bold, styles.fs13, styles.white, styles.fontWSB]}>
            Edit
          </Text>
        </View>
      </TouchableNativeFeedback>

      <ModalReferal
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalReferal}
        onSwipeComplete={() => setModalReferal(false)}
        ket="Masukkan Markup"
        placeholder="Contoh : 100"
        value1={referalUpdate}
        onChangeText1={(referal) => setReferalUpdate(referal)}
        value2={markupUpdate}
        onChangeText2={(markup) => setMarkupUpdate(markup)}
        value3={pin}
        onChangeText3={(pin) => setPin(pin)}
        title={'Edit Kode Referal'}
        titleClose={'Batal'}
        titleButton={'Ubah'}
        onPressClose={() => {
          setModalReferal(false);
        }}
        onPress={() => {
          checkPin();
        }}
      />
    </SafeAreaView>
  );
};

export default Referal;
