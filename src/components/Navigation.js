import React, { Component} from 'react';
import {Link} from 'react-router';

import '../../public/style.css';
import navigationOptions from '../data/navigationOptions';

export default class Navigation extends Component {
    render() {
        return (
            <div className="text-center navigation">
                <ul className="list-group">
                    {navigationOptions.map(option =>
                    <li key={option.id} className="list-group-item">
                        <Link to={option.route}> {option.title}</Link>
                    </li>
                    )}
                </ul>
            </div>
        );
    }
}
