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
    
    const doAction = e => {
        e.preventDefault();
        console.log('Clicked button!');
    }
    return(
        <li>
            <input type="checkbox" onClick={ doChecked }/>{event.item}
            <div className="showSubTodo_button" onClick={doAction}></div>
            <div className="Delete" onClick={ doDelete }></div>

            <ul>
            {
                event.subList.map(( value , index )=>{
                    return (
                        <li key={index}> 
                            <input type="checkbox" onClick={ doChecked }/>{value.item}
                            <div className="Delete"></div>
                        </li>
                    );
                })
            }
            </ul>
        </li>
    );

}

export default Event;