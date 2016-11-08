/**
 * Component displaying the searchbar and a table for the results of search.
 *
 * Imports Rater from react-rater, a react component used for rating.
 *
 * Imports label_converter as a function to be used to determine the class (color) of the book tags.
 *
 * Imports search and button to be used to filter results.
 *
 * Imports books, which contains all of our dummy data.
 */
import React, { Component} from 'react';
import Rater from 'react-rater'
import '../../public/styles/style.css';
import label_converter from '../data/label_converter';
import Search from './Search';
import ResultObject from './ResultObject';
import bookStore from "../stores/BookStore"



export default class Content extends Component{

    /**
     * Sets the inital state of the search and search filter value. Binds the function handleChange to
     * this component.
     * @param props --> arbitrary attribute inputs.
     */
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          searchString: '',
          data: bookStore.getAll(),
          filter:this.props.items};
    }

    componentWillMount(){
      bookStore.on("change", () =>{
        this.setState({
          data: bookStore.getAll()
        })
      });
      /*var url = "http://localhost:9001/api/books"
      fetch(url).then(r => r.json())
      .then(data => console.log(data))
      .catch(e => console.log("async function failed"))*/
    }

    /**
     *
     * @param e
     */
    handleChange(e){
        // If you comment out this line, the text box will not change its value.
        // This is because in React, an input cannot change independently of the value
        // that was assigned to it. In our case this is this.state.searchString.
        this.setState({searchString:e.target.value});
    }

    doSomething(){

        let myList = this.state.data;

        myList.push({
            id: 1000,
            title: "asd",
            state: "mystate",
            price: "myprice",
            img: "sadsad",
            added: "added nowo",
            userRating: "123213"
        });

        this.setState({
            data: myList
        });
    }

    /**
     * @returns {XML}
     */
    render() {
        var searchString = this.state.searchString.trim().toLowerCase();
        var search_books = this.state.data;
        var state_filter = this.props.items.state;
        var rating_filter = this.props.items.rating;

        // Filters books by state_filter.
        // TODO: Should this be optimized some way perhaps?
        if (state_filter.length > 0){
            search_books = search_books.filter(function(l){
                return state_filter.includes(l.state);
            });
        }

        // Filters books by rating_filter.
        // TODO: Should this be optimized some way perhaps?
        if (rating_filter.length > 0){
            search_books = search_books.filter(function(l){
                return rating_filter.includes(l.userRating.toString());
            });
        }


        if(searchString.length > 0){
            // We are searching. Filter the results.
            search_books = search_books.filter(function(l){
                return l.title.toLowerCase().match( searchString ) || l.user.toLowerCase().match( searchString );
            });
        }

        return (
            <div className="result-table">
                <div className="row">
                    <div className="col-xs-8 col-xs-offset-2 search-bar-container">
                        <Search className="search-bar" value={this.state.searchString} onChange={this.handleChange} />
                        <br></br>
                    </div>
                </div>
                <button type="button" className="btn btn-default" onClick={this.doSomething.bind(this)}>Click me</button>
                <ul className="list-inline row result-object">
                    <li className="col-sm-3">
                        Title
                    </li>
                    <li className="col-sm-2">
                        State
                    </li>
                    <li className="col-sm-1 price">
                        Price
                    </li>
                    <li className="col-sm-3">
                        User
                    </li>
                    <li className="col-sm-1">
                        User Rating
                    </li>
                    <li className="col-sm-2">
                        Added
                    </li>
                </ul>
                {search_books.map(function(l){ return (
                    <ResultObject title={l.title} state={l.state} price={l.price} user={l.user}
                                  userRating={l.userRating} added={l.added} image={l.image}/>
                    )
                })}

                <div className="row">
                    <div className="col-xs-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>State</th>
                                <th>Price</th>
                                <th>User</th>
                                <th>User Rating</th>
                                <th>Added</th>
                            </tr>
                            </thead>

                            <tbody>
                            {search_books.map(function(l){ return (
                                <tr key={l.id}>
                                    <td>{l.title}</td>
                                    <td><span className={"label label-" + label_converter(l.state)} >{l.state}</span></td>
                                    <td>{l.price}</td>
                                    <td><img src={l.image} className="img-circle" alt="Cinque Terre" width="20" height="20"/>{"     " + l.user}</td>
                                    <td><Rater interactive={true} rating={l.userRating} /></td>
                                    <td>{l.added}</td>
                                </tr>)
                            })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}
