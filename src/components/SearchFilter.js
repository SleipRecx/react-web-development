import React, {Component} from 'react';
import '../../public/styles/style.css';
import Rater from 'react-rater'

export default class Layout extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.state = {class: 'pull-right glyphicon glyphicon-chevron-down', state_filter: []};
    }

    handleClick(){
        if (this.state.class === 'pull-right glyphicon glyphicon-chevron-down'){
            this.setState({class: 'pull-right glyphicon glyphicon-chevron-up'});
        } else {
            this.setState({ class: 'pull-right glyphicon glyphicon-chevron-down'});
        }
    }

    updateFilter(e){
        // Takes the value from the checkbox and depending on state either
        // adds it or removes it from state_filter. It is then sent on to the parent component.
        if (e.target.checked){
            this.state.state_filter.push(e.target.value)
        }
        else {
            this.state.state_filter.splice(this.state.state_filter.indexOf(e.target.value), 1)

        }
        this.props.onChange(this.state.state_filter);
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="search-filter">
                <h4>Filtrering</h4>
                <div className="panel-group">
                    <div className="panel">
                        <div className="panel-heading">
                            <h4 id="filter-type1" data-toggle="collapse" href="#collapse1" className="panel-title filter-type" onClick={this.handleClick}>
                                <a>
                                    State <span id="filter-icon1" className={this.state.class}></span>
                                </a>
                            </h4>
                        </div>
                        <div id="collapse1" className="panel-collapse collapse">
                            <div className="panel-body">
                                <div className="checkbox">
                                    <label><input type="checkbox" value="New" onChange={this.updateFilter}/>New</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value="As New" onChange={this.updateFilter}/>As New</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value="Normal Use" onChange={this.updateFilter}/>Normal Use</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value="Readable" onChange={this.updateFilter}/>Readable</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-group">
                    <div className="panel">
                        <div className="panel-heading">
                            <h4 data-toggle="collapse" href="#collapse2" className="panel-title filter-type" onClick={this.handleClick}>
                                <a>User Rating <span className={this.state.class}></span></a>
                            </h4>
                        </div>
                        <div id="collapse2" className="panel-collapse collapse">
                            <div className="panel-body">
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>
                                        <Rater interactive={false} rating={5}/>
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>
                                        <Rater interactive={false} rating={4}/>
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>
                                        <Rater interactive={false} rating={3}/>
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>
                                        <Rater interactive={false} rating={2}/>
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>
                                        <Rater interactive={false} rating={1}/>
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>
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