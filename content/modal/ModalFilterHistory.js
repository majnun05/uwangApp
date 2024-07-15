import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import IconSeru from '../../assets/svg/seru.svg';
import IconCloseModal from '../../assets/svg/close-modal.svg';
import IconCalendarBlack from '../../assets/svg/calendar-black.svg';
import Modal from 'react-native-modal';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const ModalFilterHistory = (props) => {
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
      <SafeAreaView style={[styles.modalBodyFilter, styles.zIndex10rb]}>
        <View
          style={{
            width: 60,
            height: 8,
            borderRadius: 5,
            backgroundColor: '#E3E3E3',
            position: 'absolute',
            top: props.filterRiwayat ? '2%' : '4%',
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
              zIndex: 1,
            }}>
            <SvgXml width={30} height={30} xml={IconCloseModal} />
          </TouchableOpacity>
        ) : null}

        <ScrollView>
          <View
            style={[
              styles.pl15,
              styles.pr15,
              styles.pb10,
              !props.close ? styles.mt20 : null,
            ]}>
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
              <Text style={styles.PulsaTextPhone}>{props.titleDownline}</Text>
            </View>
            <View style={styles.sectionForm}>
              <TextInput
                style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
                placeholder="Cari Downline"
                placeholderTextColor="#d2d2d2"
                value={props.valueDownline}
                onChangeText={props.onChangeTextDownline}
              />
            </View>
            {props.isiulang ? (
              <>
                <View style={styles.PulsaLabelPhone}>
                  <Text style={styles.PulsaTextPhone}>{props.titlePhone}</Text>
                </View>
                <View style={styles.sectionForm}>
                  <TextInput
                    style={[
                      styles.PulsaInputBoxNew,
                      styles.black,
                      styles.fontWSR,
                    ]}
                    placeholder="Cari Nomor Tujuan"
                    placeholderTextColor="#d2d2d2"
                    value={props.valuePhone}
                    onChangeText={props.onChangeTextPhone}
                  />
                </View>
                <View style={styles.PulsaLabelPhone}>
                  <Text style={styles.PulsaTextPhone}>
                    {props.titleKodeProduk}
                  </Text>
                </View>
                <View style={styles.sectionForm}>
                  <TextInput
                    style={[
                      styles.PulsaInputBoxNew,
                      styles.black,
                      styles.fontWSR,
                    ]}
                    placeholder="Cari Kode Produk"
                    placeholderTextColor="#d2d2d2"
                    value={props.valueKodeProduk}
                    onChangeText={props.onChangeTextKodeProduk}
                  />
                </View>
                <View style={styles.PulsaLabelPhone}>
                  <Text style={styles.PulsaTextPhone}>
                    {props.titleNamaProduk}
                  </Text>
                </View>
                <View style={styles.sectionForm}>
                  <TextInput
                    style={[
                      styles.PulsaInputBoxNew,
                      styles.black,
                      styles.fontWSR,
                    ]}
                    placeholder="Cari Nama Produk"
                    placeholderTextColor="#d2d2d2"
                    value={props.valueNamaProduk}
                    onChangeText={props.onChangeTextNamaProduk}
                  />
                </View>
              </>
            ) : null}

            <View style={styles.PulsaLabelPhone}>
              <Text style={styles.PulsaTextPhone}>{props.titleStart}</Text>
            </View>
            <View style={styles.sectionForm}>
              <TextInput
                editable={false}
                autoCorrect={false}
                placeholder={props.placeholderStart}
                style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSM]}
                placeholderTextColor="#d2d2d2"
                value={moment(props.value1 ? props.value1 : new Date())
                  .format('YYYY-MM-DD')
                  .toString()}
              />
              {props.show1 && (
                <DateTimePicker
                  maximumDate={new Date()}
                  testID="dateTimePicker"
                  value={props.value1}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={props.onDateChange1}
                  themeVariant="light" 
                />
              )}
              <TouchableOpacity onPress={props.onPressDate1}>
                <SvgXml
                  width={23}
                  height={23}
                  style={{position: 'relative', right: 0, zIndex: 1, top: 10}}
                  xml={IconCalendarBlack}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.PulsaLabelPhone}>
              <Text style={styles.PulsaTextPhone}>{props.titleEnd}</Text>
            </View>
            <View style={styles.sectionForm}>
              <TextInput
                editable={false}
                autoCorrect={false}
                placeholder={props.placeholderEnd}
                style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSM]}
                placeholderTextColor="#d2d2d2"
                onChangeText={props.onChangeText2}
                value={moment(props.value2).format('YYYY-MM-DD')}
              />
              {props.show2 && (
                <DateTimePicker
                  maximumDate={new Date()}
                  testID="dateTimePicker"
                  value={props.value2}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={props.onDateChange2}
                />
              )}
              <TouchableOpacity onPress={props.onPressDate2}>
                <SvgXml
                  width={23}
                  height={23}
                  style={{position: 'relative', right: 0, zIndex: 1, top: 10}}
                  xml={IconCalendarBlack}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.row, styles.mb10, styles.ml15, styles.mr15]}>
            <View style={[styles.col10, styles.center]}>
              <SvgXml width={23} height={23} xml={IconSeru} />
            </View>
            <View style={[styles.mt5, styles.pl5, styles.pr10, styles.col90]}>
              <Text style={[styles.black, styles.fs11, styles.fontWSR]}>
                {props.ket}
              </Text>
            </View>
          </View>
          {props.filterRiwayat ? (
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
          ) : (
            <View style={[styles.mb10, styles.ml15, styles.mr15]}>
              <Ripple onPress={props.onPress} style={styles.btnPrimaryFull}>
                <Text style={[styles.white, styles.fontWSM, styles.fs15]}>
                  {props.titleButton}
                </Text>
              </Ripple>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalFilterHistory;
