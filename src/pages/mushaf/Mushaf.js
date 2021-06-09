import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ImageBackground,
  TextInput,
  Dimensions,
} from 'react-native';

import {updateCounter} from './utils';
import {updateStatus} from '../library/utils';
import Pdf from 'react-native-pdf';

import uuid from 'react-native-uuid';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {
  addMushaf,
  clearCurrentState,
  setMushafs,
  setCurrentMushafPage,
  setCurrentPage,
  addBookmark,
  setCurrentPageNotes,
  updateCopyPending,
  fetchCopiesPending,
  setPagesRead,
  setOpenProfile,
  enterLibrary,
  setCurrentOnlineMushaf,
} from '../../redux/page/page.actions';
import {
  selectCurrentMushaf,
  selectPagesRead,
} from '../../redux/page/page.selectors';
import {
  selectCurrentUser,
  selectLibrary,
  selectLastMessage,
  selectShareData,
} from '../../redux/user/user.selectors';
import {toggleTimer} from '../../redux/user/user.actions';
import {
  sendCounterRequest,
  enterChat,
  sendProfileChange,
  sendAudioLink,
} from '../../sockets/sockets';

import NavHeader from '../../components/nav-header/Nav-header';

var Sound = require('react-native-sound');

class Mushaf extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showImages: true,
      endFirstPage: true,
      toggleNav: false,
      toggleJuz: false,
      togglePage: false,
      toggleSurah: false,
      toggleBookmarks: false,
      toggleAddBookmark: false,
      toggleAddPageNotes: false,
      togglePageNotes: false,
      showMenu: false,
      currentPage: '',
      currentMushaf: null,
      toggleAudio: false,
      paused: false,
      audioStart: false,
      numberOfPages: null,
      showMessage: false,
      name: null,
      message: null,
      showShareMes: false,
    };
    this.sound1 = null;
    this.currentPosition = null;
    this.duration = null;
    this.pagesRead = 1;
    this.passed3 = false;
    this.me = null;

    this.source1 = {
      uri:
        'https://quran-live.s3.eu-west-2.amazonaws.com/Quran-with-Big-Font.pdf',
      cache: true,
    };
    this.source = {uri: 'bundle-assets://Quran-live-pdf.pdf', cache: true};
  }

  componentDidMount() {
    updateCounter('open');
    sendCounterRequest();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    // if (this.passed3 !== prevProps.passed3) {
    //  this.onUpdatePage()
    // }

    if (this.props.lastMessage !== prevProps.lastMessage) {
      this.setState({message: this.props.lastMessage});
      this.toggleMessage();
    }
    if (this.props.shareData !== prevProps.shareData) {
      this.toggleShareMessage();
    }
  }

  componentWillUnmount() {
    const {
      clearCurrentState,
      fetchCopiesPending,
      currentUser,
      toggleTimer,
      enterLibrary,
    } = this.props;
    this.stopSound();
    this.pagesRead = 1;
    clearCurrentState();
    updateCounter('left');
    toggleTimer();
    sendCounterRequest();
    sendProfileChange();
    if (currentUser) {
      fetchCopiesPending(currentUser[0].contentid);
      updateStatus('online', currentUser[0].userid);
    }

    this.pagesRead = 1;
  }

  startSound = () => {
    if (this.sound1) this.sound1.release();
    if (this.state.currentPage < 10) {
      this.sound1 = new Sound(
        `https://aswaatulqurraa.com/files/Pages/Abu%20Bakr%20al%20Shatri%20(13%20Liner)/1/00${this.state.currentPage}.mp3`,
        // `https://quran-live.s3.eu-west-2.amazonaws.com/audio1/0${this.state.currentPage}.mp3`,
        Sound.MAIN_BUNDLE,

        (error, sound) => {
          if (error) {
            console.log('error' + error.message);
            return;
          }

          this.sound1.setVolume(10);
          this.duration = this.sound1.getDuration();

          console.log(this.duration);

          this.sound1.play(() => {
            this.sound1.release();
          });
          this.setState({audioStart: true});
        },
      );
    } else {
      this.sound1 = new Sound(
        `https://aswaatulqurraa.com/files/Pages/Abu%20Bakr%20al%20Shatri%20(13%20Liner)/1/0${this.state.currentPage}.mp3`,
        // `https://quran-live.s3.eu-west-2.amazonaws.com/audio1/0${this.state.currentPage}.mp3`,
        Sound.MAIN_BUNDLE,

        (error, sound) => {
          if (error) {
            console.log('error' + error.message);
            return;
          }

          this.sound1.setVolume(10);
          this.duration = this.sound1.getDuration();

          console.log(this.duration);

          this.sound1.play(() => {
            this.sound1.release();
          });
          this.setState({audioStart: true});
        },
      );
    }
  };
  stopSound = () => {
    if (this.sound1) {
      this.sound1.stop(() => {
        console.log('Stop');
      });
      this.setState({audioStart: false});
    }
  };

  pause = () => {
    this.sound1.pause();
    this.setState({notPaused: true});
  };

  resume = () => {
    this.sound1.play();
    this.setState({notPaused: false});
  };
  closeMenu = () => {
    this.setState({
      toggleJuz: false,
      togglePage: false,
      toggleSurah: false,
      showMenu: false,
      togglePage: false,
      toggleAddBookmark: false,
      toggleAddPageNotes: false,
      toggleBookmarks: false,
      toggleAudio: false,
    });
  };

  toggleMessage = () => {
    const toggleMessage = () => {
      this.setState({showMessage: false});
    };

    this.setState({showMessage: true});
    setTimeout(function () {
      toggleMessage();
    }, 5000);
  };

  toggleShareMessage = () => {
    this.setState({showShareMes: !this.state.showShareMes});
  };

  onCreateNote = () => {
    this.setState({
      toggleAddBookmark: false,
      showMenu: true,
      toggleBookmarks: false,
      toggleAddPageNotes: false,
      togglePageNotes: !this.state.togglePageNotes,
    });
  };

  onCreateBookmark = () => {
    this.setState({
      toggleAddBookmark: false,
      showMenu: true,
      toggleBookmarks: !this.state.toggleBookmarks,
      toggleAddPageNotes: false,
      togglePageNotes: false,
    });
  };

  closePage = () => {
    this.setState({toggleJuz: false, togglePage: false, toggleSurah: false});
  };

  looper = () => {
    const runLoop = () => {
      return this.loop();
    };
    setInterval(function () {
      runLoop();
    }, 1000);
  };
  loop = async () => {
    if (this.currentPosition >= this.duration - 1) {
      await this.setState({currentPage: this.state.currentPage + 1});
      this.startSound();
    }

    this.sound1.getCurrentTime(seconds => (this.currentPosition = seconds));
    console.log(this.currentPosition);
  };

  onSetPage = (mushaf, page) => {
    this.props.setCurrentMushafPage([
      {id: mushaf.id, title: mushaf.title, page: page, cover: mushaf.cover},
    ]);

    this.props.libraryType
      ? this.onUpdateCopyAsync(mushaf, page)
      : this.props.setCurrentPage({
          id: mushaf.id,
          title: mushaf.title,
          page: page,
          cover: mushaf.cover,
        });
  };

  onUpdateCopyAsync = (mushaf, page) => {
    const onUpdate = () => {
      this.props.updateCopyPending({page: page, id: mushaf.id});
    };
    return setTimeout(function () {
      onUpdate();
    }, 3000);
  };

  onUpdatePage = () => {
    this.props.setPagesRead(this.pagesRead + 1);
    this.pagesRead = this.pagesRead + 1;
  };
  onSetPagesRead = () => {
    this.onUpdatePage();
    //   const togglePassed = () => {
    //     this.passed3 = !this.passed
    //   }

    //  setTimeout(function(){  togglePassed(), 3000})
  };

  setNote = mushaf => {
    this.props.setCurrentPageNotes({
      id: mushaf.id,
      page: mushaf.page - 1,
      cover: mushaf.cover,
    });
  };
  setPage = (page, mushaf) => {
    if (!this.state.showImages) {
      // this.onSetPage(mushaf,page)
      this.pdf.setPage(parseInt(page));
    }
    this.onSetPage(mushaf, page);
  };

  setFirstPage = page => {
    this.pdf.setPage(parseInt(page));
    this.setState({endFirstPage: false});
  };

  render() {
    const {
      toggleJuz,
      togglePage,
      toggleSurah,
      showMenu,
      toggleAddPageNotes,
      toggleAddBookmark,
      toggleBookmarks,
      togglePageNotes,
      bookmarkTitle,
      name,
      currentMushaf,
      toggleAudio,
      notPaused,
      audioStart,
      message,
      showMessage,
      showShareMes,
    } = this.state;

    return (
      <>
        <View style={styles.container}>
          {this.state.toggleNav ? (
            <>
              <View style={styles.headers}>
                <Text
                  style={styles.links}
                  onPress={() =>
                    this.setState({
                      toggleJuz: true,
                      showMenu: true,
                      togglePage: false,
                      toggleSurah: false,
                    })
                  }
                  style={styles.links}>
                  Para
                </Text>
                <Text
                  onPress={() =>
                    this.setState({
                      toggleJuz: false,
                      showMenu: true,
                      togglePage: false,
                      toggleSurah: true,
                    })
                  }
                  style={styles.links}>
                  Surah
                </Text>
                <Text
                  onPress={() =>
                    this.setState({
                      toggleJuz: false,
                      showMenu: true,
                      togglePage: true,
                      toggleSurah: false,
                    })
                  }
                  style={styles.links}>
                  Page
                </Text>

                <Text onPress={this.onCreateBookmark} style={styles.links}>
                  {' '}
                  bookmarks
                </Text>
                <Text onPress={this.onCreateNote} style={styles.links}>
                  {' '}
                  notes
                </Text>
              </View>
              {this.state.showMenu ? (
                <View style={styles.header}>
                  {this.props.currentMushaf.map(mushaf => (
                    <View key={mushaf.id}>
                      <NavHeader
                        setPage={this.setPage}
                        mushaf={mushaf}
                        toggleJuz={toggleJuz}
                        togglePage={togglePage}
                        toggleSurah={toggleSurah}
                        toggleAddBookmark={toggleAddBookmark}
                        toggleBookmarks={toggleBookmarks}
                        toggleAddPageNotes={toggleAddPageNotes}
                        togglePageNotes={togglePageNotes}
                        addBookmark={this.addBookmarkData}
                        closePage={this.closePage}
                        setNotePage={this.setNote}
                        numberOfPages={this.state.numberOfPages}
                        onNote={this.onCreateNote}
                        onBookmark={this.onCreateBookmark}
                      />
                    </View>
                  ))}
                </View>
              ) : null}
              <View style={styles.audioLink}>
                <Text
                  style={{marginRight: 8, fontFamily: 'System', fontSize: 20}}
                  onPress={() =>
                    this.setState({
                      toggleAddBookmark: !toggleAddBookmark,
                      showMenu: true,
                      toggleBookmarks: false,
                      toggleAddPageNotes: false,
                      togglePageNotes: false,
                    })
                  }>
                  🔖
                </Text>
                <Text
                  style={{marginRight: 8, fontFamily: 'System', fontSize: 20}}
                  onPress={() =>
                    this.setState({
                      toggleAddBookmark: false,
                      showMenu: true,
                      toggleBookmarks: false,
                      toggleAddPageNotes: !toggleAddPageNotes,
                      togglePageNotes: false,
                    })
                  }>
                  {' '}
                  📝
                </Text>
                <Text
                  style={{
                    marginLeft: Dimensions.get('window').width / 1.45,
                    fontFamily: 'System',
                    fontSize: 20,
                  }}
                  onPress={() =>
                    this.setState({toggleAudio: !toggleAudio, showMenu: true})
                  }>
                  🔊
                </Text>
              </View>

              {showMenu && toggleAudio ? (
                <View style={styles.audio}>
                  <Text
                    style={{color: 'red'}}
                    onPress={() => this.setState({toggleAudio: !toggleAudio})}>
                    X
                  </Text>
                  {audioStart ? (
                    notPaused ? (
                      <Text style={styles.controls} onPress={this.resume}>
                        ▶️
                      </Text>
                    ) : (
                      <Text style={styles.controls} onPress={this.pause}>
                        ⏸️
                      </Text>
                    )
                  ) : null}
                  <Text style={styles.controls} onPress={this.startSound}>
                    ⏭️ Play Page
                  </Text>
                  <Text style={styles.controls} onPress={this.stopSound}>
                    ⏹️
                  </Text>
                  <Text style={styles.controls} onPress={this.looper}>
                    🔁 loop pages
                  </Text>
                </View>
              ) : null}
            </>
          ) : null}

          {this.state.showImages ? (
            <View style={styles.container}>
              <ImageBackground
                source={{uri: `asset:/99.jpg`}}
                style={styles.image}>
                <View style={styles.buttonContainer}></View>
              </ImageBackground>
            </View>
          ) : null}

          {showMessage ? (
            <View style={styles.topmessage}>
              <Text
                onPress={() => {
                  this.props.navigation.push('library');
                  this.props.setOpenProfile();
                }}
                style={{marginLeft: 10, fontSize: 15}}>
                {this.props.lastMessage.message}
              </Text>
              <Text
                onPress={() => this.setState({showMessage: false})}
                style={{marginLeft: 10, fontSize: 12, color: 'red'}}>
                x
              </Text>
            </View>
          ) : null}

          {showShareMes ? (
            <View style={styles.topsharemessage}>
              <Text style={{marginLeft: 10, fontSize: 15}}>
                {this.props.shareData[0].name} is requesting copy share:{' '}
              </Text>
              <Text
                onPress={() => {
                  this.setState({showShareMes: false});
                  sendAudioLink(null, currentUser[0].name, 'reject');
                }}
                style={{marginLeft: 10, fontSize: 12, color: 'red'}}>
                reject
              </Text>
              <Text
                onPress={() => {
                  this.setState({showShareMes: false});
                  sendAudioLink(null, currentUser[0].name, 'sharejoined');
                  setCurrentShareMushaf(this.props.shareData.data);
                }}
                style={{marginLeft: 10, fontSize: 12, color: 'green'}}>
                join
              </Text>
            </View>
          ) : null}

          <View
            style={
              this.state.showImages ? styles.pdfHide : styles.containerPdf
            }>
            {this.props.currentMushaf
              ? this.props.currentMushaf.map(mushaf => (
                  <Pdf
                    key={mushaf.id}
                    enablePaging
                    ref={pdf => {
                      this.pdf = pdf;
                    }}
                    enableAnnotationRendering={true}
                    fadeInDuration={100.0}
                    source={this.source}
                    onLoadComplete={(numberOfPages, filePath) => {
                      this.setState({showImages: false});
                      this.setState({currentMushaf: mushaf});
                      if (this.state.endFirstPage) {
                        this.setFirstPage(mushaf.page);
                      }

                      console.log(`number of pages: ${numberOfPages}`);
                      console.log('this', mushaf.page);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                      console.log(`current page: ${page}`);
                      this.setState({numberOfPages: numberOfPages});

                      this.onSetPage(mushaf, page);

                      this.setState({currentMushaf: mushaf});
                      this.setState({currentPage: page});
                      this.props.setCurrentPageNotes(mushaf);
                      this.onSetPagesRead();
                    }}
                    onError={error => {
                      console.log(error);
                      this.setState({showImages: true});
                    }}
                    onPageSingleTap={() => {
                      this.setState({toggleNav: !this.state.toggleNav});
                      this.closeMenu();
                    }}
                    onPressLink={uri => {
                      console.log(`Link presse: ${uri}`);
                    }}
                    style={styles.pdf}
                    spacing={5}
                  />
                ))
              : null}
          </View>
        </View>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setMushafs: mushafData => dispatch(setMushafs(mushafData)),
  setCurrentMushafPage: mushafData =>
    dispatch(setCurrentMushafPage(mushafData)),
  setCurrentPage: mushafData => dispatch(setCurrentPage(mushafData)),
  addBookmark: bookmarkData => dispatch(addBookmark(bookmarkData)),
  setCurrentPageNotes: mushafData => dispatch(setCurrentPageNotes(mushafData)),
  clearCurrentState: () => dispatch(clearCurrentState()),
  updateCopyPending: mushafData => dispatch(updateCopyPending(mushafData)),
  fetchCopiesPending: userid => dispatch(fetchCopiesPending(userid)),
  toggleTimer: () => dispatch(toggleTimer()),
  setPagesRead: pages => dispatch(setPagesRead(pages)),
  setOpenProfile: () => dispatch(setOpenProfile()),
  enterLibrary: () => dispatch(enterLibrary()),
  setCurrentShareMushaf: mushafData =>
    dispatch(setCurrentShareMushaf(mushafData)),
});

