import React, {useEffect, useState, useRef} from 'react';


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
  Dimensions,
} from 'react-native';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

import {
  selectBookmarks,
  selectCurrentBookmarks,
  selectCurrentNotes,
  selectNotes,
  selectShareChange
} from '../../redux/page/page.selectors';

import {
  selectLibrary,
  selectCurrentUser,
  selectOBookmarks,
} from '../../redux/user/user.selectors';
import {
  addBookmark,
  addPageNote,
  setCurrentBookmarks,
  setCurrentPageNotes,
  setUserNotes,
  setBookmarkPending,
  fetchBookmarksPending,
  setNotePending,
  setBookmarks,
  setNotes,
} from '../../redux/page/page.actions';
import {

  sendAudioLink,
} from '../../sockets/sockets';

import uuid from 'react-native-uuid';

import {
  juz,
  surahs,
  fetchBookmarksAsync,
  fetchNotesAsync,
  fetchAllNotesAsync,
  deleteBookmarkAsync,
  deleteNoteAsync,
  
} from './utils';

function NavHeader({
  setPage,
  toggleJuz,
  mushaf,
  togglePage,
  addBookmark,
  bookmarkTitle,
  currentPage,
  notes,
  toggleAddBookmark,
  toggleBookmarks,
  bookmarks,
  closePage,
  toggleAddPageNotes,
  togglePageNotes,
  addPageNote,
  setCurrentBookmarks,
  setCurrentPageNotes,
  setNotePage,
  setUserNotes,
  toggleSurah,
  libraryType,
  setBookmarkPending,
  currentUser,
  setNotePending,
  setBookmarks,
  storedBookmarks,
  storedNotes,
  setNotes,
  numberOfPages,
  onNote,
  onBookmark,
  shareData,
  shareChange,
  toggleTranslation
}) {

  const scrollRef = useRef(); 

  const [onJuz, setOnJuz] = useState(false);
  const [bTitle, setBTitle] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [note, setNote] = useState('');
  const [surahField, setSurahField] = useState('');
  const [page, onPage] = useState(null);
  const [onlineBookmarks, setOnlineBookmarks] = useState(null);
  const [onlineNotes, setOnlineNotes] = useState(null);
  const [onDelete, setOnDelete] = useState(false);
  const [toggleArabic, setToggleArabic] = useState(true);
  const [toggleEnglish, setToggleEnglish] = useState(true);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
  });
  },[currentPage])

  useEffect(() => {

        console.log('fw=etch bokmarks')
        fetchBookmarksAsync(mushaf.id, mushaf.userid).then(data =>
          setOnlineBookmarks(data),
        );
       fetchNotesAsync(
          mushaf.id,
          mushaf.userid,
          mushaf.page,
        ).then(data => setOnlineNotes(data));
       
    },[shareChange])


  useEffect(() => {
    libraryType ? null : setCurrentBookmarks(mushaf);
    setCurrentPageNotes(mushaf);
  }, []);

  useEffect(() => {
    if (currentUser && libraryType) {
      fetchBookmarksAsync(mushaf.id, mushaf.userid).then(data =>
        setOnlineBookmarks(data),
      );
    }
  }, [currentUser]);

  const fetchOnlineNotes = () => {
    if (currentUser && libraryType) {
      console.log('/ssa',page2)
      fetchNotesAsync(
        mushaf.id,
        mushaf.userid,
        mushaf.page,
      ).then(data => setOnlineNotes(data));
    }
  };

  const deleteBookmark = deletion => {
    if (libraryType) {
      deleteBookmarkAsync(deletion.bookmarkid);
      if (currentUser && libraryType) {
        sendAudioLink(null,currentUser[0].name,'onbookmark')
        setTimeout(function () {
          fetchBookmarksAsync(mushaf.id, mushaf.userid).then(data =>
            setOnlineBookmarks(data),
          );
        }, 500);
      }
    } else {
      let currentBookmarks = storedBookmarks.filter(
        boomark => boomark.bookmarkId !== deletion.bookmarkId,
      );
      setBookmarks(currentBookmarks);
      setCurrentBookmarks(mushaf);
    }

    setOnDelete(false);
  };

  const deleteNotes = deletion => {
    if (libraryType) {
      deleteNoteAsync(deletion.noteid);

      if (currentUser && libraryType) {
        sendAudioLink(null,currentUser[0].name,'onnote')
        setTimeout(function () {
          fetchAllNotesAsync(mushaf.id, mushaf.userid).then(data =>
            setOnlineNotes(data),
          );
        }, 500);
      }
    } else {
      let currentNotes = storedNotes.filter(
        note => note.noteId !== deletion.noteId,
      );
      setNotes(currentNotes);
      setCurrentPageNotes(mushaf);
    }
    setOnDelete(false);
  };

  const setPageInput = () => {
    if (!page) {
      return;
    }
    setPage(parseInt(page), mushaf);
    setTimeout(function () {
      setNotePage({id: mushaf.id, page: parseInt(page), mushaf});
    }, 500);
  };

  const addBookmarkData = mushaf => {
    if (!bTitle) {
      return;
    }
    if (libraryType) {
      setBookmarkPending({
        id: mushaf.id,
        page: mushaf.page,
        bookmarkid: uuid.v4(),
        title: bTitle,
        userId: mushaf.userid,
      });
      if (currentUser && libraryType) {
        sendAudioLink(null,currentUser[0].name,'onbookmark')
        fetchBookmarksAsync(mushaf.id, mushaf.userid).then(data =>
          setOnlineBookmarks(data),
        );
      }
    } else {
      addBookmark({
        id: mushaf.id,
        page: mushaf.page,
        bookmarkId: uuid.v4(),
        title: bTitle,
      });
    }
    setBTitle('');
    setCurrentBookmarks(mushaf);
    onBookmark();
  };

  const setAllNotes = () => {
    if (libraryType) {
      if (currentUser && libraryType) {
        fetchAllNotesAsync(mushaf.id, mushaf.userid).then(data =>
          setOnlineNotes(data),
        );
      }
    } else {
      setUserNotes(mushaf);
    }
  };

  const addPageNoteData = mushaf => {
    if (!note || note.id) {
      return;
    }

    if (libraryType) {
      setNotePending({
        id: mushaf.id,
        page: mushaf.page,
        noteId: uuid.v4(),
        title: noteTitle,
        userId: mushaf.userid,
        note: note,
      });
      if (currentUser && libraryType) {
        sendAudioLink(null,currentUser[0].name,'onnote')
        fetchNotesAsync(
          mushaf.id,
          mushaf.userid,
          mushaf.page,
        ).then(data => setOnlineNotes(data));
      }
    } else {
      addPageNote({
        id: mushaf.id,
        page: mushaf.page,
        noteId: uuid.v4(),
        title: noteTitle,
        note: note,
      });
      setCurrentPageNotes(mushaf);
    }
    setNoteTitle('');
    setNote('');
    onNote();
  };

  const onSetPage = page => {
    setPage(page, mushaf);
    setTimeout(function () {
      setNotePage({id: mushaf.id, page: page, userid: mushaf.userid});
    }, 500);
  };

  const filteredSurahs = () => {

    // console.log(translations[currentPage-1])
    return surahs.filter(surah => {
      return surah.name.toLowerCase().includes(surahField.toLowerCase());
    });
  };

  console.log(currentPage)

  return (
    <>
      <View style={styles.container}>
        {toggleJuz ? (
          <>
            <Text style={styles.closePage} onPress={closePage}>
              X
            </Text>
            <ScrollView style={styles.juz}>
              {juz.map((page, i) => (
                <>
                  <Text key={i} onPress={() => onSetPage(page.page)}>
                    {page.juz}
                  </Text>
                </>
              ))}
            </ScrollView>
          </>
        ) : null}

        {toggleSurah ? (
          <>
            <Text style={styles.closePage} onPress={closePage}>
              X
            </Text>
            <ScrollView style={styles.juz}>
              <TextInput
                style={{color: '#c2b280ya'}}
                placeholder="search surah"
                onChangeText={setSurahField}
              />
              {filteredSurahs().map((surah, i) => (
                <>
                  <Text
                    key={surah.name}
                    onPress={() => onSetPage(surah.pageGreen)}>
                    {surah.num}:{surah.name}
                  </Text>
                </>
              ))}
            </ScrollView>
          </>
        ) : null}

        {togglePage ? (
          <ScrollView style={styles.juzPage}>
            <Text
              style={{
                color: 'red',
                marginLeft: Dimensions.get('window').width / 5,
              }}
              onPress={closePage}>
              X
            </Text>
            <Text>total pages: {numberOfPages}</Text>
            <TextInput
              onSubmitEditing={setPageInput}
              keyboardType="numeric"
              onChangeText={onPage}
              placeholder={`type page`}
            />

            <Text onPress={setPageInput}>enter </Text>
          </ScrollView>
        ) : null}

        {toggleAddBookmark ? (
          <View style={styles.addBookmark}>
            <Text style={{color: '#c2b280', marginLeft: 5}}>Add Bookmark</Text>
            <TextInput
              onSubmitEditing={() => addBookmarkData(mushaf)}
              onChangeText={setBTitle}
              placeholder="bookmark title"
            />
            <Text
              style={{marginLeft: 5}}
              onPress={() => addBookmarkData(mushaf)}>
              enter{' '}
            </Text>
          </View>
        ) : null}

        {toggleBookmarks ? (
          <ScrollView style={styles.bookmark}>
            <Text style={{color: '#c2b280'}}>Bookmarks</Text>
            {libraryType
              ? onlineBookmarks
                ? onlineBookmarks.map((bookmark, i) => (
                    <>
                      <Text
                        key={bookmark.bookmarkid}
                        onLongPress={() => setOnDelete(!onDelete)}
                        onPress={() => onSetPage(bookmark.page)}>
                        page:{bookmark.page} {bookmark.title} (
                        {bookmark.date.slice(0, 10)})
                      </Text>
                      {onDelete ? (
                        <Text
                          key={i}
                          style={{color: 'red'}}
                          onPress={() => deleteBookmark(bookmark)}>
                          Delete
                        </Text>
                      ) : null}
                    </>
                  ))
                : null
              : bookmarks
              ? bookmarks.map((bookmark, i) => (
                  <>
                    <Text
                      key={bookmark.bookmarkId}
                      onPress={() => onSetPage(bookmark.page)}
                      onLongPress={() => setOnDelete(!onDelete)}>
                      page:{bookmark.page} {bookmark.title}
                    </Text>
                    {onDelete ? (
                      <Text
                        key={i}
                        style={{color: 'red'}}
                        onPress={() => deleteBookmark(bookmark)}>
                        Delete
                      </Text>
                    ) : null}
                  </>
                ))
              : null}
          </ScrollView>
        ) : null}

        {togglePageNotes ? (
          <ScrollView style={styles.bookmark}>
            <View style={styles.notelinks}>
              <Text style={{color: '#c2b280'}}>notes</Text>
              <Text style={{marginLeft: 10}} onPress={setAllNotes}>
                All notes
              </Text>
              {libraryType ? (
                <Text style={{marginLeft: 10}} onPress={fetchOnlineNotes}>
                  Page Notes
                </Text>
              ) : null}
            </View>
            {libraryType
              ? onlineNotes
                ? onlineNotes.map((note, i) => (
                    <>
                      <Text
                        key={note.noteId}
                        onLongPress={() => setOnDelete(!onDelete)}>
                        {note.title}: {note.note}
                      </Text>
                      <Text onPress={() => onSetPage(note.page)}>
                        (page:{note.page}) ({note.date.slice(0, 10)})
                      </Text>

                      {onDelete ? (
                        <Text
                          key={i}
                          style={{color: 'red'}}
                          onPress={() => deleteNotes(note)}>
                          Delete
                        </Text>
                      ) : null}
                      <Text
                        style={{
                          width: Dimensions.get('window').width / 3,
                          color: '#c2b280',
                        }}>
                        ----------------------
                      </Text>
                    </>
                  ))
                : null
              : notes
              ? notes.map((note, i) => (
                  <>
                    <Text
                      key={note.noteId}
                      onLongPress={() => setOnDelete(!onDelete)}>
                      {note.title}: {note.note}
                    </Text>
                    <Text onPress={() => onSetPage(note.page)}>
                      (page:{note.page})
                    </Text>
                    {onDelete ? (
                      <Text
                        key={i}
                        style={{color: 'red'}}
                        onPress={() => deleteNotes(note)}>
                        Delete
                      </Text>
                    ) : null}
                    <Text
                      style={{
                        width: Dimensions.get('window').width / 3,
                        color: '#c2b280',
                      }}>
                      ----------------------
                    </Text>
                  </>
                ))
              : null}
          </ScrollView>
        ) : null}

        {toggleAddPageNotes ? (
          <View style={styles.addNote}>
            <Text style={{color: '#c2b280'}}>Add Page Note</Text>
            <Text
              style={{
                marginLeft: Dimensions.get('window').width / 3,
                position: 'relative',
                bottom: 20,
              }}
              onPress={() => addPageNoteData(mushaf)}>
              enter{' '}
            </Text>
            <TextInput onChangeText={setNoteTitle} placeholder="note title" />

            <ScrollView>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={styles.noteInput}
                onChangeText={setNote}
                placeholder="type note"
              />
            </ScrollView>
          </View>
        ) : null}
      </View>
      {toggleTranslation?
      <>
      <View style={{zIndex:999,flexDirection: 'row', marginTop:-5, marginLeft:Dimensions.get('window').width / 2}}>
      <Text style={{marginRight:7,color:'#c2b280'}} onPress={()=>setToggleArabic(!toggleArabic)}>Toggle Arabic</Text>
      <Text style={{color:'#c2b280'}} onPress={()=>setToggleEnglish(!toggleEnglish)}>Toggle English</Text>
      </View>
      <ScrollView ref={scrollRef} style={styles.transaltion}> 

      {translations[currentPage-2]?
      translations[currentPage-2].map(data => 

       <>
        <Text style={{marginTop:10, color:'#c2b280',fontSize: 17}}>{data.verse_key}</Text>
        {toggleArabic?
        <Text style={{fontSize:19}}>{data.text_uthmani}</Text>
        :null}
        { toggleEnglish? 
        <Text>{data.text}</Text>
        :null }
        </>
      ): null}

    </ScrollView>
    </>
    :null}  
  
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,

    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',

    flex: 1,
  },

  juzPage: {
    maxHeight: Dimensions.get('window').height / 4,
    borderRadius: 10,
    position: 'relative',
    fontSize: 28,
    marginLeft: 20,
    backgroundColor: 'white',
    maxWidth: 100,
    padding: 2,
    zIndex: 998,
  },

  juz: {
    height: Dimensions.get('window').height / 3,
    fontSize: 28,
    marginLeft: 20,
    backgroundColor: 'white',
    maxWidth: 110,
    padding: 2,
    borderRadius: 10,
  },
  addBookmark: {
    marginLeft: 50,
    height: Dimensions.get('window').height / 6,
    width: Dimensions.get('window').width / 2,
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 10,
  },
  addNote: {
    marginLeft: 20,
    width: Dimensions.get('window').width / 1.7,
    height: Dimensions.get('window').height / 4,
    backgroundColor: 'white',
    padding: 2,
    marginBottom: Dimensions.get('window').height / 12,
    marginRight: 10,
    borderRadius: 10,
  },

  transaltion: {
    position: 'absolute',
    marginLeft: 20,
    marginTop:10,
    width: Dimensions.get('window').width / 1.1,
    height: Dimensions.get('window').height / 2.5,
    backgroundColor: 'white',
    padding: 2,
    marginBottom: Dimensions.get('window').height / 12,
    marginRight: 10,
    borderRadius: 10,
    zIndex:99
  },

  bookmark: {
    marginLeft: 20,
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').height / 3,
    fontSize: 28,
    padding: 2,
    backgroundColor: 'white',
    width: 100,
    marginRight: 20,
    borderRadius: 10,
  },
  closePage: {
    marginLeft: 100,
    top: -5,
    position: 'absolute',
    zIndex: 998,
    color: 'red',
  },
  noteInput: {
    maxWidth: Dimensions.get('window').width / 1.8,

    flexWrap: 'wrap',
  },
  notelinks: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 10,
    borderRadius: 10,
  },
});

const mapsStateToProps = createStructuredSelector({
  bookmarks: selectCurrentBookmarks,
  notes: selectCurrentNotes,
  libraryType: selectLibrary,
  currentUser: selectCurrentUser,
  storedBookmarks: selectBookmarks,
  storedNotes: selectNotes,
  shareChange : selectShareChange
});

const mapDispatchToProps = dispatch => ({
  addBookmark: bookmarkData => dispatch(addBookmark(bookmarkData)),
  addPageNote: noteData => dispatch(addPageNote(noteData)),
  setCurrentBookmarks: mushafData => dispatch(setCurrentBookmarks(mushafData)),
  setCurrentPageNotes: mushafData => dispatch(setCurrentPageNotes(mushafData)),
  setUserNotes: mushafData => dispatch(setUserNotes(mushafData)),
  setBookmarkPending: bookmarkData =>
    dispatch(setBookmarkPending(bookmarkData)),
  setNotePending: noteData => dispatch(setNotePending(noteData)),
  setBookmarks: bookmarkData => dispatch(setBookmarks(bookmarkData)),
  setNotes: noteData => dispatch(setNotes(noteData)),
});

export default connect(mapsStateToProps, mapDispatchToProps)(NavHeader);


import {translations} from './utils'