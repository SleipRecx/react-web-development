/**
 * Component for displaying the seller page.
 *
 * Imports sellerStore in order to retrieve data about sellers.
 */
import React, {Component} from 'react';
import Rater from 'react-rater'
import '../../public/styles/style.css';
import sellerStore from '../stores/SellerStore';
import ResultObjectSeller from './ResultObjectSeller';
import ProfileImage from './ProfileImage';

export default class Seller extends Component {

    /**
     * Saves user data and books related to the user in the state of the component in order to access it later.
     * @param props
     */
    constructor(props) {
        super(props);
        this.handleData = this.handleData.bind(this);
        this.handleBooks = this.handleBooks.bind(this);
        this.state = {
            user: {},
            books: []
        }
    }

    /**
     * Sets state.user to the data retrieved from the database
     */
    handleData() {
        this.setState({
            user: sellerStore.getSeller()
        });

        console.log(this.state.user)
    }

    /**
     * Sets state.books to the list of books retrieved from the database
     */
    handleBooks() {
        this.setState({
            books: sellerStore.getBooks()
        });
        console.log(this.state.books)
    }

    /**
     * When component mounts: try to get data about the user and the books related to the user based on
     * user id sent in as prop.
     *
     * Then listen to response from api and update data with handleData/handleBooks.
     */
    componentWillMount() {
        sellerStore.getSellerData(this.props.params.id);
        sellerStore.on("new_data", this.handleData);
        sellerStore.fetchBooks(this.props.params.id);
        sellerStore.on("new_books", this.handleBooks);
    }

    /**
     * Stops listening to data changes on unmount
     */
    componentWillUnmount() {
        sellerStore.removeListener("new_data", this.handleData);
        sellerStore.removeListener("new_books", this.handleBooks);
    }


    /**
     *
     * @returns {XML}
     */
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
                                <button type="submit" className="btn btn-primary" >Contact seller <i className="glyphicon glyphicon-envelope"></i></button>
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
                                    <li className="col-sm-2 price">
                                        <div>
                                            Condition
                                        </div>
                                    </li>
                                    <li className="col-sm-2 price">
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
