import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';

import styles from '../../assets/styles/Style';
import IconBack from '../../assets/svg/back.svg';

const HeaderRight = (props) => {
  return (
    <View style={props.shadow ? styles.headerGreen : styles.headerGreenNormal}>
      <View style={styles.row}>
        <View style={[styles.col10, styles.centerContent]}>
          <TouchableOpacity onPress={props.onBack}>
            <SvgXml width={23} height={23} xml={IconBack} />
          </TouchableOpacity>
        </View>
        <View style={props.scan ? [styles.col80, styles.centerContent, styles.pl5] : [styles.col40, styles.centerContent, styles.pl5]}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.leftText,
              styles.white,
              styles.fs17,
              styles.fontMSB,
            ]}>
            {props.title}
          </Text>
        </View>
        {props.right ? (
          <View style={[styles.col50, styles.centerContent]}>
            {props.right}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default HeaderRight;
