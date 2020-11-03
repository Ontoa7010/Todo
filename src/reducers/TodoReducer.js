import { ADD , ADD_SUB , DELETE , DELETE_SUB,  DELETE_ALL , CHECKED, CHECKED_SUB , SHOW_SUB_TODO, LOAD_DATA } from '../actions';
import { updateSubList , deleteDocument ,updateDocument , deleteLabel } from '../database/Data';


/***********************レデューサー*************************/
const todo = ( state = [] , action ) => {
    let newState =[];

    switch( action.type ){
        case ADD:
            const event = { 
                id:       action.docId,
                title:       action.title,
                date:       '',
                checkedFlag:    false,
                showListFlag:    true,
                subList:    []
            }
            return [...state , {...event}];
        case ADD_SUB:
            newState = state.slice();
            newState.forEach( (value) => {
                if( value.id === action.docId ){
                    value.subList.push( action.data );
                }
            });
            return newState;
        case CHECKED:
            newState = state.slice();
            newState.forEach( (value)=> {
                if(value.id === action.docId){
                    value.checkedFlag = action.checkedFlag;
                    updateDocument( action.docId , "Test" , value );
                }
            });
            return newState;
        case CHECKED_SUB:
            newState = state.slice();
            newState.forEach( (value)=> {
                if(value.id === action.docId){
                    value.subList.forEach( (element) =>{
                        if(element.id === action.arrayId){
                            element.checkedFlag = action.checkedFlag;
                        }
                    })
                    updateSubList( action.docId , "Test" , value.subList);
                }
            });
            return newState;
        case SHOW_SUB_TODO:
            newState = state.slice();
            newState.forEach( (value) => {
                if( value.id === action.id ){
                    value.subListFlag = !value.subListFlag;
                }
            });
            return newState;
        case DELETE:
            deleteDocument( action.id , "Test" );
            return state.filter( event => event.id !== action.id );
        case DELETE_SUB:
            newState = state.slice();
            newState.forEach( (value) => {
                if(value.id === action.docId ){
                    value.subList = value.subList.filter( event => event.id !==action.arrayId);
                    updateSubList( action.docId ,"Test", value.subList );
                }
                
            });
            return newState;
        case DELETE_ALL:
            state.forEach( (value)=>{
                deleteDocument( value.id , "Test" );
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