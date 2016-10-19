import React, { Component} from 'react';

import '../../public/styles/style.css';

export default class Search extends Component {
    render() {
        return (
            <div className="form-inline text-center">
                <input className="form-control search-input square" placeholder="search"/>
                <button className="btn btn-primary square">Go</button>
            </div>
        );
    }
}