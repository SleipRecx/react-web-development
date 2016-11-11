import React, {Component} from 'react';
import '../../public/styles/style.css';

export default class ResultObjectDetails extends Component {

    render() {
        return (
            <div className="result-object-details">
                <h3>Title: {this.props.title}</h3>
                <h3>Author: {this.props.author}</h3>
                <h3>Seller: {this.props.user}</h3>
            </div>
        );
    }
}
