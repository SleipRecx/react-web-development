/**
 * Component for adding collapsable boxes containing checkboxes filtering values.
 *
 * Title of the filter as well as the filter options are sent in as props.
 */

import React, {Component} from 'react';
import '../../public/styles/style.css';

export default class CheckboxFilter extends Component {

    /**
     * state.class is used to decide which icon is to be displayed in the component.
     * @param props
     */
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            class: 'pull-right glyphicon glyphicon-chevron-down'
        };
    }

    /**
     * Toggles the icon when the collapsable object is clicked.
     * @param e
     */
    handleClick(e){
        console.log(e.currentTarget.id);
        if (this.state.class === 'pull-right glyphicon glyphicon-chevron-right'){
            this.setState({class: 'pull-right glyphicon glyphicon-chevron-down'});
        } else {
            this.setState({ class: 'pull-right glyphicon glyphicon-chevron-right'});
        }

    }

    /**
     * Generates the html used to display the checkboxes inside the component.
     * @returns {*}
     * @private
     */
    _getOptions(){
        return this.props.options.map((option) => {
            return(
                <div className="checkbox" key={option.id}>
                    <label><input type="checkbox" value={option.value} onChange={this.props.filterFunction}/>{option.title}</label>
                </div>
            )
        })
    }

    /**
     * @returns {XML}
     */
    render() {
        let collapseToggler = "#filter_collapse" + this.props.checkboxId;
        let collapseId = "filter_collapse" + this.props.checkboxId;
        let options = this._getOptions();

        return (
            <div className="panel-group">
                <div className="panel">
                    <div onClick={this.handleClick} className="panel-heading filter-type" data-toggle="collapse" href={collapseToggler}>
                        <h7 className="panel-title">
                            {this.props.title} <span className={this.state.class}></span>
                        </h7>
                    </div>
                    <div id={collapseId} className="panel-collapse collapse in">
                        <div className="panel-body">
                            {options}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
