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
import IconCloseModal from '../../assets/svg/close-modal.svg';
import Modal from 'react-native-modal';

const ModalQris = (props) => {
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

        {props.close ? (
          <TouchableOpacity
            onPress={props.onSwipeComplete}
            style={{
              position: 'relative',
              left: '87%',
              top: 15,
              zIndex: -1,
            }}>
            <SvgXml width={30} height={30} xml={IconCloseModal} />
          </TouchableOpacity>
        ) : null}

        <View style={[styles.pl15, styles.pr15, styles.pb10]}>
          <Text
            style={[
              styles.fontWSB,
              styles.black,
              styles.pl5,
              styles.fs15,
              styles.mt10,
            ]}>
            {props.title}
          </Text>
          <View style={styles.PulsaLabelPhone}>
            <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>Nominal</Text>
          </View>
          <View style={styles.sectionForm}>
            <TextInput
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              placeholder="Masukkan Nominal"
              placeholderTextColor="#d2d2d2"
              value={props.value1}
              onChangeText={props.onChangeText1}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.PulsaLabelPhone}>
            <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>
              PIN Anda
            </Text>
          </View>
          <View style={styles.sectionForm}>
            <TextInput
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              placeholder="Masukkan PIN"
              placeholderTextColor="#d2d2d2"
              value={props.value2}
              onChangeText={props.onChangeText2}
              maxLength={6}
              secureTextEntry={true}
              keyboardType="number-pad"
            />
          </View>
        </View>
        <View style={[styles.mb10, styles.ml15, styles.mr15]}>
          <Ripple
            onPress={
              props.value1 === '' || props.value2 === ''
                ? () => {}
                : props.onPress
            }
            style={
              props.value1 === '' || props.value2 === ''
                ? styles.btnPrimaryFullEmpty
                : styles.btnPrimaryFull
            }>
            <Text style={[styles.white, styles.fontWSM, styles.fs13]}>
              {props.titleButton}
            </Text>
          </Ripple>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalQris;
