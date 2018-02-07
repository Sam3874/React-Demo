import React from "react";
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { AgGridReact } from "ag-grid-react";
//import "ag-grid-enterprise";
import 'ag-grid-root/dist/styles/ag-grid.css';
import 'ag-grid-root/dist/styles/theme-fresh.css';
import 'ag-grid-root/dist/styles/ag-theme-material.css';
import 'ag-grid-root/dist/styles/theme-material.css';

import appStyles from '../common/styles';

const styles = appStyles;

class myAgGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: this.createColumnDefs(),
            initialRowData: this.createRowData()
        }
        const { classes } = props;
        this.cellValueChanged = this.cellValueChanged.bind(this);
    }

    componentDidMount() {
        // Load intial data from store
        this.props.app_rowData.length == 0 &&
            this.props.app_update_rowData(this.state.initialRowData);
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    cellValueChanged(param) {
        // update newValue in this.props.app_rowData
        this.props.app_update_rowData(param.data);
    }

    createColumnDefs() {
        return [
            { headerName: "Make", field: "make", editable: true },
            { headerName: "Model", field: "model", editable: true },
            { headerName: "Price", field: "price", editable: true }
        ];
    }

    createRowData() {
        let initialRowData = [];
        const row = { make: "", model: "", price: '' };
        for (let i = 0; i < 5; i++) {
            initialRowData.push({ make: "", model: "", price: '' }, );
        }
        return initialRowData;
    }


    render() {
        const classes = this.props.classes;
        return (
            <Paper className={classes.root} elevation={4}>
                <div style={{ boxSizing: 'border-box', height: '90%', margin: 4 }} className="ag-theme-material">
                    Grid Data = {JSON.stringify(this.props.app_rowData)}
                    <AgGridReact
                        // properties
                        columnDefs={this.state.columnDefs}
                        rowData={this.props.app_rowData}
                        enableColResize
                        groupDefaultExpanded="1"
                        enableSorting
                        getRowNodeId={(data) => data.symbol}

                        // events
                        onGridReady={this.onGridReady}
                        onCellValueChanged={this.cellValueChanged}
                        >
                    </AgGridReact>
                </div>
            </Paper>
        )
    }
};

//export default myAgGrid;
export default withStyles(styles)(myAgGrid);