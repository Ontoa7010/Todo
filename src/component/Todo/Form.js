import React , { useState , useContext } from 'react';
import AppContext from '../../context';

import { addTodo , deleteAllTodo } from '../../reducers/TodoReducer';
import { logAddTodo , logDeleteAllTodo , logDeleteAllLog } from '../../reducers/LogReducer';

const Form = () =>{
    const { dispatch } = useContext( AppContext );
    const [ item , setItem ] = useState('');

    //フォームに文字が入力された時の挙動
    const doChange = e => {
        e.preventDefault();
        setItem(e.target.value);
    }

    //追加ボタンを押されたときの挙動
    const doAdd = e =>{
        e.preventDefault();
        dispatch( addTodo( item ) );
        dispatch( logAddTodo( item ));
    }

    const doAllDelete = e => {
        e.preventDefault();
        const result = window.confirm('本当に全てのTodoを削除しますか？');
        if( result ) {
            dispatch( deleteAllTodo() );
            dispatch( logDeleteAllTodo() );
        }
    }

    const doLogAllDelete = e => {
        e.preventDefault();
        const result = window.confirm('本当に全てのログを削除しますか？');
        if( result ) {
            dispatch( logDeleteAllLog() );
        }
    }
    

    return(
        <form>
                <input type="text" id="addTodo" onChange={ doChange }/>
                <input type="submit" value="追加" onClick={ doAdd }/>
                <input type="submit" value="全てのTodoを削除する" onClick={ doAllDelete }/>
                <input type="submit" value="全てのログを削除する" onClick={ doLogAllDelete }/>
            </form>
    );

}

export default Form;