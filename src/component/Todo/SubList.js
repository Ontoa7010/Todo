import React ,{ useContext , useEffect } from 'react';

const SubList = ({ event }) => {
    let style = event.subListFlag ? { display: "block" } : { display: "none" };

    return(
        <ul style={ style }>
            {
                event.subList.map(( value , index )=>{
                    return (
                        <li key={index}> 
                            <input type="checkbox"/>{value.item}
                            <div className="sub_delete_button"></div>
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default SubList;