import { combineReducers } from 'redux';
import studentReducer from './student/studentReducer';
import postReducer from './post/postReducer';

const rootReducer = combineReducers({ studentState: studentReducer, postState: postReducer });

export default rootReducer;
