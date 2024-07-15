import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import styles from '../../assets/styles/Style';
import {getSession} from '../../helpers/Helpers';

const ContentPrice = (props) => {
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
    <View style={[styles.bxLisPriceList]}>
      <View style={styles.rowListPriceList}>
        <View style={[styles.imgListBoxPriceList, styles.center]}>
          <Image
            resizeMethod="resize"
            style={styles.imgListTodayPrice}
            source={{
              uri: props.image ? props.image : imageDefault,
            }}
            resizeMode={'contain'}
          />
        </View>
        <View style={[styles.bxPriceHostPriceList, styles.centerContent]}>
          <View style={[styles.row]}>
            <View style={[styles.col70]}>
              <Text style={[styles.fs10, styles.black, styles.fontWSB]}>
                {props.namaproduk}
              </Text>
              <Text style={[styles.fs12, styles.green, styles.fontWSB]}>
                <Text style={[styles.fs9, styles.green, styles.fontWSR]}>
                  Rp{' '}
                </Text>
                {props.harga}
              </Text>
            </View>
            <View style={[styles.col30]}>
              <Text
                style={[
                  styles.fs10,
                  styles.black,
                  styles.fontWSB,
                  styles.rightText,
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {props.kodeproduk}
              </Text>

              {props.gangguan === 'Tidak' ? (
                <>
                  <Text
                    style={[
                      styles.fs9,
                      styles.textBadgeGreen,
                      styles.fontWSB,
                      styles.rightText,
                    ]}>
                    Tersedia
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    style={[
                      styles.fs9,
                      styles.red,
                      styles.fontWSB,
                      styles.rightText,
                    ]}>
                    Gangguan
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ContentPrice;
