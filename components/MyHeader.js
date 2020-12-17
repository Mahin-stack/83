import * as React from 'react'
import {View, Text, StyleSheet } from 'react-native'
import {Header} from 'react-native-elements'

const MyHeader =(props)=>{
return(
<Header
centerComponent={{
text: props.title,
style: {color: 'black', fontSize: 20, fontWeight: 'bold'},
backgroundColor: '#19b5fe'
}}
/>
)
}

export default MyHeader;