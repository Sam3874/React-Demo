import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 5,
    paddingBottom: 5,
  }),
});

function secureComponent(props) {
  const { classes } = props;
  return (
    <div className={classes.componentContainer}>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          Secure Component
        </Typography>
        <Typography type="body1" component="p">
          This component loads conditionally (If 'Allow Secure Access' is checked)
        </Typography>
         <br /><br />
      </Paper>
    </div>
  );
}

secureComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(secureComponent);
