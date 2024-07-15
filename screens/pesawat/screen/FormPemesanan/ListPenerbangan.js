import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Gap, Text} from '../../components';
import {IconCaret} from '../../assets';
import {SvgXml} from 'react-native-svg';

const ListPenerbangan = ({onPress, title, desc}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.row}>
        <View>
          <Text size={14} weight="semibold">
            {title}
          </Text>
          <Gap height={3} />
          <Text size={12} color="#959595">
            {desc}
          </Text>
        </View>
        <SvgXml xml={IconCaret} />
      </View>
    </TouchableOpacity>
  );
};

export default ListPenerbangan;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});
