import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import Login from '../screens/Login';
import MyDrawer from './Drawer';
import { AuthContext } from '../../src/context/AuthContext';
import AccountStack from './auth/AccountStack';
import UserLoggedStack from './UserLoggedStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export const MyStack = () => {
  const {user, logged, logout, isLogged,userInfo,avatar, token} = useContext(AuthContext)
  //let  logge = true
  const [loggedVerification,setLoginVerfification] = useState(false);

    const validate = async() =>{
      const token = await AsyncStorage.getItem('token');
      console.log("TOKEN DE INICIO------------",token)
        if(token!=null){
            setLoginVerfification(true)
        }else{
            setLoginVerfification(false)
        }
        console.log("----------------VERIFICACION DE LOGIN? ",loggedVerification )
    }

  
  useEffect(() => {
    validate()
  },[isLogged])
  return (
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false
    }}
    >
      
      {loggedVerification
        ? <Stack.Screen name="UserLogged" component={UserLoggedStack} />
        : <Stack.Screen name="LoginStack" component={AccountStack} />
      }
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack