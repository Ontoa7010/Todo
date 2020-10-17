import { ADD , ADD_SUB , DELETE , DELETE_ALL , CHECKED } from '../actions';


/***********************レデューサー*************************/
const todo = ( state = [] , action ) => {
    const length = state.length;
    let id = length === 0 ? 1 : state[length-1].id + 1;

    switch( action.type ){
        case ADD:
            const event = { 
                id,
                item:       action.item,
                date:       '',
                flag:       false,
                subList:    []
            }
            return [...state , {...event}];
        case ADD_SUB:
            let newState = state.slice();
            newState.forEach( (value) => {
                if( value.id === action.id ){
                    value.subList.push( {
                        id,
                        item:       action.item,
                        date:       '',
                        flag:       false,
                    } );
                }
            });
            return newState;
        case CHECKED:
            return state;
        case DELETE:
            return state.filter( event => event.id !== action.id );
        case DELETE_ALL:
            return [];

        default:
            return state;
    }
}
/*********************アクションクリエーター******************/

export function addTodo( text ){
    return{
        type:   ADD,
        item:   text
    }
}
export function deleteTodo( text , id ){
    return{
        type:   DELETE,
        item:   text,
        id:     id
    }
}

export function deleteAllTodo(){
    return{
        type:   DELETE_ALL,
    }
}

export const addSubTodo = ( id , item ) => {
    return{
        type: ADD_SUB,
        id,
        item
    }
}

export default todo;