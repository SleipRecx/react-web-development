import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class BookStore extends EventEmitter{
  constructor(){
    super();
    this.books = [];
    this.allBooks = [];
    this.fetchAllBooks();
  }

  getBooksWithLimit(){
    return this.books;
  }
  getAllBooks(){
    return this.allBooks;
  }

  //Get's books from the api 20 results at a time
  fetchBooksWithLimit(length,reset){
    var url = "http://it2810-07.idi.ntnu.no:9001/api/all/books/users/limit/" +length;
    fetch(url).then(r => r.json())
    .then(data => {
      this.handleFetchingBooksWithLimit(data,reset);
    })
    .catch(e => console.log(e))
  }

  // Get's all books from db using the api
  fetchAllBooks(){
    var url = "http://it2810-07.idi.ntnu.no:9001/api/all/books/users";
    fetch(url).then(r => r.json())
    .then(data => {
      this.handleFetchingAllBooks(data);
    })
    .catch(e => console.log(e))

  }

  // Handles data after fetching all books
  handleFetchingAllBooks(data){
    this.allBooks = []
    for(var i = 0; i <data.length; i++){
      var object = {
        id: data[i].book_id,
        email: data[i].email,
        image: data[i].image_link,
        price: data[i].price + " kr",
        user: data[i].first_name + " " + data[i].last_name,
        userId: data[i].user_id_foreign,
        added: data[i].date_added.split("T")[0],
        userRating: data[i].rating,
        state: data[i].state,
        title: data[i].title,
        author: data[i].author
      };
      this.allBooks.push(object)
    }
    this.emit("all_data");
  }

  // Handles data after fetching books with limit
  handleFetchingBooksWithLimit(data,reset){
    if(reset){
      this.books = []
    }
    if(data.length === 0){
      this.emit("no_books")
    }
    for(var i = 0; i <data.length; i++){
      var object = {
        id: data[i].book_id,
        email: data[i].email,
        image: data[i].image_link,
        price: data[i].price + " kr",
        user: data[i].first_name + " " + data[i].last_name,
        userId: data[i].user_id_foreign,
        added: data[i].date_added.split("T")[0],
        userRating: data[i].rating,
        state: data[i].state,
        title: data[i].title,
        author: data[i].author
      };
      this.books.push(object)
    }
    this.emit("change");
  }

  // Listens for dispatched actions
  handleActions(action){
    switch(action.type){
      case "NEW_BOOK_ADDED": {
          this.fetchBooksWithLimit(0,true);
          this.fetchAllBooks()
          break;
      }
      case "MORE_BOOKS": {
          this.fetchBooksWithLimit(action.data,false);
          break;
      }
      default: {
        break;
      }

    }
  }

}

 // Registeres object to dispatcher and exports it
const bookStore = new BookStore();
dispatcher.register(bookStore.handleActions.bind(bookStore));
export default bookStore;
