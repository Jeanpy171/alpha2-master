<Slideshow 
          position={position} 
          dataSource={dataSource} 
          ontainerStyle={styles.header} height={300} containerStyle={{resizeMode: 'contain'}}/>


          import { StyleSheet, Text, View, Dimensions, StatusBar, ImageBackground } from 'react-native'
          import { ImageSlider } from "react-native-image-slider-banner";
          import Slideshow from "react-native-image-slider-show";
          import React, {useEffect, useRef, useState} from 'react'
          import { Icon } from '@rneui/base';
          import { TouchableOpacity } from 'react-native';
          import COLORS from '../const/colors';
          import { ScrollView } from 'react-native';
          import Carousel from 'react-native-snap-carousel';
          import {Poppins_400Regular,Poppins_700Bold,Poppins_800ExtraBold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
          import { useFonts } from '@expo-google-fonts/dev';
          import { ActivityIndicator } from 'react-native';
          import { size } from 'lodash';
          import { Pagination } from 'react-native-snap-carousel-v4';
          import MainHeader from '../components/MainHeader';
          
          
          export default function Home({navigation}) {
            const renderItem = ({item}) => {
              return (
                  <View style={styles.slide}>
                    <TouchableOpacity>
                    <ImageBackground
                      PlaceholderContent={<ActivityIndicator color="#ff"/>}
                      style={{width: Dimensions.get("window").width / 1.5 ,
                      height:Dimensions.get("window").height / 3,}}
                      source={{uri:item.url}}
                    >
                      <Text>Hola</Text>
                    </ImageBackground>
                    </TouchableOpacity>
                  </View>
              );
            }
          
            let [fontsLoaded] = useFonts({
              Poppins_400Regular,
              Poppins_500Medium,
              Poppins_600SemiBold,
              Poppins_700Bold,
              Poppins_800ExtraBold
            });
          
            const powers = [
              {
                title: "Burger 1",
                caption: "Original  Cheezy Meat",
                url:
                  "https://scontent.fuio10-1.fna.fbcdn.net/v/t39.30808-6/311836908_5280356808737439_3258469052372259846_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_ohc=0RFwR2kUxCIAX9uLW-o&_nc_ht=scontent.fuio10-1.fna&oh=00_AT9DnxHpcCk3YxxYGrPSm8lrlJHUFYGxWK7q9eM_C98kfw&oe=63528DFE"
              },
              {
                title: "Burger 2",
                caption: "100% Original Beef",
                url:
                  "https://scontent.fuio10-1.fna.fbcdn.net/v/t1.6435-9/149223721_3498225323617272_4802552629253238151_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_ohc=U0Xfwf4f3AsAX9aPyP-&_nc_ht=scontent.fuio10-1.fna&oh=00_AT9LkMDROMFdLhjjrMh2cRujpuznX3yNAUYSEtDFIfyUYg&oe=6372316C"
              },
              {
                title: "Burger 3",
                caption: "Mouthfull Of Happiness",
                url:
                  "https://scontent.fuio10-1.fna.fbcdn.net/v/t1.6435-9/97510757_2751163921656753_8925017134296203264_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=w-I8N5XJWFEAX8UnbiJ&_nc_ht=scontent.fuio10-1.fna&oh=00_AT-s5hIM_Uu6u_uSWStjfLBskv__uQsBMghipyZi6hl7bQ&oe=6373261F"
              }
            ]
            const dataSource = [
              {
                title: "Burger 1",
                caption: "Original  Cheezy Meat",
                url:
                  "https://scontent.fuio10-1.fna.fbcdn.net/v/t39.30808-6/311836908_5280356808737439_3258469052372259846_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_ohc=0RFwR2kUxCIAX9uLW-o&_nc_ht=scontent.fuio10-1.fna&oh=00_AT9DnxHpcCk3YxxYGrPSm8lrlJHUFYGxWK7q9eM_C98kfw&oe=63528DFE"
              },
              {
                title: "Burger 2",
                caption: "100% Original Beef",
                url:
                  "https://scontent.fuio10-1.fna.fbcdn.net/v/t1.6435-9/149223721_3498225323617272_4802552629253238151_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_ohc=U0Xfwf4f3AsAX9aPyP-&_nc_ht=scontent.fuio10-1.fna&oh=00_AT9LkMDROMFdLhjjrMh2cRujpuznX3yNAUYSEtDFIfyUYg&oe=6372316C"
              },
              {
                title: "Burger 3",
                caption: "Mouthfull Of Happiness",
                url:
                  "https://scontent.fuio10-1.fna.fbcdn.net/v/t1.6435-9/97510757_2751163921656753_8925017134296203264_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=w-I8N5XJWFEAX8UnbiJ&_nc_ht=scontent.fuio10-1.fna&oh=00_AT-s5hIM_Uu6u_uSWStjfLBskv__uQsBMghipyZi6hl7bQ&oe=6373261F"
              }
            ];
          
            const SLIDER_WIDTH = Dimensions.get('window').width + 80
            const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
          
            const MyPagination = ({data, activeSlide}) =>{
              return(
                <Pagination
                  dotsLength={size(data)}
                  activeDotIndex={activeSlide}
                  containerStyle={styles.containerPagination}
                  dotStyle={styles.dotActive}
                  inactiveDotStyle={styles.dotInactive}
                  inactiveDotOpacity={0.6}
                  inactiveDotScale={0.6}
                />
              )
            }
              const [activeSlide,setActiveSlide] = useState(0)
              const [position, setPosition] = useState(0)
              const carouselRef = useRef(null)
              useEffect(()=>{
                const toggle = setInterval(() => {
                  setPosition(position === dataSource.length - 1 ? 0 : position + 1);
                }, 3000);
            
                return () => clearInterval(toggle);
              })
            
              if (!fontsLoaded) {
                return null;
              } else {
            return (
              <View style={styles.container}> 
                <MainHeader screen={"Página Principal"} name={'ios-menu-outline'} onPress={() => navigation.openDrawer()}/>
                    <Carousel
                        layout={'default'}
                        //ref={carouselRef}
                        layoutCardOffset={9}
                        data={powers}
                        renderItem={renderItem}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        inactiveSlideShift={0}
                        useScrollView={true}
                        itemHeight={Dimensions.get("window").height / 2}
                        onSnapToItem={(index) => setActiveSlide(index)}
                      />
                      <MyPagination data={powers} activeSlide={activeSlide}/>
                  <Text style={styles.title}>Los 7 poderes de la biodanza</Text>
                
              </View>
            )
          }
          }
          
          const styles = StyleSheet.create({
            container: {
              //flex: 1,
              alignItems:'center',
              //justifyContent:'center'
              //backgroundColor: '#fff',
            },
            slide:{
              width: Dimensions.get("window").width - 50,
              height:"60%",
              backgroundColor:'blue',
              //padding:20,
              //marginRight:30,
              alignItems:'center',
              justifyContent:'center'
            },
            title:{
              //marginVertical:10,
              backgroundColor:'red',
              fontSize:20,
              //color:"#33576f",
              textAlign:'justify',
              //fontWeight:'bold',
              fontFamily: 'Poppins_500Medium'
          },
            containerPagination:{
              backgroundColor:"transparent",
              //backgroundColor:"red",
              zIndex:1,
              position:'absolute',
              bottom:0,
              left:'30%',
              alignItems:'center',
              //justifyContent:'center'
            },
            dotActive:{
              width:10,
              height:10,
              borderRadius:5,
              marginHorizontal:2,
              backgroundColor:'#fff'
            },
            dotInactive:{
              width:5,
              height:5,
              borderRadius:2,
              marginHorizontal:2,
              backgroundColor:'ligth-white'
            }
          })