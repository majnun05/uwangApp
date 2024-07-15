import React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import Modal from 'react-native-modal';
import {SvgXml} from 'react-native-svg';
import {IcSucces, LogoMark} from '../../assets';
import styles from '../../assets/styles/Style';
import IconCloseModal from '../../assets/svg/close-modal.svg';
import IconStarActive from '../../assets/svg/star-active.svg';
import IconStar from '../../assets/svg/star.svg';

const ModalNilai = (props) => {
  const chooseRate = (item) => {
    props.onPressRate(item);
  };

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
            <View style={[styles.col10]} />
            <View style={[styles.center, styles.col80, {marginVertical: 10}]}>
              <Image source={LogoMark} style={{width:60, height:60}} resizeMode="stretch" />
            </View>
            {props.close ? (
              <TouchableOpacity
                onPress={props.onSwipeComplete}
                style={[styles.col10]}>
                <SvgXml width={30} height={30} xml={IconCloseModal} />
              </TouchableOpacity>
            ) : null}
          </View>
          <Text
            style={[
              styles.fontWSB,
              styles.black,
              styles.pl5,
              styles.fs17,
              styles.mt10,
            ]}>
            {props.title}
          </Text>
          <View style={styles.sectionFormArea}>
            <TextInput
              style={[styles.TextArea, styles.black, styles.fontWSR]}
              placeholder="Tulis Pendapat serta Saranmu disini..."
              placeholderTextColor="#d2d2d2"
              value={props.value}
              onChangeText={props.onChangeText}
              multiline={true}
              numberOfLines={4}
              maxLength={160}
            />
            <View
              style={{
                position: 'absolute',
                right: 0,
                bottom: 5,
              }}>
              <Text style={[styles.fs11, styles.black, styles.fontWSR]}>
                {props.commentCount + '/160'}
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.mt10, styles.mb10]}>
            {[1, 2, 3, 4, 5].map((item, key) => (
              <Ripple
                key={key}
                onPress={() => {
                  chooseRate(item);
                }}
                style={[styles.center, styles.col20]}>
                <SvgXml
                  width="50"
                  height="40"
                  xml={item <= props.value2 ? IconStarActive : IconStar}
                />
              </Ripple>
            ))}
          </View>
        </View>

        <View style={[styles.mb10, styles.ml15, styles.mr15]}>
          <Ripple
            onPress={
              props.value === '' || props.value2 === 0
                ? () => {}
                : props.onPress
            }
            style={
              props.value === '' || props.value2 === 0
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

export default ModalNilai;
