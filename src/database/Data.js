import InitialSetting from './index';
import firebase from 'firebase';
import { LOAD_DATA } from '../actions';
import label, { loadLabel } from '../reducers/LabelReducer';


const db = InitialSetting();
const MY_TASK = "MyTask";
const LABEL = "Label";
const POSTS = "Posts";
const USERS = "users";

/**********************データベースからラベルの一覧をを読み込む**************************/
const asyncReadLabel = ( ) =>{
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


export const readLabel = async ({dispatch}) =>{
    const data = await asyncReadLabel();
    dispatch(loadLabel(data));
    const postRefId = [];
    let labelId = '';

    data.forEach( (label)=>{  
        labelId = label.labelId;
        label.PostsList.forEach( (docRef)=>{
            postRefId.push(docRef.id);
        })
    })

    postRefId.forEach( async (docRefId)=>{
        const insert2 = [];
        const myTask = await db.collection(POSTS).doc(docRefId).get();
        const todo = await db.collection(POSTS).doc(docRefId).collection(MY_TASK).get();
        const insert1 = myTask.data();
        todo.forEach((doc)=>{
            insert2.push({ id:doc.id, ...doc.data()});
        });
        const insertData = { labelId ,myTaskId:docRefId, ...insert1, myTask:insert2 }
        dispatch({type:LOAD_DATA , data: insertData});
        
    });
}

/**************データベースからTodoListを読み取る**************/
const asyncReadDocument = ( labelName ) => {
    return new Promise( (resolve , reject ) => {
        const data = [];
        const docRef = db.collection(POSTS).doc(labelName).collection(MY_TASK).get();
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

/**************************firebaseに格納されているデータを読み取って一覧表示*****************/
export const readDocument = ({ dispatch } , labelName ) => {
    asyncReadDocument( labelName ).then( 
        (value) => {
            dispatch({ type: LOAD_DATA , data:value});
        },
        (error)=>{
            console.log(`error:${error}`);
        }
    );
}

/***************************firebaseに新しいTodoを作成する*********************************/
const insertDocument = ( subTitle , myTaskId ) =>{
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

const addDocument = async ( subTitle , myTaskId  )=>{
    return await insertDocument( subTitle , myTaskId );
}


/************************firebaseに新しいTaskを追加する**********************************/
const insertTask = ( taskName ) =>{
    return new Promise( (resolve , reject )=>{
        const id = { myTaskId:'',docId:''};
        db.collection(POSTS).add({
            title: taskName,
        }).then((docRef)=>{
            id.myTaskId = docRef.id;
            db.collection(POSTS).doc(docRef.id).collection(MY_TASK).add(
                {
                    // subTitle:       '',
                    // checkedFlag:    false,
                    // showListFlag:   true,
                    // subList:        [],
                    // date:           ''
                }
            ).then((docRef)=>{
                id.docId = docRef.id;
                resolve(id);
            });
        })
    });
}

export const addTask = async ( taskName , labelId ) =>{
    labelId = 'U5igZHyR35vSuXDan9jm';
    const labelRef = await db.collection(LABEL).doc(labelId);
    const id = await insertTask( taskName );
    const docRef = db.collection(POSTS).doc(id.myTaskId);
    labelRef.update({
        PostsList:  firebase.firestore.FieldValue.arrayUnion(docRef)
    });
    return id;
}


/*************************firebaseのドキュメントを削除する***************************/
export const deleteTaskDB = async ( event )=>{
    const docRef = db.collection(POSTS).doc(event.myTaskId);
    //サブコレクション以下も含め全てのドキュメントを削除する
    const docId = [];
    event.myTask.forEach((value)=>{
        docId.push(value.id);
    })
    docId.forEach((docId)=>{
        docRef.collection(MY_TASK).doc(docId).delete();
    })
    docRef.delete();

    //ラベルに保存している参照値を削除する

    const labelRef = db.collection(LABEL).doc(event.labelId);
    const Label= await labelRef.get();
    const PostsList = Label.data().PostsList;

    const updateList = await PostsList.filter( value => value.id !== event.myTaskId);
    labelRef.update({
        PostsList:  updateList
    });
}

/********************firebaseのTodoドキュメントを削除する*********************/
export const deleteTodoDB = async ( myTaskId ,docId )=>{
    db.collection(POSTS).doc(myTaskId).collection(MY_TASK).doc(docId).delete();
}

/**************************firebaseのドキュメントを更新する************************/
export const updateDocument = ( docId ,myTaskId, data ) =>{
    db.collection(POSTS).doc(myTaskId).collection(MY_TASK).doc(docId).update(data);
}

/*************************firebaseにサブリストにドキュメントを追加*******************************/
export const addSubList = ( docId ,myTaskId, data ) => {
    db.collection(POSTS).doc(myTaskId).collection(MY_TASK).doc(docId).update({
        subList: firebase.firestore.FieldValue.arrayUnion(data)
    }).then(()=>{
        console.log(`add subList complete!`);
    }).catch( ( error )=>{
        console.log( error );
    });
}

/******************firebaseのサブリストの要素を更新**************************/
export const updateSubList = ( docId , myTaskId , data  )=>{
    console.log(myTaskId);
    db.collection(POSTS).doc(myTaskId).collection(MY_TASK).doc(docId).update({
        subList: data
    }).then(()=>{
        console.log(`update subList complete!`);
    }).catch( ( error )=>{
        console.log( error );
    });
}

/***********************新しいラベルを追加*******************************/

export const addLabel = async ( labelName ) =>{
    db.collection(LABEL).add({
        labelName,
        PostsList:   []
    }).then( (docRef)=>{
        db.collection(POSTS).doc(docRef.id).collection(MY_TASK).add({
            title:  'Test Sample'
        });
    });
}

//ラベルを削除
export const deleteLabel = (docId) =>{
    db.collection(POSTS).doc(docId).delete().then(()=>{
        console.log(`delete document docId(${docId}) complete!`);
    });
}

export default addDocument;