import InitialSetting from './index';
import firebase from 'firebase';
import { LOAD_DATA } from '../actions';


const db = InitialSetting();
const MY_TASK = "MyTask";
const LABEL = "Label";

/**************データベースからTodoListを読み取る**************/
const asynReadDocument = ( labelName ) => {
    return new Promise( (resolve , reject ) => {
        const data = [];
        const docRef = db.collection(LABEL).doc(labelName).collection(MY_TASK).get();
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
export const readDocument = ({ dispatch } , labelName ) => {
    asynReadDocument( labelName ).then( 
        (value) => {
            dispatch({ type: LOAD_DATA , data:value});
        },
        (value)=>{
            console.log(`error:${value}`);
        }
    );
}

//firebaseに新しいドキュメントを追加
const insertDocument = ( title , labelName ) =>{
    return new Promise( (resolve , reject )=> {
        db.collection(LABEL).doc(labelName).collection(MY_TASK).add({
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

const addDocument = async ( title , labelName )=>{
    return await insertDocument( title , labelName );
}

//firebaseのドキュメントを削除する
export const deleteDocument = ( docId , labelName )=>{
    db.collection(LABEL).doc(labelName).collection(MY_TASK).doc(docId).delete().then(()=>{
        console.log(`delete document docId(${docId}) complete!`);
    });
}

//firebaseのドキュメントを更新する
export const updateDocument = ( docId ,labelName, data ) =>{
    db.collection(LABEL).doc(labelName).collection(MY_TASK).doc(docId).update(data);
}

//firebaseにサブリストにドキュメントを追加
export const addSubList = ( docId ,labelName, data ) => {
    db.collection(LABEL).doc(labelName).collection(MY_TASK).doc(docId).update({
        subList: firebase.firestore.FieldValue.arrayUnion(data)
    }).then(()=>{
        console.log(`add subList complete!`);
    }).catch( ( error )=>{
        console.log( error );
    });
}

//firebaseのサブリストの要素を更新
export const updateSubList = ( docId , labelName , data  )=>{
    db.collection(LABEL).doc(labelName).collection(MY_TASK).doc(docId).update({
        subList: data
    }).then(()=>{
        console.log(`update subList complete!`);
    }).catch( ( error )=>{
        console.log( error );
    });
}

//新しいラベルを追加
export const addLabel = ( labelName ) =>{
    db.collection(LABEL).add({
        labelName,
        date:   ''
    }).then( (docRef)=>{
        db.collection(LABEL).doc(docRef.id).collection(MY_TASK).add({
            title:  'Test Sample'
        });
    });
}


export default addDocument;