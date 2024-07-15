import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {IconMarkerGray} from '../../../assets';
import {SvgXml} from 'react-native-svg';

const Search = ({
  placeholder,
  noshadow,
  onChangeText,
  value,
  searchRef,
  noIcon,
  onKeyPress,
}) => {
  return (
    <View style={styles.container(noshadow)}>
      <TextInput
        ref={searchRef}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={'#BBBBBB'}
        onChangeText={onChangeText}
        onKeyPress={onKeyPress}
        value={value}
      />
      {noIcon ? null : <SvgXml xml={IconMarkerGray} />}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: (noshadow) => ({
    backgroundColor: '#F3F3F3',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: noshadow ? 0 : 0.8,
    shadowRadius: 2,
    elevation: noshadow ? 0 : 5,
    borderWidth: noshadow ? 1 : 0,
    borderColor: '#DBDBDB',
  }),
  input: {
    flex: 1,
    borderRadius: 6,
    color: 'black',
    paddingVertical: 10,
    fontSize: 14,
  },
});
