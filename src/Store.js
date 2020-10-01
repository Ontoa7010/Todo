import { createStore } from 'redux';

let data = ['Sample','Sample2'];

let state_value = {
    title:    'React',
    data:     data,
}

/***********************レデューサー*************************/
function todoReducer( state = state_value, action ){
    switch( action.type ){
        case 'ADD':
        return addReduce( state, action );
        case 'DELETE':
        return {
            title: 'TEST2',
            data: data,
        };
        default:
        return state;
    }
}

/*********************アクションクリエーター******************/
function addReduce( state , action ){
    return {
        title: 'TEST1',
        data:   data,
    }
}

//ストアを作成
export default createStore( todoReducer );