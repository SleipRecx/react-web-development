import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

class BookStore extends EventEmitter{
  constructor(){
    super();
    this.books = [];
  }


  fetchAllBooks(length){
    var url = "http://localhost:9001/api/books_users/" +length;
    fetch(url).then(r => r.json())
    .then(data => {
      this.handleData(data);
    })
    .catch(e => console.log(e))

  }

  getAll(){
    return this.books;
  }

  handleData(data){
    if(data.length == 0){
      this.emit("no_books")
    }
    for(var i = 0; i <data.length; i++){
      var object = {
        id: data[i].book_id,
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
    this.books.sort(dynamicSort("title"));
    this.emit("change");
  }

  handleActions(action){
    switch(action.type){
      case "NEW_BOOK_ADDED": {
          this.fetchAllBooks(0);
          break;
      }
      case "MORE_BOOKS": {
          this.fetchAllBooks(action.data);
          break;
      }
      default: {
        break;
      }

    }
  }



}

const bookStore = new BookStore();
dispatcher.register(bookStore.handleActions.bind(bookStore));
export default bookStore;
