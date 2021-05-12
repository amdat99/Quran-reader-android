import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyBOK91P8YSMHt26yGQZeCv0KcRC09sP52A',
  authDomain: 'quran-5b0fa.firebaseapp.com',
  projectId: 'quran-5b0fa',
  storageBucket: 'quran-5b0fa.appspot.com',
  messagingSenderId: '297331976936',
  appId: '1:297331976936:web:41dc24daa3a0390428775d',
};

//user functions:
export const createUserProfileDoc = async (userData, additionalData) => {
  // handles google and emailsignin
  if (!userData) return;
  const profileId = Math.random() + Math.random();
  const profileRef = firestore.doc(`profile/${profileId}`);
  const userRef = firestore.doc(`users/${userData.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    // createes new user info
    const {displayName, email, senderName, message} = userData;
    const createdAt = new Date();

    const status = '';
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        profileId,
        status,
        ...additionalData,
      });

      await profileRef.set({
        displayName,
        createdAt,
        profileId,
        status,
        ...additionalData,
      });
    } catch (error) {
      console.error('error creating new user', error.message);
    }
  }
  return userRef;
};

export const updateDisplayName = async (profileId, name) => {
  if (!profileId) return;
  firestore
    .collection('profile')
    .where('profileId', '==', profileId)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({displayName: name});
      });
    });
};

export const updateDisplayNameforUsers = async (userId, name) => {
  firestore.collection('users').doc(userId).update({displayName: name});
};

export const updateStatus = async (profileId, status) => {
  await firestore
    .collection('profile')
    .where('profileId', '==', profileId)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({status: status});
      });
    });
};

export const getProfileDoc = async profileId => {
  const collectionRef = firestore.collection('profile');
  // get user collection data
  const collectionSnapShot = await collectionRef.get(); //
  return collectionSnapShot.docs.map(doc => {
    return {
      profileId: doc.data().profileId,
      displayName: doc.data().displayName,
      status: doc.data().status,
    };
  });
};

export const getProfileName = async profileId => {
  const collectionRef = firestore
    .collection('profile')

    .where('profileId', '==', profileId);
  // get user collection data
  const collectionSnapShot = await collectionRef.get(); //
  return collectionSnapShot.docs.map(doc => {
    return doc.data().displayName;
  });
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    // cheks to see if user is signedin
    const unsubscribe = auth.onAuthStateChanged(userData => {
      //if sign in state changes
      unsubscribe(); //unsubscribe/closes session
      resolve(userData);
    }, reject);
  });
};

//profile picture functions:
// export const uploadImageToStorage = (profileimage, profileId) => {
//   if (!profileimage || !profileId) return;

//   const imageRef = firebase.storage().ref().child(`images/profile${profileId}`);
//   let file = profileimage[0];
//   let uploadTask = imageRef.put(file);

//   if (imageRef.exists) {
//     // delete previous profile image
//     imageRef.delete();
//     return uploadImage(uploadTask);
//   }

//   return uploadImage(uploadTask);
// };

// const uploadImage = (uploadTask) => {
//   try {
//     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
//       let downloadURL = uploadTask.snapshot.downloadURL;
//     });
//   } catch (error) {
//     console.error("error uploading new image", error.message);
//   }
// };

// export const getImage = async (profileId) => {
//   const imageRef = firebase.storage().ref().child(`images/profile${profileId}`);
//   const image = await imageRef.getDownloadURL();
//   try {
//     return image;
//   } catch (error) {
//     console.error("error", error.message);
//   }
// };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const googleHandler = new firebase.auth.GoogleAuthProvider(); //handle signin prompt
googleHandler.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleHandler);

export default firebase;
