import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import {Card, Header, Icon} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase'

export default class RecieverScreen extends React.Component{
    constructor(props){
        super(props)
        // by writing props any property in code can be imported here
        this.state={
       userId: firebase.auth().currentUser.email,
      
     // receiverid: requester 
     // all email are coming in keyWord details
       receiverId: this.props.navigation.getParam('details')['email_id'],
       requestId: this.props.navigation.getParam('details')['request_id'],
       bookName: this.props.navigation.getParam('details')['book_name'],
       reasonForRequest: this.props.navigation.getParam('details')['reason_forRequest'],
       recieverName: '',
       recieverContact: '',
       receiverAddress: '',
       receiverRequestDocId: '',
       userName: ''
        }
    }
    getReceiverDetails=()=>{
        db.collection('Users').where('email_id', '==' , this.state.receiverId).get()
        .then(snapShot =>{
            snapShot.forEach(doc =>{
            this.setState({
                recieverName: doc.data().first_name,
                recieverContact: doc.data().mobile_number,
                receiverAddress: doc.data().homeAdddress,
            })
            })
        })
        db.collection('requested_books').where('request_id' , '==', this.state.requestId).get()
        .then(snapShot =>{
            snapShot.forEach(doc =>{
                this.setState({
                receiverRequestDocId: doc.id
                })
            })
        })
    }
    componentDidMount(){
        this.getReceiverDetails()
        this.getUserDetails(this.state.userId)
    }

    addNotifications=()=>{
    var messages= this.state.userName + 'Has Shown Interest In Donating the Book'
    db.collection('All_Notification').add({
    'targetedUser_id': this.state.receiverId ,
     'donor_id' : this.state.userId ,
      'request_id': this.state.requestId,
      'book_name': this.state.bookName ,
      'date': firebase.firestore.FieldValue.serverTimestamp()    ,
      'notification_status': 'unread',
      'message': message
})
    }
    sentBookNotification=(bookDetails, requestStatus)=>{
    var requestId= bookDetails.request_id
    var donorId = bookDetails.donor_id
    db.collection('All_Notification').where('request_id' ,'==', requestId).where('donor_id' , '==', donorId).get()
    .then(snapshot =>{
    snapshot.forEach(doc =>{
    var message = ''
                      // we r giving name booksent
    if(requestStatus === 'bookSent'){
    message=this.state.userName + 'he has Sent you The Book'
    }
    else{
    message=this.state.userName + 'HE has Shown Interest In Sending the book'
    }
    db.collection('All_Notification').doc(doc.id).update({
    'message': message,
    'notification_status' : 'unread',
     'date' : firebase.firestore.FieldValue.serverTimestamp()
    })
    })
    })
    }

    sentBook =(bookDetails)=>{
    if(bookDetails.requestStatus === 'bookSent'){
    var requestStatus= 'donor Interested'
    db.collection('All_Notification').doc(bookDetails.doc.id).update({
    'requestStatus' : 'donor Interested',
    })
    this.sentBookNotification(bookDetails, requestStatus)
    }
    else{
    var requestStatus= 'booksent'
    db.collection('All_Notification').doc(bookDetails.doc.id).update({
        'requestStatus' : 'Book Sent',
    })
    this.sentBookNotification(bookDetails, requestStatus)
    }
    }

    updateBookStatus=()=>{
    db.collection('All_Donations').add({
    'book_name': this.state.bookName,
    'request_id': this.state.request_id,
    'requested_by': this.state.recieverName,
    'donor_id': this.state.userId ,
     'request_status': 'donor Interested',
})
    }

    getUserDetails=(userId)=>{
    db.collection('Users').where(' email_id', '==', userId ).get()
    .then(snapshot =>{
    snapshot.forEach(doc =>{
    this.setState({
    userName: doc.data().first_name + ' ' + doc.data().last_name 
    })
    })
    })
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{flex: 0.1}}>
<Header
leftComponent={<Icon name= 'arrow-left' type='feather' onPress={()=>{this.props.navigation.goBack()}}/>}
centerComponent={{text: 'Donate books' , style: {color: 'red' , fontSize: 25, fontWeight: 'bold'}}}
backgroundColor='yellow'
/>
</View>
<View style={{flex: 0.3}}>
<Card
title={'Book Information'}
titleStyle= {{fontSize: 20}}
>
<Card>
<Text>Name: {this.state.bookName}</Text>
</Card>

<Card>
<Text>Reason: {this.state.reasonForRequest}</Text>
</Card>
</Card>
</View>

<View style={{flex: 0.3}}>
    <Card
    title= {'Receiver Information'}
    titleStyle= {{fontSize: 20}}
    >
    <Card>
        <Text>Name: {this.state.recieverName}</Text>
    </Card>
    <Card>
        <Text>Contact: {this.state.recieverContact}</Text>
    </Card>
    <Card>
        <Text>Address : {this.state.receiverAddress}</Text>
    </Card>
    </Card>
</View>

<View style={styles.buttonContainer}>
    {
        this.state.receiverId !== this.state.userId ?
        (
        <TouchableOpacity
        style={styles.button}
        onPress={()=>{
        this.props.navigation.navigate('BookDonateList')
        this.updateBookStatus()
        this.addNotifications()
        }}>
        <Text>Donate</Text>
        </TouchableOpacity>
        )
        : null
    }
</View>
</View>
)
}
}

const styles= StyleSheet.create({
buttonContainer:{
flex: 0.3,
justifyContent: 'center',
alignItems: 'center'
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
},
})

