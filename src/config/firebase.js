import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyBzq5usz5dk9TD6akK_vWO5fcLCZnLZxKs",
    authDomain: "kiryana-grocery-store.firebaseapp.com",
    projectId: "kiryana-grocery-store",
    storageBucket: "kiryana-grocery-store.appspot.com",
    messagingSenderId: "59433868327",
    appId: "1:59433868327:web:e96b23ce612fb7fb340202",
    measurementId: "G-1922BNNB80"
};

// Initialize Firebase

var app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}


const firestore = firebase.firestore();
const auth = firebase.auth()
const storage = firebase.storage()
firestore.settings({ experimentalForceLongPolling: true, merge: true });

// console.log(auth)


function signUp(userDetails) {
    const { userName, userEmail, userPassword, userCity, userCountry, userGender, userAge, userProfileImage, isRestaurant, typeOfFood, userMapLink, contentType } = userDetails;
    const metadata = {
        contentType: contentType
    }
    return new Promise(async (resolve, reject) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", userProfileImage, true);
            xhr.send(null);
        });

        const filename = userProfileImage.substring(userProfileImage.lastIndexOf('/') + 1);

        auth.createUserWithEmailAndPassword(userDetails.userEmail, userDetails.userPassword).then((success) => {
            let user = auth.currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            };
            storage.ref().child(`userProfileImage/${uid}/` + filename).put(blob, metadata).then((url) => {
                url.ref.getDownloadURL().then((success) => {
                    const userProfileImageUrl = success
                    console.log(userProfileImageUrl)
                    const userDetailsForDb = {
                        userName: userName,
                        userEmail: userEmail,
                        userPassword: userPassword,
                        userCity: userCity,
                        userCountry: userCountry,
                        userGender: userGender,
                        userAge: userAge,
                        userUid: uid,
                        isRestaurant: isRestaurant,
                        userProfileImageUrl: userProfileImageUrl,
                        typeOfFood: typeOfFood,
                    }
                    firestore.collection("users").doc(uid).set(userDetailsForDb).then((docRef) => {
                        // console.log("Document written with ID: ", docRef.id);
                        resolve(userDetailsForDb)
                    }).catch(function (error) {
                        console.error("Error adding document: ", error);
                        reject(error)
                    })
                }).catch((error) => {
                    // Handle Errors here.
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log("Error in getDownloadURL function", errorMessage);
                    reject(errorMessage)
                })
            }).catch((error) => {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("Error in Image Uploading", errorMessage);
                reject(errorMessage)
            })
        }).catch((error) => {
            var errorMessage = error.message;
            console.log("Error in Authentication", errorMessage);
            reject(errorMessage)
        })
    })
}

function logIn(userLoginDetails) {
    return new Promise((resolve, reject) => {
        const { userLoginEmail, userLoginPassword } = userLoginDetails;
        auth.signInWithEmailAndPassword(userLoginEmail, userLoginPassword).then((success) => {
            firestore.collection('users').doc(success.user.uid).get().then((snapshot) => {
                console.log("snapshot.data =>>", snapshot.data().isRestaurant);
                if (snapshot.data().isRestaurant) {
                    userLoginDetails.propsHistory.navigate("StoreNavigator");
                    resolve(success)
                } else {
                    userLoginDetails.propsHistory.push("UserNavigator");
                    resolve(success)
                }
            })
        }).catch((error) => {
            // Handle Errors here.
            // var errorCode = error.code;
            var errorMessage = error.message;
            reject(errorMessage)
        });

    })
}

function addItem(itemDetails) {
    const { itemTitle, itemIngredients, itemSalePrice, itemPrice, itemImage, chooseItemType, propsHistory, contentType } = itemDetails;
    const metadata = {
        contentType: contentType
    }
    return new Promise(async (resolve, reject) => {

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", itemImage, true);
            xhr.send(null);
        });

        const filename = itemImage.substring(itemImage.lastIndexOf('/') + 1);

        let user = auth.currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        };
        var imgId = Math.random()
        // console.log(imgId)
        storage.ref().child(`itemImage/${uid}/` + imgId + filename).put(blob, metadata).then((url) => {
            url.ref.getDownloadURL().then((success) => {
                const itemImageUrl = success
                console.log(itemImageUrl)
                const itemDetailsForDb = {
                    itemTitle: itemTitle,
                    itemIngredients: itemIngredients,
                    itemPrice: itemPrice,
                    itemSalePrice: itemSalePrice,
                    itemImageUrl: itemImageUrl,
                    chooseItemType: chooseItemType,
                    // userUid: uid,
                }
                firestore.collection("users").doc(uid).collection("menuItems").add(itemDetailsForDb).then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    resolve("Successfully added item")
                }).catch(function (error) {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    reject(errorMessage)
                    // console.error("Error adding document: ", error);
                })
            }).catch((error) => {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("Error in getDownloadURL function", errorCode);
                console.log("Error in getDownloadURL function", errorMessage);
                reject(errorMessage)
            })
        }).catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("Error in Image Uploading", errorMessage);
            reject(errorMessage)
        })
    })
}

function orderNow(cartItemsList, totalPrice, totalActualPrice, resDetails, userDetails, history) {
    return new Promise((resolve, reject) => {
        let user = auth.currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        };

        const myOrder = {
            itemsList: cartItemsList,
            totalPrice: totalPrice,
            totalActualPrice: totalActualPrice,
            status: "PENDING",
            ...resDetails,
        }

        const orderRequest = {
            itemsList: cartItemsList,
            totalPrice: totalPrice,
            totalActualPrice: totalActualPrice,
            status: "PENDING",
            ...userDetails,
        }

        // console.log("myOrder => ", myOrder)
        // console.log("orderRequest => ", orderRequest)
        firestore.collection("users").doc(uid).collection("myOrder").add(myOrder).then((docRef) => {
            // console.log(docRef.id)
            firestore.collection("users").doc(resDetails.id).collection("orderRequest").doc(docRef.id).set(orderRequest).then((docRef) => {
                // console.log("Document written with ID: ", docRef.id);
                resolve('Successfully ordered')
                // history.push("/my-orders");
            }).catch(function (error) {
                console.error("Error adding document: ", error.message);
                reject(error.message)
            })
        }).catch(function (error) {
            console.error("Error adding document: ", error.message);
            reject(error.message)
        })
    })
}

export default firebase;
export {
    firestore,
    auth,
    storage,
    signUp,
    logIn,
    addItem,
    orderNow,
}