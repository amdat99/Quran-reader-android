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
  Dimensions,
} from 'react-native';

function AddCopy({
  currentUser,
  setCover,
  covers,
  setToggleOnAdd,
  addMushafData,
  toggleOnAdd,
  setTitle,
  addOnlineMushafData,
}) {
  return (
    <>
      {toggleOnAdd ? (
        <View style={styles.addMushaf} minimumValue={0} maximumValue={100}>
          <Text>Add title</Text>
          <Text onPress={() => setToggleOnAdd(false)} style={styles.closeBox}>
            close
          </Text>
          <TextInput
            style={{marginBottom: 10}}
            placeholder="Mushaf title"
            onChangeText={setTitle}
          />
          <Text style={{marginBottom: 10}}>choose cover:</Text>
          <View style={styles.coverButtons}>
            {covers.map(cover => (
              <View key={cover.id}>
                <TouchableOpacity onPress={() => setCover(cover.id)}>
                  <View>
                    <Image
                      style={{
                        marginLeft: '6%',
                        width: 40,
                        height: 50,
                        position: 'relative',
                        left: '10%',
                      }}
                      source={{uri: `asset:/cover${cover.id}.png`}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <Text style={{fontSize: 10, marginTop: 10}}>
            *A 99 names of Allah page may be shown when the main view is loading
          </Text>
          {currentUser ? (
            <>
              <Text style={{fontSize: 10, marginTop: 10}}>
                *You should stay on a page for at least 3 seconds for your
                online current page to be synced.
              </Text>
              <Text
                style={{marginRight: 10, marginTop: 20, zIndex: 999}}
                onPress={addMushafData}>
                Add offline copy
              </Text>
              <Text
                style={{marginTop: 10, zIndex: 999}}
                onPress={addOnlineMushafData}>
                Add online copy{' '}
              </Text>
            </>
          ) : (
            <Text style={{marginTop: 20, zIndex: 999}} onPress={addMushafData}>
              Add
            </Text>
          )}
        </View>
      ) : null}
    </>
  );
}

export default AddCopy;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  coverButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 25,
    fontSize: 13,
  },
  addMushaf: {
    color: 'black',
    fontSize: 22,
    position: 'absolute',
    top: 55,
    borderRadius: 26,
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width / 1.2,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'black',
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  closeBox: {
    color: 'red',
    position: 'absolute',
    right: 20,
    fontSize: 17,
  },
});
