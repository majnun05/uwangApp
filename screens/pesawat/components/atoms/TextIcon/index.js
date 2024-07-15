import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../Text';
import {SvgXml} from 'react-native-svg';

const TextIcon = ({
  children,
  weight,
  size,
  color,
  type,
  align,
  style,
  full,
  numberOfLines,
  icon,
}) => {
  return (
    <View style={styles.container}>
      <SvgXml xml={icon} />
      <Text
        weight={weight}
        size={size}
        color={color}
        type={type}
        align={align}
        style={style}
        full={full}
        numberOfLines={numberOfLines}>
        {children}
      </Text>
    </View>
  );
};

export default TextIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
