import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ListItem} from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

export default class BookDonateScreen extends React.Component{
  constructor(){
    super()
    this.state={
      requestedBookLists: []
    }
    this.requestRef= null
  }

  getRequestedBooksList=()=>{
    this.requestRef= db.collection('requested_books')
   // onSnapshot is a firebase thing which takes snapshot from backend     snapshot is a pickup boy
    .onSnapshot(snapshot =>{
    var requestedBookLists= snapshot.docs.map(document => document.data())
    this.setState({requestedBookLists: requestedBookLists})
    })
  }
  componentDidMount(){
  this.getRequestedBooksList()
  }
  componentWillUnmount(){
    // when user reloads then only new book requests can  come
    this.requestRef()
  }
  keyExtractor=()=>index.toString()
  renderItem=({item, i})=>{
  return(
    <ListItem
    key= {i}
    // item will bring the name of book frokm backend
    title={item.book_name}
    subtitle={item.reason_forRequest}
    rightElement={
      <TouchableOpacity 
      style={styles.button}
      >
  <Text style={styles.buttontext}>View</Text>
      </TouchableOpacity>
    }
    // after each item there will be a gap
    bottomDivider
    />
  )
  }
  
  render(){
    return(
      <View style={{flex:1}}>
    <MyHeader
    title='Donate'
    />
    <View style={{flex: 1}}>
      {
        this.state.requestedBookLists.length=== 0
        ?(
          <View style={styles.subContainer}>
            <Text>List Of All Requested</Text>
          </View>
        )
        :(
          <FlatList
          keyExtractor= {this.keyExtractor()}
          renderItem={this.renderItem()}
          data={this.state.requestedBookLists}
          />
        )
      }
    </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{width: 300,
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
  buttontext:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
   },
});
