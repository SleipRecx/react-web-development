/**
 * Component displaying the metadata of the book list.
 *
 * Takes in title, condition(state), price, user, profile image, user rating and added date as props.
 *
 */
import React, {Component} from 'react';
import Rater from 'react-rater'
import '../../public/styles/style.css';
import label_converter from '../data/label_converter';

export default class ResultObject extends Component {

    render() {

        return (
                <ul className="list-inline row result-object">
                    <li className="col-sm-3">
                        {this.props.title}
                    </li>
                    <li className="col-sm-2 price">
                        <span className={"label label-" + label_converter(this.props.state)} >{this.props.state}</span>
                    </li>
                    <li className="col-sm-1 price">
                        {this.props.price}
                    </li>
                    <li className="col-sm-3">
                        <span>
                            <img src={this.props.image} className="img-circle" alt={"profile picture of " + this.props.user}
                                 width="20" height="20"/>{"     " + this.props.user}
                        </span>
                    </li>
                    <li className="col-sm-2 price">
                        <Rater interactive={false} rating={this.props.userRating}/>
                    </li>
                    <li className="col-sm-2">
                        {this.props.added}
                    </li>
                </ul>

        );
    }
}
