import React , { useContext ,useState , useEffect } from 'react';
import AppContext from '../../context';

import SubList from './SubList';
import addDocument , { addTask, deleteTaskDB } from '../../database/Data';
import { deleteTask  } from '../../reducers/TodoActionCreaters';


const Event = ({ event }) => {
    const addTaskClassName = 'addTask' + event.myTaskId;
    const { dispatch , state } = useContext( AppContext );  
    const [ subTitle , setSubTitle ] = useState('');

    //サブタイトルのフォームに文字が入力された時ステートに保存
    const doSubTitleChange = e =>{
        e.preventDefault();
        setSubTitle( e.target.value );
    }

    //作成ボタンが押されたときの挙動
    const doAddTodo = async e =>{
        e.preventDefault();
        const docId = await addDocument( subTitle, event.myTaskId );
        dispatch({type:'ADD_TODO' , docId , subTitle , myTaskId:event.myTaskId });
        document.getElementsByClassName(addTaskClassName).item(0).value = '';
    }

    //削除ボタンが押されたときの挙動
    const doDelete = async e=>{
        e.preventDefault();
        state.label.forEach((value)=>{
            if(value.labelId === event.labelId){
                deleteTaskDB( event );
            }
        })
        dispatch( deleteTask(event.myTaskId));
    }

    // useEffect(()=>{
    //     console.log('event:',event);
    // },[])

    return(
        <li>
            <div className="flex">
                <h3>{event.title}</h3>
                <button type="button" onClick={ doDelete }>削除</button>
            </div>
            <form>
                <input type="text" className={addTaskClassName} onChange={ doSubTitleChange } />
                <input type="submit" value="新規作成" onClick={ doAddTodo } />
            </form>
            {
                event.myTask.map((value , index )=>{
                    return <SubList key={index} event={ value } myTaskId={event.myTaskId} labelId={event.labelId} />
                })
            }
        </li>
    );

}


export default Event;