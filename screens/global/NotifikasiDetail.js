import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  Text,
  Dimensions,
  Linking,
  useWindowDimensions,
  RefreshControl,
  InteractionManager,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import HTMLRender from 'react-native-render-html';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import IconMessage from '../../assets/svg/message.svg';
import {useApiPost, useError} from '../../helpers/useFetch';
import {apiUtilityNotificationDetail} from '../../helpers/endPoint';
import {getSnackBar_error, getSession, setSession} from '../../helpers/Helpers';
import moment from 'moment';
import 'moment/locale/id';
import { IcNotification } from '../../assets';
moment.locale('id');

const IMAGES_MAX_WIDTH = Dimensions.get('window').width - 50;
const CUSTOM_STYLES = {};
const CUSTOM_RENDERERS = {};
const DEFAULT_PROPS = {
  htmlStyles: CUSTOM_STYLES,
  renderers: CUSTOM_RENDERERS,
  imagesMaxWidth: IMAGES_MAX_WIDTH,
  onLinkPress: (evt, href) => {
    Linking.openURL(href);
  },
  debug: false,
};

const NotifikasiDetail = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState({
    __v: 0,
    _id: '',
    createdAt: '',
    description: '',
    link: '#',
    linkType: '0',
    target: '',
    title: '',
  });
  const [_id, set_id] = useState(params._id);
  const contentWidth = useWindowDimensions().width;
  const computeEmbeddedMaxWidth = (availableWidth) => {
    return Math.min(availableWidth, 500);
  };
  let isMounted = true;

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
  };

  const isLogged = async () => {
    await useApiPost(apiUtilityNotificationDetail(), {
      id: _id,
    })
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setDetail(val.values);
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

  const deleteDataNotif = async () => {
    let countBadge_ = await getSession('countBadge').then((countBadge) => {
      return countBadge ? countBadge.toString() : '0';
    });

    if (isMounted) {
      if (parseInt(countBadge_) > 0) {
        setSession({
          name: 'countBadge',
          value: parseInt(parseInt(countBadge_) - 1).toString(),
        });
      }
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
      deleteDataNotif();
    });

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Detail Notifikasi'}
        shadow={false}
        right={false}
      />
      {detail?.title ? (
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
            style={[styles.center, styles.pt10, styles.bgBlue, styles.mb10]}>
            <SvgXml
              width={35}
              height={35}
              style={{marginBottom: -15}}
              xml={IcNotification}
            />
          </View>
          <View style={[styles.bxListPesan]}>
            <View style={[styles.boxDesPesanDetail, styles.mb15]}>
              <Text
                style={[
                  styles.textDesPesanDetail,
                  styles.fontWSB,
                  styles.mb5,
                  styles.mt10,
                ]}>
                {detail?.title}
              </Text>
              <Text style={[styles.textCenter, styles.grey92, styles.fs11]}>
                {moment(detail?.createdAt).format('Do MMM YYYY')}
              </Text>
            </View>
            {detail?.description ? (
              <View
                style={{
                  paddingBottom: 20,
                  marginTop: 5,
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <HTMLRender
                  {...DEFAULT_PROPS}
                  source={{html: detail?.description}}
                  imagesMaxWidth={Dimensions.get('window').width}
                  tagsStyles={{
                    p: {
                      fontSize: 13,
                      letterSpacing: 0,
                      color: '#000000',
                    },
                  }}
                  contentWidth={contentWidth}
                  computeEmbeddedMaxWidth={computeEmbeddedMaxWidth}
                />
              </View>
            ) : null}
          </View>
        </ScrollView>
      ) : null}

      {detail?.link === '#' ? null : (
         <Ripple
         onPress={() => {
           if (detail.linkType === '1') {
             Linking.openURL(detail?.link);
           } else {
             navigation.navigate(detail?.link);
           }
         }}
         style={[
           styles.btnPrimary,
           styles.mr10,
           styles.mb10,
           styles.ml10,
           styles.mt10,
         ]}>
         <Text style={[styles.white, styles.fontWSR, styles.fs15]}>
           Kunjungi
         </Text>
       </Ripple>
      )}
    </SafeAreaView>
  );
};

export default NotifikasiDetail;
