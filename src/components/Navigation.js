/**
 * Navigation component used to navigate between pages of the site.
 *
 * Imports Link from react-router in order to be able to change the component when changing route, instead
 * of reloading the entire page, which you would by using an anchor tag with a href.
 *
 * Imports nav_options in order to keep the data separated from the view, making it easier to keep control of
 * the navigation options and their routes.
 */

import React, { Component} from 'react';
import {Link} from 'react-router';

import '../../public/styles/style.css';
import nav_options from '../data/nav_options';
import LoginStore from '../stores/LoginStore';


export default class Navigation extends Component {
  constructor(props) {
      super(props);
      this.state = {loggedIn: false};
  }

 componentWillMount(){
   this.login_needed();
    LoginStore.on("change", () =>{
        this.login_needed()
    });
  }

  async login_needed(){
    var login = await LoginStore.loginCheck();
    this.setState({
      loggedIn: login
    })
  }


    render() {
        return (
        <div className="navbar navbar-default navbar-static-top">
            <div className="container">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/">LOGO</Link>
                </div>

                <ul className="nav navbar-nav navbar-right text-center">
                    {nav_options.map(option =>
                        <li key={"navOption" + option.id}>
                            <Link to={option.route}> {option.title}</Link>
                        </li>

                    )}
                    <li key={"navOption login-logout"}>
                        <Link to={this.state.loggedIn ? '/logout' : '/login'}>{this.state.loggedIn ? 'Logout' : 'Login'}</Link>
                    </li>
                </ul>

            </div>
        </div>
        );
    }
}
