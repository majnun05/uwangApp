//import libraries
import React from 'react';
import {View, Text} from 'react-native';
import Ripple from 'react-native-material-ripple';
import styles from '../../assets/styles/Style';

// make a component
const StatusKyc = (props) => {
  return (
    <Ripple onPress={props.onPress} style={[styles.pb5, {marginVertical:15}]}>
      <View style={[styles.row, styles.pl20, styles.pr20, styles.mb5]}>
        <View style={[styles.col70]}>
          <Text
            style={[
              styles.fontWSR,
              styles.fs12,
              styles.black,
              styles.leftText,
            ]}>
            {props.title}
          </Text>
          <Text
            style={[
              styles.fontWSR,
              styles.fs10,
              styles.grey75,
              styles.leftText,
            ]}>
            {props.subTitle}
          </Text>
        </View>
        <View style={[styles.col30]}>
          <View style={styles.btnlengkap}>
            <Text style={[styles.fontWSM, styles.fs12, styles.white]}>
              {props.btnTitle}
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.row, styles.pl20, styles.pr20]}>
        <View style={[styles.col90, styles.center]}>
          <View
            style={{
              backgroundColor: '#EBEBEB',
              width: '100%',
              height: 8,
              marginLeft: 20,
              marginRight: 20,
              borderRadius: 100,
            }}>
            <View
              style={{
                backgroundColor: '#4F6CFF',
                width: `${props.progress}`,
                height: 8,
                borderRadius: 100,
              }}
            />
          </View>
        </View>
        <View style={[styles.col10, styles.center]}>
          <Text style={[styles.fontWSM, styles.fs13, styles.black]}>
            {props.progress}
          </Text>
        </View>
      </View>
    </Ripple>
  );
};

// make the component available to other parts of the app
export default StatusKyc;
