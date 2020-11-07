import React , { useState , useContext } from 'react';
import AppContext from '../../context';

import addTodo , { deleteAllTodo } from '../../reducers/TodoActionCreaters';
import { logAddTodo , logDeleteAllTodo } from '../../reducers/LogReducer';
import { addTask } from '../../database/Data';

const Form = ({labelId}) =>{
    const addTodoIdName = 'addTodo' + labelId;
    const { state , dispatch } = useContext( AppContext );
    const [ title , setTitle ] = useState('');


    //Todo追加フォームに文字が入力された時の挙動
    const doChangeTodo = e => {
        e.preventDefault();
        setTitle(e.target.value);
    }



    //Todo追加フォームの追加ボタンを押されたときの挙動
    const doAddTodo = async e =>{
        e.preventDefault();
        const id = await addTask( title  );
        dispatch( addTodo( id.docId , id.myTaskId , labelId, title ) );
        dispatch( logAddTodo( id.docId , title ));
        //フォームの内容を初期化
        document.getElementsByClassName(addTodoIdName).item(0).value = '';
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

    //ボタンを押せるかどうかを判定する変数の宣言
    const addTodoFlag = title === '' ? true : false;
    const allDeleteTodoFlag = state.todo.length === 0 ? true : false;

    return(
        <form className="todoForm">Taskの追加
            <input type="text" className={addTodoIdName} onChange={ doChangeTodo }/>
            <input type="submit" value="追加" onClick={ doAddTodo } disabled={ addTodoFlag }/>
            <input type="submit" value="AllDelete" onClick={ doAllDelete } disabled={ allDeleteTodoFlag }/><br/>
        </form>
    );

}

export default Form;