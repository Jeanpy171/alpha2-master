import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Home from '../screens/Home';
import RecoverPassword from '../screens/RecoverPassword';
import { AuthContext } from '../../src/context/AuthContext';
import CitizenDrawer from '../navigation/CitizenDrawer'
import Register from '../screens/Register';
import Register_part2 from '../screens/Register_part2';
import ResetPassword from '../screens/ResetPassword';
import Onboarding from '../components/Onboarding';
import Player from '../screens/Player';
import AccountCreated from '../screens/AccountCreated';
import { is } from 'date-fns/locale';
import CommentsList from '../screens/CommentsList';

const Stack=createStackNavigator();

export const  AccountStack = () =>{
    const {userInfo} = useContext(AuthContext)
    const {user, logged, logout, isLogged} = useContext(AuthContext)
    let loggin = false
  return (
    <NavigationContainer>
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen
                name="splash"
                component={Splash}
            />
            <>
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
                name="login"
                component={Login}
            />
            <Stack.Screen
                name="account-created"
                component={AccountCreated}
            />
            <Stack.Screen
                name="home"
                component={CitizenDrawer}
            />
            <Stack.Screen
                name="comments-list"
                component={CommentsList}
            />
            </>
            
        
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AccountStack