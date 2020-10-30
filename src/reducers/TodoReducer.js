import { ADD , ADD_SUB , DELETE , DELETE_SUB,  DELETE_ALL , CHECKED, CHECKED_SUB , SHOW_SUB_TODO, LOAD_DATA } from '../actions';
import { updateSubList , deleteDocument ,updateDocument } from '../database/Data';


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
            console.log(`newState:`,newState);
            newState.forEach( (value)=> {
                if(value.id === action.docId){
                    console.log(`${value.id} ${action.docId}`);
                    value.checkedFlag = action.checkedFlag;
                    console.log( 'value',value );
                    updateDocument( action.docId , value );
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
                    updateSubList( action.docId , value.subList);
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
            console.log(state);
            return state.filter( event => event.id !== action.id );
        case DELETE_SUB:
            newState = state.slice();
            newState.forEach( (value) => {
                if(value.id === action.docId ){
                    value.subList = value.subList.filter( event => event.id !==action.arrayId);
                    updateSubList( action.docId , value.subList );
                }
                
            });
            return newState;
        case DELETE_ALL:
            state.forEach( (value)=>{
                deleteDocument( value.id );
            });
            return [];
        case LOAD_DATA:
            return [ ...action.data ];
        default:
            return state;
    }
}

export default todo;