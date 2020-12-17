import * as React from 'react'
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase';
import db from '../config';

export default class Sidebar extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:0.8, }}>
            <DrawerItems
            // this will do everything automatically from library name= Spread Attribute//
            {...this.props}
            />
            </View>
            <View style={styles.logoutContainer}>
                <TouchableOpacity
                onPress={()=>{
               this.props.navigation.navigate('Welcome')     
               firebase.auth().signOut()
                }}
                >
                    <Text style={styles.logoutButton}>LogOut</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logoutContainer: {
      flex: 0.2,
      backgroundColor: '#fff',
      justifyContent: 'flex-end',
      paddingBottom:30,
    },
   logoutButton:{
       height: 30,
       width: '100%',
       justifyContent: 'center',
       padding: 10,

   },
  });
  