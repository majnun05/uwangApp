import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import styles from '../../assets/styles/Style';
import {SvgXml} from 'react-native-svg';
import IconCloseModal from '../../assets/svg/close-modal.svg';
import IconSeru from '../../assets/svg/seru.svg';
import Modal from 'react-native-modal';

const ModalTanpaPin = (props) => {
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
      style={[styles.modalNormal]}>
      <SafeAreaView style={[styles.modalBodyPin, styles.center_]}>
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
            <View style={styles.col80}>
              <Text
                style={[
                  styles.fontWSB,
                  styles.black,
                  styles.fs17,
                  styles.mt30,
                ]}>
                {props.title}
              </Text>

              {props.ket ? (
                <Text
                  style={[
                    styles.fontWSR,
                    styles.black,
                    styles.leftText,
                    styles.fs12,
                    styles.mb20,
                  ]}>
                  {props.ket}
                </Text>
              ) : null}
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
          <View style={styles.CheckoutSectionStyleCheck}>
            <TextInput
              keyboardType="number-pad"
              // textAlign={'center'}
              secureTextEntry={true}
              editable={true}
              placeholder={
                props.placeholder ? props.placeholder : 'Masukkan PIN Anda'
              }
              style={[
                {height: 50},
                props.value ? styles.fs18 : styles.fs15,
                styles.black,
                props.value ? styles.fontWSB : styles.fontWSR,
                styles.col100,
              ]}
              placeholderTextColor="#d2d2d2"
              defaultValue={props.value}
              onChangeText={props.onChangeText}
              maxLength={6}
              minLength={6}
            />
          </View>
        </View>
        {props.tanpaPin === 'no' ? (
          <View style={[styles.row, styles.mt10, styles.ml15, styles.mr15]}>
            <View style={[styles.col10, styles.center]}>
              <SvgXml width={23} height={23} xml={IconSeru} />
            </View>
            <View style={[styles.mt3, styles.pl5, styles.pr10, styles.col90]}>
              <Text style={[styles.black, styles.fs11, styles.fontWSR]}>
                Masukkan PIN Transaksi Anda
              </Text>
            </View>
          </View>
        ) : null}
        <View
          style={[
            styles.row,
            styles.mb15,
            styles.ml20,
            styles.mr20,
            styles.pt10,
            styles.mt5,
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
            <Ripple
              onPress={props.value === '' ? () => {} : props.onPress}
              style={
                props.value === ''
                  ? styles.btnPrimaryFullEmpty
                  : styles.btnPrimaryFull
              }>
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

export default ModalTanpaPin;
