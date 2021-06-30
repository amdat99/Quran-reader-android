import io from 'socket.io-client';
let socket;

export const initiateSocket = room => {
  socket = io('https://quranlive.uk', {
    // socket = io("http://localhost:4000/", {
    path: '/mysocket',
    transports: ['websocket'],
  });
  console.log(`Connecting`);
  if (socket && room) socket.emit('join', room);
};
export const disconnectSocket = () => {
  console.log('Disconnecting');
  if (socket) socket.disconnect();
};

export const testSocket = data => {
  socket.on('success', message => {
    return data(null, message);
  });
};

export const enterChat = data => {
  if (!socket) return;
  socket.on('livemsg', message => {
    console.log('message received');
    return data(null, message);
  });
};

export const sendMessage = (name, message, room, profile) => {
  console.log('message sent');
  if (socket) socket.emit('livemsg', {message, name, room,profile});
};

export const enterAudioLink = data => {
  if (!socket) return;
  socket.on('audiolink', message => {
    console.log('audio data received');
    return data(null, message);
  });
};

export const sendAudioLink = (payload, name, type) => {
  console.log('audio data sent');
  if (socket) socket.emit('audiolink', {payload, name, type});
};

export const enterProfileChange = data => {
  socket.on('onprofile', message => {
    console.log('profile req received');
    return data(null, message);
  });
};

export const sendProfileChange = () => {
  console.log('profile req sent');
  if (socket) socket.emit('onprofile');
};

export const enterOnCounter = data => {
  if (!socket) return;
  socket.on('onprayer', message => {
    console.log('fetching count change req');
    return data(null, message);
  });
};

export const sendCounterRequest = () => {
  console.log('  sending  fetch req');
  if (socket) socket.emit('onprayer');
};

export const enterOfferOrAnswer = data => {
  if (!socket) return;
  socket.on('offeroranswer', message => {
    console.log('getting sdp');
    return data(null, message);
  });
};

export const sendOfferOrAnswer = (payload) => {
if (socket) socket.emit('offeroranswer', {payload});
};


export const enterCandidate = data => {
  if (!socket) return;
  socket.on('candidate', message => {
    console.log('getting candidate');
    return data(null, message);
  });
};


export const sendCand = (payload) => {
  if (socket) socket.emit('candidate', {payload});
  };


export const enterCall = data => {
  if (!socket) return;
  socket.on('begincall', profileId => {
    console.log('call started');
    return data(null, profileId);
  });
};

export const sendProfile = profileId => {
  console.log('works');
  if (socket) socket.emit('begincall', {profileId});
};
