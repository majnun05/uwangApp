import React from 'react';
import {View, Text} from 'react-native';
import IconPts from '../../assets/svg/pts.svg';
import styles from '../../assets/styles/Style';
import {SvgXml} from 'react-native-svg';
import Ripple from 'react-native-material-ripple';

const ContentProduk = (props) => {
  return (
    <Ripple
      onPress={props.onPress}
      style={
        props.column
          ? [styles.rowList2Column, styles.pl10]
          : [styles.rowListPulsa, styles.pl10]
      }>
      {props.isBug ? (
        <View style={styles.boxGangguan}>
          <Text style={[styles.fs9, styles.white, styles.fontWSR]}>
            Gangguan
          </Text>
        </View>
      ) : (
        <View style={styles.boxTersedia}>
          <Text style={[styles.fs9, styles.white, styles.fontWSR]}>
            Tersedia
          </Text>
        </View>
      )}
      <View style={[styles.mt5]}>
        <Text
          style={styles.textListPulsa}
          numberOfLines={2}
          ellipsizeMode="tail">
          {props.productName}
        </Text>
      </View>
      {/* <View style={[styles.row]}>
        <SvgXml width={13} height={13} style={styles.mt5} xml={IconPts} />
        <Text
          style={[
            styles.fs12,
            styles.orange,
            styles.rightText,
            styles.fontWSB,
          ]}>
          {props.point} POIN
        </Text>
      </View> */}
    </Ripple>
  );
};

export default ContentProduk;
