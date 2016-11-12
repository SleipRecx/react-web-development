import React, {Component} from 'react';
import '../../public/styles/style.css';
import label_converter from '../data/label_converter';
import * as Actions from '../stores/Actions';
import { default as swal } from 'sweetalert2'
import "sweetalert2/dist/sweetalert2.min.css"

export default class ResultObjectMyBook extends Component {

  test(){
    var id = this.props.id
    swal({
    title: 'Are you sure?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF9800',
    cancelButtonColor: '#03A9F4',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then(function () {
    Actions.deleteBook(id)
  })

  }

    render() {
        return (
                <ul className="list-inline row result-object">
                    <li className="col-sm-3">
                        {this.props.title}
                    </li>
                    <li className="col-sm-2">
                        {this.props.author}
                    </li>
                    <li className="col-sm-2 price">
                        <span className={"label label-" + label_converter(this.props.state)} >{this.props.state}</span>
                    </li>
                    <li className="col-sm-2 price">
                        {this.props.price}
                    </li>
                    <li className="col-sm-2">
                        {this.props.added}
                    </li>
                    <li className="col-sm-1 price">
                      <span  onClick={this.test.bind(this)}className="glyphicon glyphicon-remove"></span>
                    </li>
                </ul>

        );
    }
}
