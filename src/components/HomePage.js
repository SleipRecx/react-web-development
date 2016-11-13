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
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = { filter: {state: [], rating: []} };
        this.updateFilter = this.updateFilter.bind(this);
    }

    /**
     * Gets the array with filter options from SearchFilter and sets it to state_filter
     * @param e
     */
    updateFilter(e){
        this.setState({filter:e});
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-2">
                        <SearchFilter onChange={this.updateFilter}/>
                    </div>
                    <div className="col-xs-10">
                        <ResultTable items={this.state.filter}/>
                    </div>
                </div>
            </div>
        );
    }
}
