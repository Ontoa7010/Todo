import { combineReducers } from 'redux'

import todo from './TodoReducer';
import log from './LogReducer';
import label from './LabelReducer';

export default combineReducers({ todo , log , label });