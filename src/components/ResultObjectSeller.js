/**
 * Component for displaying books at the "Seller" page.
 *
 * Differs from the other ResultObject component as it displays only information relevant for the seller page.
 *
 * label_converter is imported and used to get the correct label based on the condition sent in as prop.
 */
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
