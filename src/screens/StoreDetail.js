import React, { useEffect, useState } from 'react'
import { Keyboard, Text, View, ScrollView, TextInput, TouchableWithoutFeedback, Alert, Modal, Pressable, KeyboardAvoidingView, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { color } from 'react-native-reanimated';
import { connect } from 'react-redux';
import { store_list } from '../store/action';
import { firestore, auth, orderNow } from '../config/firebase';




const StoreDetail = ({ route, navigation }) => {

    const [defaultSearchValue, setDefaultSearchValue] = useState("")
    const { store } = route.params
    const [item, setItem] = useState([])
    const [searchItem, setSearchItem] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [cardList, setCardList] = useState([])
    const [count, setCount] = useState(0)
    const [renderSearchItemList, setRenderSearchItemList] = useState(false)
    const [renderItemList, setRenderItemList] = useState(true)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalActualPrice, setTotalActualPrice] = useState(0)
    const [userDetails, setUserDetails] = useState({})


    useEffect(() => {
        fetchMenuItems()

        auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                // console.log("update_user =>>", user.uid)
                firestore.collection('users').doc(user.uid).get().then((snapshot) => {
                    // console.log("snapshot.data =>>", snapshot.data());
                    setUserDetails(snapshot.data())
                    console.log(snapshot.data())

                })
            } else {
                // No user is signed in.
            }
        });


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
            setTotalPrice(totalPrice + Number(item.itemSalePrice))
            setTotalActualPrice(totalActualPrice + Number(item.itemPrice))

            Alert.alert(`${item.itemTitle} has been added`)

        }
        // console.log(cardList)

    }

    const removeCartItem = (itemIndex) => {
        console.log(itemIndex)
        const removedItemPrice = Number(cardList[itemIndex].itemSalePrice)
        const removedActualPrice = Number(cardList[itemIndex].itemPrice)
        cardList.splice(itemIndex, 1);
        setTotalPrice(totalPrice - removedItemPrice)
        setTotalActualPrice(totalActualPrice - removedActualPrice)
        setCardList(cardList)
        setCount(count + (+1))

        console.log(cardList)

    }

    let handleSearchBar = (event) => {
        const searchText = event;
        if (item) {
            Object.keys(item).map((val) => { });
            const result = item.filter((val) => {
                return val.itemIngredients.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1 ||
                    val.itemTitle.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1;
            })
            if (searchText.length > 0) {
                setRenderItemList(false)
                setRenderSearchItemList(true)
                setDefaultSearchValue(searchText)
                setSearchItem(result)
            } else {
                setRenderItemList(true)
                setRenderSearchItemList(false)
                setDefaultSearchValue(searchText)
                setSearchItem(result)
            }
        }
    }


    const handleConfirmOrderBtn = async () => {
        if (userDetails) {
            if (!userDetails.isRestaurant) {
                if (cardList.length > 0) {
                    try {
                     
                        const orderNowReturn = await orderNow(cardList, totalPrice, totalActualPrice, store, userDetails)
                        console.log(orderNowReturn)
                        // console.log("Successfully Ordered")
                        setModalVisible(!modalVisible)
                        navigation.navigate("MyOrder")
                        Alert.alert("Successfully Ordered")

                    } catch (error) {
                        console.log(" Error in confirm order => ", error)
                        Alert.alert("Error in confirm order => ", error)
                    }
                } else {
                    Alert.alert("You have to select atleast one item")
                    console.log("You have to select atleast one item")
                }

            }
            else {
                Alert.alert("You are unable to order")
            }
        }
        else {
            Alert.alert("you must be logged in")
        }
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

    const renderSearchItemsList = () => {
        // console.log(item)
        if (searchItem) {
            let obj = [...searchItem]
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
            <ImageBackground
                style={styles.storeImage}
                source={{ uri: store.userProfileImageUrl }}>

                <TextInput
                    placeholder="Search for Item ..."
                    onChangeText={(e) => handleSearchBar(e)}
                    value={defaultSearchValue}
                    style={styles.search}
                />
            </ImageBackground>
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
                                                    <TouchableOpacity style={styles.removeItem} onPress={() => removeCartItem(v)}>
                                                        <Text style={{ color: 'orange' }}>Remove Item</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <Card.Divider></Card.Divider>

                                            </>
                                        )
                                    })
                                    }
                                    <Text style={{textAlign : 'center', fontSize : 15 , fontWeight : 'bold'}}>Total : Rs. {totalPrice}</Text>
                                </Card>
                            </ScrollView>
                            <View style={{ flexDirection: 'row' }}>
                                <Pressable
                                    style={[styles.button, styles.buttonConfirm]}
                                    onPress={() => handleConfirmOrderBtn()}
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
                {renderItemList && renderItemsList()}
                {renderSearchItemList && renderSearchItemsList()}

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
        height: 210,
        width: '100%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
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
    title: {
        textAlign: 'center',
        fontSize: 15

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
        width: '100%',
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
    },
    search: {
        backgroundColor: 'white',
        width: "80%",
        borderRadius: 50,
        padding: 5,
        // marginTop : 50,
        paddingLeft: 10,
    },

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