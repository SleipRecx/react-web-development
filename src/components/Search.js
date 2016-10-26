/**
 * Component used to filter results in the result table.
 */

import React, { Component} from 'react';

import '../../public/styles/style.css';

export default class Search extends Component {

    /**
     * Sets the inital state of the search and binds the function change to this component.
     * @param props --> arbitrary attribute inputs.
     */
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.change = this.change.bind(this);
    }

    /**
     *
     * @param e
     */
    change(e){
        this.setState({value: e.target.value});
        this.props.onChange(e);
    };

    /**
     * @returns {XML}
     */
    render() {
        return (
            <input type="text" className="form-control" value={this.state.value} onChange={this.change} placeholder="Search" />
        );
    }
}
