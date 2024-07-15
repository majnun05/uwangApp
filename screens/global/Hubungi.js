import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Linking,
  TouchableNativeFeedback,
  SafeAreaView,
  BackHandler,
  Dimensions,
  RefreshControl,
  InteractionManager,
  Platform
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useApiPost, useError} from '../../helpers/useFetch';
import {apiUtilityReference} from '../../helpers/endPoint';
import {getSnackBar_error, getSession} from '../../helpers/Helpers';
import Header from '../../content/header/Header';
import styles from '../../assets/styles/Style';
import IconWarning from '../../assets/svg/warning.svg';
import IconIntersect from '../../assets/svg/intersect2.svg';
import IconRightArrow from '../../assets/svgUwang/arrowRigth.svg';
import IconMarker from '../../assets/svg/hubungi/marker.svg';
import IconFb from '../../assets/svg/hubungi/fb.svg';
import IconIg from '../../assets/svg/hubungi/ig.svg';
import IconTwitter from '../../assets/svg/hubungi/twitter.svg';
import IconLinkedin from '../../assets/svg/hubungi/linkedin.svg';
import IconTiktok from '../../assets/svg/hubungi/tiktok.svg';
import IconYoutube from '../../assets/svg/hubungi/youtube.svg';
import IconWebsite from '../../assets/svg/hubungi/website.svg';
import IconWa from '../../assets/svg/hubungi/wa.svg';
import IconTele from '../../assets/svg/hubungi/tele.svg';
import IconMessenger from '../../assets/svg/hubungi/messenger.svg';
import IconLiveChat from '../../assets/svg/hubungi/livechat.svg';
import IconVerifyWa from '../../assets/svg/verify-wa.svg';
import { IcWarningRound, IcTelepon } from '../../assets';

