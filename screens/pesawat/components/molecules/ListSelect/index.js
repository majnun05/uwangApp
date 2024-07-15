import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Text} from '../../../components';
import {IconCheck} from '../../../assets';
import {SvgXml} from 'react-native-svg';

const ListSelect = ({title, onPress, checked, imageUrl}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container(imageUrl)}>
      {imageUrl ? (
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{
            uri: imageUrl,
          }}
        />
      ) : null}
      <View style={styles.left}>
        <Text size={14} weight="semibold">
          {title}
        </Text>
      </View>
      {checked ? <SvgXml xml={IconCheck} /> : null}
    </TouchableOpacity>
  );
};

export default ListSelect;

const styles = StyleSheet.create({
  container: imageurl => ({
    borderBottomWidth: 1,
    borderColor: '#DBDBDB',
    paddingVertical: imageurl ? 15 : 20,
    flexDirection: 'row',
    alignItems: 'center',
  }),
  image: {
    width: 29,
    height: 29,
    marginRight: 12,
  },
  left: {
    flex: 1,
  },
});
