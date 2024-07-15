import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import IconBack from '../../assets/svg/back.svg';

const HeaderHome = (props) => {
  return (
    <View style={props.shadow ? styles.headerGreen : styles.headerGreenNormal}>
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
              props.center ? styles.centerText : styles.leftText,
              styles.white,
              styles.fs17,
              styles.fontMSB,
            ]}>
            {props.title}
          </Text>
        </View>
        {props.right ? (
          <View
            style={[
              styles.col10,
              styles.pt7,
              styles.pb7,
              styles.centerContent,
            ]}>
            {props.right}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default HeaderHome;
