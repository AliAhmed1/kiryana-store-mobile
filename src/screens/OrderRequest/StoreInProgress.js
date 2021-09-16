import React, { useEffect } from 'react'
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, TouchableOpacity, Image, Linking, StyleSheet, ScrollView } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { order_request } from '../../store/action';
import { Card, ListItem, Button, Icon } from 'react-native-elements'


const StoreInProgress = () => {

    const dispatch = useDispatch()
    const orderRequest = useSelector(state => state.orderRequest)

    useEffect(() => {
        dispatch(order_request())
    }, [])

    const renderInProgressorderRequest = () => {
        if (orderRequest) {
            return Object.keys(orderRequest).map((val, key) => {
                if (orderRequest[val].status === "IN PROGRESS") {
                    return (
                        <Card >
                            {/* {console.log(orderRequest[val].status)} */}
                            <>
                                <View style={styles.cardRender} key={key}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15 , textAlign : 'center'}}>{orderRequest[val].userName}</Text>
                                    <Text style={{textAlign : 'center'}}>STATUS : <Text style={{color : 'red'}}>{orderRequest[val].status}</Text></Text>
                                    {Object.keys(orderRequest[val].itemsList).map((val2, key) => {
                                        return (
                                            <View key={key}>
                                                <Image 
                                                style={{ height: 150, width: "100%" }}
                                                source={{ uri: orderRequest[val].itemsList[val2].itemImageUrl }}></Image>
                                                <Text>NAME : {orderRequest[val].itemsList[val2].itemTitle}</Text>
                                                <Text>TYPE : {orderRequest[val].itemsList[val2].itemIngredients}</Text>
                                                <Text>RS.{orderRequest[val].itemsList[val2].itemSalePrice}</Text>
                                                <Card.Divider></Card.Divider>
                                            </View>
                                        )
                                    })
                                    }
                                </View>
                                <View>
                                    <Button
                                        title="User Location"
                                        buttonStyle={styles.button}

                                        onPress={() => { Linking.openURL(`${orderRequest[val].userMapLink}`) }} />
                                    <Text>Total = RS.{orderRequest[val].totalPrice}</Text>
                                </View>
                            </>
                        </Card>
                    )
                }
            })
        }
    }


    return (
        <ScrollView>
            <Text style={{ justifyContent: 'center', alignSelf: 'center' , fontSize : 20, marginTop : 10, fontWeight : 'bold' }}>IN PROGRESS</Text>
            {renderInProgressorderRequest()}
        </ScrollView>
    )
}

export default StoreInProgress;

const styles = StyleSheet.create({
    cardRender: {
        flex: 1,
    },
    button : {
        backgroundColor : "orange",
        borderWidth : 1,
        borderColor : 'black',
    }
})