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
}) {
  const onStartCopyShare = copy => {
    setToggleShare(true);
    setShareCopy(copy);
  };
  return (
    <View style={styles.mushafs} accessibilityRole="button">
      {showDelete ? (
        <>
          <Text
            style={{
              position: 'absolute',
              color: '#c2b280',
              zIndex: 88,
              marginLeft: 40,
              marginTop: 0,
            }}
            onPress={() => onStartCopyShare(mushaf)}>
            Share Copy
          </Text>
          <Text
            style={{
              position: 'absolute',
              color: '#c2b280',
              zIndex: 88,
              marginLeft: 40,
              marginTop: 14,
            }}
            onPress={toggleTargets}>
            Set targets
          </Text>
        </>
      ) : null}
      <TouchableOpacity
        onPress={() => onEnterCopy(mushaf.id)}
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
});
