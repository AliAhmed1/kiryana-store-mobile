import React, { useState, useEffect } from "react";

import styles from "./style";
import { Keyboard, Text, View, ScrollView, TextInput, TouchableWithoutFeedback, Alert, Image, KeyboardAvoidingView, TouchableOpacity, Switch, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import { Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { signUp } from '../../config/firebase';
import Loader from '../../components/loader'
import {addItem} from '../../config/firebase'
 
function AddItems(props) {

   
    const [chooseItemType, setChooseItemType] = useState("Normal Item");
    const [userProfileImage, setUserProfileImage] = useState(null)
    const [itemPrice, SetItemPrice] = useState("")
    const [itemIngredients, setItemIngredients] = useState("")
    const [itemTitle, setItemTitle] = useState("")
    const [itemSalePrice, setItemSalePrice] = useState("")
    const [userProfileImageLable, setUserProfileImageLable] = useState("Choose item image")
    const [contentType, setcontentType] = useState(null);
    const [showError, setShowError] = useState(false)
    const [registerFormError, setRegisterFormError] = useState("")
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            setShowError(false)
            setRegisterFormError("")
        }, 5000);
    }, [showError])





    let onItemPress = async () => {

        setLoading(true)
        const userNameFormate = /^([A-Za-z.\s_-]).{5,}$/;
        const userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
        const userCountryFormate = /^([A-Za-z.\s_-]).{5,}$/;
        const userCityFormate = /^([A-Za-z.\s_-]).{5,}$/;

        console.log(itemTitle)
        if (!itemTitle) {
            setShowError(true)
            setRegisterFormError("Invalid item title.")
            setLoading(false)

        } else if (!itemIngredients) {
            setShowError(true)
            setRegisterFormError("Invalid item ingredients.")
            setLoading(false)

        } else if (!itemPrice) {
            setShowError(true)
            setRegisterFormError("Invalid item price.")
            setLoading(false)

        } else if (!itemSalePrice) {
            setShowError(true)
            setRegisterFormError("Invalid item Sale price.")
            setLoading(false)

        } else if (userProfileImage == null) {
            setShowError(true)
            setRegisterFormError("Please select a item image.")
            setUserProfileImage(null)
            setLoading(false)

        } else if (!chooseItemType) {
            setShowError(true)
            setRegisterFormError("Must be selected any one.")
            setLoading(false)

        }
        else {
            setShowError(false)
            const itemDetails = {
                itemTitle: itemTitle,
                itemIngredients: itemIngredients,
                itemSalePrice: itemSalePrice,
                itemPrice: itemPrice,
                itemImage: userProfileImage,
                chooseItemType: chooseItemType,
                propsHistory : props.navigation,
                contentType: contentType
            }
            try {
                const addItemReturn = await addItem(itemDetails)
                setLoading(false)
                Alert.alert(addItemReturn)
                setItemIngredients("")
                setItemTitle("")
                setItemSalePrice("")
                SetItemPrice("")
                setUserProfileImage(null)
                // console.log(signUpReturn)
            } catch (error) {
                console.log("Error in Adding => ", error)
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
            <Loader loading={loading} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.AddItemsContainer}>
                    <View style={styles.signupFormView}>
                        <Text style={styles.logoText}>Add Best Store Items</Text>

                        <TextInput placeholder="Item Title" onChangeText={(e) => setItemTitle(e)} placeholderColor="#c4c3cb" style={styles.signupFormTextInput} />
                        <TextInput placeholder="Item Ingredients" onChangeText={(e) => setItemIngredients(e)} placeholderColor="#c4c3cb" style={styles.signupFormTextInput} />
                        <TextInput placeholder="Actual Price" onChangeText={(e) => SetItemPrice(e)} placeholderColor="#c4c3cb" style={styles.signupFormTextInput} keyboardType="numeric" />
                        <TextInput placeholder="Selling Price" onChangeText={e => setItemSalePrice(e)} placeholderColor="#c4c3cb" style={styles.signupFormTextInput} keyboardType="numeric" />

                        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginVertical : 10 }}>
                        <Text style={{fontSize : 15, marginLeft : 16}}>Choose Item Type</Text>

                            <View style={styles.signupFormPickerTextInput}>
                                
                                <Picker
                                    selectedValue={chooseItemType}
                                    style={{
                                        height: 43, width: 120,
                                    }}
                                    onValueChange={(itemValue, itemIndex) => setChooseItemType(itemValue)}
                                >
                                    <Picker.Item label="Normal Item" value="Normal Item" />
                                    <Picker.Item label="Meat" value="Meat" />
                                    <Picker.Item label="Snacks" value="Snacks" />
                                    <Picker.Item label="Rice" value="Rice" />
                                    <Picker.Item label="Sauces" value="Sauces" />
                                    <Picker.Item label="vegetables" value="vegetables" />
                                    <Picker.Item label="Other" value="Other" />

                                </Picker>
                            </View>
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
                            onPress={() => onItemPress()}
                            title="Add Your Item"
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}




export default AddItems;

