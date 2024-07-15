import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Share,
} from 'react-native';
// import Clipboard from '@react-native-community/clipboard';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/Header';
import IconShare from '../../assets/svg/share.svg';
import IconCopy from '../../assets/svg/copypaste.svg';
import {getSnackBar_success} from '../../helpers/Helpers';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const PesanDetail = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState(params.detail);

  const share = async () => {
    try {
      const result = await Share.share({
        message: detail.message,
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
    getSnackBar_success({
      title: 'Pesan telah dicopy',
      duration: 'LENGTH_LONG',
    });
    // Clipboard.setString(detail.message);
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
        title={'Topinfo'}
        shadow={true}
        right={false}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={[styles.bgWhite]}>
        <View style={[styles.bxListPesan]}>
          <View style={[styles.boxDesPesanDetail, styles.mt20]}>
            {/* <Text
              style={[
                styles.leftText,
                styles.grey92,
                styles.fs11,
                styles.mb10,
              ]}>
              {moment(detail.date).format('LLLL')}
            </Text> */}
            <Text style={[styles.textDesPesanDetail, styles.leftText]}>
              {detail.message}
            </Text>
          </View>
          <View style={[styles.row, styles.pl10, styles.pr10]}>
            <View style={styles.col80} />
            <View style={[styles.col10, styles.centerContent]}>
              <TouchableOpacity
                onPress={() => {
                  copy();
                }}
                selectable={true}
                style={[styles.btnDefauldBold, styles.mt5, styles.mb5Te]}>
                <SvgXml width={23} height={23} xml={IconCopy} />
              </TouchableOpacity>
            </View>
            <View style={[styles.col10, styles.centerContent]}>
              <TouchableOpacity
                onPress={() => {
                  share();
                }}
                selectable={true}
                style={[styles.btnDefauldBold, styles.mt5, styles.mb5Te]}>
                <SvgXml width={23} height={23} xml={IconShare} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PesanDetail;
