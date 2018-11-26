import { combineReducers } from 'redux';
import { threadListReducer } from '../thread-list/store/thread-list.reducer';
import { userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
  threadList: threadListReducer,
  userData: userReducer
});
