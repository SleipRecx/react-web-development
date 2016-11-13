import React, {Component} from 'react';
import '../../public/styles/style.css';
import LoginStore from '../stores/LoginStore';
import ProfileStore from '../stores/ProfileStore';
import * as Actions from '../stores/Actions'
import Rater from 'react-rater'

export default class Profile extends Component{

    constructor(props) {
        super(props);
        this.fetchToken = this.fetchToken.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
        this.visited =
        this.state = {
          visited: JSON.parse(localStorage.getItem("visited_books")) || [],
          token: {},
          user: {}
        }

    }


    componentWillMount(){
      this.setState({
        visited: this.state.visited.reverse()
      })
      LoginStore.on("token_decrypted", this.fetchToken);
      ProfileStore.on("change", this.fetchUser);
      Actions.getSessionInformation()

    }

    componentWillUnmount(){
      LoginStore.removeListener("token_decrypted", this.fetchToken);
      ProfileStore.removeListener("change", this.fetchUser);
    }


    fetchToken(){
      this.setState({
        token: LoginStore.getToken()
      })
      Actions.getUserInformation(this.state.token.id)

    }

    fetchUser(){
      this.setState({
        user: ProfileStore.getUser()
      })

      console.log(this.state.user)
    }

    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                         <div className="col-md-3">
                                <img className="img-circle profile-image" src={this.state.token.image} alt="user"/>
                         </div>
                         <div className="col-md-7">
                             <p className="name">{this.state.token.first_name} {this.state.token.last_name}</p>
                              <p className="email">{this.state.token.email}</p>
                              <h2><Rater interactive={false} rating={this.state.user.rating}/></h2>
                              <ul className="list-group">
                              <li className="list-group-item"><b>Recently Viewed Books</b></li>
                                {this.state.visited.map((book_object) =>{
                                  return(
                                    <li key={book_object.id} className="list-group-item">{book_object.title}</li>
                                )
                                })}


                              </ul>
                         </div>

                    </div>





                </div>
            </div>
        )
    }
}
