import InitialSetting from './index';
import firebase from 'firebase';
import { LOAD_DATA } from '../actions';
import { loadLabel } from '../reducers/LabelReducer';


const db = InitialSetting();
const MY_TASK = "MyTask";
const LABEL = "Label";
const POSTS = "Posts";
const USERS = "users";

//データベースからラベルの一覧をを読み込む
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
            // console.log('labelData:',data);
        })
    });   
}


export const readLabel = async ({dispatch}) =>{
    const data = await asyncReadLabel();
    dispatch(loadLabel(data));
    const postRefId = [];
    let labelId = '';

    data.forEach( (label)=>{  
        // console.log('label.PostsList:',label.PostsList); 
        // console.log('label.id:',label.labelId);
        labelId = label.labelId;
        label.PostsList.forEach( (docRef)=>{
            postRefId.push(docRef.id);
        })
    })
    // console.log('postRefId:',postRefId);
    postRefId.forEach( async (docRefId)=>{
        const myTask = await db.collection(POSTS).doc(docRefId).get();
        const todo = await db.collection(POSTS).doc(docRefId).collection(MY_TASK).get();
        const insert1 = myTask.data();
        todo.forEach((doc)=>{
            // console.log('doc:' ,doc);
            // console.log('docData:', doc.data());
            const insert2 = { id:doc.id, ...doc.data()};
            const insertData = { labelId , ...insert1, ...insert2 }
            // console.log('insertData:',insertData);
            dispatch({type:LOAD_DATA , data: insertData});
        });
        
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

// firebaseに格納されているデータを読み取って一覧表示
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

// firebaseに新しいドキュメントを追加
const insertDocument = ( title , labelName ) =>{
    return new Promise( (resolve , reject )=> {
        db.collection(POSTS).doc(labelName).collection(MY_TASK).add({
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

const addDocument = async ( title , labelName  )=>{
    return await insertDocument( title , labelName );
}


//firebaseに新しいTaskを追加する
const insertTask = ( taskName ) =>{
    return new Promise( (resolve , reject )=>{
        db.collection(POSTS).add({
            title: taskName,
        }).then((docRef)=>{
            db.collection(POSTS).doc(docRef.id).collection(MY_TASK).add({
                subTitle:  '',
                checkedFlag:    false,
                showListFlag:   true,
                subList:        [],
                date:           ''
            }).then((docRef)=>{
                resolve(docRef.id);
            });
        })
    });
}

export const addTask = async ( taskName ,labelId , docId ) =>{
    console.log(`labelId:${labelId}`);
    const labelRef = await db.collection(POSTS).doc(labelId);
    const docRef = await db.collection(POSTS).doc(docId);
    labelRef.update({
        PostsList:  firebase.firestore.FieldValue.arrayUnion(docRef)
    });
    return await insertTask( taskName );
}

//firebaseのドキュメントを削除する
export const deleteDocument = ( docId , labelName )=>{
    db.collection(POSTS).doc(labelName).collection(MY_TASK).doc(docId).delete().then(()=>{
        console.log(`delete document docId(${docId}) complete!`);
    });
}

//firebaseのドキュメントを更新する
export const updateDocument = ( docId ,labelName, data ) =>{
    db.collection(POSTS).doc(labelName).collection(MY_TASK).doc(docId).update(data);
}

//firebaseにサブリストにドキュメントを追加
export const addSubList = ( docId ,labelName, data ) => {
    db.collection(POSTS).doc(labelName).collection(MY_TASK).doc(docId).update({
        subList: firebase.firestore.FieldValue.arrayUnion(data)
    }).then(()=>{
        console.log(`add subList complete!`);
    }).catch( ( error )=>{
        console.log( error );
    });
}

//firebaseのサブリストの要素を更新
export const updateSubList = ( docId , labelName , data  )=>{
    db.collection(POSTS).doc(labelName).collection(MY_TASK).doc(docId).update({
        subList: data
    }).then(()=>{
        console.log(`update subList complete!`);
    }).catch( ( error )=>{
        console.log( error );
    });
}

//新しいラベルを追加

export const addLabel = async ( labelName ) =>{
    // const postsRef = await db.collection(POSTS).doc('minase');
    db.collection(LABEL).add({
        labelName,
        postsList:   []
    }).then( (docRef)=>{
        db.collection(POSTS).doc(docRef.id).collection(MY_TASK).add({
            title:  'Test Sample'
        });
    });
}

export const deleteLabel = (docId) =>{
    db.collection(POSTS).doc(docId).delete().then(()=>{
        console.log(`delete document docId(${docId}) complete!`);
    });
}

export default addDocument;