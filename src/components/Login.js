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
      setTimeout(()=>{
            this.context.router.push('/profile')
          }, 150);
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
