import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import ResultTable from './components/ResultTable';
import NotFound from './components/NotFound';
import Layout from './components/Layout';


const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={Layout}>
            <IndexRoute component={ResultTable}/>
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);

export default Routes;
