import React, { Component } from 'react';

import '../../public/styles/style.css';

export default class NotAccess extends Component {

  render() {
      return (
          <div className="not-found">
              <h1>
                <br/>
                <br/>
                  <small>You need to sign in to view this page :)</small>
              </h1>
          </div>
      );
  }
}
