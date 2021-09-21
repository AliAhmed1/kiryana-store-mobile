import React, { useEffect, useState } from 'react'
import { Keyboard, Text, View, ScrollView, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, TouchableOpacity, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { my_items, order_request } from '../store/action';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Card, ListItem, Button, Icon } from 'react-native-elements'



function Dashboard() {

    const window = useWindowDimensions();


    const myItems = useSelector(state => state.myItems)
    const orderRequest = useSelector(state => state.orderRequest)

    const [profit, setProfit] = useState(0)
    const [totalOrder, setTotalOrder] = useState(0)
    const [revenue, setRevenue] = useState(0)
    const [items, setItems] = useState(0)
    const [actualPrice, setActualPrice] = useState(0)

    const [count, setCount] = useState(0)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(my_items())
        dispatch(order_request())

        let rev = 0;
        let prft = 0;

        if (orderRequest) {
            // console.log(order.totalPrice)

            for (let i = 0; i < orderRequest.length; i++) {
                rev = rev + orderRequest[i].totalPrice
                prft += orderRequest[i].totalActualPrice
            }

            setProfit(rev - prft)
            setRevenue(rev)
            setTotalOrder(orderRequest.length)
            setActualPrice(prft)
            // console.log(rev)
        }

        if (myItems) {
            setItems(myItems.length)
        }
        console.log(revenue, items, profit, totalOrder)


    }, [])

    let TopInfo = () => {
        return (
            <>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ width: '50%', }}>
                        <Card style={styles.storeCard}>
                            <Card.Title>Revenue</Card.Title>
                            <Text style={styles.StoreName}>{revenue}</Text>
                        </Card>
                        <Card style={styles.storeCard}>
                            <Card.Title>Profit</Card.Title>
                            <Text style={styles.StoreName}>{profit}</Text>
                        </Card>
                    </View>

                    <View style={{ width: '50%', alignItems: 'stretch' }}>

                        <Card style={styles.storeCard}>
                            <Card.Title>Total Orders</Card.Title>
                            <Text style={styles.StoreName}>{totalOrder}</Text>
                        </Card>
                        <Card style={styles.storeCard}>
                            <Card.Title>Store Items</Card.Title>
                            <Text style={styles.StoreName}>{items}</Text>
                        </Card>
                    </View>

                </View>
            </>
        )
    }

    let orderInfo = () => {
        if (orderRequest) {
            return (
                <View>
                    <Text style={styles.StoreName}>Order Status</Text>
                    {Object.keys(orderRequest).map((val, key) => {
                        return (
                            <Card>
                                <Text>Name : {orderRequest[val].userName}</Text>
                                <Text>Total order Price : {orderRequest[val].totalPrice}</Text>
                                <Text>City : {orderRequest[val].userCity}</Text>
                                <Text>Status : {orderRequest[val].status}</Text>
                            </Card>
                        )
                    })
                    }
                </View>
            )
        }
    }


    return (
        <ScrollView>
            {TopInfo()}
            {orderInfo()}
        </ScrollView>
    )
}

export default Dashboard;

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

    StoreName: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})