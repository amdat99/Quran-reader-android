export const setCurrentPage = (mushafs, mushafData) => {
  const existingPage = mushafs.find(mushaf => mushaf.id === mushafData.id);
  if (existingPage) {
    return mushafs.map(mushaf =>
      mushaf.id === mushafData.id
        ? {id: mushafData.id, title: mushafData.title, page: mushafData.page, cover: mushafData.cover}
        : {...mushaf},
    );
  }
  return [...mushafs, {...mushafData}];
};

export const addMushaf = (currentMushafs, mushafToAdd) => {
  return [...currentMushafs, {...mushafToAdd}];
};

export const addBookmark = (currentBookmarks, bookmarkToAdd) => {
  return [...currentBookmarks, {...bookmarkToAdd}];
};

export const setCurrentBookmarks = (bookmarks, mushafData) => {
  return bookmarks.filter(bookmark => {
    return bookmark.id === mushafData.id;
  });
};

export const setCurrentMushaf = (mushafs, id) => {
  const currentMushaf = mushafs.find(mushaf => mushaf.id === id);

  return [currentMushaf];
};

export const setPageNotes = (pageNotes, mushafData) => {
  return pageNotes.filter(notes => {
    return (
      (notes.id === mushafData.id && notes.page === mushafData.page - 1) ||
      (notes.id === mushafData.id && notes.page === mushafData.page + 1)
    );
  });
};

export const setUserNotes = (pageNotes, mushafData) => {
  return pageNotes.filter(notes => {
    return notes.id === mushafData.id;
  });
};
