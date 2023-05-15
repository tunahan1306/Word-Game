import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

//Icons
import AntDesign from 'react-native-vector-icons/AntDesign';

//Context
import { GameContext } from '../pages/GamePages';


const GameBar = () => {

  const veri = React.useContext(GameContext)

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}><AntDesign name="close" style={{color:'#212121'}}  size={40} /></Text>
        <View style={styles.scoreview}>
            <Text style={styles.scoretext}>{veri.totalscore}</Text>
        </View>
        <Text style={styles.text}><AntDesign name="close" style={{color:'#212121'}}  size={40} /></Text>
      </View>
    </View>
  )
}

export default GameBar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        paddingBottom:10,
        backgroundColor:"#3a3a3a",
        position: 'absolute',
        top:0,
        left:0,
        width:'100%',
        alignItems:'center',
        zIndex:1000,
    },
    wrapper: {
        display:"flex",
        flexDirection:"row",
    },
    text :{
        color:'#212121',
        fontSize:40,
        alignSelf:'center',
        margin:5,
    },
    scoreview : {
        backgroundColor:"#212121",
        width:100,
        height:100,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
    },
    scoretext :{
        fontSize:35,
        color:'#7f7f7f'
    }
   
})