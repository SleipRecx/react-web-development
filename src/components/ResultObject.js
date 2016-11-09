
import React, {Component} from 'react';
import Rater from 'react-rater'
import '../../public/styles/style.css';
import label_converter from '../data/label_converter';

export default class ResultObject extends Component {

    render() {
        return (
            <div>
                {this.props.listData.map(function(l){ return (
                <ul className="list-inline row result-object">
                    <li className="col-sm-3">
                        {l.title}
                    </li>
                    <li className="col-sm-2">
                        <span className={"label label-" + label_converter(l.state)} >{l.state}</span>
                    </li>
                    <li className="col-sm-1 price">
                        {l.price}
                    </li>
                    <li className="col-sm-3">
                        <span>
                            <img src={l.image} className="img-circle" alt={"Profile pciture of " + l.user}
                                 width="20" height="20"/>{"     " + l.user}
                        </span>
                    </li>
                    <li className="col-sm-1">
                        <Rater interactive={true} rating={l.userRating}/>
                    </li>
                    <li className="col-sm-2">
                        {l.added}
                    </li>
                </ul>
                )
                })}
            </div>
        
        );
    }
}
