import React , { useContext , useEffect } from 'react';

import Label from './Label';

import AppContext from '../../context';
import readDB from '../../database/Data';

const Main = () =>{

    const { dispatch }  = useContext( AppContext );

    useEffect( ()=>{
        readDB( {dispatch} );
    },[]);

    return(
        <div id="main">
            <h2>TodoList</h2>
            <Label />
        </div>
    );
}

export default Main;