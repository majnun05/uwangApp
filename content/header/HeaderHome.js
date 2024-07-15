//import libraries
import React from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {IcLogoUw, ImgHomeNew, LogoHorizontal} from '../../assets';
import {Fonts} from '../../assets/fonts/Fonts';
import styles from '../../assets/styles/Style';
import IconNotification from '../../assets/svg/notification.svg';
import StatusBars from '../../content/more/StatusBar';

// make a component
const HeaderHome = (props) => {
  return (
    <>
      {props.header === 'scroll' ? (
        <View style={[styles.headerHomeNewScroll]}>
          <StatusBars />
          {/* <View style={[ styles.center, {paddingVertical:5, paddingLeft:20}]}>
            <SvgXml width="30" height="30" xml={IcLogoUw} />
          </View> */}

          {/* <View style={[styles.center, {flexDirection: 'row', justifyContent:'space-between'}]}> */}
            <View style={{marginRight:15}}>
              <Image source={LogoHorizontal} style={{width:100, height:30}} resizeMode="stretch"/>
            </View>

            <TouchableOpacity
              style={{marginRight: 20}}
              >
              <SvgXml width="25" height="25" xml={IconNotification} />
              {parseInt(props.total_notif) > 0 ? (
                <View
                  style={{
                    backgroundColor: '#D10000',
                    paddingHorizontal: 3,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: -1,
                    right: -2,
                  }}>
                  <Text style={[{fontSize: 8}, styles.fontWSR, styles.white]}>
                    {props.total_notif}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
          {/* </View> */}
        </View>
      ) : (
        <ImageBackground
          source={ImgHomeNew}
          resizeMode="stretch"
          style={{
            width: '100%',
            height: 200,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <StatusBars />
          <View style={{marginLeft: 18, marginTop: 10}}>
            <Text
              style={{fontSize: 18, color: '#FFFFFF', fontFamily: Fonts.WSB}}>
              Hallo,
            </Text>
            <Text
              style={{fontSize: 14, color: '#FFFFFF', fontFamily: Fonts.WSM}}>
              {props.userName}
            </Text>
            {/* <SvgXml width="105" height="45" xml={IconLogoWhite} /> */}
          </View>

          {/* <View style={[styles.col35, styles.centerOnly]}>
            <View
              style={{
                position: 'relative',
                top: '-9%',
                right: '0%',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: -1,
              }}>
              <SvgXml width="140" height="70" xml={IconHeaderComSmall} />
            </View>
          </View> */}

          <View style={{flexDirection: 'row', marginTop: 15}}>
            {/* <TouchableOpacity
              style={{marginRight:15}}
                onPress={() =>
                  props.navigation.navigate('Bantuan')
                }>
                <SvgXml width="28" height="28" xml={IcMsg} />
              </TouchableOpacity> */}

            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={() => props.navigation.navigate('Notifikasi')}>
              <SvgXml width="25" height="25" xml={IconNotification} />
              {parseInt(props.total_notif) > 0 ? (
                <View
                  style={{
                    backgroundColor: '#D10000',
                    paddingHorizontal: 3,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: -3,
                    right: -2,
                  }}>
                  <Text style={[{fontSize: 8}, styles.fontWSR, styles.white]}>
                    {props.total_notif}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
          </View>

          {/* <View style={[styles.col10, styles.centerOnly, styles.pt12]}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Pesan')}>
              <SvgXml width="22" height="22" xml={IconPesan} />
            </TouchableOpacity>
          </View> */}
        </ImageBackground>
      )}
    </>
  );
};

// make the component available to other parts of the app
export default HeaderHome;
