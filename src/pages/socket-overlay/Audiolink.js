import React from 'react';
import {
    initiateSocket,
    enterChat,
    sendAudioLink,
    enterAudioLink,
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


class AudioLink extends React.Component {

    constructor(props) {
        super(props);
    

        this.localVideoref = React.createRef();
        this.remoteVideoref = React.createRef();
        this.socket = null;
        this.candidates = [];
        this.sender = false;
   
    
        this.onCall = "";
        this.remoteCandidate = [];
      }

      componentDidMount(){
const {currentUser } = this.props;



const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};
this.pc = new RTCPeerConnection(configuration);

if(currentUser){
        enterAudioLink((err, data) => {
          console.log(data.type);
            if (err) return;

             if (data.type === 'sharejoined' && data.name !== currentUser[0].name) {
        console.log('both users read to share');
        this.createOffer();
      }
            
               if (data.type === 'offer' && data.name !== currentUser[0].name) {
        console.log('received offer');
        this.recieveOffer(onReq.payload);
      }
      if (data.type === 'answer' && data.name !== currentUser[0].name) {
        console.log('received answer');

        this.receiveAnwer(onReq.payload);
      }
      if (data.type === 'candidate' && data.name !== currentUser[0].name) {
        console.log('received candidate');
     
          this.addCandidate(onReq.payload);
        
      }
          });
        }
    
        this.start()


          this.pc.oniceconnectionstatechange = (e) => {
            console.log(e);
          };
      
          this.pc.onaddstream = (e) => {
            console.log(this.remoteVideoref);
            this.remoteVideoref.current.srcObject = e.stream;
          };
        
      }

      start =  () => {
        const beginI =  async () => {
          if (!this.localVideoref) {
              let s;
              try {
                s = await mediaDevices.getUserMedia({audio: true, video: false});
                this.localVideoref = s;
                this.pc.addStream(s);
                console.log(s);
              } catch (e) {
                console.error(e);
              }
            }
          } 
            beginI()
      }

       createOffer = async () => {
        console.log('Offer');
    
        this.pc.createOffer({offerToReceiveVideo: 1}).then(sdp => {
          this.pc.setLocalDescription(sdp);
    
          sendAudioLink(sdp, this.props.currentUser[0].name, 'offer');
        });
      };
     createAnswer = () => {
        console.log('Answer');
        this.pc.createAnswer({offerToReceiveVideo: 1}).then(sdp => {
            this.pc.setLocalDescription(sdp);
    
          sendAudioLink(sdp, this.props.currentUser[0].name, 'answer');
        });
      };
    
       recieveOffer = remoteSdp => {
        this.pc.setRemoteDescription(new RTCSessionDescription(remoteSdp));
        setTimeout(() => this.createAnswer(), 1000);
      };
       receiveAnwer = remoteSdp => {
        this.pc.setRemoteDescription(new RTCSessionDescription(remoteSdp));
    
        setTimeout(() => this.sendCand(), 1000);
      };
    
       addCandidate = candidates => {
        candidates.forEach(candidate => {
          console.log(JSON.stringify(candidate));
          this.pc.addIceCandidate(new RTCIceCandidate(candidate));
        });
      };
    
       sendCand = () => {
        this.pc.onicecandidate = e => {
          if (e.candidate) {
            console.log('senfing cand');
            console.log(JSON.stringify(e.candidate));
            sendAudioLink(e.candidate, this.props.currentUser[0].name, 'candidate');
          }
        };
      };
      render(){
    return (
        <>
     {/* {this.localVideoref ? <RTCView streamURL={this.localVideoref.toURL()} /> : null}

      {this.remoteVideoref ? <RTCView streamURL={this.remoteVideoref.toURL()} /> : null}  */}
        </>
    );
}
}

export default AudioLink;