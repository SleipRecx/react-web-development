import React, { Component } from 'react';
import * as LoginActions from '../stores/LoginActions'

export default class Logout extends Component {

  componentWillMount () {
      LoginActions.logout();
      this.context.router.push('/login');
   }

   static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }

  render() {
      return null;
  }
}
