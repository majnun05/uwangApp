import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Gap = ({height, width, backgroundColor}) => {
  return (
    <View
      style={{
        height: height,
        width: width,
        backgroundColor: backgroundColor,
      }}></View>
  );
};

export default Gap;

const styles = StyleSheet.create({});
