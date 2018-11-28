import { Notification } from './user-notifications';
import { PayloadAction } from '../payload-action';

export enum UserNotificationActionTypes {
  NOTIFY = '[USER_NOTIFICATION]NOTIFY',
  FORCE_DISMISS = '[USER_NOTIFICATION]FORCE_DISMISS'
}

export class UserNotificationsActions {
  static notify(infos: Notification): PayloadAction<any, any> {
    return {
      type: UserNotificationActionTypes.NOTIFY,
      payload: infos
    }
  }

  static forceDismiss(): PayloadAction<any, any> {
    return {
      type: UserNotificationActionTypes.FORCE_DISMISS
    }
  }
}
