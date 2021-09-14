import React, { useState, useEffect } from "react";

import styles from "./style";
import { Keyboard, Text, View, ScrollView, TextInput, TouchableWithoutFeedback, Alert, Image, KeyboardAvoidingView, TouchableOpacity, Switch, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import { Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { signUp } from '../../config/firebase';
import Loader from '../../components/loader'


function SignupScreen(props) {

    const [isStore, setisStore] = useState(false);
    const toggleSwitch = () => setisStore(previousState => !previousState);
    const [userGender, setUserGender] = useState("Male");
    const [userProfileImage, setUserProfileImage] = useState(null)
    const [userPassword, SetUserPassword] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [userCountry, setUserCountry] = useState("")
    const [userCity, setUserCity] = useState("")
    const [userConfirmPassword, setUserConfirmPassword] = useState("")
    const [userAge, setUserAge] = useState("")
    const [userProfileImageLable, setUserProfileImageLable] = useState("Choose image")
    const [contentType, setcontentType] = useState(null);
    const [userMapLink, setUserMapLink] = useState("")
    const [showError, setShowError] = useState(false)
    const [registerFormError, setRegisterFormError] = useState("")
    const [loading , setLoading] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            setShowError(false)
            setRegisterFormError("")
        }, 5000);
    }, [showError])





    let onSignupPress = async () => {

        setLoading(true)
        const userNameFormate = /^([A-Za-z.\s_-]).{5,}$/;
        const userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
        const userCountryFormate = /^([A-Za-z.\s_-]).{5,}$/;
        const userCityFormate = /^([A-Za-z.\s_-]).{5,}$/;

        console.log(userName)
        if (!userName.match(userNameFormate)) {
            setShowError(true)
            setRegisterFormError("Please enter a valid name.")
        } else if (!userEmail.match(userEmailFormate)) {
            setShowError(true)
            setRegisterFormError("Please enter a valid email address.")
            setUserEmail("")

        } else if (!userPassword.match(userPasswordFormate)) {
            setShowError(true)
            setRegisterFormError("For Password Use alphanumeric, uppercase, lowercase & greater than 10 characters.")
            SetUserPassword("")
        } else if (!userConfirmPassword.match(userPassword)) {
            setShowError(true)
            setRegisterFormError("Confirmation password not matched.")
            setUserConfirmPassword(false)

        } else if (!userCity.match(userCityFormate)) {
            setShowError(true)
            setRegisterFormError("Please enter a valid city name.")
            setUserCity("")
        } else if (!userCountry.match(userCountryFormate)) {
            setShowError(true)
            setRegisterFormError("Please enter a valid country name.")
            setUserCountry("")

        } else if (!(userAge > 0 && userAge < 101)) {
            setShowError(true)
            setRegisterFormError("Please enter a valid age.")
            setUserAge("")
        } else if (userProfileImage == null) {
            setShowError(true)
            setRegisterFormError("Please select a profile image.")
            setUserProfileImage(null)
        } else if (userMapLink.length < 10) {
            setShowError(true)
            setRegisterFormError("Please enter a valid URL.")
            setUserMapLink("")
        }
        else {
            // console.log(userName, userEmail, userPassword, userConfirmPassword, userCity, userCountry, userGender, userAge, userProfileImage, userTNC)
            setShowError(false)
            const userDetails = {
                userName: userName,
                userEmail: userEmail,
                userPassword: userPassword,
                userCity: userCity,
                userCountry: userCountry,
                userGender: userGender,
                userAge: userAge,
                userProfileImage: userProfileImage,
                isRestaurant: isStore,
                typeOfFood: [],
                userMapLink: userMapLink,
                contentType: contentType
            }
            try {
                const signUpReturn = await signUp(userDetails)
                setLoading(false)
                if (isStore) {
                    props.navigation.navigate("StoreNavigator")
                }
                else {
                    props.navigation.navigate("UserNavigator")
                }
                // console.log(signUpReturn)
            } catch (error) {
                console.log("Error in Sign up => ", error)
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setUserProfileImage(result.uri);
            setcontentType(result.type)
        }
    };
    return (
        <KeyboardAvoidingView style={styles.containerView} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <Loader loading={loading}/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.signupScreenContainer}>
                    <View style={styles.signupFormView}>
                        <Text style={styles.logoText}>Create An Account</Text>

                        <TextInput placeholder="Full Name" onChangeText={(e) => setUserName(e)} placeholderColor="#c4c3cb" style={styles.signupFormTextInput} />
                        <TextInput placeholder="User Email" onChangeText={(e) => setUserEmail(e)} placeholderColor="#c4c3cb" style={styles.signupFormTextInput} />
                        <TextInput placeholder="Password" onChangeText={(e) => SetUserPassword(e)} placeholderColor="#c4c3cb" style={styles.signupFormTextInput} secureTextEntry={true} />
                        <TextInput placeholder="Confirm Password" onChangeText={e => setUserConfirmPassword(e)} placeholderColor="#c4c3cb" style={styles.signupFormTextInput} secureTextEntry={true} />

                        <View style={{ flexDirection: "row" }}>
                            <TextInput placeholder="City" onChangeText={e => setUserCity(e)} placeholderColor="#c4c3cb" style={styles.signupFormCityTextInput} />
                            <TextInput placeholder="Country" onChangeText={e => setUserCountry(e)} placeholderColor="#c4c3cb" style={styles.signupFormCountryTextInput} />
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <View style={styles.signupFormPickerTextInput}>
                                <Picker
                                    selectedValue={userGender}
                                    style={{
                                        height: 43, width: 120,
                                    }}
                                    onValueChange={(itemValue, itemIndex) => setUserGender(itemValue)}
                                >
                                    <Picker.Item label="Male" value="Male" />
                                    <Picker.Item label="Female" value="Female" />
                                </Picker>
                            </View>
                            <TextInput placeholder="Age" onChangeText={e => setUserAge(e)} placeholderColor="#c4c3cb" style={styles.signupFormAgeTextInput} />
                        </View>
                        <TextInput placeholder="map Link" onChangeText={e => setUserMapLink(e)} placeholderColor="#c4c3cb" style={styles.signupFormTextInput} />

                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 10 }}>
                            <Text style={{ fontStyle: "italic" }}>Register Store ?</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "orange" }}
                                thumbColor={isStore ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isStore}
                            />
                        </View>

                        <TouchableOpacity style={styles.signupFormimage} onPress={pickImage}>
                            {!userProfileImage ?
                                <Text>{userProfileImageLable}</Text>
                                :
                                <Image
                                    style={{ height: 80, width: 80, borderRadius: 50 }}
                                    resizeMode="cover"
                                    source={{
                                        uri: userProfileImage,
                                    }}
                                />
                            }
                        </TouchableOpacity>
                        <Text style={{ textAlign: "center", color: 'red' }}>{showError ? registerFormError : null}</Text>
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

