import { combineReducers } from 'redux';
import { threadListReducer } from '../thread-list/store/thread-list.reducer';
import { userReducer } from './user/user.reducer';
import { userNotificationReducer } from './user-notifications/user-notifications.reducer';
import { Reducer, AnyAction } from 'redux';
import { reduxFormReducer } from '../core/redux-form/redux-form.reducer';

export const composeReducers =
  <State>(...reducers: Reducer<State, AnyAction>[]): Reducer<State, AnyAction> =>
    (s: any, action: AnyAction) =>
      reducers.reduce((st, reducer) => reducer(st, action), s);


export const rootReducer = composeReducers (
  reduxFormReducer(),
  combineReducers({
    threadList: threadListReducer,
    userData: userReducer,
    userNotification: userNotificationReducer
  })
);
