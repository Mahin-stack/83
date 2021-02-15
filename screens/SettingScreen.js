import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class SettingScreen extends React.Component{
    constructor(){
        super()
        this.state={
            address: '',
           mobileNumber: '',
           emailId: '',
           docId: '',
        }
    }

    getUserDetails=()=>{
    var email= firebase.auth().currentUser.email
                                // logged in email will match with orignal email
    db.collection('Users').where('email_id' ,'==', email).get()
    .then(snapShot =>{
    snapShot.forEach(doc =>{
        var data= doc.data()
        this.setState({
            // we write homr address cause it will bring it to the text input of address only not any other so data of address will only come in home Addtress
            address: data.homeAdddress,
            mobileNumber: data.mobile_number ,
            emailId: data.email_id,
                       //  id here is predefined
            docId: doc.id ,
        })
    })
    })
    }
    updateUserDetails=()=>{
                                     //cause it is unique 
        db.collection('Users').doc(this.state.docId).update({
        'homeAdddress': this.state.address,
        'mobile_number': this.state.mobileNumber,
        'email_id': this.state.emailId,
        })
        return Alert.alert('Profile Updated Successfully')
    }
    componentDidMount(){
        this.getUserDetails()
    }
    render(){
        return(
            <View style = {styles.container}>
                    <MyHeader
                    title='Settings'
                    navigation= {this.props.navigation}
                    />

                    <View style={styles.formContainer}>
                        <TextInput
                        style={styles.inputBox}
                        placeholder='address'
                        multiline={true}
                        onChangeText={(text)=>{
                        this.setState({
                            address: text
                        })
                        }}
                        value={this.state.address}
                        />

                    <TextInput
                        style={styles.inputBox}
                        placeholder='Enter Your Phone Number'
                        keyboardType={'numeric'}
                        onChangeText={(text)=>{
                        this.setState({
                        mobileNumber: text
                        })
                        }}
                        value={this.state.mobileNumber}
                        />

                        <TextInput
                        style={styles.inputBox}
                        placeholder='Enter Your Email'
                        keyboardType={'email-address'}
                        onChangeText={(text)=>{
                        this.setState({
                        emailId: text
                        })
                        }}
                        value={this.state.emailId}
                        />
                    <TouchableOpacity
                    style={styles.saveButton}
                    onPress={()=>{
                        // when we pess it the it updates
                    this.updateUserDetails()
                    }}
                    >
                        <Text stye={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    
                </View>
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
      saveButton:{
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
    formContainer: {
    width: '100%' ,
    flex: 1,
    alignItems: 'center',
    },
    buttonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
       },
  });