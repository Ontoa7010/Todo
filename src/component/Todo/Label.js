import React , { useContext } from 'react';

import Form from './Form';
import Logs from './Logs';
import TodoList from './TodoList';

import AppContext from '../../context';


const Label = ()=>{
    const { state } = useContext(AppContext);
    
    return (
        <>
            {
                state.label.map(( value , index )=>{
                    return(
                        <div key={index} >
                            <h2>{value.labelName}</h2>
                            <Form labelId={value.labelId} />
                            <TodoList labelId={value.labelId} />
                        </div>
                    );
                })
            }
            {/* <Logs /> */}
        </>
    )
}

export default Label;