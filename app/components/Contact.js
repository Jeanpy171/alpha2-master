import { StyleSheet, Text, View,Image,Dimensions, Linking,Modal,TouchableOpacity} from 'react-native'
import { Button, Divider } from "@rneui/themed";
import COLORS from '../const/colors'

import React, { useCallback, useRef, useMemo } from "react";
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
import Map from './Map';

const SLIDER_WIDTH = Dimensions.get('window').width + 80
const CARD_WIDTH = sizes.width - 50;
const CARD_HEIGHT = 350;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)


const Contact = ({onpress}) => {
  const [contactData,setContactData] = useState({});
  const getContact = async() => {
    const token = await AsyncStorage.getItem('token');
  
    try{
      const response = await axios.get(
        'https://alphao2.herokuapp.com/api/alpha/contactos',
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

let [fontsLoaded] = useFonts({
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold
});
if (!fontsLoaded) {
  return null;
} else {
  return (
    <View style={styles.contactContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{top:"3%",}}>
              <Text style={{fontFamily:'Poppins_600SemiBold',}}>Ocultar</Text>
            </TouchableOpacity>
              <FlatList data={contactData}
                horizontal={true}
                snapToInterval={CARD_WIDTH_SPACING}
                //decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                keyExtractor={i => i.id}
                  renderItem={({item, index}) => {
                    return(
                      <View style={styles.containerContact} key={index}>
                        <Text style={styles.textStyle}>{item.nombre} {item.apellido}</Text>
                                <Text style={styles.textStyle}>{item.correo}</Text>
                                <Text style={styles.textStyle}>{item.puesto}</Text>
                                <Text style={styles.textStyle}>{item.contactanos}</Text>
                                <TouchableOpacity onPress={() => handleWhatsappPress(item.contactanos)}>
                                  <Icon name="whatsapp" type="font-awesome" size={25}/>
                                </TouchableOpacity>
                                
                    </View>
                        
                    )
                }}
                />
          </View>
        </View>
      </Modal>
        <Image source={require('../../assets/biodanza-logo.png')} style={{width:203, height:80,marginTop:20}}/>
        <Text style={styles.subtitle}>Siguenos en nuestras redes</Text>
        <View style={styles.networkContainer}>
          <TouchableOpacity>
              <Image source={require('../../assets/facebook-logo.png')} style={{width:30,height:30}}/>
          </TouchableOpacity>
          <TouchableOpacity>
              <Image source={require('../../assets/twitter-logo.png')} style={{width:30,height:30}}/>
          </TouchableOpacity>
          <TouchableOpacity>
              <Image source={require('../../assets/instagram-logo.png')} style={{width:30,height:30}}/>
          </TouchableOpacity>
          <TouchableOpacity>
              <Image source={require('../../assets/whatsapp-logo.png')} style={{width:30,height:30}}/>
          </TouchableOpacity>
        </View>
        <Text style={{opacity:0.3}}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</Text>
        <View style={styles.personalContact}>
          <View style={styles.optionsContainer}>
              <Text style={styles.options}>Nuestros responsables</Text>
              <Button
              onPress={() => setModalVisible(!modalVisible)}
              title="Organizadores"
              icon={{
                name: 'perm-contact-cal',
                type: 'material-icon',
                size: 15,
                color: 'white',
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: COLORS.grey,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 150,
                //marginHorizontal: 50,
                marginVertical: 5,
              }}
            />
          </View>
          <View style={styles.optionsContainer}>
              <Text style={styles.options}>Visita nuestra escuela</Text>
              <Button
              title="Visitar"
              onPress={() => setModalMap(!modalMap)}
              icon={{
                name: 'ios-location-sharp',
                type: 'ionicon',
                size: 15,
                color: 'white',
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: COLORS.orange,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 150,
                //marginHorizontal: 50,
                marginVertical: 5,
              }}
            />
          </View>
        </View>
        <TouchableOpacity onPress={onpress}>
        <Text style={styles.options}>Te ha gustado la experiencia? <Text 
        style={styles.indications}>Dejanos tu valoración aquí.</Text></Text>
        </TouchableOpacity>
        <Map isModalVisible={modalMap} setIsModalVisible={setModalMap}/>
      </View>
  )
}
}

export default Contact

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      backgroundColor: 'white',
      width: Dimensions.get("window").width,
      alignItems: 'center',
      //justifyContent: 'center',
    },
    indications: {
      color:"#FC6B6B",
      //fontWeight: 'bold',
      fontFamily: 'Poppins_700Bold'
    },
    title:{
      //marginVertical:10,
      fontSize:20,
      //color:"#33576f",
      textAlign:'justify',
      fontSize:22,
      fontFamily:'Poppins_600SemiBold',
      right:70,
      paddingVertical:10,
  },
  subtitle:{
      //color:"#33576f",
      textAlign:'justify',
      fontSize:15,
      fontFamily:'Poppins_500Medium',
      //right:70,
      paddingVertical:10,
  },
  options:{
      textAlign:'justify',
      fontSize:12,
      fontFamily:'Poppins_500Medium',
      //right:70,
      paddingVertical:10,
  },
  contactContainer:{
    alignItems: 'center',
    //justifyContent: 'center',
    height:370,
    //backgroundColor: COLORS.blue,
  },
  networkContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor:'red',
    width: Dimensions.get("window").width / 2,
    height:40,
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  personalContact:{
    width: Dimensions.get("window").width,
    //backgroundColor:'red',
    flexDirection:'row',
    justifyContent:'space-evenly',
  },
  optionsContainer:{
    width: Dimensions.get("window").width / 2,
    //backgroundColor:'yellow', 
    justifyContent:'center',
    alignItems:'center'
  },
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