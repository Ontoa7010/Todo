import React , { useContext } from 'react';
import AppContext from '../../context';

import { logDeleteLog } from '../../reducers/LogReducer';

const Log = ({ event }) => {
    const { dispatch } = useContext( AppContext );

    const doDelete = () =>{
        const result = window.confirm(`ログid：${event.id}を本当に削除しますか？`);
        if( result ){
            dispatch( logDeleteLog( event.item , event.id ));
        }
    }

    return(
        <tr>
            <td>{ event.message }</td>
            <td><button onClick={ doDelete }>削除</button></td>
        </tr>
    );

}

export default Log;