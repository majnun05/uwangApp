import React from 'react';
import {View, TouchableOpacity, Text, SafeAreaView} from 'react-native';
import Ripple from 'react-native-material-ripple';
import styles from '../../assets/styles/Style';
import {SvgXml} from 'react-native-svg';
import IconCloseModal from '../../assets/svg/close-modal.svg';
import IconWarning from '../../assets/svg/warning.svg';
import Modal from 'react-native-modal';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const ModalSuccess = (props) => {
  return (
    <Modal
      backdropOpacity={0.4}
      transparent={true}
      useNativeDriver={true}
      isVisible={props.isVisible}
      onBackdropPress={props.onSwipeComplete}
      onSwipeComplete={props.onSwipeComplete}
      onBackButtonPress={props.onSwipeComplete}
      //swipeDirection={['down', 'up', 'left', 'right']}
      swipeDirection={['down']}
      style={[styles.modalsSuccess]}>
      <SafeAreaView style={[styles.modalsBodySuccess, styles.center]}>
        <View style={[styles.pl20, styles.pr20]}>
          <View
            style={{
              width: 60,
              height: 8,
              borderRadius: 5,
              backgroundColor: '#E3E3E3',
              position: 'absolute',
              top: '6%',
              left: '48%',
              zIndex: 1,
            }}
          />

          <View style={styles.row}>
            <View style={[styles.col15, styles.center, styles.pt20]}>
              <SvgXml width={40} height={40} xml={IconWarning} />
            </View>
            <View style={[styles.col65, styles.pl10]}>
              <Text
                style={[
                  styles.fontWSB,
                  styles.black,
                  styles.fs17,
                  styles.mt30,
                ]}>
                {props.title}
              </Text>

              <Text style={[styles.fontWSR, styles.black, styles.fs12]}>
                {props.message}
              </Text>
            </View>
            <View style={styles.col20}>
              {props.close ? (
                <TouchableOpacity
                  onPress={props.onSwipeComplete}
                  style={{
                    position: 'relative',
                    left: '60%',
                    top: 15,
                    zIndex: 1,
                  }}>
                  <SvgXml width={30} height={30} xml={IconCloseModal} />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
        <View
          style={[
            styles.row,
            styles.mb15,
            styles.ml15,
            styles.mr15,
            styles.pt15,
            styles.mt10,
            styles.borderTop,
          ]}>
          <View style={[styles.col50, styles.pr5]}>
            <Ripple
              onPress={props.onPressClose}
              style={styles.btnPrimaryOutlineFull}>
              <Text style={[styles.green, styles.fontWSB, styles.fs13]}>
                {props.titleClose}
              </Text>
            </Ripple>
          </View>
          <View style={[styles.col50, styles.pl5, styles.brL]}>
            <Ripple onPress={props.onPress} style={styles.btnPrimaryFull}>
              <Text style={[styles.white, styles.fontWSB, styles.fs13]}>
                {props.titleButton}
              </Text>
            </Ripple>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalSuccess;
