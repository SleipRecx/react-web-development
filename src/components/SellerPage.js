import React, {Component} from 'react';
import Rater from 'react-rater'
import '../../public/styles/style.css';
import sellerStore from '../stores/SellerStore';
import ResultObjectSeller from './ResultObjectSeller';
import ProfileImage from './ProfileImage';

export default class Seller extends Component {

    constructor(props) {
        super(props);
        this.handleData = this.handleData.bind(this);
        this.handleBooks = this.handleBooks.bind(this);
        this.state = {
            user: {},
            books: []
        }
    }

    handleData() {
        this.setState({
            user: sellerStore.getSeller()
        });

        console.log(this.state.user)
    }

    handleBooks() {
        this.setState({
            books: sellerStore.getBooks()
        });
        console.log(this.state.books)
    }


    componentWillMount() {
        sellerStore.getSellerData(this.props.params.id);
        sellerStore.on("new_data", this.handleData);
        sellerStore.fetchBooks(this.props.params.id);
        sellerStore.on("new_books", this.handleBooks);
    }

    componentWillUnmount() {
        sellerStore.removeListener("new_data", this.handleData);
        sellerStore.removeListener("new_books", this.handleBooks);
    }



    render() {

        let books = this.state.books;

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-4 user-information text-center">
                            <ProfileImage imageLink={this.state.user.image_link}/>
                            <h2>{this.state.user.first_name + " " + this.state.user.last_name}</h2>
                            <Rater ref="halla" interactive={true} rating={this.state.user.rating}/>
                            <form action={"mailto:"+this.state.user.email}>
                                <button type="submit" className="btn btn-default" >Contact seller <i className="glyphicon glyphicon-envelope"></i></button>
                            </form>
                        </div>
                        <div className="col-xs-8 seller-books">
                            <h3>Books for sale:</h3>
                            <div className="row">
                                <ul className="list-inline row result-object header">
                                    <li className="col-sm-4">
                                        <div>
                                            Title
                                        </div>
                                    </li>
                                    <li className="col-sm-2">
                                        <div>
                                            Condition
                                        </div>
                                    </li>
                                    <li className="col-sm-2">
                                        <div>
                                            Price
                                        </div>
                                    </li>
                                    <li className="col-sm-4" >
                                        <div>
                                            Added
                                        </div>
                                    </li>
                                </ul>

                            </div>
                            <div className="row book-list">
                                {books.map((l) =>{ return (
                                    <div key={l.book_id}>
                                        <ResultObjectSeller title={l.title} state={l.state} price={l.price}
                                                            added={l.date_added.split("T")[0]}/>
                                    </div>
                                )})}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
