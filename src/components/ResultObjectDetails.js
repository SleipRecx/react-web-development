import React, {Component} from 'react';
import '../../public/styles/style.css';

export default class ResultObjectDetails extends Component {

    render() {
        return (
            <div className="result-object-details">
                <h1>Author: {this.props.author}</h1>
                <h1>User ID: {this.props.userId}</h1>
            </div>
        );
    }
}
