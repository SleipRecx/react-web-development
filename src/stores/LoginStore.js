import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
var jwt = require('json-web-token');
let secret = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"

class LoginStore extends EventEmitter{

 loginCheck(){
    return new Promise(async function(resolve, reject) {
      var token = localStorage.getItem("token");
      jwt.decode(secret, token, function (err, decode) {
        if(err){
          return resolve(false)
        }
        if(decode.loggedIn==="true"){
            resolve(true);
        }
        resolve(false)
      });
    });
  }


  encrypt(payload){
    return new Promise(function(resolve, reject) {
        jwt.encode(secret, payload, function (err, token) {
          if(err){
            return reject(err)
          }
          localStorage.setItem("token", token)
          resolve(token)
        });
      });
    }

  decrypt(token){
    return new Promise(function(resolve, reject) {
        jwt.decode(secret, token, function (err, decode) {
          if(err){
            return reject(err)
          }
          resolve(decode);
        });
      });
    }


  async handleActions(action){
    switch(action.type){
      case "NEW_USER": {
        break;
      }
      case "LOGIN": {
          this.encrypt(action.token);
          break;
      }
      case "LOGOUT": {
          localStorage.clear();
          break;
      }

      default: {
        break;
      }

    }
  }

}

const loginStore = new LoginStore();
dispatcher.register(loginStore.handleActions.bind(loginStore));
window.dispatcher = dispatcher;
export default loginStore;
