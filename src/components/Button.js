/**
 * Button component used for filtering the search.
 */

import React, { Component} from 'react';
import '../../public/styles/style.css';

class Button extends Component{

    /**
     * Sets the state of the react component and binds the function "change" to the component.
     * @param props --> arbitrary attribute inputs
     */
    constructor(props) {
        super(props);
        this.state = {value: "Title "};
        this.change = this.change.bind(this);
    }

    /**
     * Used when changing what value to filter search by
     * @param e --> An event that is triggered
     */
    change(e){
        this.setState({value: e.target.getAttribute('data-value')});
        this.props.onChange(e);
    };

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="input-group-btn">
                <button type="button"
                        className="btn btn-default dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        value="Title"
                        aria-expanded="false">{this.state.value}<span className="caret"></span></button>
                <ul className="dropdown-menu">
                  <li><a data-value="Title " onClick={this.change}>Title </a></li>
                  <li><a data-value="User " onClick={this.change}>User </a></li>
                  <li><a data-value="Price " onClick={this.change}>Price </a></li>
                </ul>
            </div>
        );
    }
}

export default Button;
