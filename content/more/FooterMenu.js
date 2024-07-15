import React from 'react';
import {SvgXml} from 'react-native-svg';
import {View, Text} from 'react-native';
import Ripple from 'react-native-material-ripple';
import styles from '../../assets/styles/Style';
import HomeActive from '../../assets/svg/home/homeActive.svg';
import Home from '../../assets/svg/home/home.svg';
import PesanActive from '../../assets/svg/home/pesanActive.svg';
import Pesan from '../../assets/svg/home/pesan.svg';
import Riwayat from '../../assets/svg/home/riwayat.svg';
import RiwayatActive from '../../assets/svg/home/riwayatActive.svg';
import Hubungi from '../../assets/svg/home/hubungi.svg';
import HubungiActive from '../../assets/svg/home/hubungiActive.svg';
import Profile from '../../assets/svg/home/profile.svg';
import ProfileActive from '../../assets/svg/home/profileActive.svg';

const FooterMenu = (props) => {
  const pressButton = (link) => {
    props.navigation.navigate(link);
  };

  return (
    <View style={styles.footerTab}>
      <Ripple onPress={() => pressButton('Home')}>
        <View style={[styles.col175, styles.center]}>
          {props.menu === 'Home' ? (
            <SvgXml width={30} height={30} xml={HomeActive} />
          ) : (
            <SvgXml width={30} height={30} xml={Home} />
          )}

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={
              props.menu === 'Home'
                ? [styles.blue, styles.fs11, styles.fontWSB, styles.mt2]
                : [styles.grey75, styles.fs11, styles.fontWSR, styles.mt2]
            }
            uppercase={false}>
            Home
          </Text>
        </View>
      </Ripple>
      <Ripple onPress={() => pressButton('Pesan')}>
        <View style={[styles.col175, styles.center]}>
          {props.menu === 'Pesan' ? (
            <SvgXml width={30} height={30} xml={PesanActive} />
          ) : (
            <SvgXml width={30} height={30} xml={Pesan} />
          )}

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={
              props.menu === 'Pesan'
                ? [styles.blue, styles.fs11, styles.fontWSB, styles.mt2]
                : [styles.grey75, styles.fs11, styles.fontWSR, styles.mt2]
            }
            uppercase={false}>
            Pesan
          </Text>
        </View>
      </Ripple>
      <Ripple
        onPress={() => {
          pressButton('Hubungi');
        }}>
        <View style={[styles.col30, styles.center]}>
          {props.menu === 'Hubungi' ? (
            <SvgXml width={33} height={33} xml={HubungiActive} />
          ) : (
            <SvgXml width={33} height={33} xml={Hubungi} />
          )}

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={
              props.menu === 'Hubungi'
                ? [styles.blue, styles.fs11, styles.fontWSB, styles.mt2]
                : [styles.grey75, styles.fs11, styles.fontWSR, styles.mt2]
            }
            uppercase={false}>
            Hubungi Kami
          </Text>
        </View>
      </Ripple>
      <Ripple onPress={() => pressButton('Riwayat')}>
        <View style={[styles.col175, styles.center, styles.pr10]}>
          {props.menu === 'Riwayat' ? (
            <SvgXml width={30} height={30} xml={RiwayatActive} />
          ) : (
            <SvgXml width={30} height={30} xml={Riwayat} />
          )}

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={
              props.menu === 'Riwayat'
                ? [styles.blue, styles.fs11, styles.fontWSB, styles.mt2]
                : [styles.grey75, styles.fs11, styles.fontWSR, styles.mt2]
            }
            uppercase={false}>
            Riwayat
          </Text>
        </View>
      </Ripple>
      <Ripple onPress={() => pressButton('Profile')}>
        <View style={[styles.col175, styles.center]}>
          {props.menu === 'Profile' ? (
            <SvgXml width={30} height={30} xml={ProfileActive} />
          ) : (
            <SvgXml width={30} height={30} xml={Profile} />
          )}

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={
              props.menu === 'Profile'
                ? [styles.blue, styles.fs11, styles.fontWSB, styles.mt2]
                : [styles.grey75, styles.fs11, styles.fontWSR, styles.mt2]
            }
            uppercase={false}>
            Profile
          </Text>
        </View>
      </Ripple>
    </View>
  );
};

export default FooterMenu;
