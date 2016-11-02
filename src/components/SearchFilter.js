import React, {Component} from 'react';
import '../../public/styles/style.css';
import Rater from 'react-rater'
import CheckboxFilter from './CheckboxFilter';
import filterOptions from '../data/filter_options';

export default class Layout extends Component {

    constructor(props){
        super(props);
        this.updateStateFilter = this.updateStateFilter.bind(this);
        this.updateRatingFilter = this.updateRatingFilter.bind(this);
        this.state = {
            filter_options: filterOptions,
            filter: {state: [], rating: []}
        };
    }



    updateStateFilter(e){
        // Takes the value from the checkbox and depending on state either
        // adds it to or removes it from state_filter. It is then sent on to the parent component.
        if (e.target.checked){
            this.state.filter.state.push(e.target.value)
        }
        else {
            this.state.filter.state.splice(this.state.filter.state.indexOf(e.target.value), 1)

        }
        this.props.onChange(this.state.filter);
    }

    updateRatingFilter(e){
        // Takes the value from the checkbox and depending on state either
        // adds it to or removes it from rating_filter. It is then sent on to the parent component.
        if (e.target.checked){
            this.state.filter.rating.push(e.target.value)
        }
        else {
            this.state.filter.rating.splice(this.state.filter.rating.indexOf(e.target.value), 1)

        }
        this.props.onChange(this.state.filter);
    }

    /**
     * @returns {XML}
     */
    render() {

        return (
            <div className="search-filter">
                <h6>Filter</h6>
                <CheckboxFilter checkboxId="1" title="State" filterFunction={this.updateStateFilter} options={this.state.filter_options.states} />
                <CheckboxFilter checkboxId="2" title="User Rating" filterFunction={this.updateRatingFilter} options={this.state.filter_options.user_ratings}/>
            </div>
        );
    }
}
