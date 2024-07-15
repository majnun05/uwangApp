import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text, Gap} from '../../../components';
import {IconBagasiGrey} from '../../../assets';
import {SvgXml} from 'react-native-svg';

const DetailBox = ({
  from,
  to,
  planeImage,
  planeName,
  planeNumber,
  classCabin,
  baggage,
  onDetail,
}) => {
  return (
    <>
      <Text weight="bold" size={14}>
        {from}
      </Text>
      {/* <Text color="#888888" size={12}>
        {airportFrom}
      </Text> */}
      <Gap height={15} />
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={[styles.row]}>
            <View>
              <Text weight="semibold">{planeName}</Text>
            </View>
            <Gap width={7} />
            {planeImage ? (
              <Image
                resizeMode="contain"
                style={{width: 40, height: 40}}
                source={{
                  uri: planeImage,
                }}
              />
            ) : null}
          </View>
          <View style={styles.row}>
            <View>
              <Text weight="semibold">{planeNumber}</Text>
            </View>
            <View style={styles.circle} />
            <View>
              <Text weight="semibold">{classCabin}</Text>
            </View>
          </View>
        </View>
        {baggage ? (
          <View style={styles.row}>
            <SvgXml xml={IconBagasiGrey} width={15} height={15} />
            <Gap width={7} />
            <View>
              <Text size={12}>Bagasi {baggage}</Text>
            </View>
          </View>
        ) : null}
        {/* <Gap height={20} />
        <TouchableOpacity onPress={onDetail}>
          <View style={[styles.row, {justifyContent: 'center'}]}>
            <Text color="#00A79D" weight="bold" size={12}>
              Lihat Lebih Banyak
            </Text>
            <Gap width={7} />
            <SvgXml xml={IconDown} width={12} height={12} />
          </View>
        </TouchableOpacity> */}
      </View>
      <Gap height={15} />
      <Text weight="bold" size={14}>
        {to}
      </Text>
      {/* <Text color="#888888" size={12}>
        {airportTo}
      </Text> */}
    </>
  );
};

export default DetailBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAF9F9',
    borderRadius: 6,
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  top: {
    borderBottomWidth: 1,
    borderColor: '#DADADA',
    paddingBottom: 5,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  circle: {
    backgroundColor: '#D8D8D8',
    width: 5,
    height: 5,
    borderRadius: 5 / 2,
    marginHorizontal: 5,
  },
});
