import React ,{ useContext , useState } from 'react';

import Elements from './Elements';
import AppContext from '../../context';

import { addSubTodo } from '../../reducers/TodoActionCreaters';
import { logAddSubTodo } from '../../reducers/LogReducer';
import { addSubList } from '../../database/Data';

const SubList = ({ event }) => {
    const { dispatch } = useContext(AppContext);

    const [ body , setBody ] = useState('');

    //サブアイテム用：フォームに文字が入力された時の挙動
    const doChange = e => {
        e.preventDefault();
        setBody(e.target.value);
    }

    //サブタスクを追加するボタンを押された時の挙動
    const doAddSubTodo = e => {
        e.preventDefault();
        const  arrayId = event.subList.length === 0 ? 1 : event.subList[event.subList.length -1].id + 1;
        const insertData = {
            id:             arrayId,
            body,
            checkedFlag:    false,
            date:           ''
        }
        console.log(insertData);
        addSubList( event.id ,insertData ); 
        dispatch( addSubTodo( event.id , insertData ) );
        dispatch( logAddSubTodo( event.id , body ) );
    }

    const style = event.showListFlag ? { display: "block" } : { display: "none" };
    const addSubFlag = body === '' ? true : false;

    return(
        <>
            <form>サブタスクを追加：
                <input type="text" className="addSubTodo" onChange={ doChange }/>
                <input type="submit" value="追加" onClick={ doAddSubTodo } disabled={ addSubFlag }/>
            </form>
            <ul style={ style }>
            {
                event.subList.map(( value , index )=>(
                    <Elements value={ value } key={ index } docId={event.id}/>
                ))
            }
        </ul>
        </>
    );
}

export default SubList;