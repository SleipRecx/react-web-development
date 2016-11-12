import React, {Component} from 'react';
import '../../public/styles/style.css';
import {Link} from 'react-router';

export default class ResultObjectDetails extends Component {

    render() {
        return (
            <div className="result-object-details">
                <row>
                    <div className="col-xs-4">
                        <div className="placeholder-image">

                        </div>
                    </div>
                    <div className="col-xs-8">
                        <h3>Title: {this.props.title}</h3>
                        <p><b>Description:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Pellentesque a finibus leo, sit amet interdum massa. Vestibulum convallis
                            sapien nec odio placerat, nec condimentum neque volutpat. Duis porttitor
                            commodo augue a euismod. Maecenas non placerat sem. Suspendisse sollicitudin
                            ex ut molestie tempor. Cras in porta metus. Maecenas dapibus dapibus diam a venenatis.
                            Cras et metus a metus dictum blandit. Aliquam erat volutpat. Vestibulum purus erat, cursus
                            in justo a, sodales gravida nisl. Fusce gravida urna neque, ut facilisis dolor facilisis eu.</p>
                        <p><b>Author:</b> {this.props.author}</p>
                        <p><b>Seller:</b>  <Link to={"/seller/" + this.props.id}>{this.props.user}</Link>
                            <form className="pull-right" action="mailto:seller@bookshelf.com">
                                <button type="submit" className="btn btn-primary" >Contact seller <i className="glyphicon glyphicon-envelope"></i></button>
                            </form>
                        </p>
                    </div>
                    <div className="clearfix"></div>
                </row>
            </div>
        );
    }
}
