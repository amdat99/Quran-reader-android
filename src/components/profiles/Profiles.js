import React from 'react';

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

function Profiles({data, setRoom, openMessage, setLastProfile,currentUser}) {
  


  const startChat = (id, name) => {
    setLastProfile({id: id, name: name});
    openMessage();
  };
  return (
    <View key={data.profileid}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text>{data.name}</Text>
        { currentUser && data.status !== 'offline' ?
        <Text
          style={{fontSize: 15}}
          onPress={() => startChat(data.profileid, data.name)}>
          💬
        </Text>
:   null}
      </View>
      {data.status === 'online' || data.status === 'praying' || data.status === 'sharing copy'? (
        <>
          <Text style={{fontSize: 10, color: 'green'}}>{data.status}</Text>
        </>
      ) : (
        <Text style={{fontSize: 10, color: 'red'}}>{data.status}</Text>
      )}
    </View>
  );
}

export default Profiles;
