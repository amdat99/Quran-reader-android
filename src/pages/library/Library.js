import React, {useState, useEffect,useRef} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import uuid from 'react-native-uuid';


import CopyOffline from '../../components/copy-offline/Copy-offline'
import Profiles from '../../components/profiles/Profiles'
import MessageBox from '../../components/message-box/Message-box'
import TopMessages from '../../components/top-messages/Top-messages';
import AddCopy from '../../components/add-copy/Addcopy';
import MessagePrompt from '../../components/message-prompt/Message-prompt';

import {selectCurrentUser, selectStream, selectMessage, selectTimer, selectLastMessage, selectRoom, selectName, selectOpenMessage,selectShareData} from '../../redux/user/user.selectors';
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
  setLastProfile,
  setCurrentShareMushaf
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

import {getCount,deleteCopy,fetchProfiles,updateStatus,fetchProfilesNum} from './utils'
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
  lastProfile,
  shareData,
  setCurrentShareMushaf
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
 const [countChange, setCountChange] =useState(null)
 const [showMes, setShowMes] = useState(false)
 const [showMessage,setShowMessage] = useState(false)
 const [showTargets,setShowTargets] = useState(false)
 const [targetPages,setTargetPages] = useState(null)
 const [targetTime,setTargetTime] = useState(null)
const[searchField, setSearchField] = useState('')
 const [shareCopy, setShareCopy] = useState(null)
 const [toggleShare, setToggleShare] = useState(false)


// useEffect(() =>{

// fetchProfiles().then(data => setProfileData(data))

// setTimeout(function(){ sendProfileChange() }, 1000);

// },[enterLibrary])

