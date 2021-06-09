import React, {useState, useEffect,useRef} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import uuid from 'react-native-uuid';


import CopyOffline from '../../components/copy-offline/Copy-offline'
import Profiles from '../../components/profiles/Profiles'
import MessageBox from '../../components/message-box/Message-box'
import TopMessages from '../../components/top-messages/Top-messages';
import AddCopy from '../../components/add-copy/Addcopy';

import {selectCurrentUser, selectStream, selectMessage, selectTimer, selectLastMessage, selectRoom, selectName, selectOpenMessage} from '../../redux/user/user.selectors';
import {
  addMushaf,
  setMushafs,
  setCurrentMushaf,
  setBookmarks,
  setNotes,
  fetchCopiesPending,
  setCopiesPending,
  setCurrentOnlineMushaf,
  setPagesRead,
  setTargets,
  setLastProfile
} from '../../redux/page/page.actions';

import {selectMushafs, selectLibrary,  selectOpenProfile, selectOnlineMushafs, selectBookmarks, selectNotes,selectPagesRead , selectLastP, selectTargets} from '../../redux/page/page.selectors';
import {signOutPending,setLibraryType,toggleTimer,setRoom, setLastMessage, clearChat,setName,onShare,setShareData,  closeMessage, openMessage} from '../../redux/user/user.actions';
import { mediaDevices, RTCView } from 'react-native-webrtc';

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
  Dimensions
} from 'react-native';

import {getCount,deleteCopy,fetchProfiles,updateStatus} from './utils'
import {enterOnCounter, enterProfileChange,sendAudioLink, sendProfileChange, initiateSocket, enterChat,disconnectSocket} from '../../sockets/sockets'

import { add } from 'react-native-reanimated';

