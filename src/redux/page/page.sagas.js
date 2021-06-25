import {takeLatest, put, all, call} from 'redux-saga/effects';

import uuid from 'react-native-uuid';

import {
  setCopiesSuccess,
  setCopiesFailed,
  fetchCopiesSuccess,
  fetchCopiesFailed,
  updateCopySuccess,
  updateCopyFailure,
  setBookmarkSuccess,
  setBookmarkFailure,
  setNoteSuccess,
  setNoteFailure,
  fetchBookmarksSuccess,
  fetchBookmarksFailed,
} from './page.actions';

import pageActionTypes from './page.types';

// import {sendProfileChange } from "../../sockets/sockets"

export function* addCopiesAsync({
  payload: {id, userId, title, page, cover, source, transformId},
}) {
  console.log({payload: {id, userId, title, page, cover, source, transformId}});

  try {
    const response = yield fetch(
      'http://192.248.153.241:3000/addcopy',
      {
        // const response = yield fetch('http://192.168.11.177:3000/addcopy',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: id,
          userId: userId,
          title: title,
          page: page,
          cover: cover,
          source: source,
          transformId: transformId,
        }),
      },
    );
    const data = yield response.json();
    yield put(setCopiesSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(setCopiesFailed(e));
  }
}

export function* fetchCopiesAsync({payload: contentid}) {
  try {
    const response = yield fetch(
      'http://192.248.153.241:3000/fetchcopies',
      {
        // const response = yield fetch('http://192.168.11.177:3000/fetchcopies',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          contentid: contentid,
        }),
      },
    );
    const data = yield response.json();
    console.log('data', data);
    yield put(fetchCopiesSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(fetchCopiesFailed(e));
  }
}

export function* updateCopyAsync({payload: {id, page}}) {
  console.log({payload: {id, page}});

  try {
    const response = yield fetch(
      'http://192.248.153.241:3000/updatepage',
      {
        // const response = yield fetch('http://192.168.11.177:3000/updatepage',{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: id,
          page: page,
        }),
      },
    );
    const data = yield response.json();
    console.log('data', data);
    yield put(updateCopySuccess(data));
  } catch (e) {
    console.log(e);
    yield put(updateCopyFailure(e));
  }
}

export function* addBookmarksAsync({
  payload: {id, page, bookmarkid, title, userId},
}) {
  console.log({payload: {id, page, bookmarkid, title, userId}});

  try {
    const response = yield fetch(
      'http://192.248.153.241:3000/addbookmark',
      {
        // const response = yield fetch('http://192.168.11.177:3000/addbookmark',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: id,
          userId: userId,
          title: title,
          page: page,
          bookmarkid: bookmarkid,
        }),
      },
    );
    const data = yield response.json();
    console.log(data);
    yield put(setBookmarkSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(setBookmarkFailure(e));
  }
}

export function* addNotesAsync({
  payload: {id, page, noteId, title, userId, note},
}) {
  console.log({payload: {id, page, noteId, title, userId, note}});

  try {
    const response = yield fetch(
      'http://192.248.153.241:3000/addnote',
      {
        // const response = yield fetch('http://192.168.11.177:3000/addnote',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: id,
          userId: userId,
          title: title,
          page: page,
          noteId: noteId,
          note: note,
        }),
      },
    );
    const data = yield response.json();
    console.log(data);
    yield put(setNoteSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(setNoteFailure(e));
  }
}

export function* onAddCopiesPending() {
  yield takeLatest(pageActionTypes.SET_COPIES_PENDING, addCopiesAsync);
}

export function* onFetchCopiesPending() {
  yield takeLatest(pageActionTypes.FETCH_COPIES_PENDING, fetchCopiesAsync);
}

export function* onupdateCopyPending() {
  yield takeLatest(pageActionTypes.UPDATE_COPY_PENDING, updateCopyAsync);
}

export function* onAddBookmarkPending() {
  yield takeLatest(pageActionTypes.SET_BOOKMARK_PENDING, addBookmarksAsync);
}

export function* onAddNotePending() {
  yield takeLatest(pageActionTypes.SET_NOTE_PENDING, addNotesAsync);
}

export function* pageSagas() {
  yield all([
    call(onAddCopiesPending),
    call(onFetchCopiesPending),
    call(onupdateCopyPending),
    call(onAddBookmarkPending),
    call(onAddNotePending),
  ]);
}
