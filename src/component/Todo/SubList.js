import React ,{ useContext , useEffect } from 'react';
import AppContext from '../../context';
import { deleteSubTodo } from '../../reducers/TodoReducer';


const SubList = ({ event }) => {

    let style = event.subListFlag ? { display: "block" } : { display: "none" };

    return(
        <ul style={ style }>
            {
                event.subList.map(( value , index )=>(
                    <SubLists value={ value } key={ index }/>
                ))
            }
        </ul>
    );
}

const SubLists = ({ value }) => {
    const { dispatch } = useContext( AppContext );
    const doDelete = () => {
        dispatch( deleteSubTodo( value.item , value.id ));
    }

    return (
        <li > 
            <input type="checkbox"/>{value.item}
            <div className="sub_delete_button" onClick={doDelete}></div>
        </li>
    );
}

export default SubList;