import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, ScrollView, KeyboardAvoidingView, } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import SantaAnimation from '../components/SantaAnimation'
import {TabNavigator} from '../components/TabNavigator';

export default class WelcomeScreen extends React.Component{
    constructor(){
        super()
        this.state={
            emailId: '',
            password: '',
            firstName: '',
            lastName: '',
            mobileNumber: '',
            address: '',
            confirmPassword: '',
            // modal: = it is a component to display the form;;;
            modalVisible: false,
        }
    }
    UserSignUp=(emailId, password, confirmPassword)=>{
// then brings answer from the bascend through the object {here response}
if(password !== confirmPassword){
return Alert.alert('password Doesnt match')
}
else{
  firebase.auth().createUserWithEmailAndPassword(emailId, password).then(response=>{
    db.collection('Users').add({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
     mobile_number: this.state.mobileNumber,
     homeAdddress: this.state.address,
     email_id: this.state.emailId,
    })
      return Alert.alert('User Added Sucessfully !')
  })
  // catch is catching errors !!
  .catch(error =>{
      var errorCode= error.code
      var errorMessage= error.message
      return Alert.alert(errorMessage)
  })
}    
}

    UserLogIn=(emailId, password)=>{
        firebase.auth().createUserWithEmailAndPassword(emailId, password).then(response =>{
        return Alert.alert('User LoggedIn Sucessfully')
        this.props.navigation.navigate('BookDonate')
        })
        .catch(error =>{
            var errorCode= error.code
            var errorMessage= error.message
            return Alert.alert(errorMessage)
        })
    }
    
    showModal= ()=>{
    return(
      <Modal 
      animationType= 'fade'
      transparent= {true}
      visible= {this.state.modalVisible}
      >
      <View style= {styles.modalContainer}>
      <ScrollView 
      style={{width: '100%'}}
      >
        <KeyboardAvoidingView style={styles.keyBoardView}>
          <Text>Registration</Text>
          <TextInput
          style={styles.inputBox}
          placeholder= {'first Name'}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
          /> 

<TextInput
          style={styles.inputBox}
          placeholder= {'last Name'}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
          /> 

<TextInput
          style={styles.inputBox}
          placeholder= {'mobile number'}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              mobileNumber: text
            })
          }}
          /> 

<TextInput
          style={styles.inputBox}
          placeholder= {'address'}
          multiline={true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
          /> 

<TextInput
          style={styles.inputBox}
          placeholder= {'Abcd@gmail.com'}
          keyboardType='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
          /> 

<TextInput
          style={styles.inputBox}
          placeholder= {'password'}
          secureTextEntry={true}
          onChangeText={(text)=>{
            this.setState({
            password: text
            })
          }}
          /> 

<TextInput
          style={styles.inputBox}
          placeholder= {'confirm your password'}
          secureTextEntry={true}
          onChangeText={(text)=>{
            this.setState({
             confirmPassword: text
            })
          }}
          /> 
          <View style={styles.modalButton}>
            <TouchableOpacity 
            style={styles.registerButton}
            onPress={()=>{
              // when we click on register button all this gets stored in database and u get signed up to it
              this.UserSignUp(this.state.emailId, this.state.password, this.confirmPassword)
            }}
            >
              <Text>Register</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalButton}>
            <TouchableOpacity 
            style={styles.cancelButton}
            onPress={()=>{
           this.setState({
             modalVisible: false
           })
            }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      </View>
      </Modal>
    )  
    }
  render(){
    return(
      <View style={styles.container}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>{this.showModal()}</View>
          <View style={styles.profileContainer}>
              <SantaAnimation/>
          </View>
        <TextInput
       style={styles.inputBox}
       placeholder= 'abcd@gmail.com'
       keyboardType= 'email-address'
       onChangeText={(text)=>{
        this.setState({
        emailId: text
        })
       }}
        />

<TextInput
       style={styles.inputBox}
       placeholder= 'Enter The Password'
       secureTextEntry={true}
       onChangeText={(text)=>{
        this.setState({
        password: text
        })
       }}
        />

   <TouchableOpacity
   style={[styles.button, {marginBottom: 20, marginTop: 20}]}
   onPress={()=>{
   this.setState({
     modalVisible: true
   })
   }}
   
   >
  <Text style={styles.buttonText}>SignUp</Text>        
    </TouchableOpacity>     
     
    <TouchableOpacity
   style={styles.button}
   onPress={()=>{
    this.UserLogIn(this.state.emailId, this.state.password)
   }}
   
   >
  <Text style={styles.buttonText}>LogIn</Text>        
    </TouchableOpacity>    
     
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: 'black',
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
  button:{
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'blue',
    shadowColor: 'black',
    marginBottom: -10,
    shadowOffset: {
        width: 0,
        height: 8,
    },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
  },
  buttonText:{
   color: 'white',
   fontWeight: 'bold',
   fontSize: 20,
  },
  profileContainer:{
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  modalContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginRight: 30,
    marginLeft: 30,
    marginBottom:80,
    marginTop: 80
  },
  keyBoardView:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center'
  },
  registerButton:{
    width: 200,
    height: 40,
    ajustifyContent: 'center',
    alignItems:'center', 
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,

  },
  cancelButton:{
    width: 200,
    height: 250,
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 5,
    borderColor: 'black',
  },
  modalButton:{
    width: 200,
    height: 40,
    ajustifyContent: 'center',
    alignItems:'center', 
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,

  },
});
