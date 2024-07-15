import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../../../components';

const DetailTime = ({fromTime, fromDate, toTime, toDate, duration}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text weight="bold" type="secondary" size={14} align="center">
          {fromTime}
        </Text>
        {fromDate ? (
          <Text size={12} color="#A1A1A1" align="center">
            {fromDate}
          </Text>
        ) : null}
      </View>
      <View>
        <Text color="#9F9F9F" size={11}>
          {duration}
        </Text>
      </View>
      <View>
        <Text weight="bold" type="secondary" size={14} align="center">
          {toTime}
        </Text>
        {toDate ? (
          <Text size={12} color="#A1A1A1" align="center">
            {toDate}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default DetailTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
