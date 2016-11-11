import React, {Component} from 'react';
import '../../public/styles/style.css';
import sellerStore from '../stores/SellerStore';
export default class Seller extends Component{

    constructor(props) {
        super(props);
        this.handleData = this.handleData.bind(this);
        this.state = {
          user: {}
        }
    }

    handleData(){
      this.setState({
        user: sellerStore.getSeller()
      });
      console.log(this.state.user)
    }


    componentWillMount(){
      sellerStore.getSellerData(this.props.params.id)
      sellerStore.on("new_data", this.handleData);
    }

    componentWillUnmount(){
      sellerStore.removeListener("new_data", this.handleData);
    }


    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                         <div className="col-md-3">
                                <img className="img-circle profile-image" src={this.state.user.image_link} alt="user"/>
                         </div>
                         <div className="col-md-7">
                             <p className="name">{this.state.user.first_name} {this.state.user.last_name}</p>


                         </div>
                         <div className="col-md-7">
                             <h4>User ID: {this.state.user.user_id}</h4>
                         </div>
                         <div className="col-md-7">
                             <h4>Rating: {this.state.user.rating}</h4>
                         </div>

                    </div>

                </div>
            </div>
        )
    }
}
