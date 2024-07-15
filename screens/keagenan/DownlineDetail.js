import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  RefreshControl,
} from 'react-native';
// import Clipboard from '@react-native-community/clipboard';
import {useNavigation} from '@react-navigation/native';
import {apiDownlineMarkup} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_success, getSnackBar_error} from '../../helpers/Helpers';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import ModalPrice from '../../content/modal/ModalPrice';
import IconHeaderCom from '../../assets/svg/header-com.svg';
import IconBack from '../../assets/svg/back.svg';
import IconProfile from '../../assets/svg/profile.svg';
import IconCopyWhite from '../../assets/svg/copypaste-white.svg';

const DownlineDetail = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [modalMarkup, setModalMarkup] = useState(false);
  const [markupReal, setmarkupReal] = useState(params.detail.markupReal);
  const [idReseller, setidReseller] = useState(params.detail.idReseller);
  const [resellerName, setresellerName] = useState(params.detail.resellerName);
  const [balance, setbalance] = useState(params.detail.balance);
  const [markupFix, setmarkupFix] = useState(params.detail.markupReal);

  const copy = (data) => {
    getSnackBar_success({
      title: data + ' telah disalin',
      duration: 'LENGTH_LONG',
    });
    // Clipboard.setString(data);
  };

  const updateMarkup = async () => {
    if (parseInt(markupReal) >= 0) {
      setModalMarkup(false);
      setTimeout(async () => {
        setIsLoading(true);
        await useApiPost(apiDownlineMarkup(), {
          idReseller: idReseller,
          markUp: markupReal,
        })
          .then((res) => {
            setIsLoading(false);
            setmarkupFix(markupReal);
            if (res.statusCode === 200) {
              let val = res.values;
              getSnackBar_success({
                title: idReseller + ' ' + val.message,
                duration: 'LENGTH_INDEFINITE',
              });
            } else {
              getSnackBar_error({
                title: res.values.message,
                duration: 'LENGTH_INDEFINITE',
              });
            }
          })
          .catch((err) => {
            setIsLoading(false);
            useError(err.toString());
          });
      }, 500);
    } else {
      getSnackBar_error({
        title: 'Masukkan Markup',
        duration: 'LENGTH_INDEFINITE',
      });
    }
  };

  const _onRefresh = () => {
    setIsLoading(true);
  };

  const markupChange = async (value, index) => {
    setmarkupReal(value.replace(/[^0-9]/g, ''));
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
        <View style={styles.headerGreenProfile}>
          <View
            style={{
              position: 'absolute',
              top: 20,
              left: '-5%',
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
            }}>
            <SvgXml
              width={160}
              height={160}
              style={{top: 0}}
              xml={IconHeaderCom}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack(null)}
            style={styles.pl5}>
            <SvgXml width={25} height={25} xml={IconBack} />
          </TouchableOpacity>

          <View
            style={[styles.center, styles.col100, styles.pr10, styles.pl10]}>
            <SvgXml width={50} height={50} xml={IconProfile} />
            <Text style={[styles.nameUserProfile]}>{resellerName}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                copy(idReseller);
              }}>
              <Text style={[styles.idUserProfile, styles.mt10]}>
                {idReseller}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.row, styles.mt5]}
              onPress={() => {
                copy(idReseller);
              }}>
              <SvgXml width={15} height={15} xml={IconCopyWhite} />
              <Text style={[styles.white, styles.fs12, styles.ml5]}>Salin</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.ListItem}>
          <View style={[styles.row, styles.pl20, styles.pr20]}>
            <View style={[styles.col30, styles.pt2]}>
              <Text
                style={[
                  styles.fontWSR,
                  styles.fs13,
                  styles.black,
                  styles.leftText,
                ]}>
                Saldo Downline
              </Text>
            </View>
            <View style={[styles.col70]}>
              <Text
                style={[
                  styles.fontWSB,
                  styles.fs13,
                  styles.black,
                  styles.rightText,
                ]}>
                {balance}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.ListItem}>
          <View style={[styles.row, styles.pl20, styles.pr20]}>
            <View style={[styles.col30, styles.pt2]}>
              <Text
                style={[
                  styles.fontWSR,
                  styles.fs13,
                  styles.black,
                  styles.leftText,
                ]}>
                Markup
              </Text>
            </View>
            <View style={[styles.col70]}>
              <Text
                style={[
                  styles.fontWSB,
                  styles.fs13,
                  styles.black,
                  styles.rightText,
                ]}>
                {markupFix}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.row,
            styles.mb15,
            styles.ml15,
            styles.mr15,
            styles.pt15,
          ]}>
          <View style={[styles.col50, styles.pr5]}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#DDD')}
              onPress={() => {
                setModalMarkup(true);
              }}>
              <View style={styles.btnPrimaryOutlineFull}>
                <Text style={[styles.green, styles.fontWSB, styles.fs13]}>
                  Ubah Markup
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={[styles.col50, styles.pl5, styles.brL]}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#DDD')}
              onPress={() => {
                navigation.push('TransferSaldo', {
                  idReseller: idReseller,
                });
              }}>
              <View style={styles.btnPrimaryFull}>
                <Text style={[styles.white, styles.fontWSB, styles.fs13]}>
                  Transfer Saldo
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </ScrollView>

      <ModalPrice
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalMarkup}
        onSwipeComplete={() => setModalMarkup(false)}
        ket="Masukkan Markup"
        placeholder="Contoh : 100"
        value={markupReal.toString()}
        onChangeText={markupChange}
        title={'Ubah Markup'}
        titleClose={'Batal'}
        titleButton={'Ubah'}
        onPressClose={() => {
          setModalMarkup(false);
        }}
        onPress={() => {
          updateMarkup();
        }}
      />
    </SafeAreaView>
  );
};

export default DownlineDetail;
