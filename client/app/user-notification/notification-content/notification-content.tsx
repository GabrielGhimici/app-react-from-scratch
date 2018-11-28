import * as React from 'react';
import { createStyles, IconButton, SnackbarContent, Theme, withStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import { amber, green } from '@material-ui/core/colors';
import { NotificationType } from '../../store/user-notifications/user-notifications';
import classNames from 'classnames';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = (theme: Theme) => createStyles({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

interface NotificationContentProps {
  message: string,
  onClose: (event: any) => void,
  variant: NotificationType,
  classes?: any,
  className?: string
}

class NotificationContent extends  React.Component<NotificationContentProps, {}>{
  render(): React.ReactNode {
    const { classes, className, message, onClose, variant } = this.props;
    const Icon = variantIcon[variant];
    return (
      <SnackbarContent
        className={classNames(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)}/>
              {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}>
            <Close className={classes.icon} />
          </IconButton>,
        ]}
      />
    )
  }
}

export default withStyles(styles)(NotificationContent);
