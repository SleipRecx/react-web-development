/**
 * Created by Kameisler on 25.10.2016.
 */
import React, {Component} from 'react';
import '../../public/styles/style.css';

export default class Profile extends Component{

    render(){
        const name="Ken Are";
        const rating="5 star";
        const auctions="All auctions";
        const imgUrl="http://cdn-d4d.kxcdn.com/wp-content/uploads/2015/02/4.jpg";

        return (
            <div>
                <img src={imgUrl} alt="NO image"/>
                <p>Name: {name}</p>
                <p>Rating : {rating}</p>
                <p>{auctions}</p>

</div>
        )
    }
}