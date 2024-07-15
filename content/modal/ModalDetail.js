import React from 'react';
import {View, TouchableOpacity, Text, SafeAreaView} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import IconCloseModal from '../../assets/svg/close-modal.svg';
import Modal from 'react-native-modal';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const ModalDetail = (props) => {
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
      <SafeAreaView style={[styles.modalBodyPayDetail, styles.pt15]}>
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

        <View
          style={[
            styles.row,
            styles.mb15,
            styles.mt5,
            styles.pl15,
            styles.pr20,
          ]}>
          <View style={styles.col70}>
            <Text style={[styles.black, styles.bold, styles.fs15]}>
              {props.title}
            </Text>
          </View>

          <View style={styles.col30}>
            {props.close ? (
              <TouchableOpacity
                style={styles.rightText}
                onPress={props.onPressClose}>
                <SvgXml width={25} height={25} xml={IconCloseModal} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <View style={[styles.row, styles.pl10, styles.pr20, styles.pb10]}>
          <View style={[styles.col40, styles.pl5, styles.centerContent]}>
            <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
              Produk
            </Text>
          </View>
          <View style={[styles.col60, styles.pl5, styles.centerContent]}>
            <Text
              style={[
                styles.fs12,
                styles.black,
                styles.fontWSB,
                styles.rightText,
                styles.right,
              ]}>
              {props.operatorName ? props.operatorName : props.productName}
            </Text>
          </View>
        </View>
        {props.donasi ? (
          <View style={[styles.row, styles.pl10, styles.pr20, styles.pb10]}>
            <View style={[styles.col40, styles.pl5, styles.centerContent]}>
              <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                {props.titleDonasi}
              </Text>
            </View>
            <View style={[styles.col60, styles.pl5, styles.centerContent]}>
              <Text
                style={[
                  styles.fs12,
                  styles.black,
                  styles.fontWSB,
                  styles.rightText,
                  styles.right,
                ]}>
                {props.productName}
              </Text>
            </View>
          </View>
        ) : null}
        {!props.donasi ? (
          <View style={[styles.row, styles.pl10, styles.pr20, styles.pb10]}>
            <View style={[styles.col40, styles.pl5, styles.centerContent]}>
              <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                Kode Produk
              </Text>
            </View>
            <View style={[styles.col60, styles.pl5, styles.centerContent]}>
              <Text
                style={[
                  styles.fs12,
                  styles.black,
                  styles.fontWSB,
                  styles.rightText,
                  styles.right,
                ]}>
                {props.productCode}
              </Text>
            </View>
          </View>
        ) : null}
        {!props.donasi ? (
          <View style={[styles.row, styles.pl10, styles.pr20, styles.pb10]}>
            <View style={[styles.col40, styles.pl5, styles.centerContent]}>
              <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                Keterangan
              </Text>
            </View>
            <View style={[styles.col60, styles.pl5, styles.centerContent]}>
              <Text
                style={[
                  styles.fs12,
                  styles.black,
                  styles.fontWSB,
                  styles.rightText,
                  styles.right,
                ]}>
                {props.description ? props.description : '-'}
              </Text>
            </View>
          </View>
        ) : null}

        {props.phone ? (
          <View style={[styles.row, styles.pl10, styles.pr20, styles.pb10]}>
            <View style={[styles.col40, styles.pl5, styles.centerContent]}>
              <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                Nomor Tujuan
              </Text>
            </View>
            <View style={[styles.col60, styles.pl5, styles.centerContent]}>
              <Text
                style={[
                  styles.fs12,
                  styles.black,
                  styles.fontWSB,
                  styles.rightText,
                  styles.right,
                ]}>
                {props.phone}
              </Text>
            </View>
          </View>
        ) : null}
        {props.donasi ? (
          <View style={[styles.row, styles.pl10, styles.pr20, styles.pb10]}>
            <View style={[styles.col40, styles.pl5, styles.centerContent]}>
              <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                Biaya Admin
              </Text>
            </View>
            <View style={[styles.col60, styles.pl5, styles.centerContent]}>
              <Text
                style={[
                  styles.fs12,
                  styles.black,
                  styles.fontWSB,
                  styles.rightText,
                  styles.right,
                ]}>
                {props.admin}
              </Text>
            </View>
          </View>
        ) : null}
        <View style={[styles.row, styles.pl10, styles.pr20, styles.pb10]}>
          <View style={[styles.col40, styles.pl5, styles.centerContent]}>
            <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
              Harga
            </Text>
          </View>
          <View style={[styles.col60, styles.pl5, styles.centerContent]}>
            <Text
              style={[
                styles.fs12,
                styles.green,
                styles.fontWSB,
                styles.rightText,
                styles.right,
              ]}>
              Rp {props.price}
            </Text>
          </View>
        </View>
        <View style={styles.footerBtn}>
          <View
            style={[
              styles.row,
              styles.pl15,
              styles.pr15,
              styles.pb10,
              styles.pt10,
            ]}>
            <View style={styles.col70}>
              <Text style={styles.labelFooterBtn}>Total Pembayaran</Text>
              <Text style={[styles.fs15, styles.green, styles.fontWSB]}>
                Rp  {props.donasi ? props.totalPrice : props.price}
              </Text>
            </View>
            <View style={[styles.col30]}>
              <Ripple
                onPress={props.onPayment}
                style={[styles.buttonBeli, styles.rightText]}>
                <Text
                  style={[
                    styles.bold,
                    styles.fs13,
                    styles.white,
                    styles.fontWSB,
                  ]}
                  uppercase={false}>
                  {props.titleButton}
                </Text>
              </Ripple>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalDetail;
