import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { questionReducer } from './questionReducer';

const rootReducer = combineReducers({
    user: userReducer,
    question: questionReducer,
});

export default rootReducer;


