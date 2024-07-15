import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text} from '../../../components';
import {IconPlus, IconMin} from '../../../assets';
import {SvgXml} from 'react-native-svg';

const CountPicker = ({title, desc, value, onPressMin, onPressPlus}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text weight="semibold" size={16}>
          {title}
        </Text>
        <Text size={13} color="#B0B0B0">
          {desc}
        </Text>
      </View>
      <View style={styles.pickerWrapper}>
        <TouchableOpacity onPress={onPressMin}>
          <SvgXml xml={IconMin} />
        </TouchableOpacity>
        <View style={styles.count}>
          <Text size={18}>{value}</Text>
        </View>
        <TouchableOpacity onPress={onPressPlus}>
          <SvgXml xml={IconPlus} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CountPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flex: 1,
  },
  count: {
    marginHorizontal: 22,
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
