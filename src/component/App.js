import React , { useReducer , useState , useEffect } from 'react';

import reducer ,{ addTodo } from '../reducers';
import Header from './Header';
import Form from './Form';
import Event from './Event';
import { readDocument , addSubDocument , readSubCollection } from './Data';


import '../css/App.css';

const App = () => {
    const [ state , dispatch ] = useReducer( reducer , [] ); 

    //データベースからデータ読み込んでステートに保存
    useEffect( ()=>{
        readDocument({ dispatch });
    }, [] );

    useEffect( ()=> {
        readSubCollection(6);
    },[]);
    // サブコレクションにドキュメントを追加するテスト用コード
    // useEffect( () => {
    //     addSubDocument();
    // }, [] );

    return (
        <>
            <Header />
            <div id="main">
                <h2>TodoList</h2>
                <Form dispatch={dispatch}/>
                <table>
                    <thead>
                    </thead>
                    <tbody>
                        { state.map( (event , index) => {
                            return(
                                <Event key={index} event={event} dispatch={dispatch}/>
                            );
                        })}
                    </tbody>
                </table>

            </div>
        </>
    );
}


export default App;