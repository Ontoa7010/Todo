import { ADD_TASK ,ADD_TODO, ADD_SUB ,DELETE_TASK, DELETE_TODO , DELETE_SUB,  DELETE_ALL , CHECKED, CHECKED_SUB , SHOW_SUB_TODO, LOAD_DATA } from '../actions';
import { updateSubListDB } from '../database/SubLIstDB';
import { deleteTaskDB } from '../database/TaskDB';
import { deleteTodoDB ,updateTodoDB } from '../database/TodoDB';

/***********************レデューサー*************************/
const todo = ( state = [] , action ) => {
    let newState =[];
    const { type , labelId , myTaskId , docId ,arrayId, data, checkedFlag ,title ,subTitle } = action;

    switch( type ){
        case ADD_TASK:
            const insertTask = { 
                title:      title,
                labelId:    labelId,
                myTaskId:   myTaskId,
                myTask:  [],
            }
            return [...state , {...insertTask}];
        case ADD_SUB:
            newState = state.slice();
            newState.forEach( (value) => {
                if(value.myTaskId === myTaskId){
                    value.myTask.forEach(( myTask )=>{
                        if( myTask.id === docId ){
                            myTask.subList.push( data );
                        }
                    })
                }
            });
            return newState;
        case ADD_TODO:
            newState = state.slice();
            const insertTodo = {
                id:             docId,
                subTitle,
                checkedFlag:    false,
                showListFlag:   true,
                subList:        [],
                date:           ''
            }
            newState.forEach((value)=>{
                if(value.myTaskId === myTaskId )
                    value.myTask.push(insertTodo);
            })
            return newState;
        case CHECKED:
            newState = state.slice();
            newState.forEach( (value)=> {
                if(value.myTaskId === myTaskId){
                    value.myTask.forEach( (myTask)=>{
                        if(myTask.id === docId){
                            myTask.checkedFlag = checkedFlag;
                            updateTodoDB( docId , myTaskId , myTask );
                        }
                    })
                }
            });
            return newState;
        case CHECKED_SUB:
            newState = state.slice();
            newState.forEach( (value)=> {
                if(value.myTaskId === myTaskId){
                    value.myTask.forEach((myTask)=>{
                        if(myTask.id === docId){
                            myTask.subList.forEach( (element) =>{
                                if(element.id === arrayId){
                                    element.checkedFlag = checkedFlag;
                                }
                            })
                            updateSubListDB( docId , myTaskId , myTask.subList);
                        }
                    })
                }
                
            });
            return newState;
        case SHOW_SUB_TODO:
            newState = state.slice();
            newState.forEach( (value) => {
                if( value.myTaskId === myTaskId){
                    value.myTask.forEach((myTask)=>{
                        if( myTask.id === docId ){
                            myTask.showListFlag = !myTask.showListFlag;
                        }
                    })
                }
            });
            return newState;
        case DELETE_TASK:
            newState = state.slice();
            return newState.filter( value => value.myTaskId !== myTaskId );
        case DELETE_TODO:
            newState = state.slice();
            newState.forEach((value)=>{
                if(value.myTaskId === myTaskId){
                    const updateData = value.myTask.filter( event => event.id !== docId );
                    value.myTask = updateData;
                    deleteTodoDB(myTaskId , docId);
                }
            })
            return newState;
        case DELETE_SUB:
            newState = state.slice();
            newState.forEach( (value) => {
                if(value.myTaskId === myTaskId){
                    value.myTask.forEach((myTask)=>{
                        if(myTask.id === docId ){
                            myTask.subList = myTask.subList.filter( event => event.id !== arrayId);
                            updateSubListDB( docId , myTaskId , myTask.subList );
                        }
                    })
                }
            });
            return newState;
        case DELETE_ALL:
            state.forEach( (value)=>{
                deleteTaskDB( value );
            });
            return [];
        case LOAD_DATA:
            return [ ...state, {...data}];
        default:
            return state;
    }
}

export default todo;