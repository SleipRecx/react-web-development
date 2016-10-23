/**
 * This file makes the react components be rendered inside the html element with id "root", which can be found in
 * our index.html file. Route.js then decides which components to be rendered when.
 *
 * The broserHistory specifies that we want to use the HTML5 browser history for the roting, instead of ex hashHistory.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import Routes from './routes';

ReactDOM.render(
    <Routes history={browserHistory} />,
    document.getElementById('root')
);
