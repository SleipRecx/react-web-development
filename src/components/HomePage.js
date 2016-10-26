/**
 * Component displaying the searchbar and a table for the results of search.
 *
 * Imports Rater from react-rater, a react component used for rating.
 *
 * Imports label_converter as a function to be used to determine the class (color) of the book tags.
 *
 * Imports search and button to be used to filter results.
 *
 * Imports books, which contains all of our dummy data.
 */
import React, { Component} from 'react';
import ResultTable from './ResultTable'
import SearchFilter from './SearchFilter'
import '../../public/styles/style.css';


export default class HomePage extends Component{

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-2">
                        <SearchFilter />
                    </div>
                    <div className="col-xs-10">
                        <ResultTable/>
                    </div>
                </div>
            </div>
        );
    }
}
