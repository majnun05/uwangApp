import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import styles from '../../assets/styles/Style';
import {getSession} from '../../helpers/Helpers';
import Ripple from 'react-native-material-ripple';

const ContentStream = (props) => {
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
    <View style={styles.rowProductStream}>
      <Ripple style={styles.rowProductStreamDalam} onPress={props.onPress}>
        <Image
          resizeMethod="resize"
          style={styles.iconProductStream}
          source={{
            uri: props.image ? props.image : imageDefault,
          }}
          resizeMode={'contain'}
        />
        <Text
          style={styles.titleProductStream}
          numberOfLines={2}
          ellipsizeMode="tail">
          {props.operatorName}
        </Text>
      </Ripple>
    </View>
  );
};

export default ContentStream;
