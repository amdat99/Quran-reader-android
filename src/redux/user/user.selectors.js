import {createSelector} from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser? user.currentUser: null
);

export const selectCurrentProfileId = createSelector(
  [selectUser],
  user => user.profileId,
);
export const selectSentMessages = createSelector([selectUser], user =>
  user.sentMessage ? user.sentMessage : [],
);

export const selectRecievedMessages = createSelector([selectUser], user =>
  user.recievedMessage ? user.recievedMessage : [],
);

export const selectErrorMessage = createSelector(
  [selectUser],
  user => user.error,
);

export const selectUserName = createSelector([selectCurrentUser], currentUser =>
  currentUser.filter(userData => userData.userName),
);

export const selectProfileName = createSelector([selectUser], user =>
  user.profileName ? user.profileName : [],
);

export const selectLibrary = createSelector([selectUser], user =>
  user.libraryType 
);

export const selectTimer = createSelector([selectUser], user =>
  user.timerStart 
);

export const selectRoom= createSelector([selectUser], user =>
  user.room 
);

export const selectLastMessage = createSelector([selectUser], user =>
  user.lastMessage 
);

export const selectStream = createSelector([selectUser], user =>
  user.stream 
);


let reversedArray = []
let turn = true

export const selectMessage = createSelector([selectUser], user =>{
 if(turn && user.message){ reversedArray = user.message.reverse()}
 turn = !turn
return user.message ? reversedArray: []
}
);

export const selectName = createSelector([selectUser], user =>
  user.name 
);

export const selectShareData = createSelector([selectUser], user =>
  user.shareData 
);

export const selectOnShare = createSelector([selectUser], user =>
  user.onShare
);