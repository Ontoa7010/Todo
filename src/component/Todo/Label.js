import React , { useContext ,useState } from 'react';

import AppContext from '../../context';
import { addLabel } from '../../database/Data';

import Form from './Form';
import Logs from './Logs';
import TodoList from './TodoList';

const Label = ()=>{
    const { state } = useContext(AppContext);
    const [ labelName , setLabelName ] = useState('');

    //ラベル追加フォームに文字が入力されたときの挙動
    const doChangeLabel = e => {
        e.preventDefault();
        setLabelName(e.target.value);
    }

    //新しいラベルを追加
    const doAddLabel = e =>{
        e.preventDefault();
        addLabel( labelName );
        document.getElementById(labelName).value = '';
    }
    
    const addLabelFlag = labelName === '' ? true : false;
    
    return (
        <>
            <form>ラベルの追加：
                <input type="text" className="addLabel" onChange={ doChangeLabel }/>
                <input type="submit" value="追加" onClick={doAddLabel} disabled={addLabelFlag} />
            </form><br />
            {
                state.label.map(( value , index )=>{
                    return(
                        <div key={index} >
                            <h2>{value.labelName}</h2>
                            <Form labelId={value.labelId} />
                            <TodoList labelId={value.labelId} />
                        </div>
                    );
                })
            }
            {/* <Logs /> */}
        </>
    )
}

export default Label;