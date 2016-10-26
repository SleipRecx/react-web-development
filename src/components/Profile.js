/**
 * Created by Kameisler on 25.10.2016.
 */
import React, {Component} from 'react';
import '../../public/styles/style.css';
import ResultTable from './ResultTable.js';

export default class Profile extends Component{

    render(){
        const name="Ken Are Meisler";
        const rating="5 stars ";
        const rating1="5 stars this is best seller ever ";
        const rating2="5 stars So much books all words";
        const rating3="5 stars  I beliv this seller is number one";
        const auctions="All auctions";
        const imgUrl="http://cdn-d4d.kxcdn.com/wp-content/uploads/2015/02/4.jpg";

        return (
            <div>
                <div className="container">
                    <div className="row">
                         <div className="col-md-3">
                                <img className="img-responsive" src={imgUrl} alt="NO image"/>
                         </div>
                         <div className="col-md-7">
                                <p className="name">{name}</p>

                             <p>{rating}</p>
                             <p>{rating1}</p>
                             <p>{rating2}</p>
                             <p>{rating3}</p>


                         </div>

                    </div>
                    <div className="row" >
                        < ResultTable/>
                    </div>
                </div>
            </div>
        )
    }
}