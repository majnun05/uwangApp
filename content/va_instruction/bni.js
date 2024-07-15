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
    {key: 'Internet', title: 'Internet Banking'},
    {key: 'Sms', title: 'SMS'},
    {key: 'Atmbersama', title: 'ATM Bersama'},
    {key: 'Banklain', title: 'Bank Lain'},
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
            Masukkan Kartu Anda.
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
            Pilih <Text style={[styles.fontWSB, styles.fs12]}>Bahasa</Text>
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
            Masukkan <Text style={[styles.fontWSB, styles.fs12]}>PIN</Text> ATM
            Anda.
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
            <Text style={[styles.fontWSB, styles.fs12]}>"Menu Lainnya"</Text>
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
            Pilih <Text style={[styles.fontWSB, styles.fs12]}>"Transfer"</Text>
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
            Pilih{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>Jenis rekening</Text>{' '}
            yang akan Anda gunakan (Contoh; "Dari Rekening Tabungan").
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
            Pilih{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              “Virtual Account Billing”
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
            Masukkan{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              Nomor Virtual Account
            </Text>{' '}
            Anda (contoh: 123456789012XXXX).
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
            Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi.
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
            Konfirmasi, apabila telah sesuai, lanjutkan transaksi.
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
            Transaksi Anda telah selesai.
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
            Akses BNI Mobile Banking dari handphone kemudian masukkan{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>user ID</Text> dan{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>password</Text>.
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
            <Text style={[styles.fontWSB, styles.fs12]}>“Transfer”</Text>
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
            Pilih Menu{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              “Virtual Account Billing”
            </Text>{' '}
            kemudian pilih rekening debet.
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
              Nomor Virtual Account
            </Text>{' '}
            Anda (contoh: 123456789012XXXX) pada menu{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>“input baru”</Text>
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
            Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi.
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
            Konfirmasi transaksi dan masukkan Password Transaksi.
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
            Pembayaran Anda Telah Berhasil.
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
            Ketik alamat{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              https://ibank.bni.co.id
            </Text>{' '}
            kemudian klik{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>“Enter”</Text>
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
            Masukkan <Text style={[styles.fontWSB, styles.fs12]}>User ID</Text>{' '}
            dan <Text style={[styles.fontWSB, styles.fs12]}>Password</Text>
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
            Pilih menu{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>“Transfer”</Text>
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
            <Text style={[styles.fontWSB, styles.fs12]}>
              “Virtual Account Billing”
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
            Kemudian masukan{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              Nomor Virtual Account
            </Text>
            Anda (contoh: 123456789012XXXX) yang hendak dibayarkan. Lalu pilih
            rekening debet yang akan digunakan. Kemudian tekan{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>’lanjut’</Text>
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
            Kemudin tagihan yang harus dibayarkan akan muncul pada layar
            konfirmasi.
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
            Masukkan{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              Kode Otentikasi Token.
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
            Pembayaran Anda telah berhasil.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const SmsTab = () => (
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
            Buka aplikasi SMS Banking BNI.
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
            <Text style={[styles.fontWSB, styles.fs12]}>Transfer</Text>
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
            Pilih Menu{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>Trf rekening BNI.</Text>
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
              Nomor rekening tujuan
            </Text>{' '}
            dengan <Text style={[styles.fontWSB, styles.fs12]}>16 digit</Text>{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              Nomor Virtual Account
            </Text>{' '}
            (contoh: 123456789012XXXX).
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
            Masukkan <Text style={[styles.fontWSB, styles.fs12]}>Nominal</Text>{' '}
            transfer sesuai tagihan atau kewajiban Anda. Nominal yang berbeda
            tidak dapat diproses.
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
            Pilih <Text style={[styles.fontWSB, styles.fs12]}>“Proses”</Text>{' '}
            kemudian <Text style={[styles.fontWSB, styles.fs12]}>“Setuju”</Text>
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
            Reply sms dengan ketik{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>pin</Text> sesuai
            perintah.
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
            Transaksi Berhasil.
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
            Atau Dapat juga langsung mengetik sms dengan format:{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              TRF[SPASI]NomorVA[SPASI]NOMINAL
            </Text>{' '}
            dan kemudian kirim ke{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>3346</Text> Contoh : TRF
            123456789012XXXX 44000
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const AtmbersamaTab = () => (
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
            Masukkan kartu ke mesin ATM Bersama.
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
            <Text style={[styles.fontWSB, styles.fs12]}>
              "Transaksi Lainnya"
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
            Pilih Menu{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>"Transfer"</Text>
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
            <Text style={[styles.fontWSB, styles.fs12]}>
              "Transfer ke Bank Lain"
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
            Masukkan kode bank BNI{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>(009)</Text>
            dan <Text style={[styles.fontWSB, styles.fs12]}>16 Digit</Text>{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              Nomor Virtual Account
            </Text>{' '}
            (contoh: 123456789012XXXX).
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
            Masukkan <Text style={[styles.fontWSB, styles.fs12]}>nominal</Text>{' '}
            transfer sesuai tagihan atau kewajiban Anda. Nominal yang berbeda
            tidak dapat diproses.
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
            Konfirmasi rincian Anda akan tampil di layar, cek dan tekan{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>Ya</Text> untuk
            melanjutkan.
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
            Transaksi Berhasil.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const BanklainTab = () => (
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
            Pilih menu{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              "Transfer antar bank"
            </Text>{' '}
            atau{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              “Transfer online antar bank”
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
            Masukkan kode bank BNI{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>(009)</Text> atau pilih
            bank yang dituju yaitu BNI.
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
            Masukkan <Text style={[styles.fontWSB, styles.fs12]}>16 Digit</Text>{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>
              Nomor Virtual Account
            </Text>{' '}
            pada kolom{' '}
            <Text style={[styles.fontWSB, styles.fs12]}>rekening tujuan</Text>,
            (contoh: 123456789012XXXX).
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
            Masukkan <Text style={[styles.fontWSB, styles.fs12]}>Nominal</Text>{' '}
            transfer sesuai tagihan atau kewajiban Anda. Nominal yang berbeda
            tidak dapat diproses.
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
            <Text style={[styles.fontWSB, styles.fs12]}>jumlah pembayaran</Text>
            (contoh: 44000).
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
            Konfirmasi rincian Anda akan tampil di layar, cek dan apabila sudah
            sesuai silahkan lanjutkan transaksi sampai dengan selesai.
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
            Transaksi Berhasil.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderScene = SceneMap({
    Atm: AtmTab,
    Mobile: MobileTab,
    Internet: InternetTab,
    Sms: SmsTab,
    Atmbersama: AtmbersamaTab,
    Banklain: BanklainTab,
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
