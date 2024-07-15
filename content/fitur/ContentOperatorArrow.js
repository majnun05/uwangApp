import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import IconRightList from '../../assets/svg/right-arrow.svg';
import IconMarker from '../../assets/svg/hubungi/marker.svg';
import styles from '../../assets/styles/Style';
import {SvgXml} from 'react-native-svg';
import {getSession} from '../../helpers/Helpers';
import Ripple from 'react-native-material-ripple';
import { IcArrR } from '../../assets';

const ContentOperatorArrow = (props) => {
  const [imageDefault, setImageDefault] = useState('');
  let isMounted = true;

  const fetchData = async () => {
    let imgDef = await getSession('imageDefault').then((imageDefault) => {
      return imageDefault;
    });
    if (isMounted) {
      setImageDefault(imgDef);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Ripple
      onPress={props.onPress}
      style={[
        styles.row,
        props.shadow ? styles.rowListPageElevation : styles.rowListPage,
      ]}>
      <View style={[styles.col15, styles.center]}>
        {props.maps ? (
          <SvgXml width={23} height={23} xml={IconMarker} />
        ) : (
          <Image
            resizeMethod="resize"
            source={{
              uri: props.image ? props.image : imageDefault,
            }}
            resizeMode={'contain'}
            style={styles.imagePage}
          />
        )}
      </View>
      <View style={[styles.col75, styles.centerContent]}>
        <Text
          style={styles.textListRegion}
          numberOfLines={2}
          ellipsizeMode="tail">
          {props.operatorName}
        </Text>
      </View>
      <View style={[styles.col10, styles.center]}>
        <SvgXml
          width={15}
          height={15}
          style={styles.rightText}
          xml={IcArrR}
        />
      </View>
    </Ripple>
  );
};

export default ContentOperatorArrow;
