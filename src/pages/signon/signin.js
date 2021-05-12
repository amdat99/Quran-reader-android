import React, {useState} from 'react';
import {
  googleSignInPending,
  emailSignInPending,
} from '../../redux/user/user.actions';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// import {
//   selectCurrentUser,
// } from "../../redux/user/user.selectors";

import {StyleSheet, Text, View, TextInput, Platform, Alert} from 'react-native';

function SignIn({googleSignInPending, emailSignInPending,toggleLogin,toggleVerify}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert(' input error', ' fill out all the signin inputs', [], {
        cancelable: true,
      });
      return;
    }
    emailSignInPending(email, password);
    setSignin(true);
  };

  console.log(password);

  return (
    <>
      <View style={styles.container}>
        <Text style={{color: 'black', marginBottom: 2}}>Sign in</Text>

        <TextInput
          autoCompleteType="email"
          placeholder="Enter your email"
          onChangeText={setEmail}
          style={styles.inputs}
        />

        <TextInput
          autoCompleteType="password"
          type="password"
          placeholder="Enter your password"
          onChangeText={setPassword}
          style={styles.inputs}
        />

        <View style={styles.buttons}>
          <Text style={styles.buttonText} onPress={handleSubmit}>
            {' '}
            Sign In
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
            I don't have an account
          </Text>
        </View>
        <Text style={{fontSize:10, marginTop:20}} onPress={toggleVerify}>Forgot Password</Text>
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
});

const mapDispatchToProps = dispatch => ({
  googleSignInPending: () => dispatch(googleSignInPending()),
  emailSignInPending: (email, password) =>
    dispatch(emailSignInPending({email, password})),
});

const mapStateToProps = createStructuredSelector({
  // currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
