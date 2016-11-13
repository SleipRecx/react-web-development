// This files exports all available dispatch actions
import dispatcher from '../dispatcher'

export function login(user){
  var token = {
    "loggedIn":"true",
    "face_id": user.id,
    "first_name": user.name.split(" ")[0],
    "last_name": user.name.split(" ")[1],
    "image": user.picture.data.url,
    "email":user.email}
  dispatcher.dispatch({
      type: "LOGIN",
      token
  });
}

export function loadMoreBooks(data){
  dispatcher.dispatch({
      type: "MORE_BOOKS",
      data
  });
}

export function logout(){
  dispatcher.dispatch({
      type: "LOGOUT"
  });
}
export function deleteBook(id){
  dispatcher.dispatch({
      type: "DELETE_BOOK",
      id
  });
}

export function addBook(data){
  dispatcher.dispatch({
      type: "ADD_BOOK",
      data
  });
}

export function newBookAdded(){
  dispatcher.dispatch({
      type: "NEW_BOOK_ADDED"
  });
}

export function getSessionInformation(){
  dispatcher.dispatch({
      type: "GET_SESSION"
  });
}

export function getUserInformation(id){
  dispatcher.dispatch({
      type: "GET_USER",
      id
  });
}
