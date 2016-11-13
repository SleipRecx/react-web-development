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
import $ from 'jquery';
import '../../public/styles/style.css';
import ResultObject from './ResultObject';
import ResultObjectDetails from './ResultObjectDetails';
import bookStore from "../stores/BookStore";
import InfiniteScroll from 'react-infinite-scroller';
import * as Actions from '../stores/Actions';
var Loader = require('halogen/BeatLoader');
import SearchInput, {createFilter} from 'react-search-input'

function removeChevrons(){
    $(".result-object-header").find("span").removeClass("glyphicon glyphicon-chevron-down glyphicon-chevron-up");
}

function propComparator(prop, direction) {
    removeChevrons();

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
     * Sets the inital state of the search and search filter value. Binds the function handleChange to
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
      if (this.moreBooksCounter ===1 || this.moreBooksCounter > 3){
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


    sortByProp(type, direction){
        return propComparator(type, direction);
    }


    handleChange(term){
        // If you comment out this line, the text box will not change its value.
        // This is because in React, an input cannot change independently of the value
        // that was assigned to it. In our case this is this.state.searchString.
        this.setState({searchString: term});
    }


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
                              <ResultObject  title={l.title} state={l.state} price={l.price} user={l.user}
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
