//import libraries
import React, {useEffect, useState} from 'react';
import {
  View,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Animated,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
// import Clipboard from '@react-native-community/clipboard';
import styles from '../../assets/styles/Style';
import {getSnackBar_error} from '../../helpers/Helpers';
import Contact from '../../assets/svg/input-contact.svg';
import Copas from '../../assets/svg/input-copas.svg';
import {selectContactPhone} from 'react-native-select-contact';
import {IcCopas, IcKontak} from '../../assets';
import { useNavigation } from '@react-navigation/native';
import IcScan from '../../assets/svg/scanUwang.svg'

// make a component
const InputPhone = (props) => {
  const [borders, setBorders] = useState('#DBDBDB');
  const navigation = useNavigation()

  const paste = async () => {
    // const textHolder = await Clipboard.getString();

    if (textHolder.indexOf('62') != -1) {
      var phones = ReplaceAll(textHolder, '+62', '0');
      _phone = phones.replace(/ /g, '');
      _phone = phones.replace(/-/g, '');
    } else {
      var _phone = textHolder.replace(/-/g, '');
    }
    props.onChangeText(_phone);
  };

  const getPhoneNumber = () => {
    return selectContactPhone()
      .then((selection) => {
        if (!selection) {
          return null;
        }

        let {contact, selectedPhone} = selection;
        if (selectedPhone.number.indexOf('62') != -1) {
          var phone = ReplaceAll(selectedPhone.number, '+62', '0');
          phone = phone.replace(/ /g, '');
          phone = phone.replace(/-/g, '');
        } else {
          var phone = selectedPhone.number.replace(/-/g, '');
        }
        props.onChangeText(phone);
      })
      .catch((error) => {
        getSnackBar_error({
          title: 'Aplikasi Uwang membutuhkan izin kontak Anda',
          duration: 'LENGTH_LONG',
        });
      });
  };

  const openContact = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Izin Kontak',
          message: 'Aplikasi Uwang membutuhkan izin kontak Anda',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getPhoneNumber();
      }
    } catch (err) {
      getSnackBar_error({
        title: 'Aplikasi Uwang membutuhkan izin kontak Anda',
        duration: 'LENGTH_LONG',
      });
    }
  };

  const ReplaceAll = (Source, stringToFind, stringToReplace) => {
    if (stringToFind.indexOf('+62') != -1) {
      var temp = Source;
      var index = temp.indexOf(stringToFind);

      while (index != -1) {
        temp = temp.replace(stringToFind, stringToReplace);
        index = temp.indexOf(stringToFind);
      }

      return temp;
    } else {
      return stringToFind;
    }
  };

  const requestContactPermission = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contact Permission',
          message: 'Aplikasi Uwang membutuhkan izin kontak Anda',
        },
      );
    } catch (err) {
      //console.warn(err);
      return false;
    }
  };

  useEffect(() => {
    requestContactPermission();
  }, []);

  const onFocus = () => {
    setBorders('#CCCCCC');
  };

  const onBlur = () => {
    setBorders('#DBDBDB');
  };

  const openScanPln = () => {
    navigation.navigate('ScanQrPln')
  }

  return (
    <View
      style={[
        styles.pb5,
        styles.pl15,
        styles.pr15,
        props.minus
          ? {
              borderRadius: 15,
              backgroundColor: '#ffffff',
              paddingTop: 10,
            }
          : {},
      ]}>
      <View style={styles.PulsaLabelPhone}>
        <Text
          style={[
            styles.PulsaTextPhone,
            props.titleBold ? styles.fontWSB : styles.fontWSM,
          ]}>
          {props.title ? props.title : 'Nomor Telepon'}
        </Text>
      </View>

      <View
        style={[
          styles.sectionForm,
          props.form ? styles.mb20 : null,
          {borderBottomColor: props.form ? 'red' : borders},
        ]}>
        <TextInput
          editable={!props.disable ? true : false}
          autoCorrect={false}
          style={[
            props.value
              ? styles.PulsaInputBoxNewPhone
              : styles.PulsaInputBoxNewPhoneEmpty,
          ]}
          placeholderTextColor="#CFCFCF"
          placeholder={
            !props.placeholder ? 'Contoh : 081365xxxxx' : props.placeholder
          }
          keyboardType={props.keyboardType ? props.keyboardType : 'number-pad'}
          onChangeText={props.onChangeText}
          defaultValue={props.value}
          maxLength={props.maxLength ? props.maxLength : 16}
          minLength={props.minLength ? props.minLength : 10}
          onBlur={() => onBlur()}
          onFocus={() => onFocus()}
        />
        {props.image ? (
          <View
            style={
              props.contact ? styles.hrefOperator : styles.hrefOperatorRight
            }>
            <Image
              resizeMethod="resize"
              resizeMode="contain"
              source={{uri: props.image}}
              style={styles.imageVoiceHome}
            />
          </View>
        ) : null}
        {props.scan ? (
          <TouchableOpacity
            style={[styles.hrefPaste, {marginRight: 30}]}
            onPress={() => {
              !props.disable ? openScanPln() : null;
            }}>
            <SvgXml width={23} height={23} xml={IcScan} />
          </TouchableOpacity>
        ) : null}
        {props.contact ? (
          <TouchableOpacity
            style={props.scan ? styles.hrefPasteScan : styles.hrefPaste}
            onPress={() => {
              !props.disable ? openContact() : null;
            }}>
            <SvgXml width={23} height={23} xml={IcKontak} />
          </TouchableOpacity>
        ) : null}
        {props.copas ? (
          <TouchableOpacity
            style={styles.hrefContact}
            onPress={() => {
              !props.disable ? paste() : null;
            }}>
            <SvgXml width={23} height={23} xml={IcCopas} />
          </TouchableOpacity>
        ) : null}
        {props.form ? (
          <Animated.View
            style={{
              position: 'absolute',
              left: 2,
              bottom: -18,
            }}>
            <Text
              style={{
                color: 'red',
                fontSize: 10,
              }}>
              {props.titleForm}
            </Text>
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
};

// make the component available to other parts of the app
export default InputPhone;
