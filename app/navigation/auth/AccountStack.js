import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../../screens/Splash';
import Login from '../../screens/Login';
import RecoverPassword from '../../screens/RecoverPassword';
import { AuthContext } from '../../../src/context/AuthContext';
import Register from '../../screens/Register';
import Register_part2 from '../../screens/Register_part2';
import ResetPassword from '../../screens/ResetPassword';
import Onboarding from '../../components/Onboarding';
import MyDrawer from '../Drawer';

const Stack=createStackNavigator();

export const  AccountStack = () =>{
    const {userInfo} = useContext(AuthContext)
    const {user, logged, logout, isLogged} = useContext(AuthContext)
    let loggin = false
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen
                name="splash"
                component={Splash}
            />
        <Stack.Screen
                name="login"
                component={Login}
            />
            <Stack.Screen
                name="onboarding"
                component={Onboarding}
            />
            <Stack.Screen
                name="recoverPassword"
                component={RecoverPassword}
            />
            <Stack.Screen
                name="resetPassword"
                component={ResetPassword}
            />
            <Stack.Screen
                name="register"
                component={Register}
            />
            <Stack.Screen
                name="register_part2"
                component={Register_part2}
            />
            <Stack.Screen
                name="home"
                component={MyDrawer}
            />
    </Stack.Navigator>
  )
}

export default AccountStack