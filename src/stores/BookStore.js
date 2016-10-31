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
    super()
    this.books = [];
    var url = "http://localhost:9001/api/books_users"
    fetch(url).then(r => r.json())
    .then(data => {
      this.handleData(data);
    })
    .catch(e => console.log("async function failed"))

  }

  getAll(){
    return this.books;
  }

  handleData(data){
    for(var i = 0; i <data.length; i++){
      var object = {
        id: i,
        image: data[i].image_link,
        price: data[i].price + " kr",
        user: data[i].first_name + " " + data[i].last_name,
        added: data[i].date_added.split("T")[0],
        userRating: data[i].rating,
        state: data[i].state,
        title: data[i].title
      };
      this.books.push(object)
    }
    this.books.sort(dynamicSort("title"));
    this.emit("change");
  }

    handleActions(action){
      console.log("recived action");
    }

}

const bookStore = new BookStore();
dispatcher.register(bookStore.handleActions.bind(bookStore));
window.dispatcher = dispatcher;
export default bookStore;
