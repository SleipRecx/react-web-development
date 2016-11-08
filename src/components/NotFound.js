/**
 * Component to be displayed if the attempted target route doesn't exist or user don't have access to it.
 */
  import React, { Component } from 'react';

  import '../../public/styles/style.css';

  export default class NotFound extends Component {

    render() {
        return (
            <div className="not-found">
                <h1>
                  <br/>
                  <br/>
                    404 <small>Not Found :(</small>
                </h1>
            </div>
        );
    }
}
