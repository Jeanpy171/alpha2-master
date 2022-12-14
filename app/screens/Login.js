import { StyleSheet, Text, View, Image,ScrollView, Dimensions ,SafeAreaView, Keyboard, Alert, ImageBackground, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from '../components/Input'
import Button from '../components/Button'
import COLORS from '../const/colors';
import Loader from '../components/Loader';
import { validateEmail } from '../utils/helpers';
import axios from 'axios';
import { AuthContext, AuthProvider, } from '../../src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import {Poppins_400Regular,Poppins_700Bold,Poppins_800ExtraBold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import { sizes } from '../const/theme';

export default function Login() {
  const [userData, setUserData] = useState({email: '', password: ''});
  const [errorEmail, setErrorEmail] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold
  });

  const navigation = useNavigation();
  const {login,profileInformation} = useContext(AuthContext)

  const validate = async() => {
    let isValid = true;
    if(errorEmail!=''){
      console.log('DATOS DE EMAIL')
      setErrorEmail('El campo correo electronico no puede estar vacio')
      isValid = false;
  }
    if (!userData.password) {
      setErrorPassword('Debes ingresar una contrasena valida');
      isValid = false;
    }
    if (isValid) {
      setIsLoading(true)
      console.log(userData.email,userData.password)
      await onLogin(userData.email,userData.password)
      //navigation.navigate('home')
    }
  };


  const onLogin = async (email, password) => {
    try {
        console.log("Realizando peticion")
        const response = await axios.post(
            'https://alphao2.herokuapp.com/api/alpha/login',
            { email, password },
            { headers: { 'accept': 'application/json' } }
        )
        console.log("DATOS EXTRAIDOS")
        console.log(response.data)
        const {access_token, token_type, user} = response.data.data 
        login(user, `${token_type} ${access_token}`);
        //profileInformation(`${token_type} ${access_token}`)
        console.log(access_token)
        console.log(token_type)
        console.log(user)
        setIsLoading(false)
        navigation.navigate('home')
    } catch (e) {
      console.log(e)
      alert("Cuenta no encontrada");
      setIsLoading(false)
    }
  }

  if (!fontsLoaded) {
    return null;
  } else {
  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <Loader visible={isLoading} text="Iniciando sesion" />
      <ImageBackground 
        source={require("../../assets/garza-fondo.png")}
        imageStyle= {{opacity:0.3}}
        style={styles.background}
      >
      <View style={styles.contentContainer}>
      <View style={styles.subcontainer}>
        <Image 
            style={styles.image}
            source={require("../../assets/biodanza-logo.png")}
        />
      </View>
        <Text style={styles.title}>
            Bienvenido!
        </Text>
        <Text style={styles.subtitle}>
          Inicia sesion para ser parte de nuestra  danza cosmica
        </Text>
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
              setUserData({...userData, password:text})}
            }
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
        <Text
            onPress={() => navigation.navigate('recoverPassword')}
            style={styles.recover}>
            ¿Olvidaste tu contraseña? 
            <Text style={styles.indications}> Recuperala aquí!</Text>
          </Text>
        <Button title="INICIAR SESION" onPress={validate} />
        <Text
            onPress={() => navigation.navigate('register')}
            style={styles.register}>
            ¿No tienes una cuenta? 
            <Text style={styles.indications}> Registraté aquí!</Text>
          </Text>
          <Text
            onPress={() => navigation.navigate('comments-list')}
            style={styles.comments}>
            ¿Aún no estas convencido? 
            <Text style={[styles.indications,{marginVertical:20}]}> Revisa las opiniones de nuestros usuarios aqui!</Text>
          </Text>
        </View>
        </ImageBackground>
    </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
    mainContainer: {
        //flex: 1,
        backgroundColor: '#fff',
        width:sizes.width,
        height:sizes.height
      },
    contentContainer:{
      paddingHorizontal: 24,
      paddingVertical: 10,
    },
    background:{
      //flex: 1,
      //resizeMode: 'cover', 
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height + 50
    },
    subcontainer: {
        //marginTop:"10%",
        //marginBottom:"5%",
        marginVertical:'8%',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get("window").width - 50,
        //backgroundColor:'red',
        height: "23.8%",
        //right:'6.5%',
      },
    image: {
        width: sizes.width - 60,
        height: "76.5%",
        //marginVertical:5,
    },
    title:{
        marginVertical:10,
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
      fontFamily: 'Poppins_700Bold'
    },
    comments:{
      color: COLORS.black,
      //fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 13,
      marginVertical:25,
      fontFamily: 'Poppins_400Regular'
    },
    indicationsComments: {
      color:"#FC6B6B",
      //fontWeight: 'bold',
      fontFamily: 'Poppins_700Bold'
    }
})