/**
 * Created by Kameisler on 25.10.2016.
 */
import React, {Component} from 'react';
import '../../public/styles/style.css';

export default class Profile extends Component{

    render(){
        const name="Ken Are"
        const rating="5 star"
        const auctions="All auctions"
        return (
            <div>

            <p>Name: {name}</p>
             <p>Rating : {rating}</p>
             <p>{auctions}</p>
</div>
        )
    }
}