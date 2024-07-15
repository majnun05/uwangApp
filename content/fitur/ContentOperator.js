import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import IconRightList from '../../assets/svg/right-lists.svg';
import styles from '../../assets/styles/Style';
import {SvgXml} from 'react-native-svg';
import {getSession} from '../../helpers/Helpers';
import Ripple from 'react-native-material-ripple';

const ContentOperator = (props) => {
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
    <Ripple onPress={props.onPress} style={[styles.row, styles.rowListPage,]}>
      <View style={[styles.col15, styles.center]}>
        <Image
          resizeMethod="resize"
          host="scrollImage"
          source={{
            uri: props.image ? props.image : imageDefault,
          }}
          style={styles.imagePage}
          resizeMode={'contain'}
        />
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
          xml={IconRightList}
        />
      </View>
    </Ripple>
  );
};

export default ContentOperator;
