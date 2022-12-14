import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import { AuthContext } from '../../src/context/AuthContext';
import Splash from '../screens/Splash';
import Genders from '../screens/Genders';
import Player from '../screens/Player';


const Stack = createStackNavigator();

export const GenderStack = () => {
  const {user, logged, logout, isLogged,userInfo,avatar} = useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
    }}
    >
        <Stack.Screen name="GenderScreen" component={Genders} />
        <Stack.Screen name="GenderScreenDetails" component={Player} />
    </Stack.Navigator>
  );
}

export default GenderStack