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

function Profiles({data, setRoom, openMessage, setLastProfile}) {
  const startChat = (id, name) => {
    setLastProfile({id: id, name: name});
    openMessage();
  };
  return (
    <View key={data.profileid}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text>{data.name}</Text>
        <Text
          style={{fontSize: 10}}
          onPress={() => startChat(data.profileid, data.name)}>
          💬
        </Text>
      </View>
      {data.status === 'online' || data.status === 'praying' ? (
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
