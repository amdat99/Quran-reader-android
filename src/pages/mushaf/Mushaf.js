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

import {getOrientation } from '../socket-overlay/Socket-overlay'
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
   setLastProfile,
  setCurrentOnlineMushaf,
  setCurrentShareMushaf,
  setSharePage
} from '../../redux/page/page.actions';
import {
  selectCurrentMushaf,
  selectPagesRead,
  selectSharePage
} from '../../redux/page/page.selectors';
import {
  selectCurrentUser,
  selectLibrary,
  selectLastMessage,
  selectShareData,
  selectOnShare,
  selectPushLibrary
} from '../../redux/user/user.selectors';
import {toggleTimer,openMessage, setRoom, setShareData,onShare} from '../../redux/user/user.actions';
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
      soundPage: '',
      currentPage: '',
      currentMushaf: null,
      toggleAudio: false,
      paused: false,
      toggleTranslation: false,
      audioStart: false,
      numberOfPages: null,
      showMessage: false,
      name: null,
      message: null,
      showShareMes: false,
      shareName:null,
      translationFullscreen: false,
      abovePdf: true
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
    if(this.props.pushLibrary !== prevProps.pushLibrary) {
      this.props.navigation.push('library');
    }
  }

  componentWillUnmount() {
    const {
      clearCurrentState,
      fetchCopiesPending,
      currentUser,
      toggleTimer,
      enterLibrary,
      shareData,
      setRoom,
      setOnShare
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

    if(shareData){
       sendAudioLink(null,currentUser[0].name,'end')
       setRoom(currentUser[0].profileid)
       setOnShare(true)
       this.props.setSharePage(null)
       
    }

    this.pagesRead = 1;
  }

  startSound =  async ()  => {  
    await this.setState({soundPage: this.state.currentPage})
    await this.initialiseAudio()
  }
     initialiseAudio = () => {   
      console.log(this.state.soundPage)
    if (this.sound1) this.sound1.release();
    this.sound1 = new Sound(
        `http://192.248.153.241:3000/assets/page-audio/0${this.state.soundPage}.mp3`,
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
      toggleTranslation: false
    });
    this.toggleTranslationScreenMenu()
  };

  onCreateBookmark = () => {
    this.setState({
      toggleAddBookmark: false,
      showMenu: true,
      toggleBookmarks: !this.state.toggleBookmarks,
      toggleAddPageNotes: false,
      togglePageNotes: false,
      toggleTranslation: false
    });
    this.toggleTranslationScreenMenu()
  };

  onSharePage = (page) => {
    sendAudioLink({page: page, user: this.props.currentUser[0].name},this.props.currentUser[0].name,'page')
  }

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
      await this.setState({soundPage: this.state.soundPage + 1});
      this.startSound();
    }

    this.sound1.getCurrentTime(seconds => (this.currentPosition = seconds));
    console.log(this.currentPosition);
  };

  onSetPage = (mushaf, page) => {
    this.props.setCurrentMushafPage([
      {id: mushaf.id, title: mushaf.title, page: page, cover: mushaf.cover, userid:mushaf.userid},
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
      this.props.updateCopyPending({page: page, id: mushaf.id,userid:mushaf.userid});
    };
    return setTimeout(function () {
      onUpdate();
    }, 3000);
  };

  onSetSharePage = (page) =>{

    const onUpdate = () => {
      this.pdf.setPage(parseInt(page));;
    };

    this.props.setOnShare(false)
    onUpdate()
   setTimeout(function () {
      onUpdate();
    }, 300);

  }

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
  

  onCloseShare = () => {
    const {currentUser,shareData,setRoom,setOnShare} = this.props;
    if(shareData){
      sendAudioLink(null,currentUser[0].name,'end')
      setRoom(currentUser[0].profileid)
      setOnShare(true)
      this.props.setSharePage(null)
   }
  }

  toggleTranslationScreen = () =>{
    this.setState({translationFullscreen: !this.state.translationFullscreen, abovePdf: true})
  }

  toggleTranslationScreenMenu = () =>{
    if(this.state.translationFullscreen){
    this.setState({translationFullscreen: !this.state.translationFullscreen})
    }
  }



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
      currentPage,
      toggleAudio,
      notPaused,
      audioStart,
      message,
      showMessage,
      showShareMes,
      setShareData,
      sendAudioLink,
      toggleTranslation
    } = this.state;
    const{shareData,setCurrentShareMushaf,currentUser,sharePage} = this.props;
    return (
      <>

{this.props.shareData && this.props.onShare?
  <View style ={styles.topmessage}>
    
   <Text>{shareData.name} wants to copy share</Text>
  
    <Text style ={{color:'green'}} onPress={()=>{setCurrentShareMushaf([shareData.data]);this.onSetSharePage(shareData.data.page) }}>accept</Text>
    <Text style={{color:'red'}} onPress={()=>{setShareData(null);sendAudioLink(null,currentUser[0].name,'reject') }}>Reject</Text>
  </View>
:null}

{this.props.onShare? null :
this.props.shareData ? 
<Text onPress={this.onCloseShare} style={{position:'absolute',top:28,zIndex: 999, color:'red', right:10,fontSize: 15}}>Stop share</Text>
:null

}

{!this.props.onShare && this.props.sharePage && currentUser[0].name !== sharePage.name ?
  <Text onPress={this.onCloseShare} style={{position:'absolute',zIndex: 999, color:'black',bottom:0 ,right:10,fontSize: 15}}> {sharePage.user} on page {sharePage.page}</Text>
  :null}



        <View style={styles.container}>
          {this.state.toggleNav ? (
            <>
              <View style={styles.headers}>
                <Text
                  style={styles.links}
                  onPress={() =>{
                    this.setState({
                      toggleJuz: true,
                      showMenu: true,
                      togglePage: false,
                      toggleSurah: false,
                      toggleTranslation: false
                    });
                    this.toggleTranslationScreenMenu()
                  }}
                  style={styles.links}>
                  Para
                </Text>
                <Text
                  onPress={() =>{
                    this.setState({
                      toggleJuz: false,
                      showMenu: true,
                      togglePage: false,
                      toggleSurah: true,
                      toggleTranslation: false
                    });
                    this.toggleTranslationScreenMenu()
                  }}
                  style={styles.links}>
                  Surah
                </Text>
                <Text
                  onPress={() =>{
                    this.setState({
                      toggleJuz: false,
                      showMenu: true,
                      togglePage: true,
                      toggleSurah: false,
                      toggleTranslation: false
                    });
                    this.toggleTranslationScreenMenu()
                  }}
                  style={styles.links}>
                  Page
                </Text>

                <Text
                  onPress={() => 
                    this.setState({toggleTranslation: !toggleTranslation,
                      toggleJuz: false,
                      showMenu: true,
                      togglePage: false,
                      toggleSurah: false,
                      toggleBookmarks: false,
                      toggleAddPageNotes: false,
                      togglePageNotes: false,
                      toggleAddBookmark: false,

                      })}
                  style={styles.links}>
                  Translation
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
              {this.state.showMenu  && this.state.abovePdf ? (
                <View style={styles.header}>
                  { !this.state.translationFullscreen ?
                    <Text onPress={() => this.setState({abovePdf: !this.state.abovePdf, translationFullscreen:false})} style={styles.links}>
                  {' '}
                  🔃                </Text>
  :null}
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
                        shareData={this.props.shareData}
                        currentPage={currentPage}
                        toggleTranslationScreen= {this.toggleTranslationScreen}
                        toggleTranslation={toggleTranslation}
                        abovePdf={this.state.abovePdf}
                        translationFullscreen={this.state.translationFullscreen}
                      />
                    </View>
                  ))}
                </View>
              ) : null}
              <View style={styles.audioLink}>
                <Text
                  style={{marginRight: 8, fontFamily: 'System', fontSize: 20}}
                  onPress={() => {
                    this.setState({
                      toggleAddBookmark: !toggleAddBookmark,
                      showMenu: true,
                      toggleBookmarks: false,
                      toggleAddPageNotes: false,
                      togglePageNotes: false,
                      toggleTranslation: false
                    });
                    this.toggleTranslationScreenMenu()
                  }}>
                  🔖
                </Text>
                <Text
                  style={{marginRight: 8, fontFamily: 'System', fontSize: 20}}
                  onPress={() =>{
                    this.setState({
                      toggleAddBookmark: false,
                      showMenu: true,
                      toggleBookmarks: false,
                      toggleAddPageNotes: !toggleAddPageNotes,
                      togglePageNotes: false,
                      toggleTranslation: false
                    });      
                    this.toggleTranslationScreenMenu()
                  }}>
                  {' '}
                  📝
                </Text>
                <Text
                  style={{
                    marginLeft: Dimensions.get('window').width / 1.45,
                    fontFamily: 'System',
                    fontSize: 20,
                  }}
                  onPress={() => {
                    this.setState({toggleAudio: !toggleAudio, showMenu: true});  this.toggleTranslationScreenMenu()
                  }}>
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

          {/* {showMessage ? (
            <View style={styles.topmessage}>
              <Text
                onPress={() => {
                  this.props.navigation.push('library');
                  this.props.setLastProfile({id: this.props.lastMessage.id,name: this.props.lastMessage.name});
                  this.props.openMessage()
                  this.props.setOpenProfile()
                  this.setState({showMessage: false})
                }}
                style={{marginLeft: 10, fontSize: 15}}>
               message {this.props.lastMessage.name}
              </Text>
              <Text
                onPress={() => this.setState({showMessage: false})}
                style={{marginLeft: 10, fontSize: 12, color: 'red',marginTop:3}}>
                dsimiss
              </Text>
            </View>
          ) : null} */}

          <View
            style={
              this.state.translationFullscreen ? styles.pdfHide : styles.containerPdf
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
                      if(shareData){
                       this.onSharePage(page)
                      }
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
                    style={ this.state.showImages ? styles.pdfHide : styles.pdf}
                    spacing={5}
                  />
                ))
              : null}
          </View>
          </View>
          {this.state.showMenu && !this.state.abovePdf ? (
                <View style={styles.header2}>
                  {!this.state.translationFullscreen?
                  <Text onPress={() => this.setState({abovePdf: !this.state.abovePdf,translationFullscreen:false})} style={styles.links}>
                  {' '}
                  🔃  
                </Text>
  :null}
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
                        shareData={this.props.shareData}
                        toggleTranslationScreen= {this.toggleTranslationScreen}
                        currentPage={currentPage}
                        toggleTranslation={toggleTranslation}
                        translationFullscreen={this.state.translationFullscreen}
                        abovePdf={this.state.abovePdf}
                      />
                    </View>
                  ))}
                </View>
              ) : null}
       
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
    setLastProfile: (data) => dispatch(setLastProfile(data)),
    openMessage:() => dispatch(openMessage()),
  setShareData:(data) => dispatch(setShareData(data)),
  setRoom: (room) => dispatch(setRoom(room)),
  setOnShare:(bool) => dispatch(onShare(bool)),
  setSharePage:(page) => dispatch(setSharePage(page)),
});

const mapStateToProps = createStructuredSelector({
  currentMushaf: selectCurrentMushaf,
  libraryType: selectLibrary,
  currentUser: selectCurrentUser,
  lastMessage: selectLastMessage,
  shareData: selectShareData,
  onShare: selectOnShare,
  sharePage: selectSharePage,
  pushLibrary: selectPushLibrary
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
    zIndex: 995,

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
    zIndex: 997,
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
    zIndex: 997,
    backgroundColor: '#edddab',
    opacity: 0.9,
    borderRadius: 300,
    padding: 7,
    left: Dimensions.get('window').width / 5.1,
  },

  controls: {
    marginLeft: 10,
  },
  header: {
    flex: 1.8,
    opacity: 0.9,
  },

  header2: {
    flex: 1,
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
    flex: 1.1,
    zIndex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  pdfHide: {
    height: 1,
    zIndex: 1,
    opacity: 0,
    
  },
  topmessage: {
    position: 'absolute',
    top: 5,
    backgroundColor: 'white',
    padding: 6,
    zIndex: 997,
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
