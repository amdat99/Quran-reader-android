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

function CopyOffline({
  showDelete,
  onEnterCopy,
  setShowDelete,
  deleteM,
  mushaf,
  toggleTargets,
  setShareCopy,
  setToggleShare,
  toggleCopiesType
}) {
  const onStartCopyShare = copy => {
    setToggleShare(true);
    setShareCopy(copy);
  };
  return (
    <View style={styles.mushafs} accessibilityRole="button">
      {showDelete ? (
        <>
        {toggleCopiesType?
          <Text
            style={{
              position: 'absolute',
              color: '#c2b280',
              zIndex: 88,
              marginLeft: 40,
              marginTop: -10,
              backgroundColor:'white',
              borderRadius:20,
              padding: 2
            }}
            onPress={() => onStartCopyShare(mushaf)}>
            Share Copy
          </Text>
  :null}
          <Text
            style={{
              position: 'absolute',
              color: '#c2b280',
              zIndex: 88,
              marginLeft: 40,
              marginTop: 14,
              backgroundColor:'white',
              borderRadius:20,
              padding: 2
            }}
            onPress={toggleTargets}>
            Set targets
          </Text>
        </>
      ) : null}
      <TouchableOpacity
        onPress={() => onEnterCopy(mushaf)}
        onLongPress={() => {
          setShowDelete(!showDelete);
        }}
        delayLongPress={500}>
        <Text style={{marginLeft: 30, position: 'relative', top: 30}}>
          {mushaf.title}
        </Text>
        <Image
          source={{uri: `asset:/cover${mushaf.cover}.png`}}
          style={styles.image}
        />
        <Text
          style={{
            marginLeft: 28,
            height: 3,
            backgroundColor: '#a27a55',
            width: 90,
          }}></Text>
      </TouchableOpacity>
      {showDelete ? (
        <Text
          style={{marginLeft: 50, color: 'red', zIndex: 88}}
          onPress={() => deleteM(mushaf)}>
          Delete
        </Text>
      ) : null}
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
  },
  options: {
    backgroundColor: 'white',
    borderRadius:20,
    padding: 2
  }
});
