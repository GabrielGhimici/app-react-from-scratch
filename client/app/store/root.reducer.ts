import { combineReducers } from 'redux';
import { threadListReducer } from '../thread-list/store/thread-list.reducer';
import { userReducer } from './user/user.reducer';
import { userNotificationReducer } from './user-notifications/user-notifications.reducer';

export const rootReducer = combineReducers({
  threadList: threadListReducer,
  userData: userReducer,
  userNotification: userNotificationReducer
});
