import React, { Component } from "react";

import styles from "./style";
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { Platform } from "react-native";


class LoginScreen extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.loginScreenContainer}>
            <View style={styles.container}>
              <Image
                source={require('../../assets/kiryanalogo1.png')}
                style={{ width: 100, resizeMode: 'contain', margin: 30 }}
              />
            </View>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Login Your Account</Text>
              <TextInput placeholder="User Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
              <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onLoginPress()}
                title="Login"
              />
              <TouchableOpacity onPress={() => { this.props.navigation.navigate("SignupScreen") }}>
                <Text style={{ textAlign: "center", marginTop: 10 }}>Not Register? Create an Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onLoginPress() {
    this.props.navigation.navigate("MainNavigator")
  }


}

export default LoginScreen;

