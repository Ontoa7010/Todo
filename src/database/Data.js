import InitialSetting from './index';
import React , { useEffect , useCotext } from 'react';
import AppContext from '../context';
import { LOAD_DATA } from '../actions';


const db = InitialSetting();

/**************データベースからTodoListを読み取る**************/
const asynReadDocument = () => {
    return new Promise( (resolve , reject ) => {
        const data = [];
        const docRef = db.collection("Label").doc("Test").collection("title").get();

        docRef.then( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                const insertData = { id:doc.id ,...doc.data() };
                data.push( insertData );
            });
            if(data != null){
                resolve(data);
            }else{
                reject('失敗');
            }
        });
    });
}

// firebaseに格納されているデータを読み取って一覧表示
export const readDocument = ({ dispatch }) => {
    asynReadDocument().then( 
        (value) => {
            // console.log(`value:`,value);
            dispatch({ type: LOAD_DATA , data:value});
        },
        (value)=>{
            console.log(`error:${value}`);
        }
    );
}

//firebaseに新しいドキュメントを追加
const addDocument = ( body , flag ) =>{
    const userRef = db.collection("users").doc("minase");
    db.collection("Label").doc("Test").collection("title").add({
        body,
        flag,
        userRef:userRef
    });
}

//firebaseにサブコレクションにドキュメントを追加
export const addSubDocument = (body , flag) => {
    db.collection("Label").doc("Test").collection("title").doc("emyXPeRm8qyDLemqKzPB").collection("SubList").add({
        body:"サブコレクションを追加してみた"
    });
}

export default addDocument;