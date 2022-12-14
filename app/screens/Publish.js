import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainHeader from '../components/MainHeader'
import { FlatList } from 'react-native'
import { Image } from 'react-native'

const Publish = ({navigation}) => {
    const list = [
        {
            username: 'Conferencias: Comunicación en tiempos de caos y trascendencia',
            comment: 'Te esperamos en una sesión virtual para reflexionar sobre las tragedias y las buenas experiencias que podemos obtener de los malos momentos', 
            imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Tt9xnHrtq7G5vUgT54zZyXwyTR2jgankFA&usqp=CAU",                                                                                                                                                                                                                                                                                                                                                                                                               
            calificacion:4.5,
        },
        {
            username: 'Conferencias: Agradecer lo vivido bendecira lo que llegara',
            imagen: 'https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg',
            comment: 'Bastante buena, es una experiencia agradable',
            calificacion:4.2,
        },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {
            username: 'Formación de facilitadores',
            imagen: 'https://www.escuelabiodanzalaspalmas.com/wp-content/uploads/2019/07/thumbnail_folleto-Escuela-biodanza-las-palmasCARAA.jpg',
            comment: 'Quieres ser un instructor en el arte de la biodanza, capacitate con nosotros ',
            calificacion:3.50,
          },
          
      ]


    const RenderItem = ({ item }) => (
        <View style={{alignItems:"center", justifyContent:"center"}}>
            <View style={{backgroundColor:"rgba(255, 228, 181,0.8)",marginBottom:10,top:20 , borderRadius:5,marginBottom:15, alignItems:"center", justifyContent:"center",width:"96%",padding:15}}>
                <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.title}>{item.username}</Text>
                    <Image 
                        source={{uri:item.imagen}}
                        style={{width:350,height:360,borderRadius:10}}
                        />
                    <Text style={styles.subtitle}>{item.comment}</Text>
                </View>
                
            </View>
        </View>
      )

      
  return (
    <View style={styles.container}>
        <View style={{bottom:"4%"}}>
            <MainHeader screen={"Ultimas novedades"} name={'ios-menu-outline'} onPress={() => navigation.openDrawer()}/>
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

export default Publish

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
  