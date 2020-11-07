import React , { useContext , useEffect } from 'react';

import Label from './Label';

import AppContext from '../../context';
import { readDocument , readLabel , testReadDocument } from '../../database/Data';

const Main = () =>{

    const { dispatch , state }  = useContext( AppContext );

    useEffect( ()=>{
        readLabel( {dispatch} );
    },[]);

    return(
        <div id="main">
            <h2>TodoList</h2>
            <Label />
        </div>
    );
}

export default Main;