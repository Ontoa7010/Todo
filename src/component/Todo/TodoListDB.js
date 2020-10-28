import React , { useContext , useEffect } from 'react';
import AppContext from '../../context';
import { readDocument } from '../../database/Data';


import Event from './Event';

const TodoListDB = () => {
    const { state , dispatch } = useContext( AppContext );
    useEffect(()=>{
        readDocument( {dispatch} );
    },[]);
    return(
        <div className="TodoList">
            {/* <ul>
            { 
                state.todo.map( (event , index) => {
                        return(
                            <Event key={ index } event={ event }/>
                        );
                    })
            }
            </ul> */}
        </div>
    );
}

export default TodoListDB;