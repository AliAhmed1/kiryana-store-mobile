import React, { useEffect, useState } from 'react'
import { Keyboard, Text, View, ScrollView, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { color, Value } from 'react-native-reanimated';
import { connect, useDispatch, useSelector } from 'react-redux';
import { store_list } from '../store/action';


export const categories = [
    {
        id: 3,
        name: 'Cookies',
        photo_url:
            'https://www.telegraph.co.uk/content/dam/Travel/2019/January/france-food.jpg?imwidth=1400'
    },
    {
        id: 1,
        name: 'Mexican Food',
        photo_url: 'https://ak1.picdn.net/shutterstock/videos/19498861/thumb/1.jpg'
    },
    {
        id: 2,
        name: 'Italian Food',
        photo_url:
            'https://images.unsplash.com/photo-1533777324565-a040eb52facd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
    },
    {
        id: 4,
        name: 'Smoothies',
        photo_url:
            'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/still-life-of-three-fresh-smoothies-in-front-of-royalty-free-image-561093647-1544042068.jpg?crop=0.715xw:0.534xh;0.0945xw,0.451xh&resize=768:*'
    },
    {
        id: 0,
        name: 'Pizza',
        photo_url: 'https://amp.businessinsider.com/images/5c084bf7bde70f4ea53f0436-750-563.jpg'
    },
];


const Store = (props) => {

    const [defaultSearchValue, setDefaultSearchValue] = useState("")
    // const [storeList , setStoreList] = useState([])
    const storeList = useSelector(state => state.storeList)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(store_list())

        // console.log(storeList)
        // const { state } = props.location
        // if (state) {
        //     setDefaultSearchValue(state)
        //     handleSearchBar(state)
        // }

    }, [])

    const handleItem = (store) => {
        props.navigation.navigate('StoreDetail' , {store : store})
    }
   


    const renderStoreList = () => {
        // console.log(storeList)

        if (storeList)
            return Object.keys(storeList).map((i, u) => {
                return (
                    <TouchableOpacity key={i} onPress={() => handleItem(storeList[u])}>
                        <Card style={styles.storeCard}>
                            <Image
                                style={{ height: 150, width: "100%" }}
                                resizeMode="cover"
                                source={{ uri: storeList[u].userProfileImageUrl }}
                            />
                            <Text style={styles.StoreName}>{storeList[u].userName}</Text>
                            {/* <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            onPress={props.navigation.navigate("StoreDetail" , storeList[u])}
                            buttonStyle={styles.StoreButton}
                            title='VIEW ITEMS' /> */}
                        </Card>
                    </TouchableOpacity>
                );
            })
    }
    

    return (
        <ScrollView>
            {renderStoreList()}
        </ScrollView>
    )
}



export default Store;


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
        backgroundColor: 'orange'
    },

    StoreName: {
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 20,
        fontWeight : 'bold'
    }


})