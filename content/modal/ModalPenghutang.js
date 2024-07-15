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

const ModalPenghutang = (props) => {
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
            <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>Nama</Text>
          </View>
          <View style={styles.sectionForm}>
            <TextInput
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              placeholder="Masukkan Nama"
              placeholderTextColor="#d2d2d2"
              value={props.value1}
              onChangeText={props.onChangeText1}
            />
          </View>
          <View style={styles.PulsaLabelPhone}>
            <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>
              Nomor Telepon
            </Text>
          </View>
          <View style={styles.sectionForm}>
            <TextInput
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              placeholder="Masukkan Nomor Telepon"
              placeholderTextColor="#d2d2d2"
              value={props.value2}
              onChangeText={props.onChangeText2}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.PulsaLabelPhone}>
            <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>Alamat</Text>
          </View>
          <View style={styles.sectionForm}>
            <TextInput
              style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
              placeholder="Masukkan Alamat"
              placeholderTextColor="#d2d2d2"
              value={props.value3}
              onChangeText={props.onChangeText3}
            />
          </View>
        </View>

        {props.title === 'Ubah Penghutang' ? (
          <View style={[styles.mb10, styles.ml15, styles.mr15, styles.row]}>
            <View style={[styles.col50, styles.pr5]}>
              <Ripple
                style={styles.btnRedOutlineFull}
                onPress={props.onPressDelete}>
                <Text style={[styles.red, styles.fontWSM, styles.fs13]}>
                  {props.titleClose}
                </Text>
              </Ripple>
            </View>
            <View style={[styles.col50, styles.pl5]}>
              <Ripple
                onPress={
                  props.value1 === '' ||
                  props.value2 === '' ||
                  props.value3 === ''
                    ? () => {}
                    : props.onPressUpdate
                }
                style={
                  props.value1 === '' ||
                  props.value2 === '' ||
                  props.value3 === ''
                    ? styles.btnPrimaryFullEmpty
                    : styles.btnPrimaryFull
                }>
                <Text style={[styles.white, styles.fontWSM, styles.fs13]}>
                  {props.titleButton}
                </Text>
              </Ripple>
            </View>
          </View>
        ) : (
          <View style={[styles.mb10, styles.ml15, styles.mr15]}>
            <Ripple
              onPress={
                props.value1 === '' ||
                props.value2 === '' ||
                props.value3 === ''
                  ? () => {}
                  : props.onPressUpdate
              }
              style={
                props.value1 === '' ||
                props.value2 === '' ||
                props.value3 === ''
                  ? styles.btnPrimaryFullEmpty
                  : styles.btnPrimaryFull
              }>
              <Text style={[styles.white, styles.fontWSM, styles.fs13]}>
                {props.titleButton}
              </Text>
            </Ripple>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default ModalPenghutang;
