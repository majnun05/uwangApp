//import libraries
import React from 'react';
import {View, Text} from 'react-native';
import Ripple from 'react-native-material-ripple';
import IconSaldo from '../../assets/svg/saldo.svg';
import IconSaldoQris from '../../assets/svg/saldo-qris.svg';
import styles from '../../assets/styles/Style';
import {SvgXml} from 'react-native-svg';

// make a component
const SaldoHome = (props) => {
  let lockKYC = props.lockKYC ? props.lockKYC : {};

  return (
    <View style={[styles.boxInfoHomeUpdate]}>
      <View style={styles.row}>
        <View
          style={[
            styles.col25,
            styles.centerContent,
            styles.pr10,
            styles.borderRightHome1,
          ]}>
          <Ripple
            onPress={() =>
              props.navigation.push('Topup', {
                checkKyc: props.checkKyc,
                lockKYC: lockKYC,
              })
            }
            style={[styles.isiSaldoBox]}>
            <Text style={[styles.fontWSB, styles.fs11, styles.white]}>
              Isi Saldo +
            </Text>
          </Ripple>
        </View>
        <View style={[styles.col39, styles.pl5, styles.borderRightHome1]}>
          <Ripple
            onPress={props.onDeleteProfile}
            style={[styles.pulsaDataKet, styles.row, styles.center]}>
            <View style={[styles.col15]}>
              <SvgXml width={32} height={32} xml={IconSaldo} />
            </View>
            <View style={[styles.col85, styles.pl17]}>
              <Text
                style={[
                  styles.textOutline,
                  styles.black,
                  styles.fs11,
                  styles.fontWSB,
                ]}>
                {props.loadingSaldo ? (
                  <Text
                    style={[
                      styles.textOutline,
                      styles.black,
                      styles.fs12,
                      styles.fontWSB,
                    ]}>
                    Loading ...
                  </Text>
                ) : (
                  <>
                    <Text
                      style={[
                        styles.textOutline,
                        styles.black,
                        styles.fs12,
                        styles.fontWSB,
                      ]}>
                      Rp 
                    </Text>{' '}
                    {props.balance}
                  </>
                )}
              </Text>
              <Text
                style={[
                  styles.textOutline,
                  styles.TopupTitleBlack,
                  styles.fs10,
                  styles.grey92,
                  styles.fontWSR,
                ]}>
                Saldo Anda
              </Text>
            </View>
          </Ripple>
        </View>
        <View style={[styles.centerContent, styles.col35, styles.pl2]}>
          <Ripple
            onPress={() => {
              if (props.checkKyc === '2') {
                props.navigation.navigate('Qris');
              } else {
                if (lockKYC.Qris) {
                  props.navigation.navigate('MaintenanceKyc');
                } else {
                  props.navigation.navigate('Qris');
                }
              }
            }}
            style={[
              styles.pulsaDataKet,
              styles.ml5,
              styles.row,
              styles.center,
            ]}>
            <View style={[styles.col15]}>
              <SvgXml width={32} height={32} xml={IconSaldoQris} />
            </View>
            <View style={[styles.col85, styles.pl20]}>
              <Text
                style={[
                  styles.textOutline,
                  props.checkKyc === '2'
                    ? styles.black
                    : lockKYC.Qris
                    ? styles.red
                    : styles.black,
                  styles.fs11,
                  styles.fontWSB,
                ]}>
                {props.loadingQris ? (
                  <Text
                    style={[
                      styles.textOutline,
                      props.checkKyc === '2'
                        ? styles.black
                        : lockKYC.Qris
                        ? styles.red
                        : styles.black,
                      styles.fs12,
                      styles.fontWSB,
                    ]}>
                    Loading ...
                  </Text>
                ) : (
                  <>
                    {props.checkKyc === '2' ? (
                      <>
                        <Text
                          style={[
                            styles.textOutline,
                            styles.black,
                            styles.fs12,
                            styles.fontWSB,
                          ]}>
                          Rp 
                        </Text>
                      </>
                    ) : (
                      <>
                        {!lockKYC.Qris ? (
                          <Text
                            style={[
                              styles.textOutline,
                              styles.black,
                              styles.fs12,
                              styles.fontWSB,
                            ]}>
                            Rp 
                          </Text>
                        ) : null}
                      </>
                    )}
                    {props.checkKyc === '2'
                      ? props.balanceQris
                        ? props.balanceQris
                        : 0
                      : lockKYC.Qris
                      ? 'Verifikasi'
                      : props.balanceQris}
                  </>
                )}
              </Text>
              <Text
                style={[
                  styles.textOutline,
                  styles.TopupTitleBlack,
                  styles.fs10,
                  styles.grey92,
                  styles.fontWSR,
                ]}>
                Saldo QRIS
              </Text>
            </View>
          </Ripple>
        </View>
      </View>
    </View>
  );
};

// make the component available to other parts of the app
export default SaldoHome;
