import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text} from '../../../components';

const ListTo = ({title, desc, label, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.left}>
        <Text weight="semibold">{title}</Text>
        <Text color="#757575" size={11}>
          {desc}
        </Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ListTo;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flex: 1,
  },
  label: {
    color: '#A9A9A9',
    backgroundColor: '#F0FAF9',
    borderRadius: 3,
    paddingHorizontal: 18,
    paddingVertical: 4,
  },
});
