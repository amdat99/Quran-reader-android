import React, {useState} from 'react';
import {signUpPending} from '../../redux/user/user.actions';

import uuid from 'react-native-uuid';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// import {
//   selectCurrentUser,
// } from "../../redux/user/user.selectors";

import {StyleSheet, Text, View, TextInput, Platform, Dimensions, Alert} from 'react-native';

function Register({signUpPending,toggleLogin}) {
  const [userName, setDisplayName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleSubmit = async () => {
    if (!confirmPassword || !email || !password || !confirmPassword) {
      Alert.alert(' input error', ' fill out all the register inputs', [], {
        cancelable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        ' password error',
        'passwords must match and contain 6 charaters',
        [],
        {
          cancelable: true,
        },
      );
      return;
    }

    if (password.length && confirmPassword.length < 6) {
      Alert.alert(
        ' password error',
        'passwords must match and contain 6 charaters',
        [],
        {
          cancelable: true,
        },
      );
      return;
    }

    signUpPending({userName, email, password, userId: uuid.v4(), contentId: uuid.v4(), profileId: uuid.v4()});
    toggleLogin()
    // if(error !== null){
    //     alert(error)
    // }
  };

  console.log(userName, email, password);

  return (
    <>
      <View style={styles.container}>
        <Text style={{color: 'black', marginBottom: 2}}>Register</Text>

        <TextInput
          autoCompleteType="email"
          placeholder="Enter your email"
          onChangeText={setEmail}
          style={styles.inputs}
        />

        <TextInput
          autoCompleteType="email"
          placeholder="Enter your name"
          onChangeText={setDisplayName}
          style={styles.inputs}
        />

        <TextInput
          autoCompleteType="password"
          placeholder="Enter your password"
          onChangeText={setPassword}
          style={styles.inputs}
        />
        <TextInput
          autoCompleteType="password"
          placeholder=" Re-enter your password"
          onChangeText={setConfirmPassword}
          style={styles.inputs}
        />

        <View style={styles.buttons}>
          <Text onPress={handleSubmit} style={styles.buttonText}>
            {' '}
            Register
          </Text>
             <Text
            style={{
              backgroundColor: '#4c8bf5',
              color: 'white',
              borderRadius: 20,
              padding: 7,
            }}
            onPress={toggleLogin}>
            {' '}
            I have an account
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    backgroundColor: 'transparent',
    fontSize: 25,
    alignItems: 'center',
    marginTop: 0,
    flexDirection: 'column',
    height:Dimensions.get('window').
    height/5
  },
  buttons: {
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    backgroundColor: 'black',
    marginRight: 10,
    borderRadius: 30,
    padding: 5,
  },
  inputs: {},
});

const mapDispatchToProps = dispatch => ({
  signUpPending: signUpData => dispatch(signUpPending(signUpData)),
});

export default connect(null, mapDispatchToProps)(Register);
