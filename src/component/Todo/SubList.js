import React ,{ useContext , useEffect } from 'react';
import AppContext from '../../context';
import { deleteSubTodo , checkedSub } from '../../reducers/TodoReducer';


const SubList = ({ event }) => {

    let style = event.subListFlag ? { display: "block" } : { display: "none" };

    return(
        <ul style={ style }>
            {
                event.subList.map(( value , index )=>(
                    <SubLists value={ value } key={ index } parId={event.id}/>
                ))
            }
        </ul>
    );
}

const SubLists = ({ value , parId }) => {
    const { dispatch } = useContext( AppContext );
    const doDelete = () => {
        dispatch( deleteSubTodo( value.item , value.id ));
    }

    const doChange = e => {
        let flag = e.target.checked;
        dispatch( checkedSub( value.id , parId, flag ));
        console.log( flag );
    }

    return (
        <li > 
            <input type="checkbox" onChange={ doChange } checked={value.flag}/>{value.item}
            <div className="sub_delete_button" onClick={doDelete}></div>
        </li>
    );
}

export default SubList;