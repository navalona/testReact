import { combineReducers } from 'redux';
import { taskReducer } from '../reducers/TaskReducer'

export const rootReducer = combineReducers({
  taskReducer,
});
