import React, {Component} from 'react';
import '../../public/styles/style.css';
import label_converter from '../data/label_converter';

export default class ResultObjectSeller extends Component {

    render() {

        return (
            <ul className="list-inline row result-object">
                <li className="col-sm-4">
                    {this.props.title}
                </li>
                <li className="col-sm-2 price">
                    <span className={"label label-" + label_converter(this.props.state)} >{this.props.state}</span>
                </li>
                <li className="col-sm-2 price">
                    {this.props.price} kr
                </li>
                <li className="col-sm-4">
                    {this.props.added}
                </li>
            </ul>

        );
    }
}
