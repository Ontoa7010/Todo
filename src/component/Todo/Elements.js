import React ,{ useContext, useEffect  } from 'react';

import AppContext from '../../context';
import { logDeleteSubTodo } from '../../reducers/LogReducer';
import { deleteSubTodo , checkedSub } from '../../reducers/TodoActionCreaters';

const Elements = ({ value , docId , myTaskId}) => {
    //コンテキストを使用するための宣言
    const { dispatch } = useContext( AppContext );

    //引数を分割代入してリファクタリング
    const { body , id , checkedFlag } = value;

    //削除ボタンが押されたときの挙動
    const doDelete = () => {
        const result = window.confirm(`本当にSubTask:「${body}」を削除してもよろしいですか？`);
        if(result){
            dispatch( deleteSubTodo( myTaskId , docId , id ));
            dispatch( logDeleteSubTodo ( id , body));
        }
    }

    //チェックボタンが押されたときの挙動
    const doChange = e => {
        dispatch( checkedSub( myTaskId, docId, id , e.target.checked ));
    }

    // useEffect(()=>{
    //     console.log(value);
    // },[]);

    return (
        <li > 
            <input type="checkbox" onChange={ doChange } checked={ checkedFlag}/>{body}
            <div className="sub_delete_button" onClick={doDelete}></div>
        </li>
    );
}

export default Elements;