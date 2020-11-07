import firebase from 'firebase';

import InitialSetting , { MY_TASK , LABEL , POSTS , USERS } from './index';

//firebaseと接続するための初期設定
const db = InitialSetting();

/***************************firebaseに新しいTodoを作成する*********************************/
const asyncAddTodo = ( subTitle , myTaskId ) =>{
    return new Promise( (resolve , reject )=> {
        db.collection(POSTS).doc(myTaskId).collection(MY_TASK).add({
            subTitle,
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

const addTodoDB = async ( subTitle , myTaskId  )=>{
    return await asyncAddTodo( subTitle , myTaskId );
}

/********************firebaseのTodoドキュメントを削除する*********************/
export const deleteTodoDB = async ( myTaskId ,docId )=>{
    db.collection(POSTS).doc(myTaskId).collection(MY_TASK).doc(docId).delete()
    .catch( ( error )=>{
        console.log( error );
    });
}

/**************************firebaseのドキュメントを更新する************************/
export const updateTodoDB = ( docId ,myTaskId, data ) =>{
    db.collection(POSTS).doc(myTaskId).collection(MY_TASK).doc(docId).update(data)
    .catch( ( error )=>{
        console.log( error );
    });
}

export default addTodoDB;