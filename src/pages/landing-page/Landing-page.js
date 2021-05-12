import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ImageBackground,
} from 'react-native';
const isAndroid = Platform.OS === 'android';
import {createStackNavigator} from '@react-navigation/stack';

function LandingPage({navigation}) {
  const [textHover, setTextHover] = useState(false);

  var image = require('./landing.jpg');

  return (
    <>
      <SafeAreaView style={{flex: 1, marginTop: isAndroid ? 2 : 0}}>
        <View style={{backgroundColor: 'black', padding: 16}}>
          <Text>search</Text>
        </View>
        <View style={styles.container}>
          <ImageBackground
            source={image}
            style={styles.image}></ImageBackground>
          <View style={styles.align}>
            <Text
              style={textHover ? styles.textHover : styles.text}
              onPress={() => {
                setTextHover(true);
                navigation.navigate('library');
              }}>
              Enter App
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    bottom: 200,
  },
  textHover: {
    color: 'white',
    fontSize: 40,
    bottom: 200,
    opacity: 0.8,
  },
  signonText: {
    color: 'white',
    fontSize: 20,
    position: 'relative',
    bottom: 300,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  align: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
