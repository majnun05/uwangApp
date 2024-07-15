import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Dimensions, Linking, Image} from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import styles from '../../assets/styles/Style';
import {setSession, getSession} from '../../helpers/Helpers';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

const Slider = (props) => {
  const [imageDefault, setImageDefault] = useState('');
  let isMounted = true;

  const fetchData = async () => {
    let imgDef = await getSession('imageDefault').then((imageDefault) => {
      return imageDefault;
    });
    if (isMounted) {
      setImageDefault(imgDef);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const {width} = Dimensions.get('window');
  const get = props.data;

  let entries;
  let voucherTv;
  let voucherGame;
  let voucherData;
  let voucherDiskon;
  let targetTransaksi;
  let downloadBanner;
  let updateApps;
  let bannerReward;
  let tvKabelInternet;
  if (parseInt(props.count) > 0) {
    entries = get.values.data;
    voucherTv = get.values.voucherTv;
    voucherGame = get.values.voucherGame;
    voucherData = get.values.voucherData;
    voucherDiskon = get.values.voucherDiskon;
    targetTransaksi = get.values.targetTransaksi;
    downloadBanner = get.values.downloadBanner;
    updateApps = get.values.updateApps;
    bannerReward = get.values.bannerReward;
    tvKabelInternet = get.values.tvKabelInternet;
  } else {
    entries = [];
    voucherTv = '';
    voucherGame = '';
    voucherData = '';
    voucherDiskon = '';
    targetTransaksi = '';
    downloadBanner = '';
    updateApps = '';
    bannerReward = '';
    tvKabelInternet = '';
  }

  setSession({
    name: 'voucherTv',
    value: voucherTv ? voucherTv.toString() : '',
  });
  setSession({
    name: 'voucherGame',
    value: voucherGame ? voucherGame.toString() : '',
  });
  setSession({
    name: 'voucherData',
    value: voucherData ? voucherData.toString() : '',
  });
  setSession({
    name: 'voucherDiskon',
    value: voucherDiskon ? voucherDiskon.toString() : '',
  });
  setSession({
    name: 'targetTransaksi',
    value: targetTransaksi ? targetTransaksi.toString() : '',
  });
  setSession({
    name: 'downloadBanner',
    value: downloadBanner ? downloadBanner.toString() : '',
  });
  setSession({
    name: 'updateApps',
    value: updateApps ? updateApps.toString() : '',
  });
  setSession({
    name: 'bannerReward',
    value: bannerReward ? bannerReward.toString() : '',
  });
  setSession({
    name: 'tvKabelInternet',
    value: tvKabelInternet ? tvKabelInternet.toString() : '',
  });

  const openLink = async (link) => {
    try {
      const url = link;
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#4F6CFF',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#4F6CFF',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      // console.log(error.message);
    }
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (item.link) {
            if (item.link !== '#') {
              openLink(item.link);
            }
          }
        }}
        key={index}
        style={{
          marginTop: 25,
          marginBottom: 33,
        }}>
        <Image
          resizeMethod="resize"
          style={{
            borderRadius: 10,
            width: null,
            height: width / 2 - 50,
            marginLeft: 5,
            marginRight: 5,
            flex: 0,
          }}
          source={{
            uri: item.image ? item.image : imageDefault,
          }}
          resizeMode={'stretch'}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.containerSliderNew}>
      {/* {parseInt(props.count) > 0 ? (
        <Carousel
          useScrollView={true}
          layout={'default'}
          autoplay={true}
          data={entries}
          horizontal={true}
          loop={true}
          loopClonesPerSide={entries.length}
          renderItem={_renderItem}
          firstItem={entries.length}
          initialScrollIndex={entries.length}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          sliderWidth={width}
          itemWidth={width - 60}
          enableMomentum={true}
          firstItem={0}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          activeSlideAlignment={'center'}
          containerCustomStyle={styles.slider2}
          contentContainerCustomStyle={styles.sliderContentContainer}
          activeAnimationType={'spring'}
          activeAnimationOptions={{
            friction: 1,
            tension: 40,
          }}
        />
      ) : (
        <TouchableOpacity activeOpacity={0.8}>
          <View
            style={{
              backgroundColor: '#ddd',
              borderRadius: 10,
              width: '91%',
              height: 158,
              marginLeft: 15,
              marginBottom: 30,
              marginTop: 25,
            }}
          />
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export default Slider;
