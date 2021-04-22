import React from 'react';
import Header from "../components/Header.js"
import Table from "../components/Table.js"

const SpreadSheet = (props) => {
    return (
        <div>
            <table id="table">
                <thead>
                    <Header col={props.col} />
                </thead>
                <tbody>
                    <Table row={props.row} col={props.col} data={props.data} add={props.add} formula={props.formula} />
                </tbody>
            </table>
        </div>
    )
}

export default SpreadSheet;