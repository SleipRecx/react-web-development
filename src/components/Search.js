import React, { Component} from 'react';

import '../../public/styles/style.css';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.change = this.change.bind(this);
    }

    change(e){
        this.setState({value: e.target.value});
        this.props.onChange(e);
    };

    render() {
        return (
            <div className="form-inline text-center">
                <input type="text" className="form-control" value={this.state.value} onChange={this.change} placeholder="Search" />
            </div>
        );
    }
}
