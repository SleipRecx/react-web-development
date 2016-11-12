import React, { Component } from 'react';
import myBookStore from '../stores/MyBookStore';
import ResultObject from './ResultObjectMyBook';
import '../../public/styles/style.css';
import label_converter from '../data/label_converter';
import ReactDOM from 'react-dom';
import * as Actions from '../stores/Actions'
import { default as swal } from 'sweetalert2'
import "sweetalert2/dist/sweetalert2.min.css"

export default class MyBooks extends Component {
  constructor(props) {
      super(props);
      this.getBooksFromStore = this.getBooksFromStore.bind(this);
      this.getNewBookFromStore = this.getNewBookFromStore.bind(this);
      this.getBooksFromStoreAfterDelete = this.getBooksFromStoreAfterDelete.bind(this)
      this.state = {data: myBookStore.getAllBooks()};
      this.buttonPressed = this.buttonPressed.bind(this);
  }

  getBooksFromStoreAfterDelete(){
    this.setState({
      data: myBookStore.getAllBooks()
    });
    swal({
      title: 'Delete successful',
      type: 'success',
      timer: 1100,
      showConfirmButton: false
    }).catch(swal.noop);
  }

  getBooksFromStore(){
    this.setState({
      data: myBookStore.getAllBooks()
    });
  }

  getNewBookFromStore(){
    this.setState({
      data: myBookStore.getAllBooks()
    })
    this.clearForm();
    swal({
      title: 'Book was successfully added',
      type: 'success',
      timer: 1100,
      showConfirmButton: false
    }).catch(swal.noop);
  }

  componentWillMount(){
    myBookStore.on("data_loaded", this.getBooksFromStore);
    myBookStore.on("new_book", this.getNewBookFromStore);
    myBookStore.on("delete_book", this.getBooksFromStoreAfterDelete);
  }

  componentWillUnmount(){
    myBookStore.removeListener("data_loaded", this.getBooksFromStore);
    myBookStore.removeListener("new_book", this.getNewBookFromStore);
    myBookStore.removeListener("delete_book", this.getBooksFromStoreAfterDelete);
  }

clearForm(){
  ReactDOM.findDOMNode(this.refs.price).value = ""
  ReactDOM.findDOMNode(this.refs.title).value = ""
  ReactDOM.findDOMNode(this.refs.author).value = ""
}

buttonPressed(e) {
    e.preventDefault();
    var form = e.target
    var object = {}
    object.price = ReactDOM.findDOMNode(this.refs.price).value
    object.state = form.elements.optradio.value
    object.title =  ReactDOM.findDOMNode(this.refs.title).value
    object.author = ReactDOM.findDOMNode(this.refs.author).value
    Actions.addBook(object);

}

  render() {
      return (
        <div>
          <br/>
          <center><h3>Add New Book</h3></center>

          <div className="input-wrapper">
          <form onSubmit={this.buttonPressed}>

            <div className="input-group">
            <span className="input-group-addon" id="basic-addon3">Title</span>
            <input type="text" className="form-control" ref="title" id="basic-url" aria-describedby="basic-addon3" required/>
          </div>

          <div className="input-group">
          <span className="input-group-addon" name="author" id="basic-addon3">Author</span>
          <input type="text" className="form-control" ref="author" id="basic-url" aria-describedby="basic-addon3" required/>
          </div>

          <div className="input-group">
            <span className="input-group-addon">kr</span>
            <input className="form-control" ref="price" type="number" placeholder="Price" id="example-number-input" required/>
          </div>

          <div className="input-group">
          <div className="radio-inline">
            <label><input type="radio" name="optradio" value="New" /><span className={"label label-" + label_converter("New")} >New</span></label>
          </div>
          <div className="radio-inline">
            <label><input type="radio" name="optradio" value="As New" /><span className={"label label-" + label_converter("As New")} >As New</span></label>
          </div>
          <div className="radio-inline">
            <label><input type="radio" name="optradio" value="Normal Use" /><span className={"label label-" + label_converter("Normal Use")} >Normal Use</span></label>
          </div>
          <div className="radio-inline">
            <label><input type="radio"  name="optradio" value="Readable" /><span className={"label label-" + label_converter("Readable")} >Readable</span></label>
          </div>

          </div>

          <center>
          <div className="input-group">
            <input type="submit" className="btn btn-info" value="Submit Book"/>
          </div>
          </center>
          </form>

        </div>
              <br/>
              <center><h3>Your Books</h3></center>

                  <div className="result-table container">
                      <div >
                          <ul className="list-inline row result-object result-object-header color">
                              <li className="col-sm-3">
                                  Title
                              </li>
                              <li className="col-sm-2">
                                  Author
                              </li>
                              <li className="col-sm-2 price">
                                  Condition
                              </li>
                              <li className="col-sm-2 price">
                                  Price
                              </li>
                              <li className="col-sm-2">
                                  Added
                              </li>
                              <li className="col-sm-1 price">
                                Remove
                              </li>
                          </ul>
                          {this.state.data.map(function(l){ return (
                              <ResultObject key={l.book_id} title={l.title} author={l.author} state={l.state} price={l.price} id={l.book_id} added={l.date_added.split("T")[0]} />
                          )})}
                      </div>
                  </div>
              <br/>
              <br/>
              <br/>
          </div>
      );
  }
}
