import React, {Component} from 'react';
import '../../public/styles/style.css';
import Rater from 'react-rater'

export default class Layout extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.updateStateFilter = this.updateStateFilter.bind(this);
        this.updateRatingFilter = this.updateRatingFilter.bind(this);
        this.state = {
        class1: 'pull-right glyphicon glyphicon-chevron-right',
        class2: 'pull-right glyphicon glyphicon-chevron-right',
        filter: {state: [], rating: []}};
    }

    handleClick(e){
      console.log(e.currentTarget.id);
      if(e.currentTarget.id == "filter-type1"){
        if (this.state.class1 === 'pull-right glyphicon glyphicon-chevron-right'){
            this.setState({class1: 'pull-right glyphicon glyphicon-chevron-down'});
        } else {
            this.setState({ class1: 'pull-right glyphicon glyphicon-chevron-right'});
        }
      }
      else{
        if (this.state.class2 === 'pull-right glyphicon glyphicon-chevron-right'){
            this.setState({class2: 'pull-right glyphicon glyphicon-chevron-down'});
        } else {
            this.setState({class2: 'pull-right glyphicon glyphicon-chevron-right'});
        }
      }

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
                <div className="panel-group">
                    <div className="panel">
                        <div id="filter-type1" onClick={this.handleClick} className="panel-heading filter-type" data-toggle="collapse" href="#collapse1">
                            <h7 className="panel-title">
                                <a>
                                    State <span id="filter-icon1" className={this.state.class1}></span>
                                </a>
                            </h7>
                        </div>
                        <div id="collapse1" className="panel-collapse collapse">
                            <div className="panel-body">
                                <div className="checkbox">
                                    <label><input type="checkbox" value="New" onChange={this.updateStateFilter}/>New</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value="As New" onChange={this.updateStateFilter}/>As New</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value="Normal Use" onChange={this.updateStateFilter}/>Normal Use</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value="Readable" onChange={this.updateStateFilter}/>Readable</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-group">
                    <div className="panel">
                        <div onClick={this.handleClick} className="panel-heading filter-type" id="filter-type2" data-toggle="collapse" href="#collapse2">
                            <h7 className="panel-title">
                                <a>User Rating <span className={this.state.class2}></span></a>
                            </h7>
                        </div>
                        <div id="collapse2" className="panel-collapse collapse">
                            <div className="panel-body">
                                <div className="checkbox">
                                    <label><input type="checkbox" value="5" onChange={this.updateRatingFilter}/>
                                        <Rater interactive={false} rating={5}/>
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value="4" onChange={this.updateRatingFilter}/>
                                        <Rater interactive={false} rating={4}/>
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value="3" onChange={this.updateRatingFilter}/>
                                        <Rater interactive={false} rating={3}/>
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value="2" onChange={this.updateRatingFilter}/>
                                        <Rater interactive={false} rating={2}/>
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value="1" onChange={this.updateRatingFilter}/>
                                        <Rater interactive={false} rating={1}/>
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value="0" onChange={this.updateRatingFilter}/>
                                        <Rater interactive={false} rating={0}/>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
