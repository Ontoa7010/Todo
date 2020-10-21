import { ADD , ADD_SUB , DELETE , DELETE_ALL , CHECKED, SHOW_SUB_TODO } from '../actions';


/***********************レデューサー*************************/
const todo = ( state = [] , action ) => {
    const length = state.length;
    let id = length === 0 ? 1 : state[length-1].id + 1;
    let newState =[];

    switch( action.type ){
        case ADD:
            const event = { 
                id,
                item:       action.item,
                date:       '',
                flag:       false,
                subListFlag:    true,
                subList:    []
            }
            return [...state , {...event}];
        case ADD_SUB:
            newState = state.slice();
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
        case SHOW_SUB_TODO:
            newState = state.slice();
            newState.forEach( (value) => {
                if( value.id === action.id ){
                    value.subListFlag = !value.subListFlag;
                }
            });
            console.log( newState );
            return newState;
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

export const showSubTodo = ( id ) => {
    return {
        type: SHOW_SUB_TODO,
        id
    }
}

export default todo;