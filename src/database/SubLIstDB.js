import firebase from 'firebase';

import InitialSetting , { MY_TASK , LABEL , POSTS , USERS } from './index';

//firebaseと接続するための初期設定
const db = InitialSetting();

/*************************firebaseにサブリストにドキュメントを追加*******************************/
const addSubList = ( docId ,myTaskId, data ) => {
    db.collection(POSTS).doc(myTaskId).collection(MY_TASK).doc(docId).update({
        subList: firebase.firestore.FieldValue.arrayUnion(data)
    })
    .catch( ( error )=>{
        console.log( error );
    });
}

/******************firebaseのサブリストの要素を更新**************************/
export const updateSubListDB = ( docId , myTaskId , data  )=>{
    console.log(myTaskId);
    db.collection(POSTS).doc(myTaskId).collection(MY_TASK).doc(docId).update({
        subList: data
    })
    .catch( ( error )=>{
        console.log( error );
    });
}

export default addSubList;