import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import {colors,shadow, sizes, spacing} from '../const/theme'
import { Pagination } from 'react-native-snap-carousel'
import { Animated } from 'react-native'

const CARD_WIDTH = sizes.width;
const CARD_HEIGHT = 250;
//const CARD_WIDTH_SPACING = CARD_WIDTH 

const Banner = ({list}) => {
  const [index, setIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current;
  const isCarousel = React.useRef(null)
  return (
    <View>
    <FlatList
        data={list}
        horizontal
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        ref={isCarousel}
        showsHorizontalScrollIndicator={false}
        keyExtractor={i => i.id}
        renderItem={({item, index}) => {
            return(
                <TouchableOpacity 
                    /*style={{
                        marginLeft: spacing.l,
                        marginRight: index === list.length - 1 ? spacing.l : 0,
                    }}*/>
                    <View style={[styles.card,shadow.dark]}>
                        <View style={styles.imageBox}>
                            <Image source={{uri:item.image}} style={styles.image}/>
                        </View>
                        <View style={styles.titleBox}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.caption}>{item.caption}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                
            )
        }}
        
    />
    <Pagination
        dotsLength={list.length}
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

export default Banner

const styles = StyleSheet.create({
    card: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      //marginVertical: 10,
    },
    imageBox: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      //borderRadius: sizes.radius,
      overflow: 'hidden',
    },
    image: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      resizeMode: 'cover',
    },
    titleBox: {
      position: 'absolute',
      top: CARD_HEIGHT - 80,
      left: 16,
    },
    title: {
      fontSize: sizes.h2,
      fontWeight: 'bold',
      color: colors.white,
    },
    caption: {
      fontSize: sizes.h3,
      color: colors.white,
    },
  });