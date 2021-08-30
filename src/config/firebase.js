import * as firebase from 'firebase';
import 'firebase/firestore'
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

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}


const db = firebase.firestore();

function signUp(userDetails) {
    return new Promise((resolve, reject) => {
        const { userName, userEmail, userPassword, userCity, userCountry, userGender, userAge, userProfileImage, isRestaurant, typeOfFood } = userDetails;
        firebase.auth().createUserWithEmailAndPassword(userDetails.userEmail, userDetails.userPassword).then((success) => {
            let user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            };
            firebase.storage().ref().child(`userProfileImage/${uid}/` + userProfileImage.name).put(userProfileImage).then((url) => {
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
                    db.collection("users").doc(uid).set(userDetailsForDb).then((docRef) => {
                        // console.log("Document written with ID: ", docRef.id);
                        if(userDetailsForDb.isRestaurant){
                            userDetails.propsHistory.push("/order-requests");
                            resolve(userDetailsForDb)
                        }else{
                            userDetails.propsHistory.push("/");
                            resolve(userDetailsForDb)
                        }
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
        firebase.auth().signInWithEmailAndPassword(userLoginEmail, userLoginPassword).then((success) => {
            db.collection('users').doc(success.user.uid).get().then((snapshot) => {
                console.log("snapshot.data =>>", snapshot.data().isRestaurant);
                if(snapshot.data().isRestaurant){
                    userLoginDetails.propsHistory.push("/order-requests");
                    resolve(success)
                }else{
                    userLoginDetails.propsHistory.push("/");
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
    const { itemTitle, itemIngredients,itemSalePrice, itemPrice, itemImage, chooseItemType, } = itemDetails;
    return new Promise((resolve, reject) => {
        let user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        };
        var imgId = Math.random()
        // console.log(imgId)
        firebase.storage().ref().child(`itemImage/${uid}/` + itemImage.name + imgId).put(itemImage).then((url) => {
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
                db.collection("users").doc(uid).collection("menuItems").add(itemDetailsForDb).then((docRef) => {
                    // console.log("Document written with ID: ", docRef.id);
                    // itemDetails.propsHistory.push("/my-foods");
                    resolve("Successfully added food item")
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

function orderNow(cartItemsList, totalPrice, totalActualPrice,resDetails, userDetails, history) {
    return new Promise((resolve, reject) => {
        let user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
            uid = user.uid;
        };

        const myOrder = {
            itemsList: cartItemsList,
            totalPrice: totalPrice,
            totalActualPrice : totalActualPrice,
            status: "PENDING",
            ...resDetails,
        }

        const orderRequest = {
            itemsList: cartItemsList,
            totalPrice: totalPrice,
            totalActualPrice : totalActualPrice,
            status: "PENDING",
            ...userDetails,
        }

        // console.log("myOrder => ", myOrder)
        // console.log("orderRequest => ", orderRequest)
        db.collection("users").doc(uid).collection("myOrder").add(myOrder).then((docRef) => {
            // console.log(docRef.id)
            db.collection("users").doc(resDetails.id).collection("orderRequest").doc(docRef.id).set(orderRequest).then((docRef) => {
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
    signUp,
    logIn,
    addItem,
    orderNow,
}