import React  from 'react';

import { deleteTodo } from '../reducers';


const Event = ({ event , dispatch }) =>{
    const doDelete = () =>{
        const result = window.confirm(`${event.item}を本当に削除しますか？`);
        if(result){
            dispatch( deleteTodo( event.item , event.id ));
        }
    }

    return(
        <tr>
            <td><input type="checkbox"/>{event.item}</td>
            <td><button onClick={ doDelete }>削除</button></td>
        </tr>
    );

}

export default Event;