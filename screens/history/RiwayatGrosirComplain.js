import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  View,
  ActivityIndicator,
  InteractionManager,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useApiGrosirPost, useApiGrosirGet} from '../../helpers/useFetch';
import {
  apiGrosirDoneComplain,
  apiGrosirGetComplain,
  apiGrosirReplyComplain,
} from '../../helpers/endPoint';
import {getErrorGlobal} from '../../helpers/ErrorTranslate';
import {getSnackBar_success} from '../../helpers/Helpers';
import {SvgXml} from 'react-native-svg';
import s from '../../assets/styles/Style';
import ModalNotifs from '../../content/modal/ModalNotifIcon';
import Header from '../../content/header/HeaderRight';
import IconPenjual from '../../assets/svg/penjual.svg';
import IconPembeli from '../../assets/svg/pembeli.svg';
import IconRefresh from '../../assets/svg/refresh-black.svg';
import IconKirim from '../../assets/svg/kirim.svg';
import IconChat from '../../assets/svg/chats.svg';
import IconEmpty from '../../assets/svg/empty.svg';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const RiwayatGrosirComplain = (props) => {
  let {params} = props.route;

  const scrollView = useRef(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalNotif, setModalNotif] = useState(false);
  const [invoice, setinvoice] = useState(params.invoice);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [statusKomplen, setStatusKomplen] = useState(false);
  const [dataRes, setDataRes] = useState([]);
  let isMounted = true;

  const isLogged = async () => {
    let queryParam = `?`;
    queryParam += `invoice=${invoice}`;
    queryParam += `&page=${page}`;

    await useApiGrosirGet(apiGrosirGetComplain(queryParam), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setDataRes(val.data.replies ? val.data.replies : []);
            setTitle(val.data.title ? val.data.title : '');
            setStatusKomplen(
              val.data.button_close ? val.data.button_close : false,
            );
          } else {
            setDataRes([]);
            getErrorGlobal(res.values.errors);
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

  const renderDate = (check) => {
    return (
      <View
        style={
          check === 'Pembeli'
            ? {
                marginLeft: 10,
              }
            : {
                marginRight: 10,
              }
        }>
        <SvgXml
          width={40}
          height={40}
          xml={check === 'Pembeli' ? IconPembeli : IconPenjual}
        />
      </View>
    );
  };

  const submitComplain = async () => {
    if (message !== '') {
      setIsLoading(true);
      await useApiGrosirPost(apiGrosirReplyComplain(), {
        message: message,
        invoice: invoice,
      })
        .then((res) => {
          if (isMounted) {
            if (res.statusCode === 200) {
              setMessage('');
              isLogged();
              scrollView.current.scrollToEnd({animating: true});
            } else {
              setIsLoading(false);
              getErrorGlobal(res.values.errors);
            }
          }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  const submitDone = async () => {
    setModalNotif(false);
    setTimeout(async () => {
      setIsLoading(true);
      await useApiGrosirPost(apiGrosirDoneComplain(), {
        invoice: invoice,
      })
        .then((res) => {
          if (isMounted) {
            setIsLoading(false);
            if (res.statusCode === 200) {
              isLogged();
              getSnackBar_success({
                title: `Komplain telah selesai`,
                duration: 'LENGTH_LONG',
              });
            } else {
              getErrorGlobal(res.values.errors);
            }
          }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, 500);
  };

  listEmptyComponent = () => {
    return (
      <View style={[s.boxEmpty, s.pt20, s.pb20, s.bgGrey]}>
        <SvgXml width={120} height={120} xml={IconEmpty} />
        {!isLoading ? (
          <Text style={s.textEmpty}>Tidak Ada Komplain</Text>
        ) : null}
      </View>
    );
  };

  renderItem = React.useCallback(({item, index}) => {
    let inMessage = parseInt(item.type) === 1;
    let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
    return (
      <View style={[styles.item, itemStyle, s.center]} key={index}>
        {!inMessage && renderDate('Penjual')}
        <View style={[styles.balloon]}>
          <View style={styles.title}>
            <Text style={[s.fs12, s.black, s.fontWSB]}>
              {item.name ? item.name : inMessage ? 'Pembeli' : 'Penjual'}
            </Text>
            <Text style={[s.rightText, s.fs10, s.grey75, s.ml5]}>
              {item.date}
            </Text>
          </View>
          <Text style={styles.messageLeft}>{item.message}</Text>
        </View>
        {inMessage && renderDate('Pembeli')}
      </View>
    );
  });

  useEffect(() => {
    const backAction = () => {
      navigation.goBack(null);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    InteractionManager.runAfterInteractions(() => {
      isLogged();
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={[s.flex1, s.bgGrey]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Komplain'}
        shadow={true}
        right={
          <>
            {!statusKomplen ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  !isLoading ? setModalNotif(true) : null;
                }}
                style={[
                  s.boxPriceSale,
                  s.mr5,
                  {
                    width: '55%',
                    alignSelf: 'flex-end',
                    backgroundColor: '#ffffff',
                  },
                ]}>
                <Text style={[s.blue, s.fs10, s.fontWSR]}>Selesai</Text>
              </TouchableOpacity>
            ) : null}
          </>
        }
        textBlack={true}
      />
      <View style={[styles.boxTitle, s.row, s.pl20, s.pr20, s.mb5]}>
        <View style={s.col10}>
          <SvgXml width={30} height={30} xml={IconChat} />
        </View>
        <View style={[s.col80, s.centerContent, s.pl5]}>
          <Text
            style={[s.fontWSR, s.fs12, s.grey75]}
            ellipsizeMode="tail"
            numberOfLines={2}>
            {title}
          </Text>
        </View>
        <TouchableOpacity
          style={[s.col10, s.center]}
          onPress={() => {
            isLogged();
            setIsLoading(true);
          }}>
          <SvgXml width={15} height={15} xml={IconRefresh} />
        </TouchableOpacity>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        ref={scrollView}
        style={styles.list}
        data={dataRes}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={<View style={s.mb20} />}
        ListHeaderComponent={<View style={s.mt10} />}
        renderItem={this.renderItem}
        ListEmptyComponent={this.listEmptyComponent}
        removeClippedSubviews={true}
        legacyImplementation={true}
      />

      <View style={styles.footer}>
        <View style={[styles.inputContainer, s.col85]}>
          <TextInput
            editable={!isLoading ? (statusKomplen ? false : true) : false}
            style={styles.inputs}
            placeholder={
              statusKomplen ? 'komplain selesai' : 'Tulis komplain disini...'
            }
            underlineColorAndroid="transparent"
            value={message}
            onChangeText={(message) => setMessage(message)}
          />
        </View>

        <TouchableOpacity
          style={[styles.btnSend, s.col15, s.center]}
          onPress={() => {
            !isLoading ? (!statusKomplen ? submitComplain() : null) : null;
          }}>
          {!isLoading ? (
            <SvgXml width={40} height={40} xml={IconKirim} />
          ) : (
            <ActivityIndicator size="small" color="#4F6CFF" />
          )}
        </TouchableOpacity>
      </View>

      <ModalNotifs
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalNotif}
        onSwipeComplete={() => setModalNotif(false)}
        title={'Yakin ingin akhiri komplain?'}
        message={'Jika yakin, maka komplain ini akan berakhir'}
        titleClose={'Tidak'}
        titleButton={'Ya'}
        onPressClose={() => {
          setModalNotif(false);
        }}
        onPress={() => {
          submitDone();
        }}
      />
    </SafeAreaView>
  );
};

export default RiwayatGrosirComplain;

const styles = StyleSheet.create({
  boxTitle: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 5,
  },
  bgGrey: {
    backgroundColor: '#F1F1F1',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageLeft: {
    textAlign: 'left',
    fontSize: 12,
    marginTop: 3,
    color: '#929292',
  },
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    marginTop: 5,
    height: 45,
    marginLeft: 5,
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
    paddingHorizontal: 10,
    flex: 1,
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  itemIn: {
    alignSelf: 'flex-end',
  },
  itemOut: {
    alignSelf: 'flex-start',
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    marginBottom: 5,
    fontSize: 12,
    color: '#808080',
  },
  item: {
    marginTop: 5,
    marginBottom: 0,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 300,
    padding: 5,
  },
});
