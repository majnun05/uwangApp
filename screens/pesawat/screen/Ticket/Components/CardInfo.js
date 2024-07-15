import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '../../../components';
import {IconPencilGreen, IconPeopleGreen} from '../../../assets';
import {SvgXml} from 'react-native-svg';

const CardInfo = ({destination, date, passenger, cabin, onEdit}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.col}>
          <Text numberOfLines={1} weight="semibold" style={styles.text}>
            {destination}
          </Text>
        </View>
        <View style={styles.border}></View>
        <View style={styles.col}>
          <Text numberOfLines={1} weight="semibold" style={styles.text}>
            {date}
          </Text>
        </View>
        <View style={styles.border}></View>
        <View style={styles.row}>
          <SvgXml xml={IconPeopleGreen} />
          <Text numberOfLines={1} weight="semibold" style={styles.text}>
            {passenger}
          </Text>
        </View>
        <View style={styles.border}></View>
        <View style={styles.col}>
          <Text numberOfLines={1} weight="semibold" style={styles.text}>
            {cabin}
          </Text>
        </View>
        {onEdit ? (
          <TouchableOpacity style={styles.pencil} onPress={onEdit}>
            <SvgXml xml={IconPencilGreen} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default CardInfo;

const styles = StyleSheet.create({
  container: {
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    backgroundColor: 'white',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontSize: 12,
    color: '#4F6CFF',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  col: {
    marginTop: 2,
    maxWidth: 100,
  },
  border: {
    width: 1,
    height: 22,
    backgroundColor: '#4F6CFF',
    marginHorizontal: 5,
  },
  pencil: {},
});