function Library({
  mushafs,
  addMushaf,
  setCurrentMushaf,
  setMushafs,
  navigation,
  currentUser,
  signOutPending,
  notes,
  bookmarks,
  setNotes,
  setBookmarks,
  onlineCopies,
  setCopiesPending,
  fetchCopiesPending,
  setCurrentOnlineMushaf,
  setLibraryType,
  toggleTimer,
  timer,
  setRoom,
  room,
  pagesRead,
  setPagesRead,
  targets,
  setTargets,
  setLastMessage,
  message,
  openProfile,
  name,
  clearChat,
  lastMessage,
  setName,
  enterLibrary,
  stream,
  onShare,
  closeMessage,
  openMessage,
  setLastProfile,
  setShareData,
  messageToggle,
  lastProfile
}) {


  const [toggleOnAdd, setToggleOnAdd] = useState(false);
  const [mtitle, setTitle] = useState(undefined);
  const[cover,setCover] = useState(undefined);
  const [showDelete,setShowDelete] = useState(false);
  const [userCount,setUserCount] = useState(undefined);
  const [toggleCopiesType,setToggleCopiesType] = useState(false);
 const [time, setTime] = useState(0);
 const [profileData, setProfileData] = useState(undefined);
 const [toggleProfiles, setToggleProfiles] = useState(false);
 const [profileNumber, setProfileNumber] = useState(0)
 const [profileChange, setProfileChange] = useState(null)
 const [showMes, setShowMes] = useState(false)
 const [showMessage,setShowMessage] = useState(false)
 const [showTargets,setShowTargets] = useState(false)
 const [targetPages,setTargetPages] = useState(null)
 const [targetTime,setTargetTime] = useState(null)

 const [shareCopy, setShareCopy] = useState(null)
 const [toggleShare, setToggleShare] = useState(false)


// useEffect(() =>{

// fetchProfiles().then(data => setProfileData(data))

// setTimeout(function(){ sendProfileChange() }, 1000);

// },[enterLibrary])


 useEffect(() =>{
   
   setTimeout(function(){  console.log('fetch profiles'); fetchProfiles().then(data => setProfileData(data)) }, 1000);

   setTimeout(function(){  getOnlineNum() }, 2000);
 },
 [profileChange, setProfileChange])

 
 useEffect(() =>{
 
  
   timer ? null
    // :setTimeout(function(){  resetMessage()}, 9000); 
    :null
   
 },[timer])

 
 
  
 useEffect(()=>{
   if(timer){
  let myInterval = setInterval(() => {
         
  setTime(time +1);}, 1000)
      return ()=> {
          clearInterval(myInterval);
        };
      }
  });

  
  useEffect(() =>{setShowDelete(false)},[])

  useEffect(() => {
    getCount().then(data => setUserCount(data)) 
    },[])

  useEffect(() =>{ 
    fetchProfiles().then(data => setProfileData(data))
  
  },[currentUser])

  useEffect(() =>{
    if(profileData){
         getOnlineNum()
    }
  },[profileData])

  useEffect(() =>{ 

    
  if (room) initiateSocket(room);
    enterOnCounter((err, data) => {
      if (err) return;
        if(data === 'change'){
          getCount().then(data => setUserCount(data))
}
        console.log("fetching user counters");
      })

       enterProfileChange  ((err, data)  =>{
        if (err) return;
        console.log('profiles',data)
                setProfileChange(data)
        
      })

    },[room])


useEffect(() =>{
    if(currentUser){
      fetchCopiesPending(currentUser[0].contentid)
      

      
      setToggleCopiesType(true)
    }
  }
  ,[currentUser])
 
  useEffect(() => {
    if(lastProfile){
      console.log(lastProfile.name)
    }
  },[lastProfile])
useEffect(() => {
  toggleMessage()
},[lastMessage,name])

   useEffect(() =>{
      setToggleProfiles(true)
   },[openProfile])

  const covers = [
    {id:1, src: true},
    {id:2, src: true},
    {id:3, src: true},
    {id:4, src: true},
    {id:5, src: true},
  ]

let currentMushafs;
  let currentBoomarks
  let currentNotes

 
const addMushafData = async () => {
    if (!mtitle || !cover) {
     
      Alert.alert(' input error', ' Please fill out all the inputs', [], {
        cancelable: true,
      });
      return;
    }
    addMushaf({id: uuid.v4(), title: mtitle, page: 1,cover: cover});
    setTitle(undefined)
    setCover(undefined)

  setToggleOnAdd(false)

  };

  const toggleMessage = () => {
    setShowMes(true)
    setTimeout(function(){  setShowMes(false) }, 8000);
}
  const addOnlineMushafData = async () => {
    if (!mtitle || !cover) {
     
      Alert.alert(' input error', ' Please fill out all the inputs', [], {
        cancelable: true,
      });
      return;
    }
    setCopiesPending({id: uuid.v4() ,userId: currentUser[0].contentid,transformId: currentUser[0].userid, title: mtitle, page: 1,cover: cover, source:'test'});
    setTitle(undefined)
    setCover(undefined)

  setToggleOnAdd(false)

  setTimeout(function(){  fetchCopiesPending(currentUser[0].contentid) }, 500);
};

const onSignOut = () => {
  updateStatus('offline',currentUser[0].userid)
  setRoom(123)
  setProfileNumber(0)
  setTimeout(function(){ signOutPending();   }, 500);
  setTimeout(function(){ sendProfileChange()  }, 1000);
 
 

}

const resetMessage = () => {
  setTime(0); 
  setTargetPages(null); 
  setTargetTime(null); 
  setPagesRead(1)
  
}
  const deleteM = deletion => {

    if(toggleCopiesType){ 
      deleteCopy(deletion.id)
    
        if(currentUser){  
          setTimeout(function(){
          fetchCopiesPending(currentUser[0].contentid)
          setToggleCopiesType(true)
        }, 500);
      }

    } else{
    currentMushafs = mushafs.filter(mushaf => mushaf !== deletion);
    currentBoomarks = bookmarks.filter(boomark => boomark.id !== deletion.id)
    currentNotes = notes.filter(note => note.id !== deletion.id)
    
    setMushafs(currentMushafs);
    setNotes(currentNotes);
    setBookmarks(currentBoomarks)
    }

    setShowDelete(false);
  };

  const onCopyShare = async () => {
   
    // await setShareData({id:id, userid:userid,change:Math.random()});
    await setRoom
    await sendAudioLink(shareCopy,currentUser[0].name,'startshare')
   await onShare(true);
    await onEnterCopy(shareCopy.id)
  }


  const onEnterCopy = (id) => {
    if(toggleCopiesType){
      setCurrentOnlineMushaf(id)
      setLibraryType(true)}
      else {
    setCurrentMushaf(id)
    setLibraryType(false)
      }
    navigation.navigate('Quran');
    resetMessage()
    toggleTimer()
    

    if(currentUser){
      updateStatus('praying',currentUser[0].userid)
      sendProfileChange()
    }}
const getOnlineNum = () => {
 
if(profileData){
    profileData.map(profile =>{
   let online = 0
   if(profile.status === 'online'||profile.status === 'praying'){
     online = online +1
   }
   setProfileNumber(online)
  })}
}


 const toggleLibraries = () => {
    setToggleCopiesType(!toggleCopiesType)
   }

  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;

  const onNotSignedIn = () => {
  Alert.alert(' live chat', ' sign in to send messages', [], {
    cancelable: true,
   }) 

   setShowMessage(false)
}

const toggleTargets = () => {
  setShowTargets(!showTargets)
}

const onSetTargets = () => {

  if(!targetTime || !targetPages){
    return
  }
  setTargets({spages: targetPages, time:targetTime})
  toggleTargets(); 
  setShowDelete(false)
}

  console.log(lastProfile)


  return (
    <>
      <ScrollView style={styles.mainContainer}>    
      
      


    <TopMessages   seconds = {seconds}time = {time} pagesRead={pagesRead} targets = {targets} setTargets = {setTargets} resetMessage = {resetMessage} minutes = {minutes}/>
      

{ currentUser && showMes && lastMessage? 
currentUser[0].name === name ? null :



<View style ={styles.topmessage}>
    <Text onPress={()=> {setLastProfile({id:lastMessage.id, name:lastMessage.name}); openMessage()}} style={{marginLeft:10 ,fontSize:15}}> {lastMessage.message}</Text>
    <Text  onPress={() => setShowMes(false)} style={{marginLeft:10 ,fontSize:12, color:'red'}}>x</Text>
   </View> 
   :null
   }
        <View style={styles.signonText}>
          {userCount?
          currentUser ? (
            <View>
              <Text style={{ position: 'absolute',left: Dimensions.get('window').width/5.5}} onPress={onSignOut}> sign out</Text>
            </View>
          ) : (
            <Text onPress={() => navigation.navigate('signon')}>
              signin/register
            </Text>
          ): null}
          {currentUser?
        
          toggleCopiesType ? 
          <Text onPress={toggleLibraries} style={{ position: 'relative' , left:Dimensions.get('window').width/20,marginTop:35,backgroundColor: '#e8d087', borderRadius:30,padding:2}} onPress={toggleLibraries}> Set Offline Library </Text>
          :<Text onPress={toggleLibraries} style={{ position: 'relative' , left:Dimensions.get('window').width/20,marginTop:35,backgroundColor: '#e8d087', borderRadius:30,padding:2}} onPress={toggleLibraries}> Set Online Library </Text>
       
          
    
            :null}
        {userCount ?
        userCount.map((count,i) =>
          <>
          <Text key = {count.count} style={{left:30,position:'absolute',marginTop:3}}> {count.count} users are praying</Text>
          <Text key = {i} style={{left:30,position:'absolute',marginTop:21,     height: 1,
                      backgroundColor: '#e8d087',
                      width: Dimensions.get('window').width/3,}}></Text>
          </>
        )
        :null}
    
        </View>
        <View style={styles.container}>
          
          <Text>
    {currentUser?
    toggleCopiesType?
    onlineCopies?
    onlineCopies.map((mushaf, i) => (
            
  <View key={mushaf.id} >

   <CopyOffline mushaf={mushaf} deleteM={deleteM} onEnterCopy={onEnterCopy} 
  setShareCopy={setShareCopy} setToggleShare={setToggleShare}
    showDelete={showDelete} setShowDelete = {setShowDelete}  toggleTargets = {toggleTargets}/>
  </View>))

  : null
 
:null
 

: mushafs?
  mushafs.map((mushaf, i) => (
            
    <View key={mushaf.id} >
     <CopyOffline mushaf={mushaf} deleteM={deleteM} onEnterCopy={onEnterCopy} 
     setShareCopy={setShareCopy} showDelete={showDelete} setToggleShare={setToggleShare}
     setShowDelete = {setShowDelete} toggleTargets ={toggleTargets}/>
    </View>))
  :null}
 
  


          </Text>
        </View>

    <View  style={styles.container2 }>
        { toggleCopiesType? null :
      currentUser?
mushafs.map((mushaf, i) => (
            
            <View key={mushaf.id} >
             <CopyOffline mushaf={mushaf} deleteM={deleteM} onEnterCopy={onEnterCopy} 
                setToggleShare={setToggleShare}  setShareCopy={setShareCopy}  showDelete={showDelete} 
                setShowDelete = {setShowDelete} toggleTargets ={toggleTargets} />
       
              </View>
   
    
            ))
:null}</View>

{ toggleShare ?
<View style={styles.shareBox}>
  <>
  <Text onPress={()=>setToggleShare(false)}>x</Text>
  <Text>choose user to copy share with:</Text>
  </>
  {profileData?   
  profileData.map(profile=>

   <>
 
    <Text onPress= {()=>{setRoom(profile.profileid); onCopyShare() }}>{profile.name}</Text>
    <Text  onPress= {()=>{setRoom(profile.profileid); onCopyShare() }} style={{fontSize: 10,color:'green'}}>{profile.status}</Text>
   </>
 )
    : null}
  </View>
:null}

      </ScrollView>
      <View  style={styles.addButton}>
      <Text
      
        onPress={() => setToggleOnAdd(!toggleOnAdd)}>
        Add Mushaf
      </Text>

    
</View>  

<AddCopy toggleOnAdd ={toggleOnAdd} setToggleOnAdd={setToggleOnAdd} covers={covers} 
setCover = {setCover} currentUser = {currentUser} addMushafData = {addMushafData}  setTitle ={setTitle} addOnlineMushafData ={addOnlineMushafData}/>

     
     
      { profileData?
     
               <View style={styles.profile}>
                 {currentUser && toggleProfiles  && lastMessage?
                 <Text style={{fontSize:9,}}> last message: {lastMessage.message} </Text>:null}
                { toggleProfiles?<Text  style={{color:'#c2b280'}}onPress={() =>setToggleProfiles(!toggleProfiles)}>Profiles -</Text>
                  : <Text style={{color:'#c2b280'}} onPress={() =>setToggleProfiles(!toggleProfiles)}>Profiles +</Text>}
                  <Text>{profileNumber} users online</Text>
                 <ScrollView>
           {profileData ?
           profileData.map(profile=>
            toggleProfiles? <Profiles setRoom={setRoom} openMessage={openMessage} data={profile} setLastProfile ={setLastProfile}/> : null
            )
          :null}
         </ScrollView></View>
:null}


{messageToggle ?
currentUser?
<MessageBox setLastMessage = {setLastMessage} setName = {setName}setMessage={clearChat} initiateSocket = {initiateSocket}  disconnectSocket= {disconnectSocket}setRoom={setRoom} lastProfile={lastProfile} messages={message}  closeMessage={closeMessage} currentUser={currentUser[0]} setRoom={setRoom}/>

: onNotSignedIn()
:null
}
{showTargets?
  <View style={styles.target}>
    <Text  onPress={toggleTargets}>x</Text>
    <Text>Add Prayer targets</Text>
    <TextInput   keyboardType="numeric" placeholder ='How many pages do want to read' onChangeText={setTargetPages} />
    <TextInput   keyboardType="numeric" placeholder ='How many minutes do you want to pray for' onChangeText={setTargetTime} />
    <Text onPress={onSetTargets}>Add</Text>
  </View>
:null}
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  addMushaf: mushafData => dispatch(addMushaf(mushafData)),
  setMushafs: mushafData => dispatch(setMushafs(mushafData)),
  signOutPending: () => dispatch(signOutPending()),
  setCurrentMushaf: mushafId => dispatch(setCurrentMushaf(mushafId)),
  setCurrentOnlineMushaf: mushafId => dispatch(setCurrentOnlineMushaf(mushafId)),
  setNotes: (noteData) => dispatch(setNotes(noteData)),
  setBookmarks: (bookmarkData) => dispatch(setBookmarks(bookmarkData)),
  fetchCopiesPending: (userid) => dispatch(fetchCopiesPending(userid)),
  setCopiesPending: (copyData) => dispatch(setCopiesPending(copyData)),
  setLibraryType: (type) => dispatch(setLibraryType(type)),
  toggleTimer: () => dispatch(toggleTimer()),
  setRoom: (room ) => dispatch(setRoom(room)),
  setPagesRead: (pagesRead) => dispatch(setPagesRead(pagesRead)),
  setTargets: (targets) => dispatch(setTargets(targets)),
  setLastMessage: (message) => dispatch(setLastMessage(message)),
  clearChat: () => dispatch(clearChat()),
  setName: (name) => dispatch(setName(name)),
  onShare :(bool) => dispatch(onShare(bool)),
  setShareData: (shareData) => dispatch(setShareData(shareData)),
  setLastProfile: (data) => dispatch(setLastProfile(data)),
  closeMessage:() => dispatch(closeMessage()),
  openMessage:() => dispatch(openMessage()),
});

