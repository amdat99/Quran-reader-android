import React ,{useState,useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Alert,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Dimensions,

  } from 'react-native';



  import {sendMessage} from '../../sockets/sockets'

  function MessageBox({initiateSocket,messages,currentUser,setShowMessage, setMessage,setLastMessage, setName, lastProfile, setRoom,disconnectSocket}) {

    const [onName,setOnName] = useState('')
    const [onMessage,setOnMessage]= useState('')

    useEffect(() =>{
        if(currentUser){
            setOnName(currentUser.name)
        }

    },[currentUser])



    const onSendMessage = async () =>{
        if(!onMessage || !onName){
            return
        }
      await   sendMessage(onName,onMessage,lastProfile)
       await  sendMessage(onName,onMessage,currentUser.profileid)
        await  initiateSocket(currentUser.profileid)
    }

    const endChat = () =>{
        setShowMessage(false)
        setRoom(currentUser.profileid)
        setMessage(null)
        setLastMessage(null)
        setName(null)
    }

    console.log(messages)

    return (
        <View style={styles.container}  >
            <Text onPress={() => setShowMessage(false)}>x</Text>
           <ScrollView>
            { messages?
            messages.map((message,i) => 
            
            <Text key={i}>{message.name}: {message.message} </Text>       
           
            ): null}
      </ScrollView>
            <TextInput placeholder="type message" onChangeText ={setOnMessage} />
            <Text style={{color:'#c2b280'}} onPress={onSendMessage}>send</Text>

            <Text style={{color:'#c2b280'}}onPress={endChat}>end chat</Text>
          
        </View>
    );
}

export default MessageBox;

const styles = StyleSheet.create({
 
    container:{
      color: 'black',
      fontSize: 10,
      position: 'absolute',
      bottom: Dimensions.get('window').height/9,
      width:Dimensions.get('window').width/1.7,
      padding: 6,
      marginLeft: Dimensions.get('window').width/12,
      borderColor:'#e8d087',
      borderWidth: 1,
      backgroundColor: 'white',
      shadowColor: 'black',

      zIndex: 999,
      borderRadius:10,
      maxHeight:Dimensions.get('window').height/2.7,
} })