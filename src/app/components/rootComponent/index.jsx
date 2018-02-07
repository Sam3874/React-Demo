import React from 'react';
import {
    BrowserRouter as Router,
    NavLink,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import PropTypes from "prop-types";
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile } from 'material-ui/GridList';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import home from '../home/home';
import stateful from '../stateful/Main_component';
import stateless from '../stateless/Main_container';
import secureComponent from '../secureComponent/secureComponent';
import pageNotFound from '../pageNotFound/pageNotFound';
import myAgGrid from '../agGrid/agGrid_container';
import translation_reactIntl from '../Translation (react-intl)/sample';
import DynamicTable from '../dynamicTable/dynamicTable';
import Tooltip from 'material-ui/Tooltip';
import appStyles from '../common/styles';

const styles = appStyles;

export class App extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.state = { open: true, secureAccessChecked: true, };
        const { classes } = props;
    }

    componentDidMount() { }
    updateCheck() {
        //update local state
        this.setState((oldState) => {
            return Object.assign({}, oldState, {
                secureAccessChecked: !oldState.secureAccessChecked
            });
        });
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
                            <Route exact path="/" component={home} />
                            <Route exact path="/home" component={home} />
                            <Route exact path="/stateful" component={stateful} />
                            <Route exact path="/stateless" component={stateless} />
                            <Route exact path="/myAgGrid" component={myAgGrid} />
                            <Route exact path="/dynamicTable" component={DynamicTable} />
                            <Route exact path="/translation" component={translation_reactIntl} />
                            <PrivateRoute exact path="/secureComponent" component={secureComponent} secureAccessChecked={this.state.secureAccessChecked} />
                            <Route component={pageNotFound} />
                        </Switch>
                    </main>
                </div>
                <footer className={classes.footerStyle}>
                    Footer
                </footer>
            </div>
        );
    }

    componentDidMount() { }
}

export const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => rest.secureAccessChecked === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/notAllowed', state: { from: props.location } }} />}
            />
    )
};

export default withStyles(styles)(App);