import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import BookDonateScreen from '../screens/BookDonateScreen';
import RecieverScreen from '../screens/RecieverScreen'

export const AppStackNavigator = createStackNavigator({
    BookDonateList: {
        screen: BookDonateScreen,
        navigationOptions: {
        headerShown: false        
    }
    },
  RecieverDetails: {
      screen: RecieverScreen,
      navigationOptions:{
          headerShown: false
  }
  },
},
{
initialRouteName: BookDonateList
}
)