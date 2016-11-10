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
import '../../public/styles/style.css';
import Search from './Search';
import ResultObject from './ResultObject';
import ResultObjectDetails from './ResultObjectDetails';
import bookStore from "../stores/BookStore"


function propComparator(prop, direction) {

    //Ascending
    if(direction === 1){
        return function(a, b) {
            if (a[prop] < b[prop])
                return -1;
            if (a[prop] > b[prop])
                return 1;
            return 0;
        }
    }

    //Descending
    else{
        return function(a, b) {
            if (a[prop] < b[prop])
                return 1;
            if (a[prop] > b[prop])
                return -1;
            return 0;
        }
    }
}

export default class Content extends Component{

    /**
     * Sets the inital state of the search and search filter value. Binds the function handleChange to
     * this component.
     * @param props --> arbitrary attribute inputs.
     */
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.getNewBooks = this.getNewBooks.bind(this);
        this.state = {
            searchString: '',
            sortedBy: "title",
            sortedCount: 1,
            data: bookStore.getAll(),
            filter:this.props.items};
    }


    getNewBooks(){
      this.setState({
        data: bookStore.getAll()
      });
    }

    componentWillMount(){
      bookStore.on("change",this.getNewBooks);
    }

    componentWillUnmount(){
      bookStore.removeListener("change",this.getNewBooks);
    }

    handleChange(e){
        // If you comment out this line, the text box will not change its value.
        // This is because in React, an input cannot change independently of the value
        // that was assigned to it. In our case this is this.state.searchString.
        this.setState({searchString:e.target.value});
    }


    sortByType(type){

        let myList = this.state.data;

        if(this.state.sortedBy === type){
            if(this.state.sortedCount === 1){
                myList.sort(propComparator(type, 0));
                this.setState({sortedCount: this.state.sortedCount + 1, data: myList});
            }else{
                myList.sort(propComparator("title", 1));
                this.setState({sortedBy: "title", sortedCount: 1,  data: myList});
            }

        }else{
            myList.sort(propComparator(type, 1));
            this.setState({sortedBy: type, sortedCount: 1, data: myList});
        }


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
            <div className="result-table container-fluid">
                <div className="row">
                    <div className="col-xs-8 col-xs-offset-2 search-bar-container">
                        <Search className="search-bar" value={this.state.searchString} onChange={this.handleChange} />
                        <br></br>
                    </div>
                </div>
                <div className="row">
                    <ul className="list-inline row result-object result-object-header">
                        <li className="col-sm-3" onClick={() => this.sortByType("title")}>
                            Title
                        </li>
                        <li className="col-sm-2" onClick={() => this.sortByType("state")}>
                            Condition
                        </li>
                        <li className="col-sm-1 price" onClick={() => this.sortByType("price")}>
                            Price
                        </li>
                        <li className="col-sm-3" onClick={() => this.sortByType("user")}>
                            User
                        </li>
                        <li className="col-sm-2 price" onClick={() => this.sortByType("userRating")}>
                            Rating
                        </li>
                        <li className="col-sm-2" onClick={() => this.sortByType("added")}>
                            Added
                        </li>
                    </ul>

                    {search_books.map(function(l){ return (
                        <div key={l.id} className="result-table-row">
                            <div data-toggle="collapse" href={"#collapseNr" + l.id} data-parent="#resultTable">
                                <ResultObject  title={l.title} state={l.state} price={l.price} user={l.user}
                                              userRating={l.userRating} added={l.added} image={l.image} />
                            </div>
                            <div id={"collapseNr" + l.id } className="collapse">
                                <ResultObjectDetails author={l.author} userId={l.userId}/>
                            </div>
                        </div>
                    )})}
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>

        );
    }
}
