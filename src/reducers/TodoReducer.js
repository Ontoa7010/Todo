import { ADD , ADD_SUB , DELETE , DELETE_SUB,  DELETE_ALL , CHECKED, CHECKED_SUB , SHOW_SUB_TODO } from '../actions';


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
                    let  subId = value.subList.length === 0 ? 1 : value.subList[value.subList.length -1].id + 1;
                    value.subList.push( {
                        id:         subId,
                        item:       action.item,
                        date:       '',
                        flag:       false,
                    } );
                    value.subListFlag = true;
                }
            });
            return newState;
        case CHECKED:
            newState = state.slice();
            state.forEach( (value)=> {
                if(value.id === action.id){
                    value.flag = action.flag;
                }
            });
            return newState;
        case CHECKED_SUB:
            newState = state.slice();
            state.forEach( (value)=> {
                if(value.id === action.parId){
                    value.subList.forEach( (sub) =>{
                        if(sub.id === action.id){
                            sub.flag = action.flag;
                        }
                    })
                }
            });
            return newState;
        case SHOW_SUB_TODO:
            newState = state.slice();
            newState.forEach( (value) => {
                if( value.id === action.id ){
                    value.subListFlag = !value.subListFlag;
                }
            });
            return newState;
        case DELETE:
            console.log(state);
            return state.filter( event => event.id !== action.id );
        case DELETE_SUB:
            newState = state.slice();
            newState.forEach( (value) => {
                value.subList = value.subList.filter( event => event.id !==action.id);
            });
            return newState;
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
export const addSubTodo = ( id , item ) => {
    return{
        type: ADD_SUB,
        id,
        item
    }
}

export function deleteTodo( text , id ){
    return{
        type:   DELETE,
        item:   text,
        id:     id
    }
}
export function deleteSubTodo( text , id ){
    return{
        type:   DELETE_SUB,
        item:   text,
        id:     id
    }
}

export function deleteAllTodo(){
    return{
        type:   DELETE_ALL,
    }
}

export const showSubTodo = ( id ) => {
    return {
        type: SHOW_SUB_TODO,
        id
    }
}

export const checked = ( id , flag ) => {
    return {
        type:   CHECKED,
        id,
        flag
    }
}

export const checkedSub = ( id , parId , flag ) => {
    return {
        type:   CHECKED_SUB,
        id,
        parId,
        flag
    }
}

export default todo;