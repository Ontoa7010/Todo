import React , { useReducer , useState , useEffect } from 'react';

import reducer ,{ addTodo } from '../reducers';
import { ReadDatabase } from './Data';

import '../css/App.css';

const App = () => {
    const [ state , dispatch ] = useReducer( reducer , [] ); 
    const [ item , setItem ] = useState('');

    const doChange = e => {
        e.preventDefault();
        setItem(e.target.value);
    }

    const doClick = e =>{
        e.preventDefault();
        dispatch( addTodo(item) );
    }

    //データベースからデータ読み込んでステートに保存
    useEffect( ()=>{
        ReadDatabase({ state, dispatch} );
    }, [] );

    return (
        <div>
            <h1>TodoList</h1>
            <form>
                <input type="text" id="addTodo" onChange={doChange}/>
                <input type="submit" value="追加" onClick={doClick}/>
            </form>
            <ul>
                { state.map( (event , index) => {
                    return(
                    <li  key={index}><input type="checkbox"/>{event.item}<button>削除</button></li>
                    );
                })}
            </ul>
        </div>
    );
}

export default App;