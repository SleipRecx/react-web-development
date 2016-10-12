import React from 'react';
import ReactDOM from 'react-dom';

var search_bar = React.createClass({  
  render: function() {
    return (
        <div className="input-group">
      <div className="input-group-btn">
        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action <span className="caret"></span></button>
        <ul className="dropdown-menu">
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li role="separator" className="divider"></li>
          <li><a href="#">Separated link</a></li>
        </ul>
      </div>
      <input type="text" className="form-control" aria-label="..."/>
    </div>)
  }
});

ReactDOM.render(
  React.createElement(search_bar),
  document.getElementById('root')
);