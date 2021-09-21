import React, { useEffect, useState } from 'react'
import { Keyboard, Text, View, TextInput, Alert, KeyboardAvoidingView, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { firestore } from '../config/firebase';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

const CompareItem = () => {

    const [defaultSearchValue, setDefaultSearchValue] = useState("")
    const [compareItemsList, setCompareItemsList] = useState([])
    const [renderCompareItems, setRenderCompareItems] = useState(false)
    const [searchCompareItems, setSearchCompareItems] = useState([])

    useEffect(() => {
        let subscribe = firestore.collection('users').onSnapshot(snapshot => {   // getting all stores including store items
            const storeList = [];
            const ItemsList = [];

            snapshot.forEach(doc => {
                if (doc.data().isRestaurant) {
                    const obj = { id: doc.id, ...doc.data() }
                    storeList.push(obj);
                }
            })
            for (var i in storeList) {
                // console.log(storeList[i].userName)
                let storeName = storeList[i].userName
                firestore.collection('users').doc(storeList[i].id).collection("menuItems").onSnapshot(snapshot => {
                    snapshot.forEach(doc => {
                        const obj = { id: doc.id, ...doc.data(), storeName }
                        compareItemsList.push(obj)
                    })
                })
            }
            // console.log(compareItemsList)
            setCompareItemsList(compareItemsList)
        })

        return () => {
            subscribe();
        }

    }, [])

    let handleSearchBar = (event) => {
        const searchText = event;
        console.log(searchText)
        if (compareItemsList) {
            Object.keys(compareItemsList).map((val) => { });
            const result = compareItemsList.filter((val) => {
                return val.itemIngredients.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1 ||
                    val.itemTitle.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1

            })
            if (searchText.length > 0) {
                setRenderCompareItems(true)
                setSearchCompareItems(result)
                setDefaultSearchValue(searchText)
            } else {
                setRenderCompareItems(false)
                setSearchCompareItems(result)
                setDefaultSearchValue(searchText)
            }
        }
    }

    const renderSearchItemsList = () => {
        // console.log(item)
        if (searchCompareItems) {
            let obj = [...searchCompareItems]
            obj.sort((a, b) => a.itemSalePrice - b.itemSalePrice)
            return Object.keys(obj).map((i, val) => {
                return (
                    <Card key={obj[val].id + Math.random()} style={styles.storeCard}>
                        <Image
                            style={{ height: 100, width: "100%" }}
                            resizeMode="cover"
                            source={{ uri: obj[val].itemImageUrl }}
                        />
                        <Text style={styles.titleMain}>{obj[val].storeName}</Text>
                        <Text style={styles.title}>{obj[val].itemTitle}</Text>
                        <Text style={styles.title}>{obj[val].itemIngredients}</Text>
                        <Text style={styles.title}>Rs .{obj[val].itemSalePrice}</Text>

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
        <ScrollView>
            <View style={styles.top}>
                <Text style={{ textAlign: 'center', marginBottom: 10, color: 'white', fontWeight: 'bold', fontSize: 20 }}>COMPARE STORE ITEM PRICES
                    SEARCH FOR THE LOWEST PRICE PRODUCT</Text>
                <TextInput
                    placeholder="Search for Item ..."
                    onChangeText={(e) => handleSearchBar(e)}
                    value={defaultSearchValue}
                    style={styles.search}
                />
            </View>
            <View>
                {renderCompareItems && renderSearchItemsList()}
            </View>
        </ScrollView>
    )
}

export default CompareItem;

const styles = StyleSheet.create({
    top: {
        backgroundColor: 'orange',
        paddingVertical: 40,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        flex: 1,
        alignItems: 'center',
    },
    search: {
        backgroundColor: 'white',
        width: "80%",
        borderRadius: 50,
        padding: 5,
        paddingLeft: 10,
    },
    title : {
        textAlign : 'center',
        fontSize : 15

    },
    titleMain : {
        textAlign : 'center',
        fontSize : 18,
        fontWeight : 'bold'
    }
})