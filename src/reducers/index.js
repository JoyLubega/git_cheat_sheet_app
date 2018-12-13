import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import commandsReducer from './commandsReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    catogories: categoryReducer,
    commands:commandsReducer
    
});