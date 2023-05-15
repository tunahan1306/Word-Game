import { StyleSheet, Text, ScrollView , SafeAreaView , View , TouchableOpacity} from 'react-native'
import React from 'react'
import { DataContext } from '../App'
import { ListItem , Avatar } from '@rneui/themed'

const PuanPages = () => {

    const veri = React.useContext(DataContext)

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView >
                <Text style={styles.subHeader}>Puan Tablosu</Text>
                {
                    veri.scorelist.length == 0 ? <View style={{ flex:1, justifyContent:'center' , alignItems:'center'}}>
                      <Text style={{textAlign:'center' , color:'#D3D3D3' }}>Tablo Boş</Text>  
                    </View> : veri.scorelist.map(function(l, i){
                        let tarih = new Date(l.date).toLocaleString("tr-TR")
                        return <TouchableOpacity key={i} style={{flex:1 , borderColor:'transparent' , borderWidth:1 , marginVertical:5}}>
                            <View>
                                <Text style={{color:'#fff' , textAlign:'center' , fontSize:18 , marginBottom:5}}>Puan = <Text style={{fontWeight:'bold'}}>{l.score}</Text> </Text>
                                <View
                                    style={{
                                        borderBottomColor: '#fff',
                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                        marginBottom:5
                                    }}
                                    />
                                <Text style={{color:'#D3D3D3' , fontSize:12 , marginBottom:5}}>En Değerli Kelime = <Text style={{fontWeight:'bold' , color:'#fff'}}>{l.metin}</Text></Text>
                                <Text style={{color:'#D3D3D3' , fontSize:12 , marginBottom:5}}>Tarih = <Text style={{fontWeight:'bold', color:'#fff'}}>{tarih}</Text></Text>
                            </View>
                        </TouchableOpacity>
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default PuanPages

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#282828',
      },
      wrapper: {
        marginVertical:5,
        
      },
      subHeader: {
        backgroundColor : "#7bb9b4",
        color : "#000",
        textAlign : "center",
        paddingVertical : 5,
        fontSize:20
      },
})