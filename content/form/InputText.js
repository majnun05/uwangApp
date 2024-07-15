//import libraries
import React, {useEffect, useState} from 'react';
import {
  View,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
// import Clipboard from '@react-native-community/clipboard';
import styles from '../../assets/styles/Style';
import {getSnackBar_error} from '../../helpers/Helpers';
import Contact from '../../assets/svg/input-contact.svg';
import Copas from '../../assets/svg/input-copas.svg';
import {selectContactPhone} from 'react-native-select-contact';

// make a component
const InputText = (props) => {
  const [borders, setBorders] = useState('#DBDBDB');

  const paste = async () => {
    // const textHolder = await Clipboard.getString();

    if (textHolder.indexOf('62') != -1) {
      var phones = ReplaceAll(textHolder, '+62', '0');
      _phone = phones.replace(/ /g, '');
      _phone = phones.replace(/-/g, '');
    } else {
      var _phone = textHolder;
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
          var phone = selectedPhone.number;
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

  return (
    <View
      style={[
        styles.boxBottomBorder,
        styles.mb5,
        styles.pb5,
        props.minus
          ? {
              marginTop: -50,
              borderTopRightRadius: 38,
              borderTopLeftRadius: 38,
              backgroundColor: '#ffffff',
              paddingTop: 10,
            }
          : {},
      ]}>
      <View style={styles.PulsaLabelPhone}>
        <Text style={[styles.PulsaTextPhone, styles.fontWSM]}>
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
          style={[styles.PulsaInputBoxNew, styles.black, styles.fontWSR]}
          placeholderTextColor="#CFCFCF"
          placeholder={
            !props.placeholder ? 'Contoh : 1365xxxxx' : props.placeholder
          }
          keyboardType={props.keyboardType ? props.keyboardType : 'number-pad'}
          onChangeText={props.onChangeText}
          value={props.value}
          onBlur={() => onBlur()}
          onFocus={() => onFocus()}
          maxLength={props.maxLength ? props.maxLength : 200}
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
        {props.contact ? (
          <TouchableOpacity
            style={styles.hrefPaste}
            onPress={() => {
              openContact();
            }}>
            <SvgXml width={23} height={23} xml={Contact} />
          </TouchableOpacity>
        ) : null}
        {props.copas ? (
          <TouchableOpacity
            style={styles.hrefContact}
            onPress={() => {
              paste();
            }}>
            <SvgXml width={23} height={23} xml={Copas} />
          </TouchableOpacity>
        ) : null}
        {props.form ? (
          <Text
            style={{
              color: 'red',
              fontSize: 10,
              position: 'absolute',
              left: 2,
              bottom: -18,
            }}>
            {props.titleForm}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

// make the component available to other parts of the app
export default InputText;
