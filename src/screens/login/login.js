import React, { Component } from "react";

import styles from "./style";
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { Platform } from "react-native";
import { logIn } from '../../config/firebase'
import Loader from "../../components/loader";


class LoginScreen extends Component {
  constructor() {
    super()
    this.state = {
      userLoginEmail: "",
      userLoginPassword: "",
      loading: false,
      textError : ""
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <Loader loading={this.state.loading} />
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
              <TextInput placeholder="User Email" onChangeText={e => this.setState({ userLoginEmail: e })} placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
              <TextInput placeholder="Password" onChangeText={e => this.setState({ userLoginPassword: e })} placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
              <Text style={{color : 'red' , textAlign : "center"}}>{this.state.textError}</Text>
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

  async onLoginPress() {
    const { userLoginEmail, userLoginPassword } = this.state;
    const userLoginDetails = {
      userLoginEmail: userLoginEmail,
      userLoginPassword: userLoginPassword,
      propsHistory: this.props.navigation,
    }
    console.log(userLoginDetails)
    try {
      this.setState({ loading: true })
      const LoginReturn = await logIn(userLoginDetails)

      // console.log(LoginReturn)
    } catch (error) {
      console.log("Error in Login => ", error)
      this.setState({ 
        loading: false,
        textError : error,
      })
    }

  }



}

export default LoginScreen;

