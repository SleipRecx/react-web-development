import React, { Component} from 'react';
import {Link} from 'react-router';

import '../../public/styles/style.css';
import nav_options from '../data/nav_options';

export default class Navigation extends Component {
    render() {
        return (
            <div className="text-center navigation">
                <ul className="list-group">
                    {nav_options.map(option =>
                    <li key={option.id} className="list-group-item">
                        <Link to={option.route}> {option.title}</Link>
                    </li>
                    )}
                </ul>
            </div>
        );
    }
}
