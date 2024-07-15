import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';

import styles from '../../assets/styles/Style';
import IconBack from '../../assets/svg/back-green.svg';
import IconBackBlack from '../../assets/svg/back-black.svg';

const HeaderWhite = (props) => {
  return (
    <View style={props.shadow ? styles.headerWhite : styles.headerWhiteNormal}>
      <View style={styles.row}>
        <View style={[styles.col10, styles.centerContent]}>
          <TouchableOpacity onPress={props.onBack}>
            {props.textLeft ? (
              <SvgXml width={23} height={23} xml={IconBackBlack} />
            ) : (
              <SvgXml
                width={23}
                height={23}
                xml={props.textBlack ? IconBackBlack : IconBackBlack}
              />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={[
            props.right === false ? styles.col90 : styles.col80,
            styles.centerContent,
            styles.pl5,
          ]}>
          {props.textLeft ? (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.leftText,
                styles.black,
                styles.fs17,
                styles.fontMSB,
              ]}>
              {props.title}
            </Text>
          ) : (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={
                props.textBlack
                  ? [
                      styles.centerText,
                      styles.black,
                      styles.fs17,
                      styles.fontMSB,
                    ]
                  : [styles.leftText, styles.blue, styles.fs17, styles.fontMSB]
              }>
              {props.title}
            </Text>
          )}
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

export default HeaderWhite;
