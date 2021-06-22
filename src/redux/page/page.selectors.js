import {createSelector} from 'reselect';

const selectPage = state => state.page;

export const selectMushafs = createSelector([selectPage], page =>
  page.mushafs ? page.mushafs : [],
);

export const selectOnlineMushafs = createSelector([selectPage], page =>
  page.onlineMushafs ? page.onlineMushafs : [],
);

export const selectCurrentMushaf = createSelector([selectPage], page =>
  page.currentMushaf ? page.currentMushaf : [],
);

export const selectBookmarks = createSelector([selectPage], page =>
  page.bookmarks ? page.bookmarks : [],
);

export const selectCurrentBookmarks = createSelector([selectPage], page =>
  page.currentBookmarks ? page.currentBookmarks : [],
);

export const selectNotes = createSelector([selectPage], page =>
  page.pageNotes ? page.pageNotes : [],
);

export const selectCurrentNotes = createSelector([selectPage], page =>
  page.currentNotes ? page.currentNotes : [],
);

export const selectPagesRead = createSelector(
  [selectPage],
  page => page.pagesRead,
);

export const selectTargets = createSelector([selectPage], page => page.targets);

export const selectOpenProfile = createSelector(
  [selectPage],
  page => page.openProfile,
);

export const selectLibrary = createSelector(
  [selectPage],
  page => page.enterLibrary,
);

export const selectLastP = createSelector(
  [selectPage],
  page => page.lastProfile,
);

export const selectShareChange = createSelector(
  [selectPage],
  page => page.shareChange,
);
export const selectSharePage = createSelector(
  [selectPage],
  page => page.sharePage,
);

