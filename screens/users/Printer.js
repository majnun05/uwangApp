import React, {PureComponent} from 'react';
import {
  ActivityIndicator,
  Platform,
  View,
  BackHandler,
  DeviceEventEmitter,
  NativeEventEmitter,
  Switch,
  TouchableOpacity,
  ToastAndroid,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import IconBack from '../../assets/svg/back.svg';
import IconBluetooth from '../../assets/svg/bluetooth.svg';
import IconRightArrow from '../../assets/svg/right-arrow.svg';
import IconEmpty from '../../assets/svg/empty.svg';
import styles from '../../assets/styles/Style';
import {setSession, getSession, getSnackBar_error} from '../../helpers/Helpers';

export default class Printer extends PureComponent {
  _listeners = [];

  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      devices: null,
      pairedDs: [],
      foundDs: [],
      bleOpend: false,
      qrCode: true,
      loading: true,
      boundAddress: '',
      debugMsg: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      this.setState({
        isLoading: false,
      });
    }

    this.enableQrCode();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    BluetoothManager.isBluetoothEnabled().then(
      (enabled) => {
        this.setState({
          bleOpend: Boolean(enabled),
          loading: false,
        });
      },
      (err) => {
        //log
      },
    );

    if (Platform.OS === 'ios') {
      let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
          (rsp) => {
            this._deviceAlreadPaired(rsp);
          },
        ),
      );
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_FOUND,
          (rsp) => {
            this._deviceFoundEvent(rsp);
          },
        ),
      );
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_CONNECTION_LOST,
          () => {
            this.setState({
              name: '',
              boundAddress: '',
            });
          },
        ),
      );
    } else if (Platform.OS === 'android') {
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
          (rsp) => {
            this._deviceAlreadPaired(rsp);
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_FOUND,
          (rsp) => {
            this._deviceFoundEvent(rsp);
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_CONNECTION_LOST,
          () => {
            this.setState({
              name: '',
              boundAddress: '',
            });
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
          () => {
            ToastAndroid.show(
              'Device Not Support Bluetooth !',
              ToastAndroid.LONG,
            );
          },
        ),
      );
    }
  }

  async enableQrCode() {
    let qrCode = await getSession('qrCode').then((qrCode) => {
      return qrCode;
    });

    if (this._isMounted) {
      this.setState({
        qrCode: qrCode === 'false' ? false : true,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  _deviceAlreadPaired(rsp) {
    var ds = null;
    if (typeof rsp.devices == 'object') {
      ds = rsp.devices;
    } else {
      try {
        ds = JSON.parse(rsp.devices);
      } catch (e) {
        //log
      }
    }
    if (ds && ds.length) {
      let pared = this.state.pairedDs;
      pared = pared.concat(ds || []);
      this.setState({
        pairedDs: pared,
      });
    }
  }

  _deviceFoundEvent(rsp) {
    //alert(JSON.stringify(rsp))
    var r = null;
    try {
      if (typeof rsp.device == 'object') {
        r = rsp.device;
      } else {
        r = JSON.parse(rsp.device);
      }
    } catch (e) {
      //alert(e.message);
      //ignore
      //log
    }
    //alert('f')
    if (r) {
      let found = this.state.foundDs || [];
      if (found.findIndex) {
        let duplicated = found.findIndex(function (x) {
          return x.address == r.address;
        });
        //CHECK DEPLICATED HERE...
        if (duplicated == -1) {
          found.push(r);
          this.setState({
            foundDs: found,
          });
        }
      }
    }
  }

  _renderRow(rows) {
    let items = [];

    if (rows.length > 0) {
      for (let i in rows) {
        let row = rows[i];
        if (row.address) {
          items.push(
            <TouchableOpacity
              style={[styles.row, styles.mt5]}
              key={new Date().getTime() + i}
              onPress={() => {
                this.setState({
                  loading: true,
                });
                BluetoothManager.connect(row.address).then(
                  (s) => {
                    setSession({name: 'printerName', value: row.name});
                    setSession({name: 'printerID', value: row.address});
                    this.setState({
                      loading: false,
                      boundAddress: row.address,
                      name: row.name || 'UNKNOWN',
                    });
                  },
                  (e) => {
                    this.setState({
                      loading: false,
                    });
                    getSnackBar_error({
                      title: e.toString(),
                      duration: 'LENGTH_LONG',
                    });
                  },
                );
              }}>
              <View style={[styles.col15, styles.centerOnly, styles.mt5]}>
                <SvgXml width={23} height={23} xml={IconBluetooth} />
              </View>
              <View style={[styles.col85, styles.pb10, styles.mb5]}>
                <View style={[styles.borderBottom, styles.pb10, styles.row]}>
                  <View style={[styles.col90, styles.centerContent]}>
                    <Text style={styles.PulsaTextPhoneNotHeight}>
                      {row.name || 'UNKNOWN'}
                    </Text>
                    <View style={[styles.mt5]}>
                      <Text
                        style={[styles.fs11, styles.fontWSR, styles.grey92]}>
                        {row.address}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.col10, styles.center]}>
                    <SvgXml width={23} height={20} xml={IconRightArrow} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>,
          );
        }
      }
    } else {
      items.push(
        <View style={styles.boxEmpty} key={rows.length}>
          <SvgXml width={120} height={120} xml={IconEmpty} />
          <Text style={styles.textEmpty}>Tidak Ada Data</Text>
        </View>,
      );
    }

    return items;
  }

  async printStruk() {
    try {
      await BluetoothEscposPrinter.printerInit();
      await BluetoothEscposPrinter.printerLeftSpace(0);

      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      );
      await BluetoothEscposPrinter.setBlob(1);
      await BluetoothEscposPrinter.printText('UWANG\r\n', {});
      await BluetoothEscposPrinter.setBlob(0);
      await BluetoothEscposPrinter.printText(
        'Jln.P.Diponegoro No.48 Singkawang, Kalimantan Barat (Kode pos 79123)\r\n',
        {},
      );
      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [10, 2, 20],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
        ],
        ['Waktu', ':', '20/10/2019 10:10:10'],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [10, 2, 20],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
        ],
        ['SN', ':', '56786578687686867'],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [10, 2, 20],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
        ],
        ['Tujuan', ':', '08966478xxxx'],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [10, 2, 20],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
        ],
        ['Produk', ':', 'THREE 1K'],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [10, 2, 20],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
        ],
        ['Bayar', ':', 'Tunai'],
        {},
      );
      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [10, 2, 20],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
        ],
        ['Harga', ':', 'Rp  1.350'],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [10, 2, 20],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
        ],
        ['Admin', ':', 'Rp  0'],
        {},
      );
      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );
      await BluetoothEscposPrinter.setBlob(0);
      await BluetoothEscposPrinter.printColumn(
        [10, 2, 20],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
        ],
        ['Total', ':', 'Rp  1.350'],
        {},
      );
      await BluetoothEscposPrinter.printText('\r\n', {});
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      );
      await BluetoothEscposPrinter.printText(
        'Tersedia Pulsa, kuota multi operator, Token PLN, bayar Listrik , pdam, telkom dan Multi pembayaran lainnya.\r\n',
        {},
      );

      if (this.state.qrCode) {
        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.CENTER,
        );
        await BluetoothEscposPrinter.printQRCode(
          '123455555',
          250,
          BluetoothEscposPrinter.ERROR_CORRECTION.L,
        ); //.then(()=>{alert('done')},(err)=>{alert(err)});
        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.CENTER,
        );
      }
      await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
    } catch (e) {
      // alert(e.message || 'ERROR');
    }
  }

  render() {
    return (
      <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
        <View style={styles.headerGreenNormal}>
          <View style={styles.row}>
            <View style={[styles.col10, styles.centerContent]}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <SvgXml width={23} height={23} xml={IconBack} />
              </TouchableOpacity>
            </View>
            <View style={[styles.col30, styles.centerContent, styles.pl5]}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.leftText,
                  styles.white,
                  styles.fs15,
                  styles.fontWSB,
                ]}>
                Atur Printer
              </Text>
            </View>
            <View style={[styles.col30, styles.centerContent, styles.pl10]}>
              {this.state.loading ||
              !(
                this.state.bleOpend && this.state.boundAddress.length > 0
              ) ? null : (
                <TouchableOpacity
                  style={[styles.boxPriceSale]}
                  onPress={() => {
                    this.printStruk();
                  }}>
                  <Text
                    style={[
                      styles.fs10,
                      styles.fontWSR,
                      styles.black,
                      styles.textCenter,
                    ]}>
                    Test Print
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={[styles.col30, styles.center]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.props.navigation.navigate('LoketChange')}
                style={[styles.boxPriceSale]}>
                <Text style={[styles.black, styles.fs10, styles.fontWSR]}>
                  Pengaturan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.bgWhite]}>
          <View
            style={[
              styles.row,
              styles.bgED,
              styles.pl10,
              styles.pr10,
              styles.pt10,
              styles.pb10,
            ]}>
            <View style={[styles.col50, styles.center, styles.borderRight]}>
              <View style={[styles.row]}>
                <View style={[styles.col50, styles.centerContent]}>
                  <Text style={[styles.black, styles.fs13, styles.fontWSB]}>
                    QR Code
                  </Text>
                </View>
                <View style={[styles.col50, styles.centerContent, styles.pr10]}>
                  <Switch
                    value={this.state.qrCode}
                    onValueChange={(v) => {
                      if (!v) {
                        this.setState({
                          qrCode: false,
                        });
                        setSession({name: 'qrCode', value: 'false'});
                      } else {
                        this.setState({
                          qrCode: true,
                        });
                        setSession({name: 'qrCode', value: 'true'});
                      }
                      this.enableQrCode();
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={[styles.col50, styles.center]}>
              <View style={[styles.row]}>
                <View style={[styles.col50, styles.centerContent]}>
                  <Text style={[styles.black, styles.fs13, styles.fontWSB]}>
                    Bluetooth
                  </Text>
                </View>
                <View style={[styles.col50, styles.centerContent, styles.pr5]}>
                  <Switch
                    value={this.state.bleOpend}
                    onValueChange={(v) => {
                      this.setState({
                        loading: true,
                      });
                      if (!v) {
                        BluetoothManager.disableBluetooth().then(
                          () => {
                            this.setState({
                              bleOpend: false,
                              loading: false,
                              foundDs: [],
                              pairedDs: [],
                            });
                          },
                          (err) => {
                            getSnackBar_error({
                              title: err.toString(),
                              duration: 'LENGTH_LONG',
                            });
                          },
                        );
                      } else {
                        BluetoothManager.enableBluetooth().then(
                          (r) => {
                            var paired = [];
                            if (r && r.length > 0) {
                              for (var i = 0; i < r.length; i++) {
                                try {
                                  paired.push(JSON.parse(r[i]));
                                } catch (e) {
                                  //ignore
                                }
                              }
                            }
                            this.setState({
                              bleOpend: true,
                              loading: false,
                              pairedDs: paired,
                            });
                          },
                          (err) => {
                            this.setState({
                              loading: false,
                            });
                            getSnackBar_error({
                              title: err.toString(),
                              duration: 'LENGTH_LONG',
                            });
                          },
                        );
                      }
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.titlePrinter}>
            Terhubung ke Printer :{' '}
            <Text style={[styles.green, styles.fs12]}>
              {!this.state.name ? 'Tidak Ada Perangkat' : this.state.name}
            </Text>
          </Text>

          {this.state.loading ? (
            <ActivityIndicator
              style={styles.mt10}
              animating={true}
              size="small"
              color="#4F6CFF"
            />
          ) : null}

          {this.state.foundDs.length > 0 ? (
            <View>
              <View style={[styles.borderBottom, styles.pl10, styles.pb10]}>
                <Text style={[styles.PulsaTextPhone, styles.fs13]}>
                  Ditemukan (ketuk untuk menghubungkan)
                </Text>
              </View>
              <View style={[styles.pb10, styles.borderBottomBold, styles.pt10]}>
                {this._renderRow(this.state.foundDs)}
              </View>
            </View>
          ) : null}

          {this.state.pairedDs.length > 0 ? (
            <View
              style={[
                styles.borderBottom,
                styles.pl10,
                styles.pb10,
                styles.mb10,
              ]}>
              <Text style={[styles.PulsaTextPhone, styles.fs13]}>
                Printer Terdaftar
              </Text>
            </View>
          ) : null}
          <View style={styles.pb10}>
            {this._renderRow(this.state.pairedDs)}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={[styles.btnBuyNowFormGreen, styles.mb10]}
          onPress={() => {
            this._scan();
          }}
          activeOpacity={0.9}>
          <Text
            style={[styles.bold, styles.fs13, styles.white, styles.fontWSB]}
            uppercase={false}>
            Scan
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  _selfTest() {
    this.setState(
      {
        loading: true,
      },
      () => {
        BluetoothEscposPrinter.selfTest(() => {});

        this.setState({
          loading: false,
        });
      },
    );
  }

  _scan() {
    this.setState({
      loading: true,
    });
    BluetoothManager.scanDevices().then(
      (s) => {
        var ss = s;
        var found = ss.found;
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        var fds = this.state.foundDs;
        if (found && found.length) {
          fds = found;
        }
        this.setState({
          foundDs: fds,
          loading: false,
        });
      },
      (er) => {
        this.setState({
          loading: false,
        });
        //alert('error' + JSON.stringify(er));
        getSnackBar_error({
          title: 'Aktifkan bluetooth terlebih dahulu',
          duration: 'LENGTH_LONG',
        });
      },
    );
  }
}
