import React from 'react';

import Form from './Form';
import Logs from './Logs';
import TodoList from './TodoList';
import TodoListDB from './TodoListDB';

const Main = () =>{
    return(
        <div id="main">
            <h2>TodoList</h2>
            <Form />
            <TodoList />
            <TodoListDB />
            <Logs />
        </div>
    );
}

export default Main;