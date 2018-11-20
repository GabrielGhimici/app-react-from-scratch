import { combineReducers } from 'redux';
import { threadListReducer } from '../thread-list/store/thread-list.reducer';

export const rootReducer = combineReducers({
  threadList: threadListReducer
});
