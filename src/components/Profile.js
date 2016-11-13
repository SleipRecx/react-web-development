import React, {Component} from 'react';
import '../../public/styles/style.css';
import LoginStore from '../stores/LoginStore';
import ProfileStore from '../stores/ProfileStore';
import * as Actions from '../stores/Actions'

export default class Profile extends Component{

    constructor(props) {
        super(props);
        this.fetchToken = this.fetchToken.bind(this);
        this.visited = JSON.parse(localStorage.getItem("visited_books")) || [];
        this.state = {
          user: {},
          token: this.fetchToken()
        }
    }


    componentWillMount(){
      LoginStore.on("change", this.fetchToken);

    }

    componentWillUnmount(){
      LoginStore.removeListener("change", this.fetchToken);
    }


    async fetchToken(){
      var data= await LoginStore.decrypt(localStorage.getItem("token"))
       this.data=data;
        this.setState({
            token: data
        })
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
                                <p className="name">add user rating(Kanskje)</p>
                         </div>

                    </div>

                    <div className="col-md-3">
                    <ul className="list-group">
                      {this.visited.map((book_object) =>{
                        return(
                          <li key={book_object.id} className="list-group-item">{book_object.title}</li>
                      )
                      })}


                    </ul>
                    </div>

                </div>
            </div>
        )
    }
}
