import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCMms8-fvCnDxjBH_EHCXr9IWdPw8sM2yo",
    authDomain: "hoteloca-579ff.firebaseapp.com",
    projectId: "hoteloca-579ff",
    storageBucket: "hoteloca-579ff.appspot.com",
    messagingSenderId: "78970217343",
    appId: "1:78970217343:web:58477e1a9988ba23f6304a",
    measurementId: "G-6ZTJSDDJS9",
    databaseURL: "https://hoteloca-579ff-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
export const db = firebase;
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const userName = isJson(localStorage.getItem('user_authenticated')) ? JSON.parse(localStorage.getItem('user_authenticated')).user_name : "User"

export default firebase