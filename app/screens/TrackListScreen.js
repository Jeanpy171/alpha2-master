import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Pressable,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Dimensions
  } from 'react-native';
import React, { useState } from 'react'
//import {musiclibrary} from '../components/data/data';
import { LinearGradient } from 'expo-linear-gradient';
import TrackPlayerScreen from './TrackPlayerScreen';
import { play,pause, resume, playAnother } from '../utils/audioController';
import {Poppins_400Regular,Poppins_700Bold,Poppins_800ExtraBold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import { useFonts } from '@expo-google-fonts/dev';
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo } from 'react';
import { Audio } from 'expo-av';
import { Divider } from '@rneui/base';

const TrackListScreen = ({musiclibrary}) => {
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [selectedMusicIndex, setSelectedMusicIndex] = useState(null);
  const [isPlayerModalVisible, setisPlayerModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timestamp, setTimestamp] = useState(0);
  const [mode, setMode] = useState('shuffle')
  const [data, setData] = useState()
  const [currentAudio,setCurrentAudio] = useState(null)
  const [playBackObj,setPlayBackObj] = useState(null)
  const [soundObj,setSoundObj] = useState(null)
  const [playbackPosition,setPlaybackPosition] = useState(null)
  const [playbackDuration,setPlaybackDuration] = useState(null)
  const [verificator,setVerificator] = useState(false)
  const [currentSong,setCurrentSong] = useState({})
  const snapPoints = useMemo( () => ['30%','80%'],[])

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold
  });
  /*const PlaylistImageView = () => (
    <>
    <LinearGradient
        // Button Linear Gradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.linearGradient}>
        <Image
          style={{width: 200, height: 200}}
          source={{uri: 'https://www.bensound.com/bensound-img/punky.jpg'}}
        />
      </LinearGradient>
      <TouchableOpacity style={styles.shuffleButtonContainer}>
        <Text style={[styles.shuffleButton]}>SHUFFLE PLAY</Text>
      </TouchableOpacity>
    </>
  );*/

  const calculateSeedBar = () => {
    if(playbackPosition !== null && playbackDuration !== null){
      return playbackPosition / playbackDuration
    }
    return 0
  }

  
  const onSelectTrack = async (selectedTrack, index) => {
    setSelectedMusic(selectedTrack);
    setTimestamp(0);
    //setSelectedMusicIndex(index);
    // remove TrackPlayer.skip(index);
    // playOrPause();
  };
  const playOrPause = async () => {
    //console.log(soundObj)
    console.log("DATA ID: ",data.id)
    //console.log("CURRENT AUDIO: ",currentAudio)
    console.log("CURRENT AUDIO: ",selectedMusicIndex)
    setIsPlaying(!isPlaying);
    //playing audio for the first time
    if(soundObj === null){
        console.log("\n--------------REPRODUCIENDO CANCION POR PRIMERA VEZ----------------\n")
        console.log("///////////////DATOS DE LA CANCION/////////////////////")
        console.log("Datos de la cancion reproducida-----------------",data.url)
        setSelectedMusic(data)
        //setCurrentSong(data)
        const playbackObj = new Audio.Sound()
        const status = await play(playbackObj,data.url)
        setCurrentAudio(playBackObj)
        setSelectedMusicIndex(data.id)
        setPlayBackObj(playbackObj)
        //setSoundObj(status)
        setSoundObj(status)
        return playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
        //return setSoundObj(status)
        //setVerificationPlay({...status,playBackObj:playBackObj,soundObj:status,})
        //console.log(status)
    }
    //pause audio
    if(soundObj.isLoaded && soundObj.isPlaying){
        console.log("\n--------------CANCION DETENIDA----------------\n")
        console.log("La cancion ya esta siendo reproducida")
        //await playback()
        //console.log(currentAudio)
        //console.log( playBackObj)
        const status = await pause(playBackObj)
        //await playBackObj.setStatusAsync({shouldPlay:false})
        return setSoundObj(status)
        //setVerificationPlay({...status,soundObj:status})
    
    }

    //resume audio
    if(soundObj.isLoaded && !soundObj.isPlaying 
        && selectedMusicIndex === ((verificator) ? selectedMusicIndex :data.id)){
            console.log("\n--------------REPRODUCIENDO CANCION NUEVAMENTE----------------\n")
            console.log("Reproduciendo nuevamente . . . .")
            //await playback()
            //console.log(playBackObj)
            const status = await resume(playBackObj)
            return setSoundObj(status)
            //setVerificationPlay({...status,soundObj:status})
        }
    
        //select another audio
    if(soundObj.isLoaded && selectedMusicIndex !== data.id){
      console.log("\n-------------CAMBIANDO CANCION----------------\n")
      console.log("Reproduciendo nueva cancion. . . .")
      const status = await playAnother(playBackObj,data.url)
      //setCurrentSong(data)
      setSelectedMusic(data)
      //setCurrentAudio(data.id)
      setSelectedMusicIndex(data.id)
      setPlayBackObj(playBackObj)
      return setSoundObj(status)
  }

  };

  const onSeekTrack = newTimeStamp => {
    setTimestamp(newTimeStamp);
  };


  const audioFinish = async() => {
      console.log( playBackObj)
      setTimestamp(0);
      setVerificator(true)
      /*setSelectedMusic(
        musiclibrary[(selectedMusicIndex + 1) % musiclibrary.length],
      );*/
      //console.log(playBackObj)
      //setSelectedMusicIndex(selectedMusicIndex + 1);
      const nextAudioIndex = selectedMusicIndex + 1;
      const audio = musiclibrary[nextAudioIndex];
      //const playbackObj = new Audio.Sound()
      const status = await play(playBackObj,audio.url)
      setSelectedMusicIndex(nextAudioIndex);
      setSelectedMusic(audio)
      setPlayBackObj(playBackObj)
        //setSoundObj(status)
      setSoundObj(status)
  }

  const playback = async() => {
     console.log( playBackObj)
    
}

  const onPlaybackStatusUpdate = async playbackStatus => {
    //console.log(playbackStatus)
    //console.log("-----------PLAYBACKOBJECT: ",)
    //await playback()
    if(playbackStatus.isLoaded && playbackStatus.isPlaying){
      setPlaybackPosition(playbackStatus.positionMillis)
      setPlaybackDuration(playbackStatus.durationMillis)
    }

    if(playbackStatus.didJustFinish){
      console.log("\n--------------LA CANCION HA FINALIZADO --------------------\n")
      //return await audioFinish();
    }
  }

  const onPressNext = async() => {
    console.log("\n----------------CAMBIANDO CANCION (SIGUIENTE)-------------------\n")
    setTimestamp(0);
    setVerificator(true)
    /*setSelectedMusic(
      musiclibrary[(selectedMusicIndex + 1) % musiclibrary.length],
    );*/
    setSelectedMusicIndex(selectedMusicIndex + 1);
    const {isLoaded} = await playBackObj.getStatusAsync();
    let nextAudioIndex;
    const isLastAudio = selectedMusicIndex + 1 === musiclibrary.length;
    let status;

    if(!isLoaded && !isLastAudio){
      nextAudioIndex = selectedMusicIndex + 1;
      const audio = musiclibrary[nextAudioIndex];
      //setCurrentSong(audio)
      setSelectedMusic(audio)
      status = await play(playBackObj,audio.url)
    }

    if(isLoaded && !isLastAudio){
      nextAudioIndex = selectedMusicIndex + 1;
      const audio = musiclibrary[nextAudioIndex];
      //setCurrentSong(audio)
      setSelectedMusic(audio)
      status = await playAnother(playBackObj,audio.url)
    }

    if(isLastAudio){
      nextAudioIndex = 0;
      const audio = musiclibrary[nextAudioIndex];
      //setCurrentSong(audio)
      setSelectedMusic(audio)
      if(isLoaded){
        status = await playAnother(playBackObj,audio.url)
      }else{
        status = await play(playBackObj,audio.url)
      }
    }

    //setCurrentAudio(nextAudioIndex)
    setSelectedMusicIndex(nextAudioIndex);
    setPlayBackObj(playBackObj)
      //setSoundObj(status)
    setSoundObj(status)
  };




  const onPressPrev = async() => {
    console.log("\n----------------CAMBIANDO CANCION (PREVIA)-------------------\n")
    if (selectedMusicIndex === 0) {
      return;
    }
    setTimestamp(0);
    setVerificator(true)
    /*setSelectedMusic(
      musiclibrary[(selectedMusicIndex - 1) % musiclibrary.length],
    );*/
    setSelectedMusicIndex(selectedMusicIndex - 1);
    const {isLoaded} = await playBackObj.getStatusAsync();
    let nextAudioIndex;
    const isFirstAudio = selectedMusicIndex <= 0;
    let status;

    if(!isLoaded && !isFirstAudio){
      nextAudioIndex = selectedMusicIndex - 1;
      const audio = musiclibrary[nextAudioIndex];
      setSelectedMusic(audio)
      //setCurrentSong(audio)
      status = await play(playBackObj,audio.url)
    }

    if(isLoaded && !isFirstAudio){
      nextAudioIndex = selectedMusicIndex - 1;
      const audio = musiclibrary[nextAudioIndex];
      setSelectedMusic(audio)
      //setCurrentSong(audio)
      status = await playAnother(playBackObj,audio.url)
    }

    if(isFirstAudio){
      nextAudioIndex = musiclibrary.length - 1;
      const audio = musiclibrary[nextAudioIndex];
      setSelectedMusic(audio)
      //setCurrentSong(audio)
      if(isLoaded){
        status = await playAnother(playBackObj,audio.url)
      }else{
        status = await play(playBackObj,audio.url)
      }
    }

    //setCurrentAudio(nextAudioIndex)
    setSelectedMusicIndex(nextAudioIndex);
    setPlayBackObj(playBackObj)
      //setSoundObj(status)
    setSoundObj(status)
  };

  const information = (item) =>{
    console.log(item)
    setData(item)
    console.log("Datos almacenados")
  }
  const renderSingleMusic = ({item, index}) => {
    return (
      <>
        <Pressable onPress={() => {
            onSelectTrack(item, index)
            information(item)
            setVerificator(false)
            }}>
          <View>
            <Text style={styles.musicTitle}>{item.title}</Text>
            <Text style={styles.artisteTitle}>{item.artist}</Text>
            <Divider/>
          </View>
        </Pressable>
      </>
      
    );
  };

  if (!fontsLoaded) {
    return null;
} else {
  return (
    <BottomSheet snapPoints={snapPoints}>
    <View style={styles.container}>
      <SafeAreaView />
      {selectedMusic && (
        <TrackPlayerScreen
          onCloseModal={() => setisPlayerModalVisible(false)}
          isVisible={isPlayerModalVisible}
          isPlaying={isPlaying}
          playOrPause={playOrPause}
          selectedMusic={selectedMusic}
          onSeekTrack={onSeekTrack}
          timestamp={timestamp}
          onPressNext={onPressNext}
          onPressPrev={onPressPrev}
          playbackMode={mode}
          onClickLoop={()=> mood === "loop" ? setMode("loop") : setMode("off")}
          calculateSeedBar={calculateSeedBar()}
          currentAudio={selectedMusic}
          playbackPosition={playbackPosition}
          playbackObj={playBackObj}
          soundObj={soundObj}
          setSoundObj={setSoundObj}
          setPlaybackPosition={setPlaybackPosition}

        />
      )}
      <View style={[styles.widgetContainer, {justifyContent: 'center'}]}>
        <Text style={styles.subtitle}>Lista de reproduccion</Text>
      </View>
      <FlatList
        data={musiclibrary}
        keyExtractor={item => item.url}
        renderItem={renderSingleMusic}
      />
      {selectedMusic && (
        <Pressable onPress={() => setisPlayerModalVisible(true)}>
          <View style={[styles.widgetContainer, {}]}>
            <View style={{flexDirection: 'row'}}>
              <Image
                resizeMode="cover"
                source={{uri: selectedMusic.artwork}}
                style={styles.widgetImageStyle}
              />
              <View>
                <Text style={styles.widgetMusicTitle}>
                  {selectedMusic.title}
                </Text>
                <Text style={styles.widgetArtisteTitle}>
                  {selectedMusic.artist}
                </Text>
              </View>
            </View>
            <Pressable onPress={playOrPause}>
              <Image
                source={isPlaying ? require('../../assets/icon/pause.png') : require('../../assets/icon/play.png')}
                style={{height: 30, tintColor: '#fff', width: 30}}
              />
            </Pressable>
          </View>
        </Pressable>
      )}
    </View>
    </BottomSheet>
  )
}
}

