import React, { useEffect, useState } from 'react'
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Loader from '../components/loader';
import { auth } from '../config/firebase';


const LogOut = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        auth
            .signOut()
            .then(() => {
                // Sign-out successful.
                setLoading(false)
                props.navigation.replace("LoginScreen");
            })
            .catch(() => {
                // An error happened.
            });
    }, [])

    return (
        <View>
            <Loader loading={loading} />
        </View>
    )
}

export default LogOut;