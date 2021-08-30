import React from 'react'
import { Icon } from 'react-native-elements';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { View, Platform, Text, ScrollView, Image, StyleSheet, NetInfo, ToastAndroid, SafeAreaView, DrawerItems } from 'react-native';

import LoginScreen from '../screens/login/login'
import SignupScreen from '../screens/signup/signup'
import SplashScreen from '../screens/SplashScreen'
import Home from '../screens/Home'
import Store from '../screens/Store'
import CompareItem from '../screens/CompareItem'
import LogOut from '../screens/LogOut'

const CustomDrawerContentComponent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={{ flex: 1 }}>
      <Image source={require('../assets/kiryanalogo1.png')} style={styles.drawerImage} />
    </View>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

const Drawer = createDrawerNavigator();

function MainNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'left',
        drawerActiveTintColor: 'white',
        drawerActiveBackgroundColor: 'orange',
        drawerStyle: {
          backgroundColor: '#ffffff',
          width: 240,
        },
        drawerItemStyle: {
          color: 'black'
        },
        initialRouteName: 'Home',
      }}
      drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
    >

      <Drawer.Screen name="Home"
        component={Home}
        options={{
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }}

        options={{ headerShown: true }} />


      <Drawer.Screen name="Store"
        component={Store}
        options={{
          title: 'Store',
          drawerLabel: 'Store',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }}

        options={{ headerShown: true }} />

      <Drawer.Screen name="CompareItem"
        component={CompareItem}
        options={{
          title: 'CompareItem',
          drawerLabel: 'CompareItem',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }}
        options={{ headerShown: true }} />


      <Drawer.Screen name="Log Out"
        component={LogOut}
        options={{
          title: 'LogOut',
          drawerLabel: 'LogOut',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }}

        options={{ headerShown: true }} />

    </Drawer.Navigator>
  );
}


const Stack = createStackNavigator();

function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="MainNavigator"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen name="SignupScreen"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: 'white',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 20,
    width: 80,
    height: 80
  },
});

export default AppContainer;