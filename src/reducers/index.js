import { combineReducers } from 'redux'

import todo from './TodoReducer';
import log from './LogReducer';

export default combineReducers({ todo , log });