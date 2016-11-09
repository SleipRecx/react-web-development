import { EventEmitter } from "events";
import loginStore from "./LoginStore"

class MyBookStore extends EventEmitter{
  constructor(){
    super()
    this.books = [];
    this.getUserData().then(result =>{
      this.fetchBooks(result.id)
    });
  }

  getAllBooks(){
    return this.books;
  }

  getUserData(){
    return loginStore.decrypt(localStorage.getItem('token'))
  }

  fetchBooks(id){
    var url = "http://localhost:9001/api/books/user/" + id
    fetch(url).then(r => r.json())
    .then(data => {
      this.books = data;
      this.emit('change');
    })
  }

}

const myBookStore = new MyBookStore();
export default myBookStore;
