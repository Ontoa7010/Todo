import React , { useReducer , useState , useEffect } from 'react';
import { addTodo } from '../reducers';

const Form = ({ dispatch }) =>{

    const [ item , setItem ] = useState('');

    //フォームに文字が入力された時の挙動
    const doChange = e => {
        e.preventDefault();
        setItem(e.target.value);
    }

    //追加ボタンを押されたときの挙動
    const doAdd = e =>{
        e.preventDefault();
        dispatch( addTodo(item) );
    }
    return(
        <form>
                <input type="text" id="addTodo" onChange={doChange}/>
                <input type="submit" value="追加" onClick={doAdd}/>
            </form>
    );

}

export default Form;