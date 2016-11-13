import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class ProfileStore extends EventEmitter{
  constructor(){
    super();
  }


  handleActions(action){
    switch(action.type){
      default: {
        break;
      }

    }
  }



}

const profileStore = new ProfileStore();
dispatcher.register(profileStore.handleActions.bind(profileStore));
export default profileStore
