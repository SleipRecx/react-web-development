/*Component handles login with facebook
Uses standard facebook login that opens in new window.
Render method opens login window.
Calls action.login with the response received from Facebook

 */
  import React, { Component } from 'react';
  import FacebookLogin from 'react-facebook-login';
  import * as Actions from '../stores/Actions'

  import '../../public/styles/style.css';

  export default class Login extends Component {
    constructor(props) {
        super(props);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    responseFacebook(response){
      Actions.login(response);
      setTimeout(()=>{
            this.context.router.push('/profile')
          }, 250);
    }

    static get contextTypes() {
     return {
       router: React.PropTypes.object.isRequired,
     };
   }

    render() {
        return (
            <FacebookLogin
              appId="1743409112576577"
              autoLoad={false}
              fields="id, name,link, gender,email,picture.type(large)"
              scope="public_profile, email"
              cssClass="facebook-button"
              textButton="Sign in"
              callback={this.responseFacebook} />
        );
    }
}
