//import libraries
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import IconIntersect from '../../assets/svg/home/Intersect2.svg';
import IconIntersect2 from '../../assets/svg/home/Intersect.svg';
import {getSession} from '../../helpers/Helpers';

// make a component
const Rewards = (props) => {
  let dataReward = props.data;
  let count = props.data.length;

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

  return (
    <View style={[styles.pb5, styles.pl15, styles.pr15, styles.mb10]}>
      {dataReward.length > 0 ? (
        <View style={[styles.row, styles.mb15]}>
          <View style={styles.col50}>
            <Text style={[styles.fs16, styles.fontWSB, styles.black]}>
              Tukar Poin
            </Text>
          </View>
          <View style={[styles.col50, styles.pt5]}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.push('Rewards', {
                  point: props.point,
                })
              }>
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

      <View style={[styles.bgPoints, styles.pb10, styles.pt10]}>
        <View
          style={{
            position: 'absolute',
            zIndex: -1,
            top: '-12.6%',
            left: '0%',
            borderTopRightRadius: 100,
            borderTopLeftRadius: 100,
          }}>
          <SvgXml width={100} height={100} xml={IconIntersect2} />
        </View>
        <View
          style={[
            styles.bxTitleRewards,
            styles.pt10,
            styles.pl10,
            styles.pr10,
          ]}>
          <View style={styles.row}>
            <Text
              style={[styles.fontMEB, styles.white, styles.fs15, styles.mr5]}>
              POIN ANDA
            </Text>
            <View
              style={{
                backgroundColor: '#F4B13E',
                paddingHorizontal: 10,
                paddingBottom: 1,
                borderRadius: 100,
              }}>
              <Text style={[styles.white, styles.fs15, styles.fontMEB]}>
                {props.point}
              </Text>
            </View>
          </View>

          <Text style={[styles.fontWSR, styles.white, styles.fs12]}>
            Tukarkan Poin Anda dengan Hadiah Menarik berikut
          </Text>
        </View>

        <View style={[styles.pr5, styles.pl5]}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <View style={[styles.pl15, styles.row]}>
              {dataReward.map((item, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() =>
                    props.navigation.push('Rewards', {
                      point: props.point,
                    })
                  }
                  activeOpacity={0.9}
                  style={[styles.centerContent, styles.rowRewardsSlideOut]}>
                  <View style={[styles.rowRewardsSlide]}>
                    <Image
                      resizeMethod="resize"
                      style={[styles.imageProdukReward]}
                      resizeMode={'stretch'}
                      source={{
                        uri: item.imgUrl ? item.imgUrl : imageDefault,
                      }}
                    />
                  </View>

                  <Text
                    style={[
                      styles.white,
                      styles.fs11,
                      styles.mt5,
                      styles.mb5,
                      styles.fontWSR,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.name}
                  </Text>
                  <Text
                    style={[
                      styles.menuTitleProductRwds,
                      styles.fontWSB,
                      styles.white,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.point} Poin
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {parseInt(count) > 0 ? (
          <View
            style={{
              position: 'absolute',
              zIndex: -1,
              bottom: '-9%',
              right: '0%',
              borderTopRightRadius: 100,
              borderTopLeftRadius: 100,
            }}>
            <SvgXml width={100} height={100} xml={IconIntersect} />
          </View>
        ) : null}

        <View
          style={{
            position: 'absolute',
            zIndex: -1,
            backgroundColor: '#01B6AB',
            bottom: '1%',
            left: '0%',
            width: 45,
            height: 30,
            borderTopRightRadius: 90,
            borderTopLeftRadius: 70,
            borderBottomLeftRadius: 50,
          }}
        />
      </View>
    </View>
  );
};

// make the component available to other parts of the app
export default Rewards;
