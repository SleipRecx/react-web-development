import React, { Component} from 'react';
import '../../public/styles/style.css';

class Button extends Component{
    constructor(props) {
        super(props);
        this.state = {value: "Title "};
        this.change = this.change.bind(this);
    }
    change(e){
        this.setState({value: e.target.getAttribute('data-value')});
        this.props.onChange(e);
    };

    render() {
        return (
            <div className="input-group-btn">
                <button type="button"
                        className="btn btn-default dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        value="Title"
                        aria-expanded="false">{this.state.value}<span className="caret"></span></button>
                <ul className="dropdown-menu">
                  <li><a data-value="Title " onClick={this.change}>Title </a></li>
                  <li><a data-value="User " onClick={this.change}>User </a></li>
                  <li><a data-value="Price " onClick={this.change}>Price </a></li>
                </ul>
            </div>
        );
    }
}

export default Button;
