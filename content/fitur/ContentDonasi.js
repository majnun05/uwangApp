import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import styles from '../../assets/styles/Style';
import {getSession} from '../../helpers/Helpers';
import Ripple from 'react-native-material-ripple';

const ContentDonasi = (props) => {
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
      style={[styles.rowList2Column, styles.pl10, styles.pt5]}>
      <View style={[styles.row]}>
        <View style={[styles.col80, styles.centerContent, styles.pr5]}>
          <Text
            style={[styles.textListPulsa, styles.fs15]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {props.productName}
          </Text>
        </View>
        <View style={[styles.col20, styles.centerContent]}>
          <View style={[styles.rightText]}>
            <Image
              resizeMethod="resize"
              style={{width: 35, height: 35}}
              source={{
                uri: props.image ? props.image : imageDefault,
              }}
              resizeMode={'contain'}
            />
          </View>
        </View>
      </View>
      <Text style={[styles.fs13, styles.green, styles.fontWSB]}>
        {' '}
        Rp {props.price}
      </Text>
    </Ripple>
  );
};

export default ContentDonasi;
