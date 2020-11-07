import firebase from 'firebase';

import InitialSetting , {MY_TASK , LABEL , POSTS , USERS } from './index';

//firebaseと接続するための初期設定
const db = InitialSetting();

/***********************新しいラベルを追加*******************************/

const addLabel = ( labelName ) =>{
    db.collection(LABEL).add({
        labelName,
        PostsList:   []
    })
    .then( (docRef)=>{
        db.collection(POSTS).doc(docRef.id).collection(MY_TASK).add({
            title:  'Test Sample'
        });
    })
    .catch( ( error )=>{
        console.log( error );
    });
}

/******************************ラベルを削除***********************/
export const deleteLabel = (docId) =>{
    db.collection(POSTS).doc(docId).delete()
    .catch( ( error )=>{
        console.log( error );
    });
}

export default addLabel;