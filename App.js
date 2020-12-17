import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import { AppDrawerNavigator } from './components/AppDrawerNavigator';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}
const SwitchNavigator= createSwitchNavigator({
  Welcome: {screen: WelcomeScreen},
  Drawer: {screen: AppDrawerNavigator}
})

const AppContainer= createAppContainer(SwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
