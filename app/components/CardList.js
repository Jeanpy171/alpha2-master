import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { colors, shadow, sizes, spacing } from '../const/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { size } from 'lodash';

const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2)
const CARD_HEIGHT = 220;



const CardList = ({list}) => {
  return (
    <View style={styles.container}>
    {list.map((item,index) => {
        return (
        <TouchableOpacity style={styles.cardContainer} key={item.id}>
            <View style={[styles.card, shadow.light]}>
                <View style={styles.imageBox} >
                    <Image source={{uri:item.image}} style={styles.image}/>
                </View>
                <View style={styles.footer}>
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        )
    })}
    </View>
  )
}

export default CardList

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        flexWrap:'wrap',
        backgroundColor:'red',
        width: Dimensions.get("window").width,
        alignItems:'center',
        //paddingVertical:10
    },
    cardContainer:{
        marginLeft:spacing.l,
        //marginBottom:spacing.l,
        marginTop:spacing.l,
    },
    card:{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor:colors.white,
        borderRadius:sizes.radius
    },
    imageBox:{
        width: CARD_WIDTH,
        height: CARD_HEIGHT - 60,
        borderTopRightRadius: sizes.radius,
        borderTopLeftRadius: sizes.radius,
        overflow:'hidden'
    },
    image:{
        width: CARD_WIDTH,
        height: CARD_HEIGHT - 60,
        resizeMode:'cover'
    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:6,
        marginLeft:16,
        marginRight:10
    },
    titleBox:{
        flex:1
    },
    title:{
        marginVertical:4,
        fontSize:sizes.body,
        fontWeight:'bold',
        color: colors.primary
    },
    caption:{
        fontSize:sizes.body,
        color: colors.lightGray
    }
})