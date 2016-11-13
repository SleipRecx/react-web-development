import React, {Component} from 'react';
import '../../public/styles/style.css';
import {Link} from 'react-router';
var faker = require('faker');

export default class ResultObjectDetails extends Component {

    render() {
        return (
            <div className="result-object-details">
                <row>
                    <div className="col-xs-3">
                        <div className="placeholder-image">
                        <span className="glyphicon glyphicon-book"></span>
                        </div>
                    </div>
                    <div className="col-xs-8">
                        <h3>Title: {this.props.title}</h3>
                        <p><b>Description:</b>{" " +faker.lorem.sentences()}</p>
                        <p><b>Author:</b> {this.props.author}</p>
                        <p className="inline"><b>Seller:</b>  <Link to={"/seller/" + this.props.id}>{this.props.user}</Link>  </p>
                            <form className="pull-right" action={"mailto:"+this.props.email}>
                                <button type="submit" className="btn btn-primary" >Contact seller <i className="glyphicon glyphicon-envelope"></i></button>
                            </form>

                    </div>
                    <div className="clearfix"></div>
                </row>
            </div>
        );
    }
}
