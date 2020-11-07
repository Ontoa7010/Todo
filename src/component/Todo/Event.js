import React , { useContext ,useState , useEffect } from 'react';

import AppContext from '../../context';
import addTodoDB from '../../database/TodoDB';
import { deleteTaskDB } from '../../database/TaskDB';
import { deleteTask  } from '../../reducers/TodoActionCreaters';

import SubList from './SubList';

const Event = ({ event }) => {
    //コンテキストを使用
    const { dispatch , state } = useContext( AppContext );  
    const [ subTitle , setSubTitle ] = useState('');

    //渡された引数を分割代入してわかりやすくする
    const { labelId , myTaskId , myTask , title } = event;
    //フォームのクラス名を設定
    const addTaskClassName = 'addTask' + myTaskId;
    //フォームの入力を行えるか判定するFlag
    const addTaskFlag = subTitle === '' ? true : false ;

    //サブタイトルのフォームに文字が入力された時ステートに保存
    const doSubTitleChange = e =>{
        e.preventDefault();
        setSubTitle( e.target.value );
    }

    //サブタイトルの作成ボタンが押されたときの挙動
    const doAddTodo = async e =>{
        e.preventDefault();
        const docId = await addTodoDB( subTitle, myTaskId );
        dispatch({type:'ADD_TODO' , docId , subTitle , myTaskId:myTaskId });
        document.getElementsByClassName(addTaskClassName).item(0).value = '';
    }

    //Todoリストの削除ボタンが押されたときの挙動
    const doDelete = async e=>{
        e.preventDefault();
        const result = window.confirm(`本当にタスク：「${title}」を削除しますか`);
        if(result){
            state.label.forEach((value)=>{
                if(value.labelId === labelId){
                    deleteTaskDB( event );
                }
            })
            dispatch( deleteTask(myTaskId));
        }
    }

    //デバック用
    // useEffect(()=>{
    //     console.log('event:',event);
    // },[])

    return(
        <li>
            <div className="flex">
                <h3>{title}</h3>
                <button type="button" onClick={ doDelete }>削除</button>
            </div>
            <form>
                <input type="text" className={addTaskClassName} onChange={ doSubTitleChange } />
                <input type="submit" value="新規作成" onClick={ doAddTodo } disabled={addTaskFlag} />
            </form>
            {
                myTask.map(( value , index )=>{
                    return <SubList key={index} event={ value } myTaskId={myTaskId} labelId={labelId} />
                })
            }
        </li>
    );

}


export default Event;