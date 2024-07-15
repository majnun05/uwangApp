import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import styles from '../../assets/styles/Style';
import {SvgXml} from 'react-native-svg';
import IconWarning from '../../assets/svg/warning-yellow.svg';
import Modal from 'react-native-modal';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const ModalSuccessCenter = (props) => {
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
      style={[styles.modalsSuccess, styles.mr30, styles.ml30]}>
      <SafeAreaView style={[styles.modalsBodySuccess, styles.center]}>
        <View style={[styles.pl20, styles.pr20]}>
          <View style={[styles.center, styles.mb30, styles.mt30]}>
            <SvgXml width={40} height={40} xml={IconWarning} />
            <Text
              style={[styles.fontWSB, styles.black, styles.fs17, styles.mt10]}>
              {props.title}
            </Text>

            <Text
              style={[
                styles.fontWSR,
                styles.black,
                styles.fs12,
                styles.centerText,
              ]}>
              {props.message}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalSuccessCenter;
