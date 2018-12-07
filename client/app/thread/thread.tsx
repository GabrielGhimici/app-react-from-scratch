import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

interface ThreadComponentProps {
  open: boolean
}

interface ThreadComponentState {
  open: boolean
}

export default class ThreadComponent extends React.Component<ThreadComponentProps, ThreadComponentState>{

  constructor(props: ThreadComponentProps) {
    super(props);
    this.state = {
      open: this.props.open
    }
  }

  render() {
    return (
     <Dialog
       open={this.state.open}
     >
       <DialogTitle>Thread</DialogTitle>
       <DialogContent>

       </DialogContent>
       <DialogActions>
         <Button color="primary">
           Close
         </Button>
         <Button variant="contained" color="primary">
           Save
         </Button>
       </DialogActions>
     </Dialog>
    )
  }
}
