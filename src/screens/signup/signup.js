import React, { useState, useEffect } from "react";

import styles from "./style";
import { Keyboard, Text, View, ScrollView, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, TouchableOpacity, Switch, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import { Platform } from "react-native";


function SignupScreen(props) {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [selectedValue, setSelectedValue] = useState("male");


    let onSignupPress = () => {
        props.navigation.navigate("MainNavigator")
    }
    return (
        <KeyboardAvoidingView style={styles.containerView} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.signupScreenContainer}>
                    <View style={styles.signupFormView}>
                        <Text style={styles.logoText}>Create An Account</Text>

                        <TextInput placeholder="Full Name" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} />
                        <TextInput placeholder="User Email" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} />
                        <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} secureTextEntry={true} />
                        <TextInput placeholder="Confirm Password" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} secureTextEntry={true} />

                        <View style={{ flexDirection: "row" }}>
                            <TextInput placeholder="City" placeholderColor="#c4c3cb" style={styles.signupFormCityTextInput} />
                            <TextInput placeholder="Country" placeholderColor="#c4c3cb" style={styles.signupFormCountryTextInput} />
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <View style={styles.signupFormPickerTextInput}>
                                <Picker
                                    selectedValue={selectedValue}
                                    style={{
                                        height: 43, width: 120,
                                    }}
                                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                >
                                    <Picker.Item label="Male" value="male" />
                                    <Picker.Item label="Femal" value="female" />
                                </Picker>
                            </View>
                            <TextInput placeholder="Age" placeholderColor="#c4c3cb" style={styles.signupFormAgeTextInput} />
                        </View>
                        <TextInput placeholder="map Link" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} />

                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 10 }}>
                            <Text style={{ fontStyle: "italic" }}>Register Store ?</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "orange" }}
                                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>

                        <TouchableOpacity style={styles.signupFormimage}>
                            <Text>Upload Image</Text>
                        </TouchableOpacity>                       

                        <Button
                            buttonStyle={styles.signupButton}
                            onPress={() => onSignupPress()}
                            title="Signup"
                        />
                        <TouchableOpacity onPress={() => { props.navigation.navigate("LoginScreen") }}>
                            <Text style={{ textAlign: "center", marginTop: 10, marginBottom: 20 }}>Already Registered? Login Now</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}




export default SignupScreen;

