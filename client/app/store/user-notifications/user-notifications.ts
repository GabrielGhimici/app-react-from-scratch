export interface Notification {
  open?: boolean,
  type: NotificationType | null
  message: string,
  withAction?: boolean,
  actionFn?: Function
}

export enum NotificationType {
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
  Success = 'success'
}
