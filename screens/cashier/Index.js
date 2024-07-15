import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  RefreshControl,
  InteractionManager,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {
  apiCashierSumMontly,
  apiHistoryTransaction,
  apiCashierViewSetHarga,
  apiCashierAddTransaksi,
  apiCashierInputPengeluaran,
  apiCashierTarikUntung,
  apiCashierReset,
} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {
  getSession,
  getSnackBar_error,
  getSnackBar_success,
  getRupiah,
} from '../../helpers/Helpers';
import Ripple from 'react-native-material-ripple';
import ModalPin from '../../content/modal/ModalPin';
import ModalPrice from '../../content/modal/ModalPrice';
import ModalNotif from '../../content/modal/ModalNotif';
import styles from '../../assets/styles/Style';
import IconBack from '../../assets/svg/back.svg';
import IconHome from '../../assets/svg/home-kasir.svg';
import IconUntung from '../../assets/svg/untung.svg';
import IconJual from '../../assets/svg/jual.svg';
import IconBulanKasir from '../../assets/svg/bulan-kasir.svg';
import IconRightArrow from '../../assets/svg/right-arrow.svg';
import moment from 'moment';
import 'moment/locale/id';
import { IcAngsuranKredit, IcRoaming } from '../../assets';
moment.locale('id');

