import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

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