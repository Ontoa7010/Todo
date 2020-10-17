import React from 'react';

import Form from './Form';
import Logs from './Logs';
import TodoList from './TodoList';

const Main = () =>{
    
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