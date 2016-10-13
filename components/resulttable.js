import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Rater from 'react-rater'

class ResultTable extends Component{

    render() {
        var headerComponents = this.generateHeaders(),
            rowComponents = this.generateRows();

        return (
            <table className="table table-bordered">
                <thead><tr>{headerComponents}</tr></thead>
                <tbody>{rowComponents}</tbody>
            </table>
        )
    }

    generateHeaders() {
        var cols = this.props.cols;  // [{key, label}]

        // generate our header (th) cell components
        return cols.map(function(colData) {
            return <th key={colData.key}>{colData.label}</th>;
        });
    }

    generateRows() {
        var cols = this.props.cols,  // [{key, label}]
            data = this.props.data;

        return data.map(function(item) {
            // handle the column data within each row
            var cells = cols.map(function(colData) {
                ///sets className of a label equal to state of the book in order to style with proper colours
                if (colData.key === 'state'){
                    return <td><span className={item[colData.key]}>{item[colData.key]}</span></td>;
                }
                /// adds a user icon for the user column
                else if (colData.key === 'user') {
                    return <td><span className="glyphicon glyphicon-user" aria-hidden="true"></span>{item[colData.key]}</td>;
                    
                }
                else if (colData.key === 'userRating'){
                    return <td><Rater interactive={false} rating={item[colData.key]} /></td>;
                }
                else{
                    return <td>{item[colData.key]}</td>;
                }
            });
            return <tr key={item.id}>{cells}</tr>;
        });
    }
}

export default ResultTable;