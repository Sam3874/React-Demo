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

const home = (props) => {
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          Home Component
        </Typography>
        <Typography type="body1" component="p">
          This is a default loaded component of application..
        </Typography>
         <br /><br />
      </Paper>
    </div>
  );
}

home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(home);
