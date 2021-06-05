import pageActionTypes from './page.types';
import {
  setCurrentPage,
  addMushaf,
  setCurrentMushaf,
  addBookmark,
  setPageNotes,
  setUserNotes,
  setCurrentBookmarks,
} from './page.utils';

const INITIAL_STATE = {
  pending: false,
  mushafs: [],
  currentMushaf: [],
  bookmarks: [],
  currentBookmarks: [],
  pageNotes: [],
  currentNotes: [],
  onlineNotes:[],
  onlineMushafs: [],
  error: null,
  pagesRead: 1,
  targets: [],
  openProfile: false,
  enterLibrary: false
};

const pageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case pageActionTypes.FETCH_BOOKMARKS_PENDING:
    case pageActionTypes.FETCH_COPIES_PENDING:
    case pageActionTypes.FETCH_NOTES_PENDING:
    return{
      ...state,
      pending:true,
      error:null
    }



    case pageActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        mushafs: setCurrentPage(state.mushafs, action.payload),
      };

    case pageActionTypes.ADD_MUSHAF:
      return {
        ...state,
        mushafs: addMushaf(state.mushafs, action.payload),
      };
    case pageActionTypes.FETCH_COPIES_SUCCESS:
      return {
        ...state,
        onlineMushafs: action.payload,
      }
        case pageActionTypes.FETCH_NOTES_SUCCESS:
          return {
            ...state,
            onlineNotes: action.payload,
          }
        
    case pageActionTypes.SET_CURRENT_MUSHAF:
      return {
        ...state,
        currentMushaf: setCurrentMushaf(state.mushafs, action.payload),
      };

      case pageActionTypes.SET_CURRENT_ONLINE_MUSHAF:
      return {
        ...state,
        currentMushaf: setCurrentMushaf(state.onlineMushafs, action.payload),
      };
      case pageActionTypes.SET_CURRENT_SHARE_MUSHAF:
        return {
        ...state,
        currentMushaf: action.payload
        };
        case pageActionTypes.SET_CURRRENT_ONLINE_NOTES:
        return {
          ...state,
          currentMushaf: setPageNotes(state.onlineNotes, action.payload),
        };
    case pageActionTypes.SET_MUSHAFS:
      return {
        ...state,
        mushafs: action.payload,
      };
    case pageActionTypes.SET_CURRENT_MUSHAF_PAGE:
      return {
        ...state,
        currentMushaf: action.payload,
      };
      case pageActionTypes.SET_BOOKMARKS:
        return {
          ...state,
          bookmarks: action.payload,
        };

        case pageActionTypes.SET_DELETE_NOTES:
          return {
            ...state,
            pageNotes: action.payload,
          };

    case pageActionTypes.ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: addBookmark(state.bookmarks, action.payload),
      };
    case pageActionTypes.SET_CURRRENT_BOOKMARKS:
      return {
        ...state,
        currentBookmarks: setCurrentBookmarks(state.bookmarks, action.payload),
      };
    case pageActionTypes.ADD_PAGE_NOTE:
      return {
        ...state,
        pageNotes: addBookmark(state.pageNotes, action.payload),
      };
    case pageActionTypes.SET_CURRRENT_PAGE_NOTES:
      return {
        ...state,
        currentNotes: setPageNotes(state.pageNotes, action.payload),
      };
    case pageActionTypes.SET_NOTES:
      return {
        ...state,
        currentNotes: setUserNotes(state.pageNotes, action.payload),
      };
    case pageActionTypes.SET_PAGES_READ:
      return {
        ...state,
        pagesRead: action.payload,
      }
      case pageActionTypes.SET_TARGETS:
        return {
          ...state,
          targets: action.payload,
        }
      case pageActionTypes.OPEN_PROFILE:
        return {
          ...state,
          openProfile: !state.openProfile
        }
      case pageActionTypes.ENTER_LIBRARY:
        return {
          ...state,
          enterLibrary: !state.enterLibrary
        }
    case pageActionTypes.CLEAR_CURRENT_STATE:
      return {
        ...state,
        currentNotes: [],
        currentBookmarks: [],
        currentMushaf: [],
      };

    case pageActionTypes.FETCH_BOOKMARKS_FAILURE:
    case pageActionTypes.FETCH_COPIES_FAILURE:
    case pageActionTypes.FETCH_NOTES_FAILURE:
    case pageActionTypes.SET_BOOKMARK_FAILED:
    case pageActionTypes.SET_COPIES_FAILED:
    case pageActionTypes.SET_NOTES_FAILED:
      return {
        error:action.payload,
        pending:false,
      }

    default:
      return state;
  }
};

export default pageReducer;
