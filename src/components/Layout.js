/**
 * A layout to be used for all pages of the site. All the html returned is always rendered, except the
 * div containing "this.props.children", which uses different components based on the routing. Go to "routes.js"
 * to see how it is done.
 *
 * This component imports the Navigation and FooterContent components in order to place them in the layout.
 */

import React, {Component} from 'react';
import Navigation from './Navigation';
import FooterContent from './FooterContent';
import '../../public/styles/style.css';

export default class Layout extends Component {

    /**
     * @returns {XML}
     */
    render() {
        return (

            <div>
                <Navigation/>
                <div className="content-body">{this.props.children}</div>
                <FooterContent/>
            </div>
        );
    }
}
