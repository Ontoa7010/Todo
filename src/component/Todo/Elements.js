import React ,{ useContext, useEffect  } from 'react';
import AppContext from '../../context';
import { logDeleteSubTodo } from '../../reducers/LogReducer';
import { deleteSubTodo , checkedSub } from '../../reducers/TodoActionCreaters';

const Elements = ({ value , docId , myTaskId}) => {
    const { dispatch } = useContext( AppContext );

    //削除ボタンが押されたときの挙動
    const doDelete = () => {
        const result = window.confirm(`本当にSubTask:「${value.body}」を削除してもよろしいですか？`);
        if(result){
            dispatch( deleteSubTodo( myTaskId , docId , value.id ));
            dispatch( logDeleteSubTodo ( value.id , value.body));
        }
    }

    //チェックボタンが押されたときの挙動
    const doChange = e => {
        const checkedFlag = e.target.checked;
        dispatch( checkedSub( myTaskId, docId, value.id , checkedFlag ));
    }

    // useEffect(()=>{
    //     console.log(value);
    // },[]);

    return (
        <li > 
            <input type="checkbox" onChange={ doChange } checked={value.checkedFlag}/>{value.body}
            <div className="sub_delete_button" onClick={doDelete}></div>
        </li>
    );
}

export default Elements;