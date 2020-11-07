import React , { useContext , useState , useEffect } from 'react';
import AppContext from '../../context';

import Event from './Event';

const TodoList = ( { labelId }) => {
    const { state } = useContext( AppContext );
    const [ posts , setPosts ] = useState(null);
    
    useEffect(()=>{
        const insertData =  state.todo.filter( event => event.labelId === labelId);
        setPosts(insertData);
        console.log( posts );
    },[state.todo]);

    if( posts === null){
        return <></>;
    }else{
        return(
            <div className="TodoList">
                <ul>
                { 
                    posts.map( (event , index) => {
                        return(
                            <Event key={ index } event={ event }/>
                        );
                    })
                }
                </ul>
            </div>
        );
    }
}

export default TodoList;