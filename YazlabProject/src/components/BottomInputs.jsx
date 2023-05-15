import { StyleSheet, View , TextInput , Dimensions , Text} from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed'

//Icons
import AntDesign from 'react-native-vector-icons/AntDesign';

//Context
import { DataContext } from '../App';
import { GameContext } from '../pages/GamePages';

//Components
import FallingButton from './FallingButton';

const BottomInputs = () => {

  const veri = React.useContext(GameContext)

  const dataveri = React.useContext(DataContext)

  const closeClick = () => {

    const updatedComponents = [] 

    veri.components.map(function(item , i){

      var deger = {
        harf:item.props.value.harf ,
        renk:item.props.value.renk , 
        baslangic:item.props.value.baslangic,
        bitis:item.props.value.bitis,
        basilimi:false,
        buttonWidth:item.props.value.buttonWidth ,
        buttonHeight:item.props.value.buttonHeight,
        harfvalue:item.props.value.harfvalue ,
        radius:item.props.value.radius,
        dusukmu:true,
        buzlumu:item.props.value.buzlumu,
      }
  
      var element = <FallingButton  value={deger} key={item.key} />

      updatedComponents.push(element)
      
    })

    
    veri.setComponents(updatedComponents)
    veri.setSifirlandimi(true)
    veri.setMetin('')
    veri.setScore(0)
  }

  const checkClick = () => {
   
    if(veri.metin.length<3){

      veri.setInformation({text:'MİNİMUM 3 HARF' , color:'#e64a59'})

      setTimeout(() => {
        veri.setInformation({text:'' , color:'transparent'})
      }, 2000);
      return false
    }
    const foundString = dataveri.kelimedizisi.find(string => {
      if(veri.metin.toLocaleLowerCase() == string){
        return true;
      }
      return false;
    });

    if(foundString){
      const updatedComponents = [] 

      let indexdizisi = {0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[]}

      veri.components.map(function(item , i){

        if(!item.props.value.basilimi || item.props.value.buzlumu){
          
          let x = Number(Math.round(item.props.value.bitis.x / item.props.value.buttonWidth)) 

          let buzlu = item.props.value.buzlumu

          if(item.props.value.basilimi){
            buzlu = false
          }
          
          indexdizisi[x].push({key:item.key , deger:item.props.value.bitis.y})
          
          indexdizisi[x].sort((user1, user2) => user2.deger - user1.deger)

          var bs = {x:0 , y:0}

          var bulundumu = false

          for(let j=0;j<indexdizisi[x].length;j++){
            if(indexdizisi[x][j]['key'] == item.key){
              bs = {x:item.props.value.bitis.x , y:veri.windowHeight - 185 - (j + 1 )*item.props.value.buttonHeight}
              bulundumu = true
            }
          }

          var deger = {}
          if(bulundumu){
            deger = {
              harf:item.props.value.harf,
              renk:item.props.value.renk, 
              baslangic:bs,
              bitis:bs,
              basilimi:false,
              buttonWidth:item.props.value.buttonWidth,
              buttonHeight:item.props.value.buttonHeight,
              harfvalue:item.props.value.harfvalue,
              radius:item.props.value.radius,
              dusukmu:true,
              buzlumu:buzlu,
            }

            var element = <FallingButton  value={deger} key={item.key} />
            updatedComponents.push(element)
            //console.log("Bitiş = " + element.props.value.bitis.y + "\nBaşlangıç = " + element.props.value.baslangic.y);
          }
          
          
        }

        
      })

      veri.setInformation({text:'DOĞRU' , color:'#0cb28a'})

      setTimeout(() => {
        veri.setInformation({text:'' , color:'transparent'})
      }, 2000);

      if( veri.score >= veri.mvstringvalue){
       // console.log(veri.metin + " " + veri.score);
        veri.setMvstring(veri.metin)
        veri.setMvstringvalue(veri.score)
      }

      veri.setWrong(0)
      veri.setComponents(updatedComponents)
      veri.setMetin('')
      veri.setScore(0)
      veri.setTotalscore(veri.totalscore + veri.score)
    }else{
      var yanlis = veri.wrong + 1

      if(yanlis == 3){
        veri.setInformation({text:'3 DEFA YANLIŞ' , color:'#e64a59'})
        veri.setWrong(0)

        let indexdizisi = {0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[]}

        veri.components.map(function(item , i){
          let x = Number(Math.round(item.props.value.bitis.x / item.props.value.buttonWidth)) 
          indexdizisi[x].push({key:item.key , deger:item.props.value.bitis.y, buzlumu:item.props.value.buzlumu})
          indexdizisi[x].sort((user1, user2) => user2.deger - user1.deger)
        })

        const elements = {0:{key:'' , value:{} , buzlumu:false},1:{key:'' , value:{}, buzlumu:false},2:{key:'' , value:{}, buzlumu:false},
                          3:{key:'' , value:{}, buzlumu:false},4:{key:'' , value:{}, buzlumu:false},5:{key:'' , value:{}, buzlumu:false},
                          6:{key:'' , value:{}, buzlumu:false},7:{key:'' , value:{}, buzlumu:false}}
        
        for(let i=0;i<8;i++){

          var bitisy = veri.windowHeight - 185 - (indexdizisi[i].length + 1 ) * veri.buttonHeight

          sonindex = veri.gamelastindex + 1
          var randomharf = Object.keys(veri.harfler)[Math.floor(Math.random()*29)]
          var harfvalue = veri.harfler[randomharf]
          var renk = veri.renkler[Math.floor(Math.random()*5)]
          var rad = Math.random()*100
          var bitisx = Number(i * veri.buttonWidth)
          var buzlu = false;

          if(indexdizisi[i].length > 0){
            if(indexdizisi[i][indexdizisi[i].length - 1].buzlumu){
              buzlu = indexdizisi[i][indexdizisi[i].length - 1].buzlumu;
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
            buttonWidth:veri.buttonWidth ,
            buttonHeight:veri.buttonHeight,
            harfvalue:harfvalue ,
            radius:rad,
            dusukmu:false,
            buzlumu:buzlu,
          }
       
          elements[i] = {key:"button" + (veri.index + 1 + i),value:deger}

          if(indexdizisi[i].length == 9 && !veri.endvisible){
            dataveri.addScore({score:veri.totalscore , date:Date() , metin:veri.mvstring , value:veri.mvstringvalue })
            veri.setEndvisible(true)
          }
        }

        veri.setIndex(veri.index + 9)
        veri.setComponents([...veri.components,
                            <FallingButton key={elements['0'].key} value={elements['0'].value}/>,
                            <FallingButton key={elements['1'].key} value={elements['1'].value}/>,
                            <FallingButton key={elements['2'].key} value={elements['2'].value}/>,
                            <FallingButton key={elements['3'].key} value={elements['3'].value}/>,
                            <FallingButton key={elements['4'].key} value={elements['4'].value}/>,
                            <FallingButton key={elements['5'].key} value={elements['5'].value}/>,
                            <FallingButton key={elements['6'].key} value={elements['6'].value}/>,
                            <FallingButton key={elements['7'].key} value={elements['7'].value}/>,
                          ]);

                            
      }else{
        veri.setInformation({text:'YANLIŞ' , color:'#e64a59'})
        veri.setWrong(yanlis)
      }

      setTimeout(() => {
        veri.setInformation({text:'' , color:'transparent'})
      }, 2000);
    }
    
  }

  return (
    <View style={styles.container}>
        <View style={styles.wrapper}>
            <Button
              title={<AntDesign name="close" style={{color:'white'}}  size={30} />}
              buttonStyle={styles.leftbutton}
              onPress={closeClick}
            />
            <TextInput editable={false} selectTextOnFocus={false} style={styles.TextinputStyle} value={veri.metin} />
            <Button title={<AntDesign name="check" style={{color:'white'}}  size={30} />} buttonStyle={styles.rightbutton}
              onPress={checkClick}
            />
        </View>
      <View style={styles.bottomstyle}>

        <AntDesign name="pausecircleo" style={{color:'#212121'}}  size={13} />
        <AntDesign name="pausecircleo" style={{color:'#212121'}}  size={13} />
        <AntDesign name="pausecircleo" style={{color:'#212121'}}  size={13} />
        <AntDesign name="pausecircleo" style={{color:'#212121'}}  size={13} />
        <AntDesign name="pausecircleo" style={{color:'#212121'}}  size={13} />
        <AntDesign name="pausecircleo" style={{color:'#212121'}}  size={13} />
      </View>

      <View style={styles.informationstyle}>
        <Text style={{fontSize:20 , color:veri.information.color ? veri.information.color: 'transparent', textAlign:'center'}}>{veri.information.text}</Text>
      </View>
    </View>
  )
}

export default BottomInputs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#3a3a3a",
        position: 'absolute',
        bottom:0,
        left:0,
        width:'100%',
        alignItems:'center',
        zIndex:1000,
    },
    wrapper : {
        display:"flex",
        flexDirection:'row',
        backgroundColor:'#2d2d2d'
    },
    TextinputStyle : {
        width: Dimensions.get('window').width - 100,
        padding: 10,
        borderRadius: 5,
        fontSize:20,
        color:'#7f7f7f',
    },
    leftbutton : {
        borderRadius: 15,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius:0,
        backgroundColor:'#e64a59',
        padding:15
    },
    rightbutton : {
        borderRadius: 15,
        borderTopRightRadius: 0,
        borderBottomRightRadius:0,
        backgroundColor:'#0cb28a',
        padding:15,
    },
    bottomstyle :{
        display:'flex',
        flexDirection:'row',
        gap:50,
        alignItems:'center',
        paddingTop:10,
        //paddingBottom:100
    },
    informationstyle: {
      marginVertical:10,
      backgroundColor:'#2d2d2d',
      padding:10,
      width:200,
    }
})