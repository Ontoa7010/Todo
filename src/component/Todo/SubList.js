import React ,{ useContext , useState ,useEffect } from 'react';

import Elements from './Elements';
import AppContext from '../../context';

import { addSubTodo , checked , deleteTodo , showSubTodo } from '../../reducers/TodoActionCreaters';
import { logAddSubTodo , logDeleteTodo } from '../../reducers/LogReducer';
import { addSubList } from '../../database/Data';

const SubList = ({ event , myTaskId , labelId }) => {
    const addSubClassName = 'addSubTodo' + event.id;
    const { dispatch } = useContext(AppContext);
    const [ body , setBody ] = useState('');

    //サブアイテム用：フォームに文字が入力された時の挙動
    const doChange = e => {
        e.preventDefault();
        setBody(e.target.value);
    }

    //プルボタンが押されたときの挙動
    const doAction = e => {
        e.preventDefault();
        dispatch( showSubTodo( myTaskId, event.id ));
    }

    //チェックボタンが押されたときの挙動
    const doCheckedChange = e => {
        console.log('onClick!');
        const checkedFlag = e.target.checked;
        dispatch( checked( myTaskId , event.id , checkedFlag ));
    }

    //削除ボタンが押されたときの挙動
    const doDelete = e =>{
        e.preventDefault();
        const result = window.confirm(`${event.item}を本当に削除しますか？`);
        if( result ){
            dispatch( deleteTodo( event.id, myTaskId, labelId ));
            dispatch( logDeleteTodo( event.subTitle , event.id ));
        }
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
        addSubList( event.id , myTaskId , insertData ); 
        dispatch( addSubTodo( event.id , myTaskId , insertData ) );
        dispatch( logAddSubTodo( event.id , body ) );
        document.getElementsByClassName( addSubClassName ).item(0).value = '';
    }

    // useEffect(()=>{
    //     console.log( event );
    // },[])

    const style = event.showListFlag ? { display: "block" } : { display: "none" };
    const addSubFlag = body === '' ? true : false;

    if(event.subList === undefined){
        return(
            <>
            </>
        );
    }else {
        return(
            <>
                <div className="flex" >
                    <input type="checkbox"  onChange={ doCheckedChange } checked={event.checkedFlag}/>{event.subTitle}
                    <div className="flex">
                        <div className="showSubTodo_button" onClick={ doAction }></div>
                        <div className="delete_button" onClick={ doDelete }></div>
                        <div className="date_button" ></div>
                        <MenuBotton />
                    </div>
                </div>
                <form >
                        <p>サブタスクを追加：</p>
                        <input type="text" className={addSubClassName} onChange={ doChange }/>
                        <input type="submit" value="追加" onClick={ doAddSubTodo } disabled={ addSubFlag }/>
                    </form>
                <ul style={ style }>
                {   
                    event.subList.map(( value , index )=>(
                        <Elements value={ value } key={ index } docId={event.id} myTaskId={myTaskId} />
                    ))
                }
                </ul>
            </>
        );
    }
}

const MenuBotton = () =>{
    return (
        <div className="menuBotton">
            <div className="top-round"></div>
            <div className="mid-round"></div>
            <div className="bottom-round"></div>
        </div>
    );
}

export default SubList;