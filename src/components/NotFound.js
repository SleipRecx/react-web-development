
import React, { Component } from 'react';

import '../../public/styles/style.css';

export default class NotFound extends Component {
    render() {
        return (
            <div className="not-found">
                <h1>
                  {this.props.location.pathname}
                  <br/>
                  <br/>
                    404 <small>Not Found :(</small>
                </h1>
            </div>
        );
    }
}
