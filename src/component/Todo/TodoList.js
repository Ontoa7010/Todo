import React , { useContext } from 'react';
import AppContext from '../../context';

import Event from './Event';

const TodoList = () => {
    const { state } = useContext( AppContext );
    return(
        <table>
            <thead>
                <tr>
                    <th>内容</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                { state.todo.map( (event , index) => {
                    return(
                        <Event key={ index } event={ event }/>
                    );
                })}
            </tbody>
        </table>
    );
}

export default TodoList;