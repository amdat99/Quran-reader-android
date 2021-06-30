import React, {useEffect, useState} from 'react';
import PushNotification,{Importance} from 'react-native-push-notification';
import AudioLink from './Audiolink';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  selectCurrentUser,
  selectRoom,
  shareData,
} from '../../redux/user/user.selectors';
import {
  initiateSocket,
  enterChat,
  sendAudioLink,
  enterAudioLink,
  enterOfferOrAnswer,
  sendOfferOrAnswer,
  enterCandidate,
  sendCand
} from '../../sockets/sockets';
import {setShareChange, setSharePage, setLastProfile} from '../../redux/page/page.actions';
import {
  setLastMessage,
  setMessage,
  setName,
  setStream,
  setShareData,
  setPushLibrary,
  openMessage
} from '../../redux/user/user.actions';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';

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
  Dimensions,
} from 'react-native';
import {set} from 'react-native-reanimated';

export const getOrientation = () => {
  if (Dimensions.get('window').screen.width > Dimensions.get('window').screen.height) {
    return 'LANDSCAPE';
  }else {
    return 'PORTRAIT';
  }
}

function SocketOverlay({
  currentUser,
  room,
  setLastMessage,
  setMessage,
  setName,
  setStream,
  setPushLibrary,
  setShareData,
  setShareChange,
  setSharePage,
  openMessage, 
  setLastProfile 
}) {
  const [stream, setOnStream] = useState(null);
  const [rStream, setRStream] = useState(null);
  const [onReq, setOnReq] = useState(null);
  const [messageData, setMessageData] = useState(null);
  const [remoteSdp, setRemoteSdp] = useState(null);
  const [candidates, setCandidates] = useState(null);
  const [lastCopy, setLastCopy] = useState(null);
  const [onSdp, setOnSdp] = useState(null);
  const [sender, setSender] = useState(false);

  const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};
  const pc = new RTCPeerConnection(configuration);

  PushNotification.createChannel(
    {
      channelId: "channel-id", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
  PushNotification.configure({
    onRegister: function (token) {

    },

    onNotification: function (notification) {
    

      if(notification.title === 'user left'){
        return
      }
      if(notification.title !== 'copy share request'){
      setLastProfile({id:notification.messageId.toString(), name:notification.title}); 
      openMessage();
      }
      
     setPushLibrary(Math.random())
     
    },
      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
    //   notification.finish(PushNotificationIOS.FetchResult.NoData);
    // },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      
    },

    // // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    // onRegistrationError: function (err) {
    //   console.error(err.message, err);
    // },

    // // IOS ONLY (optional): default: all - Permissions to register.
    // permissions: {
    //   alert: true,
    //   badge: true,
    //   sound: true,
    // },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    // requestPermissions: true,
  });

  const sendMessage = (title,message,id) => {
   
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: "channel-id", // (required) channelId, if the channel doesn't exist, notification will not trigger.
      messageId: id,
      title: title, // (optional)
      message: message, // (required)
    });
  };

  useEffect(() => {

    setPushLibrary(null)
    const start = async () => {
      console.log('start');
      if (!stream) {
        let s;
        try {
          s = await mediaDevices.getUserMedia({audio: true, video: false});
          setOnStream(s);
          pc.addStream(s);
          console.log(s);
        } catch (e) {
          console.error(e);
        }
      }
    };
    start();
    pc.onicecandidate = e => {
      if (e.candidate) {
        sendCand(e.candidate);
        this.remoteCandidates = [e.candidate];
      }
    };
  }, []);


  useEffect(() => {
 if(messageData){
    setLastMessage({
        message: messageData.name + ': ' + messageData.message,
        id: messageData.profile,
        name: messageData.name,
      });

      console.log(messageData.profile)
      setMessage({name: messageData.name, message: messageData.message});
      if(currentUser[0].name !== messageData.name){
      sendMessage(messageData.name+':', messageData.message, messageData.profile)
      console.log('ii', parseInt(messageData.profile))
      }
      setName(messageData.name);
    }
  },[messageData, setMessageData])


  useEffect(() => {
    initiateSocket(room);
    console.log('connecting socket ' + room);

    enterChat((err, data) => {
      if (err) return;
      setMessageData(data)
    });

    enterAudioLink((err, data) => {
      if (err) return;
      setOnReq(data);
    });

   
  }, [room]);


  // useEffect(() => {

  //   if (onSdp && currentUser) {
  //   console.log(onSdp.payload)
    
  //   if ( onSdp.name !== currentUser[0].name) {
  //     recieveOffer(onSdp.payload)
  //   }}
  // },[onSdp])

  // useEffect(() => {

  //   if (candidates && currentUser) {
  //     console.log(candidates.payload)
  //     if ( onSdp.name !== currentUser[0].name) {
  //       addCandidate(candidates.payload)
  //     }}

  // },[candidates])


  useEffect(() => {
    if (onReq && currentUser) {

      console.log('currentp:',onReq.payload)

      if (onReq.type === 'startshare') {
        setShareData({data: onReq.payload, name: onReq.name});
        if(currentUser[0].name !== onReq.name){
        sendMessage('copy share request', onReq.name + ' wants to copy share',2 )
        }
      }
      if (onReq.type === 'sharejoined' && onReq.name !== currentUser[0].name) {
        console.log('both users read to share');
        createOffer();
        sendCand()
      }

      if (onReq.type === 'reject' && onReq.name !== currentUser[0].name) {
        Alert.alert('Rejection', `${onReq.name} refused you request`, [], {
          cancelable: true,
        });
      }

      if (onReq.type === 'page' && onReq.name !== currentUser[0].name) {
        setSharePage(onReq.payload);
      }

      if (onReq.type === 'end') {
        console.log('copy share ended');
        setShareData(null);

        if (onReq.name !== currentUser[0].name) {
          // Alert.alert(
          //   'user left',
          //   `${onReq.name} is no longer copy sharing`,
          //   [],
          //   {
          //     cancelable: true,
          //   },
           

          // );
          sendMessage('user left', onReq.name + ' is no longer copy sharing',1 )
          setSharePage(null);
        }
      }

      if (onReq.type === 'onbookmark') {
        setShareChange({type: 'bookmark', reset: Math.random()});
      }
      if (onReq.type === 'onnote') {
        setShareChange({type: 'note', reset: Math.random()});
      }
      if (onReq.type === 'offer' && onReq.name !== currentUser[0].name) {
        console.log('received offer');
        
        recieveOffer(onReq.payload);
      }
      if (onReq.type === 'answer' && onReq.name !== currentUser[0].name) {
        console.log('received answer');

        receiveAnwer(onReq.payload);
      }
      if (onReq.type === 'candidate' && onReq.name !== currentUser[0].name) {
        console.log('received candidate');
        setTimeout(function () {
          addCandidate(onReq.payload);
        }, 1000);
      }
    }
  }, [onReq]);

  useEffect(() => {
    pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

 pc.onaddstream = (e) => {
      console.log('remotevideo',rStream);
     rStream.current.srcObject = e.stream;
    };
  })

  pc.onaddstream = e => {
    console.log(rStream);
    setRStream(e.stream);
  };

  pc.oniceconnectionstatechange = e => {
    console.log(e);
  };

  const createOffer = async () => {
  console.log('Offer');
await setSender(false)
await pc.createOffer({offerToReceiveVideo: 1}).then(sdp => {
      pc.setLocalDescription(sdp);

      sendOfferOrAnswer(sdp, currentUser[0].name);
    });
  };

  const createAnswer = () => {
    console.log('Answer');
    pc.createAnswer({offerToReceiveVideo: 1}).then(sdp => {
      pc.setLocalDescription(sdp);

      sendOfferOrAnswer(sdp, currentUser[0].name);
    });
  };

  const recieveOffer = remoteSdp => {
    pc.setRemoteDescription(new RTCSessionDescription(remoteSdp));
    setTimeout(() => createAnswer(), 1000);
    setTimeout(() => sendCand(), 1000);
  };
  const receiveAnwer = remoteSdp => {
    pc.setRemoteDescription(new RTCSessionDescription(remoteSdp));

    setTimeout(() => sendCand(), 1000);
  };

  const addCandidate = candidates => {
    candidates.forEach(candidate => {
      console.log(JSON.stringify(candidate));
      this.pc.addIceCandidate(new RTCIceCandidate(candidate));
    });
  };

  const sendCand = () => {
    pc.onicecandidate = e => {
      if (e.candidate) {
        console.log('senfing cand');
        console.log(JSON.stringify(e.candidate));
        sendCand(e.candidate, currentUser[0].name, );
      }
    };
  };



  return (
    <View style={{position: 'absolute', top: 100, zIndex: 999}}>
           {/* {stream ? <RTCView streamURL={stream.toURL()} /> : null}

{rStream? <RTCView streamURL={rStream.toURL()} /> : null}  */}
      <AudioLink  currentUser={currentUser} room={room} sender={sender}/>
    </View>
  );
}

const mapStateTopProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  room: selectRoom,
});

const mapDispatchToProps = dispatch => ({
  setLastMessage: message => dispatch(setLastMessage(message)),
  setSharePage: sharePage => dispatch(setSharePage(sharePage)),
  setMessage: message => dispatch(setMessage(message)),
  setName: name => dispatch(setName(name)),
  setStream: stream => dispatch(setStream(stream)),
  setShareData: shareData => dispatch(setShareData(shareData)),
  setShareChange: option => dispatch(setShareChange(option)),
  setPushLibrary: data => dispatch(setPushLibrary(data)),
  openMessage: () => dispatch(openMessage()),
  setLastProfile: (data) => dispatch(setLastProfile(data)),
});

export default connect(mapStateTopProps, mapDispatchToProps)(SocketOverlay);
