import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Gap} from '../../../components';
import {SvgXml} from 'react-native-svg';

const InputPesawat = ({label, value, onPress, icon}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text color="#A8A8A8" size={13} weight="semibold">
        {label}
      </Text>
      <Gap height={5} />
      <View style={styles.row}>
        <View style={styles.iconWrapper}>
          <SvgXml xml={icon} width="24" height="24" />
        </View>
        <Text size={14} weight="semibold">
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default InputPesawat;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#DBDBDB',
    paddingBottom: 6,
  },
  iconWrapper: {
    marginRight: 14,
  },
});
