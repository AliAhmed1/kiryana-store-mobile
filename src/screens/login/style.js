const React = require("react-native");

const { StyleSheet } = React;

export default {

containerView: {
  flex: 1,
  // justifyContent : "center",
  backgroundColor : 'white',
},
loginScreenContainer: {
  flex: 1,
},
logoText: {
  fontSize: 25,
  fontWeight: "bold",
  // marginTop: 0,
  marginBottom: 30,
  textAlign: 'center',
},
loginFormView: {
  flex: 2
},

container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  // backgroundColor: '#FFFFF',
},

loginFormTextInput: {
  height: 43,
  fontSize: 14,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#eaeaea',
  backgroundColor: '#fafafa',
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  marginBottom: 5,

},
loginButton: {
  backgroundColor: 'black',
  borderColor : 'orange',
  borderWidth : 2,
  borderRadius: 5,
  height: 45,
  marginTop: 10,
  marginLeft : 15,
  marginRight : 15
},
fbLoginButton: {
  height: 45,
  marginTop: 10,
  backgroundColor: 'transparent',
},
};
