import { createStore } from 'redux';

let data = ['Sample'];

let state_value = {
    title:    'React',
    data:     data,
    item:     'test'
}

/***********************レデューサー*************************/
export function todoReducer( state = state_value, action ){
    switch( action.type ){
        case 'ADD':
            return addReduce( state, action );
        case 'DELETE':
            return deleteReduce( state , action );
        default:
            return state;
    }
}

//追加のレデュース処理
function addReduce( state , action ){
    let tempdata = state.data;
    tempdata.push( action.item );
    return {
        title:  state.title,
        item:   action.item,
        data:   tempdata
    };
}

function deleteReduce( state , action ){
    return {
        title:  action.item,
        data:   state.data,
        item:   'test'
    }
}

/*********************アクションクリエーター******************/

export function addTodo(text){
    return{
        type:   'ADD',
        item:   text
    }
}
export function deleteTodo(text){
    return{
        type:   'DELETE',
        item:   text
    }
}

//ストアを作成
export default createStore( todoReducer );