import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  SafeAreaView,
  BackHandler,
  RefreshControl,
  Keyboard,
  InteractionManager,
  FlatList,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useApiPost, useError} from '../../helpers/useFetch';
import {apiUtilityRewards, apiTransactionRedeem} from '../../helpers/endPoint';
import {getSnackBar_error, getSession} from '../../helpers/Helpers';
import ModalPin from '../../content/modal/ModalPin';
import Header from '../../content/header/HeaderOperator';
import styles from '../../assets/styles/Style';
import IconEmpty from '../../assets/svg/empty.svg';

const Rewards = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [modalPin, setModalPin] = useState(false);
  const [pin, setPin] = useState('');
  const [dataRes, setDataRes] = useState([]);
  const [imgReward, setImgReward] = useState('');
  const [imageDefault, setImageDefault] = useState('');
  const [point, setPoint] = useState(params.point);
  const [detail, setDetail] = useState({});
  let isMounted = true;

  const {width} = Dimensions.get('window');

  // ========================
  // === Get Rewards ===
  // ========================
  const isLogged = async () => {
    let bannerReward = await getSession('bannerReward').then((bannerReward) => {
      return bannerReward;
    });
    let imgDef = await getSession('imageDefault').then((imageDefault) => {
      return imageDefault;
    });
    if (isMounted) {
      setImageDefault(imgDef);
      setImgReward(bannerReward);
    }

    await useApiPost(apiUtilityRewards(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;
            setDataRes(val.values);
          } else {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const _onRefresh = () => {
    isLogged();
  };

  const redeemNow = (item) => {
    setDetail(item);
    setModalPin(true);
  };

  const tukarSekarang = () => {
    Keyboard.dismiss();
    if (pin === '') {
      getSnackBar_error({
        title: 'Masukkan PIN Anda',
        duration: 'LENGTH_LONG',
      });
    } else {
      setModalPin(false);
      setTimeout(async () => {
        setIsLoading(true);
        await useApiPost(apiTransactionRedeem(), {
          rewardId: detail.idReward,
          pin: pin,
        })
          .then((res) => {
            setIsLoading(false);
            if (res.statusCode === 200) {
              navigation.push('RewardsSuccess', {
                message: res.values.message,
              });
              setPin('');
              setDetail({});
            } else {
              getSnackBar_error({
                title: res.values.message,
                duration: 'LENGTH_LONG',
              });
            }
          })
          .catch((error) => {
            setIsLoading(false);
          });
      }, 500);
    }
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

    InteractionManager.runAfterInteractions(() => {
      isLogged();
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, []);

  renderItem = React.useCallback(({item, index}) => {
    return (
      <View
        style={[styles.row, styles.listRwds, styles.ml20, styles.mr20]}
        key={index}>
        <View style={[styles.col25]}>
          <Image
            resizeMethod="resize"
            style={[styles.imageProdukRewardList, {borderRadius: 10}]}
            source={{
              uri: item.imgUrl ? item.imgUrl : imageDefault,
            }}
            resizeMode={'contain'}
          />
        </View>
        <View style={[styles.col75, styles.pl10]}>
          <Text
            style={[styles.greyB7, styles.fs15, styles.fontWSB]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.name}
          </Text>
          <View style={[styles.row]}>
            <View style={[styles.col70]}>
              <Text
                style={[styles.textOrangeBiasa, styles.fs12, styles.fontWSB]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.point} Poin
              </Text>
            </View>
            <View style={[styles.col30]}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#DDD')}
                onPress={() => {
                  redeemNow(item);
                }}>
                <View style={styles.btnTukarPts}>
                  <Text style={[styles.white, styles.fs12, styles.fontWSB]}>
                    Tukar
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </View>
    );
  });

  listEmptyComponent = () => {
    return (
      <View style={styles.boxEmpty}>
        <SvgXml width={120} height={120} xml={IconEmpty} />
        {!isLoading ? (
          <Text style={styles.textEmpty}>Tidak Ada Data</Text>
        ) : null}
      </View>
    );
  };

  shouldItemUpdate = (prev, next) => {
    const {numColumns, shouldItemUpdate} = this.props;
    if (numColumns > 1) {
      return (
        prev.item.length !== next.item.length ||
        prev.item.some((prevItem, ii) =>
          shouldItemUpdate(
            {item: prevItem, index: prev.index * numColumns + ii},
            {item: next.item[ii], index: next.index * numColumns + ii},
          ),
        )
      );
    } else {
      return shouldItemUpdate(prev, next);
    }
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Tukar Poin'}
        shadow={true}
        right={false}
      />

      <View style={[styles.flex1, {marginTop: -40}]}>
        {imgReward ? (
          <View style={[styles.mb5, styles.ml15, styles.mr15]}>
            <Image
              resizeMethod="resize"
              source={{
                uri: imgReward ? imgReward : imageDefault,
              }}
              style={{
                borderRadius: 5,
                width: null,
                height: width / 3,
                marginLeft: 5,
                marginRight: 5,
                flex: 0,
              }}
              resizeMode={'stretch'}
            />
          </View>
        ) : null}

        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={['#4F6CFF', '#4F6CFF']}
              refreshing={isLoading}
              onRefresh={_onRefresh}
            />
          }
          ListHeaderComponent={
            <View style={[styles.ml20, styles.mr20, styles.pt10]}>
              <Text style={[styles.greyB7, styles.fontMEB, styles.fs12]}>
                Poin Anda{' : '}
                <Text
                  style={[
                    styles.pl5,
                    styles.pr5,
                    styles.textOrangeBiasa,
                    styles.fs12,
                    styles.fontMEB,
                  ]}>
                  {point} Poin
                </Text>
              </Text>
            </View>
          }
          ListFooterComponent={<View style={styles.mb10} />}
          shouldItemUpdate={this.shouldItemUpdate}
          data={dataRes}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={this.listEmptyComponent}
          removeClippedSubviews={true}
          legacyImplementation={true}
        />
      </View>

      <ModalPin
        close={true}
        modal={'normal'}
        tanpaPin={'no'}
        isVisible={modalPin}
        onSwipeComplete={() => setModalPin(false)}
        value={pin}
        onChangeText={(pin) => setPin(pin)}
        title={'Tukar Poin'}
        ket={`Tukar Dengan : ${detail.name}`}
        titleClose={'Batal'}
        titleButton={'Tukarkan'}
        onPressClose={() => {
          setModalPin(false);
        }}
        onPress={() => {
          tukarSekarang();
        }}
      />
    </SafeAreaView>
  );
};

export default Rewards;
