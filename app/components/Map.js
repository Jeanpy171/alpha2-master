import * as React from 'react';
import MapView, {Marker,Polyline} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity } from 'react-native';
import { useState } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_KEY} from "@env";
import * as Location from 'expo-location';
import { useEffect } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo } from 'react';
import { Modal } from 'react-native';

export  const Map = ({isModalVisible,setIsModalVisible}) => {
  const [destination,setDestination] = useState({latitude: -0.18871,
    longitude: -78.36009,})
    const [origin,setOrigin] = useState({latitude: -0.17871,
      longitude: -77.36009,})

    const getLocationPermission = async() => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        alert("No se ha podido recopilar los datos de tu ubicacion")
        return;
      }
      let location = await Location.getCurrentPositionAsync({})
      const current = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      setOrigin(current)
    }

    const changeModalVisible = (bool) => {
      setIsModalVisible(bool)
  }

    useEffect(() => {
      getLocationPermission()
    },[])

    const snapPoints = useMemo( () => ['30%','80%'],[])
  return (
    
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          changeModalVisible(false)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => {changeModalVisible(!isModalVisible)}} style={{bottom:"3%",}}>
              <Text style={{fontFamily:'Poppins_600SemiBold',}}>Ocultar</Text>
            </TouchableOpacity>
            <View style={styles.mapView}>
            <MapView 
              style={styles.map}
              initialRegion={{
                latitude:origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
              }}
              //customMapStyle={{borderRadius:15}}
              mapType="mutedStandard"
              >
                <Marker coordinate={destination}/>
                <Marker draggable coordinate={origin} onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)} title={"You are here"}/>
                <Polyline coordinates={[origin,destination]} strokeWidth={2}/>
                {/*<MapViewDirections origin={origin} destination={destination} apikey={GOOGLE_MAPS_KEY}/>*/}
              </MapView>
              </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapView:{ 
    alignSelf: 'center', 
    //top: 30, 
    width: Dimensions.get('window').width - 20, 
    height: Dimensions.get('window').height - 450,
    borderRadius: 10, 
    overflow: 'hidden' },
  map: {
    width: Dimensions.get('window').width ,
    height: Dimensions.get('window').height ,
    borderRadius:15,
  },
  centeredView: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width:Dimensions.get("window").width,
    //height:500,
    top:"42%",
    //backgroundColor:'red'
    //marginTop: 22,
    //top:400,
  },
  modalView: {
    width:Dimensions.get("window").width,
    height:500,
    bottom:0,
    backgroundColor: "rgb(255, 250, 250)",
    borderRadius: 15,
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

export default Map;