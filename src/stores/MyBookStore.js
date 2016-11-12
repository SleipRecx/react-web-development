import { EventEmitter } from "events";
import loginStore from "./LoginStore"
import dispatcher from "../dispatcher";
var queryString = require('query-string');
import * as Actions from '../stores/Actions'

class MyBookStore extends EventEmitter{
  constructor(){
    super()
    this.books = [];
    this.getUserData().then(result =>{
      this.fetchBooks(result.id, "data_loaded")
    });
  }

  getAllBooks(){
    return this.books;
  }

  getUserData(){
    return loginStore.decrypt(localStorage.getItem('token'))
  }

  fetchBooks(id, action){
    var url = "http://localhost:9001/api/all/books/user/" + id
    fetch(url).then(r => r.json())
    .then(data => {
      this.books = data;
      this.emit(action)
    })
    return true
  }


async deleteBook(id){
  fetch("http://localhost:9001/api/book/" + id,{
      method: "DELETE"
  })
  .then(r => r.json()).then(data => {
      this.getUserData().then(result =>{
      this.fetchBooks(result.id, "delete_book");
      Actions.newBookAdded();
    });
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
        this.fetchBooks(id, "new_book");
        Actions.newBookAdded();
      })

  }


  handleActions(action){
    switch(action.type){
      case "ADD_BOOK": {
          this.addNewBook(action.data)
          break;
      }
      case "DELETE_BOOK": {
          this.deleteBook(action.id);
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
