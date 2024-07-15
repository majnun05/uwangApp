import React from 'react';
import {StyleSheet, View, StatusBar, TouchableOpacity} from 'react-native';
import {Text} from '../../../components';
import {IconBackWhite} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import FromTo from './FromTo';

const Header = ({title, onPressBack, type, from, to}) => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar animated={true} backgroundColor="#00A79D" />
      <View style={styles.container(type)}>
        <TouchableOpacity
          style={styles.left}
          onPress={() => (onPressBack ? onPressBack() : navigation.goBack())}>
          <SvgXml xml={IconBackWhite} style={styles.iconBack} />
        </TouchableOpacity>
        {/*  */}
        {type === 'fromto' ? (
          <FromTo from={from} to={to} />
        ) : (
          <View style={styles.center}>
            <Text type="secondary" weight="semibold" size={16} color="white">
              {title}
            </Text>
          </View>
        )}
        <View style={styles.right}></View>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: type => ({
    backgroundColor: '#00A79D',
    paddingHorizontal: 25,
    paddingVertical: type === 'fromto' ? 15 : 23,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  left: {
    width: '15%',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    width: '15%',
  },
});
