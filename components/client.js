import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Searchbar from './searchbar';
import Navbar from './navbar';
import ResultTable from './resulttable';


/// cols and data are table values that populate the ResultTable
var cols = [
    { key: 'title', label: 'Title' },
    { key: 'state', label: 'State' },
    { key: 'price', label: 'Price' },
    { key: 'user', label: 'User' },
    { key: 'userRating', label: 'User Rating' },
    { key: 'added', label: 'Added' }
];

var data = [
    { id: 1, title: 'Det Tenkende Mennesket', state: 'New', price: '150 kr', user: "John Boo", userRating: "good", added:"10. August 2016" },
    { id: 2, title: 'Innføring i mikroøkonomi', state: 'New', price: '130 kr', user: "Jane Doe", userRating: "great", added:"10. August 2016" },
    { id: 3, title: 'Menneskekroppen', state: 'Readable', price: '100 kr', user: "Tom", userRating: "good", added:"10. August 2016" },
    { id: 4, title: 'Intro til samfunnsvitenskap', state: 'Normal Use', price: '100 kr', user: "Tom", userRating: "good", added:"10. August 2016" },
    { id: 5, title: 'Matematikk for informatikere', state: 'New', price: '100 kr', user: "Tom", userRating: "good", added:"10. August 2016" },
    { id: 6, title: 'Book', state: 'As New', price: '100 kr', user: "Tom", userRating: "good", added:"10. August 2016" },
    { id: 7, title: 'Book', state: 'New', price: '100 kr', user: "Tom", userRating: "good", added:"10. August 2016" },
    { id: 8, title: 'Book', state: 'As New', price: '100 kr', user: "Tom", userRating: "good", added:"10. August 2016" }
];

class App extends Component {
  render() {
    return (
      <div className="site">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="searchbar">
          <Searchbar />
        </div>
        <div className="result_table">
          <ResultTable cols={cols} data={data}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
