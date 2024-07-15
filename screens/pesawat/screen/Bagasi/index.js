import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  Header,
  Gap,
  Text,
  Button,
  Input,
  ActionSheet,
  ListSelect,
} from '../../components';
import ListPenumpang from './ListPenumpang';

const Bagasi = ({navigation}) => {
  const bagasiSheetRef = useRef();
  const [bagasiSheet, setBagasiSheet] = useState(false);

  useEffect(() => {
    if (bagasiSheet) {
      bagasiSheetRef.current?.setModalVisible(true);
    } else {
      bagasiSheetRef.current?.setModalVisible(false);
    }
  }, [bagasiSheet]);
  return (
    <View style={styles.page}>
      <Header title="Bagasi" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text weight="bold" size={14}>
            Penumpang
          </Text>
          <Gap height={12} />
          <ListPenumpang
            name="Tuan Dimas"
            bagasi="Bagasi : 20kg"
            imageUrl="https://seeklogo.com/images/A/Air_Asia-logo-5ACDC17858-seeklogo.com.png"
          />
          <Gap height={8} />
          <ListPenumpang
            name="Nyonya Dimas"
            bagasi="Bagasi : 20kg"
            imageUrl="https://seeklogo.com/images/A/Air_Asia-logo-5ACDC17858-seeklogo.com.png"
          />
          <Gap height={25} />
          <Text style={styles.label}>Kamu punya bagasi gratis 20kg</Text>
          <Gap height={18} />
          <Input
            placeholder="Bagasi Tambahan"
            value="10kg"
            desc="Untuk keberangkatan kurang dari 24 jam, Anda dapat membeli bagasi di bandara."
            isText
            onPress={() => setBagasiSheet(true)}
          />
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <Button
          title="Simpan"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>

      {/*  */}
      <ActionSheet
        actionRef={bagasiSheetRef}
        onClose={() => {
          setBagasiSheet(false);
        }}
        paddingHorizontal={20}
        title="Bagasi Tambahan">
        <View style={styles.padding}>
          <ListSelect
            title="0kg (+IDR 0)"
            checked={true}
            onPress={() => setBagasiSheet(false)}
          />
          <ListSelect
            title="5kg (+IDR 115.500)"
            onPress={() => setBagasiSheet(false)}
          />
          <ListSelect
            title="10kg (+IDR 231.500)"
            onPress={() => setBagasiSheet(false)}
          />
          <ListSelect
            title="20kg (+IDR 462.500)"
            onPress={() => setBagasiSheet(false)}
          />
          <ListSelect
            title="30kg (+IDR 693.500)"
            onPress={() => setBagasiSheet(false)}
          />
          <ListSelect
            title="40kg (+IDR 924.500)"
            onPress={() => setBagasiSheet(false)}
          />
        </View>
      </ActionSheet>
      {/*  */}
    </View>
  );
};

export default Bagasi;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
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
  label: {
    color: 'white',
    backgroundColor: '#00A79D',
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  padding: {
    paddingHorizontal: 20,
  },
});
