import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 5,
        paddingBottom: 5,
    }),
});

function pageNotFound(props) {
    const { classes } = props;
    return (
        <div>
            <Paper className={classes.root} elevation={4}>
                <Typography variant="headline" component="h3">
                    Page not Found/Allowed!! ..
                </Typography>
                <br /><br />
            </Paper>
        </div>
    );
}

pageNotFound.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(pageNotFound);

