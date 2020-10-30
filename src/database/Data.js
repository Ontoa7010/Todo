import InitialSetting from './index';
import firebase from 'firebase';
import { LOAD_DATA } from '../actions';


const db = InitialSetting();

/**************データベースからTodoListを読み取る**************/
const asynReadDocument = () => {
    return new Promise( (resolve , reject ) => {
        const data = [];
        const docRef = db.collection("Label").doc("Test").collection("MyTask").get();
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
            dispatch({ type: LOAD_DATA , data:value});
        },
        (value)=>{
            console.log(`error:${value}`);
        }
    );
}

//firebaseに新しいドキュメントを追加
const insertDocument = ( title ) =>{
    return new Promise( (resolve , reject )=> {
        db.collection("Label").doc("Test").collection("MyTask").add({
            title,
            checkedFlag:    false,
            showListFlag:   true,
            subList:        [],
            date:           ''
        }).then( (docRef)=>{
            resolve(docRef.id);
        }).catch( (error)=>{
            resolve(error);
        });
    })
}

const addDocument = async ( title )=>{
    return await insertDocument( title );
}

//firebaseのドキュメントを削除する
export const deleteDocument = ( docId )=>{
    db.collection("Label").doc("Test").collection("MyTask").doc(docId).delete().then(()=>{
        console.log(`delete document docId(${docId}) complete!`);
    });
}

//firebaseのドキュメントを更新する
export const updateDocument = ( docId , data ) =>{
    db.collection("Label").doc("Test").collection("MyTask").doc(docId).update(data);
}

//firebaseにサブリストにドキュメントを追加
export const addSubList = ( docId , data ) => {
    db.collection("Label").doc("Test").collection("MyTask").doc(docId).update({
        subList: firebase.firestore.FieldValue.arrayUnion(data)
    }).then(()=>{
        console.log(`add subList complete!`);
    }).catch( ( error )=>{
        console.log( error );
    });
}

//firebaseのサブリストの要素を更新
export const updateSubList = ( docId , data )=>{
    db.collection("Label").doc("Test").collection("MyTask").doc(docId).update({
        subList: data
    }).then(()=>{
        console.log(`update subList complete!`);
    }).catch( ( error )=>{
        console.log( error );
    });
}


export default addDocument;