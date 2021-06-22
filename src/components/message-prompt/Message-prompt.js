import React from 'react';

import {
    StyleSheet,
    Text,
    View,

    Dimensions,
  } from 'react-native';
function MessagePrompt({openMessage, setLastProfile, setShowMes,lastMessage}) {
    return (
    <View style ={styles.topmessage}>
        <Text onPress={()=> {setLastProfile({id:lastMessage.id, name:lastMessage.name}); openMessage();setShowMes(false)}} style={{marginLeft:10 ,fontSize:15}}> Message {lastMessage.name}</Text>
        <Text  onPress={() => setShowMes(false)} style={{marginLeft:10 ,fontSize:12, color:'red',marginTop:3}}>dismiss</Text>
   </View> 
    );
}

export default MessagePrompt;

const styles = StyleSheet.create({
topmessage:{
    position: 'absolute',
    top:20,
    backgroundColor: 'white',
    padding: 6,
    zIndex: 999,
    borderRadius:25,
    borderColor: 'white',
    borderWidth:  1,
    marginLeft:6

  }
})