const Cashier = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalPin, setModalPin] = useState(false);
  const [modalTarik, setModalTarik] = useState(false);
  const [modalReset, setModalReset] = useState(false);
  const [pin, setPin] = useState('');
  const [idUser, setIdUser] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [totalKeuntungan, setTotalKeuntungan] = useState(0);
  const [totalPenjualan, setTotalPenjualan] = useState(0);
  const [amount, setAmount] = useState(0);
  const [titleMenu, setTitleMenu] = useState('');
  let isMounted = true;

  const isLogged = async () => {
    let idUser_ = await getSession('idUser').then((idUser) => {
      return idUser;
    });
    let nameUser_ = await getSession('nameUser').then((nameUser) => {
      return nameUser;
    });
    if (isMounted) {
      loadSum(idUser_);
      setIdUser(idUser_);
      setNameUser(nameUser_);
    }
    await useApiPost(apiHistoryTransaction(), {
      startDate: moment(dateStart).format('YYYY-MM-DD'),
      endDate: moment(dateEnd).format('YYYY-MM-DD'),
      page: 0, //munculkan semua data transaksi hari ini
    })
      .then(async (res) => {
        if (isMounted) {
          if (res.statusCode === 200) {
            let val1 = res.values;
            let vals = val1.data.data;
            for (var i = 0; i < vals.length; i++) {
              let idtrx = vals[i].transactionId;
              let name = vals[i].productName;
              let harga_modal = vals[i].price;
              let dates = vals[i].transactionDate;

              if (vals[i].status === 'SUKSES') {
                await useApiPost(apiCashierViewSetHarga(), {
                  resellerId: idUser_,
                  productCode: vals[i].productCode,
                  page: 1,
                })
                  .then(async (resHarga) => {
                    let val = resHarga.values;
                    let hargajual = 0;
                    if (parseInt(val.total) > 0) {
                      let datas = val.data;
                      hargajual = datas[0].harga_jual;
                    } else {
                      hargajual = harga_modal;
                    }

                    await useApiPost(apiCashierAddTransaksi(), {
                      productCode: vals[i].productCode,
                      resellerId: idUser_,
                      trxId: idtrx,
                      name: name,
                      buyingPrice: harga_modal,
                      sellingPrice: hargajual,
                      qty: 1,
                      stock: 0,
                      unit: '',
                      productType: 'TOPINDO',
                      transactionDate: dates,
                    })
                      .then(async (saveHistory) => {
                        loadSum(idUser_);
                      })
                      .catch((error) => {
                        setIsLoading(false);
                      });
                  })
                  .catch((error) => {
                    setIsLoading(false);
                  });
              } else {
                loadSum(idUser_);
              }
            }
          } else if (res.statusCode === 500) {
            loadSum(idUser_);
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          } else {
            setIsLoading(false);
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const loadSum = async (idUser_) => {
    await useApiPost(apiCashierSumMontly(), {
      resellerId: idUser_,
      month: moment(new Date()).format('MM'),
      year: moment(new Date()).format('YYYY'),
    })
      .then((res) => {
        if (isMounted) {
          if (res.statusCode === 200) {
            setIsLoading(false);
            let val = res.values;
            let len = val.data[0];
            if (parseInt(val.data.length) > 0) {
              setTotalPenjualan(len.total_penjualan);
              setTotalKeuntungan(len.keuntungan);
            } else {
              setTotalPenjualan(0);
              setTotalKeuntungan(0);
            }
          } else {
            setIsLoading(false);
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
  };

  const tarikKeuntungan = async () => {
    let amo = amount.replace(/[^0-9]/g, '');
    if (parseInt(totalKeuntungan) > 0) {
      if (parseInt(amo) > 0) {
        setModalTarik(false);
        setTimeout(async () => {
          setIsLoading(true);
          await useApiPost(apiCashierTarikUntung(), {
            resellerId: idUser,
            amount: amo,
          })
            .then((res) => {
              setIsLoading(false);
              if (res.statusCode === 200) {
                setAmount('');
                isLogged();
                return getSnackBar_success({
                  title: res.values.message,
                  duration: 'LENGTH_INDEFINITE',
                });
              } else {
                getSnackBar_error({
                  title: res.values.message,
                  duration: 'LENGTH_INDEFINITE',
                });
              }
            })
            .catch((error) => {
              setIsLoading(false);
            });
        }, 500);
      } else {
        getSnackBar_error({
          title: 'Masukkan Jumlah',
          duration: 'LENGTH_INDEFINITE',
        });
      }
    } else {
      getSnackBar_error({
        title: 'Anda tidak memiliki keuntungan',
        duration: 'LENGTH_INDEFINITE',
      });
    }
  };

  const inputPengeluaran = async () => {
    let amo = amount.replace(/[^0-9]/g, '');
    if (parseInt(totalKeuntungan) > 0) {
      if (parseInt(amo) > 0) {
        setModalTarik(false);
        setTimeout(async () => {
          setIsLoading(true);
          await useApiPost(apiCashierInputPengeluaran(), {
            resellerId: idUser,
            amount: amo,
          })
            .then((res) => {
              setIsLoading(false);
              if (res.statusCode === 200) {
                setAmount('');
                isLogged();
                return getSnackBar_success({
                  title: res.values.message,
                  duration: 'LENGTH_INDEFINITE',
                });
              } else {
                getSnackBar_error({
                  title: res.values.message,
                  duration: 'LENGTH_INDEFINITE',
                });
              }
            })
            .catch((error) => {
              setIsLoading(false);
            });
        }, 500);
      } else {
        getSnackBar_error({
          title: 'Masukkan Jumlah',
          duration: 'LENGTH_INDEFINITE',
        });
      }
    } else {
      getSnackBar_error({
        title: 'Anda tidak memiliki keuntungan',
        duration: 'LENGTH_INDEFINITE',
      });
    }
  };

  const resetCahierAction = async () => {
    setModalReset(false);
    setIsLoading(true);
    setTimeout(async () => {
      await useApiPost(apiCashierReset(), {
        resellerId: idUser,
      })
        .then((res) => {
          if (res.statusCode === 200) {
            isLogged();
            return getSnackBar_success({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          } else {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, 500);
  };

  const amountChange = (value, index) => {
    if (value) {
      let valu = value.replace(/[^0-9]/g, '');
      setAmount(getRupiah(valu));
    } else {
      setAmount('');
    }
  };

  const chooseMenu = (data) => {
    setTitleMenu(data);
    setModalTarik(true);
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    InteractionManager.runAfterInteractions(() => {
      isLogged();
      loadSum(idUser);
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <View style={[styles.headerCashier, styles.pl25]}>
        <View style={styles.col10}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <SvgXml width={23} height={23} xml={IconBack} />
          </TouchableOpacity>
        </View>
        <View style={[styles.col50]} />
        <View style={[styles.col40, styles.center]}>
          <View style={[styles.leftText, styles.row]}>
            <View style={styles.pt5}>
              <SvgXml width={20} height={20} xml={IconHome} />
            </View>
            <View style={styles.pl5}>
              <Text
                style={[
                  styles.leftText,
                  styles.right,
                  styles.white,
                  styles.fs12,
                  styles.fontWSB,
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {nameUser ? nameUser : '-'}
              </Text>

              <Text
                style={[
                  styles.leftText,
                  styles.white,
                  styles.fs10,
                  styles.fontWSR,
                ]}>
                {idUser ? idUser : '-'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.bgWhite]}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }>
        <View style={styles.boxInjekKasir}>
          <View
            style={[
              styles.pl25,
              styles.pb15,
              styles.bgBlue,
              {borderBottomLeftRadius: 50, zIndex: 1000},
            ]}>
            <Text style={styles.nameUserProfile}>Kasir</Text>
            <Text
              style={[styles.fs11, styles.fontWSR, styles.white, styles.mb20]}>
              Kelola keuangan usaha anda
            </Text>
            <View style={styles.row}>
              <View style={[styles.col50, styles.row]}>
                <View>
                  <SvgXml width={35} height={35} xml={IcAngsuranKredit} />
                </View>
                <View style={styles.pl5}>
                  <Text
                    style={[
                      styles.leftText,
                      styles.right,
                      styles.white,
                      styles.fs15,
                      styles.fontWSB,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {getRupiah(totalPenjualan)}
                  </Text>

                  <Text
                    style={[
                      styles.leftText,
                      styles.white,
                      styles.fs10,
                      styles.fontWSR,
                    ]}>
                    Total Penjualan
                  </Text>
                </View>
              </View>
              <View style={[styles.col50, styles.row]}>
                <>
                  <SvgXml width={35} height={35} xml={IcRoaming} />
                </>
                <View style={styles.pl5}>
                  <Text
                    style={[
                      styles.leftText,
                      styles.right,
                      styles.white,
                      styles.fs15,
                      styles.fontWSB,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {getRupiah(totalKeuntungan)}
                  </Text>

                  <Text
                    style={[
                      styles.leftText,
                      styles.white,
                      styles.fs10,
                      styles.fontWSR,
                    ]}>
                    Total Keuntungan
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.rowsKasir]}>
          <View style={styles.col75}>
            <Text style={[styles.fontWSB, styles.fs14, styles.black]}>
              Reset Data Kasir
            </Text>
            <Text style={[styles.fontWSR, styles.fs11, styles.grey75]}>
              Data kasir bisa Anda reset untuk penyesuaian data
            </Text>
          </View>
          <View style={[styles.col25, styles.center]}>
            <Ripple
              style={styles.addTrxCashier}
              onPress={() => setModalReset(true)}>
              <Text style={[styles.fs12, styles.black, styles.fontWSR]}>
                Reset
              </Text>
            </Ripple>
          </View>
        </View>

        <Ripple
          onPress={() => navigation.push('DaftarHutang')}
          style={styles.rowsKasir}>
          <View style={styles.col90}>
            <Text style={[styles.fontWSB, styles.fs14, styles.black]}>
              Daftar Piutang
            </Text>
            <Text style={[styles.fontWSR, styles.fs11, styles.grey75]}>
              Mencatat Daftar Hutang Pembeli terhadap Toko
            </Text>
          </View>
          <View style={[styles.col10, styles.center]}>
            <SvgXml width={20} height={20} xml={IconRightArrow} />
          </View>
        </Ripple>
        <Ripple
          onPress={() => navigation.push('DaftarHutangSup')}
          style={styles.rowsKasir}>
          <View style={styles.col90}>
            <Text style={[styles.fontWSB, styles.fs14, styles.black]}>
              Daftar Hutang Supplier
            </Text>
            <Text style={[styles.fontWSR, styles.fs11, styles.grey75]}>
              Mencatat Daftar Hutang Toko terhadap supplier
            </Text>
          </View>
          <View style={[styles.col10, styles.center]}>
            <SvgXml width={20} height={20} xml={IconRightArrow} />
          </View>
        </Ripple>
        <Ripple
          onPress={() => navigation.push('LaporanBulanan')}
          style={styles.rowsKasir}>
          <View style={styles.col90}>
            <Text style={[styles.fontWSB, styles.fs14, styles.black]}>
              Laporan
            </Text>
            <Text style={[styles.fontWSR, styles.fs11, styles.grey75]}>
              Daftar Transaksi Anda dan Atur Harga Jual
            </Text>
          </View>
          <View style={[styles.col10, styles.center]}>
            <SvgXml width={20} height={20} xml={IconRightArrow} />
          </View>
        </Ripple>
        <Ripple
          onPress={() => {
            chooseMenu('Tarik Keuntungan');
          }}
          style={styles.rowsKasir}>
          <View style={styles.col90}>
            <Text style={[styles.fontWSB, styles.fs14, styles.black]}>
              Tarik Keuntungan
            </Text>
            <Text style={[styles.fontWSR, styles.fs11, styles.grey75]}>
              Menarik Total Keuntungan tercatat
            </Text>
          </View>
          <View style={[styles.col10, styles.center]}>
            <SvgXml width={20} height={20} xml={IconRightArrow} />
          </View>
        </Ripple>
        <Ripple
          onPress={() => {
            chooseMenu('Input Pengeluaran');
          }}
          style={styles.rowsKasir}>
          <View style={styles.col90}>
            <Text style={[styles.fontWSB, styles.fs14, styles.black]}>
              Input Pengeluaran
            </Text>
            <Text style={[styles.fontWSR, styles.fs11, styles.grey75]}>
              Mengelola daftar pengeluaran toko
            </Text>
          </View>
          <View style={[styles.col10, styles.center]}>
            <SvgXml width={20} height={20} xml={IconRightArrow} />
          </View>
        </Ripple>
      </ScrollView>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          padding: 10,
        }}>
        <View style={[styles.col50, styles.center, styles.pr5]}>
          <Ripple
            onPress={() => navigation.push('AddTransaction')}
            style={styles.btnPrimaryFull}>
            <Text style={[styles.fs13, styles.fontWSM, styles.white]}>
              Mulai Jualan
            </Text>
          </Ripple>
        </View>
        <View style={[styles.col50, styles.center, styles.pl5]}>
          <Ripple
            onPress={() => navigation.push('CatatChoose')}
            style={styles.btnPrimaryOutlineFull}>
            <Text style={[styles.fs13, styles.fontWSM, styles.blue]}>
              Catat Hutang
            </Text>
          </Ripple>
        </View>
      </View>

      <ModalPrice
        modal={'normal'}
        isVisible={modalTarik}
        onSwipeComplete={() => setModalTarik(false)}
        value={amount}
        onChangeText={amountChange}
        title={titleMenu}
        titleClose={'Batal'}
        titleButton={titleMenu === 'Tarik Keuntungan' ? 'Tarik' : 'Simpan'}
        placeholder="Contoh : 10.000"
        onPressClose={() => {
          setModalTarik(false);
        }}
        onPress={() => {
          titleMenu === 'Tarik Keuntungan'
            ? tarikKeuntungan()
            : inputPengeluaran();
        }}
      />

      <ModalNotif
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalReset}
        onSwipeComplete={() => setModalReset(false)}
        title={'Notifikasi'}
        message={'Apa Anda yakin akan reset data penjualan ?'}
        titleClose={'Tidak'}
        titleButton={'Ya'}
        onPressClose={() => {
          setModalReset(false);
        }}
        onPress={() => {
          resetCahierAction();
        }}
      />

      <ModalPin
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalPin}
        onSwipeComplete={() => setModalPin(false)}
        value={pin}
        onChangeText={(pin) => setPin(pin)}
        title={'Tukar Poin'}
        ket={'Tukar Dengan : Kaos Polo'}
        titleClose={'Batal'}
        titleButton={'Topup'}
        onPressClose={() => {
          setModalPin(false);
        }}
        onPress={() => {}}
      />
    </SafeAreaView>
  );
};

export default Cashier;
