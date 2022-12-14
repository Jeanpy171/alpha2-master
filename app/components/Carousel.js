import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'
import { FlatList } from 'react-native'
import { Animated } from 'react-native'
import { Button, Icon } from '@rneui/base'
import { TouchableOpacity } from 'react-native'



const { width,height} = Dimensions.get("window")
const CarouselItem = ({item,ref}) => {
  return (
    <View style={styles.cardView}>
      
      <Image style={styles.image} source={{uri:item.image}}/>
      <View style={{zIndex:1,position:'absolute',flexDirection:'row', width:"95%" ,justifyContent:"space-between",marginTop:120}}> 
        <TouchableOpacity onPress={() =>ref+1}>
          <Icon name='left' type='ant-design' size={25} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name='right' type='ant-design' size={25} color={"white"} />
        </TouchableOpacity>
      </View>
        <View style={styles.textView}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          <Button title={"Saber mas"} buttonStyle={{width:100}}/>
        </View>
    </View>
  )
}

const Carousel = ({data}) => {

  let scrollX = new Animated.Value(0)
  let position = Animated.divide(scrollX,width)

  const [dataList,setDataList] = useState(data)

  useEffect(() => {
    setDataList(data)
    //infiniteScroll(dataList)
  },[])

  const flatListRef = useRef(null)
  const infiniteScroll = (dataList) => {
    let index=0;
    const totalIndex = dataList.length - 1;
  
    setInterval(() => {
      index++;
        if(index < totalIndex) {
            flatListRef.current.scrollToIndex({animated: true, index: index})
        } else {
            flatListRef.current.scrollToIndex({animated: true, index: 0})
        }
      },3000)
    }
  if(data&&data.length){
    return (
      <View>
        <FlatList data={data}
          keyExtractor = {(item,index) => index}
          //ref = {flatListRef}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment='center'
          scrollEventThrottle={16}
          decelerationRate = {"fast"}
          showsHorizontalScrollIndicator={false}
          renderItem = {({item,index}) => {
            return <CarouselItem item={item} ref={flatListRef.current}/>
            }
          }
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset :{ x: scrollX}}}, ]
          )}
        />

        <View style={styles.dotView}>
          {data.map((_,i) =>{
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp"
            })
            return (
            <Animated.View
              key = {i}
              style = {{opacity, height:10,width:10, margin:8, borderRadius:5,backgroundColor:"#595959"}}
            />)
          })}
        </View>
      </View>
    )
  }
}

export default Carousel

const styles = StyleSheet.create({
  cardView:{
    flex:1,
    width:width,
    height:height/3,
    backgroundColor:"white",
    marginTop:10,
    alignItems:'center',
      shadowColor: "#000",
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        zIndex:0
  },
  textView:{
    position:"absolute",
    bottom:30,
    //margin:20,
    marginLeft:30,
    left:5
  },
  image:{
    width:width,    
    height:height/3,
    zIndex:0
  },
  itemTitle:{
    color:"white",
    fontSize:22,
    shadowColor: "#000",
    shadowOffset: {
        width: 0.8,
        height: 0.8,
      },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  itemDescription:{
    color:"white",
    fontSize:12,
    shadowColor: "#000",
    shadowOffset: {
        width: 0.8,
        height: 0.8,
      },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  dotView:{
    bottom:30,
    flexDirection:'row',
    //backgroundColor:'red',
    justifyContent:'center'
  }
})