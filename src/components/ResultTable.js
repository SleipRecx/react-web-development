/**
 * Component displaying the searchbar, filters and a table for the results of search.
 *
 * Imports jquery
 *
 * Imports ResultObject, which is the row of info about a book, and ResultObjectDetails
 * which is the extra info one gets when clicking on a row.
 *
 * Imports bookStore, which contains all of our dummy data.
 *
 * Imports InfiniteScroll which handles loading of data when scrolling.
 *
 * Imports Actions to be used when communicating with database.
 *
 * Imports Loader, a simple graphical representation of loading data that appears when 
 * scrolling to the bottom of the list and it expands.
 *
 * Imports SearchInput to be used to search for results.
 */
import React, { Component} from 'react';
import $ from 'jquery';
import '../../public/styles/style.css';
import ResultObject from './ResultObject';
import ResultObjectDetails from './ResultObjectDetails';
import bookStore from "../stores/BookStore";
import InfiniteScroll from 'react-infinite-scroller';
import * as Actions from '../stores/Actions';
var Loader = require('halogen/BeatLoader');
import SearchInput, {createFilter} from 'react-search-input'

// removes the arrow on a sorted column when another column is pressed
function removeChevrons(){
    $(".result-object-header").find("span").removeClass("glyphicon glyphicon-chevron-down glyphicon-chevron-up");
}

