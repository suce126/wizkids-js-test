import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FData from './component/FData';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <FData />
        </header>
      </div>
    );
  }
}

export default App;
