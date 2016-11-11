import { EventEmitter } from "events";
import loginStore from "./LoginStore"
import dispatcher from "../dispatcher";
var queryString = require('query-string');
import * as LoginActions from '../stores/LoginActions'

class MyBookStore extends EventEmitter{
  constructor(){
    super()
    this.books = [];
    this.getUserData().then(result =>{
      this.fetchBooks(result.id, false)
    });
  }

  getAllBooks(){
    return this.books;
  }

  getUserData(){
    return loginStore.decrypt(localStorage.getItem('token'))
  }

  fetchBooks(id, new_book){
    var url = "http://localhost:9001/api/all/books/user/" + id
    fetch(url).then(r => r.json())
    .then(data => {
      this.books = data;
      if(new_book){
        this.emit('new_book');
      }
      else{
          this.emit('data_loaded');
      }
    })
  }


async addNewBook(book_data){
    var id = undefined
    await this.getUserData().then(result =>{
      id = result.id
    });

    var payload = {
    "title": book_data.title,
    "author": book_data.author,
    "price": book_data.price,
    "state": book_data.state,
    "user_id_foreign": id};
    var data = queryString.stringify(payload)
      fetch("http://localhost:9001/api/book",
      {
          method: "POST",
          body: data,
          headers: {"Content-Type": "application/x-www-form-urlencoded"}
      })
      .then(r => r.json()).then(data => {
        this.fetchBooks(id, true);
        LoginActions.newBookAdded();
      })

  }


  handleActions(action){
    switch(action.type){
      case "ADD_BOOK": {
          this.addNewBook(action.data)
          break;
      }
      default: {
        break;
      }

    }
  }


}

const myBookStore = new MyBookStore();
dispatcher.register(myBookStore.handleActions.bind(myBookStore));
window.dispatcher = dispatcher;
export default myBookStore;
