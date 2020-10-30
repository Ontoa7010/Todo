import { ADD , ADD_SUB , DELETE , DELETE_SUB,  DELETE_ALL , CHECKED, CHECKED_SUB , SHOW_SUB_TODO, LOAD_DATA } from '../actions';
/*********************アクションクリエーター******************/

const addTodo = ( docId , title) =>{
    return{
        type:   ADD,
        docId,
        title
    }
}
export const addSubTodo = ( docId , data ) => {
    return{
        type: ADD_SUB,
        docId,
        data
    }
}

export function deleteTodo( text , id ){
    return{
        type:   DELETE,
        item:   text,
        id:     id
    }
}
export function deleteSubTodo( docId ,arrayId ){
    return{
        type:   DELETE_SUB, 
        docId,
        arrayId,
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

export const checked = ( docId , checkedFlag ) => {
    return {
        type:   CHECKED,
        docId,
        checkedFlag
    }
}

export const checkedSub = ( docId , arrayId , checkedFlag ) => {
    return {
        type:   CHECKED_SUB,
        docId,
        arrayId,
        checkedFlag
    }
}

export default addTodo;