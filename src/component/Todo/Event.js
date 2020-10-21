import React , { useContext } from 'react';
import AppContext from '../../context';
import { logDeleteTodo } from '../../reducers/LogReducer';

import { deleteTodo , showSubTodo } from '../../reducers/TodoReducer';
import SubList from './SubList';


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
        dispatch( showSubTodo( event.id ));
        // console.log('Clicked button!');
    }
    return(
        <li>
            <div className="flex">
                <input type="checkbox" onClick={ doChecked }/>{event.item}
                <div className="flex">
                    <div className="showSubTodo_button" onClick={ doAction }></div>
                    <div className="delete_button" onClick={ doDelete }></div>
                    <div className="date_button" ></div>
                    <MenuBotton />
                </div>
            </div>
            <SubList event={ event }/>
        </li>
    );

}

const MenuBotton = () =>{
    return (
        <div className="menuBotton">
            <div className="top-round"></div>
            <div className="mid-round"></div>
            <div className="bottom-round"></div>
        </div>
    );
}

export default Event;