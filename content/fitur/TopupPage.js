//import libraries
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import { IcWallet } from '../../assets';
import styles from '../../assets/styles/Style';
import IconSaldo from '../../assets/svg/saldo.svg';

// make a component
export default class TopupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
    };
  }

  render() {
    return (
      <View style={styles.boxInfoLain}>
        <View style={[styles.row]}>
          <View style={[styles.col15, styles.center]}>
            <SvgXml width={30} height={30} xml={IcWallet} />
          </View>
          <View style={[styles.col85, styles.centerContent]}>
            <Text style={[styles.black, styles.fs12]}>Saldo Anda</Text>
            <Text style={[styles.black, styles.bold, styles.fs15]}>
              Rp  {this.props.balance}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
