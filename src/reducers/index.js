import { ADD , ADD_SUB , DELETE , CHECKED , LOAD_DATA } from '../actions';

import addDocument , { deleteDocument, asynFunc1 } from '../component/Data';

/***********************レデューサー*************************/
const events = ( state = [], action ) => {
    switch( action.type ){
        case ADD:
            return addReduce( state, action );
        case ADD_SUB:
            return addSubReduce( state , action );
        case CHECKED:
            return checkReduce( state , action );
        case DELETE:
            return deleteReduce( state , action );
        case LOAD_DATA:
            return loadData( state , action );
        default:
            return state;
    }
}

//追加のレデュース処理
const addReduce = ( state , action ) => {
    const event = { item: action.item }
    const length = state.length;
    let id = length === 0 ? 1 : state[length-1].id + 1;
    addDocument( action.item , id  );
    return [...state , {id, ...event}];
}

//サブリスト用の追加レデュース処理
const addSubReduce =( state , action ) => {
    return state;
}

//チェックボックスにチェックが入れられた時のレデュース処理
const checkReduce = ( state , action ) => {
    return{
        state
    };
}
const deleteReduce = ( state , action ) =>{
    deleteDocument( action.item , action.id );
    console.log('delete after state: ' ,state);
    const result = state.filter( event => event.id !== action.id );
    console.log('result: ' , result);
    return result;
}

const loadData = ( state , action ) =>{
    state = action.data;
    console.log('state: ' ,state);
    return state;
}

/*********************アクションクリエーター******************/

export function addTodo(text){
    return{
        type:   ADD,
        item:   text
    }
}
export function deleteTodo( text , id){
    return{
        type:   DELETE,
        item:   text,
        id:     id
    }
}

export default events;