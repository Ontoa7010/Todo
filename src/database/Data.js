import firebase from 'firebase';

import InitialSetting , {MY_TASK , LABEL , POSTS , USERS } from './index';

import { loadData } from '../reducers/TodoActionCreaters'
import { loadLabel } from '../reducers/LabelReducer';

//firebaseと接続するための初期設定
const db = InitialSetting();

/**********************データベースからラベルの一覧をを読み込む**************************/
const asyncReadDB = ( ) =>{
    return new Promise( (resolve , reject )=>{
        const data = [];
        db.collection(LABEL).get().then( (querySnapshot)=>{
            querySnapshot.forEach( (doc)=>{
                data.push( {labelId:doc.id, ...doc.data()} );
            });
        })
        .then(()=>{
            resolve(data);
        })
    });   
}

const asyncInsertData = async ( docRefId , labelId ,{dispatch} ) =>{
    const insert2 = [];
    const myTask = await db.collection(POSTS).doc(docRefId).get();
    const todo = await db.collection(POSTS).doc(docRefId).collection(MY_TASK).get();
    const insert1 = myTask.data();
    todo.forEach((doc)=>{
        insert2.push({ id:doc.id, ...doc.data()});
    });
    const insertData = { labelId ,myTaskId:docRefId, ...insert1, myTask:insert2 };

    console.log('insertData:',insertData);
    dispatch(loadData( insertData ));
}

const readDB = async ({dispatch}) =>{
    const data = await asyncReadDB();
    dispatch(loadLabel(data));

    const promiseArray = [];

    data.forEach( (label)=>{  
        const labelId = label.labelId;
        label.PostsList.forEach( (docRef)=>{
            promiseArray.push( asyncInsertData( docRef.id , labelId ,{dispatch}));
        });
    })

    await Promise.all(promiseArray);
}

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

export const addTodo = async ( subTitle , myTaskId  )=>{
    return await asyncAddTodo( subTitle , myTaskId );
}

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

/********************firebaseのTodoドキュメントを削除する*********************/
export const deleteTodoDB = async ( myTaskId ,docId )=>{
    db.collection(POSTS).doc(myTaskId).collection(MY_TASK).doc(docId).delete()
    .catch( ( error )=>{
        console.log( error );
    });
}

/**************************firebaseのドキュメントを更新する************************/
export const updateDocument = ( docId ,myTaskId, data ) =>{
    db.collection(POSTS).doc(myTaskId).collection(MY_TASK).doc(docId).update(data)
    .catch( ( error )=>{
        console.log( error );
    });
}

/*************************firebaseにサブリストにドキュメントを追加*******************************/
export const addSubList = ( docId ,myTaskId, data ) => {
    db.collection(POSTS).doc(myTaskId).collection(MY_TASK).doc(docId).update({
        subList: firebase.firestore.FieldValue.arrayUnion(data)
    })
    .catch( ( error )=>{
        console.log( error );
    });
}

/******************firebaseのサブリストの要素を更新**************************/
export const updateSubList = ( docId , myTaskId , data  )=>{
    console.log(myTaskId);
    db.collection(POSTS).doc(myTaskId).collection(MY_TASK).doc(docId).update({
        subList: data
    })
    .catch( ( error )=>{
        console.log( error );
    });
}

/***********************新しいラベルを追加*******************************/

export const addLabel = ( labelName ) =>{
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

export default readDB;