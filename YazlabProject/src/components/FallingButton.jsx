import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//Context
import { GameContext } from '../pages/GamePages';

const FallingButton = (props) => {

    const veri = React.useContext(GameContext)

    const translateY = useRef(new Animated.Value(props.value.baslangic.y)).current;

    const tikla = () => {
      if(props.value.basilimi){
        props.value.basilimi = false

        let string = ""
        var index = veri.metin.lastIndexOf(props.value.harf)
        
        for(let i=0;i<veri.metin.length;i++){
          if(i != index){
            string += veri.metin.charAt(i)
          }
        }
        veri.setMetin(string)
      }else{
        veri.setMetin(veri.metin + props.value.harf)
        veri.setScore(veri.score + props.value.harfvalue)
        props.value.basilimi = true
      }
      
    }

    useEffect(() => {
        Animated.timing(translateY, {
          toValue: props.value.bitis.y,
          duration: 1500,
          useNativeDriver: true,
        }).start();
      }, [translateY]);

  return (
    <Animated.View>
        <TouchableOpacity onPress={tikla}  style={props.value.basilimi ? [styles.button , {borderStyle:'solid' , borderWidth:2 , borderColor:props.value.renk ,
                                                                  top:props.value.bitis.y , left:props.value.bitis.x ,width:props.value.buttonWidth , 
                                                                  height:props.value.buttonHeight , borderRadius:props.value.radius , overflow:'hidden' }] 
                                            : props.value.dusukmu ? [styles.button, { top:props.value.bitis.y ,
                                            left:props.value.baslangic.x , width:props.value.buttonWidth , 
                                            height:props.value.buttonHeight , backgroundColor:props.value.renk , borderRadius:props.value.radius , overflow:'hidden'}] : [styles.button, { transform: [{ translateY }] ,
                           left:props.value.baslangic.x , width:props.value.buttonWidth , 
                           height:props.value.buttonHeight , backgroundColor:props.value.renk , borderRadius:props.value.radius , overflow:'hidden'}]}>
                           {
                            props.value.buzlumu ?  <View style={styles.leftBorder}></View>: <View></View>
                           }
          <Text style={styles.buttonText}>{props.value.harf}</Text>
        </TouchableOpacity>
      </Animated.View>
  )
}

export default FallingButton

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        //top: 0,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 23,
    },
    leftBorder: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '50%',
      backgroundColor:'cyan',
      borderBottomEndRadius:10,
      borderBottomStartRadius:10,
    },
})