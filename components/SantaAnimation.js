import * as React from 'react'
import LottieView from 'lottie-react-native'
import { StyleSheet, Text, View } from 'react-native';

export default class SantaAnimation extends React.Component{
    render(){
        return(
            <LottieView
            source={require('../assets/santa.json')}
            style={{width: '60%' }}
            autoPlay loop  
            />
        
        )
    }
}