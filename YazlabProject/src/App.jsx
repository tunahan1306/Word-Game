import React , { useState , useEffect , createContext} from "react";
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Pages
import HomePages from "./pages/HomePages";
import GamePages from "./pages/GamePages";
import PuanPages from "./pages/PuanPages";

// Github
const API_KEY = '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';
const URL = 'https://api.github.com/repos/tunahan1306/Turkce-Kelimeler/contents/turkce_kelime_listesi.txt';

//Navigation
const Stack = createStackNavigator();

//Context
export const DataContext = createContext();

const App = () => {

  const [kelimedizisi , setKelimedizisi] = useState([])

  const [scorelist , setScorelist] = useState([])

  const [error , setError] = useState(false)

  const fetchFileData = async () => {

    if(kelimedizisi.length>0){
      console.log("dizi dolu");
    }else{
      try {
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: 'application/vnd.github.v3.raw',
          },
        });
        const fileData = response.data;
        const dizi = fileData.split(/\r?\n/)

        const temizdizi = []

        dizi.map(function(item,i){
          item.trim();
          if(item.length >= 3 && !item.includes(" ")){
            temizdizi.push(item.toLocaleLowerCase())
          }
        })
        setKelimedizisi(temizdizi)
        console.log("Kelime Havuzunun Büyüklüğü : " + temizdizi.length);
      } catch (error) {
        console.error(error);
        setError(true)
      }
    }
  
};

const updateScore = (newScore) => {
  AsyncStorage.setItem('scorelist', JSON.stringify(newScore));
  setScorelist(newScore);
};

const addScore = (newScore) => {
  const newScores = [...scorelist, newScore];
  newScores.sort((score1 , score2) => score2.score - score1.score)
  setScorelist(newScores);
};
  useEffect(() => {
    fetchFileData();
  })

  

  return (
    <DataContext.Provider value={{kelimedizisi : kelimedizisi , 
                                  error : error , 
                                  scorelist:scorelist , 
                                  updateScore:updateScore,
                                  addScore:addScore
                                }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomePages} options={{ headerShown:false }}/>
            <Stack.Screen name="Game" component={GamePages} options={{ headerShown:false }} />
            <Stack.Screen name="Puan" component={PuanPages} options={{ headerShown:false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </DataContext.Provider>
  )
}

export default App

