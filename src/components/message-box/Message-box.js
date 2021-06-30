import React, {useState, useEffect} from 'react';
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

import {sendMessage} from '../../sockets/sockets';

function MessageBox({
  initiateSocket,
  messages,
  currentUser,
  setMessage,
  setLastMessage,
  setName,
  lastProfile,
  setRoom,
  disconnectSocket,
  closeMessage,
}) {
  const [onName, setOnName] = useState('');
  const [onMessage, setOnMessage] = useState('');

  useEffect(() => {
    if (currentUser) {
      setOnName(currentUser.name);
    }
  }, [currentUser]);

  const onSendMessage = async () => {
    if (!onMessage || !onName) {
      return;
    }
    await sendMessage(onName, onMessage, lastProfile.id, currentUser.profileid);
    await sendMessage(onName, onMessage, currentUser.profileid,currentUser.profileid);
    await initiateSocket(currentUser.profileid);
  };

  const endChat = () => {
    closeMessage();
    setRoom(currentUser.profileid);
    setMessage(null);
    setLastMessage(null);
    setName(null);
  };

  return (
    <View style={styles.container}>
      <Text  style={{color:'red',marginLeft:'80%'}}onPress={closeMessage}>close</Text>
      <ScrollView>
        {messages
          ? messages.map((message, i) => (
              <Text key={i}>
                {message.name}: {message.message}{' '}
              </Text>
            ))
          : null}
      </ScrollView>

      <TextInput
        placeholder={`message ${lastProfile.name} `}
        placeholderTextColor ='#383a3d'
        onChangeText={setOnMessage}
      />

      <Text style={styles.buttons} onPress={onSendMessage}>
        send
      </Text>

      <Text style={styles.buttons} onPress={endChat}>
        end chat
      </Text>
    </View>
  );
}

export default MessageBox;

const styles = StyleSheet.create({
  container: {
    color: 'black',
    fontSize: 10,
    position: 'absolute',
    bottom: Dimensions.get('window').height / 9,
    width: Dimensions.get('window').width / 2,
    padding: 6,
    marginLeft: Dimensions.get('window').width / 12,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
    shadowColor: 'black',

    zIndex: 999,
    borderRadius: 10,
    height: Dimensions.get('window').height / 2.5,
  },

  buttons:{
    fontSize:17,
    padding: 5, borderRadius:20,color: '#c2b280'  }
});
