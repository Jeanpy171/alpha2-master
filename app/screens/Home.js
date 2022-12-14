import { StyleSheet, Text, View,Image,Dimensions, Linking,} from 'react-native'
import React from 'react'
import Carrousel from '../components/Carrousel'
import MainHeader from '../components/MainHeader'
import { TouchableOpacity } from 'react-native-gesture-handler'
//import { Button, Divider } from '@rneui/base'
import { Button, Divider } from "@rneui/themed";
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native'
import {Poppins_400Regular,Poppins_700Bold,Poppins_800ExtraBold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import COLORS from '../const/colors'
import { colors } from '../const/theme'
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView
} from "@gorhom/bottom-sheet";
import { useRef } from 'react'
import { powers } from '../components/data/data';
import Carousel from '../components/Carousel'
import Banner from '../components/banner'
import Contact from '../components/Contact'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Home = ({navigation}) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold
  });
  const insets = useSafeAreaInsets();
  const bottomSheetModalRef = useRef(null)
  const snapPoints = ["50%","80%"]
  const handlePresentModal = () =>{
    bottomSheetModalRef.current?.present()
  }



  if (!fontsLoaded) {
    return null;
  } else {
  return (
    <View style={styles.container}>
      <MainHeader screen={"Página Principal"} name={'ios-menu-outline'} onPress={() => navigation.openDrawer()}/>
      <ScrollView style={{}}>
      <>
      <Carousel data={powers}/>
      <SafeAreaView style={styles.container}>
      <Text style={{
        fontSize:20,
        //color:"#33576f",
        textAlign:'justify',
        fontSize:22,
        fontFamily:'Poppins_600SemiBold',
        marginLeft:insets.left - 160,
        //paddingVertical:10,
        paddingBottom:10
    }}>Poderes de la Biodanza</Text>
          <Carrousel/>
          </SafeAreaView>
          <Contact onpress={() => navigation.navigate('comments')}/>
          <Text 
            onPress={() => alert("Hola")}
          style={styles.options}>Tus opiniones son muy importantes para nosotros</Text>
          </>
          </ScrollView>
        </View>
      )
                }
    }

export default Home

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: 'white',
    width: Dimensions.get("window").width,
    alignItems: 'center',
    //justifyContent: 'center',
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
    marginTop:10,
},
optionsContainer:{
  width: Dimensions.get("window").width / 2,
  //backgroundColor:'yellow', 
  justifyContent:'center',
  alignItems:'center'
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
});