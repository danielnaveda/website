import React, { Component } from "react";
import Message from "./Message";


class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {
          messages: [],
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/")
          .then(response => response.json())
          .then(data => this.setState({ messages: data }));
      }

    render() {
        const { messages } = this.state;
        console.log(messages)
        return (
            <div className="messages-list">
            { messages.map(message => (
                <Message type="" text={message}/>

            ))}
            </div>

        )
    }
}

export default Messages;