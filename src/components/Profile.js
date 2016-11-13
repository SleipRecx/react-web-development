import React, {Component} from 'react';
import '../../public/styles/style.css';
import LoginStore from '../stores/LoginStore';
import ProfileStore from '../stores/ProfileStore';
import ResultObject from './ResultObject';
import ResultObjectDetails from './ResultObjectDetails';
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
                             <h2><Rater interactive={false} rating={this.state.user.rating}/></h2>
                              <p className="email"><a href={"mailto:"+ this.state.token.email}>{this.state.token.email}</a></p>


                         </div>

                    </div>





                </div>
                <div className="result-table container">
                    <h4 className="booksViewed">Recently Viewed Books</h4>
                    <div className="row" >
                        <ul className="list-inline  result-object result-object-header color">
                            <li className="col-sm-3 ">
                                Title

                            </li>
                            <li className="col-sm-2">
                                Condition

                            </li>
                            <li className="col-sm-1" >
                                Price

                            </li>
                            <li className="col-sm-3">
                                Seller

                            </li>
                            <li className="col-sm-2">
                                Rating

                            </li>
                            <li className="col-sm-2">
                                Added

                            </li>

                        </ul>
                    </div>
                        {this.state.visited.map(function(l){ return (
                            <div key={l.id} className="row result-table-row" >
                                <div>
                            <div data-toggle="collapse"  href={"#collapseNr" + l.id} data-parent="#Profile">
                            <ResultObject   title={l.title} state={l.state} price={l.price} user={l.user}
                                          userRating={l.userRating} added={l.added} image={l.image} />
                            </div>
                                <div id={"collapseNr" + l.id } className="collapse">
                                    <ResultObjectDetails email={l.email} id={l.userId} title={l.title} author={l.author} user={l.user}/>
                                </div>
                                </div>
                            </div>
                        )})}

                </div>
            </div>
        )
    }
}
