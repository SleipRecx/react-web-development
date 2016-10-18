import React, { Component} from 'react';
import Rater from 'react-rater'
import '../../public/style.css';
import books from '../data/books';
import LabelConverter from './LabelConverter';

export default class Content extends Component {
    render() {
        return (
            <div className="bookTable">
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
                        {books.map(book =>
                        <tr key={"book"+ book.id}>
                            <td>{book.title}</td>
                            <td><span className={"label label-" + LabelConverter(book.state)} >{book.state}</span></td>
                            <td>{book.price}</td>
                            <td><span className="glyphicon glyphicon-user" aria-hidden="true"></span>{book.user}</td>
                            <td><Rater interactive={false} rating={book.userRating} /></td>
                            <td>{book.added}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}