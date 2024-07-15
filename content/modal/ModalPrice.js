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

const ModalFilter = (props) => {
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
      <SafeAreaView style={[styles.modalBodyFilter]}>
        <View
          style={{
            width: 60,
            height: 8,
            borderRadius: 5,
            backgroundColor: '#E3E3E3',
            position: 'absolute',
            top: '4%',
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

        <View
          style={[
            ,
            styles.pl15,
            styles.pr15,
            !props.close ? styles.mt20 : null,
          ]}>
          <Text
            style={[styles.fontWSB, styles.black, styles.fs15, styles.mt10]}>
            {props.title}
          </Text>
          {props.ket ? (
            <Text style={[styles.fontWSR, styles.black, styles.fs12]}>
              {props.ket}
            </Text>
          ) : null}
          <View style={styles.CheckoutSectionStyleCheck}>
            <TextInput
              keyboardType="number-pad"
              textAlign={'left'}
              editable={true}
              autoCorrect={false}
              placeholder={props.placeholder}
              style={[
                styles.PulsaInputBoxNew,
                styles.black,
                styles.fontWSR,
                {height: 50},
              ]}
              placeholderTextColor="#d2d2d2"
              value={props.value ? props.value.toString() : ''}
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

export default ModalFilter;
