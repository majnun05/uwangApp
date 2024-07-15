import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import styles from '../../assets/styles/Style';
import {getSession} from '../../helpers/Helpers';
import Ripple from 'react-native-material-ripple';

const ContentZakat = (props) => {
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
    <Ripple style={styles.rowList2Column} onPress={props.onPress}>
      <View style={styles.rowProductZkat}>
        <Image
          resizeMethod="resize"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            height: 50,
          }}
          source={{
            uri: props.image ? props.image : imageDefault,
          }}
          resizeMode={'contain'}
        />
        <Text
          style={[styles.titleProductZakat, styles.mt5]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {props.productName}
        </Text>
      </View>
    </Ripple>
  );
};

export default ContentZakat;
