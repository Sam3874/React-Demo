import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import appStyles from '../common/styles';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { FormattedMessage, addLocaleData, IntlProvider } from 'react-intl';  //for translation..

//const styles = appStyles;
const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 15,
        paddingBottom: 15,
    }),
    button: theme.mixins.gutters({ margin: 5, })
});

class sample extends React.Component {
    i18nConfig;
    intlContext;
    constructor(props, context) {
        super(props, context);

        this.state = {
            language: "",
            value: "",
        };
        this.updateName = this.updateName.bind(this);
        this.updateState = this.updateState.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
        this.translate = this.translate.bind(this);
        const { classes } = props;
    }

    componentWillMount() {
        this.setLanguage("fr");  //default fr
    }
    componentDidMount() { }

    updateState(val) {
        this.setState({ ...this.state, ...val });
    }

    updateName(id, val) {
        let xVal = this.translate(id, val);
        //this.updateState({ value: xVal });
        this.setState({
            language: this.state.language,
            value: xVal
        });
    }

    setLanguage(newLang) {
        const messages_common = require('assets-root/' + newLang + '/common.json');
        const messages_parent = require('assets-root/' + newLang + '/parent.json');
        const messages_child = require('assets-root/' + newLang + '/child.json');
        this.i18nConfig = {
            locale: newLang,
            messages: { ...messages_common, ...messages_parent, ...messages_child }
        };

        const newLangLocaleData = require('react-intl/locale-data/' + newLang);  //default
        addLocaleData(newLangLocaleData);
        //console.log(this.i18nConfig);

        const intlProvider = new IntlProvider({ locale: this.i18nConfig.locale, messages: this.i18nConfig.messages }, {});
        this.intlContext = intlProvider.getChildContext();

        this.setState({
            language: newLang,
            value: ""
        });
        this.forceUpdate();  //to render translation for changed language
    }

    translate(id, name) {
        return this.intlContext.intl.formatMessage(
            { id }, { name }
        );
    }

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <IntlProvider locale={this.i18nConfig.locale} messages={this.i18nConfig.messages}>
                    <Paper className={classes.root} elevation={4}>
                        <center><u>Current Language</u>: <b>{this.state.language}</b></center>
                        <br />
                        Change Language To - <Button variant="raised" color="primary" onClick={() => this.setLanguage("en")} className={classes.button} >
                            English
                </Button>
                        <Button variant="raised" color="primary" onClick={() => this.setLanguage("fr")} className={classes.button} >
                            French
                </Button>
                        <br />
                        <Divider />
                        <h4><FormattedMessage id="parent.labels.parentComponent" /></h4>
                        <div> State : {this.state.value}</div>
                        <Button variant="raised" color="primary"
                            onClick={() => this.updateName('parent.messages.greeting_message', 'PARENT')}>
                            <FormattedMessage id="parent.buttons.parent" />
                        </Button> 
                        <Button variant="raised" color="primary">
                            <FormattedMessage id="common.buttons.submit" />
                        </Button>
                        <br /> 
                        <Divider />
                        <Child parentAction={this.updateName} >Loading child contents..</Child>
                        <br />
                        <Divider />
                        <br />
                        <SampleComponent />
                    </Paper>
                </IntlProvider>
            </div>
        );
    }
}

class Child extends React.Component {

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <h4><FormattedMessage
                    id="child.labels.childComponent" /></h4>
                <Button
                    color="secondary"
                    onClick={() => this.props.parentAction('parent.messages.greeting_message', 'CHILD')}
                    >
                    <FormattedMessage id="child.buttons.child" />
                </Button>
                <Button variant="raised" color="primary">
                    <FormattedMessage id="common.buttons.submit" />
                </Button>
            </div>
        );
    }
}

const SampleComponent = props => {
    return (
        <div>
            Simple Label -
            <FormattedMessage id="parent.labels.welcome" />
            <br /> <br />

            Parameterized Label -
            <FormattedMessage id="parent.messages.greeting_message"
                values={{ name: 'AJIT' }} />
            <br /> <br />

            Styled Label -
            <FormattedMessage id="parent.messages.greeting_message"
                values={{ name: <b>AJIT</b> }} />
            <br /> <br />

            HTML integration -
            <FormattedMessage id="parent.messages.greeting_message"
                values={{ name: 'AJIT' }}>
                {(message) => <input type="text" placeholder={message} />}
            </FormattedMessage>
            <Button variant="raised" color="primary">
                <FormattedMessage id="common.buttons.submit" />
            </Button>
        </div>
    )
}

export default withStyles(styles)(sample);