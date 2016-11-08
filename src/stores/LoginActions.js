import dispatcher from '../dispatcher'

/*export function newUser(user){
  dispatcher.dispatch({
      type: "NEW_USER",
      user
  });
}*/

export function login(user){
  console.log(user.picture.data.url)
  var token = {"loggedIn":"true", "id": user.id, "image": user.picture.data.url}
  dispatcher.dispatch({
      type: "LOGIN",
      token
  });
}

export function logout(){
  dispatcher.dispatch({
      type: "LOGOUT"
  });
}
