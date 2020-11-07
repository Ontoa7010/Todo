import React , { useState , useContext } from 'react';
import AppContext from '../../context';

import addTodo , { deleteAllTodo } from '../../reducers/TodoActionCreaters';
import { logAddTodo , logDeleteAllTodo } from '../../reducers/LogReducer';
import addDocument , { addLabel ,addTask } from '../../database/Data';

const Form = () =>{
    const { state , dispatch } = useContext( AppContext );
    const [ title , setTitle ] = useState('');
    const [ labelName , setLabelName ] = useState('');

    //Todo追加フォームに文字が入力された時の挙動
    const doChangeTodo = e => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    //ラベル追加フォームに文字が入力されたときの挙動
    const doChangeLabel = e => {
        e.preventDefault();
        setLabelName(e.target.value);

    }

    //Todo追加フォームの追加ボタンを押されたときの挙動
    const doAddTodo = async e =>{
        e.preventDefault();
        const id = await addTask( title  );
        // console.log(`doc.id:${docId}`); 
        dispatch( addTodo( id.docId , id.myTaskId ,title ) );
        dispatch( logAddTodo( id.docId , title ));
        //フォームの内容を初期化
        document.getElementById('addTodo').value = '';
    }

    //新しいラベルを追加
    const doAddLabel = e =>{
        e.preventDefault();
        addLabel( labelName );
        document.getElementById('addLabel').value = '';
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
    const addLabelFlag = labelName === '' ? true : false;
    const allDeleteTodoFlag = state.todo.length === 0 ? true : false;

    return(
        <>
            <form>ラベルの追加：
                <input type="text" id="addLabel" onChange={ doChangeLabel }/>
                <input type="submit" value="追加" onClick={doAddLabel} disabled={addLabelFlag} />
            </form><br />
            <form className="todoForm">Taskの追加
                <input type="text" id="addTodo" onChange={ doChangeTodo }/>
                <input type="submit" value="追加" onClick={ doAddTodo } disabled={ addTodoFlag }/>
                <input type="submit" value="AllDelete" onClick={ doAllDelete } disabled={ allDeleteTodoFlag }/><br/>
            </form>
        </>
    );

}

export default Form;