import InitialSetting from './index';

const db = InitialSetting();

/**************データベースからTodoListを読み取る**************/
const asynReadDocument = () => {
    return new Promise( (resolve , reject ) => {
        const data = [];
        const docRef = db.collection("posts").get();
        docRef.then( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                // console.log(doc);
                console.log( doc.data());
                data[doc.id] = ( doc.data() );
            });
            if(data != null){
                resolve(data);
            }else{
                reject('失敗');
            }
        });
    });
}
const asynReadDocument2 = () => {
    return new Promise( (resolve , reject ) => {
        const data = [];
        const docRef = db.collection("posts").get();
        docRef.then( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                // console.log(doc);
                data[doc.id] = ( doc.data() );
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
export const readDocument = () => {
    asynReadDocument().then( 
        (value) => {
            // dispatch({ type: LOAD_DATA , data: value });
            console.log(`value:`,value);
        },
        (value)=>{
            console.log(`error:${value}`);
        }
    );
}

//firebaseに新しいドキュメントを追加
const addDocument = ( body , flag ) =>{
    const ref = db.collection("users").doc("minase");
    db.collection("posts").doc(body).set()({
        body,
        flag,
        userRef:ref
    }).then( (docRef) => {
        console.log("Document written with ID:" , docRef.id);
    }).catch( (error) =>{
        console.error("Error adding document: " , error);
    })
}

export const addSubCollection = () => {
    // db.collection("posts").doc("test").update({
    //     flag:false
    // });

    db.collection("posts").doc("test").collection("SubList").add({
        body:"サブコレクションを追加してみた"
    });
}

export default addDocument;