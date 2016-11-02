import React, {Component} from 'react';
import Rater from 'react-rater'
import '../../public/styles/style.css';

export default class CheckboxFilter extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            class: 'pull-right glyphicon glyphicon-chevron-right'
        };
    }

    handleClick(e){
        console.log(e.currentTarget.id);
        if (this.state.class === 'pull-right glyphicon glyphicon-chevron-right'){
            this.setState({class: 'pull-right glyphicon glyphicon-chevron-down'});
        } else {
            this.setState({ class: 'pull-right glyphicon glyphicon-chevron-right'});
        }

    }

    _getOptions(){
        return this.props.options.map((option) => {
            return(
                <div className="checkbox" key={option.id}>
                    <label><input type="checkbox" value={option.value} onChange={this.props.filterFunction.bind(this)}/>{option.title}</label>
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
                    <div id={collapseId} className="panel-collapse collapse">
                        <div className="panel-body">
                            {options}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
