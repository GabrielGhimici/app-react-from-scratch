import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import Form from '../core/redux-form/Form';

interface ThreadComponentProps {
  threadId: number | undefined;
  handleClose: Function;
}

interface ThreadComponentState {
  open: boolean
}

export default class ThreadEditComponent extends React.Component<ThreadComponentProps, ThreadComponentState>{

  componentWillUpdate(nextProps: Readonly<ThreadComponentProps>, nextState: Readonly<ThreadComponentState>, nextContext: any): void {
    if (!this.state.open && nextProps.threadId !== undefined) this.setState({open: true});
    if (this.state.open && nextProps.threadId === undefined) this.setState({open: false});
  }

  constructor(props: ThreadComponentProps) {
    super(props);
    this.state = {
      open: false
    }
  }

  render() {
    return (
     <Dialog
       open={this.state.open}
     >
       <DialogTitle>Thread</DialogTitle>
       <DialogContent>
         <Form connect={['threadList', 'items', '2']}>
           <TextField
             id="username"
             placeholder="Username"
             margin="normal"
             variant="outlined"
           />
           <TextField
             id="username"
             placeholder="Username"
             margin="normal"
             variant="outlined"
           />
         </Form>
       </DialogContent>
       <DialogActions>
         <Button color="primary" onClick={() => {this.props.handleClose()}}>
           Close
         </Button>
         <Button variant="contained" color="primary" onClick={() => {this.props.handleClose()}}>
           Save
         </Button>
       </DialogActions>
     </Dialog>
    )
  }
}
