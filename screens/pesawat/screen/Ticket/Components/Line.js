import React from 'react';
import {StyleSheet, View} from 'react-native';

const Line = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle(false)} />
      <View style={styles.line} />
      <View style={styles.circle(true)} />
    </View>
  );
};

export default Line;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  line: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    flex: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    marginHorizontal: 5,
  },
  circle: bool => ({
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#4F6CFF',
    borderRadius: 10,
    backgroundColor: bool ? '#4F6CFF' : 'white',
  }),
});
