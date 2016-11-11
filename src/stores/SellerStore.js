import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class SellerStore extends EventEmitter{
  constructor(){
    super();
    this.seller = {}
  }

  getSeller(){
    return this.seller[0]
  }


  getSellerData(id){
    var url = "http://localhost:9001/api/user/" +  id;
    fetch(url).then(r => r.json())
    .then(data => {
      this.seller = data
      this.emit("new_data")
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

const sellerStore = new SellerStore();
dispatcher.register(sellerStore.handleActions.bind(sellerStore));
export default sellerStore;
