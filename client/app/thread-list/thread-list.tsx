import * as React from 'react';
import { Thread } from './store/thread-list';
import { ThreadListActions } from './store/thread-list.actions';
import { connect } from 'react-redux';
import { MuiThemeProvider, withStyles } from '@material-ui/core';
import { styles, threadListTheme } from './thread-list.styles';
import MaterialTable, { Action } from 'material-table';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import EditIcon from '@material-ui/icons/Edit'
import { User } from '../store/user/user';
import { UserNotificationsActions } from '../store/user-notifications/user-notifications.actions';
import { Notification, NotificationType } from '../store/user-notifications/user-notifications';
import ThreadEditComponent from '../thread/thread-edit';

interface ThreadListProps {
  user: User | null,
  threads: Array<Thread>,
  loading: boolean,
  onLoad: Function,
  handleNotify: (notification: Notification) => void,
  classes: any
}

interface ThreadListState {
  selectedThreadID: number | undefined;
}

class ThreadList extends React.Component<ThreadListProps, ThreadListState>{
  constructor(props: ThreadListProps) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      selectedThreadID: undefined
    }
  }

  componentWillMount() {
    this.props.onLoad && this.props.onLoad();
  }

  handleEdit(data: any) {
    if (this.props.user === null) {
      this.props.handleNotify({
        type: NotificationType.Info,
        message: 'Please login to edit a thread.'
      })
    } else {
      this.setState({selectedThreadID: data.id})
    }
  }

  handleDelete() {
    if (this.props.user === null) {
      this.props.handleNotify({
        type: NotificationType.Info,
        message: 'Please login to delete a thread.'
      })
    }
  }

  render() {
    const { classes } = this.props;
    const actions:Array<Action> = this.props.user === null ?
      [] :
      [
        {
          icon: 'add',
          onClick: () => {
            this.setState({selectedThreadID: -1})
          },
          isFreeAction: true,
          iconProps: {
            color: 'primary'
          }
        }
      ];
    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={threadListTheme}>
          <MaterialTable
            columns={[
              {
                title: 'Id',
                field: 'id',
                defaultSort: 'desc',
                cellStyle: {
                  width: 50,
                }
              },
              {
                title: 'Title',
                field: 'title',
              },
              {
                title: 'Owner',
                field: 'owner',
                cellStyle: {
                  width: 150
                }
              },
              {
                title: 'Description',
                field: 'description',
                cellStyle: {
                  width: 150
                }
              },
              {
                title: 'CreatedDate',
                field: 'createDate',
                cellStyle: {
                  width: 250
                }
              },
              {
                title: 'Actions',
                render: (rowData) => {
                  return (
                    <div style={{display: 'flex'}}>
                      <EditIcon className={`${classes.icon} ${classes.noLeftSpace}`} onClick={() => {this.handleEdit(rowData)}}/>
                      <DeleteOutlinedIcon className={classes.icon} onClick={this.handleDelete}/>
                    </div>
                  );
                },
                sorting: false,
                cellStyle: {
                  width: 50
                }
              }
            ]}
            data={this.props.threads}
            options={{
              paging: false,
              search: false,
              showEmptyDataSourceMessage: true
            }}
            actions={actions}
            localization={{
              emptyDataSourceMessage: 'No threads to display!'
            }}
            title={'Threads'}/>
        </MuiThemeProvider>
        <ThreadEditComponent threadId={this.state.selectedThreadID} handleClose={() => {this.setState({selectedThreadID: undefined})}}/>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    user: state.userData.user,
    threads: state.threadList.items,
    loading: state.threadList.loading
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onLoad: () => {
      dispatch(ThreadListActions.loadThreads());
    },
    handleNotify: (notification: Notification) => {
      dispatch(UserNotificationsActions.notify(notification))
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ThreadList));
