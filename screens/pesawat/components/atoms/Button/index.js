import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {Text} from '../../../components';
import {SvgXml} from 'react-native-svg';

const Button = ({
  type,
  title,
  onPress,
  size,
  disable,
  disableOpacity,
  loading,
  icon,
  pill,
}) => {
  let styleButton = {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 3,
    backgroundColor: '#4F6CFF',
    borderWidth: 1,
    borderColor: '#4F6CFF',
    alignItems: 'center',
  };
  let styleText = {
    color: 'white',
    fontSize: 14,
  };
  if (pill) {
    styleButton.borderRadius = 100;
  }
  if (disable) {
    styleButton.backgroundColor = '#FFBE77';
    styleButton.borderColor = '#FFBE77';
  }
  if (disableOpacity && disable) {
    styleButton.backgroundColor = '#F59500';
    styleButton.borderColor = '#F59500';
  }
  if (type === 'outline-primary') {
    styleButton.backgroundColor = 'transparent';
    styleText.color = '#4F6CFF';
  }
  if (type === 'secondary') {
    styleButton.backgroundColor = '#FF931C';
    styleButton.borderColor = '#FF931C';
    styleText.color = '#FFF';
  }
  if (type === 'outline-grey') {
    styleButton.backgroundColor = 'transparent';
    styleButton.borderColor = '#C4C4C4';
    styleText.color = '#C4C4C4';
  }
  if (type === 'grey') {
    styleButton.backgroundColor = '#EFEFEF';
    styleButton.borderColor = '#D1D1D1';
    styleText.color = '#757575';
  }
  if (size === 'sm') {
    styleText.fontSize = 13;
    styleButton.paddingHorizontal = 12;
    styleButton.paddingVertical = 5;
  }
  if (disable) {
    return (
      <View style={styleButton}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={
              type === 'outline-primary'
                ? '#4F6CFF'
                : type === 'grey'
                ? 'grey'
                : 'white'
            }
          />
        ) : (
          <View style={styles.buttonWrapper}>
            {icon && (
              <SvgXml xml={icon} width="20" height="20" style={styles.icon} />
            )}
            <Text weight="semibold" style={styleText}>
              {title}
            </Text>
          </View>
        )}
      </View>
    );
  }
  return (
    <TouchableOpacity style={styleButton} onPress={onPress}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            type === 'outline-primary'
              ? '#00A79D'
              : type === 'grey'
              ? 'grey'
              : 'white'
          }
        />
      ) : (
        <View style={styles.buttonWrapper}>
          {icon && (
            <SvgXml xml={icon} width="20" height="20" style={styles.icon} />
          )}
          <Text weight="semibold" style={styleText}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
});
