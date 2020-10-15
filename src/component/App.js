import React , { useReducer , useState , useEffect } from 'react';

import reducer ,{ addTodo } from '../reducers';
import Header from './Header';
import Form from './Form';
import Event from './Event';
import { readDocument } from './Data';

import '../css/App.css';

const App = () => {
    const [ state , dispatch ] = useReducer( reducer , [] ); 

    //データベースからデータ読み込んでステートに保存
    useEffect( ()=>{
        readDocument({ dispatch });
    }, [] );

    return (
        <div>
            <Header />
            <Form dispatch={dispatch}/>
            <ul>
                { state.map( (event , index) => {
                    return(
                        <Event key={index} event={event} dispatch={dispatch}/>
                    );
                })}
            </ul>
        </div>
    );
}


export default App;