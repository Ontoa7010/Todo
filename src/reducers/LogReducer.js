import {
    LOG_ADD ,
    LOG_ADD_SUB ,
    LOG_DELETE_TODO , 
    LOG_DELETE_ALL_TODO , 
    LOG_DELETE_LOG , 
    LOG_DELETE_ALL_LOG, 
    LOG_DELETE_SUB_TODO, 
} from '../actions';


/***********************レデューサー*************************/
const log = ( state = [], action ) => {
    let event ='';
    const length = state.length;
    const id = length === 0 ? 1 : state[0].id + 1;

    switch( action.type ){
        case LOG_ADD:
            event = { message: `Todo:「${action.item}」 を追加しました` };
            return [ { id , ...event}　, ...state ];
        case LOG_ADD_SUB:
            event = { message: `TaskID:${action.id}にSubTodo:「${action.item}」 を追加しました` };
            return [ { id , ...event}　, ...state ];
        case LOG_DELETE_TODO:
            event = { message: `Todo:「${action.item}」を削除しました` };
            return [ { id , ...event } , ...state ];
        case LOG_DELETE_SUB_TODO:
            event = { message: `TaskID:${action.id}のSubTodo:「${action.item}」を削除しました` };
            return [ {id , ...event } , ...state ];
        case LOG_DELETE_LOG:
            return state.filter( event => event.id !== action.id);
        case LOG_DELETE_ALL_TODO:
            event = { message : `全てのTodoを削除しました` };
            return [ { id, ...event } , ...state ];
        case LOG_DELETE_ALL_LOG:
            return [];
        default:
            return state;
    }
}

//アクションクリエーター
export const logAddTodo = ( item ) => {
    return{
        type:   LOG_ADD,
        item
    };
}
export const logAddSubTodo = ( id , item ) => {
    return{
        type:   LOG_ADD_SUB,
        id,
        item
    };
}

export const logDeleteTodo = ( item , id ) =>{
    return{ 
        type:   LOG_DELETE_LOG,
        item,
        id
    }
}

export const logDeleteSubTodo = ( id , item ) => {
    return{
        type:   LOG_DELETE_SUB_TODO,
        id,
        item
    };
}

export const logDeleteAllTodo = () => {
    return{ type:   LOG_DELETE_ALL_TODO };
}

export const logDeleteLog = ( item ,id ) => {
    return { 
        type:  LOG_DELETE_LOG,
        item,
        id 
    };
}

export const logDeleteAllLog = () => {
    return{ type:   LOG_DELETE_ALL_LOG };
}


export default log;