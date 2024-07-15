import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Modal from 'react-native-modal';
import {Fonts} from '../../assets/fonts/Fonts';
import IconCloseModal from '../../assets/svg/close-modal.svg';
import IconChat from '../../assets/svg/chat-notif.svg';

const ModalNotif = (props) => {
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
      style={[s.modalsNotif, s.mr20, s.ml20]}>
      <SafeAreaView style={[s.modalsBody, s.center]}>
        <View style={[s.row]}>
          <View style={[s.col10]} />
          <View style={[s.col80, s.center]}>
            <SvgXml width={100} height={100} xml={IconChat} />
          </View>
          {props.close ? (
            <TouchableOpacity onPress={props.onSwipeComplete} style={[s.col10]}>
              <SvgXml width={30} height={30} xml={IconCloseModal} />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={s.center}>
          <Text style={[s.title]}>{props.title}</Text>
          <Text style={[s.subTitle]}>{props.message}</Text>
        </View>

        <View style={[s.row, {marginTop: 20}]}>
          <View style={[s.col50, s.center, {paddingRight: 5}]}>
            <TouchableOpacity
              onPress={props.onPressClose}
              style={[s.btnActionOutline]}>
              <Text style={[s.textButton]}>{props.titleClose}</Text>
            </TouchableOpacity>
          </View>
          <View style={[s.col50, s.center, {paddingLeft: 5}]}>
            <TouchableOpacity onPress={props.onPress} style={[s.btnAction]}>
              <Text style={[s.textButtonActive]}>{props.titleButton}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalNotif;

const s = StyleSheet.create({
  btnActionOutline: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingVertical: 10,
    borderColor: '#EB5757',
    borderWidth: 1,
    width: '100%',
  },
  btnAction: {
    backgroundColor: '#EB5757',
    borderRadius: 5,
    paddingVertical: 10,
    borderColor: '#EB5757',
    borderWidth: 1,
    width: '100%',
  },
  textButton: {
    fontFamily: Fonts.WSB,
    color: '#EB5757',
    fontSize: 12,
    textAlign: 'center',
  },
  textButtonActive: {
    fontFamily: Fonts.WSB,
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  col50: {
    width: '50%',
  },
  col10: {
    width: '10%',
  },
  col80: {
    width: '80%',
  },
  title: {
    fontFamily: Fonts.WSB,
    color: '#333333',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,
  },
  subTitle: {
    fontFamily: Fonts.WSR,
    color: '#333333',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 5,
  },
  ml20: {
    marginLeft: 20,
  },
  mr20: {
    marginRight: 20,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalsNotif: {
    justifyContent: 'center',
    margin: 0,
    borderRadius: 10,
  },
  modalsBody: {
    justifyContent: 'center',
    height: Platform.OS === 'android' ? 'auto' : null,
    backgroundColor: '#ffffff',
    position: 'relative',
    padding: 20,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});
