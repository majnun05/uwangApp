import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '../../../components';
import {IconPencilPrimary, IconRightPrimary} from '../../../assets';
import {SvgXml} from 'react-native-svg';

const CardTouch = ({title, onPress, icon}) => {
  const Icon = () => {
    if (icon === 'pencil') {
      return <SvgXml xml={IconPencilPrimary} />;
    }
    return <SvgXml xml={IconRightPrimary} />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text weight="semibold" color="#00A79D" style={styles.text}>
        {title}
      </Text>
      {Icon()}
    </TouchableOpacity>
  );
};

export default CardTouch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    padding: 14,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    marginRight: 14,
    flex: 1,
  },
});