const mapStateToProps = createStructuredSelector({
  currentMushaf: selectCurrentMushaf,
  libraryType: selectLibrary,
  currentUser: selectCurrentUser,
  lastMessage: selectLastMessage,
  shareData: selectShareData,
});

export default connect(mapStateToProps, mapDispatchToProps)(Mushaf);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textHover: {
    color: 'white',
    fontSize: 40,
    bottom: 200,
  },
  addButton: {
    color: 'black',
    fontSize: 10,
    flex: 0.1,
    justifyContent: 'flex-start',
    backgroundColor: '#e8d087',
    borderRadius: 50,
    width: Dimensions.get('window').width / 3.2,
    marginLeft: 20,
    marginBottom: 10,
    flexDirection: 'row',
    padding: 7,
  },

  menu: {
    position: 'absolute',
    zIndex: 9999,

    left: Dimensions.get('window').width / 1.13,
  },
  image: {
    flex: 1,

    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  links: {
    marginLeft: 8,
    marginTop: 0,
    justifyContent: 'flex-start',
    zIndex: 90,
    color: '#423f34',
    fontSize: 14,
  },
  headers: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 2,
  },
  audioLink: {
    position: 'absolute',
    zIndex: 999,
    bottom: 10,
    marginLeft: 7,
    flex: 1,
    flexDirection: 'row',
  },
  audio: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    bottom: Dimensions.get('window').height / 2.22,
    position: 'absolute',
    zIndex: 999,
    backgroundColor: '#edddab',
    opacity: 0.9,
    borderRadius: 300,
    padding: 7,
    marginLeft: Dimensions.get('window').width / 5.1,
  },

  controls: {
    marginLeft: 10,
  },
  header: {
    flex: 1.8,
    opacity: 0.9,
  },
  align: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerPdf: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    zIndex: 999,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  pdfHide: {
    height: 1,
    opacity: 0,
  },
  topmessage: {
    position: 'absolute',
    top: 5,
    backgroundColor: 'white',
    padding: 6,
    zIndex: 999,
    borderRadius: 25,
    borderColor: '#e8d087',
    borderWidth: 1,

    marginLeft: 6,
  },
  topsharemessage: {
    position: 'absolute',
    top: 5,
    backgroundColor: 'white',
    padding: 6,
    zIndex: 999,
    borderRadius: 25,
    borderColor: '#e8d087',
    borderWidth: 1,
    right: 5,
  },
});
