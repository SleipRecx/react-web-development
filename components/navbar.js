import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Navbar extends Component {
  render() {
    return (
      <div className="list-group">
        <a href="#" className="list-group-item active">Home</a>
        <a href="#" className="list-group-item list-group-item-action">Profiles</a>
        <a href="#" className="list-group-item list-group-item-action">
          <span className="badge">24</span>
          Messages
        </a>
        <a href="#" className="list-group-item list-group-item-action">My Books</a>
      </div>
    );
  }

}

export default Navbar;