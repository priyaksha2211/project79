import React from 'react';
import { StyleSheet, Text, View , Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ScanScreen from './screens/ScanScreen';

export default class App extends React.Component {
  render(){
    return (
      
        <ScanScreen/>
      
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  QrCodeScanner: {screen: ScanScreen},
});

const Screen  =  createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'violet',
    alignItems: 'center',
    justifyContent: 'center',
  },
});