import React from 'react';
import PropTypes from 'prop-types';
//import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import Menu from '@material-ui/icons/Menu';
import Snackbar from '@material-ui/core/Snackbar';

import appStyles from '../common/styles';
import MySnackBarMessage from '../common/MySnackBarMessage';
import Typography from '@material-ui/core/Typography';
import MyDialog from './dialog';


const styles = appStyles;

class DynamicTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            tableData: this.rows,
            snackBarConfig: {
                open: false,
                message: ""
            },
            validationFields: []
        };

        this.updateState = this.updateState.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        this.updateTable = this.updateTable.bind(this);
        this.handleClickDialogOpen = this.handleClickDialogOpen.bind(this);
        this.handleRequestDialogClose = this.handleRequestDialogClose.bind(this);
        this.showSnackBarMessage = this.showSnackBarMessage.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);

        const { classes } = props;
        this.maxRowCount = 5;
        this.minRowCount = 1;
        this.row = {
            id: 1,
            quantity: '',
            required: false,
            justification: '',
            info: { open: false, comments: '' }
        };
        this.validationFields = [];
        this.rows = this.createTableData(this.row, this.minRowCount);
        this.state = {
            tableData: this.rows,
            snackBarConfig: {
                open: false,
                message: ""
            },
            validationFields: this.validationFields
        }
    }

    componentWillMount() { }
    componentDidMount() { }

    cols = [
        { label: 'ID', key: 'id' },
        { label: 'Quantity', key: 'quantity' },
        { label: 'Required', key: 'required' },
        { label: 'Justification', key: 'justification' },
        { label: 'Additional Info', key: 'info' }
    ];

    updateState(id, key, value) {
        let newState = JSON.parse(JSON.stringify(this.state));
        newState.tableData[id - 1][key] = value;
        this.setState(newState);
    }

    handleSwitch(id, key, targetElement, value) {
        let newState = JSON.parse(JSON.stringify(this.state));
        newState.tableData[id - 1].justification = "";
        this.setState({ tableData: newState.tableData.slice() });
        this.handleChange(id, key, targetElement, value);
    }

    handleChange(id, key, targetElement, value) {
        this.updateState(id, key, value);
        this.validateField(id - 1, key, targetElement, value);
    }

    handleRequestClose(event, reason) {
        this.setState({ snackBarConfig: { open: false, message: "" } });
    }

    handleClickDialogOpen(index) {
        let newState = JSON.parse(JSON.stringify(this.state));
        newState.tableData[index].info.open = true;
        this.setState(newState);
    }

    showSnackBarMessage(msg) {
        this.setState({ snackBarConfig: { open: true, message: msg } });
    }

    handleRequestDialogClose(action, index, comments = "") {
        let newState = JSON.parse(JSON.stringify(this.state));
        switch (action) {
            case "Submit":
                newState.tableData[index].info.open = false;
                newState.tableData[index].info.comments = comments;
                break;
            default:
                newState.tableData[index].info.open = false;
        }
        this.setState(newState);
    };

    createTableData(item, rowCount) {
        let rows = [];
        let row = JSON.parse(JSON.stringify(item)); //{ ...item };
        let flag = row.required;
        for (let i = 1; i <= rowCount; i++) {
            row.id = i;
            row.required = !flag;
            rows.push(row);
            this.validationFields.push({ [this.cols[1].key]: "", [this.cols[3].key]: "" });
            flag = !flag;
        }
        return rows;
    }

    updateTable(action) {
        this.rows = this.state.tableData;
        switch (action) {
            case "add":
                if (this.rows.length < this.maxRowCount) {
                    this.tempItem = JSON.parse(JSON.stringify(this.row));  //{ ...this.row };
                    this.tempItem.id = this.rows.length + 1;
                    this.rows.push(this.tempItem);
                    this.setState({ tableData: this.rows });
                    this.state.validationFields.push({ [this.cols[1].key]: "", [this.cols[3].key]: "" });
                } else {  //trigger snackbar open
                    this.setState({ snackBarConfig: { open: true, message: "You have reached to maximum rows" } });
                }
                break;

            case "remove":
                if (this.rows.length > this.minRowCount) {
                    this.rows.pop();
                    this.setState({ tableData: this.rows });
                    this.state.validationFields.pop();
                } else {  //trigger snackbar open
                    this.setState({ snackBarConfig: { open: true, message: "You have reached to minimum rows" } });
                }
                break;

            case "addHere":
                break;

            case "removeHere":
                break;

            case "reset":

                break;

            case "default":
        }
    }

    // form validations
    handleSubmit(e) {
        e.preventDefault();    //stop submitting form as of now..
        if (!this.validateForm()) {
            console.log('form is invalid');
            this.showSnackBarMessage("form is invalid");
        } else {
            console.log('form is valid');
            this.showSnackBarMessage("form is valid");
        }
    }

    validateForm() {
        //const inputs = document.querySelectorAll('input, textarea');
        //console.log("inputs", inputs);
        let isFormValid = true;
        let errorText = "";

        this.state.tableData.map((row, index) => {
            //Quantity validation
            let targetElement = document.querySelector("input#quantity" + row.id);
            errorText += this.validateField(index, 'quantity', targetElement, targetElement.value);

            //Justification validation
            targetElement = document.querySelector("textarea#justification" + row.id);
            errorText += this.validateField(index, 'justification', targetElement, targetElement.value);
        });
        isFormValid = errorText !== "" ? false : true;
        return isFormValid;
    }


    validateField(index, key, targetElement, value) {
        let errorText = "";
        const validity = targetElement.validity;    //this.refs[refName].validity;  
        //console.log("validationMessage", targetElement.validationMessage);
        //console.log("rangeOverflow", validity.rangeOverflow);
        //console.log("tooLong", validity.tooLong); 
        //console.log("patternMismatch", validity.patternMismatch); 

        if (!validity.valid) {
            //required
            if (validity.valueMissing) {
                errorText = "This is a required field";
            } else {
                errorText = "Content of this field is not valid";
            }
            //validity.rangeUnderflow - Not supported
            //validity.rangeOverflow - Not supported     
            //validity.tooLong - Not supported
            //validity.patternMismatch - Not supported
        }
        //additional validations if any
        if (errorText === "") {
            if (key === "justification") {
                if (value.length > 20) {
                    errorText = "Content of this field exceeded the allowed maximum charaters";
                }
            }
        }
        let validationFields = this.state.validationFields.slice();
        validationFields[index][key] = errorText;
        this.setState({ validationFields });
        return errorText;
    }

    render() { //console.log("state", this.state);
        const classes = this.props.classes;
        return (
            <Paper className={classes.root}>
                <form className={classes.formContainer} noValidate autoComplete="off">
                    <MySnackBarMessage snackBarConfig={this.state.snackBarConfig} action={this.handleRequestClose} />
                    <Grid container className={classes.container} direction="row" justify="flex-end">
                        <Fab color="primary" aria-label="add" className={classes.button}
                            onClick={() => this.updateTable("add")}>
                            <Add />
                        </Fab>
                        <Fab color="secondary" aria-label="edit" className={classes.button}
                            onClick={() => this.updateTable("remove")}>
                            <Remove />
                        </Fab>
                    </Grid>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell>Required</TableCell>
                                <TableCell>Justification</TableCell>
                                <TableCell>Additional Info</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.tableData.map((row, index) => {
                                return (
                                    <TableRow key={row.id}>
                                        {/* ID */}
                                        <TableCell>{row.id}</TableCell>

                                        {/*Quantity*/}
                                        <TableCell align="right">
                                            <FormControl
                                                className={classes.textField}
                                                style={{ width: 80 }}
                                                required
                                                min={1} max={9}
                                                pattern="[1-9]{3}"
                                                error={this.state.validationFields[row.id - 1].quantity !== ""} >
                                                <InputLabel htmlFor={'quantity' + row.id}>Quantity</InputLabel>
                                                <Input
                                                    type="number"
                                                    id={'quantity' + row.id}
                                                    pattern="[1-9]{3}"
                                                    value={row.quantity}
                                                    onChange={(event) => this.handleChange(row.id, 'quantity', event.target, event.target.value)}
                                                />
                                                <FormHelperText>{this.state.validationFields[row.id - 1].quantity}</FormHelperText>
                                            </FormControl>
                                        </TableCell>

                                        {/*Required*/}
                                        <TableCell>
                                            <Switch
                                                checked={this.state.tableData[row.id - 1].required}
                                                onChange={(event) => this.handleSwitch(row.id, 'required', event.target, event.target.checked)}
                                                aria-label={'required' + row.id}
                                            />
                                        </TableCell>

                                        {/*Justification*/}
                                        <TableCell>
                                            <TextField
                                                id={'justification' + row.id}
                                                label="Justification"
                                                multiline
                                                rowsMax="2"
                                                value={row.justification}
                                                onChange={(event) => this.handleChange(row.id, 'justification', event.target, event.target.value)}
                                                className={classes.textField}
                                                margin="normal"
                                                maxLength="2"
                                                pattern="[A-Za-z]{3}"
                                                disabled={!this.state.tableData[row.id - 1].required}
                                                required={this.state.tableData[row.id - 1].required}
                                                error={this.state.tableData[row.id - 1].required && this.state.validationFields[row.id - 1].justification !== ""}
                                                helperText={row.justification.length + "/" + 20 + "\n\r" + this.state.validationFields[row.id - 1].justification}
                                            />
                                        </TableCell>

                                        {/*Additional Info*/}
                                        <TableCell>
                                            <Grid container direction="row" justify="center">
                                                <Grid key={'Typography' + row.id} item>
                                                    <Typography type="body1" component="p">
                                                        Comments: {row.info.comments}
                                                    </Typography>
                                                </Grid>
                                                <Grid key={'Menu' + row.id} item>
                                                    <IconButton
                                                        className={classes.button}
                                                        aria-label="Menu"
                                                        onClick={() => this.handleClickDialogOpen(row.id - 1)}>
                                                        <Menu />
                                                    </IconButton>
                                                    <MyDialog DialogConfig={{
                                                        open: row.info.open,
                                                        index: row.id - 1,
                                                        comments: row.info.comments,
                                                        action: this.handleRequestDialogClose
                                                    }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Grid container direction="row" justify="flex-end">
                        <Button variant="contained" color="primary" type="submit" className={classes.button} onClick={(e) => this.handleSubmit(e)} > 
                            Submit
                        </Button>
                    <Button color="secondary" className={classes.button} onClick={() => this.props.history.push('/')}>
                        Cancel
                        </Button>
                    </Grid>
                </form>
            </Paper >
        );
    }
}

export default withStyles(styles)(DynamicTable);