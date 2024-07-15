import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Text} from '../../../components';
import {IconChecked} from '../../../assets';
import {SvgXml} from 'react-native-svg';

const Checkbox = ({label, checked, mb, imageUrl, onPress, withImage}) => {
  return (
    <TouchableOpacity style={styles.container(mb)} onPress={onPress}>
      <View style={styles.left}>
        {imageUrl ? (
          <View>
            <Image
              source={{uri: imageUrl}}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
        ) : (
          <>
            {withImage ? (
              <View
                style={{
                  width: 40,
                  height: 35,
                  backgroundColor: '#ddd',
                  marginRight: 5,
                  borderRadius: 5,
                }}
              />
            ) : null}
          </>
        )}
        <Text size={14}>{label}</Text>
      </View>
      {checked ? (
        <SvgXml xml={IconChecked} />
      ) : (
        <View style={styles.box}></View>
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: (mb) => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mb ? mb : 0,
  }),
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  box: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#757575',
    width: 19,
    height: 19,
  },
});
