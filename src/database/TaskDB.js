import firebase from 'firebase';

import InitialSetting , {MY_TASK , LABEL , POSTS , USERS } from './index';

//firebaseと接続するための初期設定
const db = InitialSetting();

/************************firebaseに新しいTaskを追加する**********************************/
const asyncInsertTask = ( taskName ) =>{
    return new Promise( (resolve , reject )=>{
        const id = { myTaskId:'',docId:''};
        db.collection(POSTS).add({
            title: taskName,
        })
        .then((docRef)=>{
            id.myTaskId = docRef.id;
            db.collection(POSTS).doc(docRef.id).collection(MY_TASK).add({})
            .then((docRef)=>{
                id.docId = docRef.id;
                resolve(id);
            });
        })
    });
}

export const addTask = async ( taskName , labelId ) =>{
    const labelRef = db.collection(LABEL).doc(labelId);
    const id = await asyncInsertTask( taskName );
    const docRef = db.collection(POSTS).doc(id.myTaskId);
    labelRef.update({
        PostsList:  firebase.firestore.FieldValue.arrayUnion(docRef)
    }).catch( ( error )=>{
        console.log( error );
    });
    return id;
}

/*************************firebaseのドキュメントを削除する***************************/
export const deleteTaskDB = async ( event )=>{
    const { labelId , myTaskId , myTask} = event
    const docRef = db.collection(POSTS).doc(myTaskId);

    //サブコレクション以下も含め全てのドキュメントを削除する
    const docId = [];
    myTask.forEach((value)=>{
        docId.push(value.id);
    })
    docId.forEach((docId)=>{
        docRef.collection(MY_TASK).doc(docId).delete()
        .catch( ( error )=>{
            console.log( error );
        });
    })
    docRef.delete();

    //ラベルに保存している参照値を削除する
    const labelRef = db.collection(LABEL).doc(labelId);
    const Label= await labelRef.get();
    const PostsList = Label.data().PostsList;
    const updateList = await PostsList.filter( value => value.id !== myTaskId);

    labelRef.update({ PostsList:  updateList })
    .catch( ( error )=>{
        console.log( error );
    });;
}