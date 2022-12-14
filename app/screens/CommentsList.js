import { StyleSheet, Text, View, Image,ScrollView, ImageBackground,Dimensions ,SafeAreaView, Keyboard, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from '../components/Input'
import Button from '../components/Button'
import COLORS from '../const/colors';
import Loader from '../components/Loader';
import { validateEmail } from '../utils/helpers';
import axios from 'axios';
import { AuthContext, AuthProvider } from '../../src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import {Poppins_400Regular,Poppins_400Regular_Italic,Poppins_500Medium} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import { useEffect } from 'react';
import { ListItem } from 'react-native-elements'
import { FlatList } from 'react-native';
import { Rating } from 'react-native-ratings';

export const CommentsList = ({navigation}) => {
  const [userRating,setUserRating] = useState({})


  useEffect(() => {
    getComments()
  },[])
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });


  const getComments = async () => {
    //e.preventDefault();
    //email = userData.email
    //password = userData.password
    try {
        console.log("Realizando peticion")
        const response = await axios.get(
            'https://alphao2.herokuapp.com/api/alpha/commentpublic',
        )
        console.log(response.data.data.comments);
        //alert(response.data.message); 
        //navigation.navigate("resetPassword")
    } catch (e) {
      console.log(e)
      alert("Error al cargar comentarios");
    }
}



const list = [
    {
        username: 'Amy Farha',
        comment: 'Muy buena aplicación, recomendada!',                                                                                                                                                                                                                                                                                                                                                                                                                
        calificacion:4.5,
    },
    {
        username: 'Chris Jackson',
        avatar_url: 'https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg',
        comment: 'Bastante buena, es una experiencia agradable',
        calificacion:4.2,
    },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    {
        username: 'Euriale',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        comment: 'Tiene buenas implementaciones, pero no son muy impresionantes',
        calificacion:3.50,
      },
      
  ]
  const RenderItem = ({ item }) => (
    <View >
        <View style={{backgroundColor:"rgba(255, 228, 181,0.8)",marginBottom:10,top:15 , flexDirection:"row",padding:10, borderRadius:10}}>
            <View>
                <Image 
                    source={{uri:"https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"}}
                    style={{width:60,height:60,borderRadius:10}}
                    />
            </View>
            <View style={{paddingLeft:10, height:95, paddingRight:10,width:"85%"}}>
                <Text style={styles.title}>{item.username}</Text>
                <Text style={styles.subtitle}>{item.comment}</Text>
                <Rating
                    type='heart'
                    ratingCount={5}
                    //onSwipeRating
                    startingValue={item.calificacion}
                    readonly={false}
                    style={{backgroundColor:"transparent", padding:15}}
                    ratingBackgroundColor={"transparent"}
                    ratingColor={"transparent"}
                    imageSize={20}
                    //showRating
                    //onFinishRating={ratingCompleted}
                />
            </View>
        </View>
    </View>
  )


  if (!fontsLoaded) {
    return null;
  } else {
  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <ImageBackground 
        source={require("../../assets/garza-fondo.png")}
        imageStyle= {{opacity:0.3}}
        style={styles.background}
      >
      <View style={styles.contentContainer}>
        <Text style={styles.titles}>
            Opiniones recurrentes
        </Text>
        <Text style={styles.subtitle}>Esto es lo que la gente piensa de nuestra aplicación</Text>
        <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={list}
            renderItem={RenderItem}
        />

        </View>
        </ImageBackground>
    </KeyboardAvoidingView>
        )
    }
}

export default CommentsList;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
      },
    contentContainer:{
      padding: 24,
      //paddingVertical: 12,
    },
    background:{
      //flex: 1,
      //resizeMode: 'cover', 
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height + 50
    },
    subcontainer: {
      marginTop:"10%",
      marginBottom:"5%",
      alignItems: 'center',
      justifyContent: 'center',
      width: Dimensions.get("window").width,
      //backgroundColor:'red',
      height: "25%",
      right:'6.5%',
    },
  image: {
    width: "87.5%",
    height: "100%",
      //marginVertical:5,
  },
    title:{
        //marginVertical:15,
        fontSize:15,
        //color:"#33576f",
        textAlign:'justify',
        //fontWeight:'bold',
        fontFamily: 'Poppins_800ExtraBold'
    },
    titles:{
        marginVertical:20,
        fontSize:26,
        //color:"#33576f",
        textAlign:'justify',
        //fontWeight:'bold',
        fontFamily: 'Poppins_500Medium'
    },
    subtitle:{
        fontSize:14,
        //marginBottom: 10,
        //color:"#33576f",
        textAlign:'justify',
        fontFamily: 'Poppins_400Regular'
    },
    recover:{
      color: COLORS.black,
      //fontWeight: 'bold',
      textAlign: 'right',
      fontSize: 13,
      fontFamily: 'Poppins_400Regular'
    },
    register:{
      color: COLORS.black,
      //fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 13,
      fontFamily: 'Poppins_400Regular'
    },
    indications: {
      color:"#FC6B6B",
      //fontWeight: 'bold',
      fontFamily: 'Poppins_400Regular'
    }
})