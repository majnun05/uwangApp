import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';

import styles from '../../assets/styles/Style';
import IconBack from '../../assets/svg/back.svg';
import IconLengkung from '../../assets/svg/lengkung-muda.svg';
import IconTitik from '../../assets/svg/titik.svg';

const HeaderOperator = (props) => {
  return (
    <View style={[styles.headerGreenNormal, {paddingBottom: 60}]}>
      <View style={styles.row}>
        <View style={[styles.col10, styles.centerContent]}>
          <TouchableOpacity onPress={props.onBack}>
            <SvgXml width={23} height={23} xml={IconBack} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            props.right === false ? styles.col90 : styles.col80,
            styles.centerContent,
            styles.pl5,
          ]}>
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
          <View style={[styles.col10, styles.centerContent]}>
            {props.right}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default HeaderOperator;
