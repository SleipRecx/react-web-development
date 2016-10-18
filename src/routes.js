
import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import Content from './components/Content';
import About from './components/About';
import NotFound from './components/NotFound';
import Layout from './components/Layout';


const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Content}/>
            <Route path="/about" component={About} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);

export default Routes;
