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
import Login from './Login';


export default class Navigation extends Component {
  constructor(props) {
      super(props);
      this.state = {
        loggedIn: false,
        name: "User"
      };
  }

 componentWillMount(){
   this.login_needed();
    LoginStore.on("change", () =>{
        this.login_needed()
    });
    this.get_data();
  }

  async login_needed(){
    var login = await LoginStore.loginCheck();
    this.setState({
      loggedIn: login
    })
  }

  async get_data(){
    var data = await LoginStore.decrypt(localStorage.getItem("token"));
    this.setState({
      name: data.first_name + " " + data.last_name
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

                <li>
                    {this.state.loggedIn ? (<Link to="/mybooks">Your Books <span className="glyphicon glyphicon-book"></span></Link>) : (<span/>)}
                </li>
                <li>
                    {this.state.loggedIn ? (<Link to="/profile">{this.state.name} <span className="glyphicon glyphicon-user"></span></Link>) : (<span/>)}
                </li>
                  <li key={"toggle-login"}>
                      {this.state.loggedIn ? (<Link to="/logout">Log out  <span className="glyphicon glyphicon-log-out"></span></Link>) : (<Login/>)}
                  </li>
                </ul>

            </div>
        </div>
        );
    }
}
