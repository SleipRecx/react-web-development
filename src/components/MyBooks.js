import React, { Component } from 'react';
import myBookStore from '../stores/MyBookStore';
import '../../public/styles/style.css';

export default class MyBooks extends Component {
  constructor(props) {
      super(props);
      this.state = {data: myBookStore.getAllBooks()};
  }

  componentWillMount(){
    myBookStore.on("change", () =>{
      this.setState({
        data: myBookStore.getAllBooks()
      })
      console.log(this.state.data);
    });

}

  render() {
      return (
          <div className="center">
              <h1>
                {this.props.location.pathname}
                <br/>
                <br/>
              </h1>
            <pre>{JSON.stringify(this.state.data) }</pre>
          </div>
      );
  }
}