const Hubungi = () => {
  const initialLayout = {width: Dimensions.get('window').width};
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [routes] = useState([
    {key: 'first', title: 'Customer Service'},
    {key: 'second', title: 'Ikuti Kami'},
  ]);
  const [data, setData] = useState({});
  let isMounted = true;

  const isLogged = async () => {
    let isLogged = await getSession('isLoggedV2').then((isLogged) => {
      return isLogged;
    });
    if (isLogged === 'yes') {
      await useApiPost(apiUtilityReference(), {})
        .then(async (res) => {
          console.log({res})
          if (isMounted) {
            setIsLoading(false);
            if (res.statusCode === 200) {
              let val = res.values.values;
              setData(val);
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
    } else {
      setIsLoading(false);
    }
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
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


  const FirstRoute = () => (
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
              <SvgXml width={40} height={40} xml={IcWarningRound} />
            </View>
            <View style={[styles.col85, styles.pl10]}>
              <Text style={[styles.fs12, styles.fontWSB, styles.black]}>
                Pilih Salah Satu Jalur Interaksi
              </Text>
              <Text style={[styles.fs12, styles.fontWSR, styles.black]}>
                Jangan memberikan Kode PIN, Kode OTP serta Kode Rahasia lainnya,
                kepada siapapun dengan alasan apapun
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
                  {data.profileMessangerStatus === 'on' ? 'Online' : 'Offline'}
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
            onPress={() => {makeCall()}}>
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
        {/* <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#DDD')}
          onPress={() => {
            if (data.profileChatStatus === 'on') {
              navigation.navigate('Chat');
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
            <View style={[styles.col10, styles.center]}>
              <SvgXml width={24} height={24} xml={IconLiveChat} />
            </View>
            <View style={[styles.col80, styles.pl5, styles.pr10]}>
              <View style={styles.row}>
                <Text style={[styles.fs13, styles.fontWSB, styles.black]}>
                  Live Chat CS
                </Text>
              </View>

              <Text
                style={[
                  styles.fs10,
                  styles.fontWSB,
                  data.profileChatStatus === 'on'
                    ? styles.online
                    : styles.grey75,
                  styles.mt5,
                ]}>
                {data.profileChatStatus === 'on' ? 'Online' : 'Offline'}
              </Text>
            </View>
            <View style={[styles.col10, styles.center]}>
              <SvgXml width={20} height={20} xml={IconRightArrow} />
            </View>
          </View>
        </TouchableNativeFeedback> */}
      </View>
    </ScrollView>
  );

  const SecondRoute = () => (
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
              <SvgXml width={40} height={40} xml={IcWarningRound} />
            </View>
            <View style={[styles.col85, styles.pl10]}>
              <Text style={[styles.fs12, styles.fontWSB, styles.black]}>
                Waspada
              </Text>
              <Text style={[styles.fs12, styles.fontWSR, styles.black]}>
                Hati-hati dengan akun palsu yang mengatasnamakan Uwang,
                kami tidak pernah menghubungi pengguna lebih awal
              </Text>
            </View>
          </View>
      
        </View>
      </View>

      <View style={[styles.mb10]}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#DDD')}
          onPress={() => {
            Linking.openURL(`http://maps.google.com/?q=${data.profileName}`);
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
              <SvgXml width={24} height={24} xml={IconMarker} />
            </View>
            <View style={[styles.col80, styles.pl5, styles.pr10]}>
              <Text style={[styles.fs13, styles.fontWSB, styles.black]}>
                Alamat Kantor Pusat
              </Text>
              <Text
                style={[
                  styles.fs10,
                  styles.fontWSR,
                  styles.grey75,
                  styles.mt2,
                ]}>
                {data.profileName}
                {'\n'}
                {data.profileAddress}
              </Text>
            </View>
            <View style={[styles.col10, styles.center]}>
              <SvgXml width={20} height={20} xml={IconRightArrow} />
            </View>
          </View>
        </TouchableNativeFeedback>
        {data.profileWebsite ? (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#DDD')}
            onPress={() => {
              Linking.openURL(`${data.profileWebsite}`);
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
                <SvgXml width={24} height={24} xml={IconWebsite} />
              </View>
              <View style={[styles.col80, styles.pl5, styles.pr10]}>
                <Text style={[styles.fs13, styles.fontWSB, styles.black]}>
                  Website
                </Text>
                <Text
                  style={[
                    styles.fs11,
                    styles.fontWSR,
                    styles.grey75,
                    styles.mt2,
                  ]}>
                  {data.profileWebsite}
                </Text>
              </View>
              <View style={[styles.col10, styles.center]}>
                <SvgXml width={20} height={20} xml={IconRightArrow} />
              </View>
            </View>
          </TouchableNativeFeedback>
        ) : null}
        {data.profileTelegram_channel ? (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#DDD')}
            onPress={() => {
              Linking.openURL(data.profileTelegram_channel);
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
                <Text style={[styles.fs13, styles.fontWSB, styles.black]}>
                  Telegram Channel
                </Text>
                <Text
                  style={[
                    styles.fs11,
                    styles.fontWSR,
                    styles.grey75,
                    styles.mt2,
                  ]}>
                  Official Telegram Uwang
                </Text>
              </View>
              <View style={[styles.col10, styles.center]}>
                <SvgXml width={20} height={20} xml={IconRightArrow} />
              </View>
            </View>
          </TouchableNativeFeedback>
        ) : null}
        {data.profileFacebook ? (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#DDD')}
            onPress={() => {
              Linking.openURL(data.profileFacebook);
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
                <SvgXml width={24} height={24} xml={IconFb} />
              </View>
              <View style={[styles.col80, styles.pl5, styles.pr10]}>
                <Text style={[styles.fs13, styles.fontWSB, styles.black]}>
                  Facebook
                </Text>
                <Text
                  style={[
                    styles.fs11,
                    styles.fontWSR,
                    styles.grey75,
                    styles.mt2,
                  ]}>
                  Official Facebook Uwang
                </Text>
              </View>
              <View style={[styles.col10, styles.center]}>
                <SvgXml width={20} height={20} xml={IconRightArrow} />
              </View>
            </View>
          </TouchableNativeFeedback>
        ) : null}
        {data.profileInstagram ? (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#DDD')}
            onPress={() => {
              Linking.openURL(data.profileInstagram);
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
                <SvgXml width={24} height={24} xml={IconIg} />
              </View>
              <View style={[styles.col80, styles.pl5, styles.pr10]}>
                <Text style={[styles.fs13, styles.fontWSB, styles.black]}>
                  Instagram
                </Text>
                <Text
                  style={[
                    styles.fs11,
                    styles.fontWSR,
                    styles.grey75,
                    styles.mt2,
                  ]}>
                  Official Instagram Uwang
                </Text>
              </View>
              <View style={[styles.col10, styles.center]}>
                <SvgXml width={20} height={20} xml={IconRightArrow} />
              </View>
            </View>
          </TouchableNativeFeedback>
        ) : null}
        {data.profileTwitter ? (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#DDD')}
            onPress={() => {
              Linking.openURL(data.profileTwitter);
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
                <SvgXml width={24} height={24} xml={IconTwitter} />
              </View>
              <View style={[styles.col80, styles.pl5, styles.pr10]}>
                <Text style={[styles.fs13, styles.fontWSB, styles.black]}>
                  Twitter
                </Text>
                <Text
                  style={[
                    styles.fs11,
                    styles.fontWSR,
                    styles.grey75,
                    styles.mt2,
                  ]}>
                  Official Twitter Uwang
                </Text>
              </View>
              <View style={[styles.col10, styles.center]}>
                <SvgXml width={20} height={20} xml={IconRightArrow} />
              </View>
            </View>
          </TouchableNativeFeedback>
        ) : null}
        {data.profileLinkedin ? (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#DDD')}
            onPress={() => {
              Linking.openURL(data.profileLinkedin);
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
                <SvgXml width={24} height={24} xml={IconLinkedin} />
              </View>
              <View style={[styles.col80, styles.pl5, styles.pr10]}>
                <Text style={[styles.fs13, styles.fontWSB, styles.black]}>
                  Linkedin
                </Text>
                <Text
                  style={[
                    styles.fs11,
                    styles.fontWSR,
                    styles.grey75,
                    styles.mt2,
                  ]}>
                  Official Linkedin Uwang
                </Text>
              </View>
              <View style={[styles.col10, styles.center]}>
                <SvgXml width={20} height={20} xml={IconRightArrow} />
              </View>
            </View>
          </TouchableNativeFeedback>
        ) : null}
        {data.profileTiktok && data.profileTiktok !== '#' ? (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#DDD')}
            onPress={() => {
              Linking.openURL(data.profileTiktok);
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
                <SvgXml width={24} height={24} xml={IconTiktok} />
              </View>
              <View style={[styles.col80, styles.pl5, styles.pr10]}>
                <Text style={[styles.fs13, styles.fontWSB, styles.black]}>
                  TikTok
                </Text>
                <Text
                  style={[
                    styles.fs11,
                    styles.fontWSR,
                    styles.grey75,
                    styles.mt2,
                  ]}>
                  Official TikTok Uwang
                </Text>
              </View>
              <View style={[styles.col10, styles.center]}>
                <SvgXml width={20} height={20} xml={IconRightArrow} />
              </View>
            </View>
          </TouchableNativeFeedback>
        ) : null}
        {data.profileYoutube && data.profileYoutube !== '#' ? (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#DDD')}
            onPress={() => {
              Linking.openURL(data.profileYoutube);
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
                <SvgXml width={24} height={24} xml={IconYoutube} />
              </View>
              <View style={[styles.col80, styles.pl5, styles.pr10]}>
                <Text style={[styles.fs13, styles.fontWSB, styles.black]}>
                  YouTube
                </Text>
                <Text
                  style={[
                    styles.fs11,
                    styles.fontWSR,
                    styles.grey75,
                    styles.mt2,
                  ]}>
                  Official YouTube Uwang
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
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props) => {
    return (
      <TabBar
        style={{
          backgroundColor: '#FFFFFF',
          elevation: 0,
          borderColor: '#ddd',
          borderBottomWidth: 1,
          height: 55,
        }}
        inactiveColor="#000000"
        activeColor="#4F6CFF"
        labelStyle={[
          {
            textTransform: 'capitalize',
          },
          styles.fontWSM,
          styles.mt5,
        ]}
        {...props}
        indicatorStyle={{backgroundColor: '#4F6CFF', height: 2.5}}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Hubungi Kami'}
        shadow={true}
        right={false}
      />
      <TabView
        indicatorStyle={{backgroundColor: 'white'}}
        style={{backgroundColor: 'pink'}}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

export default Hubungi;
