import React, {Component} from 'react';
import '../../public/styles/style.css';
import LoginStore from '../stores/LoginStore';

export default class Profile extends Component{

    constructor(props) {
        super(props);
        this.data = {};

    }

    componentDidMount(){
        this.getData();
        LoginStore.on("change", () =>{
            this.getData()
        });

    }

    async getData(){
        var data= await LoginStore.decrypt(localStorage.getItem("token"))
       this.data=data;
        this.setState({
            data:data
        })
    }

    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                         <div className="col-md-3">
                                <img className="img-circle" src={this.data.image} alt="user"/>
                         </div>
                         <div className="col-md-7">
                             <p className="name">{this.data.first_name} {this.data.last_name}</p>
                              <p className="email">{this.data.email}</p>
                                <p className="name">add user rating(Kanskje)</p>
                         </div>

                    </div>

                </div>
            </div>
        )
    }
}
