/**
 * A layout to be used for all pages of the site. All the html returned is always rendered, except the
 * div containing "this.props.children", which uses different components based on the routing. Go to "routes.js"
 * to see how it is done.
 *
 * This component imports the Navigation and FooterContent components in order to place them in the layout.
 */

import React from 'react';
import Navigation from './Navigation';
import FooterContent from './FooterContent';
import '../../public/styles/style.css';

export default class Layout extends React.Component {

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="app-container">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <Navigation/>
                        </div>
                        <div className="col-md-10">
                            <div className="app-content col-md-8">{this.props.children}</div>
                        </div>
                    </div>
                </div>
                <footer>
                    <FooterContent/>
                </footer>
            </div>
        );
    }
}
