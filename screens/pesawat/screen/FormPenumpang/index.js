import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {
  Header,
  Gap,
  Button,
  Input,
  ActionSheet,
  ListSelect,
  CardTouch,
} from '../../components';
import {SvgXml} from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getSnackBar_error} from '../../../../helpers/Helpers';
import IconCalendarBlack from '../../../../assets/svg/calendar-black.svg';
import s from '../../../../assets/styles/Style';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const FormPenumpang = ({navigation, route}) => {
  const params = route.params;
  const titleSheetRef = useRef();
  const nationalSheetRef = useRef();
  const baggageSheetRef = useRef();
  const [titleSheet, setTitleSheet] = useState(false);
  const [nationalSheet, setNationalSheet] = useState(false);
  const [baggageSheet, setBaggageSheet] = useState(false);
  const [dataBagasiPergi, setdataBagasiPergi] = useState([]);
  const [dataBagasiPulang, setdataBagasiPulang] = useState([]);
  const [gender, setgender] = useState(params.gender);
  const [qty, setQty] = useState(params.qty);
  const [country1, setcountry1] = useState(params.country1);
  const [country2, setcountry2] = useState(params.country2);
  const [titleForm, settitleForm] = useState(params.titleForm);
  const [paxType, setpaxType] = useState(params.paxType);
  const [firstName, setfirstName] = useState(params.firstName);
  const [lastName, setlastName] = useState(params.lastName);
  const [title, settitle] = useState(params.title);
  const [phone, setPhone] = useState(params.phone);
  const [email, setEmail] = useState(params.email);
  const [ssrsPergi, setssrsPergi] = useState(params.ssrsPergi);
  const [ssrsPulang, setssrsPulang] = useState(params.ssrsPulang);
  const [nationality, setnationality] = useState(params.nationality);
  const [nationalityName, setnationalityName] = useState(
    params.nationalityName,
  );
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [dob, setdob] = useState(
    params.dob ? new Date(params.dob) : new Date(),
  );
  const [cartItems, setcartItems] = useState(params.cartItems);
  const [dataTitle, setdataTitle] = useState([
    {code: 'MR', name: 'Tuan'},
    {code: 'MRS', name: 'Nyonya'},
    {code: 'MS', name: 'Nona'},
  ]);
  const [dataBagasi, setDataBagasi] = useState([]);
  const [titleBagasi, setTitleBagasi] = useState([]);
  const [pp, setpp] = useState('pergi');
  const [keys, setKeys] = useState(0);
  const [cardNum, setcardNum] = useState(params.docs.cardNum);
  const [cardExpired, setcardExpired] = useState(
    params.docs.cardExpired.day
      ? new Date(
          `${params.docs.cardExpired.year}-${params.docs.cardExpired.month}-${params.docs.cardExpired.day}`,
        )
      : new Date(),
  );
  const [cardIssuePlace, setcardIssuePlace] = useState(
    params.docs.cardIssuePlace ? params.docs.cardIssuePlace : 'ID',
  );
  const [cardIssuePlaceName, setcardIssuePlaceName] = useState(
    params.docs.cardIssuePlaceName
      ? params.docs.cardIssuePlaceName
      : 'Indonesia',
  );
  let isMounted = true;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // refresh back screen
      if (isMounted) {
        let Check = params.dataCountry;
        if (Check) {
          if (params.field === 'Kewarganegaraan') {
            if (Check.code) {
              setnationality(Check.code);
              setnationalityName(Check.name);
            }
          } else {
            if (Check.code) {
              setcardIssuePlace(Check.code);
              setcardIssuePlaceName(Check.name);
            }
          }
        }
      }
      // end refresh back screen
    });
    const backAction = () => {
      navigation.goBack(null);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    if (isMounted) {
      setdataBagasiPergi(params.ssrsPergi.ssrsPergi);
      setdataBagasiPulang(params.ssrsPergi.ssrsPulang);
    }

    return () => {
      unsubscribe();
      backHandler.remove();
      isMounted = false;
    };
  }, [params.dataCountry, cardIssuePlace, cardIssuePlaceName]);

  const changeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dob;

    setShow(Platform.OS === 'ios');
    if (event.type === 'neutralButtonPressed') {
      setdob(new Date(0));
    } else {
      setdob(currentDate);
    }
  };

  const changeDate2 = (event, selectedDate) => {
    const currentDate = selectedDate || cardExpired;

    setShow2(Platform.OS === 'ios');
    if (event.type === 'neutralButtonPressed') {
      setcardExpired(new Date(0));
    } else {
      setcardExpired(currentDate);
    }
  };

  const updateTitle = (codes) => {
    settitle(codes);
    setTitleSheet(false);
  };

  const getBaggage = (items, tit, pps, keys) => {
    setTitleBagasi(tit);
    setDataBagasi(items.ssrs);
    setpp(pps);
    setBaggageSheet(true);
    setKeys(keys);
  };

  const addBaggage = (items) => {
    let arrQty = parseInt(keys);
    let editPass = pp === 'pergi' ? ssrsPergi.ssrsPergi : ssrsPergi.ssrsPulang;

    editPass[arrQty].ssrType = items.ssrType;
    editPass[arrQty].ssrCode = items.ssrCode;
    editPass[arrQty].ssrText = items.ssrText;
    editPass[arrQty].ssrWeight = items.ssrWeight;
    editPass[arrQty].ssrUnit = items.ssrUnit;
    editPass[arrQty].ssrRoute = items.ssrRoute;
    editPass[arrQty].ssrPrice = items.ssrPrice;

    let newPassenger = {
      qty: ssrsPergi.qty,
      gender: ssrsPergi.route,
      gender: ssrsPergi.gender,
      nameNum: ssrsPergi.nameNum,
      paxType: ssrsPergi.paxType,
      firstName: ssrsPergi.firstName,
      lastName: ssrsPergi.lastName,
      phone: ssrsPergi.phone,
      email: ssrsPergi.email,
      title: ssrsPergi.title,
      nationality: ssrsPergi.nationality,
      nationalityName: ssrsPergi.nationalityName,
      dob: ssrsPergi.dob,
      ssrsPergi: editPass,
      ssrsPulang: ssrsPergi.ssrsPulang,
      docs: ssrsPergi.docs,
    };

    setBaggageSheet(false);
    if (pp === 'pergi') {
      setssrsPergi(newPassenger);
    } else {
      setssrsPulang(newPassenger);
    }
  };

  const resetBaggage = () => {
    let arrQty = parseInt(keys);
    let editPass = pp === 'pergi' ? ssrsPergi.ssrsPergi : ssrsPergi.ssrsPulang;
    editPass[arrQty].ssrType = '';
    editPass[arrQty].ssrCode = '';
    editPass[arrQty].ssrText = '';
    editPass[arrQty].ssrWeight = 0;
    editPass[arrQty].ssrUnit = '';
    editPass[arrQty].ssrRoute = '';
    editPass[arrQty].ssrPrice = 0;

    let newPassenger = {
      qty: ssrsPergi.qty,
      gender: ssrsPergi.route,
      gender: ssrsPergi.gender,
      nameNum: ssrsPergi.nameNum,
      paxType: ssrsPergi.paxType,
      firstName: ssrsPergi.firstName,
      lastName: ssrsPergi.lastName,
      phone: ssrsPergi.phone,
      email: ssrsPergi.email,
      title: ssrsPergi.title,
      nationality: ssrsPergi.nationality,
      nationalityName: ssrsPergi.nationalityName,
      dob: ssrsPergi.dob,
      ssrsPergi: editPass,
      ssrsPulang: ssrsPergi.ssrsPulang,
      docs: ssrsPergi.docs,
    };

    setBaggageSheet(false);
    if (pp === 'pergi') {
      setssrsPergi(newPassenger);
    } else {
      setssrsPulang(newPassenger);
    }
  };

  const submitPassenger = () => {
    if (firstName === '' || lastName === '') {
      getSnackBar_error({
        title: 'Lengkapi data terlebih dahulu',
        duration: 'LENGTH_LONG',
      });
    } else {
      if (
        moment(dob).format('YYYY-MM-DD') ===
        moment(new Date()).format('YYYY-MM-DD')
      ) {
        getSnackBar_error({
          title: 'Tanggal lahir tidak bisa hari ini',
          duration: 'LENGTH_LONG',
        });
      } else {
        if (country1 !== country2) {
          if (cardNum === '' || cardIssuePlace === '') {
            getSnackBar_error({
              title: 'Lengkapi data paspor Anda',
              duration: 'LENGTH_LONG',
            });
          } else {
            if (gender !== 'Bayi') {
              if (phone === '' || email === '') {
                getSnackBar_error({
                  title: 'Lengkapi data terlebih dahulu',
                  duration: 'LENGTH_LONG',
                });
              } else {
                submitNow();
              }
            } else {
              submitNow();
            }
          }
        } else {
          if (gender !== 'Bayi') {
            if (phone === '' || email === '') {
              getSnackBar_error({
                title: 'Lengkapi data terlebih dahulu',
                duration: 'LENGTH_LONG',
              });
            } else {
              submitNow();
            }
          } else {
            submitNow();
          }
        }
      }
    }
  };

  const submitNow = () => {
    let arrQty = parseInt(qty - 1);
    let editPass = cartItems;
    let y = moment(cardExpired).format('YYYY');
    let m = moment(cardExpired).format('MM');
    let d = moment(cardExpired).format('DD');

    let dataDocs = {
      cardType: 'PP',
      cardNum: cardNum,
      cardIssuePlace: cardIssuePlace,
      cardIssuePlaceName: cardIssuePlaceName,
      cardExpired: {
        year: y,
        month: m,
        day: d,
      },
    };

    editPass[arrQty].paxType = paxType;
    editPass[arrQty].firstName = firstName;
    editPass[arrQty].lastName = lastName;
    editPass[arrQty].phone = phone;
    editPass[arrQty].email = email;
    editPass[arrQty].title = title;
    editPass[arrQty].nationality = nationality;
    editPass[arrQty].dob = moment(dob).format('YYYY-MM-DD');
    editPass[arrQty].docs = dataDocs;

    navigation.navigate('FormPemesanan', {
      cartItems: editPass,
    });
  };

  useEffect(() => {
    if (titleSheet) {
      titleSheetRef.current?.setModalVisible(true);
    } else {
      titleSheetRef.current?.setModalVisible(false);
    }
  }, [titleSheet]);

  useEffect(() => {
    if (nationalSheet) {
      nationalSheetRef.current?.setModalVisible(true);
    } else {
      nationalSheetRef.current?.setModalVisible(false);
    }
  }, [nationalSheet]);

  useEffect(() => {
    if (baggageSheet) {
      baggageSheetRef.current?.setModalVisible(true);
    } else {
      baggageSheetRef.current?.setModalVisible(false);
    }
  }, [baggageSheet]);

  return (
    <View style={styles.page}>
      <Header title={titleForm} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Input
            label="Nama Depan"
            placeholder="Masukkan Nama Depan"
            desc="Isi sesuai KTP/Paspor/SIM (tanpa tanda baca dan gelar)"
            value={firstName}
            onChangeText={(firstName) => setfirstName(firstName)}
          />
          <Gap height={13} />
          <Input
            label="Nama Belakang"
            placeholder="Masukkan Nama Belakang"
            desc="Isi sesuai KTP/Paspor/SIM (tanpa tanda baca dan gelar)"
            value={lastName}
            onChangeText={(lastName) => setlastName(lastName)}
          />
          <Gap height={13} />
          <Input
            label="Sapaan"
            placeholder="Pilih Sapaan"
            value={
              title === 'MR' ? 'Tuan' : title === 'MRS' ? 'Nyonya' : 'Nona'
            }
            isText
            onPress={() => setTitleSheet(true)}
          />
          <Gap height={13} />
          <Text style={[styles.textForm, s.fontWSB]}>Tanggal Lahir</Text>
          <View style={[styles.sectionForm]}>
            <TextInput
              editable={false}
              autoCorrect={false}
              style={[s.PulsaInputBoxNew, s.black, s.fontWSR]}
              placeholder="Masukkan Tanggal"
              placeholderTextColor="#d2d2d2"
              value={moment(dob).format('YYYY-MM-DD')}
              maxLength={20}
              minLength={14}
            />
            {show && (
              <DateTimePicker
                maximumDate={new Date()}
                testID="dateTimePicker"
                value={dob}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={changeDate}
              />
            )}
            <TouchableOpacity
              style={s.hrefContact}
              onPress={() => {
                setShow(true);
              }}>
              <SvgXml width={23} height={23} xml={IconCalendarBlack} />
            </TouchableOpacity>
          </View>
          {gender !== 'Bayi' ? (
            <>
              <Gap height={13} />
              <Input
                label="Nomor Telepon"
                placeholder="Masukkan Nomor Telepon"
                keyboardType="numeric"
                desc=""
                value={phone}
                onChangeText={(phone) => setPhone(phone)}
              />
              <Gap height={13} />
              <Input
                label="Email"
                placeholder="Masukkan Email"
                keyboardType="email-address"
                desc=""
                value={email}
                onChangeText={(email) => setEmail(email)}
              />
            </>
          ) : null}
          <Gap height={13} />
          <Input
            label="Kewarganegaraan"
            placeholder="Pilih Kewarganegaraan"
            value={nationalityName}
            isText
            onPress={() => {
              navigation.push('Country', {
                pages: 'FormPenumpang',
                field: 'Kewarganegaraan',
              });
            }}
          />
          {country1 !== country2 ? (
            <>
              <Gap height={10} />
              <Text style={[styles.textForm, s.fontWSB, {fontSize: 15}]}>
                Data Paspor
              </Text>
              <Text style={[styles.textForm, s.fontWSR, {fontSize: 12}]}>
                Data Paspor diperlukan untuk penerbangan international
              </Text>
              <Gap height={15} />
              <Input
                label="Nomor Paspor"
                placeholder="Masukkan Nomor Paspor"
                value={cardNum}
                onChangeText={(cardNum) => setcardNum(cardNum)}
              />
              <Gap height={13} />
              <Text style={[styles.textForm, s.fontWSB]}>
                Tanggal Berakhir Paspor
              </Text>
              <View style={[styles.sectionForm]}>
                <TextInput
                  editable={false}
                  autoCorrect={false}
                  style={[s.PulsaInputBoxNew, s.black, s.fontWSR]}
                  placeholder="Masukkan Tanggal"
                  placeholderTextColor="#d2d2d2"
                  value={moment(cardExpired).format('YYYY-MM-DD')}
                  maxLength={20}
                  minLength={14}
                />
                {show2 && (
                  <DateTimePicker
                    minimumDate={new Date()}
                    testID="dateTimePicker"
                    value={cardExpired}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={changeDate2}
                  />
                )}
                <TouchableOpacity
                  style={s.hrefContact}
                  onPress={() => {
                    setShow2(true);
                  }}>
                  <SvgXml width={23} height={23} xml={IconCalendarBlack} />
                </TouchableOpacity>
              </View>
              <Gap height={10} />
              <Input
                label={'Negara Penerbit Paspor'}
                placeholder="Pilih Negara Penerbit Paspor"
                value={cardIssuePlaceName}
                isText
                onPress={() => {
                  navigation.push('Country', {
                    pages: 'FormPenumpang',
                    field: 'Negara Penerbit Paspor',
                  });
                }}
              />
            </>
          ) : null}
          {dataBagasiPergi.length > 0 ? (
            <>
              <Gap height={14} />
              <Text weight="bold" size={16} color="#000000">
                {dataBagasiPulang.length > 0 ? 'Bagasi Pergi' : 'Bagasi'}
              </Text>
              <Gap height={10} />
              {dataBagasiPergi.map((item, key) => (
                <View key={key} style={{marginBottom: 10}}>
                  {item.ssrs.length > 0 ? (
                    <CardTouch
                      title={`${item.route}${
                        item.ssrText ? `\n${item.ssrText}` : ``
                      }`}
                      onPress={() =>
                        getBaggage(item, item.ssrRoute, 'pergi', key)
                      }
                    />
                  ) : null}
                </View>
              ))}
            </>
          ) : null}
          {dataBagasiPulang.length > 0 ? (
            <>
              <Text weight="bold" size={16} color="#000000">
                Bagasi Pulang
              </Text>
              <Gap height={10} />
              {dataBagasiPulang.map((item, key) => (
                <View key={key} style={{marginBottom: 10}}>
                  {item.ssrs.length > 0 ? (
                    <CardTouch
                      title={`${item.route}${
                        item.ssrText ? `\n${item.ssrText}` : ``
                      }`}
                      onPress={() =>
                        getBaggage(item, item.ssrRoute, 'pulang', key)
                      }
                    />
                  ) : null}
                </View>
              ))}
            </>
          ) : null}
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <Button
          title="Simpan"
          onPress={() => {
            submitPassenger();
          }}
        />
      </View>

      {/*  */}
      <ActionSheet
        actionRef={baggageSheetRef}
        onClose={() => {
          setBaggageSheet(false);
        }}
        paddingHorizontal={20}
        title={`Bagasi ${titleBagasi}`}>
        <TouchableOpacity
          style={[
            s.hrefContact,
            {
              marginRight: 20,
              marginTop: 5,
              paddingHorizontal: 15,
              paddingVertical: 10,
            },
          ]}
          onPress={() => {
            resetBaggage();
          }}>
          <Text style={[styles.textForm, s.fontWSB]}>Reset</Text>
        </TouchableOpacity>
        {dataBagasi.length > 0 ? (
          <View style={[styles.padding, {marginBottom: 20, paddingTop: 0}]}>
            {dataBagasi.map((item, key) => (
              <ListSelect
                key={key}
                title={`${item.ssrText}`}
                checked={item.ssrWeight === paxType ? true : false}
                onPress={() => addBaggage(item)}
              />
            ))}
          </View>
        ) : null}
      </ActionSheet>
      {/*  */}

      {/*  */}
      <ActionSheet
        actionRef={titleSheetRef}
        onClose={() => {
          setTitleSheet(false);
        }}
        paddingHorizontal={20}
        title="Pilih Title">
        <View style={styles.padding}>
          {dataTitle.map((item, key) => (
            <View key={key}>
              {gender !== 'Dewasa' ? (
                item.code !== 'MRS' ? (
                  <>
                    <ListSelect
                      title={item.name}
                      checked={item.code === paxType ? true : false}
                      onPress={() => updateTitle(item.code)}
                    />
                  </>
                ) : null
              ) : (
                <ListSelect
                  title={item.name}
                  checked={item.code === paxType ? true : false}
                  onPress={() => updateTitle(item.code)}
                />
              )}
            </View>
          ))}
        </View>
      </ActionSheet>
      {/*  */}
    </View>
  );
};

export default FormPenumpang;

const styles = StyleSheet.create({
  textForm: {
    fontSize: 12,
    color: '#000000',
  },
  sectionForm: {
    height: 45,
    flexDirection: 'row',
    marginVertical: 5,
    marginLeft: 0,
    marginRight: 0,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.9,
  },
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  padding: {
    paddingHorizontal: 20,
  },
  bottom: {
    paddingHorizontal: 25,
    paddingBottom: 32,
    paddingTop: 25,
  },
});