// Sorting function that takes as parameters the sorting value and a direction, 
// i.e. if it should be ascending or descending.
function propComparator(prop, direction) {
    removeChevrons();

    // Unique logic to sort on price, since this has to be sorted 
    // numerically rather than alphabetically
    if (prop === "price"){
        // Ascending
        if (direction === 1){
           $("#" + prop + "-chevron").addClass("glyphicon glyphicon-chevron-down");
            return function(a,b) {
                return (parseInt(a[prop], 10) - parseInt(b[prop], 10))
            }
        }
        // Descending
        else{
           $("#" + prop + "-chevron").addClass("glyphicon glyphicon-chevron-up");
            return function(a,b) {
                return (parseInt(b[prop], 10) - parseInt(a[prop], 10))
            }
        }
    }

    //Ascending
    if(direction === 1){
        $("#" + prop + "-chevron").addClass("glyphicon glyphicon-chevron-down");
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
        $("#" + prop + "-chevron").addClass("glyphicon glyphicon-chevron-up");
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
     * Sets the inital state of the search, sorting and search filter value. Binds the functions listed to
     * this component.
     * @param props --> arbitrary attribute inputs.
     */
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.getNewBooks = this.getNewBooks.bind(this);
        this.noMoreBooks = this.noMoreBooks.bind(this)
        this.loadMoreBooks = this.loadMoreBooks.bind(this);
        this.getAllBooks = this.getAllBooks.bind(this);
        this.allData =[]
        this.moreBooksCounter = 1;
        this.state = {
            searchString: '',
            sortedBy: "added",
            sortedDirection: 0,
            sortedCount: 1,
            all_books: [],
            filterKeys: ['title', 'user'],
            moreBooks: true,
            data: bookStore.getBooksWithLimit(),
            filter:this.props.items};
    }

    noMoreBooks(){
      this.setState({
        moreBooks: false
      });
    }

    loadMoreBooks(){
      if (this.moreBooksCounter === 1 || this.moreBooksCounter > 3){
        Actions.loadMoreBooks(this.state.data.length);
      }
        this.moreBooksCounter ++
    }

    getNewBooks(){
      this.setState({
        data: bookStore.getBooksWithLimit()
      });
    }

    getAllBooks(){
      this.setState({
        all_books: bookStore.getAllBooks()
      });
    }

    componentWillMount(){
      bookStore.on("change",this.getNewBooks);
      bookStore.on("no_books",this.noMoreBooks);
      bookStore.on("all_data",this.getAllBooks);
    }

    componentDidMount(){
      this.getAllBooks()
    }

    componentWillUnmount(){
      bookStore.removeListener("change",this.getNewBooks);
      bookStore.removeListener("no_books",this.noMoreBooks);
      bookStore.removeListener("all_data",this.getAllBooks);
    }

    // Calls sorting function propComparator
    sortByProp(type, direction){
        return propComparator(type, direction);
    }

    handleChange(term){
        this.setState({searchString: term});
    }

    // Sets the states for sorting type and direction, which are then used by
    // sortByProp upon rendering the books.
    sortByType(type){

        this.setState({sortedBy: type});

        if(this.state.sortedBy === type){
            if(this.state.sortedCount === 1){
                this.setState({sortedDirection: 0, sortedCount: 2})
            }else{
                this.setState({sortedDirection: 1, sortedCount: 1})
            }
        }else{
            this.setState({sortedType: type, sortedCount: 1, sortedDirection: 1})
        }
    }

    shouldLoadMore(array){
      if(array.length < 20){
          return false
      }
      return true
    }

    // Saves the selected book to a user's viewed book-history
    saveVisited(object){
      var allBooks = JSON.parse(localStorage.getItem("visited_books")) || [];
      var books = allBooks.filter(key => key.id === object.id)
      if(books.length === 0){
        allBooks.push(object);
        localStorage.setItem("visited_books", JSON.stringify(allBooks))
      }
    }

    /**
     * @returns {XML}
     */
    render() {
        var searchString = this.state.searchString.trim().toLowerCase();
        var search_books= this.state.data.filter(createFilter(this.state.searchString.trim().toLowerCase(), this.state.filterKeys))

        var state_filter = this.props.items.state;
        var rating_filter = this.props.items.rating;
        var loadMore = this.state.moreBooks;

        if(searchString.length > 0){
          search_books = this.state.all_books
        }

        // Filters books by state_filter.
        if (state_filter.length > 0){
            search_books = search_books.filter(function(l){
                return state_filter.includes(l.state);
            });
        }

        // Filters books by rating_filter.
        if (rating_filter.length > 0){
            search_books = search_books.filter(function(l){
                return rating_filter.includes(l.userRating.toString());
            });
        }

        // Filters by search string
        if(searchString.length > 0){
            search_books = search_books.filter(function(l){
                return l.title.toLowerCase().match( searchString ) || l.user.toLowerCase().match( searchString );
            });
            loadMore = this.shouldLoadMore(search_books);
        }

        return (
            <div className="result-table container-fluid">
                <div className="row">
                    <div className="col-xs-8 col-xs-offset-2 search-bar-container">
                        <SearchInput placeholder="Search Titles and Users" throttle={200} className="search-input" onChange={this.handleChange} />
                        <br></br>
                    </div>
                </div>
                <div className="row">
                    <ul className="list-inline row result-object result-object-header">
                        <li className="col-sm-3" onClick={() => this.sortByType("title")}>
                            <div>
                                Title
                                <span id="title-chevron" className="pull-right"></span>
                            </div>
                        </li>
                        <li className="col-sm-2" onClick={() => this.sortByType("state")}>
                            <div>
                                Condition
                                <span id="state-chevron" className="pull-right"></span>
                            </div>
                        </li>
                        <li className="col-sm-1" onClick={() => this.sortByType("price")}>
                            <div>
                                Price
                                <span id="price-chevron" className="pull-right"></span>
                            </div>
                        </li>
                        <li className="col-sm-3" onClick={() => this.sortByType("user")}>
                            <div>
                                Seller
                                <span id="user-chevron" className="pull-right"></span>
                            </div>
                        </li>
                        <li className="col-sm-2" onClick={() => this.sortByType("userRating")}>
                            <div>
                                Rating
                                <span id="userRating-chevron" className="pull-right"></span>
                            </div>
                        </li>
                        <li className="col-sm-2" onClick={() => this.sortByType("added")}>
                            <div>
                                Added
                                <span id="added-chevron" className="pull-right"></span>
                            </div>
                        </li>
                    </ul>

                </div>
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.loadMoreBooks}
                  hasMore={loadMore}
                  loader={<div className="loader"><br/><Loader color="#2f4f4f" size="18px" margin="5px"/></div>}>
                  {search_books.sort(this.sortByProp(this.state.sortedBy, this.state.sortedDirection)).map((l) =>{ return (
                    <div key={l.id} className="row result-table-row">
                        <div>
                            <div data-toggle="collapse" onClick={this.saveVisited.bind(this,l)} href={"#collapseNr" + l.id} data-parent="#resultTable">
                                <ResultObject title={l.title} state={l.state} price={l.price} user={l.user}
                                              userRating={l.userRating} added={l.added} image={l.image} />
                            </div>
                            <div id={"collapseNr" + l.id } className="collapse">
                                <ResultObjectDetails email={l.email} id={l.userId} title={l.title} author={l.author} user={l.user}/>
                            </div>
                        </div>
                    </div>
                    )})}
                </InfiniteScroll>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}
