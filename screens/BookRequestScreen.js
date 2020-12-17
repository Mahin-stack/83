import React from 'react';
import { StyleSheet, Text, View , Alert, TouchableOpacity,TextInput, KeyboardAvoidingView} from 'react-native';
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'

export default class BookRequestScreen extends React.Component{
constructor(){
super()
this.state={
userId: firebase.auth().currentUser.email,
bookName: '',
reasonForRequest: '',
}
}

createUniqueIdforEach= ()=>{
  // 36=  no. can be btw a to z and 1 to 9   and it should be of 9 nos. only
return Math.random().toString(36).substring(9)
}
           //  these are not constructor ones both are diff
addRequest=(bookName, reasonForRequest)=>{
  var userId= this.state.userId
  var randomRequestId= this.createUniqueIdforEach()
  db.collection('requested_books').add({
    'user_id': userId,
    'book_name': bookName,
    'reason_forRequest': reasonForRequest,
    'request_id': randomRequestId,
  })
  this.setState({
    bookName: '',
reasonForRequest: '',
  })
  return Alert.alert('Book Requested Successfully')
}
  render(){
    return(
      <View style={{flex: 1}}>
      <MyHeader title= 'Book Request'/>
      <KeyboardAvoidingView style={styles.keyboardStyle}>
      <TextInput
      style={styles.inputBox}
      placeholder= 'Enter Your Book Name'
      onChangeText={(text)=>{
       this.setState({
         bookName: text
       }) 
      }}
      // value is here cauz it is not firebase 
      value={this.state.bookName}
      />

<TextInput
      style={styles.inputBox}
      placeholder= 'Enter Book Reason'
      multiline={true}
      onChangeText={(text)=>{
       this.setState({
         reasonForRequest: text
       }) 
      }}
      // value is here cauz it is not firebase 
      value={this.state.reasonForRequest}
      />
      <TouchableOpacity style={styles.button}
      onPress={()=>{
        this.addRequest(this.state.bookName, this.state.reasonForRequest)
      }}
      >
        <Text>Request</Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
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
  keyboardStyle: {
    flex: 1,
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
});
