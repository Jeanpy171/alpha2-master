import { StyleSheet, Text, View, Image,ScrollView, ImageBackground,Dimensions ,SafeAreaView, Keyboard, Alert, KeyboardAvoidingView } from 'react-native'
import React from 'react'
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

export default function RecoverPassword({navigation}) {
  const [email, setEmail] = React.useState();
  const [errorEmail, setErrorEmail] = React.useState();
  const [errorPassword, setErrorPassword] = React.useState();
  const [loading, setLoading] = React.useState(false);


  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });

  const validate = () => {
    let isValid = true;
    if(errorEmail!=''){
        console.log('DATOS DE EMAIL')
        setErrorEmail('El campo correo electronico no puede estar vacio')
        isValid = false;
    }
    if (isValid) {
      forgotPassword(email)
      //login(email)
      //navigation.navigate('home')
      //getDataUsingAsyncAwaitGetCall(userData.email,userData.password)
    }
  };

  const forgotPassword = async (email) => {
    //e.preventDefault();
    //email = userData.email
    //password = userData.password
    try {
        console.log("Realizando peticion")
        const response = await axios.post(
            //'http://10.0.2.2:8000/api/v1/forgot-password',
            //'http://10.0.2.2:8000/api/alpha/forgot-password',
            'https://alphao2.herokuapp.com/api/alpha/forgot-password',
            { email },
            { headers: { 'accept': 'application/json' } }
        )
        console.log(response.data.message);
        alert(response.data.message); 
        navigation.navigate("resetPassword")
    } catch (e) {
      console.log(e)
      alert("Cuenta no encontrada");
    }
}


  const login = (email) => {
    //setLoading(true);
    axios.post(`${baseUrl}/forgot-password`,{
          email,
        }, { headers: { 'accept': 'application/json' }})
        .then(response => {
          let userInfo = response.data;
          console.log(userInfo)
        })
        .catch(e => {
          console.log(`register error ${e}`)
          console.log(url)
          console.log(email)
          alert(e); 
        })
  };


  if (!fontsLoaded) {
    return null;
  } else {
  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <Loader visible={loading} text="Iniciando sesion" />
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
            Recuperar contraseña
        </Text>
        <Text style={styles.subtitle}>Proporciona tu email para enviarte un correo de recuperación</Text>
        <Input
            onChangeText={txt => {
              validateEmail(txt,setErrorEmail)
              setEmail(txt)
            }}
            //onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Correo Electrónico"
            placeholder="Ingresa tu correo electronico"
            maxLength={30}
            error={errorEmail}
            keyboard='email-address'
            editable={true}
            value={email}
            />
        <Button title="SOLICITAR CORREO" onPress={validate} />
        </View>
        </ImageBackground>
    </KeyboardAvoidingView>
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