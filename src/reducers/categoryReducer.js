import * as types from '../actions/types';
 const initalState ={
    categories : []
}
export default (state = initalState, action) => {
    switch(action.type) {
        case types.GET_ALLCATEGORIES_SUCCESS:
            
            return{
                ...state,
                count: action.payload.data.count,
                categories: action.payload.data
            }
        case types.SEARCH_COMMANDS_SUCCESS:
        
        return{
            ...state,
            categories: action.payload.data
        }
        case types.ADD_CATEGORY_SUCCESS:
        
        return{
            ...state,
            categories: action.payload.data
        }
        case types.EDIT_CATEGORY_SUCCESS:
        
        return{
            ...state,
            categories: action.payload.data
        }
        case types.DELETE_CATEGORY_SUCCESS:
        
        return{
            ...state,
            categories: action.payload.data
        }
        default:
            return state;
    }
}

