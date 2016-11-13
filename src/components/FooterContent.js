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
                        <div className="col-sm-4 col-xs-6">
                            <h4>Who We Are</h4>
                            <p>
                                Bookshelf is a site where you can buy and sell used books.
                            </p>
                        </div>
                        <div className="col-sm-4 col-xs-6">
                            <h4>Learn more about the technologies used to create this website</h4>
                            <div className="col-xs-6 unpad">
                                <ul className="list-unstyled">
                                    <li><a href="https://facebook.github.io/react/">React</a></li>
                                    <li><a href="https://nodejs.org">Node</a></li>
                                    <li><a href="https://jquery.com/">jQuery</a></li>
                                    <li><a href="http://expressjs.com/">Express</a></li>
                                </ul>
                            </div>
                            <div className="col-xs-6 unpad">
                                <ul className="list-unstyled">
                                    <li><a href="http://sass-lang.com/">Sass</a></li>
                                    <li><a href="http://getbootstrap.com/">Bootstrap</a></li>
                                    <li><a href="https://facebook.github.io/flux/">Flux</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="visible-xs clearfix"></div>

                        <div className="col-sm-4 col-xs-6">
                            <h4>Get In Touch</h4>
                            <p>
                                This website was made by group 07 as a course project for the course it2810 at NTNU.
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
