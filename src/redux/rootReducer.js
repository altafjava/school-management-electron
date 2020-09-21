import { combineReducers } from 'redux';
import studentReducer from './student/studentReducer';

const rootReducer = combineReducers({ studentState: studentReducer });

export default rootReducer;
