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

export function logout(){
  dispatcher.dispatch({
      type: "LOGOUT"
  });
}
