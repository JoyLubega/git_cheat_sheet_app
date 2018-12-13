import * as types from '../actions/types';
 const initalState ={
    commands : []
}

export default (state = initalState, action) => {
    switch(action.type) {
        case types.GET_ALLCOMMANDS_SUCCESS:
            console.log(action)
            return{
                ...state,
                commands: action.payload.data
            }
        
        default:
            return state;
    }
}