import pageActionTypes from './page.types';

export const setCurrentPage = pageData => ({
  type: pageActionTypes.SET_CURRENT_PAGE,
  payload: pageData,
});

export const addMushaf = mushafData => ({
  type: pageActionTypes.ADD_MUSHAF,
  payload: mushafData,
});

export const setCurrentMushaf = mushafId => ({
  type: pageActionTypes.SET_CURRENT_MUSHAF,
  payload: mushafId,
});

export const deleteInstance = mushafId => ({
  type: pageActionTypes.DELETE_INSTANCE,
  payload: mushafId,
});

export const setMushafs = mushafData => ({
  type: pageActionTypes.SET_MUSHAFS,
  payload: mushafData,
});

export const setBookmarks = boomarkData => ({
  type: pageActionTypes.SET_BOOKMARKS,
  payload: boomarkData,
})


export const setNotes = noteData => ({
  type: pageActionTypes.SET_DELETE_NOTES,
  payload: noteData,
})

export const setCurrentMushafPage = mushafData => ({
  type: pageActionTypes.SET_CURRENT_MUSHAF_PAGE,
  payload: mushafData,
});

export const addBookmark = boomarkData => ({
  type: pageActionTypes.ADD_BOOKMARK,
  payload: boomarkData,
});

export const setCurrentBookmarks = mushafData => ({
  type: pageActionTypes.SET_CURRRENT_BOOKMARKS,
  payload: mushafData,
});

export const addPageNote = noteData => ({
  type: pageActionTypes.ADD_PAGE_NOTE,
  payload: noteData,
});

export const setUserNotes = mushafData => ({
  type: pageActionTypes.SET_NOTES,
  payload: mushafData,
});

export const setCurrentPageNotes = mushafData => ({
  type: pageActionTypes.SET_CURRRENT_PAGE_NOTES,
  payload: mushafData,
});

export const clearCurrentState = () => ({
  type: pageActionTypes.CLEAR_CURRENT_STATE,
});

export const fetchCopiesPending = (userid) => ({
  type: pageActionTypes.FETCH_COPIES_PENDING,
  payload: userid,
})

export const fetchCopiesSuccess = (copyData) => ({
  type: pageActionTypes.FETCH_COPIES_SUCCESS,
  payload: copyData
})

export const fetchCopiesFailed = (e) => ({
  type: pageActionTypes.FETCH_COPIES_FAILED,
  payload: e
})



export const setCopiesPending = (copyData) => ({
  type: pageActionTypes.SET_COPIES_PENDING,
  payload: copyData
})

export const setCopiesSuccess = (copyData) => ({
  type: pageActionTypes.SET_COPIES_SUCCESS,
  payload: copyData
})

export const setCopiesFailed = (e) => ({
  type: pageActionTypes.SET_COPIES_FAILED,
  payload: e
})
export const setCurrentOnlineMushaf = (mushafId) => ({
  type: pageActionTypes.SET_CURRENT_ONLINE_MUSHAF,
  payload: mushafId
})

export const setCurrentOnlineBookmark = (boomarkData) => ({
  type: pageActionTypes.SET_CURRENT_ONLINE_BOOKMARKS,
  payload: boomarkData
})

export const setCurrentOnlineNote = (noteData) => ({
  type: pageActionTypes.SET_CURRENT_ONLINE_NOTES,
  payload: noteData
})

export const updateCopyPending = (mushafData) => ({
  type: pageActionTypes.UPDATE_COPY_PENDING,
  payload: mushafData
}) 

export const updateCopySuccess = (copyData)=> ({
  type: pageActionTypes.UPDATE_COPY_SUCCESS,
  payload: copyData
})

export const updateCopyFailure = (e)=> ({
  type: pageActionTypes.UPDATE_COPY_FAILED,
  payload: e
})

export const setBookmarkPending = (boomarkData) => ({
  type: pageActionTypes.SET_BOOKMARK_PENDING,
  payload: boomarkData
})

export const setBookmarkSuccess = (data) => ({
  type: pageActionTypes.SET_BOOKMARK_SUCCESS,
  payload: data
})

export const setBookmarkFailure = (e) => ({
  type: pageActionTypes.SET_BOOKMARK_FAILED,
  payload: e
})


export const setNotePending = (noteData) => ({
  type: pageActionTypes.SET_NOTE_PENDING,
  payload: noteData
})

export const setNoteSuccess = (data) => ({
  type: pageActionTypes.SET_NOTE_SUCCESS,
  payload: data
})

export const setNoteFailure = (e) => ({
  type: pageActionTypes.SET_NOTE_FAILED,
  payload: e
})

export const setPagesRead = (pages) =>({
  type: pageActionTypes.SET_PAGES_READ,
  payload: pages
})

export const setTargets = (targets) => ({
  type: pageActionTypes.SET_TARGETS,
  payload: targets
})

export const setOpenProfile = () => ({
  type: pageActionTypes.OPEN_PROFILE
})

export const enterLibrary = () => ({
  type: pageActionTypes.ENTER_LIBRARY
})
export const setCurrentShareMushaf = (mushafData) => ({
  type: pageActionTypes.SET_CURRENT_SHARE_MUSHAF,
  payload: mushafData
})