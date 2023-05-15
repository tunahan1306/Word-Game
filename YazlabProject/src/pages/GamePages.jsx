import { StyleSheet, Text, View , SafeAreaView , Dimensions , TouchableOpacity  } from 'react-native'
import React from 'react'
import { Dialog , Button } from '@rneui/themed'

// Context
import { DataContext } from '../App'
export const GameContext = React.createContext()

//Components
import FallingButton from '../components/FallingButton'
import GameBar from '../components/GameBar'
import BottomInputs from '../components/BottomInputs'

//Icons
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const GamePages = ({navigation}) => {

  const veri = React.useContext(DataContext)

  //Değişkenler
  const [degistiMi ,setDegistiMi] = React.useState(false)
  const [index , setIndex] = React.useState(0)
  const [dusussuresi , setDusussuresi] = React.useState(5000)
  const [endvisible , setEndvisible ] = React.useState(false)


  // Button Değişkenler
  const [windowWidth , setWindowWidth ] = React.useState(Dimensions.get('window').width);
  const [windowHeight , setWindowHeight] = React.useState(Dimensions.get('window').height);
  const [buttonWidth , setButtonWidth] = React.useState(windowWidth / 8 );
  const [buttonHeight , setButtonHeight] = React.useState((windowHeight - 310) / 10);
  const [harfler , setHarfler ] = React.useState({
    A:1,B:3,C:4,Ç:4,D:3,E:1,
    F:7,G:5,Ğ:8,H:5,I:2,İ:1,
    J:10,K:1,L:1,M:2,N:1,O:2,
    Ö:7,P:5,R:1,S:2,Ş:4,T:1,
    U:2,Ü:3,V:7,Y:3,Z:4,
  })
  const [renkler , setRenkler] = React.useState(['#7bb9b4' , '#c7bdbc' , '#d06a66' , '#d8d378' , '#6a8b80'])
  
  //Game Değişkenler
  const [totalscore, setTotalscore] = React.useState(0)
  const [score, setScore] = React.useState(0)
  const [metin , setMetin] = React.useState('')
  const [sifirlandimi , setSifirlandimi] = React.useState(false)
  const [components , setComponents] = React.useState([])
  const [gamelastindex , setGamelastindex ] = React.useState(windowHeight - buttonHeight - 185)
  const [mvstring , setMvstring] = React.useState('')
  const [mvstringvalue , setMvstringvalue] = React.useState(0)
  const [information , setInformation] = React.useState({color:'' , text:''})
  const [wrong , setWrong] = React.useState(0)
  

  React.useEffect(()=>{
    if(!degistiMi){
      var dizi = []
      for (let i = 0; i < 24; i++) {
        var randomharf = Object.keys(harfler)[Math.floor(Math.random()*29)]
        var harfvalue = harfler[randomharf]
        var renk = renkler[Math.floor(Math.random()*5)]
        var rad = Math.random()*50
        var buzlumu = false

        var deger = {
          harf:randomharf ,
          renk:renk , 
          baslangic:{
            x:(i%8)*buttonWidth,
            y:-200,
          },
          bitis:{
            x:(i%8)*buttonWidth,
            y:windowHeight - ( (Math.floor(i/8) + 1 ) * buttonHeight)  - 185,
          },
          basilimi:false,
          buttonWidth:buttonWidth ,
          buttonHeight:buttonHeight,
          harfvalue:harfvalue ,
          radius:rad,
          dusukmu:false,
          buzlumu:buzlumu,
        }
    
        var element = <FallingButton  value={deger} key={"button" + i} />
        
        setIndex(i)
        dizi.push(element)
      }
      setComponents(dizi)
      setDegistiMi(true)
    }else{
      //console.log("değişti");
    }
  },[])

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setGamelastindex(gamelastindex + 1)
      var randomharf = Object.keys(harfler)[Math.floor(Math.random()*29)]
        var harfvalue = harfler[randomharf]
        var renk = renkler[Math.floor(Math.random()*5)]
        var rad = Math.random()*100
        var xindex = Math.floor(Math.random()*8)
        var bitisx = Number(xindex * buttonWidth)
        var buzlumu = false
        var buzindex = Math.floor(Math.random()*10)

        let indexdizisi = {0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[]}

        components.map(function(item , i){
          let x = Number(Math.round(item.props.value.bitis.x / item.props.value.buttonWidth)) 
          indexdizisi[x].push({key:item.key , deger:item.props.value.bitis.y , buzlumu:item.props.value.buzlumu})
          indexdizisi[x].sort((user1, user2) => user2.deger - user1.deger)
        })

        var bitisy = windowHeight - 185 - (indexdizisi[xindex].length + 1 ) * buttonHeight
        
        if(indexdizisi[xindex].length > 0){
          console.log(indexdizisi[xindex][indexdizisi[xindex].length - 1].buzlumu);

          if(indexdizisi[xindex][indexdizisi[xindex].length - 1].buzlumu){
            buzlumu=true
          }else{
            if(buzindex == 1){
              buzlumu=true
            }
          }
        }
        
        var deger = {
          harf:randomharf ,
          renk:renk , 
          baslangic:{
            x:bitisx,
            y:50,
          },
          bitis:{
            x:bitisx,
            y:bitisy,
          },
          basilimi:false,
          buttonWidth:buttonWidth ,
          buttonHeight:buttonHeight,
          harfvalue:harfvalue ,
          radius:rad,
          dusukmu:false,
          buzlumu:buzlumu,
        }
        
        console.log(deger);
        setComponents([...components, <FallingButton  value={deger} key={"button" + gamelastindex} />]);

        if(indexdizisi[xindex].length == 9 && !endvisible){
          veri.addScore({score:totalscore , date:Date() , metin:mvstring , value:mvstringvalue })
          setEndvisible(true)
        }

    }, dusussuresi);

    return () => clearInterval(intervalId);
  }, [components]);


  React.useEffect(() => {
    if(totalscore < 100){
      setDusussuresi(5000)
    }else if(100 <= totalscore < 200){
      setDusussuresi(4000)
    }else if(200 <= totalscore < 300){
      setDusussuresi(3000)
    }else if(300 <= totalscore < 400){
      setDusussuresi(2000)
    }else{
      setDusussuresi(1000)
    }
  },[])
  
  return (
    <GameContext.Provider value={{
                                  totalscore:totalscore , 
                                  score:score , 
                                  metin:metin ,
                                  components:components,
                                  sifirlandimi:sifirlandimi,
                                  gamelastindex:gamelastindex,
                                  windowWidth:windowWidth,
                                  windowHeight:windowHeight,
                                  mvstring:mvstring,
                                  mvstringvalue:mvstringvalue,
                                  information:information,
                                  wrong:wrong,
                                  harfler:harfler,
                                  renkler:renkler,
                                  buttonHeight:buttonHeight,
                                  buttonWidth:buttonWidth,
                                  index:index,
                                  endvisible:endvisible,
                                  setIndex:setIndex,
                                  setMetin:setMetin,
                                  setScore:setScore,
                                  setTotalscore:setTotalscore,
                                  setComponents:setComponents,
                                  setSifirlandimi:setSifirlandimi,
                                  setGamelastindex:setGamelastindex,
                                  setMvstring:setMvstring,
                                  setMvstringvalue:setMvstringvalue,
                                  setInformation:setInformation,
                                  setWrong:setWrong,
                                  setEndvisible:setEndvisible,
                                 }}>
      <SafeAreaView style={styles.container}>
        {
          veri.error ? <View style={[styles.wrapper, {justifyContent:'center' , alignItems: 'center'}]}>
            <Text style={{textAlign:'center' , color:'white'}}>KELİME HAVUZU OLUŞTURULURKEN HATA OLUŞTU ! </Text>
            <Text style={{textAlign:'center' , color:'white'}}>LÜTFEN İNTERNET BAĞLANTINIZI KONTROL EDİP BİR DAHA DENEYİNİZ . </Text>
          </View> : 
          <>
          <GameBar />
          <View style={styles.wrapper}>
            {
              components
            }
          </View>
          <BottomInputs />

          <Dialog
            isVisible={endvisible}
          >
            <Text style={{textAlign:'center' , fontSize:30 , fontWeight:'bold' , color:'#000' , marginBottom:10}}>OYUN BİTTİ</Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <View style={{display:'flex' , flexDirection:'row' , justifyContent:'center' , alignItems:'center' , marginTop:10}}>
              <Text style={{fontSize:20 }}>Aldığın Puan :  </Text>
              <Text style={{fontSize:20 , fontWeight:'bold' , color:'#000'}}>{' ' + totalscore}</Text>
            </View>
            <View style={{display:'flex' , flexDirection:'row' , justifyContent:'center' , alignItems:'center' , marginTop:10}}>
              <Text style={{fontSize:20 }}>En Değerli Kelime :  </Text>
              <Text style={{fontSize:20 , fontWeight:'bold' , color:'#000'}}>{' ' + mvstring}</Text>
            </View>
            
            <Button radius={'sm'} type="solid" buttonStyle={{backgroundColor:'#7bb9b4', marginTop:10}} onPress={() => {setEndvisible(false);navigation.navigate('Home');}}>
              <MaterialIcon name="home" color="white" size={25} style={{textAlign:'center'}}/>
              Ana Sayfaya Dön
            </Button>
            
          </Dialog>
          </>
        }
      </SafeAreaView>
    </GameContext.Provider>
    
  )
}

export default GamePages

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#282828',
  },
  wrapper: {
    marginVertical:5,
    padding:5,
  },
})