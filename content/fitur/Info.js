//import libraries
import React from 'react';
import {View, Text, Linking, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import IconInformasi from '../../assets/svg/informasiNew.svg'; //../../assets/svg/informasi.svg
import IconRightArrow from '../../assets/svg/right-arrow.svg';
import styles from '../../assets/styles/Style';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

const Info = (props) => {
  const openLink = async (link) => {
    try {
      const url = link;
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#4F6CFF',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#4F6CFF',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
      } else Linking.openURL(url);
    } catch (error) {
      // console.log(error.message);
    }
  };

  return (
    <>
      {props.title ? (
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.guideInfo, styles.center, styles.mb20]}
          onPress={() => {
            if (props.link) {
              if (props.link !== '#') {
                openLink(props.link);
              }
            }
          }}>
          <View style={[styles.row, styles.pl10]}>
            <View style={[styles.center, styles.col10]}>
              <SvgXml
                width={40}
                height={40}
                style={styles.templateImageTheme}
                xml={IconInformasi}
              />
            </View>
            <View style={[styles.col80, styles.pl10, styles.centerContent]}>
              <Text
                style={[
                  styles.textOutline,
                  styles.black,
                  styles.fs12,
                  styles.fontWSB,
                ]}>
                {props.title}
              </Text>
            </View>
            <View style={[styles.centerContent, styles.col10]}>
              <SvgXml width={20} height={20} xml={IconRightArrow} />
            </View>
          </View>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export default Info;
