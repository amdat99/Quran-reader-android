import React from 'react';
import {Platform} from 'react-native';
const isAndroid = Platform.OS === 'android';

import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import SignOn from './src/pages/signon/signon-page';
import Library from './src/pages/library/Library';
import Mushaf from './src/pages/mushaf/Mushaf';
import SocketOverlay from './src/pages/socket-overlay/Socket-overlay';
import AudioLink from './src/pages/socket-overlay/Audiolink';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SocketOverlay />
        {/* <AudioLink /> */}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerStyle: {
                  height: 40,
                },
              }}
              name="library"
              component={Library}
            />
            <Stack.Screen
              name="Quran"
              component={Mushaf}
              screenOptions={{headerShown: false}}
              options={{
                headerStyle: {
                  height: 30,
                },
                headerTitleStyle: {
                  fontSize: 15,
                },
              }}
            />
            <Stack.Screen
              screenOptions={{headerShown: false}}
              name="signon"
              component={SignOn}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
