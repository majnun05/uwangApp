//import libraries
import React, {useState} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';

import styles from '../../assets/styles/Style';

const Bank = (props) => {
  const initialLayout = {width: Dimensions.get('window').width};
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'Atm', title: 'ATM'},
    {key: 'Mobile', title: 'Mobile'},
    {key: 'Internet', title: 'Internet'},
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
            Input kartu <Text style={[styles.fontWSB, styles.fs12]}>ATM</Text>{' '}
            dan <Text style={[styles.fontWSB, styles.fs12]}>PIN</Text> Anda
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
            <Text style={[styles.fontWSB, styles.fs12]}>Bayar/Beli</Text>
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
            Pilih <Text style={[styles.fontWSB, styles.fs12]}>Lainnya</Text>
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
            Pilih{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>Multi Payment</Text>
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
            Input <Text style={[styles.fontWSB, styles.fs12]}>88049</Text>
            sebagai{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>Kode Institusi</Text>
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
            Input{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              Virtual Account Number
            </Text>
            , misal.{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>88049XXXXXXXXXXX</Text>
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
            Pilih <Text style={[styles.fontWSB, styles.fs12]}>Benar</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>8</Text>
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
            masukkan jumlah{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>nominal</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>9</Text>
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
            pilih <Text style={[styles.fontWSB, styles.fs12]}>lanjut</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>10</Text>
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
            Ambil <Text style={[styles.fontWSB, styles.fs12]}>bukti bayar</Text>{' '}
            Anda
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>11</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Selesai
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
            Login{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>Mobile Banking</Text>
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
            Pilih <Text style={[styles.fontWSB, styles.fs12]}>Bayar</Text>
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
            Klik{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              Buat Pembayaran Baru
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
            Klik{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>Multi Payment</Text>
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
            Input <Text style={[styles.fontWSB, styles.fs12]}>NICEPAY</Text>{' '}
            sebagai{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>Penyedia Jasa</Text>
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
            Input{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              Nomor Virtual Account
            </Text>
            , misal.{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>88049XXXXXXXXXXX</Text>
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
            Klik{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              Tambah Sebagai Nomor Baru
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>8</Text>
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
            Klik <Text style={[styles.fontWSB, styles.fs12]}>Konfirmasi</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>9</Text>
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
            Input <Text style={[styles.fontWSB, styles.fs12]}>Nominal</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>10</Text>
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
            Pilih <Text style={[styles.fontWSB, styles.fs12]}>Lanjut</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>11</Text>
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
            Input <Text style={[styles.fontWSB, styles.fs12]}>MPIN</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>12</Text>
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
            <Text style={[styles.fontWSB, styles.fs12]}>Bukti bayar</Text>{' '}
            ditampilkan
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>13</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Selesai
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
            Login{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>Mobile Banking</Text>
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
            Pilih <Text style={[styles.fontWSB, styles.fs12]}>Pembayaran</Text>
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
            Klik{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>Multi Payment</Text>
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
            Input <Text style={[styles.fontWSB, styles.fs12]}>NICEPAY</Text>{' '}
            sebagai{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>Penyedia Jasa</Text>
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
            Input{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              Nomor Virtual Account
            </Text>
            , misal.{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>88049XXXXXXXXXXX</Text>
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
            Klik{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              Tambah Sebagai Nomor Baru
            </Text>
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
            Input <Text style={[styles.fontWSB, styles.fs12]}>Nominal</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>8</Text>
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
            <Text style={[styles.fontWSB, styles.fs12]}>Ceklist</Text> pada
            kolom jumlah
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>9</Text>
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
            Klik <Text style={[styles.fontWSB, styles.fs12]}>Konfirmasi</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>10</Text>
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
            Input{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>Kode Challenge</Text>{' '}
            yang dikirim ke ponsel anda ke dalam "Token"
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>11</Text>
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
            Klik <Text style={[styles.fontWSB, styles.fs12]}>OK</Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>12</Text>
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
            <Text style={[styles.fontWSB, styles.fs12]}>Bukti bayar</Text>{' '}
            ditampilkan
          </Text>
        </View>
      </View>
      <View
        style={[styles.row, styles.pb5, styles.pt10, styles.pl10, styles.pr10]}>
        <View style={[styles.col10, styles.centerOnly]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>13</Text>
        </View>
        <View
          style={[
            styles.col90,
            styles.pl5,
            styles.pr5,
            styles.centerContent,
            styles.pb10,
          ]}>
          <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
            Selesai
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderScene = SceneMap({
    Atm: AtmTab,
    Mobile: MobileTab,
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
