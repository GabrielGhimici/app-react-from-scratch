import * as React from 'react';
import { Slide, Snackbar, SnackbarContent } from '@material-ui/core';
import { connect } from 'react-redux';
import { Notification, NotificationType } from '../../store/user-notifications/user-notifications';
import { UserNotificationsActions } from '../../store/user-notifications/user-notifications.actions';
import NotificationContent from './notification-content/notification-content';

interface UserNotificationProps extends Notification{
  open: boolean,
  type: NotificationType | null
  message: string,
  withAction: boolean,
  actionFn?: Function,
  handleClose: (event: any, reason?: string) => void,
  handleActionClose: Function
}

function TransitionLeft(props: any) {
  return <Slide {...props} direction="left" />;
}

class UserNotification extends React.Component<UserNotificationProps, {}>{
  render(): React.ReactNode {
    const type: NotificationType = this.props.type as NotificationType;
    const content = this.props.type === null ?
      <SnackbarContent message={this.props.message}/>:
      <NotificationContent
        onClose={this.props.handleClose}
        message={this.props.message}
        variant={type}/>;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={this.props.open}
        autoHideDuration={2000}
        TransitionComponent={TransitionLeft}
        onClose={this.props.handleClose}>
        {content}
      </Snackbar>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    open: state.userNotification.open,
    type: state.userNotification.type,
    message: state.userNotification.message,
    withAction: state.userNotification.withAction,
    actionFn: state.userNotification.actionFn || null
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    handleClose: (event: any, reason: string) => {
      dispatch(UserNotificationsActions.forceDismiss());
    },
    handleActionClose: (actionToDispatch: Function) => {
      if (actionToDispatch) {
        dispatch(actionToDispatch());
      } else {
        dispatch(UserNotificationsActions.forceDismiss());
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNotification);
