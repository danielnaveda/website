import React from 'react'
import axios from 'axios';

class ApiCall extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "Click the button to populate this window",
            endpoint: props.endpoint,
            button: props.button,
        };
    }

    requestEndpoint = () => {
        axios.get(this.state.endpoint).then(
            res => {
                this.setState({text: JSON.stringify(res.data)});
            }
        );
    }

    render() {
        return (
            <div className='ApiCaller'>
                <div style={{overflowY: "scroll", height:"200px",}}><p>{this.state.text}</p></div>
                <input type="button" onClick={this.requestEndpoint} value={this.state.button}/>
            </div>
        );
    }
}

export default ApiCall
