import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const MyDialog = props => {
    let domTextField;
    return (
        <Dialog open={props.DialogConfig.open} onClose={() => props.DialogConfig.action('Cancel', props.DialogConfig.index)}>
            <DialogTitle>Additional Info</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter below information -
            </DialogContentText>
                 <textarea rows="4" cols="40" defaultValue={props.DialogConfig.comments}
                     ref={ domElement => domTextField = domElement }
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {props.DialogConfig.action('Cancel', props.DialogConfig.index)}} color="primary">
                    Cancel
            </Button>
                <Button onClick={(event) => props.DialogConfig.action('Submit', props.DialogConfig.index, domTextField.value)} color="primary">
                    Submit
            </Button>
            </DialogActions>
    </Dialog>
    );
}
export default MyDialog;