const mapStateToProps = createStructuredSelector({
  mushafs: selectMushafs,
  currentUser: selectCurrentUser,
  notes: selectNotes,
  bookmarks: selectBookmarks,
  onlineCopies: selectOnlineMushafs,
  timer: selectTimer,
  room: selectRoom,
  pagesRead: selectPagesRead,
  targets: selectTargets,
  openProfile: selectOpenProfile,
  message: selectMessage,
  name: selectName,
  lastMessage: selectLastMessage,
  enterLibrary: selectLibrary,
  stream: selectStream,
  lastProfile: selectLastP,
  messageToggle: selectOpenMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(Library);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    
  },
  container: {
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  container2: {
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    position: 'relative', 
    bottom:20
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    bottom: 200,
  },

  addButton: {
    color: 'black',
    fontSize: 15,
    height: 30,
    justifyContent: 'flex-end',
    marginBottom: 36,
    backgroundColor: '#e8d087',
    borderRadius: 26,
    padding: 4,
    alignItems: 'center',
    marginLeft: 20,
    width: 100,
    
  },
  image: {
    width: 85,
    height: 110,
    marginTop: 30,
    marginLeft: 30,
  },
  addMushaf: {
    color: 'black',
    fontSize: 22,
    position: 'absolute',
    top: 55,
    borderRadius: 26,
    height: Dimensions.get('window').height/2,
    width: Dimensions.get('window').width/1.2,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'black',
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  align: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  signonText: {
    color: 'black',
    fontSize: 12,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    marginRight: 34,
  },

  coverButton:{
     marginLeft:30,
  },
  profile:{
    color: 'black',
    fontSize: 10,
    position: 'absolute',
    bottom: 25,
    width:110,
    marginTop: 50,
    padding: 6,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'black',
    right: 0,
    zIndex: 999,
    borderRadius:10
  },

  shareBox:{
    color: 'black',
    fontSize: 10,
    position: 'absolute',
    width:'50%',
    marginTop: 50,
    padding: 6,
    marginLeft: 50,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'black',
    height: Dimensions.get('window').height/1.5,
    zIndex: 999,
    borderRadius:10
  },

    topmessage:{
      position: 'absolute',
      top:20,
      backgroundColor: 'white',
      padding: 6,
      zIndex: 999,
      borderRadius:25,
      borderColor: '#e8d087',
      borderWidth:  1,

      marginLeft:6

    },

  target:{
    color: 'black',
    fontSize: 35,
    position: 'absolute',
    top: 60,
    borderRadius: 26,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'black',
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  }
});
