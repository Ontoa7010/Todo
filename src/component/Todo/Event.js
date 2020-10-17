import React , { useContext } from 'react';
import AppContext from '../../context';
import { logDeleteTodo } from '../../reducers/LogReducer';

import { deleteTodo } from '../../reducers/TodoReducer';


const Event = ({ event }) => {
    const { dispatch } = useContext( AppContext );

    const doDelete = e =>{
        e.preventDefault();
        const result = window.confirm(`${event.item}を本当に削除しますか？`);
        if( result ){
            dispatch( deleteTodo( event.item , event.id ));
            dispatch( logDeleteTodo( event.item , event.id ));
        }
    }

    const doChecked = () =>{

    }

    return(
        <tr>
            <td><input type="checkbox" onClick={ doChecked }/>{event.item}</td>
            <td><button onClick={ doDelete }>削除</button></td>
        </tr>
    );

}

export default Event;