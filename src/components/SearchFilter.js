import React, {Component} from 'react';
import '../../public/styles/style.css';

export default class Layout extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {class: 'pull-right glyphicon glyphicon-chevron-down'};
    }

    handleClick(){
        if (this.state.class === 'pull-right glyphicon glyphicon-chevron-down'){
            this.setState({class: 'pull-right glyphicon glyphicon-chevron-up'});
        } else {
            this.setState({ class: 'pull-right glyphicon glyphicon-chevron-down'});
        }
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
                                    <label><input type="checkbox" value=""/>New</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>As New</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>Normal Use</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>Readable</label>
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
                                        <a className="not-active">★</a>
                                        <a className="not-active">★</a>
                                        <a className="not-active">★</a>
                                        <a className="not-active">★</a>
                                        <a className="not-active">★</a>
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>
                                        <a className="is-active">★</a>
                                        <a className="not-active">★</a>
                                        <a className="not-active">★</a>
                                        <a className="not-active">★</a>
                                        <a className="not-active">★</a>
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>
                                        <a className="is-active">★</a>
                                        <a className="is-active">★</a>
                                        <a className="not-active">★</a>
                                        <a className="not-active">★</a>
                                        <a className="not-active">★</a>
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>
                                        <a className="is-active">★</a>
                                        <a className="is-active">★</a>
                                        <a className="is-active">★</a>
                                        <a className="not-active">★</a>
                                        <a className="not-active">★</a>
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>
                                        <a className="is-active">★</a>
                                        <a className="is-active">★</a>
                                        <a className="is-active">★</a>
                                        <a className="is-active">★</a>
                                        <a className="not-active">★</a>
                                    </label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value=""/>
                                        <a className="is-active">★</a>
                                        <a className="is-active">★</a>
                                        <a className="is-active">★</a>
                                        <a className="is-active">★</a>
                                        <a className="is-active">★</a>
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