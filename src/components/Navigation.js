import React, { Component} from 'react';

import '../../public/styles/style.css';
import navigationOptions from '../data/navigationOptions';

export default class Navigation extends Component {
    render() {
        return (
            <div className="text-center navigation">
                <ul className="list-group">
                    {navigationOptions.map(option =>
                    <li key={option.id} className="list-group-item">
                        <a href={option.route} className="btn-link">{option.title}</a>
                    </li>
                    )}
                </ul>
            </div>
        );
    }
}