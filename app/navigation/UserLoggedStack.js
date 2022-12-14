import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import { AuthContext } from '../../src/context/AuthContext';
import Splash from '../screens/Splash';
import MyDrawer from './Drawer';


const Stack = createStackNavigator();

export const UserLoggedStack = () => {
  const {user, logged, logout, isLogged,userInfo,avatar} = useContext(AuthContext)
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
        <Stack.Screen name="UserLogged" component={MyDrawer} />
    </Stack.Navigator>
  );
}

export default UserLoggedStack