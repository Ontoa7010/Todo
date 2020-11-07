import React from 'react';

import Form from './Form';
import Logs from './Logs';
import TodoList from './TodoList';


const Label = ()=>{
    return (
        <>
            <Form />
            <TodoList />
            <Logs />
        </>
    )
}

export default Label;