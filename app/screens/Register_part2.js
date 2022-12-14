import { StyleSheet, Text, View, Image,ScrollView, Dimensions ,SafeAreaView, Keyboard, Alert, ImageBackground, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from '../components/Input'
import Button from '../components/Button'
import COLORS from '../const/colors';
import Loader from '../components/Loader';
import { validateAddress, validateHomePhone, validatePhone, validateUsername } from '../utils/helpers';
import axios from 'axios';
import { AuthContext, AuthProvider } from '../../src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import {Poppins_400Regular,Poppins_400Regular_Italic,Poppins_500Medium} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import CustomModal from '../components/Modal';

export default function Register_part2({ navigation,route  }) {
  const [userData, setUserData] = useState({username: '',home_phone: '',personal_phone: '', address: ''});
  const [errorHome_phone, setErrorHome_phone] = useState();
  const [errorPersonal_phone, setErrorPersonal_phone] = useState();
  const [errorUsername, setErrorUsername] = useState();
  const [errorAddress, setErrorAddress] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible,setIsModalVisible] = useState(false)
  const [inputError,setInputError] = useState("")
  //const [isLoading, setIsLoading] = useState(false);
  const datosRecuperados = route.params;
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });

  //const navigation = useNavigation();
  const { login,profileInformation} = useContext(AuthContext)

  const validate = () => {
    //console.log(datosRecuperados.userData.email)
    let isValid = true;
    if(errorUsername!=''){
      console.log('DATOS DE USERNAME')
      setErrorUsername('El campo nombre de usuario no puede estar vacio')
      isValid = false;
    }
    if(errorPersonal_phone!=''){
        console.log('DATOS DE TELEFONO')
        setErrorPersonal_phone('el campo numero telefonico no puede estar vacio')
        isValid = false;
    }
    if(errorHome_phone!=''){
        console.log('DATOS DE CONVENCIONAL')
        setErrorHome_phone('El campo telefono convencional no puede estar vacio')
        isValid = false;
    }
    if(errorAddress!=''){
        console.log('DATOS DE ADDRESS')
        setErrorAddress('El campo direccion domiciliaria no puede estar vacio')
        isValid = false;
    }
    if(errorUsername=='' && errorPersonal_phone==''&& errorHome_phone==''&& errorAddress==''){
        console.log('DATOS SIN ERRORES')
    }
    if (isValid) {
      //onLogin(userData.email,userData.password)
      console.log(datosRecuperados.userData)
      console.log(userData)
      Register(userData.username,
        datosRecuperados.userData.email,
        datosRecuperados.userData.password,
        datosRecuperados.userData.first_name,
        datosRecuperados.userData.last_name,
        userData.address,
        userData.personal_phone,
        userData.home_phone,
        )
        //setIsModalVisible(true)
      //navigation.navigate('home')
    }
  };


  const Register = async (username,email,password,first_name,last_name,address,personal_phone,home_phone) => {
    setIsLoading(true)
    try {
        console.log("Realizando peticion")
        const response = await axios.post(
            'https://alphao2.herokuapp.com/api/alpha/register',
            { first_name,last_name,username,email,personal_phone,home_phone,address,password },
            { headers: { 'accept': 'application/json' } }
        )
        console.log("DATOS REGISTRADOS")
        console.log(response.data)
        onLogin(email,password)
        setIsLoading(false)
        navigation.navigate("account-created",{userCredentials:{username:username}})
    } catch (e) {
      console.log(e)
      alert(JSON.stringify(e.response.data.errors));
      setInputError("Tuvimos un error al crear tu cuenta")
    }
  }

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
        //console.warn(access_token, token_type, user);
        login(user, `${token_type} ${access_token}`);
        //profileInformation(`${token_type} ${access_token}`)
        console.log(access_token)
        console.log(token_type)
        console.log(user)
    } catch (e) {
      console.log(e)
      
    }
  }

  


  if (!fontsLoaded) {
    return null;
  } else {
  return (
    <ScrollView style={styles.mainContainer}>
      <Loader visible={isLoading} text="Verificando datos" />
      <CustomModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}ButtonName={"Acceder"} onPress={() => {
          //onLogin(datosRecuperados.userData.email,datosRecuperados.userData.password)
          navigation.goBack()}}title={"Encontramos un problema al crear tu cuenta"} text={inputError}/>
      <ImageBackground 
        source={require("../../assets/garza-fondo.png")}
        imageStyle= {{opacity:0.3}}
        style={styles.background}
      >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
            Ya falta muy poco
        </Text>
        <Text style={styles.subtitle}>
          Completa estos ultimos campos
        </Text>
        <Input
            onChangeText={txt => {
              //setErrorEmail("")
              validateUsername(txt,setErrorUsername)
              setUserData({...userData, username:txt})
            }}
            //onFocus={() => handleError(null, 'email')}
            iconName="account-outline"
            label="Nombre de usuario"
            placeholder="Ingresa tu nombre de usuario"
            maxLength={10}
            error={errorUsername}
            keyboard='default'
            editable={true}
            value={userData.username}
            />
        <Input
            onChangeText={txt => {
              //setErrorEmail("")
              validatePhone(txt,setErrorPersonal_phone)
              setUserData({...userData, personal_phone:txt})
            }}
            //onFocus={() => handleError(null, 'email')}
            iconName="cellphone"
            label="Numero telefonico"
            placeholder="Ingresa tu numero telefonico"
            maxLength={10}
            error={errorPersonal_phone}
            keyboard='numeric'
            editable={true}
            value={userData.personal_phone}
            />
        <Input
            onChangeText={txt => {
              //setErrorEmail("")
              validateHomePhone(txt,setErrorHome_phone)
              setUserData({...userData, home_phone:txt})
            }}
            //onFocus={() => handleError(null, 'email')}
            iconName="phone"
            label="Numero convencional"
            placeholder="Ingresa tu numero convencional"
            maxLength={9}
            error={errorHome_phone}
            keyboard='numeric'
            editable={true}
            value={userData.home_phone}
            />
        <Input
            onChangeText={txt => {
              //setErrorEmail("")
              validateAddress(txt,setErrorAddress)
              setUserData({...userData, address:txt})
            }}
            //onFocus={() => handleError(null, 'email')}
            iconName="compass"
            label="Dirección"
            placeholder="Ingresa tu dirección domiciliaria"
            maxLength={20}
            error={errorAddress}
            keyboard='default'
            editable={true}
            value={userData.address}
            />
        <Button title="FINALIZAR REGISTRO" onPress={validate} />
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