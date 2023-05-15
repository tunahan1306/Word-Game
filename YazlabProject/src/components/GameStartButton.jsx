import { StyleSheet, Text, TouchableOpacity} from 'react-native'
import React , {useState} from 'react'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity);

const GameStartButton = ({navigation , baslik}) => {

    //console.log(baslik);
    
    const [animation, setAnimation] = useState('pulse');

    const handleAnimation = () => {
        setAnimation('wobble');
        setTimeout(() => {
        setAnimation('pulse');
       navigation.navigate("Game")
       //console.log(navigation);
        }, 500);
    };
  return (
    <AnimatedButton
      style={{
        backgroundColor: '#d06a66',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems:'center',
        marginTop:30,
        marginHorizontal:30
      }}
      animation={animation}
      duration={1000}
      onPress={handleAnimation}
    >
      <Icon name="rocket" size={30} color="#000" style={{marginBottom:12}}/>
      <Text style={{ color: '#000' , fontSize:15 , textAlign: 'center'}}>{baslik.toString()}</Text>
    </AnimatedButton>
  )
}

export default GameStartButton

const styles = StyleSheet.create({})