useEffect(() =>{
  setToggleProfiles(false);
},[])

 useEffect(() =>{
   
   setTimeout(function(){  console.log('fetch profiles'); fetchProfiles().then(data => setProfileData(data)) }, 1000);
   setTimeout(function(){  console.log('fetch profiles num'); fetchProfilesNum().then(data => setProfileNumber(data)) }, 1500);
  
 },
 [profileChange, setProfileChange])

 useEffect(() =>{
  getCount().then(data => setUserCount(data))
 },[countChange, setCountChange])

 
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

    
  if (room) initiateSocket(room);
    enterOnCounter((err, data) => {
      if (err) return;
        if(data === 'change'){
         setCountChange(data);
}
        console.log("fetching counter");
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
    addMushaf({id: uuid.v4(), title: mtitle, page: 1,cover: cover,userid:null});
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
  setToggleCopiesType(false)
  setTimeout(function(){ signOutPending();   }, 500);
  setTimeout(function(){ sendProfileChange()  }, 1000);
 
 

}

const resetMessage = () => {
  setTime(0); 
  setTargetPages(null); 
  setTargetTime(null); 
  setPagesRead(1)
  if(timer){
  toggleTimer()
  }
  
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

  const onCopyShare = async (profile) => {
   
    const onShareStatus = () => {
      updateStatus('sharing copy',currentUser[0].userid)
      sendProfileChange()
    }
    // await setShareData({id:id, userid:userid,change:Math.random()});
    setCurrentShareMushaf([shareCopy])
  await setRoom(profile)
    await setTimeout(function(){sendAudioLink(shareCopy,currentUser[0].name,'startshare') }, 1000);
   await onShare(false);
    await onEnterCopy(shareCopy)
     await setTimeout(function(){ onShareStatus()  }, 1000);
  }


  const onEnterShareCopy = () =>{

    setLibraryType(true)
    
    navigation.navigate('Quran');
    sendAudioLink(null,currentUser[0].name,'sharejoined')
    resetMessage()
    toggleTimer()
    updateStatus('sharing copy',currentUser[0].userid)
    sendProfileChange()
  
    
  }

  const onEnterCopy = (mushaf) => {
    if(toggleCopiesType){
      
      setLibraryType(true)
      setCurrentShareMushaf([mushaf])
    }
      else {
    setCurrentMushaf(mushaf.id)
    setLibraryType(false)
      }
    navigation.navigate('Quran');
    resetMessage()
    toggleTimer()

    

    if(currentUser){
      updateStatus('praying',currentUser[0].userid)
      sendProfileChange()
    }}
// const getOnlineNum = () => {
 
// if(profileData){
//     profileData.map(profile =>{
//    let online = 0
//    if(profile.status === 'online'||profile.status === 'praying'){
//      online = online +1
//    }
//    setProfileNumber(online)
//   })}
// }


 const toggleLibraries = () => {
    setToggleCopiesType(!toggleCopiesType)
   }

  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;


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

const filteredProfiles = () => {
  return profileData.filter((message) => {
    return message.name.toLowerCase().includes(searchField.toLowerCase());
  });
};



return (
<>
<ScrollView style={styles.mainContainer}>    
      
{shareData?
  <View style ={styles.topmessage2}>
   <Text>{shareData.name} wants to copy share</Text>
    <Text style ={{color:'green'}} onPress={()=>{setCurrentShareMushaf([shareData.data]); onEnterShareCopy()}}>accept</Text>
    <Text style={{color:'red'}} onPress={()=>{setShareData(null);sendAudioLink(null,currentUser[0].name,'reject') }}>Reject</Text>
  </View>
:null}

  <TopMessages   seconds = {seconds}time = {time} pagesRead={pagesRead} targets = {targets} setTargets = {setTargets} resetMessage = {resetMessage} minutes = {minutes}/>

{/* {currentUser && showMes && lastMessage? 
  currentUser[0].name === name ? null :
  <MessagePrompt lastMessage={lastMessage} openMessage ={openMessage} setLastProfile ={setLastProfile} setShowMes={setShowMes} />
:null
   } */}
  
  <View style={styles.signonText}>
  {userCount?
  currentUser ? (
    <View>
      <Text style={{ position: 'absolute',left: 50}} onPress={onSignOut}> sign out</Text>
    </View>
    ) : (
      <Text onPress={() => navigation.navigate('signon')}>
       signin/register
      </Text>
     ): null}
    
    {currentUser?
    toggleCopiesType ? 
      <Text onPress={toggleLibraries} style={{ position: 'relative' , marginLeft: 10,marginTop:35,backgroundColor: '#e8d087', borderRadius:30,padding:2}} onPress={toggleLibraries}> Set Offline Library </Text>
      :<Text onPress={toggleLibraries} style={{ position: 'relative' , marginLeft:10,marginTop:35,backgroundColor: '#e8d087', borderRadius:30,padding:2}} onPress={toggleLibraries}> Set Online Library </Text>
    :null}

    {userCount ?
    userCount.map((count,i) =>
      <>
        <Text key = {count.count} style={{left:30,position:'absolute',marginTop:3}}> {count.count} users are praying</Text>
        <Text key = {i} style={{left:30,position:'absolute',marginTop:21,     height: 1,
                      backgroundColor: '#e8d087',
                      width: Dimensions.get('window').width/3,}}>
        </Text>
      </>
        )
    :null}
    
    </View>

    { toggleShare ?
  <View style={styles.shareBox}>
    <ScrollView >
  <>
    <Text style={{color:'red',fontSize: 15, marginLeft:'80%'}} onPress={()=>setToggleShare(false)}>close</Text>
    <Text style={{fontSize: 11,marginTop:5}}>When copy sharing your personal copy is shared and an audio link is created.
    </Text>
   
    <Text style={{fontSize: 11,marginTop:4}}>choose user to copy share with:</Text>
  </>
  <TextInput onChangeText={setSearchField} placeholderTextColor ='#383a3d' placeholder={'search user'}/>
  <Text onPress={()=>setSearchField('')} style={{color: 'red',position: 'relative',bottom:15,marginLeft:3,fontSize:11}}>Clear</Text>
    {profileData?   
    filteredProfiles().map(profile=>
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <Text onPress= {()=>{setRoom(profile.profileid); onCopyShare(profile.profileid) }}>{profile.name}</Text>
      { profile.status ==='offline'
      ?<Text style={{marginLeft:'4px'}} onPress= {()=>{setRoom(profile.profileid); onCopyShare(profile.profileid) }} style={{fontSize: 10,color:'red'}}>{profile.status}</Text>
      :<Text style={{marginLeft:'4px'}} onPress= {()=>{setRoom(profile.profileid); onCopyShare(profile.profileid) }} style={{fontSize: 10,color:'green'}}>{profile.status}</Text>
      }
      {profile.status ==='offline' || profile.status === 'sharing copy' ?
      null :
      <Text style={styles.shareButton} onPress= {()=>{setRoom(profile.profileid); onCopyShare(profile.profileid) }}>Share</Text>
      }
   </View>
 )
    : null}
    </ScrollView>
  </View>
:null}
      
    <View style={styles.container}>
      <Text>
    {currentUser?
    toggleCopiesType?
      onlineCopies?
      onlineCopies.map((mushaf, i) => (
            
      <View key={mushaf.id} >

        <CopyOffline mushaf={mushaf} deleteM={deleteM} onEnterCopy={onEnterCopy} 
        setShareCopy={setShareCopy} setToggleShare={setToggleShare} toggleCopiesType ={toggleCopiesType}
        showDelete={showDelete} setShowDelete = {setShowDelete}  toggleTargets = {toggleTargets}/>
     </View>))
     : null
    :null
 

: mushafs?
  mushafs.map((mushaf, i) => (
    <View key={mushaf.id} >
       <CopyOffline mushaf={mushaf} deleteM={deleteM} onEnterCopy={onEnterCopy}  toggleCopiesType ={toggleCopiesType}
      setShareCopy={setShareCopy} showDelete={showDelete} setToggleShare={setToggleShare}
      setShowDelete = {setShowDelete} toggleTargets ={toggleTargets}/>
    </View>))
  :null}
    </Text>
        
    </View>
    
    <View  style={styles.container2 }>
      {toggleCopiesType? null :
       currentUser?
        mushafs.map((mushaf, i) => (
          <View key={mushaf.id} >
             <CopyOffline mushaf={mushaf} deleteM={deleteM} onEnterCopy={onEnterCopy} toggleCopiesType ={toggleCopiesType}
                setToggleShare={setToggleShare}  setShareCopy={setShareCopy}  showDelete={showDelete} 
                setShowDelete = {setShowDelete} toggleTargets ={toggleTargets} />
           </View>
        ))
      :null}
    </View>



  </ScrollView>
    <View  style={styles.addButton}>
      <Text  onPress={() => setToggleOnAdd(!toggleOnAdd)}>
        Add Mushaf
      </Text>
    </View>  

    <AddCopy toggleOnAdd ={toggleOnAdd} setToggleOnAdd={setToggleOnAdd} covers={covers} 
    setCover = {setCover} currentUser = {currentUser} addMushafData = {addMushafData}  setTitle ={setTitle} addOnlineMushafData ={addOnlineMushafData}/>

  {profileData?
  <View style={styles.profile}>
      
      {currentUser && toggleProfiles  && lastMessage?
          <Text style={{fontSize:10,}}> last message: {lastMessage.message} </Text>:null}
          
          { toggleProfiles?<View style={{flex:1, flexDirection: 'row'}}><Text  style={{color:'#c2b280', fontSize:14}}onPress={() =>setToggleProfiles(!toggleProfiles)}>Close Profiles </Text>
          </View>
          : <Text style={{color:'#c2b280', fontSize:14}} onPress={() =>setToggleProfiles(!toggleProfiles)}>Open Profiles </Text>}
                  
          <Text>{profileNumber} users online</Text>
 
           {toggleProfiles?  
           <ScrollView style={{ height: Dimensions.get('window').height /1.5}}>
           <TextInput onChangeText={setSearchField} placeholderTextColor ='#383a3d' placeholder={'search user'}/>
          
    {profileData ?
      filteredProfiles().map(profile=>
   
      
      <Profiles  currentUser={currentUser} setRoom={setRoom} openMessage={openMessage} data={profile} setLastProfile ={setLastProfile}/> 
            )
      : null}
    </ScrollView>
    :null}
  </View>
  :null}


  {messageToggle && currentUser ?
   
      <MessageBox setLastMessage = {setLastMessage} setName = {setName}setMessage={clearChat} initiateSocket = {initiateSocket}  disconnectSocket= {disconnectSocket}setRoom={setRoom} lastProfile={lastProfile} messages={message}  closeMessage={closeMessage} currentUser={currentUser[0]} setRoom={setRoom}/>
  :null}

  {showTargets?
    <View style={styles.target}>
      <Text style={{color:'red',marginLeft:7}}  onPress={toggleTargets}>close</Text>
      <Text style={{marginLeft:7}}>Add Prayer targets</Text>
        <TextInput   keyboardType="numeric"  placeholderTextColor ='#383a3d' placeholder ='How many pages do want to read' onChangeText={setTargetPages} />
        <TextInput   keyboardType="numeric"   placeholderTextColor ='#383a3d' placeholder ='How many minutes do you want to pray for' onChangeText={setTargetTime} />
      <Text style={{marginLeft:7,backgroundColor:'#c2b280',borderRadius:20,padding:2, width:60, textAlign:'center'}} onPress={onSetTargets}>Add</Text>
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
  setCurrentShareMushaf: mushafData => dispatch(setCurrentShareMushaf(mushafData)),

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
  shareData: selectShareData
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
    fontSize: 17,
    height: 40,
    justifyContent: 'flex-end',
    marginBottom: 36,
    backgroundColor: '#e8d087',
    borderRadius: 26,
    padding: 10,
    alignItems: 'center',
    marginLeft: 20,
    width: 110,
    
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
    width:100,
    marginTop: 50,
    padding: 6,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'black',
    right: 0,
    zIndex: 990,
    borderRadius:10
  },

  shareBox:{
    color: 'black',
    fontSize: 10,
 
    width:'60%',
    marginTop: 0,
    padding: 6,
    marginLeft: 50,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'black',
    height: Dimensions.get('window').height/2,
   
    zIndex: 999,
    borderRadius:20
  },

  shareButton: {
    width:60,height:25,borderRadius:20,backgroundColor:'#e8d087', marginLeft:5, 
     padding: 5, borderColor:'white',marginTop:5
  },

    topmessage:{
      position: 'absolute',
      top:20,
      backgroundColor: 'white',
      padding: 6,
      zIndex: 999,
      borderRadius:25,
      borderColor: 'white',
      borderWidth:  1,

      marginLeft:6

    },

    
    topmessage2:{
      position: 'absolute',
      top:20,
      backgroundColor: 'white',
      padding: 6,
      zIndex: 999,
      borderRadius:25,
      borderColor: 'white',
      borderWidth:  1,
      right: 10

    },

  target:{
    color: 'black',
    fontSize: 35,
    position: 'absolute',
    top: 60,
    borderRadius: 26,
    padding: 10,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    shadowColor: 'black',
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  }
});
