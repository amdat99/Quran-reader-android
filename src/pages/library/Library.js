import React, {useState, useEffect,useRef} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import uuid from 'react-native-uuid';

import CopyOffline from '../../components/copy-offline/Copy-offline'

import {selectCurrentUser, selectTimer} from '../../redux/user/user.selectors';
import {
  addMushaf,
  setMushafs,
  setCurrentMushaf,
  setBookmarks,
  setNotes,
  fetchCopiesPending,
  setCopiesPending,
  setCurrentOnlineMushaf
} from '../../redux/page/page.actions';

import {selectMushafs, selectOnlineMushafs, selectBookmarks, selectNotes,  } from '../../redux/page/page.selectors';
import {signOutPending,setLibraryType,toggleTimer} from '../../redux/user/user.actions';

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
  Button,
  Dimensions
} from 'react-native';

import {getCount,deleteCopy} from './utils'
import {enterOnCounter} from '../../sockets/sockets'

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
  timer
}) {

  const minutesToMilis = (time) => { 
    return time * 1000 * 60
   }

  const [toggleOnAdd, setToggleOnAdd] = useState(false);
  const [mtitle, setTitle] = useState(undefined);
  const [currentCover,setCurrentCover] = useState(undefined);
  const[cover,setCover] = useState(undefined);
  const [showDelete,setShowDelete] = useState(false);
  const [userCount,setUserCount] = useState(0);
  const [toggleCopiesType,setToggleCopiesType] = useState(false);
 const [time, setTime] = useState(0);

 
 useEffect(() =>{
 
  
   timer ? null
    :setTimeout(function(){   setTime(0)}, 6000);
   
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

  useEffect(() => {getCount().then(data => setUserCount(data)) },[])

  useEffect(() =>{ 
    enterOnCounter((err, data) => {
      if (err) return;
        if(data === 'change'){
          getCount().then(data => setUserCount(data))
}
        console.log("fetching user counters");
      })
    })
  

useEffect(() =>{
    if(currentUser){
      fetchCopiesPending(currentUser[0].contentid)
      setToggleCopiesType(true)
    }
  }
  ,[currentUser])
 

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

  const onEnterCopy = (id) => {
    if(toggleCopiesType){
      setCurrentOnlineMushaf(id)
      setLibraryType(true)}
      else {
    setCurrentMushaf(id)
    setLibraryType(false)
      }
    navigation.navigate('Quran');
    toggleTimer()
 
 
    
  }


 
  const toggleLibraries = () => {
    setToggleCopiesType(!toggleCopiesType)
   
  }

  console.log(time)
  return (
    <>
      <ScrollView style={styles.mainContainer}>
        {time> 3 && time< 6000?
        time > 60 ?
        <Text style={{marginLeft: 5, fontSize:13,marginBottom:5}}>Subhanllah you prayed for {(time / 60).toFixed(2)} minutes. keep it up. </Text>
        : <Text style={{marginLeft: 5,fontSize:13,marginBottom:5}}>Alhamdulillah you were praying for {time} seconds </Text>
        :null}
        {time> 6000 ?
             <Text style={{marginLeft: 5, fontSize:13,marginBottom:5}}>Allahuakbar wow! you prayed for {(time / 60).toFixed(2)} minutes. keep it up. </Text>
        :null}
        <View style={styles.signonText}>
          {currentUser ? (
            <View>
              <Text style={{ position: 'absolute',left: Dimensions.get('window').width/5.5}} onPress={signOutPending}> sign out</Text>
            </View>
          ) : (
            <Text onPress={() => navigation.navigate('signon')}>
              signin/register
            </Text>
          )}
          {currentUser?
        
          toggleCopiesType ? 
          <Text onPress={toggleLibraries} style={{ position: 'relative' , left:Dimensions.get('window').width/20,marginTop:25,backgroundColor: '#e8d087', borderRadius:30,padding:2}} onPress={toggleLibraries}> Set Offline Library </Text>
          :<Text onPress={toggleLibraries} style={{ position: 'relative' , left:Dimensions.get('window').width/20,marginTop:25,backgroundColor: '#e8d087', borderRadius:30,padding:2}} onPress={toggleLibraries}> Set Online Library </Text>
       
          
    
            :null}
        {userCount ?
        userCount.map((count,i) =>
          <>
          <Text key = {count.count} style={{left:30,position:'absolute',marginTop:3}}> {count.count} users are praying</Text>
          <Text key = {i} style={{left:35,position:'absolute',marginTop:21,     height: 1,
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
    onlineCopies.map((mushaf, i) => (
            
  <View key={mushaf.id} >

   <CopyOffline mushaf={mushaf} deleteM={deleteM} onEnterCopy={onEnterCopy}
   showDelete={showDelete} setShowDelete = {setShowDelete} />
  </View>))

  :
      mushafs?
  mushafs.map((mushaf, i) => (
            
    <View key={mushaf.id} >
     <CopyOffline mushaf={mushaf} deleteM={deleteM} onEnterCopy={onEnterCopy}
     showDelete={showDelete} setShowDelete = {setShowDelete} />
    </View>))
:null


: mushafs.map((mushaf, i) => (
            
            <View key={mushaf.id} >
             <CopyOffline mushaf={mushaf} deleteM={deleteM} onEnterCopy={onEnterCopy}
             showDelete={showDelete} setShowDelete = {setShowDelete} />
       
              </View>
   
    
            ))
}
          </Text>
        </View>
        <></>
      </ScrollView>
      <Text
        style={styles.addButton}
        onPress={() => setToggleOnAdd(!toggleOnAdd)}>
        Add Mushaf
      </Text>

      {toggleOnAdd ? (
        <View style={styles.addMushaf} minimumValue={0} maximumValue={100}>
          <Text>Add title</Text>
          <Text onPress={() => setToggleOnAdd(false)} style={styles.closeBox}>
            close
          </Text>
          <TextInput
            style={{marginBottom: 10,}}
            placeholder="Mushaf title"
            onChangeText={setTitle}
          /><Text style={{marginBottom:10}}>choose cover:</Text>
          <View style={styles.coverButtons}>
            
          {covers.map(cover => (
            
            <View  key = {cover.id} >
            <TouchableOpacity onPress = {() =>setCover(cover.id)}>
              <View >
              <Image style={{marginLeft:'9%' ,width:40 ,height:50,position:'relative',left: '60%'}}
                source={{uri:`asset:/cover${cover.id}.png`}}
               
                
            />
            </View>
            </TouchableOpacity>
            </View>
          ))}</View>
         
         { currentUser
          ?
          <>
          <Text style={{marginRight:10,marginTop:20,zIndex:999}} onPress={addMushafData}>Add offline copy</Text>
          <Text style={{marginTop:10,zIndex:999}} onPress={addOnlineMushafData}>Add online copy </Text>
          </>
          : <Text style={{marginTop:20,zIndex:999}} onPress={addMushafData}>Add</Text>
         }
        </View>
      ) : null}
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
});

const mapStateToProps = createStructuredSelector({
  mushafs: selectMushafs,
  currentUser: selectCurrentUser,
  notes: selectNotes,
  bookmarks: selectBookmarks,
  onlineCopies: selectOnlineMushafs,
  timer: selectTimer,
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
    fontSize: 35,
    position: 'absolute',
    top: 50,
    borderRadius: 26,
    padding: 67,
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
  closeBox: {
    color: 'red',
    position: 'absolute',
    right: 20,
    fontSize: 17,
  },
  signonText: {
    color: 'black',
    fontSize: 12,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    marginRight: 34,
  },
  coverButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    
  },
  coverButton:{
     marginLeft:30,
  }
});
