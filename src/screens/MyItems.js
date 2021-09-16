import React, { useEffect, useState } from 'react'
import { Keyboard, Text, View, ScrollView, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { color, Value } from 'react-native-reanimated';
import { connect, useDispatch, useSelector } from 'react-redux';
import { firestore, auth } from '../config/firebase';
import { my_items } from '../store/action';


const MyItems = (props) => {

    const [defaultSearchValue, setDefaultSearchValue] = useState("")
    // const [myItems , setmyItems] = useState([])
    const myItems = useSelector(state => state.myItems)
    const [count, setCount] = useState(0)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(my_items())

        // console.log(myItems)
        // const { state } = props.location
        // if (state) {
        //     setDefaultSearchValue(state)
        //     handleSearchBar(state)
        // }

    }, [])


    const deleteItem = (i) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                // console.log("user uid => ", user.uid)
                firestore.collection('users').doc(user.uid).collection("menuItems").doc(i).delete();
                // firebase.storage.ref().child(`itemImage/${user.uid}/${i.itemImageUrl}`).delete();
            }
        });

        setCount(count + 1)

        // console.log(i.itemImageUrl, "has been deleted")

    }


    const rendermyItems = () => {
        // console.log(myItems)

        if (myItems)
            return Object.keys(myItems).map((i, u) => {
                return (
                    <Card style={styles.storeCard}>
                        <View style={styles.container}>
                            <Image
                                style={{ height: 100, width: "100%" }}
                                resizeMode="cover"
                                source={{ uri: myItems[u].itemImageUrl }}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.StoreName}>{myItems[u].itemTitle}</Text>
                                <Text style={styles.StoreName}>{myItems[u].itemIngredients}</Text>
                                <Text style={styles.StoreName}>RS .{myItems[u].itemSalePrice}</Text>
                                <Button
                                    icon={<Icon name='trash-outline' type='ionicon' color='#ffffff' />}
                                    onPress={() => { deleteItem(myItems[u].id) }}
                                    buttonStyle={styles.StoreButton}
                                    title='' />
                            </View>

                        </View>
                    </Card>
                );
            })
    }


    return (
        <ScrollView>
            {rendermyItems()}
        </ScrollView>
    )
}



export default MyItems;


const styles = StyleSheet.create({
    storeCard: {
        borderRadius: 60,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

    },

    StoreButton: {
        borderRadius: 10,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        backgroundColor: 'orange',
        // marginVertical : 30,
    },

    StoreName: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container: {
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        // alignItems: 'center',
    },

    textContainer: {
        // flexDirection: 'column'
    }
})