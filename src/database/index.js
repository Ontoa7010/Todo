import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCABthIjRkbNcAYOI6pC8HMHFwVf-tWFcQ",
    authDomain: "todo-2e4dd.firebaseapp.com",
    databaseURL: "https://todo-2e4dd.firebaseio.com",
    projectId: "todo-2e4dd",
    storageBucket: "todo-2e4dd.appspot.com",
    messagingSenderId: "244646709560",
    appId: "1:244646709560:web:d3491121a5821dd67159cd",
    measurementId: "G-H11N76HN7R"
};

//firebaseの初期設定
const InitialSetting = () =>{    
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    }
    const db = firebase.firestore();
    return db;
}

//CloudStoreの固有名詞を宣言
export const MY_TASK = "MyTask";
export const LABEL = "Label";
export const POSTS = "Posts";
export const USERS = "users";


export default InitialSetting;