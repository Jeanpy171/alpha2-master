import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import { AuthContext } from '../../src/context/AuthContext';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import PowersDetails from '../screens/PowersDetails';
import Comments from '../screens/Comments';


const Stack = createStackNavigator();

export const HomeStack = () => {
  const {user, logged, logout, isLogged,userInfo,avatar} = useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
    }}
    >
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="PowerDetailsScreen" component={PowersDetails} />
        <Stack.Screen name="comments" component={Comments} />
    </Stack.Navigator>
  );
}

export default HomeStack