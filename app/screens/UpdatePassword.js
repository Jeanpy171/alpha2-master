import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainHeader from '../components/MainHeader'
import { useState } from 'react';
import Input from '../components/Input';
import axios from 'axios';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import { validatePasswords } from '../utils/helpers';

const UpdatePassword = ({navigation}) => {
  const [userData, setUserData] = useState({password: '', newPassword: ''});
  const [errorNewPassword, setErrorNewPassword] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const token = AsyncStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);
  const validate = () => {

  }
  const UpdatePassword = async (password, password_confirmation) => {
    setIsLoading(true)
    console.log(await token)
    try {
        console.log("Actualizando contraseña . . . ")
        const response = await axios.post(
            'https://alphao2.herokuapp.com/api/alpha/update-password',
            { password, password_confirmation },
            { headers: { 'accept': 'application/json','authorization': await token } }
        )
        console.log(response.data)
        console.log("LA CONTRASEÑA HA SIDO ACTUALIZADA EXITOSAMENTE");
        alert("La contraseña ha sido actualizada exitosamente!");
        navigation.goBack()
    } catch (e) {
      //console.log(e)
      console.log(e.response.data.errors.password);
      const errors = e.response.data.errors.password;
      setIsLoading(false)
      alert(e.response.data.errors.password.toString());
      //setIsLoading(false)
    }
  }
  return (
    <View style={styles.container}>
      <Loader visible={isLoading} text="Actualizando contraseña"/>
      <MainHeader screen={"Actualizar Contraseña"} name={'ios-menu-outline'} onPress={() => navigation.openDrawer()}/>
      <View style={{width:"90%"}}>
        <View style={{paddingVertical:20}}>

        <Text style={styles.title}>
            No estas seguro con tu contraseña actual?
        </Text>
        <Text style={styles.subtitle}>
          Puedes modificarla en este apartado.
        </Text>
        <Input
            onChangeText={text => {
              //setErrorPassword("")
              setUserData({...userData, password:text})
              validatePasswords(text,userData.newPassword,setErrorPassword)
            }
            }
            //onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Nueva contraseña"
            placeholder="Ingresa tu nueva contraseña"
            error={errorPassword}
            maxLength={15}
            password
            keyboard='default'
            editable={true}
            value={userData.password}
          />
          <Input
            onChangeText={text => {
              //setErrorNewPassword("")
              setUserData({...userData, newPassword:text})
              validatePasswords(text,userData.password,setErrorNewPassword)
            }
            }
            //onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Confirma tu contraseña"
            placeholder="Ingresa nuevamente tu nueva contraseña"
            error={errorNewPassword}
            maxLength={15}
            password
            keyboard='default'
            editable={true}
            value={userData.newPassword}
          />
          <Button title="ACTUALIZAR CONTRASENA" onPress={() => UpdatePassword(userData.password,userData.newPassword)} />
        </View>
        </View>
    </View>
  )
}

export default UpdatePassword

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      //justifyContent: 'center',
    },
  title:{
    fontSize:20,
    textAlign:'left',
    fontFamily: 'Poppins_500Medium',
    paddingVertical:5,
},
subtitle:{
  fontSize:15,
  textAlign:'left',
  fontFamily: 'Poppins_500Medium',
  paddingVertical:10,
},
  });
  