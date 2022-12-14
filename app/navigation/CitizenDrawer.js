import 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerContent, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Alert,
    ScrollView,
    TouchableOpacity,
  } from "react-native";
import { Input, Button, Icon } from "@rneui/base";
  import { useEffect, useState } from 'react';
import Home from '../screens/Home';
import DrawerOptions from '../components/DrawerOptions';
import Recommends from '../screens/Recommends';
import Profile from '../screens/Profile';
import Player from '../screens/Player';
import Genders from '../screens/Genders';
import EditProfile from '../screens/EditProfile';
import TrackListScreen from '../screens/TrackListScreen';
import COLORS from '../const/colors';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';
import GenderStack from './GenderStack';
import { PublishTopTabs } from './PublishTopTab';
//import Icon from 'react-native-ionicons'

const Drawer = createDrawerNavigator();
export const CitizenDrawer = () => {
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
        <Drawer.Screen 
          name='homeScreen'
          component={HomeStack}
          options={{ 
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
        <Drawer.Screen 
          name='favoriteSreen'
          component={PublishTopTabs}
          options={{ 
            title: "Novedades",
            drawerIcon: ({color})=> (
                <Icon
                    name='favorite'
                    type='material-icon'
                    size={22}
                    color={color}
                    />
            )
            }} />
        <Drawer.Screen 
          name='GenerScreen'
          component={GenderStack}
          options={{ 
            title: "Generos",
            drawerIcon: ({color})=> (
                <Icon
                    name='musical-notes-sharp'
                    type='ionicon'
                    size={22}
                    color={color}
                    />
            )
            }} />
        <Drawer.Screen 
          name='profileScreen'
          component={ProfileStack}
          options={{ 
            title: "Ajustes",
            drawerIcon: ({color})=> (
                <Icon
                    name='md-settings-sharp'
                    type='ionicon'
                    size={22}
                    color={color}
                    />
            )
            }} />
        <Drawer.Screen 
          name='player'
          component={Player}
          options={{ 
            title: "Player",
            drawerItemStyle: { height: 0, width:0 },
            drawerIcon: ({color})=> (
                <Icon
                    name='md-settings-sharp'
                    type='ionicon'
                    size={22}
                    color={color}
                    />
            )
            }} />
            <Drawer.Screen 
          name='audioList'
          component={TrackListScreen}
          options={{ 
            title: "Player",
            drawerItemStyle: { height: 0, width:0 },
            drawerIcon: ({color})=> (
                <Icon
                    name='md-settings-sharp'
                    type='ionicon'
                    size={22}
                    color={color}
                    />
            )
            }} />
    </Drawer.Navigator>
  );
}

/*
const DrawerOptions = ({navigation}) => {
    const [image,setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/4/41/Profile-720.png")
    console.log("------------------URL DE IMAGEN RECUPERADA-------------------")
    console.log(image)
    return (
      <View style={{backgroundColor:'#F8F1FF',width: Dimensions.get("window").width -112.7, height: Dimensions.get("window").height+15,}}>
        <View
        style={{backgroundColor:'#FC731F',width: "100%",height:"7%", flexDirection:"row",justifyContent:"space-around", alignItems:"center"}}
        >
          <Text
                  style={{
                    color: "#F8F1FF",
                    fontSize: 20,
                    fontFamily: "Itim_400Regular",
                  }}
                >
                  PULPO
                </Text>
                
        </View>
        <View
          style={{width: "100%",height:"25%", justifyContent:'center', alignItems:'center', }}
        >
          <Image 
          style={{width:120, height:120, borderRadius:100, marginBottom:7}}
          source={{uri:image}}
          /*
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Profile-720.png',
          }}
          />
          <Text style={{fontStyle:'italic', fontSize:15, marginBottom:2}}>{global.name} {global.lastName}</Text>
          <Text style={{fontStyle:'italic', fontSize:15}}>{global.email}</Text>
        </View>
      <TouchableOpacity style={{height:"6%", backgroundColor:'rgba(196,196,196,0.35)', borderWidth:1, borderColor:'rgba(0,0,0,0.25)',flexDirection:'row',justifyContent:'space-around', alignItems:'center'}}
      onPress={() =>{
        //navigation.navigate("OrganizadorHome1");
      }}
      >
        <Text style={{fontStyle:'italic', fontSize:15}}>Organizar un torneo</Text>
        <Icon name='clipboard-text-outline' size={30} type='material-community'/>
      </TouchableOpacity>
      <TouchableOpacity style={{height:"6%", backgroundColor:'rgba(196,196,196,0.35)', borderWidth:1, borderColor:'rgba(0,0,0,0.25)',flexDirection:'row',justifyContent:'space-around', alignItems:'center'}}
      onPress={() =>{
        //navigation.navigate("FormularioAprobacionScreen");
      }}
      >
        <Text style={{fontStyle:'italic', fontSize:15}}>Lista de Torneos      </Text>
        <Icon name='tournament' size={30} type='material-community'/>
      </TouchableOpacity>
      <TouchableOpacity style={{height:"6%", backgroundColor:'rgba(196,196,196,0.35)', borderWidth:1, borderColor:'rgba(0,0,0,0.25)',flexDirection:'row',justifyContent:'space-around', alignItems:'center'}}>
        <Text style={{fontStyle:'italic', fontSize:15}}>Torneos por Aprobar</Text>
        <Icon name='clipboard-text-outline' size={30} type='material-community'/>
      </TouchableOpacity>
      <TouchableOpacity style={{height:"6%", backgroundColor:'rgba(196,196,196,0.35)', borderWidth:1, borderColor:'rgba(0,0,0,0.25)',flexDirection:'row',justifyContent:'space-around', alignItems:'center'}}>
        <Text style={{fontStyle:'italic', fontSize:15, width:'50%'}}>Marcadores en tiempo real</Text>
        <Icon name='camera-timer' size={30} type='material-community'/>
      </TouchableOpacity>
      <TouchableOpacity style={{height:"6%", backgroundColor:'rgba(196,196,196,0.35)', borderWidth:1, borderColor:'rgba(0,0,0,0.25)',flexDirection:'row',justifyContent:'space-around', alignItems:'center'}}>
        <Text style={{fontStyle:'italic', fontSize:15, width:'50%'}}>Calendario de Encuentros</Text>
        <Icon name='basketball-hoop-outline' size={30} type='material-community'/>
      </TouchableOpacity>
      <TouchableOpacity style={{height:"6%", backgroundColor:'rgba(196,196,196,0.35)', borderWidth:1, borderColor:'rgba(0,0,0,0.25)',flexDirection:'row',justifyContent:'space-around', alignItems:'center',top:'100%'}}
        onPress={() =>{
        //finalizarSesion();
        //navigation.navigate("AccountHome");
      }}
      >
        <Text style={{fontStyle:'italic', fontSize:15}}>Cerrar sesión</Text>
        <Icon name='logout' size={30} type='material-community'/>
      </TouchableOpacity>
      
      </View>
    )
  }*/

export default CitizenDrawer;