import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import IconRefresh from '../../assets/svg/refresh-black.svg';
import Modal from 'react-native-modal';

const ModalKet = (props) => {
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
      style={styles.modalNormal}>
      <SafeAreaView style={[styles.modalBodyReferal, styles.zIndex10rb]}>
        <View
          style={{
            width: 60,
            height: 8,
            borderRadius: 5,
            backgroundColor: '#E3E3E3',
            position: 'absolute',
            top: '2%',
            left: '42%',
            zIndex: 1,
          }}
        />

        <View style={[styles.pl15, styles.pr15, styles.pb10, styles.mt30]}>
          <View style={[styles.row, styles.pr10]}>
            <View style={styles.col70}>
              <Text
                style={[styles.fontWSB, styles.black, styles.pl5, styles.fs15]}>
                {props.title}
              </Text>
            </View>
            <TouchableOpacity style={styles.col30} onPress={props.onRefresh}>
              {props.refresh ? (
                <View style={styles.rightText}>
                  <SvgXml width={20} height={20} xml={IconRefresh} />
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
          <View style={styles.sectionForm}>
            <TextInput
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              placeholder={props.placeholder}
              placeholderTextColor="#d2d2d2"
              value={props.value}
              onChangeText={props.onChangeText}
            />
          </View>
        </View>
        <View
          style={[
            styles.row,
            styles.mb15,
            styles.ml15,
            styles.mr15,
            styles.pt15,
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

export default ModalKet;
