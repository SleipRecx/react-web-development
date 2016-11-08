/**
 * This is where the routing happens
 *
 * First we import all the components we want to use directly.
 *
 * Then we set the default route to display the Layout component.
 * <IndexRoute> decides which component to be displayed within Layout at path "/".
 * Underneath we need to add the routes we want to toggle between.
 *
 * For instance if we wanted an "about" page, would would need to add it as a route under <IndexRoute> with the path
 * "/about". Then the view would change from using ResultTable to About when the route is changed.
 *
 * The route at the bottom with the path "*" means that all routes that aren't defined will use this component.
 * It's important to put the route with "*" at the bottom, as it will be used over everything below it.
 */

import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import NotFound from './components/NotFound';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import loginStore from './stores/LoginStore'
import Login from './components/Login';
import Logout from './components/Logout';
import Messages from './components/Messages';
import MyBooks from './components/MyBooks';
import Profile from './components/Profile';




async function login_needed(nextState, replace, callback){
  var login = await loginStore.loginCheck();
  if(!login){
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
  callback();
}

async function logout_needed(nextState, replace, callback){
  var login = await loginStore.loginCheck();
  if(login){
    replace({
      pathname: '/logout',
      state: { nextPathname: nextState.location.pathname }
    })
  }
  callback();
}




const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={Layout}>
            <IndexRoute component={HomePage}/>
            <Route path="/profile" component={Profile} onEnter={login_needed} />
            <Route path="/mybooks" component={MyBooks} onEnter={login_needed} />
            <Route path="/messages" component={Messages} onEnter={login_needed} />
            <Route path="/login" component={Login} onEnter={logout_needed} />
            <Route path="/logout" component={Logout}/>
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);

export default Routes;
