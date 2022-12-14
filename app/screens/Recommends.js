
import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Button,TouchableOpacity,Dimensions,Modal,Pressable } from "react-native";
import axios from 'axios';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainHeader from '../components/MainHeader'
import { useState } from "react";
import Carrousel from "../components/Carrousel";
import { FlatList } from "react-native";
import { useEffect } from "react";
import { Icon } from "@rneui/base";
import { sizes, spacing } from "../const/theme";
import {Poppins_400Regular,Poppins_700Bold,Poppins_800ExtraBold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import { Linking } from "react-native";
import Map from "../components/Map";

const SLIDER_WIDTH = Dimensions.get('window').width + 80
const CARD_WIDTH = sizes.width - 50;
const CARD_HEIGHT = 350;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

export default function Recommends({navigation}) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold
  });
  const [contactData,setContactData] = useState({});
  const getContact = async() => {
    const token = await AsyncStorage.getItem('token');
  
    try{
      const response = await axios.get(
        'https://alphao1.herokuapp.com/api/alpha/contactos',
        { headers: { 'accept': 'application/json', 'authorization': token } }
    );

    console.log("---------------------RECOPILANDO INFO DE CONTACTOS ----------------\n")
    console.log(response.data.data.contactanos)
    setContactData(response.data.data.contactanos)
    }catch(e){
        console.log(e)
    }
  }

  const handleWhatsappPress = (phoneNumber) =>{
    Linking.openURL(`https://wa.me/${phoneNumber}?text=Hola! Estoy interesado en asistir a una clase presencial con ustedes.`)
  }

  useEffect(() => {
    getContact()
  },[])

const [modalVisible, setModalVisible] = useState(false);
const [modalMap, setModalMap] = useState(false);

if (!fontsLoaded) {
  return null;
} else {
  return (
    <View style={{height:800}}>
      <MainHeader screen={"Recomendaciones"} name={'ios-menu-outline'} onPress={() => navigation.openDrawer()}/>
      
      </View>
    
  )
}
}

const styles = StyleSheet.create({
  containerContact: {
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems:'center',
    justifyContent:'center',
    width: ITEM_WIDTH - 100,
    height: 200,
    margin:spacing.l,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  container: {
    flex: 1,
    paddingTop: 200,
    height:1000,
  },
  contentContainer: {
    backgroundColor: "white",
    alignItems:'center',
    justifyContent:'center',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
  centeredView: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width:Dimensions.get("window").width,
    top:"64%",
    //marginTop: 22,
    //top:400,
  },
  modalView: {
    width:Dimensions.get("window").width,
    height:300,
    bottom:0,
    backgroundColor: "white",
    borderRadius: 20,
    //padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    //color: "white",
    //fontWeight: "bold",
    textAlign: "center",
    fontFamily:'Poppins_500Medium'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});