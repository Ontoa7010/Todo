import React , { useContext } from 'react';
import AppContext from '../../context';
import { logDeleteTodo } from '../../reducers/LogReducer';

import { deleteTodo , showSubTodo , checked } from '../../reducers/TodoActionCreaters';
import SubList from './SubList';


const Event = ({ event }) => {
    const { dispatch } = useContext( AppContext );  

    //削除ボタンが押されたときの挙動
    const doDelete = e =>{
        e.preventDefault();
        const result = window.confirm(`${event.item}を本当に削除しますか？`);
        if( result ){
            dispatch( deleteTodo( event.item , event.id ));
            dispatch( logDeleteTodo( event.item , event.id ));
        }
    }

    //チェックボタンが押されたときの挙動
    const doChange = e => {
        const checkedFlag = e.target.checked;
        console.log(`event.id:${event.id}`);
        dispatch( checked( event.id , checkedFlag ));
    }
    
    //プルボタンが押されたときの挙動
    const doAction = e => {
        e.preventDefault();
        dispatch( showSubTodo( event.id ));
    }

    return(
        <li>
            <div className="flex">
                <input type="checkbox" onChange={ doChange } checked={event.checkedFlag}/>{event.title}
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