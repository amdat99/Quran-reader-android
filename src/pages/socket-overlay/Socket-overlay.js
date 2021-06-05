import React,{useEffect,useState} from 'react';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser, selectRoom ,shareData} from '../../redux/user/user.selectors'
import { initiateSocket,enterChat, sendAudioLink, enterAudioLink } from '../../sockets/sockets';
import {setLastMessage, setMessage, setName, setStream,setShareData } from '../../redux/user/user.actions'
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
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
    Dimensions
  } from 'react-native';
import { set } from 'react-native-reanimated';



function SocketOverlay({currentUser, room,setLastMessage, setMessage,setName,setStream}) { 
  const [stream, setOnStream] = useState(null);
  const [onReq,setOnReq] = useState(null)
  const [remoteSdp, setRemoteSdp] = useState(null)
  const [candidates, setCandidates] = useState(null)
  
const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
const pc = new RTCPeerConnection(configuration);

useEffect(() => {
  
  const start = async () =>{
  console.log('start');
  if (!stream) {
    let s;
    try {
      s = await mediaDevices.getUserMedia({ audio: true,video:false });
      setOnStream(s);
      setStream(s)
    } catch(e) {
      console.error(e);
    }

} 
}
start()
},[])


  useEffect(() => {
    initiateSocket(room)
    console.log('connecting socket '+ room)
  
  
        enterChat ((err, data)  =>{
          
          if (err) return;
      
          setLastMessage(data.name+': '+data.message)
      setMessage({name:data.name,message:data.message}) 
setName(data.name)
        
          
                  
        })
    
        enterAudioLink ((err, data)  =>{
          
          if (err) return;
          setOnReq(data)
        })
      
         },[room])

      useEffect(() => {
        if(onReq){
          if(onReq.type === 'startshare'){
             setShareData({data: onReq.payload, name: onReq.name})
             console.log('share req received')
          }
          if(onReq.type === 'sharejoined'){
            console.log('both users read to share')
          }

          if(onReq.type === 'reject'){
            Alert.alert('Rejetion', `${onReq.name} refused you request`, [], {
              cancelable: true,
            });
          }

          if(onReq.type === 'offer'){
              console.log('received offer')
          }
          if(onReq.type === 'answer'){
            console.log('received answer')

          }
          if(onReq.type === 'candidate'){
            console.log('received candidate')

          }
        }

      },[onReq])

      
      const createOffer = async () => {
       console.log("Offer");
    
        pc.createOffer({ offerToReceiveVideo: 1 }).then((sdp) => {
          pc.setLocalDescription(sdp);
    
          sendAudioLink(sdp, currentUser[0].name,'offer');
        });
      };

      const createAnswer = () => {
        console.log("Answer");
        pc.createAnswer({ offerToReceiveVideo: 1 }).then((sdp) => {
          pc.setLocalDescription(sdp);
          pc.setRemoteDescription(new RTCSessionDescription(remoteSdp));
          sendAudioLink(sdp, currentUser[0].name,'answer')
        });
      };

      const receiveAnwer = (data) => {
        pc.setRemoteDescription(new RTCSessionDescription(remoteSdp));
        sendCand()
      }

      const addCandidate = () => {
        candidates.forEach((candidate) => {
          console.log(JSON.stringify(candidate));
          this.pc.addIceCandidate(new RTCIceCandidate(candidate));
        });
      };

      const sendCand = () => {
      pc.onicecandidate = (e) => {
        if (e.candidate) {
          sendAudioLink(e.candidate,currentUser[0].name,'candidate')
        }
      };
    }

    return (
        <View style={{position:'absolute',top: 100,zIndex: 999}}>
    
        </View>
    );
}

const mapStateTopProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    room : selectRoom,
})

const mapDispatchToProps = dispatch => ({
  setLastMessage: (message) => dispatch(setLastMessage(message)),
  setMessage: (message) => dispatch(setMessage(message)),
  setName: (name) => dispatch(setName(name)),
  setStream:(stream) => dispatch(setStream(stream)),
  setShareData: (shareData) => dispatch(setShareData(shareData))
  
  
})

export default connect(mapStateTopProps,mapDispatchToProps)(SocketOverlay);