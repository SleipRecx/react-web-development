import React, { Component} from 'react';
import Rater from 'react-rater'
import '../../public/styles/style.css';
import label_converter from '../data/label_converter';
import Search from './Search';
import Button from './Button';
var faker = require('faker');
var books = generate_data();


function toTitleCase(str){
   return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function generate_data(){
  var array = [];
  var book_states = ['New','Readable',"Normal Use","As New"]
  for(var i=0;i<24; i++){
     var object = {}
     object.id=i;
     object.image= faker.image.avatar();
     object.user = faker.name.firstName();
     object.price =Math.round(faker.commerce.price()) + " kr";
     object.added = faker.date.past().toDateString();
     object.userRating = Math.floor((Math.random() * 6));
     object.state = book_states[Math.floor((Math.random() * 4))];
     var run = true;
     while(run){
        run = false;
        var word = faker.random.words();

        if(word.length > 24){
           run = true;
        }
        if(word.length < 14){
           run = true;
        }
     }
     object.title = toTitleCase(word);
     array.push(object);
  }
  return array;

}




class Content extends Component{

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.setSearch = this.setSearch.bind(this);
        this.state = { searchString: '', searchParameter: 'title' };
    }

    handleChange(e){
        // If you comment out this line, the text box will not change its value.
        // This is because in React, an input cannot change independently of the value
        // that was assigned to it. In our case this is this.state.searchString.
        this.setState({searchString:e.target.value});
    }



    setSearch(e){
        this.setState({searchParameter:e.target.getAttribute('data-value')});
    }



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
                <div className="input-group">
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
                            <td><Rater interactive={false} rating={l.userRating} /></td>
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

export default Content;
