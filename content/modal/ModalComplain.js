import React from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import Modal from 'react-native-modal';
import IconCloseModal from '../../assets/svg/close-modal.svg';

const ModalComplain = (props) => {
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

        <View style={[styles.pl15, styles.pr15, styles.pb10, styles.mt20]}>
          <View style={[styles.row]}>
            <View style={[styles.centerContent, styles.col90]}>
              <Text
                style={[
                  styles.fontWSB,
                  styles.black,
                  styles.pl5,
                  styles.fs17,
                  styles.mt10,
                  styles.mb10,
                ]}>
                {props.title}
              </Text>
            </View>
            {props.close ? (
              <TouchableOpacity
                onPress={props.onSwipeComplete}
                style={[styles.col10]}>
                <SvgXml width={30} height={30} xml={IconCloseModal} />
              </TouchableOpacity>
            ) : null}
          </View>

          <View
            style={[
              styles.sectionFormBorder,
              styles.pl12,
              styles.pr12,
              {borderRadius: 5},
            ]}>
            <TextInput
              style={[
                styles.fs13,
                styles.black,
                styles.fontWSR,
                {width: '100%'},
              ]}
              placeholder="Contoh : Barang tidak sampai"
              placeholderTextColor="#d2d2d2"
              value={props.value}
              onChangeText={props.onChangeText}
            />
          </View>
          <View style={styles.sectionFormAreaBorder}>
            <TextInput
              style={[
                styles.TextArea,
                styles.black,
                styles.fontWSR,
                styles.fs13,
                {width: '100%'},
              ]}
              placeholder="Tulis Pendapat serta Saranmu disini..."
              placeholderTextColor="#d2d2d2"
              value={props.value2}
              onChangeText={props.onChangeText2}
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>

        <View style={[styles.mb15, styles.ml20, styles.mr20]}>
          <Ripple
            onPress={
              props.value === '' || props.value2 === ''
                ? () => {
                    ToastAndroid.show(
                      `Masukkan Judul dan Deskripsi Komplain`,
                      ToastAndroid.SHORT,
                    );
                  }
                : props.onPress
            }
            style={
              props.value === '' || props.value2 === ''
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

export default ModalComplain;
