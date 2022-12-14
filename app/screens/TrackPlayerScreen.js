import {View, Text, Modal, Image, StyleSheet, Pressable} from 'react-native';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
//import ShuffleIcon from '../assets/icons/shuffle.png';
//import PrevIcon from '../assets/icons/prev.png';
//import NextIcon from '../assets/icons/next.png';
//import LoopIcon from '../assets/icons/loop.png';
//import PlayIcon from '../assets/icons/play.png';
//import PauseIcon from '../assets/icons/pause.png';
//import MenuIcon from '../assets/icons/down.png';
import {secsToTimestamp} from '../utils/timeFormat';
import { useEffect } from 'react';
import { useState } from 'react';
import { pause, resume } from '../utils/audioController';
import { ImageBackground } from 'react-native';
import {Poppins_400Regular,Poppins_700Bold,Poppins_800ExtraBold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
export default function TrackPlayerScreen({
  isVisible,
  onCloseModal,
  selectedMusic,
  isPlaying,
  playOrPause,
  onSeekTrack,
  timestamp,
  onPressNext,
  onPressPrev,
  playbackMode,
  onClickShuffle,
  onClickLoop,
  calculateSeedBar,
  currentAudio,
  playbackPosition,
  playbackObj,
  soundObj,
  setSoundObj,
  setPlaybackPosition
}) {

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold
  });
  const [currentPosition,setCurrentPosition] = useState(0);
  const renderCurrentTime = () => {
    return secsToTimestamp(playbackPosition / 1000)
  }

  if (!fontsLoaded) {
    return null;
} else {
  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      presentationStyle="fullScreen">
        <ImageBackground
          source={{uri: selectedMusic.artwork}}
          resizeMode="cover"
          style={styles.container}
          imageStyle= {{opacity:0.3}}
        >
        <Pressable
          onPress={onCloseModal}
          style={{
            position: 'absolute',
            top: 45,
            left: 30,
          }}>
          <Image
            source={require('../../assets/icon/down.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: '#fff',
            }}
          />
        </Pressable>
        <Text style={[styles.mainText, {fontWeight: 'bold'}]}>
          {selectedMusic.album}
        </Text>
        <Image
          style={{width: 350, height: 350, marginVertical: 20}}
          source={{uri: selectedMusic.artwork}}
        />
        <View style={{justifyContent: 'space-between', width: '100%'}}>
          <View>
            <Text style={styles.boldMainText}>{selectedMusic.title}</Text>
            <Text style={styles.mainText}>{selectedMusic.artist}</Text>
          </View>
        </View>
        <Text>{}</Text>
        <Slider
          tapToSeek={true}
          minimumTrackTintColor="#fff"
          /*onValueChange={e => {
            onSeekTrack(Math.floor(e * selectedMusic.duration));
          }}*/
          value = {calculateSeedBar}
          style={{width: '100%', paddingHorizontal: 10}}
          onValueChange={value => {
            //console.log("AUDIO DE SLIDE: ",currentAudio)
            setCurrentPosition(secsToTimestamp(value * currentAudio.duration ));
            console.log(value * currentAudio.duration)

          }}
          onSlidingStart={ async() => {
            console.log("CAMBIO DESDE REPRODUCTOR INTERNO--------")
            if(!isPlaying) return;
              try{
                await pause(playbackObj);
              }catch(error){
                console.log("ERROR EN REPRODUCTOR DE CANCIONES BARRA INICIO----", error)
              }
            
          }
          }
          onSlidingComplete={
            async(value) => {
              if(soundObj === null || !isPlaying) return;
              console.log("BARRA FINALIZADA-------")
              try{
                const status = await playbackObj.setPositionAsync(Math.floor(soundObj.durationMillis * value))
                setSoundObj(status)
                setPlaybackPosition(status.positionMillis)
                //setCurrentPosition(0)
                await resume(playbackObj)
              }catch(error){
                console.log("ERROR EN REPRODUCTOR DE CANCIONES BARRA COMPLETA ----", error)
              }
            }
          }
          minimumValue={0}
          maximumValue={1}
          //value={timestamp / selectedMusic.duration}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text style={styles.mainText}>{currentPosition ? currentPosition : renderCurrentTime()}</Text>
          <Text style={styles.mainText}>
            {secsToTimestamp(selectedMusic.duration)}
          </Text>
        </View>
        <View style={styles.timeStampHolder}>
          <View/>
          <Pressable onPress={onPressPrev}>
            <Image style={styles.iconWidth} source={require('../../assets/icon/prev.png')} />
          </Pressable>
          <Pressable onPress={playOrPause} style={styles.playButtonHolder}>
            <Image
              style={[styles.iconWidth, {tintColor: '#000'}]}
              source={isPlaying ? require('../../assets/icon/pause.png') : require('../../assets/icon/play.png')}/>
          </Pressable>
          <Pressable onPress={onPressNext}>
            <Image style={styles.iconWidth} source={require('../../assets/icon/next.png')} />
          </Pressable>
        </View>
     
        </ImageBackground>
      
    </Modal>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 30,
    //paddingBottom: 40,
  },
  boldMainText: {
    fontSize: 22,
    color: '#fff',
    marginHorizontal: 20,
    //marginBottom: 1,
    fontFamily:'Poppins_700Bold',
  },
  mainText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginHorizontal: 20,
    fontFamily:'Poppins_400Regular',
    marginBottom: 5,
    marginTop: 15,
  },
  iconWidth: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  timeStampHolder: {
    width: '80%',
    justifyContent:'space-around',
    //backgroundColor:'red',
    right:20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 0,
  },
  playButtonHolder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});