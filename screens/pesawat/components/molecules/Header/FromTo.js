import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconAirplane} from '../../../assets';
import {SvgXml} from 'react-native-svg';
import {Text} from '../../../components';
import {Gap} from '../../atoms';
const FromTo = ({from, to}) => {
  return (
    <>
      <View style={styles.row}>
        <View style={styles.leftColumn}>
          <Text
            type="secondary"
            weight="semibold"
            style={[styles.text, styles.textLeft]}
            numberOfLines={1}>
            {from}
          </Text>
        </View>
        <View style={styles.iconFromToWrapper}>
          <SvgXml xml={IconAirplane} />
          <Text color="white" style={styles.textDotted} numberOfLines={1}>
            -------
          </Text>
          <Gap height={13} />
        </View>
        <View style={styles.rightColumn}>
          <Text
            type="secondary"
            weight="semibold"
            style={[styles.text, styles.textRight]}
            numberOfLines={1}>
            {to}
          </Text>
        </View>
      </View>
    </>
  );
};

export default FromTo;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  textLeft: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'center',
  },
  leftColumn: {
    maxWidth: '35%',
  },
  rightColumn: {
    maxWidth: '35%',
  },
  iconFromToWrapper: {
    alignItems: 'center',
    marginHorizontal: 10,
    width: '30%',
  },
  textDotted: {
    letterSpacing: 2,
  },
});
