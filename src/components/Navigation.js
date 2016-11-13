/**
 * Navigation component used to navigate between pages of the site.
 *
 * Imports Link from react-router in order to be able to change the component when changing route, instead
 * of reloading the entire page, which you would by using an anchor tag with a href.
 *
 */

import React, { Component} from 'react';
import {Link} from 'react-router';

import '../../public/styles/style.css';
import LoginStore from '../stores/LoginStore';
import Login from './Login';


export default class Navigation extends Component {
  constructor(props) {
      super(props);
      this.isLoggedIn = this.isLoggedIn.bind(this)
      this.state = {
        loggedIn: false,
        name: "User"
      };
  }

  // Checks if user is logged in and adds a listener to "change" emits.
 componentWillMount(){
   this.isLoggedIn();
   this.get_data();
   LoginStore.on("change",this.isLoggedIn)
  }

  // Removes listeners to prevent flux memory leaks
  componentWillUnmount(){
   LoginStore.removeListener("change",this.isLoggedIn)
 }

 // Checks if user is logged in
  async isLoggedIn(){
    var login = await LoginStore.loginCheck();
    this.setState({
      loggedIn: login
    })
  }

  // Get's decrypted user date from LoginStore and alters state
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
                    <Link className="navbar-brand" to="/">THE BOOKSHELF</Link>
                </div>

                <ul className="nav navbar-nav navbar-right text-center">


                <li>
                    {this.state.loggedIn ? (<Link to="/profile">{this.state.name} <span className="glyphicon glyphicon-user"></span></Link>) : (<span/>)}
                </li>
                <li>
                    {this.state.loggedIn ? (<Link to="/mybooks">Your Books <span className="glyphicon glyphicon-book"></span></Link>) : (<span/>)}
                </li>
                  <li>
                      {this.state.loggedIn ? (<Link to="/logout">Log out  <span className="glyphicon glyphicon-log-out"></span></Link>) : (<Login/>)}
                  </li>
                </ul>

            </div>
        </div>
        );
    }
}
