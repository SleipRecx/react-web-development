/**
 * Component for holding the search filter components and the filter functions used with the filter components.
 *
 *
 */
import React, {Component} from 'react';
import '../../public/styles/style.css';
import CheckboxFilter from './CheckboxFilter';
import filterOptions from '../data/filter_options';

export default class Layout extends Component {

    /**
     * Saves filter_options and filter in state of the component.
     * @param props
     */
    constructor(props){
        super(props);
        this.updateStateFilter = this.updateStateFilter.bind(this);
        this.updateRatingFilter = this.updateRatingFilter.bind(this);
        this.state = {
            filter_options: filterOptions,
            filter: {state: [], rating: []}
        };
    }

    /**
     * Takes the value from the checkbox and depending on state either
     * adds it to or removes it from state_filter. It is then sent on to the parent component.
     * @param e
     */
    updateStateFilter(e){
        if (e.target.checked){
            this.state.filter.state.push(e.target.value)
        }
        else {
            this.state.filter.state.splice(this.state.filter.state.indexOf(e.target.value), 1)

        }
        this.props.onChange(this.state.filter);
    }

    /**
     * Takes the value from the checkbox and depending on state either
     * adds it to or removes it from rating_filter. It is then sent on to the parent component.
     * @param e
     */
    updateRatingFilter(e){
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
                <CheckboxFilter checkboxId="2" title="Rating" filterFunction={this.updateRatingFilter} options={this.state.filter_options.user_ratings}/>
                <CheckboxFilter checkboxId="1" title="Condition" filterFunction={this.updateStateFilter} options={this.state.filter_options.states} />
            </div>
        );
    }
}
