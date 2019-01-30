import React, { Component } from "react";

class Message extends Component {
    constructor (props) {
        super(props);
        this.state = {
            type: props.type,
            text: props.text,
        };
    }

    render() {
        return (
            <div className={"notification " + this.state.type} >
              <button className="delete"></button>
              {this.state.text}
            </div>
        )
    }
}

export default Message;