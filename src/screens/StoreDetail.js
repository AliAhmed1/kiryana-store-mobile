import React, { useEffect, useState } from 'react'
import { Keyboard, Text, View, ScrollView, TextInput, TouchableWithoutFeedback, Alert, Modal, Pressable, KeyboardAvoidingView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { color } from 'react-native-reanimated';
import { connect } from 'react-redux';
import { store_list } from '../store/action';
import { firestore } from '../config/firebase';




const StoreDetail = ({ route, props }) => {

    const [defaultSearchValue, setDefaultSearchValue] = useState("")
    const { store } = route.params
    const [item, setItem] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [cardList, setCardList] = useState([])
    const [count , setCount] = useState(0)

    useEffect(() => {
        fetchMenuItems()
    }, [cardList])

    const fetchMenuItems = () => {
        firestore.collection('users').doc(store.id).collection("menuItems").onSnapshot(snapshot => {
            const menuItemsList = [];
            snapshot.forEach(doc => {
                const obj = { id: doc.id, ...doc.data() }
                menuItemsList.push(obj)
            })
            setItem(menuItemsList)
        })
    }


    const addToCart = (item) => {

        if (item) {
            cardList.push(item)
            Alert.alert(`${item.itemTitle} has been added`)

        }
        // console.log(cardList)
        
    }

    const removeCartItem = (itemIndex) => {
        console.log(itemIndex)
        // const { cartItemsList, totalPrice, totalActualPrice } = this.state
        // const removedItemPrice = Number(cartItemsList[itemIndex].itemSalePrice)
        // const removedActualPrice = Number(cartItemsList[itemIndex].itemPrice)
        cardList.splice(itemIndex, 1);
        setCardList(cardList)
        setCount(count+(+1))

        console.log(cardList)    

    }

    const renderItemsList = () => {
        // console.log(item)
        if (item) {
            let obj = [...item]
            obj.sort((a, b) => a.itemSalePrice - b.itemSalePrice)
            return Object.keys(obj).map((i, val) => {
                return (
                    <Card key={i} style={styles.storeCard}>
                        <Image
                            style={{ height: 100, width: "100%" }}
                            resizeMode="cover"
                            source={{ uri: obj[val].itemImageUrl }}
                        />
                        <Text style={styles.title}>{obj[val].itemTitle}</Text>
                        <Text style={styles.title}>{obj[val].itemIngredients}</Text>
                        <Text style={styles.title}>Rs .{obj[val].itemSalePrice}</Text>

                        <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            onPress={() => { addToCart(obj[val]) }}
                            buttonStyle={styles.StoreButton}
                            title='ADD TO CART' />
                    </Card>
                )
            })
        }
        else {
            return (
                <View></View>
            )
        }
    }

    return (
        <ScrollView style={{ backgroundColor: '#F8F8FF' }}>
            <Image
                style={styles.storeImage}
                source={{ uri: store.userProfileImageUrl }}>
            </Image>
            <View style={styles.container}>
                <Text style={styles.StoreName}>{store.userName}</Text>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Cart has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <ScrollView style={styles.modalView}>
                                {/* <Text style={styles.modalText}>Your Order</Text> */}
                                <Card >
                                    <Card.Title>Your Order to be Placed</Card.Title>
                                    <Card.Divider></Card.Divider>
                                    {Object.keys(cardList).map((i, v) => {
                                        return (
                                            <>
                                                <View style={styles.cardRender} key={cardList[v].id + v}>
                                                    <Text>{cardList[v].itemTitle}</Text>
                                                    <Text>Rs .{cardList[v].itemSalePrice}</Text>
                                                    <TouchableOpacity style={styles.removeItem} onPress={()=> removeCartItem(v)}>
                                                        <Text style={{ color: 'orange' }}>Remove Item</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <Card.Divider></Card.Divider>

                                            </>
                                        )
                                    })
                                    }
                                </Card>
                            </ScrollView>
                            <View style={{ flexDirection: 'row' }}>
                                <Pressable
                                    style={[styles.button, styles.buttonConfirm]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Confirm Order</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <Button
                        buttonStyle={[styles.storeButton, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}
                        icon={<Icon name='code' color='#ffffff' />}
                        title='VIEW CART'
                    >
                        {/* <Text style={styles.textStyle}>VIEW CART</Text> */}
                    </Button>

                </View>
                {renderItemsList()}
            </View>


        </ScrollView >
    )
}

export default StoreDetail;


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

    container: {
        backgroundColor: '#F8F8FF',
        marginTop: -70,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },

    storeImage: {
        height: 200,
        width: '100%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,

    },

    StoreButton: {
        borderRadius: 20,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        backgroundColor: 'orange'
    },

    StoreName: {
        marginTop: 15,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
        fontSize: 22
    },
    title : {
        textAlign : 'center',
        fontSize : 15

    }
    ,
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: '#F8F8FF',
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        width : '100%',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    cardRender: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeItem: {
        padding: 5,
        borderWidth: 1,
        borderColor: 'orange',
        backgroundColor: 'white',
        marginBottom: 5
    }
    ,
    button: {
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 5,
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "orange",
    },
    buttonClose: {
        backgroundColor: "red",
    },
    buttonConfirm: {
        backgroundColor: "green"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }


})