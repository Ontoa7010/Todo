import { ADD , ADD_SUB , DELETE_TASK , DELETE_TODO, DELETE_SUB,  DELETE_ALL , CHECKED, CHECKED_SUB , SHOW_SUB_TODO, LOAD_DATA } from '../actions';
/*********************アクションクリエーター******************/

const addTodo = ( docId ,myTaskId, title) =>{
    return{
        type:   ADD,
        docId,
        myTaskId,
        title
    }
}
export const addSubTodo = ( docId ,myTaskId ,data ) => {
    return{
        type: ADD_SUB,
        docId,
        myTaskId,
        data
    }
}
export const deleteTask = ( myTaskId ) =>{
    return{
        type:   DELETE_TASK,
        myTaskId,
    }
}

export function deleteTodo( docId ,myTaskId){
    return{
        type:   DELETE_TODO,
        docId,
        myTaskId
    }
}

export function deleteSubTodo( myTaskId , docId , arrayId ){
    return{
        type:   DELETE_SUB, 
        myTaskId,
        docId,
        arrayId
    }
}

export function deleteAllTodo(){
    return{
        type:   DELETE_ALL,
    }
}

export const showSubTodo = ( myTaskId , docId ) => {
    return {
        type: SHOW_SUB_TODO,
        myTaskId,
        docId
    }
}

export const checked = ( myTaskId , docId , checkedFlag ) => {
    return {
        type:   CHECKED,
        myTaskId,
        docId,
        checkedFlag
    }
}

export const checkedSub = ( myTaskId , docId , arrayId , checkedFlag ) => {
    return {
        type:   CHECKED_SUB,
        myTaskId,
        docId,
        arrayId,
        checkedFlag
    }
}

export default addTodo;