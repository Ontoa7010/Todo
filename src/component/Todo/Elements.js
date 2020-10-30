import React ,{ useContext } from 'react';
import AppContext from '../../context';
import { logDeleteSubTodo } from '../../reducers/LogReducer';
import { deleteSubTodo , checkedSub } from '../../reducers/TodoActionCreaters';

const Elements = ({ value , docId }) => {
    const { dispatch } = useContext( AppContext );

    //削除ボタンが押されたときの挙動
    const doDelete = () => {
        const result = window.confirm(`本当にSubTask:「${value.body}」を削除してもよろしいですか？`);
        if(result){
            dispatch( deleteSubTodo( docId , value.id ));
            dispatch( logDeleteSubTodo ( value.id , value.body));
        }
    }

    //チェックボタンが押されたときの挙動
    const doChange = e => {
        const checkedFlag = e.target.checked;
        dispatch( checkedSub( docId, value.id , checkedFlag ));
    }

    return (
        <li > 
            <input type="checkbox" onChange={ doChange } checked={value.checkedFlag}/>{value.body}
            <div className="sub_delete_button" onClick={doDelete}></div>
        </li>
    );
}

export default Elements;