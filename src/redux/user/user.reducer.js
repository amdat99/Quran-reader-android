import userActionTypes from './user.types';
import {mapUserData} from './user.utils'

const INITIAL_STATE = {
  pending: false,
  currentUser: null,
  error: null,
  profileId: null,
  sentMessage: null,
  recievedMessage: null,
  profileName: null,
  libraryType: false,
  time: null,
  timerStart: false,
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
    case    userActionTypes.SIGNOUT_PENDING:
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
      }
      case userActionTypes.TOGGLE_TIMER:
        return {
          ...state,
          timerStart: !state.timerStart
        }
      
    case userActionTypes.SET_TIME:
      return {
        ...state,
        time:action.payload,
      }
  
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
