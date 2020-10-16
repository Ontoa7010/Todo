import firebase from 'firebase';
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

//データベースとのやり取りをする際、非同期処理の調整
const asynReadDocument = () => {
    return new Promise( (resolve , reject ) => {
        const data = [];
        // console.log('db:' ,db);
        let docRef = db.collection("Mytask").get();
        docRef.then( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                // console.log(doc);
                data.push( doc.data() );
            });
            if(data != null){
                resolve(data);
            }else{
                reject('失敗');
            }
        });
    });
}

//firebaseに格納されているデータを読み取って一覧表示
export const readDocument = ({ dispatch }) => {
    asynReadDocument().then( 
        (value) => {
            dispatch({ type: LOAD_DATA , data: value });
        },
        (value)=>{
            console.log(`error:${value}`);
        }
    );
}


//サブコレクションのデータを取得する
const asynReadSubDocument = (id) => {
    return new Promise( (resolve , reject ) => {
        const data = [];
        // console.log('db:' ,db);
        let docRef = db.collection("Mytask").doc(`${id}`).collection('SubTask').get();
        docRef.then( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                // console.log(doc);
                data.push( doc.data() );
            });
            if(data != null){
                resolve(data);
            }else{
                reject('失敗');
            }
        });
    });
}

export const readSubCollection = ({ dispatch , id })=>{
    asynReadDocument( id ).then( 
        ( value ) => {
            dispatch({ type: LOAD_DATA , data: value });
            console.log(value);
        },
        ( value )=>{
            console.log(`error:${value}`);
        }
    );
}


//firebaseに新しいドキュメントを追加
const addDocument = (item, id) =>{
    db.collection("Mytask").doc(`${id}`).set({
        id,
        item,
    }).then( (docRef) => {
        console.log("Document written with ID:" , docRef.id);
    }).catch( (error) =>{
        console.error("Error adding document: " , error);
    })
}

//ドキュメントを削除する関数
export const deleteDocument = (item , id) =>{
    db.collection("Mytask").doc(`${id}`).delete().then( (docRef) => {
        console.log("Document delete with ID:" , docRef.id);
    }).catch( (error) =>{
        console.error("Error delete document: " , error);
    })
}

//サブコレクションにドキュメントを追加すす
export const addSubDocument = () => {
    db.collection('Mytask').doc('6').collection('SubTask').doc('0').set({
        id: 0,
        item: 'SubTask',
    }).then( (docRef) => {
        console.log("Document written with ID:" , docRef.id);
    }).catch( (error) =>{
        console.error("Error adding document: " , error);
    })
}


export default addDocument;