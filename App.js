import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/store'



export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

