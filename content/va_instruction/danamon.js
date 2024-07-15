//import libraries
import React, {useState} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';

import styles from '../../assets/styles/Style';

const Bank = (props) => {
  const initialLayout = {width: Dimensions.get('window').width};
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'Atm', title: 'ATM'},
    {key: 'Mobile', title: 'Mobile Banking'},
    {key: 'Lain', title: 'Lain'},
    {key: 'DanamonDanLain', title: 'Danamon Dan Lain'},
    {key: 'Internet', title: 'Internet Banking'},
  ]);

  const AtmTab = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.bgWhite, styles.mt10]}>
      <View style={[styles.pl15, styles.pr15, styles.mt10]}>
        <Text style={[styles.fs15, styles.black, styles.fontWSB]}>
          Instruksi Pembayaran
        </Text>
      </View>
      <View
        style={[
          styles.row,
          styles.pb5,
          styles.mt10,
          styles.pt10,
          styles.pl10,
          styles.pr10,
        ]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>1</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Input PIN ATM Anda
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pl10, styles.pr10, styles.pt10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>2</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Pilih Menu{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>Pembayaran </Text>
            <Text style={[styles.fontWSB, styles.fs12]}>Virtual Account</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>3</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Masukkan{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              nomor Virtual Account
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>4</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Masukkan <Text style={[styles.fontWSB, styles.fs12]}>Nominal</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>5</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Pada layar konfirmasi pembayaran, pastikan transaksi sudah benar -> 
            pilih <Text style={[styles.fontWSB, styles.fs12]}>Ya</Text> untuk
            memproses transaksi
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const MobileTab = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.bgWhite, styles.mt10]}>
      <View style={[styles.pl15, styles.pr15, styles.mt10]}>
        <Text style={[styles.fs15, styles.black, styles.fontWSB]}>
          Instruksi Pembayaran
        </Text>
      </View>
      <View
        style={[
          styles.row,
          styles.pb5,
          styles.mt10,
          styles.pt10,
          styles.pl10,
          styles.pr10,
        ]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>1</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Login pada Aplikasi D-Mobile
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pl10, styles.pr10, styles.pt10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>2</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Pilih Menu{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>Virtual Account</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>3</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Masukkan <Text style={[styles.fontWSB, styles.fs12]}>16 digit</Text>{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              nomor Virtual Account
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>4</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Masukkan <Text style={[styles.fontWSB, styles.fs12]}>Nominal</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>5</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Pada layar konfirmasi pembayaran, pastikan transaksi sudah benar
            pilih
            <Text style={[styles.fontWSB, styles.fs12]}> Ya</Text> untuk
            memproses transaksi
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const LainTab = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.bgWhite, styles.mt10]}>
      <View style={[styles.pl15, styles.pr15, styles.mt10]}>
        <Text style={[styles.fs15, styles.black, styles.fontWSB]}>
          Instruksi Pembayaran
        </Text>
      </View>
      <View
        style={[
          styles.row,
          styles.pb5,
          styles.mt10,
          styles.pt10,
          styles.pl10,
          styles.pr10,
        ]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>1</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Masuk ke menu{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>transfer</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pl10, styles.pr10, styles.pt10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>2</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Pilih tujuan rekening{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>Bank Danamon</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>3</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Masukkan Kode Bank Danamon{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>(011)</Text> +
            <Text style={[styles.fontWSB, styles.fs12]}>16 digit </Text>
            <Text style={[styles.fontWSB, styles.fs12]}>
              nomor Virtual Account
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>4</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Masukkan{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              nominal pembayaran
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>5</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Pada layar konfirmasi pembayaran, harap pastikan nama tujuan dan
            nominal transaksi sudah tepat
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>6</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Konfirmasi pembayaran
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const DanamonDanLainTab = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.bgWhite, styles.mt10]}>
      <View style={[styles.pl15, styles.pr15, styles.mt10]}>
        <Text style={[styles.fs15, styles.black, styles.fontWSB]}>
          Instruksi Pembayaran
        </Text>
      </View>
      <View
        style={[
          styles.row,
          styles.pb5,
          styles.mt10,
          styles.pt10,
          styles.pl10,
          styles.pr10,
        ]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>1</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Masuk ke menu{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>transfer</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pl10, styles.pr10, styles.pt10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>2</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Pilih tujuan rekening{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              bank lain (Online Transfer)
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>3</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Masukkan Kode Bank Danamon{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>(011)</Text> +
            <Text style={[styles.fontWSB, styles.fs12]}>16 digit </Text>
            <Text style={[styles.fontWSB, styles.fs12]}>
              nomor Virtual Account
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>4</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Masukkan{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              nominal pembayaran
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>5</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Pada layar konfirmasi pembayaran, harap pastikan nama tujuan dan
            nominal transaksi sudah tepat
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>6</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Konfirmasi pembayaran
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const InternetTab = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.bgWhite, styles.mt10]}>
      <View style={[styles.pl15, styles.pr15, styles.mt10]}>
        <Text style={[styles.fs15, styles.black, styles.fontWSB]}>
          Instruksi Pembayaran
        </Text>
      </View>
      <View
        style={[
          styles.row,
          styles.pb5,
          styles.mt10,
          styles.pt10,
          styles.pl10,
          styles.pr10,
        ]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>1</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Masuk ke menu{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              transfer ke bank lain
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pl10, styles.pr10, styles.pt10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>2</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Pilih{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>transfer online</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>3</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Pilih Bank tujuan,{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>Bank Danamon</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>4</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Masukkan <Text style={[styles.fontWSB, styles.fs12]}>16 digit </Text>
            <Text style={[styles.fontWSB, styles.fs12]}>
              nomor Virtual Account
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>5</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Masukkan{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              nominal pembayaran
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>6</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Pada layar konfirmasi pembayaran, harap pastikan nama tujuan dan
            nominal transaksi sudah tepat
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>7</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
            styles.borderBottom,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Konfirmasi pembayaran
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderScene = SceneMap({
    Atm: AtmTab,
    Mobile: MobileTab,
    Lain: LainTab,
    DanamonDanLain: DanamonDanLainTab,
    Internet: InternetTab,
  });

  const renderTabBar = (props) => {
    return (
      <TabBar
        style={{
          backgroundColor: '#FFFFFF',
          elevation: 0,
          borderColor: '#FFFFFF',
          borderBottomWidth: 1,
          height: 40,
        }}
        inactiveColor="#000000"
        activeColor="#FFFFFF"
        scrollEnabled={true}
        labelStyle={[
          {
            textTransform: 'capitalize',
          },
          styles.fontWSM,
          styles.mt5,
        ]}
        {...props}
        indicatorStyle={{backgroundColor: '#FFFFFF', height: 2.5}}
        renderLabel={({route, focused, color}) => (
          <Text
            style={{
              color,
              fontSize: 11,
              backgroundColor: focused ? '#4F6CFF' : '#FFFFFF',
              paddingHorizontal: 20,
              borderRadius: 100,
              paddingTop: 6,
              paddingBottom: 5,
            }}>
            {route.title}
          </Text>
        )}
      />
    );
  };

  return (
    <TabView
      indicatorStyle={{backgroundColor: 'white'}}
      style={{backgroundColor: '#FFFFFF'}}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
};

// make the component available to other parts of the app
export default Bank;
