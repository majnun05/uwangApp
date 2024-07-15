import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  View,
  Text,
  RefreshControl,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
  InteractionManager,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useApiPost} from '../../helpers/useFetch';
import {apiUtilityDownloadBanner} from '../../helpers/endPoint';
import {getSnackBar_error, getSession} from '../../helpers/Helpers';
import styles from '../../assets/styles/Style';
import Header from '../../content/header/HeaderOperator';
import IconEmpty from '../../assets/svg/empty.svg';
import IconDownload from '../../assets/svg/download.svg';

const DownloadBanner = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(true);
  const [dataRes, setDataRes] = useState([]);
  const [imgdownloadBanner, setImgDownloadBanner] = useState('');
  let isMounted = true;

  const {width, height} = Dimensions.get('window');

  const isLogged = async () => {
    setRefreshing(true);
    let downloadBanner = await getSession('downloadBanner').then(
      (downloadBanner) => {
        return downloadBanner;
      },
    );
    setImgDownloadBanner(downloadBanner);
    await useApiPost(apiUtilityDownloadBanner(), {})
      .then((res) => {
        if (isMounted) {
          setRefreshing(false);
          if (res.statusCode === 200) {
            let val = res.values.values;
            setDataRes(val);
          } else {
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          }
        }
      })
      .catch((error) => {
        setRefreshing(false);
      });
  };

  const downloadPdf = (img) => {
    Linking.openURL(img);
  };

  const downloadImage = (url) => {
    Linking.openURL(url);
  };

  const extention = (filename) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
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
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, [navigation]);

  const _onRefresh = () => {
    setRefreshing(true);
    isLogged();
  };

  renderItem = React.useCallback(({item, index}) => {
    return (
      <View style={styles.listPromosiKeagenanfull} key={index}>
        <View style={[styles.row, styles.pl10, styles.pr10]}>
          <View style={[styles.col75, styles.centerContent]}>
            <Text style={[styles.fs12, styles.fontWSB, styles.black]}>
              {item.title}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.col25, styles.center, styles.row]}
            onPress={() => {
              if (item.image) {
                downloadImage(item.image);
              } else {
                downloadPdf(item.pdf);
              }
            }}>
            <View style={[styles.row, styles.boxPriceSale]}>
              <SvgXml width={15} height={15} xml={IconDownload} />
              <Text
                style={[styles.fs11, styles.black, styles.ml5]}
                numberOfLines={1}
                ellipsizeMode="tail">
                Download
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  listEmptyComponent = () => {
    return (
      <View style={styles.boxEmpty}>
        <SvgXml width={120} height={120} xml={IconEmpty} />
        {!refreshing ? (
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
        onBack={() => navigation.navigate('Home')}
        title={'Download Banner'}
        shadow={true}
        right={false}
      />
      <View style={[styles.mb20, styles.flex1, {marginTop: -40}]}>
        {imgdownloadBanner ? (
          <View style={[styles.mb5, styles.ml15, styles.mr15]}>
            <Image
              resizeMethod="resize"
              source={{
                uri: imgdownloadBanner,
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
          refreshControl={
            <RefreshControl
              colors={['#4F6CFF', '#4F6CFF']}
              refreshing={refreshing}
              onRefresh={_onRefresh}
            />
          }
          shouldItemUpdate={this.shouldItemUpdate}
          data={dataRes}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={this.listEmptyComponent}
          removeClippedSubviews={true}
          legacyImplementation={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default DownloadBanner;
