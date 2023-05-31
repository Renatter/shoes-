import {
    initializeApp
} from "firebase/app";
import {
    getAuth
} from "firebase/auth";
import {
    getFirestore
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getStorage
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyClQT1XoIyca9IlOHm9Vfpcad5Hbo58Xfc",
    authDomain: "shoe-17ad3.firebaseapp.com",
    projectId: "shoe-17ad3",
    storageBucket: "shoe-17ad3.appspot.com",
    messagingSenderId: "57786782409",
    appId: "1:57786782409:web:69a13ccb0dd2915c9d3318"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//initialize firebase auth
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app);
export {
    auth,
    db,
    storage
}