import React , { useContext } from 'react';
import AppContext from '../../context';

import Log from './Log';

const Logs = () => {
    const { state } = useContext( AppContext );
    
    return(
        <>
            <h3>操作ログ一覧</h3>
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
        </>
        
    );
}

export default Logs;