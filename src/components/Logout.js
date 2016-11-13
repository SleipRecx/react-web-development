/**
*Component that handles logout.
*Calls actions.logout.
*Returns nothing in render.
 */
import React, { Component } from 'react';
import * as Actions from '../stores/Actions'

export default class Logout extends Component {

  componentWillMount () {
      Actions.logout();
      if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
         window.location="/";
      }
      else{
            this.context.router.push('/');
      }
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
