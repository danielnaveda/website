import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Messages from './Messages/Messages'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="header">
        </header>
        <section className="results--section">
          <div className="container">
            <h1>Last Geo messages</h1>
          </div>
          <div className="results--section__inner">
            <Messages/>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
