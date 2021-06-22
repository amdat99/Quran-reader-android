import {takeLatest, put, all, call} from 'redux-saga/effects';

import {Alert} from 'react-native';

import uuid from 'react-native-uuid';
import {sendProfileChange} from '../../sockets/sockets';
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
  getMessageFailed,
  sendDirectMessageFailed,
  getRecievedMessageSuccess,
  getSentMessageSuccess,
  fetchNameSuccess,
  fetchNameFailed,
  setLibraryType,
} from './user.actions';

import {fetchCopiesPending} from '../page/page.actions';

import userActionTypes from './user.types';

import {
  auth,
  googleHandler,
  createUserProfileDoc,
  getCurrentUser,
  updateStatus,
  getProfileName,
} from '../../firebase/firebase';

// import {sendProfileChange } from "../../sockets/sockets"

export function* signInWithEmail({payload: {email, password}}) {
  try {
    // const response = yield fetch('http://192.168.11.177:3000/fetchuser',{
    const response = yield fetch(
      'https://quranlive-api.herokuapp.com/fetchuser',
      {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      },
    );
    const data = yield response.json();
    console.log(data);
    {
      if (data !== 'wrong credentials') {
        yield put(signInSuccess(data));

        if (data == 'wrong credentials') {
          yield put(signInFailure(data));
        }

        yield put(setLibraryType());

        yield put(fetchCopiesPending(data[0].contentid));
      }
    }
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onGetProfileName({payload: profileId}) {
  try {
    const profileName = yield getProfileName(profileId);
    yield put(fetchNameSuccess(profileName));
  } catch (error) {
    yield put(fetchNameFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userData = yield getCurrentUser();
    if (!userData) return;
    yield getSnapshotFromUserAuth(userData);
    yield updateStatus(userData.profileId, 'online');
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onUpdateStatus() {
  const userData = yield getCurrentUser();
  yield call(updateStatus, userData.profileId);
}

export function* signOut() {
  try {
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* registerUserAsync({
  payload: {userName, password, email, userId, profileId, contentId},
}) {
  console.log({
    payload: {userName, password, email, userId, profileId, contentId},
  });
  try {
    const response = yield fetch(
      'https://quranlive-api.herokuapp.com/adduser',
      {
        // const response = yield fetch('http://192.168.11.177:3000/adduser',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password,
          userId: userId,
          contentId: contentId,
          profileId: profileId,
          userName: userName,
          userId: userId,
        }),
      },
    );
    const data = yield response.json();
    console.log(data);
    if (data.email) {
      yield put(signInSuccess(data));
      yield put(setLibraryType());
      yield put(fetchCopiesPending(data[0].contentid));
    }
  } catch (e) {
    yield put(signUpFailure(e));
  }
}

export function* onEmailSignInPending() {
  yield takeLatest(userActionTypes.EMAIL_SIGNIN_PENDING, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpPending() {
  yield takeLatest(userActionTypes.SIGN_UP_START, registerUserAsync);
}

export function* onGetProfileNamePending() {
  yield takeLatest(userActionTypes.FETCH_NAME_PENDING, onGetProfileName);
}

export function* userSagas() {
  yield all([
    call(onEmailSignInPending),
    call(onCheckUserSession),
    call(onSignUpPending),
    call(onGetProfileNamePending),
  ]);
}
