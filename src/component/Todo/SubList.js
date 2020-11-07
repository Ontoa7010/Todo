import React ,{ useContext , useState ,useEffect } from 'react';

import AppContext from '../../context';
import { addSubTodo , checked , deleteTodo , showSubTodo } from '../../reducers/TodoActionCreaters';
import { logAddSubTodo , logDeleteTodo } from '../../reducers/LogReducer';
import addSubList from '../../database/SubLIstDB';

import Elements from './Elements';

const SubList = ({ event , myTaskId , labelId }) => {
    //コンテキストの使用宣言
    const { dispatch } = useContext(AppContext);

    //入力フォームの内容を入れておくステートを宣言
    const [ body , setBody ] = useState('');

    //分割代入してリファクタリング
    const { id , subList , checkedFlag , showListFlag , subTitle }  = event;

    //フォームのクラス名を設定
    const addSubClassName = 'addSubTodo' + id;

    //サブアイテム用：フォームに文字が入力された時の挙動
    const doChange = e => {
        e.preventDefault();
        setBody(e.target.value);
    }

    //プルボタンが押されたときの挙動
    const doAction = e => {
        e.preventDefault();
        dispatch( showSubTodo( myTaskId, id ));
    }

    //チェックボタンが押されたときの挙動
    const doCheckedChange = e => {
        const checkedFlag = e.target.checked;
        dispatch( checked( myTaskId , id , checkedFlag ));
    }

    //削除ボタンが押されたときの挙動
    const doDelete = e =>{
        e.preventDefault();
        const result = window.confirm(`${event.subTitle}を本当に削除しますか？`);
        if( result ){
            dispatch( deleteTodo( id, myTaskId, labelId ));
            dispatch( logDeleteTodo( subTitle , id ));
        }
    }

    //サブタスクを追加するボタンを押された時の挙動
    const doAddSubTodo = e => {
        e.preventDefault();
        //配列に持たせるIdを計算(配列の長さが0なら１、それ以外は最後尾のid+1の値に設定)
        const  arrayId = subList.length === 0 ? 1 : subList[subList.length -1].id + 1;
        //追加するデータをセット
        const insertData = {
            id:             arrayId,
            body,
            checkedFlag:    false,
            date:           ''
        }
        //データを追加
        addSubList( id , myTaskId , insertData ); 
        dispatch( addSubTodo( id , myTaskId , insertData ) );
        dispatch( logAddSubTodo( id , body ) );
        //入力フォームの内容をリセット
        document.getElementsByClassName( addSubClassName ).item(0).value = '';
    }

    // useEffect(()=>{
    //     console.log( event );
    // },[])

    const style = showListFlag ? { display: "block" } : { display: "none" };
    const addSubFlag = body === '' ? true : false;

    if(subList === undefined){
        return(
            <>
            </>
        );
    }else {
        return(
            <>
                <div className="flex" >
                    <input type="checkbox"  onChange={ doCheckedChange } checked={checkedFlag}/>{subTitle}
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
                    subList.map(( value , index )=>(
                        <Elements value={ value } key={ index } docId={id} myTaskId={myTaskId} />
                    ))
                }
                </ul>
            </>
        );
    }
}

//メニューボタンを作っているコンポーネント
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