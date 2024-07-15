import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../../assets/styles/Style';

import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const win = Dimensions.get('window');

const QrisImage = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [barcode, setBarcode] = useState(params.barcode);
  const [qris_bg, setQris_bg] = useState(params.qris_bg);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack(null);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <ImageBackground
        resizeMethod="resize"
        source={{
          uri: qris_bg,
        }}
        style={styles.bgQrisFull}
        resizeMode="cover">
        <Image
          resizeMethod="resize"
          resizeMode={'stretch'}
          style={[
            {
              height: win.width + 130,
              width: '100%',
              borderRadius: 10,
              top: '18%',
              marginBottom: 35,
            },
          ]}
          source={{
            uri: barcode,
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default QrisImage;
