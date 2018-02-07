/**
 * Root component
 */
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import appStyles from '../common/styles';

//const styles = appStyles;
const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 5,
    paddingBottom: 5,
  }),
});

class stateless_Component extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: "",
    };
    this.updateState = this.updateState.bind(this);
    const { classes } = props;
  }

  updateState(newVal = "Default") {
    this.setState({ value: newVal });
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <h3>Parent Component</h3>
          <div> State : {this.state.value}</div>
          <Button variant="raised" color="primary"
            onClick={() => this.updateState("Home")}
            > Parent </Button>
          <br /> <br />
          <Child parentAction={this.updateState} >Loading child contents..</Child>
        </Paper>
      </div>
    );
  }
}

class Child extends React.Component {
  render() {
    const classes = this.props.classes;
    return (
      <div>
        <h4>Child Component</h4>
        <Button
          color="secondary"
          onClick={() => this.props.parentAction("Child")}
          > Child </Button>
      </div>
    );
  }
}

export default withStyles(styles)(stateless_Component);