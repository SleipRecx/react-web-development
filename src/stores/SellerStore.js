import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class SellerStore extends EventEmitter{

  /**
   * Initializes the seller and books objects.
   */
  constructor(){
    super();
    this.seller = {};
    this.books = [];
  }
  
  getSeller(){
    return this.seller[0]
  }

  getBooks(){
    return this.books;
  }

  /**
   * Fetches data about a user based on the user's id
   * @param id
     */
  getSellerData(id){
    var url = "http://localhost:9001/api/user/" +  id;
    fetch(url).then(r => r.json())
    .then(data => {
      this.seller = data
      this.emit("new_data")
    })
    .catch(e => console.log(e))
  }

  /**
   * Fetches data about the books sold by a specific user, by id.
   * @param id
     */
  fetchBooks(id){
    var url = "http://localhost:9001/api/books/user/" + id;
    fetch(url).then(r => r.json())
    .then(data => {
      this.books = data;
      this.emit("new_books")
    })
    .catch(e => console.log(e))
  }


  handleActions(action){
    switch(action.type){

      default: {
        break;
      }

    }
  }



}
 // Registers object to dispatcher and exports it
const sellerStore = new SellerStore();
dispatcher.register(sellerStore.handleActions.bind(sellerStore));
export default sellerStore;
