import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import styles from '../../assets/styles/Style';
import {getSession} from '../../helpers/Helpers';
import Ripple from 'react-native-material-ripple';

const ContentGame = (props) => {
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
    <Ripple onPress={props.onPress} style={[styles.rowProductGame]}>
      <View style={styles.rowProductGameDalam}>
        <Image
          resizeMethod="resize"
          host="scrollImage"
          style={styles.iconProductGame}
          source={{
            uri: props.image ? props.image : imageDefault,
          }}
        />
      </View>
      <Text
        style={styles.titleProductGame}
        numberOfLines={2}
        ellipsizeMode="tail">
        {props.operatorName}
      </Text>
    </Ripple>
  );
};

export default ContentGame;
