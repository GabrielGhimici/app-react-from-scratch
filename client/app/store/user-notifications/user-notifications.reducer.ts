import { Notification } from './user-notifications';
import { PayloadAction } from '../payload-action';
import { UserNotificationActionTypes } from './user-notifications.actions';

const INITIAL_STATE: Notification = {
  open: false,
  type: null,
  message: 'Notification',
  withAction: false
};

export function userNotificationReducer(state: Notification = INITIAL_STATE, action: PayloadAction<any, any>) {
  switch (action.type) {
    case UserNotificationActionTypes.NOTIFY: {
      return {...state, ...action.payload, ...{open: true}};
    }
    case UserNotificationActionTypes.FORCE_DISMISS: {
      if (state.open) {
        return {...state, ...{open: false}};
      }
      return state;
    }
    default:
      return state;
  }
}
