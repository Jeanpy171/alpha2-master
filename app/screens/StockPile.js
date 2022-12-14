import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainHeader from '../components/MainHeader'
import { FlatList } from 'react-native'
import { Image } from 'react-native'
import { Button } from '@rneui/base'

const StockPile = ({navigation}) => {

    const list = [
        {
            username: 'Taller Biodanza: Comunicación en tiempos de caos y trascendencia',
            comment: 'Te esperamos en taller recreacional para armonitar nuestros sentidos', 
            imagen:"https://psico.edu.uy/sites/default/files/invitacion_8-8-2012_gr.jpg",                                                                                                                                                                                                                                                                                                                                                                                                               
        },
        {
            username: 'Taller Biodanza: Agradecer lo vivido bendecira lo que llegara',
            imagen: 'https://lh3.googleusercontent.com/p/AF1QipNMyGHfhRHVzk_2T0JdmI8UXLJAbDCbe5fUwEE=s1280-p-no-v1',
            comment: 'Agenda tu clase y siente la magía',
        },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {
            username: 'Formación de facilitadores',
            imagen: 'https://www.escuelabiodanzalaspalmas.com/wp-content/uploads/2019/07/thumbnail_folleto-Escuela-biodanza-las-palmasCARAA.jpg',
            comment: 'Quieres ser un instructor en el arte de la biodanza, capacitate con nosotros ',
          },
          
      ]

      const RenderItem = ({ item }) => (
        <View style={{alignItems:"center", justifyContent:"center"}}>
            <View style={{backgroundColor:"rgba(255, 228, 181,0.8)",marginBottom:10,top:20 , borderRadius:5,marginBottom:15, alignItems:"center", justifyContent:"center"}}>
            <Text style={styles.title}>{item.username}</Text>
                        <Image 
                            source={{uri:item.imagen}}
                            style={{width:350,height:360,borderRadius:10}}
                            />
                <View style={{alignItems:"center", justifyContent:"center",flexDirection:"row",paddingHorizontal:5}}>
                    
                    <View style={{alignItems:"center", justifyContent:"center", flex:15}}>
                        <Text style={styles.subtitle}>{item.comment}</Text>
                    </View>
                    <View style={{flex:4}}>
                        <Button title="reservar" onPress={() =>{}} />
                    </View>
                </View>
                
            </View>
        </View>
      )

      
  return (
    <View style={styles.container}>
        <View style={{bottom:"4%"}}>
            <MainHeader screen={"Eventos presenciales"} name={'ios-menu-outline'} onPress={() => navigation.openDrawer()}/>
        </View>
        <FlatList
            style={{bottom:"4%"}}
            keyExtractor={(item, index) => index.toString()}
            data={list}
            renderItem={RenderItem}
        />
    </View>
  )
}

export default StockPile

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      //justifyContent: 'center',
    },
    title:{
        //marginVertical:15,
        fontSize:15,
        //color:"#33576f",
        textAlign:'justify',
        //fontWeight:'bold',
        fontFamily: 'Poppins_800ExtraBold'
    },
    titles:{
        marginVertical:20,
        fontSize:26,
        //color:"#33576f",
        textAlign:'justify',
        //fontWeight:'bold',
        fontFamily: 'Poppins_500Medium'
    },
    subtitle:{
        fontSize:14,
        //marginBottom: 10,
        //color:"#33576f",
        marginVertical:10,
        textAlign:'justify',
        fontFamily: 'Poppins_400Regular'
    },
  });
  