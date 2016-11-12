import React, { Component } from 'react';
import * as Actions from '../stores/Actions'

export default class Logout extends Component {

  componentWillMount () {
      Actions.logout();
      this.context.router.push('/');
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
