import React from 'react';
import {View, Text} from 'react-native';
import IconPts from '../../assets/svg/pts.svg';
import styles from '../../assets/styles/Style';
import {SvgXml} from 'react-native-svg';
import Ripple from 'react-native-material-ripple';

const ContentPulsa = (props) => {
  return (
    <Ripple
      onPress={props.onPress}
      style={[styles.rowList2Column, styles.pl10]}>
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
      <View style={[styles.mt10, styles.mb5]}>
        <Text
          style={[styles.textListPulsa, styles.fs14]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {props.productName}
        </Text>
      </View>
      <View style={[styles.row]}>
        <View style={[styles.col65]}>
          <Text style={[styles.fs13, styles.green, styles.fontWSB]}>
            {' '}
            Rp {props.price}
          </Text>
        </View>
        {/* <View style={[styles.col35, styles.centerContent]}>
          <View style={[styles.row, styles.rightText]}>
            <SvgXml width={13} height={13} style={styles.mt5} xml={IconPts} />
            <Text
              style={[
                styles.fs9,
                styles.orange,
                styles.rightText,
                styles.fontWSB,
              ]}>
              {props.point} POIN
            </Text>
          </View>
        </View> */}
      </View>
    </Ripple>
  );
};

export default ContentPulsa;
