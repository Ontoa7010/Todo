import React , { useContext , useEffect } from 'react';

import Form from './Form';
import Logs from './Logs';
import TodoList from './TodoList';

import AppContext from '../../context';
import { readDocument } from '../../database/Data';

const Main = () =>{

    const { dispatch }  = useContext( AppContext );

    useEffect(()=>{
        readDocument({dispatch});
    },[]);

    return(
        <div id="main">
            <h2>TodoList</h2>
            <Form />
            <TodoList />
            <Logs />
        </div>
    );
}

export default Main;