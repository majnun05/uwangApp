import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import {IconCaret, IconInfo} from '../../../assets';
import {SvgXml} from 'react-native-svg';
import {Text} from '../../../components';

const Input = ({
  label,
  placeholder,
  desc,
  onPress,
  keyboardType,
  onChangeText,
  value,
  isText,
}) => {
  return (
    <View>
      {label ? <Text weight="bold">{label}</Text> : null}
      {isText ? (
        <TouchableOpacity style={styles.textWrapper} onPress={onPress}>
          {value === '' ? (
            <Text color="#757575">{placeholder}</Text>
          ) : (
            <Text>{value}</Text>
          )}
          <SvgXml xml={IconCaret} />
        </TouchableOpacity>
      ) : (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#757575"
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          value={value}
        />
      )}
      {desc ? (
        <View style={styles.desc}>
          <SvgXml xml={IconInfo} />
          <Text size={10} color="#767676" style={styles.descText}>
            {desc}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  textWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    paddingVertical: 13,
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    paddingVertical: 13,
    paddingHorizontal: 0,
  },
  desc: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
  },
  descText: {
    marginLeft: 6,
    flex: 1,
  },
});
