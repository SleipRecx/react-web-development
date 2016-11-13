/**
 * Footer component meant to contain the content to be placed in the footer
 */

import React, { Component} from 'react';
import '../../public/styles/style.css';

export default class FooterContent extends Component {

    /**
     * @returns {XML}
     */
    render() {
        return (
            <footer className="navbar navbar-default navbar-static-bottom">
                <div className="container">
                    <div className="row footer">
                        <div className="col-sm-3 col-xs-6">
                            <h4>Who We Are</h4>
                            <p>
                                Bookshelf is a site where you can buy and sell used books.
                            </p>
                        </div>
                        <div className="col-sm-3 col-xs-6">
                            <h4>Links</h4>
                            <ul className="list-unstyled">
                                <li><a>Link 123</a></li>
                                <li><a>Linkety link</a></li>
                                <li><a>Linkur </a></li>
                            </ul>
                        </div>

                        <div className="visible-xs clearfix"></div>

                        <div className="col-sm-3 col-xs-6">
                            <h4>Stay In Touch</h4>
                            <ul className="list-unstyled">
                                <li><a>Stay</a></li>
                                <li><a>In</a></li>
                                <li><a>Touch</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-3 col-xs-6">
                            <h4>Get In Touch</h4>
                            <p>
                                This was made by group 07 as a course project for the course it2810 at NTNU.
                            </p>
                            <p>
                                <a href="https://www.ntnu.no/studier/emner/IT2810#tab=omEmnet">Read more.</a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
