import { StyleSheet, Text, View, Image,ScrollView, Dimensions ,SafeAreaView, Keyboard, Alert, ImageBackground, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from '../components/Input'
import Button from '../components/Button'
import COLORS from '../const/colors';
import Loader from '../components/Loader';
import { validateEmail,validateName, validateLastname } from '../utils/helpers';
import axios from 'axios';
import { AuthContext, AuthProvider } from '../../src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import {Poppins_400Regular,Poppins_400Regular_Italic,Poppins_500Medium} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';

export default function Register() {
    const [userData, setUserData] = useState({first_name:'',last_name:'',email:'', password:''});
    const [errorName, setErrorName] = useState();
    const [errorLastname, setErrorLastname] = useState();
    const [errorEmail, setErrorEmail] = useState();
    const [errorPassword, setErrorPassword] = useState();

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });

  const navigation = useNavigation();
  const {isLoading, login} = useContext(AuthContext)

  const validate = () => {
    let isValid = true;
    console.log(userData)
    if(errorName!=''){
        console.log('DATOS DE NOMBRE')
        setErrorName('El campo nombre no puede estar vacio')
        isValid = false;
    }
    if(errorLastname!=''){
        console.log('DATOS DE APELLIDO')
        setErrorLastname('El campo apellido no puede estar vacio')
        isValid = false;
    }
    if(errorEmail!=''){
        console.log('DATOS DE EMAIL')
        setErrorEmail('El campo correo electronico no puede estar vacio')
        isValid = false;
    }
    console.log("PASS ", errorPassword)
    if(errorPassword!=''){
        console.log('DATOS DE CONTRASENA')
        setErrorPassword('El campo contraseña de usuario no puede estar vacio')
        isValid = false;
    }
    if(errorName=='' && errorLastname==''&& errorEmail==''&& errorPassword==''){
        console.log('DATOS SIN ERRORES')
    }
    if (isValid) {
      //onLogin(userData.email,userData.password)
      navigation.navigate('register_part2',{userData:userData})
    }
  };


  if (!fontsLoaded) {
    return null;
  } else {
  return (
    <ScrollView style={styles.mainContainer}>
      <Loader visible={isLoading} text="Iniciando sesion" />
      <ImageBackground 
        source={require("../../assets/garza-fondo.png")}
        imageStyle= {{opacity:0.3}}
        style={styles.background}
      >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
            Crea tu cuenta aquí
        </Text>
        <Text style={styles.subtitle}>
          Registrate en nuestra aplicación y experimenta la existencia como un prodigioso programa de amor y belleza
        </Text>
        <Input
            onChangeText={txt => {
              //setErrorName("")
              validateName(txt,setErrorName)
              setUserData({...userData, first_name:txt})
            }}
            //onFocus={() => handleError(null, 'email')}
            iconName="account-outline"
            label="Nombre"
            placeholder="Ingresa tu nombre"
            maxLength={10}
            error={errorName}
            keyboard='default'
            editable={true}
            value={userData.first_name}
            />
        <Input
            onChangeText={txt => {
              //setErrorLastname("")
              validateLastname(txt,setErrorLastname)
              setUserData({...userData, last_name:txt})
            }}
            //onFocus={() => handleError(null, 'email')}
            iconName="account-outline"
            label="Apellido"
            placeholder="Ingresa tu apellido"
            maxLength={15}
            error={errorLastname}
            keyboard='default'
            editable={true}
            value={userData.last_name}
            />
        <Input
            onChangeText={txt => {
              //setErrorEmail("")
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
              onChangeText={text => {
                setErrorPassword("")
                setUserData({...userData, password:text})}}
            //onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            error={errorPassword}
            maxLength={15}
            password
            keyboard='default'
            editable={true}
            value={userData.password}
          />
        <Button title="CONTINUAR REGISTRO" onPress={validate} />
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