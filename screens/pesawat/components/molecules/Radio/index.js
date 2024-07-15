import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text} from '../../../components';

const Radio = ({onPress, label, checked}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.circle}>
        {checked && <View style={styles.circleInside}></View>}
      </View>
      <Text weight="semibold" color={checked ? '#00A79D' : '#A6A6A6'}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Radio;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 19,
    height: 19,
    borderRadius: 19 / 2,
    backgroundColor: '#EBEBEB',
    marginRight: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleInside: {
    width: 11,
    height: 11,
    borderRadius: 11 / 2,
    backgroundColor: '#00A79D',
  },
});
