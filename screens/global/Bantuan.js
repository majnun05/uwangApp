import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  SafeAreaView,
  BackHandler,
  RefreshControl,
  Linking,
  InteractionManager,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useApiPost, useError} from '../../helpers/useFetch';
import {apiUtilityReference} from '../../helpers/endPoint';
import {getSnackBar_error} from '../../helpers/Helpers';
import Header from '../../content/header/Header';
import styles from '../../assets/styles/Style';
import IconWarning from '../../assets/svg/warning.svg';
import IconIntersect from '../../assets/svg/intersect2.svg';
import IconRightArrow from '../../assets/svgUwang/arrowRigth.svg';
import IconWa from '../../assets/svg/hubungi/wa.svg';
import IconTele from '../../assets/svg/hubungi/tele.svg';
import IconMessenger from '../../assets/svg/hubungi/messenger.svg';
import IconLiveChat from '../../assets/svg/hubungi/livechat.svg';
import IconVerifyWa from '../../assets/svg/verify-wa.svg';
import { IcTelepon } from '../../assets';

const Bantuan = (props) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  let isMounted = true;

  const isLogged = async () => {
    await useApiPost(apiUtilityReference(), {})
      .then(async (res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values.values;
            setData(val);
          } else if (res.statusCode === 500) {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          } else {
            setIsLoading(false);
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
  }, []);

  const makeCall = () => {

    let phoneNumber = '';
    let dataPhone = `${data.profilePhone}`

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${dataPhone}`;
    } else {
      phoneNumber = `telprompt:${dataPhone}`;
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Bantuan'}
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
        <View style={[styles.pb10, styles.borderBottom1Normal]}>
          <View style={[styles.keteranganBaru, styles.mt15]}>
            <View style={styles.row}>
              <View style={[styles.col15, styles.center]}>
                <SvgXml width={40} height={40} xml={IconWarning} />
              </View>
              <View style={[styles.col85, styles.pl10]}>
                <Text style={[styles.fs12, styles.fontWSB, styles.black]}>
                  Pilih Salah Satu Jalur Interaksi
                </Text>
                <Text style={[styles.fs12, styles.fontWSR, styles.black]}>
                  Jangan memberikan Kode PIN, Kode OTP serta Kode Rahasia
                  lainnya, kepada siapapun dengan alasan apapun
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.mb10]}>
          {data.profileWhatsapp ? (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#DDD')}
              onPress={() => {
                if (data.profileWhatsappStatus === 'on') {
                  Linking.openURL(
                    `https://api.whatsapp.com/send?l=id&phone=${data.profileWhatsapp}&text=Hai Kak`,
                  );
                }
              }}>
              <View
                style={[
                  styles.row,
                  styles.borderBottom1Normal,
                  styles.pt10,
                  styles.pb10,
                  styles.pl10,
                  styles.pr10,
                ]}>
                <View style={[styles.col10, styles.centerOnly, styles.pt5]}>
                  <SvgXml width={24} height={24} xml={IconWa} />
                </View>
                <View style={[styles.col80, styles.pl5, styles.pr10]}>
                  <View style={styles.row}>
                    <Text style={[styles.fs13, styles.fontWSB, styles.black]}>
                      WhatsApp CS
                    </Text>
                    {data.profileWhatsappStatus === 'on' ? (
                      <SvgXml width={12} height={12} xml={IconVerifyWa} />
                    ) : null}
                  </View>

                  <Text
                    style={[
                      styles.fs10,
                      styles.fontWSB,
                      data.profileWhatsappStatus === 'on'
                        ? styles.online
                        : styles.grey75,
                      styles.mt5,
                    ]}>
                    {data.profileWhatsappStatus === 'on' ? 'Online' : 'Offline'}
                  </Text>
                </View>
                <View style={[styles.col10, styles.center]}>
                  <SvgXml width={20} height={20} xml={IconRightArrow} />
                </View>
              </View>
            </TouchableNativeFeedback>
          ) : null}
          {data.profileMessanger ? (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#DDD')}
              onPress={() => {
                if (data.profileMessangerStatus === 'on') {
                  Linking.openURL(data.profileMessanger);
                }
              }}>
              <View
                style={[
                  styles.row,
                  styles.borderBottom1Normal,
                  styles.pt10,
                  styles.pb10,
                  styles.pl10,
                  styles.pr10,
                ]}>
                <View style={[styles.col10, styles.centerOnly, styles.pt5]}>
                  <SvgXml width={24} height={24} xml={IconMessenger} />
                </View>
                <View style={[styles.col80, styles.pl5, styles.pr10]}>
                  <View style={styles.row}>
                    <Text style={[styles.fs13, styles.fontWSB, styles.black]}>
                      Messenger CS
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.fs10,
                      styles.fontWSB,
                      data.profileMessangerStatus === 'on'
                        ? styles.online
                        : styles.grey75,
                      styles.mt5,
                    ]}>
                    {data.profileMessangerStatus === 'on'
                      ? 'Online'
                      : 'Offline'}
                  </Text>
                </View>
                <View style={[styles.col10, styles.center]}>
                  <SvgXml width={20} height={20} xml={IconRightArrow} />
                </View>
              </View>
            </TouchableNativeFeedback>
          ) : null}
          {data.profileTelegram ? (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#DDD')}
              onPress={() => {
                if (data.profileTelegramStatus === 'on') {
                  Linking.openURL(data.profileTelegram);
                }
              }}>
              <View
                style={[
                  styles.row,
                  styles.borderBottom1Normal,
                  styles.pt10,
                  styles.pb10,
                  styles.pl10,
                  styles.pr10,
                ]}>
                <View style={[styles.col10, styles.centerOnly, styles.pt5]}>
                  <SvgXml width={24} height={24} xml={IconTele} />
                </View>
                <View style={[styles.col80, styles.pl5, styles.pr10]}>
                  <View style={styles.row}>
                    <Text style={[styles.fs13, styles.fontWSB, styles.black]}>
                      Telegram CS
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.fs10,
                      styles.fontWSB,
                      data.profileTelegramStatus === 'on'
                        ? styles.online
                        : styles.grey75,
                      styles.mt5,
                    ]}>
                    {data.profileTelegramStatus === 'on' ? 'Online' : 'Offline'}
                  </Text>
                </View>
                <View style={[styles.col10, styles.center]}>
                  <SvgXml width={20} height={20} xml={IconRightArrow} />
                </View>
              </View>
            </TouchableNativeFeedback>
          ) : null}

          {data.profilePhone ? (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#DDD')}
              onPress={() => {
                makeCall();
              }}>
              <View
                style={[
                  styles.row,
                  styles.borderBottom1Normal,
                  styles.pt10,
                  styles.pb10,
                  styles.pl10,
                  styles.pr10,
                ]}>
                <View style={[styles.col10, styles.centerOnly, styles.pt5]}>
                  <SvgXml width={24} height={24} xml={IcTelepon} />
                </View>
                <View style={[styles.col80, styles.pl5, styles.pr10]}>
                  <View style={styles.row}>
                    <Text style={[styles.fs13, styles.fontWSB, styles.black]}>
                      Telepon
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.fs10,
                      styles.fontWSB,
                      styles.grey75,
                      styles.mt5,
                    ]}>
                    {data.profilePhone !== '' ? data.profilePhone : ''}
                  </Text>
                </View>
                <View style={[styles.col10, styles.center]}>
                  <SvgXml width={20} height={20} xml={IconRightArrow} />
                </View>
              </View>
            </TouchableNativeFeedback>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bantuan;
