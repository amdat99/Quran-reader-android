import React,{useEffect} from 'react';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser } from '../../redux/user/user.selectors'
import { initiateSocket } from '../../sockets/sockets';

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



function SocketOverlay(props) { 
  
  useEffect(() => {
    initiateSocket(123)
    console.log('connecting socket')
  },[])
    return (
        <View>
            
        </View>
    );
}

const mapStateTopProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

export default connect(mapStateTopProps)(SocketOverlay);