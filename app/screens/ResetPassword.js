import { StyleSheet, Text, View, Image,ScrollView, Dimensions ,SafeAreaView, Keyboard, Alert, ImageBackground, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from '../components/Input'
import Button from '../components/Button'
import COLORS from '../const/colors';
import Loader from '../components/Loader';
import { validateAddress, validatePasswords, validateEmail, validateUsername } from '../utils/helpers';
import axios from 'axios';
import { AuthContext, AuthProvider } from '../../src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import {Poppins_400Regular,Poppins_400Regular_Italic,Poppins_500Medium} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import { useEffect } from 'react';

export default function ResetPassword({ navigation,route  }) {
  const [userData, setUserData] = useState({token: '',email: '',password: '', password_confirmation: ''});
  const [errorToken, setErrorToken] = useState();
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState('');

  const datosRecuperados = route.params;
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });

  useEffect(()=>{
    getToken()
  })
  //const navigation = useNavigation();
  const {isLoading, login} = useContext(AuthContext)

  const getToken = () => {
    console.log('http://alphao2.herokuapp.com/api/alpha/reset-password/:token')
  }
  const validate = () => {
    //console.log(datosRecuperados.userData.email)
    let isValid = true;
    if(errorToken!=''){
      console.log('DATOS DE TOKEN')
      setErrorToken('El campo token no puede estar vacio')
      isValid = false;
    }
    if(errorEmail!=''){
        console.log('DATOS DE EMAIL')
        setErrorEmail('El campo correo electronico no puede estar vacio')
        isValid = false;
    }
    if(errorPassword!=''){
        console.log('DATOS DE PASSWORD')
        setErrorEmail('El campo contraseña no puede estar vacio')
        isValid = false;
    }
    if(errorPasswordConfirm!=''){
        console.log('DATOS DE PASSWORD 2')
        setErrorEmail('El campo confirmar contraseña no puede estar vacio')
        isValid = false;
    }
    if(errorToken=='' && errorEmail==''&& errorPassword==''&& errorPasswordConfirm==''){
        console.log('DATOS SIN ERRORES')
    }
    if (isValid) {
      console.log(userData)
      ResetPassword(userData.token,userData.email,userData.password,userData.password_confirmation)
      console.log("AVANZAS A LOGIN")
      //navigation.navigate('home',)
    }
  };


  const ResetPassword = async (token,email,password, password_confirmation) => {
    //e.preventDefault();
    //email = userData.email
    //password = userData.password
    try {
        console.log("Realizando peticion")
        const response = await axios.post(
            'http://10.0.2.2:8000/api/alpha/reset-password',
            { token,email,password,password_confirmation },
            { headers: { 'accept': 'application/json' } }
        )
        console.log("CONTRASEÑA MODIFICADA")
        console.log(response.data)
        alert("La contraseña se ha cambiado");
        navigation.navigate('login')
        //login(user, `${token_type} ${access_token}`);   
        //navigate('/');    
        //console.log(response.data.data)
    } catch (e) {
      console.log(e)
      console.log(e.response.data)
      alert(JSON.stringify(e.response.data.errors));
    }
  }

  /*
  const login = async (email, password) => {
    //e.preventDefault();
    //email = userData.email
    //password = userData.password
    try {
        console.log("Realizando peticion")
        const response = await axios.post(
            'http://10.0.2.2:8000/api/v1/login',
            { email, password },
            { headers: { 'Content-Type': 'multipart/form-data','accept': 'application/json' } }
        )
        const {access_token, token_type, user} = response.data.data 
        console.warn(access_token, token_type, user);
        //login(user, `${token_type} ${access_token}`);   
        //navigate('/');    
        console.log(response.data.data)
    } catch (e) {
      console.log(e.response)
    }
}*/

  if (!fontsLoaded) {
    return null;
  } else {
  return (
    <ScrollView style={styles.mainContainer}>
      <Loader visible={isLoading} text="Iniciando sesion" />
      <ImageBackground 
        source={require("../../assets/background.jpg")}
        imageStyle= {{opacity:0.6}}
        style={styles.background}
      >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
            Hemos encontrado tu cuenta!
        </Text>
        <Text style={styles.subtitle}>
          Introduce tu nueva clave y confirma la misma
        </Text>
        <Input
            onChangeText={txt => {
              //setErrorEmail("")
              validateUsername(txt,setErrorToken)
              setUserData({...userData, token:txt})
            }}
            //onFocus={() => handleError(null, 'email')}
            iconName="account-outline"
            label="Token"
            placeholder="Ingresa tu token del correo"
            //maxLength={50}
            error={errorToken}
            keyboard='default'
            editable={true}
            value={userData.token}
            />
        <Input
            onChangeText={txt => {
              validateEmail(txt,setErrorEmail)
              setUserData({...userData, email:txt})
            }}
            //onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Correo Electrónico"
            placeholder="Ingresa tu correo electronico"
            maxLength={30}
            error={errorEmail}
            keyboard='email-address'
            editable={true}
            value={userData.email}
            />
        <Input
            onChangeText={txt => {
              setErrorPassword("")
              setUserData({...userData, password:txt})}
            }
            //onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            error={errorPassword}
            maxLength={10}
            password
            keyboard='default'
            editable={true}
            value={userData.password}
          />

        <Input
            onChangeText={txt => {
              setErrorPasswordConfirm("")
              validatePasswords(userData.password,txt,setErrorPasswordConfirm)
              setUserData({...userData, password_confirmation:txt})}
            }
            //onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Confirmacion de contraseña"
            placeholder="Ingresa tu contraseña nuevamente"
            error={errorPasswordConfirm}
            maxLength={10}
            password
            keyboard='default'
            editable={true}
            value={userData.password_confirmation}
          />
        <Button title="CAMBIAR CONTRASEÑA" onPress={validate} />
        </View>
        </ImageBackground>
    </ScrollView>
    )
  }
}

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
        alignItems: 'center',
        justifyContent: 'center',
      },
    image: {
        width:180,
        height: 180,
        marginVertical:5,
    },
    title:{
        marginVertical:15,
        fontSize:27,
        //color:"#33576f",
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