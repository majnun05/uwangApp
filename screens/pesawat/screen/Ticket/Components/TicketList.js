import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Line from './Line';
import {Button, Text} from '../../../components';

const TicketList = ({
  imageUrl,
  maskapaiName,
  maskapaiCode,
  timeFrom,
  timeTo,
  codeTo,
  codeFrom,
  duration,
  price,
  onPressChoose,
  onPressDetail,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressChoose}>
        <View style={styles.top}>
          {imageUrl ? (
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={{
                uri: imageUrl,
              }}
            />
          ) : null}
          <Text
            style={[
              styles.textMaskapai,
              {
                marginLeft: imageUrl ? 6 : 0,
                marginRight: 6,
              },
            ]}
            type="secondary">
            {maskapaiName}
          </Text>
          <Text color="#808080">{maskapaiCode}</Text>
        </View>
        <View style={styles.center}>
          <View>
            <Text align="center" weight="bold" type="secondary" size={16}>
              {timeFrom}
            </Text>
            <Text align="center" weight="bold" type="secondary" size={16}>
              {codeFrom}
            </Text>
          </View>
          <View style={{flex: 1, marginHorizontal: 15}}>
            <Line />
            <Text color="#A1A1A1" align="center" size={12}>
              {duration}
            </Text>
          </View>
          <View>
            <Text align="center" weight="bold" type="secondary" size={16}>
              {timeTo}
            </Text>
            <Text align="center" weight="bold" type="secondary" size={16}>
              {codeTo}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.bottom}>
        <Text weight="bold" size={15} color="#00A79D">
          {price}{' '}
          <Text size={15} color="#B4B4B4">
            / Pax
          </Text>
        </Text>
        <Button
          type="outline-primary"
          onPress={onPressDetail}
          size="sm"
          pill
          title="Lihat Detail"
        />
      </View>
    </View>
  );
};

export default TicketList;

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
  center: {
    marginTop: 10,
    marginBottom: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 50,
    height: 50,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textMaskapai: {
    flex: 1,
  },
  bottom: {
    borderTopWidth: 1,
    borderColor: '#DBDBDB',
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
