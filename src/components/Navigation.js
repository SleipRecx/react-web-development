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

export default class Navigation extends Component {

    /**
     * @returns {XML}
     */
    render() {
        return (
        <div className="navbar navbar-default navbar-static-top">
            <div className="container">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/">LOGO</Link>
                </div>

                <ul className="nav navbar-nav navbar-right text-center">
                    {nav_options.map(option =>
                        <li id={option.id} key={"navOption" + option.id}>
                            <Link to={option.route}> {option.title}</Link>
                        </li>

                    )}
                </ul>
            </div>
        </div>
        );
    }
}
