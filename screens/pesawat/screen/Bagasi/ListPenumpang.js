import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Gap, Text} from '../../components';
import {IconBagasiGrey} from '../../assets';
import {SvgXml} from 'react-native-svg';

const ListPenumpang = ({name, bagasi, imageUrl}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.row}>
          <View style={styles.circle} />
          <Gap width={9} />
          <Text weight="bold">{name}</Text>
        </View>
        <Gap height={5} />
        <View style={styles.row}>
          <SvgXml xml={IconBagasiGrey} />
          <Gap width={9} />
          <Text color="#838383">Bagasi : {bagasi}</Text>
        </View>
      </View>
      <Image
        resizeMode="contain"
        source={{uri: imageUrl}}
        style={styles.image}
      />
    </View>
  );
};

export default ListPenumpang;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DEDEDE',
    paddingHorizontal: 13,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flex: 1,
  },
  circle: {
    backgroundColor: '#00A79D',
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
  },
  image: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
