import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class ProfileStore extends EventEmitter{
  constructor(){
    super();
    this.user = {};
  }

  getUser(){
    return this.user;
  }


  fecthUserFromDB(id){
    var url = "http://localhost:9001/api/user/" + id
    fetch(url).then(r => r.json())
    .then(data => {
      this.user = data[0];
      this.emit("change")
    })
    .catch(e => console.log("async function failed"))
  }


  handleActions(action){
    switch(action.type){
      case "GET_USER": {
          this.fecthUserFromDB(action.id);
          break;
      }
      default: {
        break;
      }

    }
  }



}

const profileStore = new ProfileStore();
dispatcher.register(profileStore.handleActions.bind(profileStore));
export default profileStore
