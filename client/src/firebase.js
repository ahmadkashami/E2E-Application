import  firebase  from "firebase/compat/app";
import "firebase/compat/database";


const firebaseConfig = {
    apiKey: "AIzaSyAhy6qDvHDdVke7zaF01_7K4QAVePxpCZM",
    authDomain: "fir-crus.firebaseapp.com",
    databaseURL: "https://fir-crus-default-rtdb.firebaseio.com",
    projectId: "fir-crus",
    storageBucket: "fir-crus.appspot.com",
    messagingSenderId: "434540581046",
    appId: "1:434540581046:web:5e9de458c966022ca4d617",
    measurementId: "G-72ZK9KW9MY"
};

const fireDb=firebase.initializeApp(firebaseConfig)
export  default  fireDb.database().ref();
