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

function TopMessages({
  setTargets,
  resetMessage,
  time,
  targets,
  pagesRead,
  minutes,
}) {
  return (
    <View>
      {time > 3 ? (
        <View style={styles.topmessage}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {time > 3 && time <= 3600 ? (
              time > 60 ? (
                <Text style={{marginLeft: 5, fontSize: 13, marginBottom: 5}}>
                  Subhanllah you prayed for {minutes}:0{seconds} minutes. keep
                  it up.{' '}
                </Text>
              ) : (
                <Text style={{marginLeft: 5, fontSize: 13, marginBottom: 5}}>
                  Alhamdulillah you were praying for {time} seconds{' '}
                </Text>
              )
            ) : null}
            {time > 3600 ? (
              <Text style={{marginLeft: 5, fontSize: 13, marginBottom: 5}}>
                Allahuakbar wow! you prayed for {minutes}:0{seconds} minutes.
                keep it up.{' '}
              </Text>
            ) : null}
            {}
            {time > 3 ? (
              <Text
                style={{marginLeft: 5}}
                onPress={() => {
                  resetMessage();
                  setTargets(null);
                }}>
                X
              </Text>
            ) : null}
          </View>

          {time > 3 ? (
            pagesRead === 4 ? (
              <Text style={{marginLeft: 5, fontSize: 13, marginBottom: 5}}>
                You Read {pagesRead - 3} page
              </Text>
            ) : (
              <Text style={{marginLeft: 5, fontSize: 13, marginBottom: 5}}>
                You Read {pagesRead - 3} pages
              </Text>
            )
          ) : null}

          {time > 3 && targets ? (
            <View>
              {pagesRead === 4 ? (
                <Text style={{marginLeft: 5, fontSize: 13, marginBottom: 5}}>
                  Your target was to spend {targets.time} minutes to pray{' '}
                  {targets.spages} page
                </Text>
              ) : (
                <Text style={{marginLeft: 5, fontSize: 13, marginBottom: 5}}>
                  Your target was to spend {targets.time} minutes to pray{' '}
                  {targets.spages} pages
                </Text>
              )}
              {pagesRead - 3 >= targets.spages && minutes >= targets.time ? (
                <Text style={{marginLeft: 5, fontSize: 13, marginBottom: 5}}>
                  You smashed your target. Allahuakbar
                </Text>
              ) : (
                <Text style={{marginLeft: 5, fontSize: 13, marginBottom: 5}}>
                  Try meeting your target next time inshallah.
                </Text>
              )}
            </View>
          ) : null}

          {time > 3 ? (
            <Text
              style={{
                height: 1,
                backgroundColor: '#e8d087',
                width: Dimensions.get('window').width / 1.5,
                marginBottom: 5,
              }}></Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

export default TopMessages;

const styles = StyleSheet.create({
  topmessage: {
    position: 'absolute',
    top: 20,
    backgroundColor: 'white',
    padding: 6,
    zIndex: 999,
    borderRadius: 25,
    borderColor: '#e8d087',
    borderWidth: 1,

    marginLeft: 6,
  },

  target: {
    color: 'black',
    fontSize: 35,
    position: 'absolute',
    top: 60,
    borderRadius: 26,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'black',
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
});
