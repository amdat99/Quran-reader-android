import React, {useEffect, useState} from 'react';
import SignIn from './signin';
import Register from './register';
// import SignUp from "../../components/signin&signup/Signup";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Animated,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {setRoom} from '../../redux/user/user.actions';
import {sendProfileChange} from '../../sockets/sockets';
import {updateStatus} from '../library/utils';

function SignOn({currentUser, setRoom}) {
  const [showLogin, setShowLogin] = useState(true);
  const [toggleForgetPassword, setToggleForgetPassword] = useState(false);
  const [email, setVerifyEmail] = useState('');
  const [verifyid, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [requestNotSent, setRequestNotSent] = useState(true);

  useEffect(() => {
    if (currentUser) {
      updateStatus('online', currentUser[0].userid);
      setRoom(currentUser[0].profileid);
      setTimeout(function () {
        sendProfileChange();
      }, 1000);
    }
  });

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const toggleVerify = () => {
    setToggleForgetPassword(!toggleForgetPassword);
  };
  const onverifyEmail = async () => {
    if (!email) {
      return;
    }

    try {
      const response = await fetch(
        'https://quranlive-api.herokuapp.com/forgotpassword',
        {
          //  const response = await fetch('http://192.168.11.177:3000/forgotpassword',{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: email,
          }),
        },
      );
      const data = await response.json();
      setRequestNotSent(false);
      console.log('email sent', data);
    } catch (e) {
      console.log('email verify  error', e);
    }
  };

  const onChangePassword = async () => {
    if (!password || !verifyid) {
      return;
    }
    if (password !== confirmPassword || password.length < 6) {
      Alert.alert(
        'password error',
        'passwords must match and contain 6 charaters',
        [],
        {
          cancelable: true,
        },
      );
      return;
    }
    try {
      const response = await fetch(
        'https://quranlive-api.herokuapp.com/verifyid',
        {
          //  const response = await fetch('http://192.168.11.177:3000/forgotpassword',{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            password: password,
            verifyid: verifyid,
          }),
        },
      );
      const data = await response.json();
      if (data === 'password changed') {
        toggleVerify();
        setPassword('');
        setConfirmPassword('');
        setCode('');
      }
    } catch (e) {
      console.log(' change password  error', e);
    }
  };
  return (
    <View style={styles.container}>
      {toggleForgetPassword ? (
        <Text style={{marginTop: 10}} onPress={toggleVerify}>
          {' '}
          ⬅️ back to signin
        </Text>
      ) : null}

      {toggleForgetPassword ? (
        requestNotSent ? (
          <View style={styles.verifyContainer}>
            <Text>Change Password</Text>
            <TextInput
              onChangeText={setVerifyEmail}
              placeholder="enter valid email "
            />
            <Text onPress={onverifyEmail}>Send request</Text>
          </View>
        ) : (
          <View style={styles.verifyContainer}>
            <Text>
              If the email was valid a verification code was sent to it. Enter
              the code received below along with your new password:
            </Text>
            <TextInput onChangeText={setCode} placeholder=" enter code" />
            <TextInput
              secureTextEntry={true}
              onChangeText={setPassword}
              placeholder=" enter new password"
            />
            <TextInput
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
              placeholder=" re-enter new password"
            />
            <Text onPress={onChangePassword}>Update your password</Text>
            <Text
              style={{marginTop: 10, fontSize: 12}}
              onPress={() => setRequestNotSent(true)}>
              send email again
            </Text>
          </View>
        )
      ) : currentUser ? (
        <View key={currentUser[0].userid} style={styles.salamText}>
          <Text style={{fontSize: 20}}>
            {' '}
            As-salamu alaykum {currentUser[0].name}
          </Text>
        </View>
      ) : (
        <>
          {showLogin ? (
            <SignIn toggleLogin={toggleLogin} toggleVerify={toggleVerify} />
          ) : (
            <Register toggleLogin={toggleLogin} />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    fontSize: 50,
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  salamText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  setRoom: room => dispatch(setRoom(room)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignOn);
