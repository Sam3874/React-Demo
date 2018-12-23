import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import appStyles from '../common/styles';

//const styles = appStyles;
const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 5,
    paddingBottom: 5,
  }),
});

const newData = [{ data: 'New Item1' }, { data: 'New Item2' }, { data: 'New Item3' }];
const newOtherValue = { otherValue: 'New Initial Value' };

export class ParentComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    const { classes } = props;

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => this.props.app_data[0].data = event.target.value;
  handleClick = (event) => {
    console.log("refs", this.refs);
    return this.props.app_update_data_Creater(
      [{ data: myForm.Item1.value }, { data: myForm.Item2.value }, { data: myForm.Item3.value }]
    )
  };

  render() {
    const classes = this.props.classes;
    return (
      <Paper className={classes.root} elevation={4}>
        <form name="myForm" className={classes.container} autoComplete="off">
          <div>
            <h3>Parent Component</h3>
            <div> data : {JSON.stringify(this.props.app_data)}</div>
            <TextField
              id="Item1"
              name="Item1"
              label="Item1"
              className={classes.textField}
              defaultValue={this.props.app_data[0].data}
              error = {true}
              margin="normal"
              />
            <TextField
              id="Item2"
              label="Item2"
              className={classes.textField}
              defaultValue={this.props.app_data[1].data}
              margin="normal"
              />
            <TextField
              id="Item3"
              label="Item3"
              className={classes.textField}
              defaultValue={this.props.app_data[2].data}
              margin="normal"
              />
            <Button variant="contained" color="primary"
              onClick={() => this.handleClick()} > Update data </Button>
            <br />
            <div><h3> otherValue : {this.props.app_otherValue.otherValue}</h3></div>
            <TextField
              id="Item"
              label="Item"
              className={classes.textField}
              value={this.props.app_otherValue.otherValue}
              margin="normal"
              />
            <Button variant="contained" color="primary"
              onClick={() => this.props.app_update_OtherValue_Creater(
                newOtherValue
              )}
              > Update otherValue </Button>
            <br /><br />
          </div>
        </form>
      </Paper>
    );
  }
}

export const Child = (props) => {
  //console.log("Child props", props);
  return (
    <div>
      <h4>Child Component</h4>
      <Button
        color="secondary"
        onClick={() => props.parentAction("Child")}>
        Child </Button>
    </div>
  )
}

export default withStyles(styles)(ParentComponent);
