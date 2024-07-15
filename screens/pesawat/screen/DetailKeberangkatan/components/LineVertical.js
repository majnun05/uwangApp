import React from 'react';
import {StyleSheet, View} from 'react-native';

const LineVertical = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle(false)} />
      <View style={styles.line} />
      <View style={styles.circle(true)} />
    </View>
  );
};

export default LineVertical;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  line: {
    width: 1,
    backgroundColor: '#00A79D',
    flex: 1,
  },
  circle: (bool) => ({
    width: 10,
    height: 10,
    marginTop: bool ? 0 : 5,
    borderWidth: 1,
    borderColor: '#00A79D',
    borderRadius: 10,
    backgroundColor: bool ? '#00A79D' : 'white',
  }),
});
