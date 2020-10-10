import { createStore } from 'redux';

let CheckList = [];
let CheckListSub = [];

//リストのそれぞれを記録するItemオブジェクト
function Item(item,flag,date,id,subList){
    this.item = item;
    this.flag = flag;
    this.date = date;
    this.id = id;
    this.subList = subList;
};

const item = new Item('Test1', true ,'2020-09-18',1, null);
CheckList.push(item);

const item2 = new Item('Test3', true ,'2020-09-12',3, null);
CheckListSub.push(item2);
const item3 = new Item('Test4', false ,'2020-09-12',4, null);
CheckListSub.push(item3);

const item1 = new Item('Test2', false ,'2020-09-19',2, null);
item1.CheckListSub = CheckListSub;
CheckList.push(item1);


//Todoリストの情報を格納するオブジェクト
let TodoList = {
    checkList:  CheckList,
    mode:       'default',
    maxlength:  30
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
        case 'ADD_SUB':
            return addSubReduce( state , action );
        case 'CHECKED':
            return checkReduce( state , action );
        case 'DELETE':
            return deleteReduce( state , action );
        default:
            return state;
    }
}

//追加のレデュース処理
function addReduce( state , action ){
    let tempdata = state.data;
    let id = tempdata.checkList.length;
    const item = new Item( action.item , true ,'2020-09-18' , id);
    tempdata.checkList.push( item );
    return {
        title:  state.title,
        data:   tempdata,
        item:   action.item
    };
}

//サブリスト用の追加レデュース処理
function addSubReduce( state , action ){
    let tempdata = state.data;
    const item = new Item( action.item , true ,'2020-09-18');
    tempdata.Sub1.push( item );
    return {
        title:  state.title,
        data:   tempdata,
        item:   action.item
    };
}

//チェックボックスにチェックが入れられた時のレデュース処理
function checkReduce( state , action ){
    return{

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