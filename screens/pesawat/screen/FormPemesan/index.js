import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, ScrollView, BackHandler} from 'react-native';
import {getSnackBar_error} from '../../../../helpers/Helpers';
import {
  Header,
  Gap,
  Button,
  Input,
  ActionSheet,
  ListSelect,
} from '../../components';

const FormPemesan = ({navigation, route}) => {
  const params = route.params;
  const titleSheetRef = useRef();
  const [titleSheet, setTitleSheet] = useState(false);
  const [title, setTitle] = useState(params.title);
  const [name, setName] = useState(params.name);
  const [phone, setPhone] = useState(params.phone);
  const [email, setEmail] = useState(params.email);
  const [dataTitle, setdataTitle] = useState([
    {code: 'MR', name: 'Tuan'},
    {code: 'MRS', name: 'Nyonya'},
    {code: 'MS', name: 'Nona'},
  ]);

  const submitData = () => {
    if (name === '' || phone === '' || email === '') {
      getSnackBar_error({
        title: 'Lengkapi data terlebih dahulu',
        duration: 'LENGTH_LONG',
      });
    } else {
      navigation.navigate('FormPemesanan', {
        dataPemesanan: {
          title: title,
          name: name,
          phone: phone,
          email: email,
        },
      });
    }
  };

  const updateTitle = (codes) => {
    setTitle(codes);
    setTitleSheet(false);
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack(null);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    if (titleSheet) {
      titleSheetRef.current?.setModalVisible(true);
    } else {
      titleSheetRef.current?.setModalVisible(false);
    }
  }, [titleSheet]);

  return (
    <View style={styles.page}>
      <Header title="Data Pemesan" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
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
          <Input
            label="Nama Lengkap"
            placeholder="Masukkan Nama Lengkap"
            desc="Isi sesuai KTP/Paspor/SIM (tanpa tanda baca dan gelar)"
            value={name}
            onChangeText={(name) => setName(name)}
          />
          <Gap height={13} />
          <Input
            label="Nomor Telepon"
            placeholder="Contoh : 08123456789"
            keyboardType="numeric"
            value={phone}
            onChangeText={(phone) => setPhone(phone)}
          />
          <Gap height={13} />
          <Input
            label="Alamat Email"
            placeholder="Contoh: Uwang@gmail.com"
            desc="Alamat email digunakan untuk menerbitkan tiket elektronik jadi harap masukkan email yang valid"
            placeholder="Contoh : Uwang@gmail.com"
            keyboardType="email-address"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <Button
          title="Simpan"
          onPress={() => {
            submitData();
          }}
        />
      </View>

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
            <ListSelect
              key={key}
              title={item.name}
              checked={item.code === title ? true : false}
              onPress={() => updateTitle(item.code)}
            />
          ))}
        </View>
      </ActionSheet>
      {/*  */}
    </View>
  );
};

export default FormPemesan;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  padding: {
    paddingHorizontal: 20,
  },
  container: {
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  bottom: {
    paddingHorizontal: 25,
    paddingBottom: 32,
    paddingTop: 25,
  },
});
