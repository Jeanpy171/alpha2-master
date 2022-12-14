import { StyleSheet, Text, View, Dimensions, StatusBar, ImageBackground, Image,Animated } from 'react-native'

import React,{ useState, useRef} from 'react'
import { TouchableOpacity } from 'react-native';
import {Poppins_400Regular,Poppins_700Bold,Poppins_800ExtraBold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native';
import { powers } from './data/data';
import Paginator from './Paginator';

const SLIDER_WIDTH = Dimensions.get('window').width + 80
//const scrollX = useRef(new Animated.Value(0)).current;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

export const Carrousel = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold
  });

  const navigation = useNavigation()
  


  const CarouselCardItem = ({ item, index }) => {
    return (
      <View style={styles.container} key={index}>
        <TouchableOpacity
            onPress={() => {(navigation.navigate('PowerDetailsScreen',{power:item}))}}
        >
      <View style={styles.card} key={index}>
                <Image
                source={{uri:item.image}}
                style={styles.image}
                />
                <Text style={styles.header}>{item.title}</Text>
                <Text style={styles.body}>{item.resume}</Text>
            </View>
        </TouchableOpacity>
        </View>
    )
  }

  const [index, setIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current;
  const isCarousel = React.useRef(null)
  
    if (!fontsLoaded) {
      return null;
    } else {
  return (
    <View style={{ height:400}}>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={powers}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH - 70}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={powers.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 5,
          //marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
        //dotContainerStyle={{backgroundColor:'red'}}
      />
    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
   justifyContent:'center',
   alignItems:'center'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: ITEM_WIDTH - 70,
    height: 325,
    backgroundColor: 'white',
    borderRadius: 10,
    width: ITEM_WIDTH - 70,
    height: 325,
    //paddingBottom: 20,
    //marginTop:0,
    shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
  },
  image: {
    width: ITEM_WIDTH - 70,
    height: 170,
    resizeMode: 'cover',
  },
  header: {
    color: "#222",
    //fontWeight: "bold",
    fontSize:21,
    fontFamily:'Poppins_600SemiBold',
    paddingLeft: 20,
    paddingTop: 10
  },
  body: {
    color: "#222",
    fontSize: 12,
    textAlign:'justify',
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily:'Poppins_400Regular',
  }
})

export default Carrousel