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
import Keycloak from 'keycloak-js';

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
    keycloak;
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.state = { open: true, secureAccessChecked: true, isAuthenticated: false, keycloak: null };
    }

    handleAuth() {
        /* this.keycloak = Keycloak({
            realm: "demorealm",
            url: "http://localhost:8080/auth",
            clientId: "demo-client"
        });
        this.keycloak.init({ onLoad: 'login-required', promiseType: 'native' })
            .then(authenticated => {
                this.setState({ isAuthenticated: authenticated });
                this.keycloak.onTokenExpired = () => this.setState({ isAuthenticated: false });
                this.keycloak.onAuthLogout = () => this.setState({ isAuthenticated: false });
            })
            .catch(function () {
                console.log('failed to initialize');
                this.setState({ isAuthenticated: false });
                //redirect to public page with login link
            }); */
        this.setState({ isAuthenticated: true });
    }

    componentDidMount() {
        if (this.props.history.location.pathname !== '/login') {
            this.handleAuth();
        }
    }

    componentDidUpdate() {
        if (!this.state.isAuthenticated && (this.props.history.location.pathname !== '/login')) {
            this.handleAuth();
        }
    }

    updateCheck() {
        this.setState({
            secureAccessChecked: !this.state.secureAccessChecked,
            isAuthenticated: !this.state.secureAccessChecked
        });
    }

    handleLogout() {
        this.setState({ isAuthenticated: false });
        this.props.history.push('/login');
        //this.keycloak.logout();
    }

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="title" color="inherit" noWrap>
                                React, Router, Conditional routing, Auth Guard, Redux, Material-ui-next, Form validation, Dynamic table, React-intl, ag-Grid
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {this.state.isAuthenticated &&
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
                                {/* <ListItem button className={classes.listItem}>
                                <NavLink exact to="/login" className={classes.navListItem} activeClassName={classes.selectedListItem}>
                                    Login
                            </NavLink>
                            </ListItem> */}
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
                            {<Tooltip id="tooltip-Checkbox" title="Checking this allows accessing 'Secure Routing'">
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
                            </Tooltip>}
                            <Divider />
                            <Button variant="contained" color="secondary" onClick={this.handleLogout.bind(this)}>
                                Logout
                        </Button>
                        </Drawer>}
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
