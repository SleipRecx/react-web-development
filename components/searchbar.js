import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Searchbar extends Component {
    render() {
      return (
        <div className="input-group">
          <div className="input-group-btn">
            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Books <span className="caret"></span></button>
            <ul className="dropdown-menu">
              <li><a href="#">Users</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" className="divider"></li>
              <li><a href="#">Separated link</a></li>
            </ul>
          </div>
          <input type="text" className="form-control " style={{ width: '600px'}} placeholder="Search" aria-label="..."/>
        </div>
      );
  }
}

export default Searchbar;