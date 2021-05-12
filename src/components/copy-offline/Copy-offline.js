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
    Button,
    Dimensions
  } from 'react-native';

  function CopyOffline({showDelete, onEnterCopy, setShowDelete, deleteM,mushaf}) {
    return (
            
              <View style={styles.mushafs} accessibilityRole="button" >
            { showDelete?
                  <Text
                    style={{position: 'absolute',color: 'red',zIndex:88,marginLeft:50,}}
                    onPress={() => deleteM(mushaf)}>
                    delete
                  </Text>
                  :null}
                <TouchableOpacity
                  onPress={() => 
                    onEnterCopy(mushaf.id)
                    }
                  onLongPress={() => {setShowDelete(!showDelete)}}
                  delayLongPress={500}
                  >
               
                  <Text style={{marginLeft: 30, position: 'relative', top: 30}}>
                    {mushaf.title}
                  </Text>
                  <Image    source={{uri:`asset:/cover${mushaf.cover}.png`}} style={styles.image} />
                  <Text
                    style={{
                      marginLeft: 28,
                      height: 3,
                      backgroundColor: '#a27a55',
                      width: 90
                    }}></Text>
                </TouchableOpacity>
              </View>
    );
}

export default CopyOffline;

const styles = StyleSheet.create({
    image: {
      width: 85,
      height: 110,
      marginTop: 30,
      marginLeft: 30,
    }
  });
  