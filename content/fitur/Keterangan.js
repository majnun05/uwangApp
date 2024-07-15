import React from 'react';
import {View, Text, Image} from 'react-native';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import IconWarning from '../../assets/svg/warning.svg';
import IconIntersect from '../../assets/svg/intersect2.svg';
import { IcWarningRound } from '../../assets';

const Keterangan = (props) => {
  return (
    <View
      style={[
        styles.keteranganBaru,
        styles.mt5,
        styles.pt20,
        styles.pb20,
        props.menu === 'streaming' ? styles.ml5 : styles.ml15,
        props.menu === 'streaming' ? styles.mr5 : styles.mr15,
      ]}>
      <View style={styles.row}>
        <View style={[styles.col15, styles.centerOnly, styles.pt5]}>
          <SvgXml width={40} height={40} xml={IcWarningRound} />
        </View>
        <View style={[styles.col85, styles.pl10]}>
          <Text style={[styles.fs12, styles.fontWSB, styles.black]}>
            {props.title}
          </Text>
          {props.image ? (
            <Image
              resizeMethod="resize"
              style={{
                alignSelf: 'flex-end',
                alignItems: 'flex-end',
                justifyContent: 'center',
                width: '100%',
                height: 50,
                resizeMode: 'contain',
              }}
              source={{uri: props.image}}
            />
          ) : null}
          <Text style={[styles.fs12, styles.fontWSR, styles.black]}>
            {props.msg}
          </Text>
        </View>
      </View>
      {/* <View
        style={{
          position: 'absolute',
          zIndex: -1,
          bottom: -6,
          right: 0,
          borderTopRightRadius: 100,
          borderTopLeftRadius: 100,
        }}>
        <SvgXml width={70} height={70} xml={IconIntersect} />
      </View> */}
    </View>
  );
};

export default Keterangan;
