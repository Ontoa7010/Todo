import React , { useState , useContext } from 'react';

import AppContext from '../../context';
import addTodo , { deleteAllTodo } from '../../reducers/TodoActionCreaters';
import { logAddTodo , logDeleteAllTodo } from '../../reducers/LogReducer';
import { addTask } from '../../database/TaskDB';

const Form = ({ labelId }) =>{
    const { state , dispatch } = useContext( AppContext );
    const [ title , setTitle ] = useState('');

    //入力フォームのクラスネームを設定
    const addTodoClassName = 'addTodo' + labelId;

    //Todo追加フォームに文字が入力された時の挙動
    const doChangeTodo = e => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    //Todo追加フォームの追加ボタンを押されたときの挙動
    const doAddTodo = async e =>{
        e.preventDefault();
        const id = await addTask( title , labelId  );
        dispatch( addTodo( id.docId , id.myTaskId , labelId, title ) );
        dispatch( logAddTodo( id.docId , title ));
        //フォームの内容を初期化
        document.getElementsByClassName(addTodoClassName).item(0).value = '';
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
        <>
            <form className="todoForm">Taskの追加
                <input type="text" className={addTodoClassName} onChange={ doChangeTodo }/>
                <input type="submit" value="追加" onClick={ doAddTodo } disabled={ addTodoFlag }/>
            </form>
            <button type="button" onClick={ doAllDelete } disabled={ allDeleteTodoFlag }>AllDelete</button>
        </>
    );

}

export default Form;