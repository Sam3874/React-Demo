import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 5,
    paddingBottom: 5,
  }),
});

const Login = (props) => {
  const { classes } = props;
  return (
    <div>
      <center>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          You are not Logged in!
        </Typography>
        <Typography type="body1" component="p">
          Click <Link to="/">here</Link> to Login..
        </Typography>
        <br /><br />
      </Paper>
      </center>
    </div>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
