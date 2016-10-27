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
import Button from './Button';
import books from '../data/books';


export default class Content extends Component{

    /**
     * Sets the inital state of the search and search filter value. Binds the functions handleChange and setSearch to
     * this component.
     * @param props --> arbitrary attribute inputs.
     */
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.setSearch = this.setSearch.bind(this);
        this.state = { searchString: '', searchParameter: 'title' };
    }

    componentWillMount(){
      var url = "http://localhost:9001/api/books"
      fetch(url).then(r => r.json())
      .then(data => console.log(data))
      .catch(e => console.log("async function failed"))
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


    /**
     *
     * @param e
     */
    setSearch(e){
        this.setState({searchParameter:e.target.getAttribute('data-value')});
    }


    /**
     * @returns {XML}
     */
    render() {
        var searchString = this.state.searchString.trim().toLowerCase();
        var search_books = books;

        var searchParameter = this.state.searchParameter.trim().toLowerCase();

        if(searchString.length > 0){
            // We are searching. Filter the results.
            search_books = books.filter(function(l){
                return l[searchParameter].toLowerCase().match( searchString );
            });
        }

        return (
            <div className="bookTable">
                <div className="input-group search-div">
                <Button onChange={this.setSearch}/>
                <Search value={this.state.searchString} onChange={this.handleChange} />
                </div>
                <br/>
                <br/>
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
                        <tr key={"book"+ l.id}>
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
                <br/><br/>
                <br/>
            </div>

        );
    }
}
