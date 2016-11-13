
import React, {Component} from 'react';
import '../../public/styles/style.css';

export default class ProfileImage extends Component{
    render(){
        return (
            <div className="row image-container">
                <img src={this.props.imageLink} alt="user"/>
            </div>
        )
    }
}