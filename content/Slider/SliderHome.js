import React, {useRef, useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity, Linking } from 'react-native'
// import Carousel, {Pagination} from 'react-native-snap-carousel';
import styles from '../../assets/styles/Style';


const WIDTH = Dimensions.get('window').width

const SliderHome = (props) => {
    const carousel = useRef()
    const [activeIndex, setActiveIndex] = useState(0)

    const _renderItem = ({item,index}) => {
        return (
          <TouchableOpacity activeOpacity={0.7} onPress={() => {item.link === '#' ? null : Linking.openURL(item.link)}} style={{
              backgroundColor:'white',
              borderRadius: 8,
              marginLeft: 20,
              marginRight: 25, }}>
             <Image style={{width: WIDTH/1.1, height:150, borderRadius:8}} resizeMode="stretch" source={{uri: item.image}}/>     
          </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor:'white', paddingTop: 15, paddingBottom:15,  marginVertical:10, borderTopWidth:4, borderColor:'#F2F2F2' }}>
        <Text style={[{marginLeft:20, marginBottom:15}, styles.fs17, styles.fontWSB, styles.black]}>Info Uwang</Text>
        <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
            {/* <Carousel
              layout={"default"}
              autoplay={true}
              loop={true}
              ref={carousel}
              enableSnap={true}
              data={props.dataCousel}
              sliderWidth={300}
              itemWidth={400}
              renderItem={_renderItem}
              onSnapToItem = { index => setActiveIndex(index) } /> */}
        </View>
        {/* <Pagination
              dotsLength={props.dataCousel.length}
              activeDotIndex={activeIndex}
              containerStyle={{ backgroundColor: 'white', justifyContent:'flex-start', paddingVertical:13}}
              dotContainerStyle={{marginHorizontal:2}}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#4F6CFF',
              }}
              inactiveDotStyle={{
                 
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            /> */}
      </SafeAreaView>
    )
}

export default SliderHome
