/**
*ProfileStore is used to fetch data the user from DB
*Uses EventEmitter to notify changes in data
*Uses dispatcher to bind actions
 */
import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class ProfileStore extends EventEmitter{
  constructor(){
    super();
    this.user = {};
  }

//returns user
  getUser(){
    return this.user;
  }

  /**
   * fetches user date from db using the api
   */

  fecthUserFromDB(id){
    var url = "http://localhost:9001/api/user/" + id
    fetch(url).then(r => r.json())
    .then(data => {
      this.user = data[0];
      this.emit("change")
    })
    .catch(e => console.log("async function failed"))
  }

  /**
   *
   * @param action Listens for dispatched actions
   */

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
/**
 *
 * Registeres object to dispatcher and exports it
 */

const profileStore = new ProfileStore();
dispatcher.register(profileStore.handleActions.bind(profileStore));
export default profileStore
