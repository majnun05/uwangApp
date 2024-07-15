import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import styles from '../../assets/styles/Style';
import {SvgXml} from 'react-native-svg';
import IconCloseModal from '../../assets/svg/close-modal.svg';
import {getSession} from '../../helpers/Helpers';
import Modal from 'react-native-modal';

const ModalAds = (props) => {
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

  let {height, image} = props.popup;

  return (
    <Modal
      backdropOpacity={0.4}
      transparent={true}
      useNativeDriver={true}
      isVisible={props.isVisible}
      onBackdropPress={props.onSwipeComplete}
      onBackButtonPress={props.onSwipeComplete}
      onSwipeComplete={props.onSwipeComplete}
      //swipeDirection={['down', 'up', 'left', 'right']}
      swipeDirection={['down']}
      style={[styles.modalsAds, styles.mr20, styles.ml20]}>
      <SafeAreaView style={[styles.modalsBodyAds, styles.center]}>
        <TouchableOpacity
          style={[
            styles.rightText,
            {
              position: 'absolute',
              top: -60,
              right: -60,
              zIndex: 1,
              padding: 40,
            },
          ]}
          onPress={props.onPressClose}>
          <View
            style={{
              left: -5,
              top: 10,
            }}>
            <SvgXml width={35} height={35} xml={IconCloseModal} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.onPressModal}
          style={{
            width: '100%',
            height: height ? height : 350, //height ? height : 350 default 550
          }}>
          <Image
            resizeMethod="resize"
            style={{
              width: '100%',
              height: height ? height : 350, //height ? height : 350 default 550
            }}
            resizeMode={'stretch'}
            source={{
              uri: image ? image : imageDefault,
            }}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalAds;
