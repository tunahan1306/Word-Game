import React, { useState } from 'react';
import { Button , Dialog , Text } from "@rneui/base";
import { StyleSheet , SafeAreaView , View} from 'react-native';
import * as Animatable from 'react-native-animatable';

//Icons
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons'

// Components
import GameStartButton from '../components/GameStartButton';
import GameStartText from '../components/GameStartText';


const HomePages = ({navigation}) => {

  const [dialogvisible , setDialogvisible] = useState(false)
    
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <GameStartText kelime={"Kelime Oyunu"}/>
          <GameStartButton navigation={navigation}  baslik={"Oyuna Başla"}/>
          <Button
              title="Puanları Görüntüle"
              icon={{
                name: 'bar-chart',
                type: 'font-awesome',
                size: 15,
                color: '#000',
              }}
              iconContainerStyle={{ marginRight: 10 }}
              titleStyle={{ fontWeight: '700' , color:'#000'}}
              buttonStyle={{
                backgroundColor: '#7bb9b4',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}

              onPress={() => {navigation.navigate('Puan')}}
            />
        </View>
      </SafeAreaView>
    </>
  )
}

export default HomePages

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#282828'
      },
      wrapper: {
        flex:1,
        justifyContent:'center',
        marginVertical:5,
        padding:5,
      },
})