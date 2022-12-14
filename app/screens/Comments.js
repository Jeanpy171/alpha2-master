import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { TextInput } from 'react-native-paper';
import Button from '../components/Button';
import { Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const WATER_IMAGE = "https://www.pngplay.com/wp-content/uploads/6/5-Star-Rating-Vector-Transparent-PNG.png"
const Comments = ({navigation}) => {
    const [comment,setComment] = useState("")
    const [rating,setRating] = useState(0.0)
    const token = AsyncStorage.getItem('token');
    const ratingCompleted = (rate) => {
            console.log("Rating is: " + rate)
            setRating(rate)
    }

    const storeComments = async(comentario, calificacion) =>{
        console.log(await token)
        try {
            console.log("Registrando comentario . . . ")
            const response = await axios.post(
                'https://alphao2.herokuapp.com/api/alpha/comments/comment-create',
                { comentario, calificacion },
                { headers: { 'accept': 'application/json','authorization': await token } }
            )
            console.log(response.data)
            console.log("COMENTARIO ALMACENADO");
            Alert.alert("Valoración registradacon exito","Tu comentario ha sido enviado a nuestro equipo de desarrollo")
            navigation.goBack()
        } catch (e) {
        //console.log(e)
        console.log(e.response.data);
        alert(e.response.toString());
        //setIsLoading(false)
        }
    }

    const validar = () =>{
        if(comment!="" && comment!=" "){
            console.log(comment)
            console.log(rating)
            storeComments(comment,rating)
        }else{
            Alert.alert("Registro invalido","Necesitamos que nos brindes tu opinón")
        }
    }

    


  return (
    <View style={styles.container}>
      <View style={{top:"10%"}}>
        <Text style={styles.title}>
                ¿Qué te ha parecido la experiencia?
            </Text>
            <Text style={styles.subtitle}>
            Dejanos un comentario para rectificar en aquello que crea erroneo y asi seguir mejorando nuestro servicio
            </Text>
            <Rating
                type='heart'
                ratingCount={5}
                onSwipeRating
                imageSize={60}
                showRating
                onFinishRating={ratingCompleted}
                />
            <TextInput
            style={{marginVertical:"10%"}}
            multiline={true}
            numberOfLines={4}
            label={"Valoracion personal"}
            placeholder={"Redacta tu opinón aquí"}
            onChangeText={(text) => setComment(text)}
            value={comment}/>
            <Button title="ENVIAR" onPress={validar}/>
            </View>
            </View>
        )
}

export default Comments

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'center',
      paddingHorizontal:20,
      //justifyContent: 'center',
    },
    title:{
        marginVertical:10,
        fontSize:22,
        //color:"#33576f",
        textAlign:'justify',
        //fontWeight:'bold',
        fontFamily: 'Poppins_500Medium'
    },
    subtitle:{
        fontSize:14,
        marginBottom: 10,
        //color:"#33576f",
        textAlign:'justify',
        fontFamily: 'Poppins_400Regular'
    },
  });
  