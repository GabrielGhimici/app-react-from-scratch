import * as React from 'react';
import { Thread } from './store/thread-list';
import { ThreadListActions } from './store/thread-list.actions';
import { connect } from 'react-redux';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import { styles } from './thread-list.styles';

interface ThreadListProps {
  threads: Array<Thread>,
  loading: boolean,
  onLoad: Function,
  classes: any
}

class ThreadList extends React.Component<ThreadListProps, {}>{
  componentWillMount() {
    this.props.onLoad && this.props.onLoad();
  }
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.flexContainer}>
              <TableCell className={classes.smallColumn}>Id</TableCell>
              <TableCell className={classes.fullGrowColumn}>Title</TableCell>
              <TableCell className={classes.fixedWidthColumn}>Owner</TableCell>
              <TableCell className={classes.fixedWidthColumn}>Description</TableCell>
              <TableCell className={classes.fixedWidthColumn}>CreatedDate</TableCell>
              <TableCell className={classes.smallColumn}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.threads.map((thread) => {
              return (
                <TableRow key={thread.id} className={classes.flexContainer}>
                  <TableCell className={classes.smallColumn}>{thread.id}</TableCell>
                  <TableCell className={classes.fullGrowColumn}>{thread.title}</TableCell>
                  <TableCell className={classes.fixedWidthColumn}>{thread.owner}</TableCell>
                  <TableCell className={classes.fixedWidthColumn}>{thread.description}</TableCell>
                  <TableCell className={classes.fixedWidthColumn}>{thread.createDate}</TableCell>
                  <TableCell className={classes.smallColumn}>{'Some'}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    threads: state.threadList.items,
    loading: state.threadList.loading
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onLoad: () => {
      dispatch(ThreadListActions.loadThreads());
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ThreadList));
