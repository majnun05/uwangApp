//import libraries
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Linking,
  Image,
} from 'react-native';

import styles from '../../assets/styles/Style';
import {getSession} from '../../helpers/Helpers';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

// make a component
const News = (props) => {
  let dataNews = props.data;
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
      } else Linking.openURL(url);
    } catch (error) {
      // console.log(error.message);
    }
  };

  return (
    <View style={[styles.mb30, styles.mt5]}>
      {dataNews.length > 0 ? (
        <View style={[styles.row, styles.pl15, styles.pr15, styles.mb5]}>
          <View style={styles.col50}>
            <Text style={[styles.fs16, styles.fontWSB, styles.black]}>
              Uwang News
            </Text>
          </View>
          <View style={[styles.col50, styles.pt5]}>
            <TouchableOpacity onPress={() => props.navigation.navigate('News')}>
              <Text
                style={[
                  styles.fs11,
                  styles.fontWSM,
                  styles.blue,
                  styles.right,
                ]}>
                Lihat Semua
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {dataNews.length > 0 ? (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View style={[styles.row, styles.pl15]}>
            {dataNews.map((item, key) => (
              <View key={key}>
                {parseInt(item.status) > 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.link) {
                        if (item.link !== '#') {
                          openLink(item.link);
                        }
                      }
                    }}
                    style={[styles.rowNews]}>
                    <Image
                      resizeMethod="resize"
                      style={{
                        width: '100%',
                        height: 110,
                        borderRadius: 10,
                      }}
                      resizeMode={'stretch'}
                      source={{
                        uri: item.image ? item.image : imageDefault,
                      }}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            ))}
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
};

// make the component available to other parts of the app
export default News;
