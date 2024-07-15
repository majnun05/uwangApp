import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Fonts} from '../../../../../assets/fonts/Fonts';

const TextComp = ({
  children,
  weight,
  size,
  color,
  type,
  align,
  style,
  full,
  numberOfLines,
}) => {
  let weightFont = Fonts.WSR;
  if (weight === 'bold') {
    weightFont = Fonts.WSB;
  }
  if (weight === 'semibold') {
    weightFont = Fonts.WSSB;
  }
  if (weight === 'bold' && type === 'secondary') {
    weightFont = Fonts.MB;
  }
  if (weight === 'semibold' && type === 'secondary') {
    weightFont = Fonts.MSB;
  }
  return (
    <Text
      style={[styles.text(size, color, weightFont, align, full), style]}
      numberOfLines={numberOfLines}
      allowFontScaling={false}>
      {children}
    </Text>
  );
};

export default TextComp;

const styles = StyleSheet.create({
  text: (size, color, weightFont, align, full) => ({
    color: color ? color : '#333333',
    fontSize: size ? size : 14,
    textAlign: align ? align : 'left',
    fontFamily: weightFont,
    flex: full ? 1 : 0,
  }),
});
