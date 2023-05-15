import { StyleSheet, Text } from 'react-native'
import React , { useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { Icon } from 'react-native-vector-icons/Icon';

const AnimatedText = Animatable.createAnimatableComponent(Text);

const GameStartText = ({kelime}) => {
    //console.log(kelime);

    const [animation, setAnimation] = useState('fadeIn');

    const handleAnimation = () => {
        setAnimation('zoomInUp');
        setTimeout(() => {
          setAnimation('fadeIn');
        }, 1000);
    };

  return (
    <AnimatedText
      style={{
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'#F5F5F5',
        marginBottom:12,
      }}
      animation={animation}
      
      duration={1500}
      onPress={handleAnimation}
    >
      {kelime}
    </AnimatedText>
  )
}

export default GameStartText

const styles = StyleSheet.create({})