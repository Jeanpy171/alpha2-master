import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import COLORS from '../const/colors';
import {Poppins_400Regular,Poppins_400Regular_Italic} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';


const Button = ({title, onPress = () => {}}) => {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
      });
    
      if (!fontsLoaded) {
        return null;
      } else {
        return (
            <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={{
                height: 55,
                width: '100%',
                backgroundColor: COLORS.blue,
                marginVertical: 20,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius:5,
                backgroundColor:'#FCBB6B',
            }}>
            <Text style={{color: COLORS.white,fontFamily: 'Poppins_400Regular', fontSize: 20,}}>
                {title}
            </Text>
            </TouchableOpacity>
        );
        };
    }

export default Button;