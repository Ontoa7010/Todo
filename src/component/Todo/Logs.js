import React , { useContext } from 'react';
import AppContext from '../../context';

import Log from './Log';
import { logDeleteAllLog } from '../../reducers/LogReducer';

const Logs = () => {
    const { state , dispatch } = useContext( AppContext );

    //全てのログを削除するボタンを押された時の挙動
    const doLogAllDelete = e => {
        e.preventDefault();
        const result = window.confirm('本当に全てのログを削除しますか？');
        if( result ) {
            dispatch( logDeleteAllLog() );
        }
    }
        
    const allDeleteLogFlag = state.log.length === 0 ? true : false;
    
    return(
        <div className="Log">
            <h2>操作ログ一覧</h2>
            <input type="submit" value="AllDeleteLog" onClick={ doLogAllDelete } disabled={ allDeleteLogFlag }/><br />
            <table>
                <thead>
                    <tr>
                        <th>内容</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    { state.log.map(( event , index ) => {
                        return(
                            <Log key={ index } event={ event }/>
                        );
                    })}
                </tbody>
            </table>
        </div>
        
    );
}

export default Logs;