import React , { useContext } from 'react';
import AppContext from '../../context';

import Event from './Event';

const TodoList = () => {
    const { state } = useContext( AppContext );
    return(
        <div className="TodoList">
            <ul>
            { 
                state.todo.map( (event , index) => {
                        return(
                            <Event key={ index } event={ event }/>
                        );
                    })
            }
        </ul>
        </div>
    );
}

export default TodoList;