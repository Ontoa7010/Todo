import { ADD , ADD_SUB ,DELETE_TASK, DELETE_TODO , DELETE_SUB,  DELETE_ALL , CHECKED, CHECKED_SUB , SHOW_SUB_TODO, LOAD_DATA } from '../actions';
import { updateSubList , deleteTaskDB ,deleteTodoDB ,updateDocument , deleteLabel } from '../database/Data';
import { deleteTask } from './TodoActionCreaters';


/***********************レデューサー*************************/
const todo = ( state = [] , action ) => {
    let newState =[];

    switch( action.type ){
        case ADD:
            const event = { 
                title:      action.title,
                labelId:    '',
                myTaskId:   action.myTaskId,
                myTask:  [],
            }
            return [...state , {...event}];
        case ADD_SUB:
            newState = state.slice();
            newState.forEach( (value) => {
                if(value.myTaskId === action.myTaskId){
                    value.myTask.forEach(( myTask )=>{
                        if( myTask.id === action.docId ){
                            myTask.subList.push( action.data );
                        }
                    })
                }
            });
            return newState;
        case 'ADD_TODO':
            newState = state.slice();
            const insertData = {
                id:             action.docId,
                subTitle:       action.subTitle,
                checkedFlag:    false,
                showListFlag:   true,
                subList:        [],
                date:           ''
            }
            newState.forEach((value)=>{
                if(value.myTaskId === action.myTaskId )
                    value.myTask.push(insertData);
            })
            return newState;
        case CHECKED:
            newState = state.slice();
            newState.forEach( (value)=> {
                if(value.myTaskId === action.myTaskId){
                    value.myTask.forEach( (myTask)=>{
                        if(myTask.id === action.docId){
                            myTask.checkedFlag = action.checkedFlag;
                            updateDocument( action.docId , action.myTaskId , myTask );
                        }
                    })
                }
            });
            return newState;
        case CHECKED_SUB:
            newState = state.slice();
            newState.forEach( (value)=> {
                if(value.myTaskId === action.myTaskId){
                    value.myTask.forEach((myTask)=>{
                        if(myTask.id === action.docId){
                            myTask.subList.forEach( (element) =>{
                                if(element.id === action.arrayId){
                                    element.checkedFlag = action.checkedFlag;
                                }
                            })
                            updateSubList( action.docId , action.myTaskId , myTask.subList);
                        }
                    })
                }
                
            });
            return newState;
        case SHOW_SUB_TODO:
            newState = state.slice();
            newState.forEach( (value) => {
                if( value.myTaskId === action.myTaskId){
                    value.myTask.forEach((myTask)=>{
                        if( myTask.id === action.docId ){
                            myTask.showListFlag = !myTask.showListFlag;
                        }
                    })
                }
            });
            return newState;
        case DELETE_TASK:
            newState = state.slice();
            newState.forEach((value)=>{
                if(value.myTaskId === action.myTaskId){
                    console.log('success!:',value);
                }
            })
            return newState.filter( event => event.myTaskId !== action.myTaskId );
        case DELETE_TODO:
            newState = state.slice();
            newState.forEach((value)=>{
                if(value.myTaskId === action.myTaskId){
                    const updateData = value.myTask.filter( event => event.id !== action.docId );
                    value.myTask = updateData;
                    deleteTodoDB(action.myTaskId , action.docId);
                }
            })
            return newState;
        case DELETE_SUB:
            newState = state.slice();
            newState.forEach( (value) => {
                if(value.myTaskId === action.myTaskId){
                    value.myTask.forEach((myTask)=>{
                        if(myTask.id === action.docId ){
                            myTask.subList = myTask.subList.filter( event => event.id !== action.arrayId);
                            updateSubList( action.docId , action.myTaskId , myTask.subList );
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
            // console.log('action.data:',action.data);
            return [ ...state, {...action.data}];
        default:
            return state;
    }
}

export default todo;