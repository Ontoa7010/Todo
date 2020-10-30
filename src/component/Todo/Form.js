import React , { useState , useContext } from 'react';
import AppContext from '../../context';

import addTodo , { deleteAllTodo } from '../../reducers/TodoActionCreaters';
import { logAddTodo , logDeleteAllTodo , logDeleteAllLog } from '../../reducers/LogReducer';
import addDocument from '../../database/Data';

const Form = () =>{
    const { state , dispatch } = useContext( AppContext );
    const [ title , setTitle ] = useState('');

    //フォームに文字が入力された時の挙動
    const doChange = e => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    //追加ボタンを押されたときの挙動
    const doAddTodo = async e =>{
        e.preventDefault();
        const docId = await addDocument( title );
        dispatch( addTodo( docId , title ) );
        dispatch( logAddTodo( docId , title ));
    }

    //全てのTodoリストを削除するボタンを押された時の挙動
    const doAllDelete = e => {
        e.preventDefault();
        const result = window.confirm('本当に全てのTodoを削除しますか？');
        if( result ) {
            dispatch( deleteAllTodo() );
            dispatch( logDeleteAllTodo() );
        }
    }

    //全てのログを削除するボタンを押された時の挙動
    const doLogAllDelete = e => {
        e.preventDefault();
        const result = window.confirm('本当に全てのログを削除しますか？');
        if( result ) {
            dispatch( logDeleteAllLog() );
        }
    }
    
    //ボタンを押せるかどうかを判定する変数の宣言
    const addFlag = title === '' ? true : false;
    const allDeleteTodoFlag = state.todo.length === 0 ? true : false;
    const allDeleteLogFlag = state.log.length === 0 ? true : false;

    return(
        <form className="todoForm">
            <input type="text" id="addTodo" onChange={ doChange }/>
            <input type="submit" value="追加" onClick={ doAddTodo } disabled={ addFlag }/>
            <input type="submit" value="全てのTodoを削除する" onClick={ doAllDelete } disabled={ allDeleteTodoFlag }/>
            <input type="submit" value="全てのログを削除する" onClick={ doLogAllDelete } disabled={ allDeleteLogFlag }/><br />
        </form>
    );

}

export default Form;