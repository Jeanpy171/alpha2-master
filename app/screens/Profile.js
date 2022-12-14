import { StyleSheet, Text, View, Dimensions,Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../src/context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackgroundImage, Button,Icon } from '@rneui/base'
import axios from 'axios';
import Input from '../components/Input';
import {Poppins_400Regular,Poppins_400Regular_Italic,Poppins_500Medium,Poppins_800ExtraBold,Poppins_600SemiBold} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import { FAB,Divider } from "@rneui/themed";

import COLORS from '../const/colors';
import avatarPath from '../components/avatarPath';
import Loader from '../components/Loader';
import { StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native';
import MainHeader from '../components/MainHeader';
import CustomModal from '../components/Modal';
import { sizes } from '../const/theme';


export const Profile = ({navigation}) => {
    const {user, logged, logout, isLogged,userInfo,avatar,isLoading} = useContext(AuthContext)
    
    let [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_800ExtraBold,
      Poppins_600SemiBold
    });
   
    const isLoggedIn = () =>{
      console.log("\nINFORMACION DEL PERFIL\n")
      console.log(userInfo)
      console.log("\nINFO DEL AVATAR: ",avatar.url)
    }
    useEffect(()=> {
      //fetchUser()
      //isLoggedIn()
      //avatar
      //setAvatarInfo(avatar.url)
  },[])

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <MainHeader screen={"Mi Perfil"} name={'ios-menu-outline'} onPress={() => navigation.openDrawer()}/>
        <View style={styles.headerContainer}>
            <BackgroundImage
                source={{uri:avatar.url}}
                imageStyle= {{opacity:0.8}}
                style={styles.backgroundImage}
            >
            </BackgroundImage>
        </View>
        <View style={styles.mainInformation}>
          <Image
              source={{uri:avatar.url}} 
              //source={require('30wfgxTLOiMal2PByb8QuyOQoQ1aoGZ46uXGa6aw.jpg')}
              style={styles.avatar}
          />
          <Text style={styles.title}>{userInfo ? userInfo.username: ''}</Text>
          <Text style={styles.subtitle}>{userInfo ? userInfo.email : ''}</Text>
        </View>
        <View style={{flexDirection:'row',width:'80%', justifyContent:'space-between', alignItems:'center', right:'6%', bottom:"43%"}}>
          <FAB 
          style={styles.edit}
          visible={true}
          //title="Editar"
          size='small'
          //icon={{ uri: 'https://cdn-icons-png.flaticon.com/512/6195/6195699.png' }}
          icon={<Icon name='expeditedssl' type='font-awesome' color={'white'} size={20}/>}
          color={COLORS.orange}
          onPress={() => {
            console.log(userInfo)
            console.log(avatar)
            console.log("Navegando ----------------")
            navigation.navigate('UpdatePasswordScreen')
          }}
        />
          <FAB 
          style={styles.edit}
          visible={true}
          //title="Editar"
          size='small'
          icon={<Icon name='edit' type='font-awesome' color={'white'} size={20}/>}
          color={COLORS.orange}
          onPress={() => {
            console.log(userInfo)
            console.log(avatar)
            console.log("Navegando ----------------")
            navigation.navigate('EditProfileScreen')
          }}
          />
        </View>
        
        <View style={styles.contentContainer}>
          <Divider width={1} style={{marginBottom:15}}/>
          <Text style={styles.items}>NOMBRE COMPLETO: </Text>
          <Text style={styles.subtitle}>{userInfo ? userInfo.first_name : ''} {userInfo ? userInfo.last_name : ''}</Text>
          <Text style={styles.items}>NÚMERO TELEFÓNICO: </Text>
          <Text style={styles.subtitle}>{userInfo ? userInfo.personal_phone : ''}</Text>
          <Text style={styles.items}>NÚMERO CONVENCIONAL: </Text>
          <Text style={styles.subtitle}>{userInfo ? userInfo.home_phone : ''}</Text>
          <Text style={styles.items}>DIRECCIÓN DOMICILIARIA: </Text>
          <Text style={styles.subtitle}>{userInfo ? userInfo.address : ''}</Text>
          <Text style={styles.items}>FECHA DE NACIMIENTO: </Text>
          <Text style={styles.subtitle}>{userInfo.birthdate ? userInfo.birthdate : 'Dato no ingresado'}</Text>
      
        </View>
      </View>
    )
            }
  }
  
  export default Profile
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          //justifyContent: 'center',
          flexDirection:'column'
        },
      headerContainer: {
          width: sizes.width,
          height: sizes.height/3,
          //bottom:'5%'
          //backgroundColor:'blue'
          //position:'absolute'
        },
        fab: {
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        },
        backgroundImage:{
          width:  "50%",
          height: "100%",
          aspectRatio: 3, 
          resizeMode: 'contain',
          //alignItems: 'center',
          //justifyContent: 'center',
          //paddingTop:5
        },
      contentContainer:{
        //flex:15,
        borderTopStartRadius:20,
        borderTopEndRadius:20,
        backgroundColor:'white',
        //alignItems: 'center',
        paddingHorizontal:15,
        paddingVertical:140,
        //justifyContent: 'center',
        width: sizes.width,
        height: sizes.height,
        bottom:'32%'
        //position:'relative',
      },
      viewContainer:{
        //flex:5,
        borderTopStartRadius:20,
        borderTopEndRadius:20,
        backgroundColor:'red',
        //alignItems: 'center',
        paddingHorizontal:15,
        //paddingVertical:140,
        //justifyContent: 'center',
        width: Dimensions.get("window").width - 30,
        height: '60%',
        //position:'relative',
      },
      mainInformation:{
        width: "90%",
        height:'20%',
        //backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        //display:'flex',
        //position:'absolute',
        bottom:'11%',
        zIndex:1,
        
      },
      edit:{
        left:"18%",
        bottom:"45%",
        zIndex:2,
      },
      dataContainer: {
          //flex: 3,
          //backgroundColor: 'blue',
          //borderTopStartRadius:15,
          //borderTopEndRadius:15,
          //alignItems: 'center',
          //justifyContent: 'center',
          backgroundColor:COLORS.red,
          borderRadius:15,
          padding:20,
          width: '100%',
          //paddingHorizontal:15,
          //width: Dimensions.get("window").width,
          height: '100%'
        },
      
      avatar: {
          height: 115,
          width: 115,
          borderRadius: 15,
          marginBottom: 5,
          borderWidth:1,
          borderColor:'rgba(0,0,0,0.40)'
          //borderWidth:2,
          
          },
      information:{
         flexDirection:'row',
         //justifyContent:'flex-start',
         alignItems:'center',
         //backgroundColor:'rgb(245, 245, 245)',
         //paddingHorizontal:10, 
         //width: '100%',
         width:  Dimensions.get("window").width - 20,
         height: '13%',
         borderRadius:15,
         //paddingHorizontal:15,
         //marginHorizontal:10,
         marginTop:10,
         shadowOpacity: 0.90,
         shadowRadius: 5,
         shadowColor: 'red',
         shadowOffset: { height: 0, width: 0 },
      },
      title:{
        fontSize:22,
        marginRight: 10,
        //color:"#33576f",
        textAlign:'justify',
        fontFamily: 'Poppins_600SemiBold'
    },
    items:{
      fontSize:18,
      marginRight: 10,
      //color:"#33576f",
      textAlign:'justify',
      fontFamily: 'Poppins_600SemiBold'
  },
      subtitle:{
          fontSize:17,
          marginRight: 10,
          //color:"#33576f",
          textAlign:'justify',
          fontFamily: 'Poppins_400Regular',
          marginBottom:'5%',
      },
      
  })