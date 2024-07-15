import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import IconLogo from '../../assets/svg/logoTextGreen.svg';

const Loading = (props) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={(styles.mt20, {marginLeft: 20, marginTop: 20})}>
        <SvgXml width="120" height="50" xml={IconLogo} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#4F6CFF" />
        <Text style={[styles.fontWSM, styles.fs15, styles.grey75, styles.mt10]}>
          Mohon Tunggu Sebentar ...
        </Text>
      </View>
    </View>
  );
};

export default Loading;
