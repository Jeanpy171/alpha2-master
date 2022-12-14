import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import { AuthContext } from '../../src/context/AuthContext';
import Splash from '../screens/Splash';
import UpdatePassword from '../screens/UpdatePassword';


const Stack = createStackNavigator();

export const ProfileStack = () => {
  const {user, logged, logout, isLogged,userInfo,avatar} = useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
    }}
    >
        <Stack.Screen name="ProfileScreen" component={Profile} />
        <Stack.Screen name="EditProfileScreen" component={EditProfile} />
        <Stack.Screen name="UpdatePasswordScreen" component={UpdatePassword} />
    </Stack.Navigator>
  );
}

export default ProfileStack