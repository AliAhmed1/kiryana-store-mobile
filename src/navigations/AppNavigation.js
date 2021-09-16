import React from 'react'
import { Icon } from 'react-native-elements';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { View, Platform, Text, ScrollView, Image, StyleSheet, NetInfo, ToastAndroid, SafeAreaView, DrawerItems } from 'react-native';

import LoginScreen from '../screens/login/login'
import SignupScreen from '../screens/signup/signup'
import SplashScreen from '../screens/SplashScreen'
import Store from '../screens/Store'
import CompareItem from '../screens/CompareItem'
import LogOut from '../screens/LogOut'
import MyOrder from '../screens/MyOrder'
import MyItems from '../screens/MyItems'
import OrderRequest from '../screens/OrderRequest';
import Dashboard from '../screens/Dashboard';
import AddItems from '../screens/AddItems/AddItems';
import StoreDetail from '../screens/StoreDetail';
import UserPending from '../screens/MyOrder/UserPending';
import UserInProgress from '../screens/MyOrder/UserInProgress'
import UserDelivered from '../screens/MyOrder/UserDelivered'
import StorePending from '../screens/OrderRequest/StorePending'
import StoreInProgress from '../screens/OrderRequest/StoreInProgress'
import StoreDelivered from '../screens/OrderRequest/StoreDelivered'

const CustomDrawerContentComponent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={{ flex: 1 }}>
      <Image source={require('../assets/kiryanalogo1.png')} style={styles.drawerImage} />
    </View>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


function UserOrderTab() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Pending') {
          iconName = focused
            ? 'checkmark-done-outline'
            : 'reload-outline';
        } else if (route.name === 'In Progress') {
          iconName = focused ? 'checkmark-done-outline' : 'swap-horizontal-outline';
        }
        else if (route.name === 'Delivered') {
          iconName = focused ? 'checkmark-done-outline' : 'car-outline';
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={size} color={color} type='ionicon'/>;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen
        name="Pending"
        component={UserPending}
        options={{ headerShown: false }} />
      <Tab.Screen name="In Progress" component={UserInProgress} options={{ headerShown: false }} />
      <Tab.Screen name="Delivered" component={UserDelivered} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function StoreOrderTab() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Pending') {
          iconName = focused
            ? 'checkmark-done-outline'
            : 'reload-outline';
        } else if (route.name === 'In Progress') {
          iconName = focused ? 'checkmark-done-outline' : 'swap-horizontal-outline';
        }
        else if (route.name === 'Delivered') {
          iconName = focused ? 'checkmark-done-outline' : 'car-outline';
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={size} color={color} type='ionicon'/>;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen name="Pending" component={StorePending} options={{ headerShown: false }} />
      <Tab.Screen name="In Progress" component={StoreInProgress} options={{ headerShown: false }} />
      <Tab.Screen name="Delivered" component={StoreDelivered} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}


function UserNavigator() {
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
        initialRouteName: 'Store',
      }}
      drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
    >

      <Drawer.Screen name="Store"
        component={Store}
        options={{
          title: 'Store',
          drawerLabel: 'Store',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='Store'
              type='font-awesome'
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }}

        options={{ headerShown: true }} />



      <Drawer.Screen name="MyOrder"
        component={UserOrderTab}
        options={{
          title: 'MyOrder',
          drawerLabel: 'MyOrder',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='MyOrder'
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
              name='Store'
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
              name='Store'
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



function StoreNavigator() {
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
        initialRouteName: 'Order Request',
      }}
      drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
    >

      <Drawer.Screen name="Order Request"
        component={StoreOrderTab}
        options={{
          title: 'Order Request',
          drawerLabel: 'Order Request',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='Store'
              type='font-awesome'
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }}


        options={{ headerShown: true }} />

      <Drawer.Screen name="Add Items"
        component={AddItems}
        options={{
          title: 'Add Items',
          drawerLabel: 'Add Items',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='Add Items'
              type='font-awesome'
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }}

        options={{ headerShown: true }} />



      <Drawer.Screen name="My Items"
        component={MyItems}
        options={{
          title: 'My Items',
          drawerLabel: 'My Items',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='My Items'
              type='font-awesome'
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }}

        options={{ headerShown: true }} />



      <Drawer.Screen name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard',
          drawerLabel: 'Dashboard',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='Dashboard'
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
              name='Store'
              type='font-awesome'
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }}

        options={{ headerShown: true }} />

    </Drawer.Navigator >



  );
}


const Stack = createStackNavigator();

function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="UserNavigator"
          component={UserNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="StoreNavigator"
          component={StoreNavigator}
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
        <Stack.Screen name="StoreDetail"
          component={StoreDetail}
          options={{ headerShown: true }}
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