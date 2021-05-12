import React, {useEffect,useState} from 'react';
import SignIn from './signin';
import Register from './register';
// import SignUp from "../../components/signin&signup/Signup";
import {StyleSheet, Text, View, TextInput, Platform,Animated} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user.selectors';

function SignOn({currentUser}) {

const [showLogin,setShowLogin] = useState(true)
const [toggleForgetPassword,setToggleForgetPassword] = useState(false)
const [email,setVerifyEmail] = useState('')
const [code,setCode] = useState('')
const [password,setPassword] = useState('')
const [confirmPassword,setConfirmPassword] = useState('')
const [requestNotSent,setRequestNotSent] = useState(true)



const toggleLogin = () => {
  setShowLogin(!showLogin)
}

const toggleVerify =() => {
  setToggleForgetPassword(!toggleForgetPassword)
  
}
 const  onverifyEmail = async () => { 
   if(!email){
     return
   }

  try {
 
     const response = await fetch('http://192.168.11.177:3000/forgotpassword',{
       method: "put",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         email: email,
 
       }),
     }
   );
   const data =  await response.json();
   setRequestNotSent(false);
   console.log('email sent',data);
 
 }catch(e) {
     console.log('email verify  error',e)
    
 }
  }
  return (
    <View style={styles.container}>
    
    {toggleForgetPassword?<Text onPress={toggleVerify}>back to signin</Text>:null}
      
      { toggleForgetPassword?
        
      requestNotSent ?
      <View style={styles.verifyContainer}>
      <Text>Change Password</Text>
      <TextInput onChangeText ={setVerifyEmail} placeholder ='enter valid email ' />
      <Text onPress={onverifyEmail}>Send request</Text>
      </View>
      : 
      <View style={styles.verifyContainer}>
 
      <Text>If the email was valid a verification code was sent to it. Enter the code received below along with 
            your new password:
      </Text>
      <TextInput onChangeText ={setCode} placeholder =' enter code' />
      <TextInput onChangeText ={setPassword} placeholder =' enter new password' />
      <TextInput onChangeText ={setPassword} placeholder =' re-enter new password' />
      <Text>Update your password</Text>     
      <Text style={{marginTop:10,fontSize:12}} onPress={()=>setRequestNotSent(true)}>send email again</Text>
      </View>

    

     : currentUser ? (
  
        
         
        <View key = {currentUser[0].userid}style={styles.salamText}>
              
   
          <Text style={{fontSize:20}}> As-salamu alaykum {currentUser[0].name}</Text> 
         
        </View>
      
        
 

     )  : (
        <>
        { showLogin?
          <SignIn  toggleLogin={toggleLogin} toggleVerify={toggleVerify}/>

         : <Register  toggleLogin={toggleLogin}/>
        }
        </>
      )
}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    fontSize: 50,
    alignItems: 'center'
  },
  text: {
    color: 'white',
    
  },
  salamText: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  verifyContainer:{
    flex: 1,
    marginLeft:10,
    marginRight:10,
    marginBottom:20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(SignOn);
