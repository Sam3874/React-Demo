const drawerWidth = 250;
const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        marginTop: 0,
        zIndex: 1,
        overflow: 'auto',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 4,
    },
    formContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 4,
        padding: 4,
    },
    agContainer: {
        width: 500,
        borderWidth: 1,
        borderColor: 'red',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '97%',
    },
    appBar: {
        position: 'absolute',
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    footerStyle: {
        backgroundColor: theme.palette.primary[600],
        color: 'white',
        textAlign: 'center',
        zIndex: 100,
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
    },
    drawerHeader: {
        backgroundColor: 'black',
        color: 'white'
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing.unit * 3,
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
        padding: 4,
        boxSizing: 'border-box',
    },
    selectedListItem: {
        textDecoration: 'none',
        width: '100%',
        padding: 15,
        fontSize: 16,
        backgroundColor: theme.palette.primary[100],
        color: "inherit",
    },
    navListItem: {
        textDecoration: 'none',
        width: '100%',
        fontSize: 16,
        padding: 15,
        color: "inherit",
    },
    listItem: {
        padding: 0,
    },
    list: {
        paddingTop: 0,
        width: '100%',
        maxWidth: drawerWidth,
        backgroundColor: theme.palette.background.paper
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    table: {
        minWidth: 700,
    },
    button: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

export default styles;