import firebase from 'firebase';
import React from 'react';
import { LOAD_DATA } from '../actions';

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

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

export const data = [];

//データベースとのやり取りをする際、非同期処理の調整
const asynFunc1 = () => {
    return new Promise( (resolve , reject ) => {
        let i = 0;
        let docRef = db.collection("Mytask").get();

        docRef.then( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                // console.log( doc.id +': ' + doc.data());
                data[i] = doc.data();
                i++;
            });
            if(data != null){
                resolve(data);
            }else{
                reject('失敗');
            }
        });
    });
}

export const ReadDatabase = ({ state , dispatch }) => {
    asynFunc1().then( 
        (value) => {
            dispatch({ type: LOAD_DATA , data: value });
        },
        (value)=>{
            console.log(`error:${value}`);
        }
    );
    return (
        state.map( (event , index) => {
            return(
            <li  key={index}><input type="checkbox"/>{event.item}<button>削除</button></li>
            );
        })
    );
}



const AddDb = item =>{
    console.log(item);
    db.collection("Mytask").add({
        id: 200,
        item: item,
    }).then( (docRef) => {
        console.log("Document written with ID:" , docRef.id);
    }).catch( (error) =>{
        console.error("Error adding document: " , error);
    })
}


export default AddDb;