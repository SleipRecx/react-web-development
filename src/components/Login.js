  import React, { Component } from 'react';
  import FacebookLogin from 'react-facebook-login';
  import * as LoginActions from '../stores/LoginActions'

  import '../../public/styles/style.css';

  export default class Login extends Component {
    constructor(props) {
        super(props);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    responseFacebook(response){
      LoginActions.login(response);
      this.context.router.push('/profile');
    }

    static get contextTypes() {
     return {
       router: React.PropTypes.object.isRequired,
     };
   }

    render() {
        return (
            <div>
            <center>
            <br></br>
            <h1>Login is required to view some pages</h1>
            <br></br>
            <FacebookLogin
              appId="1743409112576577"
              autoLoad={false}
              fields="id, name,link, gender,email,picture.type(large)"
              scope="public_profile, email"
              callback={this.responseFacebook} />
              </center>
            </div>
        );
    }
}
