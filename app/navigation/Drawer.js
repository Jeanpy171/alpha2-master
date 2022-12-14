import 'react-native-gesture-handler';
import React from 'react'
import { createDrawerNavigator, DrawerContent, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Input, Button, Icon } from "@rneui/base";
import ProfileStack from './ProfileStack';
import Home from '../screens/Home';
import DrawerOptions from '../components/DrawerOptions';
import Splash from '../screens/Splash';

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
  return (
    <Drawer.Navigator
        drawerContent={props => <DrawerOptions {...props} />} 
        useLegacyImplementation={true}
        screenOptions={{
            /*headerStyle: {
              backgroundColor: COLORS.blue,
            },*/
            //headerTintColor: '#fff',
            headerShown:false,
           //drawerActiveBackgroundColor:'#33576f',
            //drawerActiveTintColor:'#fff',
            drawerInactiveTintColor:'#333',
            drawerLabelStyle: {
                marginLeft: -25,
                //fontFamily: 'Roboto-Medium',
                fontSize: 15,
            }
        }}
    >
      <Drawer.Screen name="Home" component={Home} options={{ 
            title: "Pagina principal",
            drawerIcon: ({color})=> (
                <Icon
                    name='home'
                    type='ionicon'
                    size={22}
                    color={color}
                    />
            )
            }} />
      <Drawer.Screen name="Profile" component={ProfileStack} options={{ 
            title: "Ajustes",
            drawerIcon: ({color})=> (
                <Icon
                    name='md-settings-sharp'
                    type='ionicon'
                    size={22}
                    color={color}
                    />
            )
            }}/>
    </Drawer.Navigator>
  );
}


export default MyDrawer