export default TrackListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191414',
      },
      musicTitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '500',
        marginTop: 12,
        marginHorizontal: 20,
        marginBottom: 1,
        fontFamily:'Poppins_700Bold',
      },
      artisteTitle: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.8,
        marginHorizontal: 20,
        marginBottom: 12,
        marginTop: 1,
        fontFamily:'Poppins_400Regular',
        width: Dimensions.get("window").width,
      },
      widgetContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 0,
        height: 60,
        width: '100%',
        backgroundColor: '#5E5A5A',
      },
      widgetMusicTitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500',
        marginTop: 12,
        marginHorizontal: 10,
        marginBottom: 1,
      },
      widgetArtisteTitle: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.8,
        marginHorizontal: 10,
        marginBottom: 12,
        marginTop: 1,
      },
      widgetImageStyle: {
        width: 55,
        height: 60,
        marginTop: 3,
      },
      linearGradient: {
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
      },
      widgetContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 0,
        height: 60,
        width: Dimensions.get("window").width,
        backgroundColor: '#5E5A5A',
      },
      widgetMusicTitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500',
        marginTop: 12,
        marginHorizontal: 10,
        marginBottom: 1,
        //width:Dimensions.get("window").width,
      },
      widgetArtisteTitle: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.8,
        marginHorizontal: 10,
        marginBottom: 12,
        marginTop: 1,
        //width:Dimensions.get("window").width,
      },
      widgetImageStyle: {
        width: 60,
        height: 60,
        marginTop: 3,
      },
      subtitle:{
        fontSize: 20,
        color: '#fff',
        marginHorizontal: 20,
        fontFamily:'Poppins_500Medium',
        //fontFamily: 'Poppins_400Regular'
    },
})