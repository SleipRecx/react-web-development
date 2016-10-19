import React, { Component} from 'react';
import Rater from 'react-rater'
import '../../public/style.css';
import books from '../data/books';
import LabelConverter from './LabelConverter';


class Content extends Component{

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { searchString: '' };
    }

    handleChange(e){
        // If you comment out this line, the text box will not change its value.
        // This is because in React, an input cannot change independently of the value
        // that was assigned to it. In our case this is this.state.searchString.
        this.setState({searchString:e.target.value});
    }

    render() {
        var searchString = this.state.searchString.trim().toLowerCase();
        var search_books = books;
        if(searchString.length > 0){
            // We are searching. Filter the results.
            search_books = books.filter(function(l){
                return l.title.toLowerCase().match( searchString );
            });
        }

        return (
            <div className="bookTable">
                <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search" />
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
                            <td><span className={"label label-" + LabelConverter(l.state)} >{l.state}</span></td>
                            <td>{l.price}</td>
                            <td><span className="glyphicon glyphicon-user" aria-hidden="true"></span>{l.user}</td>
                            <td><Rater interactive={false} rating={l.userRating} /></td>
                            <td>{l.added}</td>
                        </tr>)
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Content;