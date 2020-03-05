import React from 'react';
import {
    BrowserRouter as Router,
    NavLink,
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import { GridList, GridListTile } from '@material-ui/core/GridList';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import appStyles from '../common/styles';
import Home from '../home';
import Stateful from '../stateful/Main_component';
import Stateless from '../stateless/Main_container';
import SecureComponent from '../secureComponent/secureComponent';
import PageNotFound from '../pageNotFound/pageNotFound';
import MyAgGrid from '../agGrid/agGrid_container';
import Translation_reactIntl from '../Translation (react-intl)/sample';
import DynamicTable from '../dynamicTable';
import Login from '../login';


const styles = appStyles;

export class App extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.state = { open: true, secureAccessChecked: true, isAuth: true };
        const { classes } = props;
    }

    componentDidMount() {
        !this.state.isAuth && this.props.history.push("/login")
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.history.location.pathname, this.state.isAuth);
        if (!this.state.isAuth) {
            if (this.props.history.location.pathname !== "/login") {
                this.props.history.push("/login");
            } 
        } else if (prevState.isAuth !== this.state.isAuth) {
            this.props.history.push("/home");
        }
    }

    updateCheck() {
        this.setState({
            secureAccessChecked: !this.state.secureAccessChecked,
            isAuth: !this.state.secureAccessChecked
        });
    }
    checkIsAuth() {
        return this.state.isAuth;
    }

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="title" color="inherit" noWrap>
                                React, Router, Conditional routing, Redux, Material-ui-next, Form validation, Dynamic table, React-intl, ag-Grid
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
                        <div className={classes.drawerHeader}>
                            <Toolbar>
                                <Typography variant="title" color="inherit" noWrap>
                                    {'React Demo'}
                                </Typography>
                            </Toolbar>
                        </div>
                        <Divider />
                        <List className={classes.list}>
                            <ListItem button className={classes.listItem}>
                                <NavLink exact to="/" className={classes.navListItem} activeClassName={classes.selectedListItem}>
                                    Home
                            </NavLink>
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <NavLink exact to="/login" className={classes.navListItem} activeClassName={classes.selectedListItem}>
                                    Login
                            </NavLink>
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <NavLink exact to="/stateful" className={classes.navListItem} activeClassName={classes.selectedListItem}>
                                    Local State
                            </NavLink>
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <NavLink exact to="/stateless" className={classes.navListItem} activeClassName={classes.selectedListItem}>
                                    Redux State
                            </NavLink>
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <NavLink exact to="/myAgGrid" className={classes.navListItem} activeClassName={classes.selectedListItem}>
                                    ag-Grid
                            </NavLink>
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <NavLink exact to="/dynamicTable" className={classes.navListItem} activeClassName={classes.selectedListItem}>
                                    Dynamic Table
                            </NavLink>
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <NavLink exact to="/translation" className={classes.navListItem} activeClassName={classes.selectedListItem}>
                                    Translation (react-intl)
                            </NavLink>
                            </ListItem>
                            <ListItem button className={classes.listItem}>
                                <NavLink exact to="/secureComponent" className={classes.navListItem} activeClassName={classes.selectedListItem}>
                                    Secure Routing
                            </NavLink>
                            </ListItem>
                        </List>
                        <Divider />
                        <Tooltip id="tooltip-Checkbox" title="Checking this allows accessing 'Secure Routing'">
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.secureAccessChecked}
                                            onChange={this.updateCheck.bind(this)}
                                            value="secureAccessChecked"
                                        />
                                    }
                                    label="Allow Secure Access"
                                />
                            </FormGroup>
                        </Tooltip>
                    </Drawer>
                    <main className={classes.content}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/stateful" component={Stateful} />
                            <Route exact path="/stateless" component={Stateless} />
                            <Route exact path="/myAgGrid" component={MyAgGrid} />
                            <Route exact path="/dynamicTable" component={DynamicTable} />
                            <Route exact path="/translation" component={Translation_reactIntl} />
                            <PrivateRoute exact path="/secureComponent" component={SecureComponent} secureAccessChecked={this.state.secureAccessChecked} />
                            <Route component={PageNotFound} />
                        </Switch>
                    </main>
                </div>
                <footer className={classes.footerStyle}>
                    Footer
                </footer>
            </div>
        );
    }
}

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => rest.secureAccessChecked === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/notAllowed', state: { from: props.location } }} />}
        />
    )
};

const styledApp = withStyles(styles)(App);
export default withRouter(styledApp);
