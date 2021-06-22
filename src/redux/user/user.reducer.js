import userActionTypes from './user.types';
import {mapUserData} from './user.utils';

import {addBookmark} from '../page/page.utils';

const INITIAL_STATE = {
  pending: false,
  currentUser: null,
  error: null,
  profileId: null,
  sentMessage: null,
  recievedMessage: null,
  profileName: null,
  libraryType: false,
  timerStart: false,
  time: null,
  room: 123,
  message: [],
  lastMessage: null,
  name: null,
  stream: null,
  onShare: true,
  shareData: null,
  openMessage: false,
  lastProfile: null,
  PushManager: null
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_UP_START:
    case userActionTypes.EMAIL_SIGNIN_PENDING:
    case userActionTypes.GOOGLE_SIGNIN_PENDING:
    case userActionTypes.FETCH_NAME_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };

    case userActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case userActionTypes.GET_PROFILE_ID:
      return {
        ...state,
        profileId: action.payload,
        error: null,
      };
    case userActionTypes.SIGNOUT_SUCCESS:
    case userActionTypes.SIGNOUT_PENDING:
      return {
        ...state,
        currentUser: null,
        libraryType: false,
        pending: false,
        error: null,
      };
    case userActionTypes.GET_SENT_MESSAGE_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        sentMessage: action.payload,
      };

    case userActionTypes.GET_RECIEVED_MESSAGE_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        recievedMessage: action.payload,
      };
    case userActionTypes.FETCH_NAME_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        profileName: action.payload,
      };
    case userActionTypes.SET_LIBRARY_TYPE:
      return {
        ...state,
        libraryType: action.payload,
      };
    case userActionTypes.PUSH_LIBRARY:
      return {
        ...state,
        pushLibrary: action.payload
      }
    case userActionTypes.TOGGLE_TIMER:
      return {
        ...state,
        timerStart: !state.timerStart,
      };

    case userActionTypes.SET_TIME:
      return {
        ...state,
        time: action.payload,
      };
    case userActionTypes.ROOM:
      return {
        ...state,
        room: action.payload,
      };
    case userActionTypes.LAST_MESSAGE:
      return {
        ...state,
        lastMessage: action.payload,
      };
    case userActionTypes.MESSAGE:
      return {
        ...state,
        message: addBookmark(state.message, action.payload),
      };
    case userActionTypes.NAME:
      return {
        ...state,
        name: action.payload,
      };
    case userActionTypes.CLEAR_CHAT:
      return {
        ...state,
        message: [],
      };
    case userActionTypes.STREAM:
      return {
        ...state,
        stream: action.payload,
      };
    case userActionTypes.ONSHARE:
      return {
        ...state,
        onShare: action.payload,
      };
    case userActionTypes.SET_SHARE_DATA:
      return {
        ...state,
        shareData: action.payload,
      };
    case userActionTypes.SET_LAST_PROFILE:
      return {
        ...state,
        lastProfile: action.payload,
      };
    case userActionTypes.OPEN_MESSAGE:
      return {
        ...state,
        openMessage: true,
      };
    case userActionTypes.CLOSE_MESSAGE:
      return {
        ...state,
        openMessage: false,
      };
    case userActionTypes.SIGNIN_FAILED:
    case userActionTypes.SIGNOUT_FAILED:
    case userActionTypes.SIGN_UP_FAILURE:
    case userActionTypes.FETCH_NAME_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
