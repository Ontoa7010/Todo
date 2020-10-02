import { createStore } from 'redux';

let CheckList = [];
let CheckListSub = [];

function Item(item,flag,date,CheckListSub){
    this.item = item;
    this.flag = flag;
    this.date = date;
    this.CheckListSub = CheckListSub;
};

const item = new Item('Test1', true ,'2020-09-18', null);
CheckList.push(item);
const item1 = new Item('Test2', false ,'2020-09-19', null);
CheckList.push(item1);

let TodoList = {
    checkList:  CheckList,
    mode:       'default'
};

//ステート
let state_value = {
    title:    'CheckList',
    data:     TodoList,
    item:      ''
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
    const item = new Item( action.item , true ,'2020-09-18', null);
    tempdata.checkList.push( item );
    return {
        title:  state.title,
        data:   tempdata,
        item:   action.item
    };
}

function deleteReduce( state , action ){
    return {
        title:  action.item,
        data:   state.data,
        item:   action.item
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