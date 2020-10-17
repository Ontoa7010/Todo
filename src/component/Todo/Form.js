import React , { useState , useContext } from 'react';
import AppContext from '../../context';

import { addTodo , addSubTodo , deleteAllTodo } from '../../reducers/TodoReducer';
import { logAddTodo , logAddSubTodo ,logDeleteAllTodo , logDeleteAllLog } from '../../reducers/LogReducer';

const Form = () =>{
    const { state , dispatch } = useContext( AppContext );
    const [ item , setItem ] = useState('');
    const [ itemSub , setItemSub ] = useState('');
    const [ itemSubId , setItemSubId ] = useState('');

    //フォームに文字が入力された時の挙動
    const doChange = e => {
        e.preventDefault();
        setItem(e.target.value);
    }
    //サブアイテム用：フォームに文字が入力された時の挙動
    const doChange2 = e => {
        e.preventDefault();
        setItemSub(e.target.value);
    }
    const doChangeSubId = e => {
        e.preventDefault();
        setItemSubId(e.target.value);
    }

    //追加ボタンを押されたときの挙動
    const doAddTodo = e =>{
        e.preventDefault();
        dispatch( addTodo( item ) );
        dispatch( logAddTodo( item ));
    }

    //サブタスクを追加するボタンを押された時の挙動
    const doAddSubTodo = e => {
        e.preventDefault();
        let id = parseInt(itemSubId);
        dispatch( addSubTodo( id , itemSub ) );
        dispatch( logAddSubTodo( id , itemSub ) );
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
    const addFlag = item === '' ? true : false;
    const addSubFlag = itemSub === '' || itemSubId === '' ? true : false;
    const allDeleteTodoFlag = state.todo.length === 0 ? true : false;
    const allDeleteLogFlag = state.log.length === 0 ? true : false;

    return(
        <form className="todoForm">
            <input type="text" id="addTodo" onChange={ doChange }/>
            <input type="submit" value="追加" onClick={ doAddTodo } disabled={ addFlag }/>
            <input type="submit" value="全てのTodoを削除する" onClick={ doAllDelete } disabled={ allDeleteTodoFlag }/>
            <input type="submit" value="全てのログを削除する" onClick={ doLogAllDelete } disabled={ allDeleteLogFlag }/><br />
            <p>サブタスクを追加：</p>
            <input type="text" id="addSubTodo" onChange={ doChange2 }/>
            <input type="number" className="subId"onChange={ doChangeSubId }/>
            <input type="submit" value="追加" onClick={ doAddSubTodo } disabled={ addSubFlag }/>
        </form>
    );

}

export default Form;