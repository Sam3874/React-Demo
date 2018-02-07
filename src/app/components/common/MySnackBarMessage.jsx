import React from "react";
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

const MySnackBarMessage = (props) => (    
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={props.snackBarConfig.open}
            autoHideDuration={4000}
            onClose={props.action}
            SnackbarContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{props.snackBarConfig.message}</span>}
            action={
                <Button key="gotit" color="secondary"  onClick={props.action}>
                    Got It!
                </Button>
            }
            />   
);
export default MySnackBarMessage;