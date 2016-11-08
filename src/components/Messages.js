import React, { Component } from 'react';

import '../../public/styles/style.css';

export default class Messages extends Component {

  render() {
      return (
          <div className="center">
              <h1>
                {this.props.location.pathname}
                <br/>
                <br/>
              </h1>
          </div>
      );
  }
}
