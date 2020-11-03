import { LOAD_LABEL } from '../actions';

/***********************レデューサー*************************/
const label = ( state = [] , action ) => {

    switch( action.type ){
        case LOAD_LABEL:
            return [...action.data];
        default:
            return state;
    }
}

export const loadLabel = ( data ) =>{
    return {
        type: LOAD_LABEL,
        data
    };
}

export default label;