
import React, { useState, useEffect } from 'react';

//Import all required component
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import { auth, firestore } from '../config/firebase'
// import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = props => {
  //State for ActivityIndicator animation
  let [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      auth.onAuthStateChanged((user) => {
        if (user) {
          firestore.collection('users').doc(user.uid).get().then((snapshot) => {
            if (snapshot.data().isRestaurant) {
              props.navigation.reset({ routes: [{ name: "StoreNavigator" }] });
            }
            else{
              props.navigation.reset({ routes: [{ name: "UserNavigator" }] });

            }
          })
        } else {
          props.navigation.reset({ routes: [{ name: "LoginScreen" }] });
        }
      });

    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/kiryanalogo1.png')}
        style={{ width: '30%', resizeMode: 'contain', margin: 30 }}
      />
      <ActivityIndicator
        animating={animating}
        color="orange"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#FFFFF',
    backgroundColor: 'white'
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
});