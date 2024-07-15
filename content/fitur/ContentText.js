import React from 'react';
import {View, Text, Image} from 'react-native';
import IconRightList from '../../assets/svg/right-arrow.svg';
import IconMarker from '../../assets/svg/hubungi/marker.svg';
import styles from '../../assets/styles/Style';
import {SvgXml} from 'react-native-svg';
import Ripple from 'react-native-material-ripple';

const ContentText = (props) => {
  return (
    <Ripple onPress={props.onPress} style={[styles.row, styles.rowListPage]}>
      <View style={[styles.col90, styles.centerContent, styles.pl10]}>
        <Text
          style={styles.textListRegion}
          numberOfLines={2}
          ellipsizeMode="tail">
          {props.name}
        </Text>
      </View>
      <View style={[styles.col10, styles.center]}>
        <SvgXml
          width={15}
          height={15}
          style={styles.rightText}
          xml={IconRightList}
        />
      </View>
    </Ripple>
  );
};

export default ContentText;
