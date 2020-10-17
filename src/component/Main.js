import React , { useContext } from 'react';

import AppContext from '../context';
import Form from './Form';
import Event from './Event';

const Main = () =>{
    const { state } = useContext( AppContext );
    
    return(
        <div id="main">
            <h2>TodoList</h2>
            <Form />
            <table>
                <thead>
                </thead>
                <tbody>
                    { state.todo.map( (event , index) => {
                        return(
                            <Event key={index} event={event}/>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Main;