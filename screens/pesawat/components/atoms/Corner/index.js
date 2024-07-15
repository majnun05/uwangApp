import React from 'react';
import {StyleSheet, View} from 'react-native';

const Corner = ({height}) => {
  return (
    <View style={styles.container(height)}>
      <View style={styles.box}></View>
    </View>
  );
};

export default Corner;

const styles = StyleSheet.create({
  container: height => ({
    position: 'relative',
    height: height ? height : 100,
  }),
  box: {
    backgroundColor: '#00A79D',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: -20,
    right: -20,
  },
});
