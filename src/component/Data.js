// import firebase from 'firebase';
    const firebase = require("firebase");
    // Required for side-effects
    require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCABthIjRkbNcAYOI6pC8HMHFwVf-tWFcQ",
  authDomain: "todo-2e4dd.firebaseapp.com",
  databaseURL: "https://todo-2e4dd.firebaseio.com",
  projectId: "todo-2e4dd",
  storageBucket: "todo-2e4dd.appspot.com",
  messagingSenderId: "244646709560",
  appId: "1:244646709560:web:d3491121a5821dd67159cd",
  measurementId: "G-H11N76HN7R"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

const ReadDatabase = () => {
    let docRef = db.collection("test").doc("test");
    // console.log(docRef);

    let docRef2 = db.collection("MyTask").get().then( (querySnapshot) => {
        querySnapshot.forEach( (doc) => {
            console.log(doc.id +': ' + doc.data().item);
        })
    });
    // console.log(docRef2);


    // docRef.get().then( (doc) => {
    //     if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //         console.log("Document id:" , doc.data().id);
    //         console.log("Document id:" , doc.data().message);
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }).catch(function(error) {
    //     console.log("Error getting document:", error);
    // });
}

export default ReadDatabase;